import { getDbPool } from "./db";

function cleanContent(html, maxLength = 1500) {
  if (!html) return "";
  const cleaned = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.slice(0, maxLength) + "...";
}

function extractKeywords(query) {
  if (!query) return [];
  const stopwords = new Set([
    "what",
    "whats",
    "what's",
    "is",
    "are",
    "was",
    "were",
    "the",
    "a",
    "an",
    "in",
    "on",
    "at",
    "for",
    "to",
    "of",
    "and",
    "or",
    "about",
    "tell",
    "me",
    "show",
    "how",
    "when",
    "where",
    "who",
    "why",
    "which",
    "news",
    "anime",
    "manga",
    "any",
    "latest",
    "recent",
    "update",
    "updates",
    "there",
    "this",
    "that",
    "does",
    "do",
    "can",
    "you",
    "please",
    "know",
  ]);

  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopwords.has(w));

  return words;
}

export async function retrieveRelevantArticles(userQuery) {
  const pool = getDbPool();
  const keywords = extractKeywords(userQuery);

  try {
    let resultRows = [];

    if (keywords.length > 0) {
      const patterns = keywords.map((k) => `%${k}%`);

      const scoredQuery = `
        WITH raw_articles AS (
          SELECT 
            title, 
            url, 
            image, 
            created_at AS published_at, 
            body AS content,
            3 AS priority
          FROM full_articles
          UNION ALL
          SELECT 
            title, 
            url, 
            image, 
            published_at, 
            description AS content,
            2 AS priority
          FROM anime_features
          UNION ALL
          SELECT 
            title, 
            url, 
            image, 
            published_at, 
            description AS content,
            1 AS priority
          FROM anime_news
        ),
        scored AS (
          SELECT 
            title,
            url,
            image,
            published_at,
            content,
            priority,
            (
              CASE WHEN title ILIKE ANY($1) THEN 5 ELSE 0 END +
              CASE WHEN content ILIKE ANY($1) THEN 2 ELSE 0 END
            ) AS match_score
          FROM raw_articles
        ),
        deduped AS (
          SELECT DISTINCT ON (url)
            title,
            url,
            image,
            published_at,
            content,
            match_score
          FROM scored
          WHERE match_score > 0
          ORDER BY url, match_score DESC, priority DESC
        )
        SELECT * FROM deduped
        ORDER BY match_score DESC, published_at DESC NULLS LAST
        LIMIT 6;
      `;

      const res = await pool.query(scoredQuery, [patterns]);
      resultRows = res.rows;
    }

    if (!resultRows || resultRows.length === 0) {
      const fallbackQuery = `
        WITH raw_articles AS (
          SELECT 
            title, 
            url, 
            image, 
            created_at AS published_at, 
            body AS content,
            3 AS priority
          FROM full_articles
          UNION ALL
          SELECT 
            title, 
            url, 
            image, 
            published_at, 
            description AS content,
            2 AS priority
          FROM anime_features
          UNION ALL
          SELECT 
            title, 
            url, 
            image, 
            published_at, 
            description AS content,
            1 AS priority
          FROM anime_news
        ),
        deduped AS (
          SELECT DISTINCT ON (url)
            title,
            url,
            image,
            published_at,
            content
          FROM raw_articles
          ORDER BY url, priority DESC, published_at DESC NULLS LAST
        )
        SELECT * FROM deduped
        ORDER BY published_at DESC NULLS LAST
        LIMIT 4;
      `;
      const fallbackRes = await pool.query(fallbackQuery);
      resultRows = fallbackRes.rows;
    }

    return resultRows.map((row) => ({
      title: row.title || "Untitled Article",
      url: row.url || "",
      image: row.image || "",
      published_at: row.published_at || null,
      content: cleanContent(row.content),
    }));
  } catch (error) {
    console.error("Database retrieval error in RAG:", error);
    return [];
  }
}

export async function generateGeminiResponse({
  userMessage,
  history = [],
  articles = [],
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      answer:
        "⚠️ **Gemini API Key Missing**: Please set `GEMINI_API_KEY` in your environment variables (`.env` locally and in Vercel project settings). Once added, Senpai AI will answer questions directly using your news archive!",
      sources: articles,
    };
  }

  let contextText = "";
  if (articles.length > 0) {
    contextText = articles
      .map(
        (a, i) =>
          `[Article ${i + 1}]\nTitle: ${a.title}\nURL: ${a.url}\nPublished: ${a.published_at || "Recent"}\nSummary/Content: ${a.content}`,
      )
      .join("\n\n---\n\n");
  } else {
    contextText =
      "No specific articles found in the local archive matching this query.";
  }

  const systemInstruction = `
You are "Senpai AI", the knowledgeable and enthusiastic anime AI assistant for "Senpai Central" (https://senpai-central.vercel.app).
Senpai Central provides anime fans with trending news, anime rankings, trailers, and full scraped articles.

Your job is to answer the user's questions about anime, manga, release dates, adaptations, and news using Senpai Central's news archive whenever possible.

News Archive Context retrieved from Senpai Central database:
=======================================
${contextText}
=======================================

Guidelines for your response:
1. Ground your answer in the provided news articles whenever relevant. Highlight key announcements, cast, release windows, or studio details from the articles.
2. If the user asks about an anime or topic that is not in the news archive, use your general knowledge to give a friendly, accurate answer, but clarify politely: "While this isn't in our recent Senpai Central news archive snapshot, here is what is known: ...".
3. Maintain a warm, friendly "Senpai" tone that anime fans love.
4. Format your answer with clean Markdown (use bolding for anime titles and key dates, bullet points for lists).
5. Never invent fake release dates or false news. If something has not been officially confirmed, mention that clearly.
`;

  const contents = [];

  const recentHistory = history.slice(-6);
  for (const item of recentHistory) {
    if (item.role === "user" || item.role === "model") {
      contents.push({
        role: item.role,
        parts: [{ text: item.text || item.content || "" }],
      });
    }
  }

  contents.push({
    role: "user",
    parts: [{ text: userMessage }],
  });

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const requestBody = {
    contents,
    systemInstruction: {
      parts: [{ text: systemInstruction }],
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      topP: 0.95,
    },
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return {
        answer: `Sorry, Senpai AI encountered an issue connecting to Gemini (status ${response.status}). Please check your API key or try again in a moment!`,
        sources: articles,
      };
    }

    const data = await response.json();
    const candidate = data.candidates?.[0];
    const answerText =
      candidate?.content?.parts?.[0]?.text ||
      "Senpai AI couldn't generate a response. Please try rephrasing your question!";

    return {
      answer: answerText,
      sources: articles,
    };
  } catch (error) {
    console.error("Fetch error calling Gemini:", error);
    return {
      answer:
        "An error occurred while communicating with Senpai AI. Please try again.",
      sources: articles,
    };
  }
}

import { NextResponse } from "next/server";
import { retrieveRelevantArticles, generateGeminiResponse } from "@/lib/rag";

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required and must be non-empty." },
        { status: 400 },
      );
    }

    const trimmedMessage = message.trim();

    const articles = await retrieveRelevantArticles(trimmedMessage);

    const response = await generateGeminiResponse({
      userMessage: trimmedMessage,
      history: Array.isArray(history) ? history : [],
      articles,
    });

    return NextResponse.json({
      answer: response.answer,
      sources: response.sources.map((s) => ({
        title: s.title,
        url: s.url,
        image: s.image,
        published_at: s.published_at,
      })),
    });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      {
        error: "Internal server error occurred while processing your request.",
      },
      { status: 500 },
    );
  }
}

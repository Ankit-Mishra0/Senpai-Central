import { NextResponse } from "next/server";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  
  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }


  const { rows } = await pool.query(
    "SELECT * FROM full_articles WHERE url = $1",
    [url]
  );
  if (rows.length > 0) {
    return NextResponse.json(rows[0]);
  }

  try {
    const scrapeRes = await fetch(
      `https://scrapper-1-xver.onrender.com/scrape?url=${encodeURIComponent(url)}`
    );
    const json = await scrapeRes.json();

    if (json.status !== "ok") {
      throw new Error(json.message);
    }
  } catch (e) {
    console.error("Scraping error:", e);
    return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
  }

 
  const { rows: newRows } = await pool.query(
    "SELECT * FROM full_articles WHERE url = $1",
    [url]
  );
  if (newRows.length > 0) {
    return NextResponse.json(newRows[0]);
  } else {
    return NextResponse.json(
      { error: "Article not found after scraping" },
      { status: 404 }
    );
  }
}

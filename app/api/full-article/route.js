import { NextResponse } from "next/server";
import { Pool } from "pg";  
import "dotenv/config";
import { execSync } from "child_process";


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) return NextResponse.json({ error: "No URL provided" }, { status: 400 });

  const { rows } = await pool.query("SELECT * FROM full_articles WHERE url = $1", [url]);
  if (rows.length > 0) {
    return NextResponse.json(rows[0]);
  }

  
  try {
    execSync(`python3 app/scrapper/full-article/full_article_scrap.py "${url}"`);
  } catch (e) {
    return NextResponse.json({ error: "Scraping failed" }, { status: 500 });
  }

  
  const { rows: newRows } = await pool.query("SELECT * FROM full_articles WHERE url = $1", [url]);
  if (newRows.length > 0) {
    return NextResponse.json(newRows[0]);
  } else {
    return NextResponse.json({ error: "Article not found after scraping" }, { status: 404 });
  }
}

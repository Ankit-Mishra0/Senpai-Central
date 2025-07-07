import { NextResponse } from "next/server";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM anime_news ORDER BY published_at DESC  "
    );
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Database fetch failed" },
      { status: 500 }
    );
  }
}

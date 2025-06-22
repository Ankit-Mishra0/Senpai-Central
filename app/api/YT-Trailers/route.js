import { NextResponse } from "next/server";
import { Pool } from "pg";  
import "dotenv/config";

const pool=new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
export async function GET() {
    try {
        const result = await pool.query(
            "SELECT * FROM trailers ORDER BY published_at DESC"
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

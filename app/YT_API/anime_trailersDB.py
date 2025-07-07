import psycopg2
import os
from dotenv import load_dotenv
load_dotenv()
def get_db_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))
def save_trailers(trailers):
    conn = None
    cursor = None

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        for item in trailers:
            video_id = item["id"].get("videoId")
            snippet = item["snippet"]
            title = snippet["title"]
            description = snippet["description"]
            published_at = snippet["publishedAt"]
            thumbnail_url = snippet["thumbnails"]["default"]["url"]
            channel_id = snippet["channelId"]
            if video_id:
                print("Inserting:", item)
                cursor.execute("""
                    INSERT INTO trailers (video_id, title, description, thumbnail_url, published_at, channel_id)
                    VALUES (%s, %s, %s, %s, %s, %s)
                    ON CONFLICT (video_id) DO NOTHING;
                """, (video_id, title, description, thumbnail_url, published_at, channel_id))
        conn.commit()
    except Exception as e:
        print("Error saving trailers:", e)
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
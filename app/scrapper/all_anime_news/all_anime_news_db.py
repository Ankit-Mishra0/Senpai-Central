import psycopg2
from dotenv import load_dotenv
import os
load_dotenv()

def get_db_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))

def save_articles(articles):
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        for article in articles:
            print("Inserting:", article) 
            cursor.execute("""
                INSERT INTO anime_features (title, url, description, image, published_at)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (url) DO NOTHING
            """, (article['title'], article['url'], article['desc'], article['image'], article['published_at']))
        conn.commit()
    except Exception as e:
        print(f"Error saving articles to database: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
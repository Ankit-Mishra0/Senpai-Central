import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

def get_db_connection():
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT")   
    )

def save_full_article(articles):
    conn = None
    cursor = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        for article in articles:
            print("Inserting:", article)
            cursor.execute("""
                INSERT INTO full_articles (title, url, image, body, created_at)
                VALUES (%s, %s, %s, %s, NOW())
                ON CONFLICT (url) DO NOTHING
            """, (article['title'], article['url'], article['image'], article['body']))
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
import psycopg2
from dotenv import load_dotenv
import os
load_dotenv()
def get_db_connection():
    return psycopg2.connect(os.getenv("DATABASE_URL"))
def save_anime_list(anime_list):
    conn=None
    cursor = None
    try:
        conn=get_db_connection()
        cursor=conn.cursor()
        for anime in anime_list:
            print("Inserting:",anime)
            cursor.execute("""
                INSERT INTO anime_rankings (title, url, description, image, published_at)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (url) DO NOTHING
            """, (anime['title'], anime['url'], anime['desc'], anime['image'], anime['published_at']))
        conn.commit()
    except Exception as e:
        print(f"Error saving anime to database: {e}")
        if conn:
            conn.rollback()
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()  
          
        

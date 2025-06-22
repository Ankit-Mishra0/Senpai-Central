import requests
import os
from dotenv import load_dotenv
from anime_trailersDB import save_trailers

load_dotenv()
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

animeChannels = [
    "UC6pGDc4bFGD1_36IKv3FnYg",  # Crunchyroll
    "UCBSs9x2KzSLhyyA9IKyt4YA",  # Netflix Anime
]

def get_anime_trailers():
    trailers = []
    for channelId in animeChannels:
        response = requests.get(
            "https://www.googleapis.com/youtube/v3/search",
            params={
                "key": YOUTUBE_API_KEY,
                "part": "snippet",
                "channelId": channelId,
                "maxResults": 10,
                "order": "date",
                "type": "video",
                "q": "trailer"
            }
        )
        if response.status_code == 200:
            data = response.json()
            trailers.extend(data.get("items", []))
        else:
            print(f"Error fetching data for channel {channelId}: {response.status_code}")
    return trailers

if __name__ == "__main__":
    trailers = get_anime_trailers()
    print(f"Fetched {len(trailers)} trailers.")
    save_trailers(trailers)
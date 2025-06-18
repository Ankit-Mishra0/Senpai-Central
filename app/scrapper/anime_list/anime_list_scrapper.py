import requests
from bs4 import BeautifulSoup
from db_anime_list import save_anime_list
def get_anime_list():
    url="https://www.cbr.com/category/anime-lists/"
    headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Referer": "https://www.google.com/"
    }
    response = requests.get(url, headers=headers, timeout=10)
    soup= BeautifulSoup(response.text,"html.parser")

    ranking=[]
    for card in soup.select(".display-card.article"):
        title_tag= card.select_one("h5.display-card-title a")
        if not title_tag:
            continue
        title=title_tag.text.strip()
        link="https://www.cbr.com"+title_tag["href"]
        desc_tag=card.select_one("p.display-card-excerpt")
        desc=desc_tag.text.strip() if desc_tag else "No description"
        image_tag=card.select_one("img")
        image=image_tag.get("data-img-url") or image_tag.get("src") if image_tag else ""
        time_tag=card.select_one("time.display-card-date")
        published_at=time_tag["datetime"] if time_tag else None
        ranking.append({
            "title": title,
            "url": link,
            "desc": desc,
            "image": image,
            "published_at": published_at,
        })
    return ranking
if __name__ == "__main__":
    ranking = get_anime_list()
    print(f"Scraped {len(ranking)} anime lists.")
    save_anime_list(ranking)


 
import requests
from bs4 import BeautifulSoup
from db import save_articles

def get_trending_news():
    url = "https://www.cbr.com/category/anime-news/"
    headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Referer": "https://www.google.com/"
    }
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")
    
    articles = []
    for card in soup.select(".display-card.article"):
        title_tag = card.select_one("h5.display-card-title a")
        if not title_tag:
            continue

        title = title_tag.text.strip()
        link = "https://www.cbr.com" + title_tag["href"]
        desc_tag = card.select_one("p.display-card-excerpt")
        desc = desc_tag.text.strip() if desc_tag else "No description"
        image_tag = card.select_one("img")
        image = image_tag.get("data-img-url") or image_tag.get("src") if image_tag else ""
        time_tag = card.select_one("time.display-card-date")
        published_at = time_tag["datetime"] if time_tag else None


        articles.append({
            "title": title,
            "url": link,
            "desc": desc,
            "image": image,
            "published_at": published_at,
        })

    return articles
if __name__ == "__main__":
    articles = get_trending_news()
    print(f"Scraped {len(articles)} articles.")
    save_articles(articles)
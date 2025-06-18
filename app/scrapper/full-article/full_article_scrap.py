import requests
import sys
from bs4 import BeautifulSoup
from full_article_db import save_full_article

def get_full_article(article_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Referer": "https://www.google.com/",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
    }
    try:
        response = requests.get(article_url, headers=headers, timeout=3)
        response.raise_for_status()
    except Exception as e:
        return {"title": "", "image": "", "body": f"<p>Error: {str(e)}</p>"}

    soup = BeautifulSoup(response.text, "html.parser")
    
 
    title = soup.find("h1", class_="article-header-title")
    title_text = title.text.strip() if title else ""

    
    image = ""
    figure = soup.find("figure")
    if figure and figure.find("img"):
        image = figure.find("img").get("src", "")

    
    body_html = ""
    content_div = soup.find(id="article-body")
    if content_div:
        unwanted_classes = [
            "ad", "ad-container", "adthrive", "ad-slot", "ad-box",
            "display-card", "article-footer","body-img-caption","w-twitter"
        ]
        
        for cls in unwanted_classes:
            for bad_div in content_div.find_all("div", class_=cls):
                bad_div.decompose()

        
        for child_div in content_div.find_all("div", recursive=False):
            body_html += str(child_div)

    return {
        "title": title_text,
        "url": article_url,
        "image": image,
        "body": body_html or "<p>No content found.</p>"
    }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python full-articel-scrap.py <article_url>")
        sys.exit(1)
    article_url = sys.argv[1]
    article = get_full_article(article_url)
    save_full_article([article])
    print(f"Scraped and saved: {article['title']}")

    
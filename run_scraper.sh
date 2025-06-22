#!/bin/bash

# Activate virtual environment
source /Users/ankitmishra/senpai-central/venv/bin/activate

# Timestamp for log filenames
NOW=$(date +"%Y-%m-%d_%H-%M-%S")

# Run first script and save log
python /Users/ankitmishra/senpai-central/app/scrapper/anime_list/anime_list_scrapper.py > /Users/ankitmishra/senpai-central/logs/anime_list_$NOW.log 2>&1

# Run second script and save log
python /Users/ankitmishra/senpai-central/app/scrapper/trending_news/trendingnews-scrap.py > /Users/ankitmishra/senpai-central/logs/trendingnews_$NOW.log 2>&1

# Run third script and save log
python /Users/ankitmishra/senpai-central/app/scrapper/all_anime_news/all_anime_news_scrapper.py  > /Users/ankitmishra/senpai-central/logs/all_anime_news_$NOW.log 2>&1
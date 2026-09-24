#!/bin/bash

# Activate virtual environment
source /Users/ankitmishra/senpai-central/venv/bin/activate

# Timestamp for log filenames
NOW=$(date +"%Y-%m-%d_%H-%M-%S")

# Run first script and save log
python /Users/ankitmishra/senpai-central/app/scrapper/anime_list/anime_list_scrapper.py 
# Run second script and save log
python /Users/ankitmishra/senpai-central/app/scrapper/trending_news/trendingnews-scrap.py 
# Run third script and save log
python /Users/ankitmishra/senpai-central/app/scrapper/all_anime_news/all_anime_news_scrapper.py  

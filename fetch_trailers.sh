#!/bin/bash
source /Users/ankitmishra/senpai-central/venv/bin/activate
NOW=$(date +"%Y-%m-%d_%H-%M-%S")

python /Users/ankitmishra/senpai-central/app/YT_API/anime_trailers.py > /Users/ankitmishra/senpai-central/logs/fetched_trailers_$NOW.log 2>&1
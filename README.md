# SayIt - recommendation data

This repository exists to store processed data for the reddit recommendation system: https://anvaka.github.io/sayit/

## About the data format

Each recommendation is just an array of subreddit names. First entry of the array is the source subreddit, followed by "similar" subreddits

Each file in this repository contains an array of recommendations. Subreddits are divided by their first name.
E.g. all subreddits that start with letter `p` going to be in file [8_p.json](https://github.com/anvaka/sayit-data/blob/gh-pages/1/8_p.json). `8_` is just a random prefix, followed by first letters
of subreddits stored in this file.

I strived to make each file size smaller than 1MB, which after gzip compression gives 200-400KB per file.

## Override

Subreddits in [substitutes.json](https://github.com/anvaka/sayit-data/blob/gh-pages/1/substitutes.json) were entered manually.
I had to enter relevant subreddits for the most popular subreddits, because otherwise their recommendations were meaningless: They all were connected to `/r/videos/`, `/r/aww`, `/r/pics/` and so on...

import urllib.request
import json
import csv
import time
from datetime import datetime

# Define subreddits to scrape for relevant tech/marketing data
subreddits = ['technology', 'artificial', 'marketing', 'socialmedia', 'MachineLearning', 'dataisbeautiful']
records = []
# Reddit requires a custom User-Agent to avoid getting immediately blocked
headers = {'User-Agent': 'SocialsMonitorScraper/1.0 (Contact: admin@example.com)'}

print("Scraping Reddit for real social media data... (This may take a moment)")

for sub in subreddits:
    # Get the top posts from the last month
    url = f"https://www.reddit.com/r/{sub}/top.json?limit=100&t=month"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            for child in data['data']['children']:
                post = child['data']
                
                # Combine title and text (if any)
                title = post.get('title', '')
                selftext = post.get('selftext', '')
                text = f"{title}. {selftext}".replace('\n', ' ').strip()
                
                # Truncate extremely long posts
                if len(text) > 500:
                    text = text[:500] + "..."
                    
                hashtags = f"{sub} reddit"
                timestamp = datetime.utcfromtimestamp(post.get('created_utc')).strftime("%Y-%m-%dT%H:%M:%SZ")
                likes = post.get('score', 0)
                
                records.append([text, hashtags, timestamp, likes])
                
        print(f"✅ Scraped {len(data['data']['children'])} posts from r/{sub}")
        
        # Pause briefly to respect Reddit's API rate limits
        time.sleep(2)
    except Exception as e:
        print(f"❌ Failed to scrape r/{sub}: {e}")

# Save to CSV
filename = 'scraped_reddit_data.csv'
with open(filename, mode='w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(["Post text", "Hashtags", "Timestamp", "Likes"])
    writer.writerows(records)

print(f"\n🎉 Successfully saved {len(records)} real records to {filename}")

import csv
import random
from datetime import datetime, timedelta

# Templates and vocabulary for realistic social media posts
TOPICS = {
    "AI & Tech": {
        "templates": [
            "Just read an amazing article about how {tech} is changing {industry}.",
            "The future of {tech} looks incredibly bright for {industry}.",
            "Are we ready for {tech} to take over {industry}?",
            "Implementing {tech} has boosted our productivity by {number}%!",
            "Can't believe the recent advancements in {tech}. Mind blown.",
            "If you aren't paying attention to {tech}, you're falling behind in {industry}.",
            "The ethics of {tech} in {industry} needs to be our top priority this year."
        ],
        "tech": ["artificial intelligence", "machine learning", "neural networks", "quantum computing", "blockchain", "RPA", "cloud computing", "generative AI"],
        "industry": ["healthcare", "finance", "education", "marketing", "cybersecurity", "retail"],
        "hashtags": ["tech", "ai", "machinelearning", "future", "innovation", "techtrends", "software", "dev"]
    },
    "Marketing": {
        "templates": [
            "Our new {strategy} campaign just hit {number}k impressions!",
            "Understanding {metric} is crucial for any {strategy} strategy.",
            "Social media algorithms are prioritizing {strategy} more than ever.",
            "A deep dive into {metric} reveals surprising user behavior.",
            "How to optimize your {strategy} for better {metric}.",
            "Stop ignoring {metric}! It's the key to scaling your {strategy}.",
            "Just wrapped up an incredible seminar on {strategy}."
        ],
        "strategy": ["content marketing", "SEO", "influencer", "email marketing", "B2B", "social media", "growth hacking"],
        "metric": ["engagement rates", "ROI", "click-through rates", "conversion", "customer retention", "CAC"],
        "hashtags": ["marketing", "seo", "socialmedia", "growth", "strategy", "digitalmarketing", "branding"]
    },
    "Data & Analytics": {
        "templates": [
            "Data is the new oil. Loving the insights from our latest {tool} dashboard.",
            "Cleaning data takes {number}% of a data scientist's time, but it's worth it.",
            "Predictive analytics using {tool} is a game changer for the {metric} sector.",
            "Visualizing {metric} trends using {tool} makes storytelling so much easier.",
            "Big data is transforming how we approach {metric}.",
            "Just published a new pipeline using {tool}. Data flows seamlessly!",
            "You can't manage what you don't measure. Start using {tool} today."
        ],
        "tool": ["Python", "Pandas", "Tableau", "PowerBI", "SQL", "Apache Spark", "Snowflake"],
        "metric": ["market", "consumer", "global", "revenue", "user behavior"],
        "hashtags": ["data", "analytics", "datascience", "bigdata", "dataviz", "statistics", "dataengineering"]
    }
}

def generate_record():
    topic_name = random.choice(list(TOPICS.keys()))
    topic = TOPICS[topic_name]
    
    template = random.choice(topic["templates"])
    
    # Fill template
    text = template.format(
        tech=random.choice(topic.get("tech", [""])),
        industry=random.choice(topic.get("industry", [""])),
        strategy=random.choice(topic.get("strategy", [""])),
        metric=random.choice(topic.get("metric", [""])),
        tool=random.choice(topic.get("tool", [""])),
        number=random.randint(10, 99)
    )
    
    # Select 2-4 random hashtags
    num_tags = random.randint(2, 4)
    tags = random.sample(topic["hashtags"], num_tags)
    
    # Randomly append hashtags directly to the text
    if random.random() > 0.4:
        text += " #" + " #".join(tags)
        
    tags_str = " ".join(tags)
    
    # Random time in the last 60 days
    days_ago = random.randint(0, 60)
    hours_ago = random.randint(0, 23)
    mins_ago = random.randint(0, 59)
    dt = datetime.now() - timedelta(days=days_ago, hours=hours_ago, minutes=mins_ago)
    timestamp = dt.strftime("%Y-%m-%dT%H:%M:%SZ")
    
    # Random likes (power law distribution: many low, few high)
    likes = int(random.paretovariate(1.5) * 50)
    
    return [text, tags_str, timestamp, likes]

if __name__ == "__main__":
    filename = "large_sample_data.csv"
    num_records = 1000
    
    with open(filename, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["Post text", "Hashtags", "Timestamp", "Likes"])
        for _ in range(num_records):
            writer.writerow(generate_record())
            
    print(f"Successfully generated {num_records} realistic records in {filename}")

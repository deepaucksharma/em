#!/usr/bin/env python3
"""
Generate priority queue from scored articles.
Sorts by: tier → capability coverage priority → relevance → word count → recency
"""

import json
from datetime import datetime

with open('reference/articles-scored.json') as f:
    scored = json.load(f)

# Capability coverage priority (lower coverage = higher priority)
# From the plan's gap analysis
CAPABILITY_PRIORITY = {
    "C10": 1,  # 62% coverage
    "C12": 1,  # 62% coverage
    "C7":  2,  # 64% coverage
    "C14": 2,  # 67% coverage
    "C13": 3,  # 100% but new, low depth
    "C2":  3,  # 100% but only 4 observables
    "C8":  3,  # 100% but only 6 observables
    "C11": 4,  # 80% coverage
    "C4":  5,
    "C9":  5,
    "C1":  6,
    "C3":  6,
    "C5":  6,
    "C6":  6,
    "general": 7,
}

def parse_date(date_str):
    """Parse date string, return sortable value (higher = more recent)."""
    try:
        return datetime.strptime(date_str[:10], '%Y-%m-%d').timestamp()
    except (ValueError, TypeError):
        return 0

def sort_key(article):
    """Sort key: lower = higher priority."""
    # Tier (1 = highest priority)
    relevance = article['relevance']
    if relevance >= 4:
        tier = 1
    elif relevance == 3:
        tier = 2
    else:
        tier = 3

    # Capability priority (lower = higher priority)
    cap = article['primaryCapability']
    cap_priority = CAPABILITY_PRIORITY.get(cap, 7)

    # Enrichment specificity: specific types > learning-resource only
    etypes = article.get('enrichmentTypes', [])
    specific_types = [e for e in etypes if e not in ('learning-resource',)]
    enrichment_specificity = 0 if specific_types else 1

    # Word count (higher = more substantive = higher priority)
    word_count = -(article.get('wordCount', 0))

    # Type priority: Report > Webinar > Talk/Video
    type_priority = {"Report": 0, "Webinar": 1, "Guide": 1, "Deep Dive": 1,
                     "Talk/Video": 2, "Huddle/Panel": 2}
    article_type_priority = type_priority.get(article.get('type', ''), 3)

    # Recency (negative timestamp = more recent = higher priority)
    recency = -parse_date(article.get('date', ''))

    return (tier, cap_priority, enrichment_specificity, -relevance,
            article_type_priority, word_count, recency)

# Sort
priority_queue = sorted(scored, key=sort_key)

# Add rank and tier
for i, article in enumerate(priority_queue):
    article['rank'] = i + 1
    if article['relevance'] >= 4:
        article['tier'] = 1
    elif article['relevance'] == 3:
        article['tier'] = 2
    else:
        article['tier'] = 3

# Save full queue
with open('reference/articles-priority-queue.json', 'w') as f:
    json.dump(priority_queue, f, indent=2)

# ── Statistics ──────────────────────────────────────────────────────
tier1 = [a for a in priority_queue if a['tier'] == 1]
tier2 = [a for a in priority_queue if a['tier'] == 2]
tier3 = [a for a in priority_queue if a['tier'] == 3]

print(f"Priority Queue Generated: {len(priority_queue)} total articles")
print(f"  Tier 1 (must review):  {len(tier1)}")
print(f"  Tier 2 (review if time): {len(tier2)}")
print(f"  Tier 3 (skip):         {len(tier3)}")

print("\n── Tier 1 Breakdown by Primary Capability ──")
from collections import Counter
tier1_caps = Counter(a['primaryCapability'] for a in tier1)
for cap, count in tier1_caps.most_common():
    name = {"C1": "Org-Level Thinking", "C2": "Strategic Prioritization",
            "C3": "Systems Design", "C4": "Operational Leadership",
            "C5": "Cross-Functional Influence", "C6": "Coaching & Talent",
            "C7": "Decision Framing", "C8": "Incidents & Reliability",
            "C9": "Metrics & Measurement", "C10": "Resource Allocation",
            "C11": "Hiring & Onboarding", "C12": "Culture & Norms",
            "C13": "Security & Compliance", "C14": "Performance Mgmt"
           }.get(cap, cap)
    print(f"  {cap} ({name}): {count}")

print("\n── Top 20 Articles in Queue ──")
for a in priority_queue[:20]:
    cap = a['primaryCapability']
    print(f"  #{a['rank']:3d} [R{a['relevance']}] {cap:4s} | {a['title'][:60]:<60s} | {a['type']}")

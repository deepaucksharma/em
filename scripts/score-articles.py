#!/usr/bin/env python3
"""
Score 2,852 LeadDev articles for relevance to the 14-capability EM framework.
Uses keyword-based scoring with category mapping and content analysis.
"""

import json
import re
from collections import defaultdict

# Load articles
with open('reference/articles-index.json') as f:
    articles = json.load(f)

# ── Capability Definitions ──────────────────────────────────────────
CAPABILITIES = {
    "C1":  {"name": "Org-Level Thinking", "domain": "Strategy"},
    "C2":  {"name": "Strategic Prioritization", "domain": "Strategy"},
    "C3":  {"name": "Systems Design & Architecture", "domain": "Execution"},
    "C4":  {"name": "Operational Leadership & Rhythm", "domain": "Execution"},
    "C5":  {"name": "Cross-Functional Influence", "domain": "Stakeholder"},
    "C6":  {"name": "Coaching & Talent Development", "domain": "People"},
    "C7":  {"name": "Decision Framing & Communication", "domain": "Stakeholder"},
    "C8":  {"name": "Incidents, Risk & Reliability", "domain": "Reliability"},
    "C9":  {"name": "Metrics, Measurement & Outcomes", "domain": "Data"},
    "C10": {"name": "Resource Allocation & Tradeoffs", "domain": "Strategy"},
    "C11": {"name": "Hiring, Onboarding & Role Design", "domain": "People"},
    "C12": {"name": "Culture & Norms Shaping", "domain": "People"},
    "C13": {"name": "Security & Compliance Posture", "domain": "Reliability"},
    "C14": {"name": "Performance Management & Calibration", "domain": "People"},
}

# ── Category → Capability Mapping ───────────────────────────────────
CATEGORY_CAPABILITY_MAP = {
    "Technical Direction": ["C3", "C8", "C13"],
    "Career Development":  ["C6", "C14"],
    "Leadership":          ["C1", "C5", "C10"],
    "Management":          ["C4", "C6", "C14"],
    "Hiring & Onboarding": ["C11", "C12"],
    "Culture":             ["C12", "C7"],
    "Software Quality":    ["C3", "C8", "C9"],
    "Velocity & DevEx":    ["C4", "C9"],
    "Communication":       ["C7", "C5"],
    "Reporting & Metrics": ["C9"],
    "AI":                  ["C3", "C9"],
    "Series":              [],
    "Handbook":            [],
    "Course":              [],
    "Deep Dive":           [],
    "Uncategorized":       [],
    "Huddle":              [],
    "Event_Type":          [],
    "Test Pattern":        [],
}

# ── Keyword → Capability Scoring ────────────────────────────────────
# Each keyword group maps to a capability with a weight
KEYWORD_SCORES = {
    "C1": {
        3: ["organizational strategy", "org design", "org structure", "company strategy",
            "organizational change", "org-level", "strategic vision", "business strategy",
            "transformation", "reorg", "restructur"],
        2: ["strategy", "vision", "alignment", "executive", "c-suite", "board",
            "company-wide", "enterprise", "organizational", "north star",
            "strategic planning", "business objectives", "mission"],
        1: ["leadership", "senior leader", "director", "vp ", "vice president",
            "long-term", "big picture"],
    },
    "C2": {
        3: ["strategic prioritization", "prioritization framework", "roadmap prioritization",
            "okr", "okrs", "strategy execution", "quarterly planning", "annual planning",
            "product strategy"],
        2: ["prioritiz", "roadmap", "backlog", "sprint planning", "resource priorit",
            "trade-off", "tradeoff", "opportunity cost", "scope", "focus"],
        1: ["planning", "goals", "objectives", "initiative", "project selection"],
    },
    "C3": {
        3: ["system design", "systems design", "architecture decision", "technical architecture",
            "microservice", "monolith", "distributed system", "platform engineering",
            "technical strategy", "tech debt strategy"],
        2: ["architecture", "technical decision", "design review", "code review",
            "tech debt", "technical debt", "scalability", "system reliability",
            "infrastructure", "api design", "migration"],
        1: ["technical", "engineering", "design", "platform", "framework",
            "moderniz", "legacy"],
    },
    "C4": {
        3: ["operational cadence", "team rhythm", "sprint retro", "agile transformation",
            "delivery management", "engineering operations", "process improvement",
            "operational excellence"],
        2: ["agile", "scrum", "kanban", "sprint", "standup", "retrospective",
            "delivery", "process", "workflow", "operational", "cadence",
            "ceremonies", "rituals"],
        1: ["team process", "meeting", "efficiency", "productivity", "execution"],
    },
    "C5": {
        3: ["cross-functional", "stakeholder management", "stakeholder alignment",
            "influence without authority", "cross-team collaboration",
            "product partnership", "executive communication"],
        2: ["stakeholder", "influence", "partnership", "collaboration",
            "cross-team", "alignment", "negotiate", "negotiation",
            "product manager", "product management"],
        1: ["relationship", "partner", "communicate", "persuade", "advocate"],
    },
    "C6": {
        3: ["coaching engineer", "1:1", "one-on-one", "career development",
            "career growth", "mentoring engineer", "talent development",
            "career ladder", "career framework", "career path",
            "skill development", "growth plan"],
        2: ["coaching", "mentoring", "mentor", "feedback", "career",
            "development plan", "skill gap", "learning path", "grow",
            "growth", "sponsorship", "sponsor"],
        1: ["training", "learning", "develop", "talent", "potential"],
    },
    "C7": {
        3: ["decision framework", "decision making", "decision-making",
            "communication strategy", "difficult conversation",
            "transparent communication", "decision framing", "rfc process",
            "adr", "architecture decision record"],
        2: ["decision", "communicate", "communication", "transparency",
            "difficult conversation", "conflict resolution", "messaging",
            "narrative", "storytelling", "framing", "context setting"],
        1: ["inform", "share", "explain", "clarity", "clear", "message"],
    },
    "C8": {
        3: ["incident management", "incident response", "on-call", "oncall",
            "postmortem", "post-mortem", "blameless", "reliability engineering",
            "sre ", "site reliability", "disaster recovery", "chaos engineering"],
        2: ["incident", "outage", "reliability", "resilience", "risk management",
            "risk assessment", "downtime", "availability", "failover",
            "monitoring", "alerting", "observability"],
        1: ["risk", "failure", "recovery", "uptime", "sla ", "slo ", "sli "],
    },
    "C9": {
        3: ["engineering metrics", "dora metrics", "developer productivity metrics",
            "space framework", "measurement framework", "kpi engineering",
            "engineering effectiveness", "developer experience metric"],
        2: ["metric", "metrics", "measurement", "measure", "kpi", "okr",
            "dora", "lead time", "deployment frequency", "cycle time",
            "throughput", "velocity metric", "developer experience",
            "devex survey", "developer satisfaction"],
        1: ["data", "dashboard", "report", "analytics", "track", "benchmark"],
    },
    "C10": {
        3: ["resource allocation", "team allocation", "capacity planning",
            "headcount planning", "budget allocation", "staffing model",
            "team sizing", "resourcing"],
        2: ["resource", "allocation", "capacity", "headcount", "budget",
            "staffing", "team size", "right-sizing", "outsourc",
            "contractor", "vendor", "tradeoff", "trade-off"],
        1: ["cost", "invest", "roi", "efficiency", "optimize", "constraint"],
    },
    "C11": {
        3: ["hiring engineer", "technical interview", "interview process",
            "onboarding engineer", "onboarding program", "recruiting engineer",
            "job description", "role design", "hiring pipeline",
            "interview loop", "hiring bar"],
        2: ["hiring", "interview", "onboarding", "recruiting", "recruitment",
            "candidate", "offer", "job post", "talent acquisition",
            "new hire", "ramp up", "ramp-up", "first 90 days"],
        1: ["hire", "team building", "team composition", "role"],
    },
    "C12": {
        3: ["engineering culture", "team culture", "culture change",
            "psychological safety", "inclusive culture", "team norms",
            "culture shaping", "belonging"],
        2: ["culture", "diversity", "inclusion", "dei", "equity",
            "psychological safety", "trust", "norms", "values",
            "inclusive", "belonging", "team dynamic", "team health",
            "toxicity", "toxic"],
        1: ["environment", "morale", "engagement", "community", "safe space"],
    },
    "C13": {
        3: ["security engineering", "compliance framework", "security posture",
            "security culture", "devsecops", "security review",
            "regulatory compliance", "gdpr", "sox", "pci",
            "threat model", "vulnerability management"],
        2: ["security", "compliance", "regulation", "audit", "privacy",
            "data protection", "access control", "authentication",
            "authorization", "encryption"],
        1: ["secure", "protect", "govern", "policy", "standard"],
    },
    "C14": {
        3: ["performance review", "performance management", "calibration session",
            "performance improvement plan", "pip ", "promotion process",
            "compensation", "perf review", "performance calibration",
            "underperformer", "high performer"],
        2: ["performance", "review cycle", "evaluation", "promotion",
            "raise", "comp ", "compensation", "bonus", "calibrat",
            "underperform", "low performer", "rating"],
        1: ["assess", "evaluate", "apprais", "reward", "recognition"],
    },
}

# ── Enrichment Type Detection ───────────────────────────────────────
ENRICHMENT_KEYWORDS = {
    "playbook": ["how to", "step by step", "guide to", "playbook", "framework for",
                 "approach to", "strategy for", "template", "checklist",
                 "practical guide", "handbook", "tactics", "best practice",
                 "ways to", "tips for", "techniques"],
    "anti-pattern": ["mistake", "anti-pattern", "antipattern", "avoid", "don't",
                     "wrong way", "pitfall", "trap", "fail", "failure",
                     "bad practice", "what not to", "common error", "dysfunction",
                     "toxic", "red flag", "warning sign"],
    "observable": ["sign", "signal", "indicator", "behavior", "observable",
                   "how to spot", "how to tell", "recognize", "identify",
                   "characteristic", "trait", "pattern"],
    "interview-question": ["interview", "question", "hiring", "assess candidate",
                          "evaluate candidate", "behavioral question"],
    "calibration-signal": ["calibration", "performance review", "promo packet",
                          "level", "leveling", "senior vs", "staff vs",
                          "what good looks like", "bar for"],
    "learning-resource": ["learn", "course", "book", "resource", "reading",
                         "education", "training", "workshop", "talk",
                         "conference", "tutorial", "deep dive"],
    "measurement-guidance": ["measure", "metric", "kpi", "benchmark",
                            "dashboard", "data-driven", "quantif",
                            "leading indicator", "lagging indicator"],
    "rubric-anchor": ["level", "leveling", "senior", "staff", "principal",
                     "career ladder", "expectations", "competency",
                     "progression", "growth framework"],
}

# ── Value Signal Detection ──────────────────────────────────────────
VALUE_SIGNALS = {
    "framework": ["framework", "model", "matrix", "taxonomy", "spectrum",
                  "quadrant", "continuum", "archetype"],
    "case-study": ["case study", "at scale", "how we", "lessons from",
                   "story of", "experience at", "our journey",
                   "real-world", "in practice"],
    "anti-pattern": ["mistake", "anti-pattern", "failure", "what went wrong",
                     "what not to", "pitfall", "trap"],
    "technique": ["technique", "tactic", "approach", "method", "practice",
                  "hack", "tip", "trick", "strategy"],
    "metric": ["metric", "measurement", "benchmark", "data", "survey",
               "quantitative", "research finding"],
    "research": ["research", "study", "survey", "data shows", "evidence",
                 "finding", "analysis", "report"],
}


def score_article(article):
    """Score a single article for relevance to the EM framework."""
    title = (article.get('title') or '').lower()
    desc = (article.get('description') or '').lower()
    category = article.get('category', '')
    text = f"{title} {desc}"

    # ── Capability Scoring ──────────────────────────────
    capability_scores = defaultdict(float)

    # 1. Category mapping gives base score
    if category in CATEGORY_CAPABILITY_MAP:
        for cap in CATEGORY_CAPABILITY_MAP[category]:
            capability_scores[cap] += 1.5

    # 2. Keyword matching
    for cap_id, weight_groups in KEYWORD_SCORES.items():
        for weight, keywords in weight_groups.items():
            for kw in keywords:
                if kw in text:
                    capability_scores[cap_id] += weight
                    break  # Only count highest match per weight group

    # Determine primary and secondary capabilities
    sorted_caps = sorted(capability_scores.items(), key=lambda x: -x[1])
    sorted_caps = [(c, s) for c, s in sorted_caps if s >= 1.0]

    primary = sorted_caps[0][0] if sorted_caps else "general"
    secondary = sorted_caps[1][0] if len(sorted_caps) > 1 else None

    # ── Overall Relevance Score (1-5) ───────────────────
    max_cap_score = sorted_caps[0][1] if sorted_caps else 0

    if max_cap_score >= 6:
        relevance = 5
    elif max_cap_score >= 4:
        relevance = 4
    elif max_cap_score >= 2.5:
        relevance = 3
    elif max_cap_score >= 1.0:
        relevance = 2
    else:
        relevance = 1

    # Boost for substantive content
    word_count = article.get('wordCount', 0)
    if word_count >= 2000 and relevance < 5:
        relevance = min(relevance + 0.5, 5)
    if word_count >= 3000 and relevance < 5:
        relevance = min(relevance + 0.5, 5)

    # Round to nearest int
    relevance = round(relevance)

    # ── Enrichment Types ────────────────────────────────
    enrichment_types = []
    for etype, keywords in ENRICHMENT_KEYWORDS.items():
        for kw in keywords:
            if kw in text:
                enrichment_types.append(etype)
                break

    if not enrichment_types:
        enrichment_types = ["learning-resource"]  # Default

    # ── Value Signal ────────────────────────────────────
    value_signal = "general"
    best_signal_score = 0
    for signal, keywords in VALUE_SIGNALS.items():
        score = sum(1 for kw in keywords if kw in text)
        if score > best_signal_score:
            best_signal_score = score
            value_signal = signal

    return {
        "id": article['id'],
        "title": article['title'],
        "url": article['url'],
        "category": category,
        "type": article['type'],
        "date": article.get('date', ''),
        "wordCount": word_count,
        "description": article.get('description', ''),
        "relevance": relevance,
        "primaryCapability": primary,
        "secondaryCapability": secondary,
        "enrichmentTypes": enrichment_types,
        "valueSignal": value_signal,
        "capabilityScores": {k: round(v, 1) for k, v in sorted_caps[:5]},
    }


# ── Process All Articles ────────────────────────────────────────────
scored = [score_article(a) for a in articles]

# Save
with open('reference/articles-scored.json', 'w') as f:
    json.dump(scored, f, indent=2)

# ── Statistics ──────────────────────────────────────────────────────
from collections import Counter

relevance_dist = Counter(a['relevance'] for a in scored)
print("Relevance Distribution:")
for r in sorted(relevance_dist.keys()):
    print(f"  Score {r}: {relevance_dist[r]} articles")

primary_dist = Counter(a['primaryCapability'] for a in scored)
print("\nPrimary Capability Distribution:")
for cap, count in primary_dist.most_common():
    label = CAPABILITIES.get(cap, {}).get('name', cap)
    print(f"  {cap} ({label}): {count}")

enrichment_dist = Counter()
for a in scored:
    for e in a['enrichmentTypes']:
        enrichment_dist[e] += 1
print("\nEnrichment Type Distribution:")
for e, count in enrichment_dist.most_common():
    print(f"  {e}: {count}")

value_dist = Counter(a['valueSignal'] for a in scored)
print("\nValue Signal Distribution:")
for v, count in value_dist.most_common():
    print(f"  {v}: {count}")

tier1 = [a for a in scored if a['relevance'] >= 4]
tier2 = [a for a in scored if a['relevance'] == 3]
tier3 = [a for a in scored if a['relevance'] <= 2]
print(f"\nTier 1 (relevance 4-5): {len(tier1)} articles")
print(f"Tier 2 (relevance 3):   {len(tier2)} articles")
print(f"Tier 3 (relevance 1-2): {len(tier3)} articles")

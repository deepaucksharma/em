#!/usr/bin/env python3
"""
Session 20 — Systematic review of C7 (47), C11 (35), C1 (34) = 116 Tier 1 articles
C7: All covered, zero gaps.
C11: AI-era hiring is genuine gap (interview design for AI-augmented candidates).
C1: AI-driven org redesign + post-flattening leadership vacuum are genuine gaps.

Additions:
  - Calibration Signals: +4 (C1: 2 AI/flattening, C11: 2 AI hiring)
  - Learning Pathways: +3 article references (C1: 1, C11: 2)
"""

import json
import os

DATA = "src/data"
REF = "reference"

def load(name):
    path = os.path.join(DATA, name)
    with open(path) as f:
        return json.load(f)

def save(name, data):
    path = os.path.join(DATA, name)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"  Saved {path}")

# ── Learning Pathway Articles ──────────────────────────

LP_ADDITIONS = {
    "C1": [
        {
            "title": "The AI-Augmented Team: Rethinking Roles, Skills, and Leadership (LeadDev)",
            "type": "article",
            "description": "How engineering leaders must redesign team structures and operating models to leverage AI capabilities — explicit human-AI task boundaries, updated cognitive load calculations, and the shift from headcount scaling to capability scaling.",
            "url": "https://leaddev.com/technical-direction/the-ai-augmented-team-rethinking-roles-skills-and-leadership"
        }
    ],
    "C11": [
        {
            "title": "Interviewing in the Age of AI (LeadDev)",
            "type": "article",
            "description": "How to redesign interview processes when candidates use AI tools — evaluating engineering judgment, system thinking, and communication rather than raw code production. AI-resilient assessment design.",
            "url": "https://leaddev.com/hiring/interviewing-in-the-age-of-ai"
        },
        {
            "title": "AI-First Hiring Is Everywhere and It's Not Slowing Down (LeadDev)",
            "type": "article",
            "description": "The equity and effectiveness implications of AI in hiring — from candidates using AI during assessments to companies requiring AI proficiency as a hiring signal. Navigating the shift without amplifying bias.",
            "url": "https://leaddev.com/hiring/ai-first-hiring-everywhere-not-slowing-down"
        }
    ]
}

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C1 — AI-driven org redesign (C1-O1 team topology, currently has signals but none mention AI)
    {
        "id": "SIG-307",
        "observableId": "C1-O1",
        "capabilityId": "C1",
        "signalText": "Leader has redesigned team structures and operating models to leverage AI capabilities — explicit human-AI task boundaries defined, cognitive load calculations updated to account for AI-augmented workflows, and headcount requests justified against what AI tooling cannot accomplish",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI-Era Org Design"
    },
    # C1 — Post-flattening leadership vacuum (C1-O7 org health, gap around structural management removal)
    {
        "id": "SIG-308",
        "observableId": "C1-O7",
        "capabilityId": "C1",
        "signalText": "Leader monitors for 'hollow middle' effects after org flattening — tracks whether ICs or staff engineers are absorbing management responsibilities without title or compensation, watches for succession gaps created by permanent removal of leadership layers, and intervenes when accountability exists without authority",
        "signalType": "calibration_language",
        "sourceSubTopic": "Post-Flattening Org Health"
    },
    # C11 — AI-resilient interview design (C11-O9 structured interviews)
    {
        "id": "SIG-309",
        "observableId": "C11-O9",
        "capabilityId": "C11",
        "signalText": "Interview process explicitly addresses AI tool usage — clear policy communicated to candidates on whether AI tools are allowed during assessments, interview rubrics evaluate engineering judgment and system design reasoning rather than code production speed, and assessment formats are designed to surface thinking process not just output",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI-Era Interview Design"
    },
    # C11 — Interviewer calibration on AI (C11-O8 interviewer calibration)
    {
        "id": "SIG-310",
        "observableId": "C11-O8",
        "capabilityId": "C11",
        "signalText": "Interviewers are calibrated on AI-era assessment — trained to distinguish between candidates who can direct AI tools effectively and those who understand the underlying engineering, with explicit guidance on how to evaluate AI-assisted work samples without penalizing or rewarding AI usage itself",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI-Era Interviewer Calibration"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 20 Enrichments ===")

# Learning Pathways
lp = load("learning-pathways.json")
lp_articles_added = 0
for pathway in lp:
    cap = pathway["capabilityId"]
    if cap in LP_ADDITIONS:
        pathway["practical"].extend(LP_ADDITIONS[cap])
        lp_articles_added += len(LP_ADDITIONS[cap])
save("learning-pathways.json", lp)
print(f"  Added {lp_articles_added} learning pathway article references")

# Calibration Signals
cs = load("calibration-signals.json")
cs.extend(NEW_SIGNALS)
save("calibration-signals.json", cs)
print(f"  Added {len(NEW_SIGNALS)} calibration signals (total: {len(cs)})")

# ── Mark C7, C11, C1 articles as reviewed ──────────────

pq = json.load(open(os.path.join(REF, "articles-priority-queue.json")))
counts = {"C7": 0, "C11": 0, "C1": 0}
for article in pq:
    cap = article.get('primaryCapability')
    if cap in counts and article.get('tier') == 1 and not article.get('reviewed'):
        article['reviewed'] = True
        article['reviewedInSession'] = "20"
        counts[cap] += 1

with open(os.path.join(REF, "articles-priority-queue.json"), "w") as f:
    json.dump(pq, f, indent=2)
for cap, cnt in counts.items():
    print(f"  Marked {cnt} {cap} articles as reviewed")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

total_articles = sum(counts.values())
session20 = {
    "session": 20,
    "date": "2026-02-20",
    "focus": "Systematic review of C7 (47), C11 (35), C1 (34) = 116 Tier 1 articles",
    "articlesReviewed": total_articles,
    "additions": {
        "learningPathways": 3,
        "calibrationSignals": 4
    },
    "capabilitiesEnriched": ["C1", "C11"],
    "coverageImpact": {
        "C7": "All 47 articles covered by existing content — zero gaps",
        "C11": "CS: AI-era interview design + interviewer calibration on AI tools, LP: +2 AI hiring articles",
        "C1": "CS: AI-driven org redesign + post-flattening leadership vacuum, LP: +1 AI-augmented team article"
    },
    "notes": "C7 is the most comprehensively covered capability — all 47 articles map to existing 11 observables, 5 APs, 7+ playbooks. C11 gap: AI-era hiring (interview design for AI-augmented candidates, interviewer calibration on AI tool usage). C1 gaps: AI-driven org redesign (human-AI task boundaries, operating model changes) and post-flattening leadership vacuum (permanent removal of management layers creating hollow middle)."
}

rp["sessions"].append(session20)
for key in session20["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session20["additions"][key]
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["calibrationSignals"] = len(cs)

remaining_t1 = sum(1 for a in pq if a.get('tier') == 1 and not a.get('reviewed'))
rp["remainingTier1"] = remaining_t1

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Remaining Tier 1: {remaining_t1}")

print(f"\n=== Session 20 Summary ===")
print(f"Articles reviewed: {total_articles} (C7:{counts['C7']}, C11:{counts['C11']}, C1:{counts['C1']})")
print(f"Calibration Signals: +4 (C1: AI org design + flattening, C11: AI interview design)")
print(f"Learning Pathways: +3 article refs (C1: 1, C11: 2)")

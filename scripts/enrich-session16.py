#!/usr/bin/env python3
"""
Session 16 Enrichment — Learning pathway depth + calibration signal floor raise
Based on critical reading of LeadDev articles across multiple capabilities.

Targets:
  - Learning Pathways: +10 article references (C2, C3, C4, C10, C13: 2 each, all 5→7)
  - Calibration Signals: +8 (C12: 4, C14: 4 — targeting 1-signal observables)
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

# ── Learning Pathway References ────────────────────────

LP_ADDITIONS = {
    "C2": [
        {
            "title": "How to Build an Effective Technical Strategy (LeadDev)",
            "type": "article",
            "description": "Components of a robust technical strategy: aligning technical direction with organizational goals, collaborative vs. top-down approaches, and translating strategy into engineering priorities.",
            "url": "https://leaddev.com/technical-direction/how-build-effective-technical-strategy"
        },
        {
            "title": "Introducing OKRs to Your Team: From General Alignment to Measurable Results (LeadDev)",
            "type": "article",
            "description": "Step-by-step approach to transitioning from vague strategic intentions to measurable OKRs that connect engineering work to business goals.",
            "url": "https://leaddev.com/reporting-metrics/introducing-okrs-your-team-general-alignment-measurable-results"
        }
    ],
    "C3": [
        {
            "title": "Documenting and Communicating Architectural Decisions (LeadDev)",
            "type": "article",
            "description": "Lightweight, transparent methods for documenting architecture decisions in agile teams — enabling team autonomy while maintaining architectural coherence.",
            "url": "https://leaddev.com/code-reviews-docs/documenting-and-communicating-architectural-decisions"
        },
        {
            "title": "A Leader's Blueprint for Scaling Systems (LeadDev)",
            "type": "article",
            "description": "How engineering leaders identify and break through scalability ceilings — the strategic architectural decisions needed at each system growth inflection point.",
            "url": "https://leaddev.com/technical-direction/a-leaders-blueprint-for-scaling-systems"
        }
    ],
    "C4": [
        {
            "title": "What Is Developer Experience? Your Route to Better Productivity (LeadDev)",
            "type": "article",
            "description": "Developer experience as a lens for productivity: cognitive load, flow state, and feedback loops — practical framework for identifying and prioritizing DevEx improvements.",
            "url": "https://leaddev.com/process/what-developer-experience-your-route-better-productivity"
        },
        {
            "title": "How to Cultivate a Great Engineering Process (LeadDev)",
            "type": "article",
            "description": "Engineering leaders as process cultivators: observe work flow, find friction points, experiment with targeted changes rather than adopting off-the-shelf frameworks.",
            "url": "https://leaddev.com/velocity/how-cultivate-great-engineering-process"
        }
    ],
    "C10": [
        {
            "title": "5 Best Practices for Annual Budget Planning (LeadDev)",
            "type": "article",
            "description": "Practical guidance on stack-ranking priorities, evaluating headcount needs, and building data-driven business cases that resonate with executive stakeholders.",
            "url": "https://leaddev.com/career-development/5-best-practices-annual-budget-planning"
        },
        {
            "title": "Leading Through Scarcity: Building Capacity in the Team You Have (LeadDev)",
            "type": "article",
            "description": "Maximizing team performance under resource constraints through sustainable leadership practices and deliberate capacity-building without additional headcount.",
            "url": "https://leaddev.com/management/leading-through-scarcity-building-capacity-in-the-team-you-have"
        }
    ],
    "C13": [
        {
            "title": "Building Security into Your Engineering Workflow (LeadDev)",
            "type": "article",
            "description": "Integrating security practices directly into the development process using tools, team practices, and process design that reduce vulnerabilities while maintaining velocity.",
            "url": "https://leaddev.com/building-better-software/building-security-your-engineering-workflow"
        },
        {
            "title": "Shifting Left on Security: Five Steps to Transformation (LeadDev)",
            "type": "article",
            "description": "Five-step transformation plan for embedding security earlier in the development lifecycle through cultural change, cross-functional collaboration, and concrete process improvements.",
            "url": "https://leaddev.com/software-quality/shifting-left-security-five-steps-transformation"
        }
    ]
}

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C12 — targeting 1-signal observables
    {
        "id": "SIG-288",
        "observableId": "C12-O5",
        "capabilityId": "C12",
        "signalText": "Manager tracks opportunity distribution data (project leads, high-visibility assignments, conference talks) and can show equitable allocation across team members regardless of background or tenure",
        "signalType": "calibration_language",
        "sourceSubTopic": "Inclusive Practices & Equitable Opportunity"
    },
    {
        "id": "SIG-289",
        "observableId": "C12-O5",
        "capabilityId": "C12",
        "signalText": "Team members from underrepresented groups report feeling equally included in technical discussions and decision-making, not just invited to meetings but actively sought out for input",
        "signalType": "calibration_language",
        "sourceSubTopic": "Inclusive Practices & Equitable Opportunity"
    },
    {
        "id": "SIG-290",
        "observableId": "C12-O8",
        "capabilityId": "C12",
        "signalText": "Manager addresses toxic behavior patterns within 1 week of identification — does not wait for formal complaints or performance review cycles to intervene on behaviors that damage team trust",
        "signalType": "calibration_language",
        "sourceSubTopic": "Toxic Behavior Intervention"
    },
    {
        "id": "SIG-291",
        "observableId": "C12-O8",
        "capabilityId": "C12",
        "signalText": "Team has explicit behavioral norms documented in team charter, and manager references them when addressing violations — interventions feel principled rather than personal",
        "signalType": "calibration_language",
        "sourceSubTopic": "Toxic Behavior Intervention"
    },
    # C14 — targeting 1-signal observables
    {
        "id": "SIG-292",
        "observableId": "C14-O2",
        "capabilityId": "C14",
        "signalText": "Manager prepares calibration cases with 3+ specific examples per rating dimension, anticipates which ratings will be challenged, and has pre-built counter-arguments grounded in observable behavior rather than general impressions",
        "signalType": "calibration_language",
        "sourceSubTopic": "Calibration Preparation & Evidence"
    },
    {
        "id": "SIG-293",
        "observableId": "C14-O2",
        "capabilityId": "C14",
        "signalText": "During calibration sessions, manager advocates effectively for their reports without inflating — peers trust the manager's assessments because they are consistently evidence-based and honest about gaps",
        "signalType": "calibration_language",
        "sourceSubTopic": "Calibration Preparation & Evidence"
    },
    {
        "id": "SIG-294",
        "observableId": "C14-O4",
        "capabilityId": "C14",
        "signalText": "Performance feedback is delivered within 48 hours of the observed behavior using Situation-Behavior-Impact format — engineers always know where they stand and are never surprised at review time",
        "signalType": "calibration_language",
        "sourceSubTopic": "Timely Performance Feedback"
    },
    {
        "id": "SIG-295",
        "observableId": "C14-O5",
        "capabilityId": "C14",
        "signalText": "Manager maintains a running promotion document for each promotion-track engineer with gap analysis updated monthly — engineers see a clear path from current performance to next level with specific evidence milestones",
        "signalType": "calibration_language",
        "sourceSubTopic": "Promotion Evidence Building"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 16 Enrichments ===")

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

# Search Index (no new searchable entities this session)
si = load("search-index.json")

# Update review-progress.json
rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session16 = {
    "session": 16,
    "date": "2026-02-20",
    "focus": "Learning pathway depth (C2/C3/C4/C10/C13 to 7) + calibration signal floor raise (C12/C14)",
    "articlesReviewed": 10,
    "additions": {
        "learningPathways": 10,
        "calibrationSignals": 8
    },
    "capabilitiesEnriched": ["C2", "C3", "C4", "C10", "C12", "C13", "C14"],
    "coverageImpact": {
        "C2": "LP: 5P->7P",
        "C3": "LP: 5P->7P",
        "C4": "LP: 5P->7P",
        "C10": "LP: 5P->7P",
        "C13": "LP: 5P->7P",
        "C12": "CS: 18->22 (O5, O8 from 1->3 signals each)",
        "C14": "CS: 18->22 (O2, O4, O5 from 1->2-3 signals each)"
    },
    "notes": "All 14 capabilities now have 7+ practical learning pathway resources. Targeted 1-signal observables in C12 (inclusive practices, toxic behavior intervention) and C14 (calibration preparation, feedback delivery, promotion evidence). Based on LeadDev articles on technical strategy, OKRs, architecture decisions, developer experience, budget planning, resource scarcity, and security integration."
}

rp["sessions"].append(session16)

for key in session16["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session16["additions"][key]

rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["calibrationSignals"] = len(cs)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

print(f"\n=== Session 16 Summary ===")
print(f"Learning Pathways: +{lp_articles_added} article refs (C2, C3, C4, C10, C13: all 5->7)")
print(f"Calibration Signals: +{len(NEW_SIGNALS)} (C12: 4, C14: 4)")
print(f"All capabilities now have 7+ practical LP resources and 19+ calibration signals")

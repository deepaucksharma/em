#!/usr/bin/env python3
"""
Session 19 — Systematic C3 article review (102 Tier 1 articles)
~90 covered by existing content, ~12 with novel concepts.

Key finding: AI architecture governance is the single biggest C3 gap —
no existing content addresses AI-generated code debt, AI tool evaluation
as architecture decisions, or quality guardrails for AI-assisted development.

Additions:
  - Calibration Signals: +5 (AI governance, decentralized arch decisions,
    API lifecycle, fitness functions, experimentation in roadmap)
  - Learning Pathways: +2 article references (C3 practical tier)
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
    "C3": [
        {
            "title": "How AI-Generated Code Compounds Technical Debt (LeadDev)",
            "type": "article",
            "description": "Why AI-generated code creates a new category of tech debt — higher volume, lower comprehension, pattern-based duplication — and what guardrails engineering leaders need to establish.",
            "url": "https://leaddev.com/technical-direction/how-ai-generated-code-compounds-technical-debt"
        },
        {
            "title": "The Architecture Advice Process (LeadDev)",
            "type": "article",
            "description": "Andrew Harmel-Law's decentralized architecture decision model — anyone can make architectural decisions after consulting affected parties, replacing ivory-tower mandates with distributed ownership.",
            "url": "https://leaddev.com/technical-direction/facilitating-software-architecture-andrew-harmel-law-conversation"
        }
    ]
}

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # AI architecture governance (C3-O2, currently 2 signals — biggest C3 gap)
    {
        "id": "SIG-302",
        "observableId": "C3-O2",
        "capabilityId": "C3",
        "signalText": "Manager has established explicit guardrails for AI-assisted development — AI-generated code undergoes the same review standards as human-written code, with additional scrutiny for comprehension (the engineer can explain what the code does and why), security implications, and long-term maintainability",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI Architecture Governance"
    },
    # AI-generated tech debt (C3-O4, currently 1 signal)
    {
        "id": "SIG-303",
        "observableId": "C3-O4",
        "capabilityId": "C3",
        "signalText": "Tech debt tracking explicitly includes AI-generated code debt — monitoring for DRY violations, duplicated logic across AI-generated modules, and code that no team member fully understands, with metrics showing AI-debt trends alongside traditional tech debt",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI-Generated Tech Debt Management"
    },
    # Decentralized architecture decisions (C3-O1, currently 2 signals)
    {
        "id": "SIG-304",
        "observableId": "C3-O1",
        "capabilityId": "C3",
        "signalText": "Architecture decisions are made through a structured advice process — any engineer can propose and make architectural decisions after consulting affected parties and documenting the decision in an ADR, distributing architecture ownership rather than centralizing it in a review board",
        "signalType": "calibration_language",
        "sourceSubTopic": "Decentralized Architecture Governance"
    },
    # Architectural fitness functions (C3-O2, currently 2 signals)
    {
        "id": "SIG-305",
        "observableId": "C3-O2",
        "capabilityId": "C3",
        "signalText": "Team uses automated architectural fitness functions — codified checks in CI that verify non-functional requirements (dependency direction, module coupling, API compatibility, performance budgets) so architecture governance scales without requiring manual review of every change",
        "signalType": "calibration_language",
        "sourceSubTopic": "Automated Architecture Governance"
    },
    # Experimentation as roadmap element (C3-O1, currently 2 signals)
    {
        "id": "SIG-306",
        "observableId": "C3-O1",
        "capabilityId": "C3",
        "signalText": "Technical roadmap explicitly allocates capacity for experimentation — spikes, proof-of-concepts, and hypothesis-driven technical bets are first-class roadmap items with clear success criteria and time-boxes, not just ad-hoc explorations squeezed between feature work",
        "signalType": "calibration_language",
        "sourceSubTopic": "Technical Experimentation & Innovation"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 19 Enrichments ===")

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

# ── Mark C3 articles as reviewed ───────────────────────

pq = json.load(open(os.path.join(REF, "articles-priority-queue.json")))
reviewed_count = 0
for article in pq:
    if article.get('primaryCapability') == 'C3' and article.get('tier') == 1 and not article.get('reviewed'):
        article['reviewed'] = True
        article['reviewedInSession'] = "19"
        reviewed_count += 1

with open(os.path.join(REF, "articles-priority-queue.json"), "w") as f:
    json.dump(pq, f, indent=2)
print(f"  Marked {reviewed_count} C3 articles as reviewed")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session19 = {
    "session": 19,
    "date": "2026-02-20",
    "focus": "Systematic C3 article review (102 Tier 1 articles)",
    "articlesReviewed": 102,
    "additions": {
        "learningPathways": 2,
        "calibrationSignals": 5
    },
    "capabilitiesEnriched": ["C3"],
    "coverageImpact": {
        "C3": "CS: 19->24 (AI governance, decentralized arch, fitness functions, experimentation), LP: 7P->9P"
    },
    "notes": "Systematic review of all 102 Tier 1 C3 articles. ~90 covered by existing content. Biggest gap: AI architecture governance — no existing C3 content addressed AI-generated code debt or AI tool evaluation. Added calibration signals for AI code review guardrails, AI-generated debt tracking, decentralized architecture advice process, automated fitness functions, and experimentation as roadmap element. Learning pathways enriched with AI code debt article and architecture advice process."
}

rp["sessions"].append(session19)
for key in session19["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session19["additions"][key]
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["calibrationSignals"] = len(cs)

remaining_t1 = sum(1 for a in pq if a.get('tier') == 1 and not a.get('reviewed'))
rp["remainingTier1"] = remaining_t1

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Remaining Tier 1: {remaining_t1}")

print(f"\n=== Session 19 Summary ===")
print(f"C3 articles reviewed: 102 (~90 covered, ~12 novel)")
print(f"Calibration Signals: +5 (AI governance, decentralized arch, fitness functions)")
print(f"Learning Pathways: +2 article refs")

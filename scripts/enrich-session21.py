#!/usr/bin/env python3
"""
Session 21 — Complete Tier 1 review: C9 (28), C8 (27), C5 (20), C14 (14),
C4 (12), C13 (3), C2 (3), C12 (1) = 108 remaining articles.

C5, C14, C4, C13, C2: All covered, zero gaps.
C9: DX Core 4 meta-framework + AI metrics vacuum are genuine gaps.
C8: AI-era incident patterns (AI-generated code as incident amplifier) is genuine gap.

Additions:
  - Calibration Signals: +3 (C9: 2, C8: 1)
  - Learning Pathways: +2 article references (C9: 1, C8: 1)

This completes the systematic review of all 502 Tier 1 articles.
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
    "C9": [
        {
            "title": "How DX Core 4 Aims to Unify Developer Productivity Frameworks (LeadDev)",
            "type": "article",
            "description": "The DX Core 4 framework (Speed, Effectiveness, Quality, Impact) as a prescriptive meta-model that subsumes DORA and SPACE — practical guidance on framework selection based on organizational maturity.",
            "url": "https://leaddev.com/reporting/dx-core-4-aims-to-unify-developer-productivity-frameworks"
        }
    ],
    "C8": [
        {
            "title": "Is AI-Assisted Coding an Incident Magnet? (LeadDev)",
            "type": "article",
            "description": "How AI-generated code creates a new incident class — code ships faster but with less human comprehension, eroding domain expertise needed for incident diagnosis and creating cascading failures through opaque AI decision chains.",
            "url": "https://leaddev.com/software-quality/ai-assisted-coding-incident-magnet"
        }
    ]
}

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C9 — DX Core 4 / unified metrics framework (C9-O1, DORA metrics)
    {
        "id": "SIG-311",
        "observableId": "C9-O1",
        "capabilityId": "C9",
        "signalText": "Leader selects and applies productivity frameworks (DORA, SPACE, DX Core 4) appropriate to organizational maturity — understands that DORA measures delivery performance, SPACE captures developer experience breadth, and DX Core 4 provides a unified prescriptive model (Speed/Effectiveness/Quality/Impact) rather than applying frameworks dogmatically",
        "signalType": "calibration_language",
        "sourceSubTopic": "Productivity Framework Selection Maturity"
    },
    # C9 — AI metrics vacuum (C9-O5, engineering-to-business translation)
    {
        "id": "SIG-312",
        "observableId": "C9-O5",
        "capabilityId": "C9",
        "signalText": "Leader measures AI tool effectiveness using a three-dimensional framework — utilization (adoption rate and penetration), impact (time saved and performance benchmarks vs. baseline), and cost (TCO including license, training, and maintenance overhead) — rather than relying on vanity metrics like acceptance rate that track usage without measuring outcomes",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI Tool Effectiveness Measurement"
    },
    # C8 — AI-era incident readiness (C8-O7, system resilience)
    {
        "id": "SIG-313",
        "observableId": "C8-O7",
        "capabilityId": "C8",
        "signalText": "Team has explicit incident readiness for AI-generated code failures — monitoring for AI-specific incident patterns (cascading failures through opaque logic, comprehension gaps during diagnosis), maintaining human expertise for systems with significant AI-generated components, and governance guardrails for any AI agents involved in incident response",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI-Era Incident Readiness"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 21 Enrichments ===")

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

# ── Mark ALL remaining T1 articles as reviewed ─────────

pq = json.load(open(os.path.join(REF, "articles-priority-queue.json")))
reviewed_count = 0
for article in pq:
    if article.get('tier') == 1 and not article.get('reviewed'):
        article['reviewed'] = True
        article['reviewedInSession'] = "21"
        reviewed_count += 1

with open(os.path.join(REF, "articles-priority-queue.json"), "w") as f:
    json.dump(pq, f, indent=2)
print(f"  Marked {reviewed_count} remaining T1 articles as reviewed")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session21 = {
    "session": 21,
    "date": "2026-02-20",
    "focus": "Complete Tier 1 review: C9(28), C8(27), C5(20), C14(14), C4(12), C13(3), C2(3), C12(1) = 108 articles",
    "articlesReviewed": reviewed_count,
    "additions": {
        "learningPathways": 2,
        "calibrationSignals": 3
    },
    "capabilitiesEnriched": ["C8", "C9"],
    "coverageImpact": {
        "C9": "CS: +2 (DX Core 4 framework selection + AI tool effectiveness measurement), LP: +1",
        "C8": "CS: +1 (AI-era incident readiness), LP: +1",
        "C5": "All 20 articles covered — zero gaps",
        "C14": "All 14 articles covered — zero gaps",
        "C4": "All 12 articles covered — zero gaps",
        "C13": "All 3 articles covered — zero gaps",
        "C2": "All 3 articles covered — zero gaps"
    },
    "notes": "TIER 1 REVIEW COMPLETE. All 502 Tier 1 articles systematically reviewed across sessions 18-21. From 502 articles: ~85% already covered by existing framework, ~15% contributed novel concepts resulting in new playbooks, calibration signals, and learning pathway references. Key AI-era gaps filled: org redesign (C1), architecture governance (C3), interview design (C11), metrics measurement (C9), and incident readiness (C8). The framework's observables are written at the right abstraction level to encompass most LeadDev content without requiring article-specific additions."
}

rp["sessions"].append(session21)
for key in session21["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session21["additions"][key]
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["calibrationSignals"] = len(cs)

remaining_t1 = sum(1 for a in pq if a.get('tier') == 1 and not a.get('reviewed'))
rp["remainingTier1"] = remaining_t1

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Remaining Tier 1: {remaining_t1}")

# Final stats
total_reviewed = sum(1 for a in pq if a.get('reviewed'))
total_t1 = sum(1 for a in pq if a.get('tier') == 1)
print(f"\n=== Session 21 Summary ===")
print(f"Articles reviewed this session: {reviewed_count}")
print(f"Calibration Signals: +3 (C9: DX Core 4 + AI metrics, C8: AI incidents)")
print(f"Learning Pathways: +2 article refs")
print(f"\n=== TIER 1 COMPLETE ===")
print(f"Total T1 articles: {total_t1}")
print(f"Total reviewed: {total_reviewed}")
print(f"Remaining T1: {remaining_t1}")

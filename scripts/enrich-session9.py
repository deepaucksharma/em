#!/usr/bin/env python3
"""
Session 9 Enrichment — Closing remaining anti-pattern gaps + thin calibration signals
Based on critical reading of LeadDev articles:
  - "How to avoid alert fatigue" (C8 anti-pattern)
  - "Rethinking your engineer hiring strategy in 2024" + "6 hiring trends 2025" (C11 anti-pattern)
  - "Drive product gaps as an engineering leader" (C5 anti-pattern)
  - "Building better on-call routines" + "How to reduce stress for on-call teams" (C8 signals)
  - "Patching the hiring pipeline" + "Three ways to remove bias" (C11 signals)
  - "Five tips for large cross-functional collaborations" (C5 signals)

Targets:
  - Anti-Patterns: +3 (C8: 3→4, C11: 3→4, C5: 3→4)
  - Calibration Signals: +6 (C8: 17→19, C11: 21→23, C5: 27→29)
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

# ── Anti-Patterns ──────────────────────────────────────

NEW_ANTI_PATTERNS = [
    {
        "id": "AP-57",
        "name": "Alert Noise Normalization",
        "slug": "alert-noise-normalization",
        "observableIds": ["C8-O3", "C8-O8"],
        "capabilityId": "C8",
        "shortDesc": "team accumulates alerts over time but nobody removes them — engineers are scared of deleting an alert that might matter, so non-actionable noise grows until the on-call is desensitized and real incidents get slower response",
        "warningSigns": [
            "On-call engineers routinely mute or snooze alerts without investigating",
            "New alert rules get added after incidents but old ones are never removed",
            "Page volume is high but most pages result in 'no action needed'",
            "On-call handoff includes tribal knowledge about which alerts to ignore",
            "Mean time to acknowledge real incidents is increasing quarter over quarter"
        ],
        "impact": "Critical alerts get lost in the noise, increasing MTTA and MTTR for real incidents. On-call engineers burn out from frequent low-value pages, especially off-hours. Team develops learned helplessness around alert quality. Customer-facing reliability suffers because the signal-to-noise ratio has collapsed.",
        "recoveryActions": [
            "Audit every alert: classify as actionable, needs-refinement, or delete — if nobody can explain what action to take, delete it",
            "Shift to SLO-based alerting tied to customer-facing metrics (error rate, latency, availability) rather than infrastructure thresholds",
            "Route alerts to owning teams by service tag — on-call should be the expert, not a proxy",
            "Establish regular alert hygiene reviews (monthly) where on-call engineers propose alerts to remove or refine",
            "Track alert-to-action ratio as a reliability health metric"
        ],
        "sourceTopic": "Incidents, Risk & Reliability (Alert Management)",
        "mappingNotes": "Based on LeadDev 'How to avoid alert fatigue' — most alerts accumulate because engineers are scared of removing them."
    },
    {
        "id": "AP-58",
        "name": "The Interview Marathon",
        "slug": "the-interview-marathon",
        "observableIds": ["C11-O1", "C11-O11"],
        "capabilityId": "C11",
        "shortDesc": "hiring process has grown to 7-8 rounds through risk aversion, with each bad hire triggering another interview stage rather than improving existing stages — top candidates drop out while mediocre ones persist",
        "warningSigns": [
            "Candidate drop-off rate exceeds 40% between offer and first interview",
            "Total interview process takes more than 3 weeks end-to-end",
            "Each round is 'just one more check' added after a bad hire",
            "Interviewers can't articulate what unique signal their round provides",
            "Competing companies close candidates before you make an offer"
        ],
        "impact": "Lose top candidates who have multiple offers and won't wait. Process favors candidates with time flexibility (employed at slow-moving companies) over those with high demand. Each additional round adds cost without adding signal. Hiring velocity drops, leaving teams understaffed longer. Candidate experience damages employer brand.",
        "recoveryActions": [
            "Map each interview round to a specific, non-overlapping signal it provides — eliminate rounds with redundant signal",
            "Set a maximum of 4-5 total interactions (including screen) with a 2-week end-to-end target",
            "Replace 'add another round' instinct with 'improve rubric quality in existing rounds'",
            "Track conversion rates at each stage and identify where drop-off exceeds industry benchmarks",
            "Run a candidate experience survey and act on the feedback"
        ],
        "sourceTopic": "Hiring, Onboarding & Role Design (Process Design)",
        "mappingNotes": "Based on LeadDev articles on rethinking engineer hiring strategy and 2025 hiring trends — bloated processes chase away talent."
    },
    {
        "id": "AP-59",
        "name": "The Order Taker",
        "slug": "the-order-taker",
        "observableIds": ["C5-O3", "C5-O1"],
        "capabilityId": "C5",
        "shortDesc": "engineering leader defers entirely to product for direction — never challenges priorities, never proposes technical opportunities, never shapes strategy — treating engineering as a feature factory that builds whatever is asked",
        "warningSigns": [
            "Engineering roadmap is 100% product-driven with no technical investment or innovation items",
            "EM never pushes back on feasibility, timeline, or approach during planning",
            "Engineers complain that 'product just throws things over the wall'",
            "Technical debt grows unchecked because no one advocates for engineering priorities",
            "Team has no input into what gets built, only how"
        ],
        "impact": "Engineering team loses ownership and motivation. Technical debt accumulates because no one advocates for platform investment. Product makes commitments without understanding technical constraints, leading to rushed delivery and quality issues. Best engineers leave for organizations where they have more influence. Engineering becomes a cost center in leadership's eyes rather than a strategic partner.",
        "recoveryActions": [
            "Start contributing to product discovery — attend customer research sessions, review analytics, propose solutions not just implementations",
            "Reserve 15-20% of engineering capacity for technical investment and defend it in planning",
            "Frame technical proposals in business language: 'reducing API latency by 200ms increases conversion by X%'",
            "Build a regular cadence of engineering-led product insights (data you see that product doesn't)",
            "Establish joint roadmap ownership with product counterpart rather than receiving a spec"
        ],
        "sourceTopic": "Cross-Functional Influence (Product Partnership)",
        "mappingNotes": "Based on LeadDev 'Drive product gaps as an engineering leader' — engineering leaders can influence product effectively even without strong product management."
    }
]

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C8 signals (17→19) — proactive risk and on-call health
    {
        "id": "SIG-293",
        "observableId": "C8-O4",
        "capabilityId": "C8",
        "signalText": "Proactive risk discovery: 'Ran quarterly game day exercises simulating database failover, region outage, and dependency timeout — identified 3 critical gaps before they became incidents, with fixes deployed within sprint.'",
        "signalType": "metric",
        "sourceSubTopic": "Proactive Risk Management"
    },
    {
        "id": "SIG-294",
        "observableId": "C8-O3",
        "capabilityId": "C8",
        "signalText": "Alert quality ownership: 'Established monthly alert hygiene review — team deleted 40% of alerts as non-actionable, refined thresholds on remaining. Alert-to-action ratio improved from 1:8 to 1:2, on-call satisfaction score up 30 points.'",
        "signalType": "metric",
        "sourceSubTopic": "On-Call Health"
    },
    # C11 signals (21→23) — pipeline efficiency and bias reduction
    {
        "id": "SIG-295",
        "observableId": "C11-O11",
        "capabilityId": "C11",
        "signalText": "Process efficiency: 'Reduced interview rounds from 7 to 4 while maintaining quality bar — time-to-offer decreased from 28 to 12 days, offer acceptance rate increased from 65% to 85% because we stopped losing candidates to faster competitors.'",
        "signalType": "metric",
        "sourceSubTopic": "Hiring Pipeline Optimization"
    },
    {
        "id": "SIG-296",
        "observableId": "C11-O7",
        "capabilityId": "C11",
        "signalText": "Bias reduction through structure: 'Rewrote interview rubrics to require specific behavioral examples — eliminated subjective 'culture fit' criteria, introduced independent scoring before debrief. Under-leveling rate for underrepresented candidates dropped from 23% to 5%.'",
        "signalType": "metric",
        "sourceSubTopic": "Inclusive Hiring"
    },
    # C5 signals (27→29) — product influence and cross-functional leadership
    {
        "id": "SIG-297",
        "observableId": "C5-O3",
        "capabilityId": "C5",
        "signalText": "Engineering-led product influence: 'Identified performance bottleneck from production data that product hadn't surfaced — proposed and shipped optimization that improved conversion by 12%. Established precedent for engineering contributing to product discovery.'",
        "signalType": "manager_observation",
        "sourceSubTopic": "Product Strategy Influence"
    },
    {
        "id": "SIG-298",
        "observableId": "C5-O10",
        "capabilityId": "C5",
        "signalText": "Scope ambiguity navigation: 'When product management was understaffed, stepped into product gap: ran customer interviews, defined requirements for 2 features, and delivered both — earned trust that expanded engineering's strategic voice permanently.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Cross-Functional Influence"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 9 Enrichments ===")

# Anti-patterns
ap = load("anti-patterns.json")
ap.extend(NEW_ANTI_PATTERNS)
save("anti-patterns.json", ap)
print(f"  Added {len(NEW_ANTI_PATTERNS)} anti-patterns (total: {len(ap)})")

# Calibration signals
cs = load("calibration-signals.json")
cs.extend(NEW_SIGNALS)
save("calibration-signals.json", cs)
print(f"  Added {len(NEW_SIGNALS)} calibration signals (total: {len(cs)})")

# ── Search Index ───────────────────────────────────────

si = load("search-index.json")
new_si_entries = []

for a in NEW_ANTI_PATTERNS:
    new_si_entries.append({
        "id": a["id"],
        "type": "anti-pattern",
        "title": a["name"],
        "content": f"{a['shortDesc']} {' '.join(a['warningSigns'][:2])}",
        "slug": f"/anti-patterns/{a['slug']}",
        "capability": a["capabilityId"]
    })

si.extend(new_si_entries)
save("search-index.json", si)
print(f"  Updated search index (total: {len(si)})")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session9 = {
    "session": 9,
    "date": "2026-02-20",
    "focus": "Close remaining AP gaps: C8/C11/C5 anti-patterns + depth calibration signals",
    "articlesReviewed": 8,
    "additions": {
        "antiPatterns": 3,
        "calibrationSignals": 6
    },
    "capabilitiesEnriched": ["C5", "C8", "C11"],
    "coverageImpact": {
        "C8": "AP: 3→4, CS: 17→19",
        "C11": "AP: 3→4, CS: 21→23",
        "C5": "AP: 3→4, CS: 27→29"
    },
    "notes": "Targeted the last three capabilities with only 3 anti-patterns each. Alert Noise Normalization (C8) captures the creeping desensitization from accumulated non-actionable alerts. Interview Marathon (C11) addresses bloated hiring processes that chase away talent. The Order Taker (C5) describes the passive engineering leader who never shapes product strategy. All based on genuine article insights."
}

rp["sessions"].append(session9)

# Update totals
for key in session9["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session9["additions"][key]

rp["grandTotal"] = sum(rp["totalAdditions"].values())

# Update data file totals
rp["dataFileTotals"]["antiPatterns"] = len(ap)
rp["dataFileTotals"]["calibrationSignals"] = len(cs)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

# ── Summary ────────────────────────────────────────────

print(f"\n=== Session 9 Summary ===")
print(f"Anti-Patterns: +{len(NEW_ANTI_PATTERNS)} (C8:1, C11:1, C5:1)")
print(f"Calibration Signals: +{len(NEW_SIGNALS)} (C8:2, C11:2, C5:2)")
print(f"Total additions: {len(NEW_ANTI_PATTERNS) + len(NEW_SIGNALS)}")

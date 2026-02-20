#!/usr/bin/env python3
"""
Sharpen L4 rubric anchors for the 12 weakest cases.

Problem: L4 texts describe outcomes/reputation ("recognized strength",
"consistently maintained", "producing results") rather than new behaviors
that distinguish L4 from L3.

Fix: Replace outcome-focused language with specific behavioral mechanisms
that show clear L3→L4 progression without overlapping L5.
"""

import json

with open("src/data/rubric-anchors.json") as f:
    anchors = json.load(f)

# Map anchorId → new L4 text
# Each rewrite follows the principle: L3 = solid team-level execution,
# L4 = sophisticated methodology + starting cross-team influence,
# L5 = org-level standard-setting
REWRITES = {
    "C6-1": (
        "Measures psychological safety with structured assessments (Edmondson scale or equivalent) "
        "and builds action plans for any dimension below threshold. Addresses underperformance through "
        "skill/will diagnosis with differentiated intervention paths. Stay interviews surface and "
        "address retention risks before they become resignations. Team members cite their manager "
        "as a reason for staying in engagement surveys."
    ),
    "C7-1": (
        "Tailors communication altitude to audience — IC-level detail for engineers, business outcome "
        "framing for VPs. Proposals include pre-built options with trade-off analysis, not just a single "
        "recommendation. Bad news delivered with root cause analysis and mitigation options before being "
        "asked. Builds political capital by unblocking cross-team dependencies, not just delivering within "
        "own scope."
    ),
    "C7-2": (
        "Decision framework shared with peers and influencing adoption on adjacent teams. Makes "
        "high-stakes decisions under ambiguity with documented reasoning that holds up in retrospect. "
        "First principles analysis produces novel approaches — reframing problems, not just analyzing "
        "existing options. Systems thinking anticipates cross-team second-order effects before they "
        "materialize."
    ),
    "C9-1": (
        "DORA metrics approaching elite benchmarks with diagnosed bottlenecks and improvement plans "
        "for each gap. Developer experience investments prioritized with before/after measurement — "
        "ROI documented per DX initiative. Metric pairings prevent single-dimension optimization "
        "(e.g., deploy frequency paired with change failure rate). Delivery practice documentation "
        "shared with adjacent teams."
    ),
    "C9-2": (
        "Identifies and closes metric gaps before they cause blind spots — adds or retires metrics "
        "based on decision utility. Experiment governance established: hypothesis quality standards, "
        "sample sizing, and structured result interpretation. Engineering investment proposals "
        "consistently win leadership support through quantitative impact framing. Measurement standards "
        "documented and shared with adjacent teams."
    ),
    "C10-1": (
        "Headcount proposals connect to business outcomes with multi-scenario ROI modeling "
        "(best/base/worst case). Cloud cost attribution drives team-level accountability — engineers "
        "understand and optimize their service costs. Build-vs-buy decisions documented with TCO "
        "analysis reusable for future decisions. Finance partners proactively consult on engineering "
        "investment questions."
    ),
    "C10-2": (
        "Tiered resource proposals adopted as the default format for engineering requests to leadership. "
        "Cost-per-outcome data actively informs quarterly reallocation decisions — not just tracked but "
        "acted upon. Reallocation happens within established boundaries without requiring executive "
        "approval for each shift. Adjacent teams begin adopting the tiered proposal framework."
    ),
    "C12-1": (
        "Team charter reviewed and evolved quarterly based on team feedback and growth. Engineering "
        "principles referenced in code review and architecture decision feedback, not just design "
        "reviews. Recognition operates peer-to-peer without requiring manager initiation. Inclusion "
        "practices produce measurable engagement survey results with action plans for identified gaps."
    ),
    "C12-2": (
        "Team members contribute documentation as part of their workflow — updates happen alongside "
        "code changes, not as separate tasks. Design doc quality validated through structured peer "
        "review with clear approval criteria. Knowledge-sharing sessions run with rotating ownership "
        "— engineers volunteer to present. Documentation standards shared with at least one adjacent team."
    ),
    "C13-2": (
        "Compliance evidence collected automatically with real-time dashboard — audit preparation "
        "requires hours, not days. Access governance runs exception-based reviews only — routine "
        "changes fully automated. Zero repeat findings across consecutive audit cycles. Governance "
        "automation patterns documented and shared with adjacent teams."
    ),
    "C14-1": (
        "Calibration cases include cross-team comparison data that withstands committee scrutiny — "
        "ratings rarely require revision. Performance management covers the full spectrum without "
        "avoidance: high performers receive differentiated stretch assignments, underperformers "
        "receive structured improvement plans with clear milestones, managed exits execute with "
        "dignity and complete knowledge transfer. Career conversations produce written development "
        "plans referenced in subsequent reviews."
    ),
    "C14-2": (
        "Promotion success rate demonstrates calibration skill — candidates prepared over multiple "
        "cycles with evidence portfolios that committees approve without extensive debate. Gap-filling "
        "stretch assignments deliberately designed to build specific next-level evidence. Career "
        "development reputation attracts internal transfers to the team. Coaches at least one peer EM "
        "on promotion readiness with structured frameworks."
    ),
}

# Apply rewrites
fixes = 0
for anchor in anchors:
    aid = anchor["anchorId"]
    if aid in REWRITES:
        old = anchor["level4Distinguished"]
        anchor["level4Distinguished"] = REWRITES[aid]
        fixes += 1
        print(f"  {aid}: rewritten")
        # Show first 60 chars of old vs new for verification
        print(f"    OLD: {old[:80]}...")
        print(f"    NEW: {anchor['level4Distinguished'][:80]}...")

with open("src/data/rubric-anchors.json", "w") as f:
    json.dump(anchors, f, indent=2)

print(f"\nRewrote {fixes} L4 anchors")
print("Saved src/data/rubric-anchors.json")

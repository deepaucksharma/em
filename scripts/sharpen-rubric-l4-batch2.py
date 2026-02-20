#!/usr/bin/env python3
"""
Sharpen L4 rubric anchors — Batch 2: remaining 16 anchors.

Same principle as batch 1: replace outcome/reputation language with
specific behavioral mechanisms that distinguish L4 from L3.
C1-1 already fixed in prior commit.
"""

import json

with open("src/data/rubric-anchors.json") as f:
    anchors = json.load(f)

REWRITES = {
    "C1-2": (
        "Drives cross-team initiatives spanning multiple quarters with explicit dependency maps "
        "and milestone tracking. Anticipates org-level shifts (re-orgs, strategy pivots, market "
        "changes) and repositions team before impact hits. Influences strategic direction beyond "
        "own scope through written proposals that leadership acts on. Represents org perspective "
        "in senior leadership forums."
    ),
    "C2-1": (
        "Planning process documented and shared with adjacent teams — at least one team adopts "
        "elements of the approach. OKRs produce measurable outcomes reviewed mid-quarter with "
        "course corrections. Engineering impact framed in terms leadership uses in their own "
        "communications (revenue, retention, risk reduction). PM partnership operates as strategic "
        "co-ownership at the roadmap level."
    ),
    "C2-2": (
        "Trade-off framing applied proactively to incoming requests — stakeholders receive options "
        "analysis before escalating. 'Not doing' list maintained as a living planning artifact "
        "that stakeholders reference independently. Decision rigor calibrated to stakes: reversible "
        "decisions ship within days, irreversible decisions include written alternatives analysis. "
        "First principles thinking reframes problems in ways that unlock novel solutions."
    ),
    "C3-1": (
        "Technical strategy extends beyond own team — architecture decisions account for cross-team "
        "system interactions and shared infrastructure. Design review criteria refined based on "
        "post-mortems and production learnings. Influences platform-level technical direction through "
        "written proposals with data-backed justification. Peer EMs seek technical input on their "
        "architecture decisions."
    ),
    "C3-2": (
        "Identifies systemic tech debt that spans team boundaries — proposes remediation with "
        "measured velocity impact and cost-of-delay quantification. Tech debt allocation defended "
        "to leadership with data showing delivery speed correlation. Platform investment ROI "
        "evaluated across multiple consuming teams. Influences org-wide engineering standards "
        "through documented patterns and shared tooling."
    ),
    "C4-1": (
        "Operating cadence requires minimal manager intervention — team self-corrects when rituals "
        "drift. Toil identified and eliminated through structured quarterly reviews with measurable "
        "time reclaimed. Remote/hybrid practices produce equitable participation measured through "
        "async contribution rates and meeting engagement. Process improvements documented and shared "
        "with adjacent teams."
    ),
    "C4-2": (
        "Delivery predictability maintained above 85% through team transitions, scope changes, and "
        "organizational pressure. Capacity model continuously refined using actuals-vs-plan variance "
        "analysis. Teams self-manage scope trade-offs within agreed boundaries without escalation. "
        "Delivery practices documented in a format that adjacent teams can adopt."
    ),
    "C5-1": (
        "Technical insights shape product direction at the roadmap level — PM includes engineering "
        "perspective in quarterly planning as a co-equal input. Cross-functional disagreements "
        "resolved through structured trade-off analysis rather than hierarchy. TPM and DS partnerships "
        "produce joint deliverables with shared success criteria. Partner feedback collected and acted "
        "upon systematically."
    ),
    "C5-2": (
        "Manager relationship produces sponsorship for stretch assignments and leadership visibility "
        "opportunities. Multiple sponsors across leadership built through cross-team delivery and "
        "strategic contributions. Political capital invested to unblock cross-team initiatives — "
        "influence extends beyond direct reports. Scope expansion proposals grounded in demonstrated "
        "capability and strategic alignment."
    ),
    "C6-2": (
        "Skip-level insights drive proactive interventions — org issues surfaced and addressed before "
        "they escalate. EMs coached on the full management craft (coaching, calibration, stakeholder "
        "management) with specific behavioral feedback. Cross-EM calibration produces consistent "
        "standards — rating distributions align across teams. EM bench development includes deliberate "
        "stretch assignments preparing next-generation managers."
    ),
    "C8-1": (
        "Incident response process refined based on retrospective learnings — each post-mortem "
        "produces at least one process improvement. Post-mortem culture genuinely blameless with "
        "action items that address systemic causes, not just symptoms. On-call health metrics "
        "trending toward targets (<2 actionable pages per shift). Cross-team incident learnings "
        "shared through structured forums. Game days test novel failure modes beyond known scenarios."
    ),
    "C8-2": (
        "Risk reduction applied systematically across the full team portfolio — not just major "
        "launches. Cross-team failure modes identified through dependency analysis and addressed "
        "through joint mitigation plans. Game days designed to reveal novel failure modes and "
        "produce architectural improvements. Vendor dependency risks mitigated with abstraction "
        "layers or fallback strategies. Influence on adjacent teams' risk practices emerging."
    ),
    "C11-1": (
        "Hiring bar maintained under volume pressure — interview calibration sessions run quarterly "
        "with inter-rater reliability tracked. Structured interview process produces consistent signal "
        "across interviewers. Headcount narrative connects team capacity to business strategy with "
        "specific revenue or risk impact. Diverse candidate slates achieved through structured "
        "sourcing, not just pipeline volume."
    ),
    "C11-2": (
        "Onboarding continuously refined using new hire feedback surveys at 30/60/90 days. "
        "Time-to-productivity benchmarked against org averages with diagnosed bottlenecks. "
        "Engineering brand built through conference talks, blog posts, or open source contributions "
        "that generate inbound senior talent interest. Referral rate among highest on team — "
        "engineers actively recruit from their networks."
    ),
    "C13-1": (
        "Security practices embedded in development culture — engineers initiate threat models "
        "without prompting for sensitive features. Vulnerability SLAs met consistently with mean "
        "resolution time trending downward. Security champion program produces engineers who "
        "improve team security practices independently. Change management process documented and "
        "influencing adoption by adjacent teams."
    ),
    "C12-2 already done": None,  # Skip — handled in batch 1
}

# Remove the skip marker
if "C12-2 already done" in REWRITES:
    del REWRITES["C12-2 already done"]

fixes = 0
for anchor in anchors:
    aid = anchor["anchorId"]
    if aid in REWRITES:
        old = anchor["level4Distinguished"]
        anchor["level4Distinguished"] = REWRITES[aid]
        fixes += 1
        print(f"  {aid}: rewritten")

with open("src/data/rubric-anchors.json", "w") as f:
    json.dump(anchors, f, indent=2)

print(f"\nRewrote {fixes} L4 anchors (batch 2)")
print("Saved src/data/rubric-anchors.json")

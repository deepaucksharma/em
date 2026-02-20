#!/usr/bin/env python3
"""
Session 15 Enrichment — Raise anti-pattern floor from 4 to 5 for remaining capabilities
Based on critical reading of LeadDev articles:
  - "When the movie isn't like the book: Failure modes in strategic alignment" (C2 anti-pattern)
  - "What is toil and why is it damaging your engineering org?" + "How to break the cycle of tech debt" (C4 anti-pattern)
  - "Getting good at delivering bad news" + stakeholder trust articles (C5 anti-pattern)
  - "How to reserve engineering capacity and deliver projects on time" (C10 anti-pattern)
  - "Build psychological safety in a world of layoffs" (C12 anti-pattern)
  - "Overcoming security hurdles to push engineering velocity" + vulnerability management articles (C13 anti-pattern)

Targets:
  - Anti-Patterns: +6 (C2, C4, C5, C10, C12, C13: all 4→5)
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
        "id": "AP-66",
        "name": "The Ivory Tower Strategy",
        "slug": "the-ivory-tower-strategy",
        "observableIds": ["C2-O1", "C2-O6"],
        "capabilityId": "C2",
        "shortDesc": "leadership creates a strategic vision in documents and presentations but never translates it into actionable work for teams — the strategy exists on slides but engineers cannot connect their daily work to it, and the gap between intent and execution widens with every quarter",
        "warningSigns": [
            "Engineers cannot articulate how their current project connects to the company's top 3 priorities",
            "Strategy documents use abstract language ('leverage synergies,' 'drive innovation') that doesn't map to concrete engineering decisions",
            "Teams discover conflicting priorities because the strategy was too high-level to resolve real trade-offs",
            "Quarterly planning feels disconnected from the annual strategy — teams plan bottom-up with no top-down constraint",
            "Leadership presents the same strategic slide deck for 3+ quarters while the market and team have moved on"
        ],
        "impact": "Engineering effort scatters across locally-optimal projects that don't add up to strategic progress. Teams make reasonable decisions in isolation that are globally incoherent. The strategy becomes a source of cynicism rather than alignment — people stop reading strategy documents because they've never influenced daily work. Leadership blames execution when the real failure is translation: turning strategic intent into engineering priorities with clear success criteria.",
        "recoveryActions": [
            "Translate every strategic pillar into 2-3 specific engineering bets with measurable outcomes and time horizons",
            "Run a 'strategy connection' exercise: ask each team lead to map their top 3 projects to strategic priorities — gaps reveal translation failures",
            "Replace abstract strategy language with concrete decision criteria: 'When we face a trade-off between X and Y, we choose X because...'",
            "Review and refresh strategy quarterly — a strategy that doesn't evolve with new information is a strategy that's being ignored",
            "Make the strategy visible in sprint planning and roadmap reviews, not just annual kickoffs"
        ],
        "sourceTopic": "Strategy & Vision (Strategy-Execution Translation)",
        "mappingNotes": "Based on LeadDev 'When the movie isn't like the book: Failure modes in strategic alignment' — strategy fails not because it's wrong but because it's never translated into terms teams can act on."
    },
    {
        "id": "AP-67",
        "name": "The Toil Spiral",
        "slug": "the-toil-spiral",
        "observableIds": ["C4-O4", "C4-O3"],
        "capabilityId": "C4",
        "shortDesc": "team neglects operational health — toil reduction, developer experience, and technical debt — because feature delivery always wins the prioritization fight, until accumulated neglect degrades velocity so badly that the team can't ship features either",
        "warningSigns": [
            "Engineers spend more than 30% of their time on repetitive manual tasks that could be automated",
            "The team has had 'fix the build pipeline' or 'reduce deploy time' on the backlog for 3+ quarters without progress",
            "Feature velocity is declining quarter over quarter despite stable headcount",
            "New engineers say 'this is painful' about basic workflows that the team has normalized",
            "Every sprint planning starts with 'we'll do tech debt next sprint' and it never happens"
        ],
        "impact": "Toil compounds — manual operational work consumes the time needed to build automation that would eliminate that toil. The team enters a death spiral where declining velocity creates pressure for more shortcuts, which generate more toil. Developer experience degrades until senior engineers leave for teams with better tooling. The remaining team lacks the capacity or institutional knowledge to dig out. What started as a prioritization choice becomes an engineering capability crisis.",
        "recoveryActions": [
            "Establish a fixed capacity allocation: 20-30% of every sprint is reserved for operational health, non-negotiably",
            "Track toil explicitly — measure hours spent on repetitive manual tasks weekly and set reduction targets",
            "Start with the highest-leverage automation: the one manual task that every engineer does multiple times per week",
            "Make developer experience metrics visible to leadership — deploy frequency, build time, onboarding time-to-first-commit",
            "Frame operational investment in business terms: 'Reducing deploy time from 45 min to 5 min recovers X engineer-hours per week'"
        ],
        "sourceTopic": "Operational & Process Excellence (Operational Health)",
        "mappingNotes": "Based on LeadDev 'What is toil and why is it damaging your engineering org?' and 'How to break the cycle of tech debt' — toil creates a self-reinforcing trap where the team lacks capacity to fix the thing that's consuming their capacity."
    },
    {
        "id": "AP-68",
        "name": "The Stakeholder Surprise",
        "slug": "the-stakeholder-surprise",
        "observableIds": ["C5-O2", "C5-O6"],
        "capabilityId": "C5",
        "shortDesc": "engineering leader avoids surfacing technical risks, timeline slips, and scope changes until the last possible moment — stakeholders are repeatedly blindsided by bad news, eroding trust until they start micromanaging or routing around engineering entirely",
        "warningSigns": [
            "Stakeholders learn about project delays in the same meeting where the deadline was supposed to be met",
            "Engineering leader uses optimistic framing ('we're working on it') when the project is materially off track",
            "Product or business leaders say they 'don't trust engineering timelines' based on past surprises",
            "Status reports consistently show green/on-track until suddenly flipping to red with no amber warning period",
            "The engineering leader avoids 1:1s with their VP or product counterpart during difficult periods"
        ],
        "impact": "Each surprise erodes stakeholder trust compoundingly — the first late project is forgiven, the third triggers micromanagement. Business leaders lose confidence in engineering's ability to self-manage and start demanding detailed progress reports, daily standups with leadership, or scope commitments with penalty clauses. The engineering leader's credibility and autonomy shrink with each surprise. Eventually, product and business make decisions without engineering input because they've learned that engineering's input is unreliable.",
        "recoveryActions": [
            "Adopt a 'no surprises' principle: any risk with >30% likelihood of impacting timeline gets communicated within 48 hours of identification",
            "Practice the formula: 'Here's what happened, here's the impact, here's what we're doing about it, here's when I'll update you next'",
            "Build in regular risk reviews with stakeholders — weekly 15-minute syncs where you proactively share what's on track and what's not",
            "Reframe early bad news as a trust-building opportunity: leaders who surface problems early are seen as reliable, not as failures",
            "Track your prediction accuracy — compare initial estimates to actuals and use the data to calibrate future commitments"
        ],
        "sourceTopic": "Stakeholder & Product (Stakeholder Communication)",
        "mappingNotes": "Based on LeadDev 'Getting good at delivering bad news' — the cost of late bad news is always higher than the cost of early bad news. Trust is built by reliability of information, not by optimism."
    },
    {
        "id": "AP-69",
        "name": "The 100% Utilization Fallacy",
        "slug": "the-100-percent-utilization-fallacy",
        "observableIds": ["C10-O8", "C10-O1"],
        "capabilityId": "C10",
        "shortDesc": "manager allocates 100% of engineering capacity to planned work, leaving zero buffer for unplanned work, interrupts, learning, or collaboration — projects chronically miss deadlines because the plan assumed ideal conditions that never exist",
        "warningSigns": [
            "Sprint commitments assume every engineer is available for 8 productive hours per day, 5 days per week",
            "Any unplanned work (production incident, urgent bug, exec request) immediately puts the sprint at risk",
            "Engineers report having no time for code review, mentoring, documentation, or learning",
            "Project timelines are built on best-case estimates with no contingency buffer",
            "The team consistently delivers 60-70% of sprint commitments but the plan is never adjusted"
        ],
        "impact": "When capacity is planned at 100%, every surprise becomes a crisis. Teams develop a reputation for missing deadlines even though they're working harder than ever. Engineers burn out because there's no slack for the human aspects of work — thinking, learning, helping colleagues. Quality declines because code review and testing are squeezed out by delivery pressure. The paradox: teams running at 70-80% planned utilization actually deliver more reliably than teams planned at 100%, because they can absorb variability without cascading failures.",
        "recoveryActions": [
            "Plan capacity at 70-80% — reserve 20-30% for unplanned work, collaboration, and investment",
            "Track actual vs. planned capacity over 4-6 sprints to establish your team's real available capacity",
            "Make the buffer explicit and visible: 'We plan 32 of 40 hours per engineer per week' — this isn't laziness, it's engineering for reliability",
            "When leadership asks why the team isn't 'fully utilized,' explain with data: show the correlation between planned utilization rate and delivery predictability",
            "Categorize unplanned work (incidents, support, urgent requests) to identify patterns that can be planned for"
        ],
        "sourceTopic": "Resource Allocation (Capacity Planning)",
        "mappingNotes": "Based on LeadDev 'How to reserve engineering capacity and deliver projects on time' — teams at 70-80% planned utilization outperform those at 100% because they can absorb the variability that always exists in knowledge work."
    },
    {
        "id": "AP-70",
        "name": "The Reassurance Trap",
        "slug": "the-reassurance-trap",
        "observableIds": ["C12-O1", "C12-O7"],
        "capabilityId": "C12",
        "shortDesc": "during periods of uncertainty — layoffs, reorgs, strategy pivots — the manager offers vague reassurances ('everything will be fine,' 'I'm sure there won't be more cuts') that ring hollow, destroying trust faster than honest acknowledgment of difficulty would",
        "warningSigns": [
            "Manager says 'don't worry about it' when the team raises concerns about organizational changes",
            "Reassurances prove wrong repeatedly — 'no more layoffs' is followed by another round within months",
            "Team members stop asking questions in all-hands because they've learned the answers won't be honest",
            "Manager avoids the topic entirely, hoping uncertainty will resolve itself without acknowledgment",
            "Private Slack channels and hallway conversations replace official channels as the trusted information source"
        ],
        "impact": "Each hollow reassurance depletes the manager's credibility account. The team develops a discount rate for everything the manager says — they assume optimistic framing means things are worse than stated. Psychological safety collapses because the team learns that raising concerns gets dismissal rather than honesty. Top performers, who have the most options, leave first because they trust their own assessment more than management's reassurances. The remaining team is anxious, disengaged, and focused on self-preservation rather than team goals.",
        "recoveryActions": [
            "Replace reassurance with honesty: 'Here's what I know, here's what I don't know, and here's when I expect to know more'",
            "Acknowledge what you cannot promise: 'I can't guarantee there won't be more changes, but I can tell you what I'm doing to advocate for this team'",
            "Create a regular cadence for uncertainty updates — even if the update is 'no new information,' the consistency builds trust",
            "Name the emotions: 'I know this is unsettling. It's okay to feel that way. Let's talk about what we can control'",
            "After the uncertainty resolves, do a retrospective on how communication went — learn from what helped and what didn't"
        ],
        "sourceTopic": "Team Culture & Belonging (Communication During Uncertainty)",
        "mappingNotes": "Based on LeadDev 'Build psychological safety in a world of layoffs' — vague optimism during uncertainty is more damaging than honest difficulty because it signals that the leader either doesn't know the truth or doesn't respect the team enough to share it."
    },
    {
        "id": "AP-71",
        "name": "Vulnerability Noise Blindness",
        "slug": "vulnerability-noise-blindness",
        "observableIds": ["C13-O2", "C13-O6"],
        "capabilityId": "C13",
        "shortDesc": "automated security scanners generate hundreds of findings per week but without effective triage, prioritization, or noise reduction — the team becomes desensitized, treating the vulnerability backlog as unfixable background noise while critical issues hide in plain sight",
        "warningSigns": [
            "Security scanner dashboard shows 500+ open findings and the number grows every week",
            "Engineers dismiss scanner alerts as 'mostly false positives' without verifying",
            "Critical vulnerabilities sit unpatched for weeks because they're buried in a backlog of low-severity findings",
            "The team disabled or ignored security scanning in CI because it blocked too many deploys for non-issues",
            "Nobody owns vulnerability triage — findings go into a shared queue that nobody monitors"
        ],
        "impact": "The security scanning investment delivers negative value — it generates noise that obscures real risk rather than reducing it. Engineers develop contempt for security tooling because it cries wolf constantly. When a genuine critical vulnerability appears, it gets the same treatment as the hundreds of low-severity findings: acknowledged, backlogged, forgotten. The organization has the appearance of security diligence (tools are running, dashboards exist) while actual security posture degrades.",
        "recoveryActions": [
            "Assign a single owner for vulnerability triage — one person or rotating role who reviews every finding weekly",
            "Implement severity-based SLAs: critical = 48 hours, high = 7 days, medium = 30 days, low = next quarter",
            "Aggressively tune scanners: suppress known false positives, configure severity thresholds, and accept risk on low-impact findings formally",
            "Track signal-to-noise ratio: what percentage of scanner findings led to actual fixes vs. dismissals — if >80% are dismissed, the tool needs reconfiguration",
            "Separate the vulnerability backlog from the feature backlog — make security work visible with its own tracking and reporting"
        ],
        "sourceTopic": "Security & Compliance (Vulnerability Management)",
        "mappingNotes": "Based on LeadDev articles on security-engineering relationship dynamics and vulnerability management — the scanner is only as valuable as the triage process behind it. Without effective prioritization, more scanning creates more noise, not more security."
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 15 Enrichments ===")

# Anti-patterns
ap = load("anti-patterns.json")
ap.extend(NEW_ANTI_PATTERNS)
save("anti-patterns.json", ap)
print(f"  Added {len(NEW_ANTI_PATTERNS)} anti-patterns (total: {len(ap)})")

# Search Index
si = load("search-index.json")
for a in NEW_ANTI_PATTERNS:
    si.append({
        "id": a["id"],
        "type": "anti-pattern",
        "title": a["name"],
        "content": "{} {}".format(a['shortDesc'], ' '.join(a['warningSigns'][:2])),
        "slug": "/anti-patterns/{}".format(a['slug']),
        "capability": a["capabilityId"]
    })
save("search-index.json", si)
print(f"  Updated search index (total: {len(si)})")

# Update review-progress.json
rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session15 = {
    "session": 15,
    "date": "2026-02-20",
    "focus": "Raise anti-pattern floor: C2/C4/C5/C10/C12/C13 from 4 to 5",
    "articlesReviewed": 7,
    "additions": {
        "antiPatterns": 6
    },
    "capabilitiesEnriched": ["C2", "C4", "C5", "C10", "C12", "C13"],
    "coverageImpact": {
        "C2": "AP: 4->5 (The Ivory Tower Strategy)",
        "C4": "AP: 4->5 (The Toil Spiral)",
        "C5": "AP: 4->5 (The Stakeholder Surprise)",
        "C10": "AP: 4->5 (The 100% Utilization Fallacy)",
        "C12": "AP: 4->5 (The Reassurance Trap)",
        "C13": "AP: 4->5 (Vulnerability Noise Blindness)"
    },
    "notes": "Raised anti-pattern floor for all remaining 6 capabilities from 4 to 5. All 14 capabilities now have 5+ anti-patterns. Each fills a genuine gap: Ivory Tower Strategy (strategy disconnected from execution), Toil Spiral (operational health starved by feature pressure), Stakeholder Surprise (blindsiding stakeholders with late bad news), 100% Utilization Fallacy (no slack capacity in planning), Reassurance Trap (hollow optimism during uncertainty), Vulnerability Noise Blindness (scanner fatigue burying real risks). Based on LeadDev articles on strategic alignment, toil, stakeholder communication, capacity planning, psychological safety during layoffs, and security tooling."
}

rp["sessions"].append(session15)

if "antiPatterns" in rp["totalAdditions"]:
    rp["totalAdditions"]["antiPatterns"] += 6
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["antiPatterns"] = len(ap)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

print(f"\n=== Session 15 Summary ===")
print(f"Anti-Patterns: +6 (C2, C4, C5, C10, C12, C13: all 4->5)")
print(f"All 14 capabilities now have 5+ anti-patterns")

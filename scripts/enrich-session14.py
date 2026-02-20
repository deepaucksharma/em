#!/usr/bin/env python3
"""
Session 14 Enrichment — Raise anti-pattern floor from 4 to 5 for key capabilities
Based on critical reading of LeadDev articles:
  - "The cost of skipping hard conversations" (C14 anti-pattern)
  - "How to turn an engineering incident into an opportunity" + post-mortem best practices (C8 anti-pattern)
  - Resume-driven development patterns (C3 anti-pattern)
  - "Leading your engineering team through an unexpected product pivot" (C1 anti-pattern)
  - "How to build a culture of accountability" (C9 anti-pattern)
  - Hiring paradox and competitive market articles (C11 anti-pattern)

Targets:
  - Anti-Patterns: +6 (C1, C3, C8, C9, C11, C14: all 4→5)
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
        "id": "AP-60",
        "name": "The Feedback Avoidance Loop",
        "slug": "the-feedback-avoidance-loop",
        "observableIds": ["C14-O4", "C14-O7"],
        "capabilityId": "C14",
        "shortDesc": "manager avoids giving negative performance feedback until it's too late — minor issues compound into serious underperformance, and the first honest feedback the engineer receives is a PIP or a low rating at review time",
        "warningSigns": [
            "1:1 notes show only positive feedback for an engineer whose performance is declining",
            "Manager uses phrases like 'they'll figure it out' or 'I don't want to micromanage'",
            "Performance review rating is a surprise to the engineer",
            "Manager confuses being nice with being kind — avoids discomfort at the cost of the person's growth",
            "High performers on the team are frustrated that low performance goes unaddressed"
        ],
        "impact": "The underperforming engineer loses months or years of potential growth because nobody told them the truth. High performers leave because they see uneven accountability. When feedback finally arrives, it feels punitive rather than developmental. Manager loses credibility with the team. Leadership debt compounds — the cost of delayed feedback is always higher than the cost of an uncomfortable conversation.",
        "recoveryActions": [
            "Schedule a direct conversation within 48 hours using SBI format (Situation-Behavior-Impact)",
            "Acknowledge the delay: 'I should have raised this sooner, and that's on me'",
            "Establish a regular cadence of documented feedback — at minimum monthly written notes",
            "Build conflict literacy through practice — start with lower-stakes feedback and build up",
            "Reframe feedback as a gift: withholding it is not kindness, it's neglect"
        ],
        "sourceTopic": "Performance Management & Calibration (Feedback Delivery)",
        "mappingNotes": "Based on LeadDev 'The cost of skipping hard conversations' — leadership debt from delayed feedback compounds faster than technical debt."
    },
    {
        "id": "AP-61",
        "name": "Incident Amnesia",
        "slug": "incident-amnesia",
        "observableIds": ["C8-O2", "C8-O7"],
        "capabilityId": "C8",
        "shortDesc": "team runs post-mortems after every incident but action items die in a backlog — the same class of incident recurs because learning never converts to systemic change, and the post-mortem becomes a ritual without consequence",
        "warningSigns": [
            "Post-mortem action item completion rate is below 50%",
            "The same root cause appears in multiple post-mortems across quarters",
            "Engineers say 'we talked about this last time' during incident response",
            "Action items are assigned but never tracked or reviewed",
            "Post-mortems feel performative — people attend but don't expect change"
        ],
        "impact": "Same incidents recur, eroding customer trust and team morale. Engineers lose faith in the post-mortem process because nothing changes. On-call burden increases because systemic fixes never land. The team develops learned helplessness about reliability — incidents feel inevitable rather than preventable.",
        "recoveryActions": [
            "Assign every action item a single owner and a due date — review completion weekly in team standup",
            "Track action-item-to-prevention ratio: how many action items actually prevented a future incident",
            "Limit post-mortem action items to 3-5 highest-leverage items instead of exhaustive lists",
            "Schedule a monthly 'incident learning review' that examines patterns across incidents, not just individual events",
            "Make post-mortem action item completion a team-level reliability metric visible to leadership"
        ],
        "sourceTopic": "Incidents, Risk & Reliability (Learning from Incidents)",
        "mappingNotes": "Based on LeadDev 'How to turn an engineering incident into an opportunity' and post-mortem best practices."
    },
    {
        "id": "AP-62",
        "name": "Resume-Driven Architecture",
        "slug": "resume-driven-architecture",
        "observableIds": ["C3-O3", "C3-O1"],
        "capabilityId": "C3",
        "shortDesc": "technology choices driven by what looks impressive on resumes rather than what solves the actual problem — team adopts Kubernetes for 3 services, microservices for a 5-person team, or event sourcing for a CRUD app because the technology is trendy",
        "warningSigns": [
            "Architecture is designed for a scale the product has never seen and may never reach",
            "Nobody can articulate what business problem the chosen technology solves better than simpler alternatives",
            "Engineering proposals lead with the technology ('let's use Kafka') rather than the problem ('we need reliable async processing')",
            "New hires struggle to onboard because the stack is unnecessarily complex",
            "Operational burden exceeds the team's capacity to maintain it"
        ],
        "impact": "Operational complexity grows without corresponding business value. Onboarding time increases because the stack is over-engineered. The team spends more time fighting infrastructure than shipping features. Simpler alternatives would have delivered the same outcome at a fraction of the cost. Technical debt is created on day one.",
        "recoveryActions": [
            "Require every architecture proposal to answer: 'What problem does this solve, and what's the simplest thing that could work?'",
            "Evaluate technology choices using TCO including operational cost, hiring difficulty, and cognitive load",
            "Establish a 'boring technology' principle — default to proven, well-understood tools unless there's a compelling reason not to",
            "Create a team tech radar with explicit adopt/trial/assess/hold categories to channel experimentation productively",
            "Celebrate engineers who choose boring, effective solutions — not just those who introduce novel ones"
        ],
        "sourceTopic": "Systems Design & Architecture (Technology Selection)",
        "mappingNotes": "Based on resume-driven development patterns widely discussed in engineering leadership. The incentive structure is broken when choosing complexity is rewarded more than choosing simplicity."
    },
    {
        "id": "AP-63",
        "name": "The Ostrich Leader",
        "slug": "the-ostrich-leader",
        "observableIds": ["C1-O4", "C1-O7"],
        "capabilityId": "C1",
        "shortDesc": "leader avoids making difficult organizational decisions — lets dysfunctional team dynamics persist, delays necessary re-orgs, and hopes problems will resolve themselves, while org health slowly deteriorates",
        "warningSigns": [
            "Known team dysfunction persists for months without intervention",
            "Leader deflects organizational problems with 'let's give it more time'",
            "Skip-level feedback consistently raises issues the leader hasn't addressed",
            "Talented people leave citing organizational issues that were never resolved",
            "Leader is surprised by problems that were visible to everyone else for months"
        ],
        "impact": "Org health degrades gradually until a crisis forces action — but by then, the best people have left and trust is eroded. The leader's credibility suffers because the team sees problems being ignored. Small, manageable issues become large, expensive ones. The org develops a culture where raising concerns feels pointless because nothing changes.",
        "recoveryActions": [
            "Establish a regular org health review with explicit metrics (attrition, engagement, skip-level themes)",
            "Build a decision log for organizational issues — track what's been raised, when, and what action was taken",
            "Set a 30-day rule: any organizational concern raised twice must have an action plan within 30 days",
            "Seek coaching or peer support for developing comfort with organizational conflict",
            "Reframe avoidance: inaction is itself a decision with consequences — the cost of not deciding is real"
        ],
        "sourceTopic": "Org-Level Thinking (Organizational Decision Making)",
        "mappingNotes": "Complementary to The Wrecking Ball (AP-54) — where that anti-pattern is about acting too fast, this one is about acting too slow."
    },
    {
        "id": "AP-64",
        "name": "The Goodhart Trap",
        "slug": "the-goodhart-trap",
        "observableIds": ["C9-O3", "C9-O9"],
        "capabilityId": "C9",
        "shortDesc": "once a metric becomes a target, the team optimizes for the metric rather than the outcome it was supposed to measure — velocity numbers go up while actual delivery value goes down, and the metric loses its diagnostic power",
        "warningSigns": [
            "Story points per sprint increase but customer satisfaction or feature adoption doesn't improve",
            "Team debates how to 'count' work to maximize the metric rather than how to deliver value",
            "Metrics dashboard shows green while stakeholders report slow progress",
            "Engineers game metrics by splitting work into smaller tickets or inflating estimates",
            "No counter-metrics exist to catch single-metric optimization"
        ],
        "impact": "Leadership makes decisions based on metrics that no longer reflect reality. The metric becomes a performance target rather than a diagnostic tool, creating perverse incentives. Team culture shifts from outcome-oriented to metrics-oriented. Trust in data erodes when stakeholders realize the numbers don't match their experience.",
        "recoveryActions": [
            "Pair every target metric with a counter-metric (velocity + defect rate, throughput + cycle time)",
            "Use metrics as diagnostic tools in team discussions, never as individual performance measures",
            "Rotate or retire metrics periodically — if a metric has been stable for 3 quarters, it may no longer be useful",
            "When presenting metrics, always include qualitative context: what the numbers mean, not just what they show",
            "Educate the team on Goodhart's Law explicitly — naming the trap makes it easier to avoid"
        ],
        "sourceTopic": "Metrics, Measurement & Outcomes (Metric Dysfunction)",
        "mappingNotes": "Based on Goodhart's Law and LeadDev articles on metrics gaming and the 'flawed five' engineering productivity metrics."
    },
    {
        "id": "AP-65",
        "name": "The Talent Hostage",
        "slug": "the-talent-hostage",
        "observableIds": ["C11-O6", "C11-O10"],
        "capabilityId": "C11",
        "shortDesc": "manager hoards talent by blocking internal transfers, withholding growth opportunities, or creating dependency — making the team a place people can't leave rather than a place people want to stay",
        "warningSigns": [
            "Internal transfer requests are discouraged or slow-walked",
            "Manager gives vague growth plans but blocks concrete opportunities (leading projects on other teams, rotations)",
            "High performers feel stuck but the manager frames it as 'the team needs you'",
            "Attrition is low but engagement surveys show declining satisfaction",
            "Manager counter-offers or guilt-trips engineers who express interest in other roles"
        ],
        "impact": "Engineers eventually leave the company entirely instead of transferring internally. Team builds resentment rather than loyalty. Manager's reputation as a talent hoarder spreads, making recruiting harder. The company loses people it could have retained in a different role. Growth-oriented engineers avoid joining the team.",
        "recoveryActions": [
            "Reframe internal transfers as a positive signal — you're developing people other teams want",
            "Build a succession plan so no single departure creates a crisis",
            "Actively sponsor engineer growth even when it means losing them: 'I'd rather you grow here than leave the company'",
            "Track internal mobility as a positive metric alongside external attrition",
            "Create rotation opportunities proactively — 3-month cross-team projects build skills and expand networks"
        ],
        "sourceTopic": "Hiring, Onboarding & Role Design (Talent Mobility)",
        "mappingNotes": "Based on LeadDev retention articles — talent hoarding creates the opposite of the intended effect. The best retention strategy is making people want to stay, not making it hard to leave."
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 14 Enrichments ===")

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
        "content": f"{a['shortDesc']} {' '.join(a['warningSigns'][:2])}",
        "slug": f"/anti-patterns/{a['slug']}",
        "capability": a["capabilityId"]
    })
save("search-index.json", si)
print(f"  Updated search index (total: {len(si)})")

# Update review-progress.json
rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session14 = {
    "session": 14,
    "date": "2026-02-20",
    "focus": "Raise anti-pattern floor: C1/C3/C8/C9/C11/C14 from 4→5",
    "articlesReviewed": 7,
    "additions": {
        "antiPatterns": 6
    },
    "capabilitiesEnriched": ["C1", "C3", "C8", "C9", "C11", "C14"],
    "coverageImpact": {
        "C14": "AP: 4→5 (Feedback Avoidance Loop)",
        "C8": "AP: 4→5 (Incident Amnesia)",
        "C3": "AP: 4→5 (Resume-Driven Architecture)",
        "C1": "AP: 4→5 (The Ostrich Leader)",
        "C9": "AP: 4→5 (The Goodhart Trap)",
        "C11": "AP: 4→5 (The Talent Hostage)"
    },
    "notes": "Raised anti-pattern floor for 6 capabilities from 4 to 5. Each anti-pattern fills a genuine gap: Feedback Avoidance (managers who avoid tough conversations), Incident Amnesia (post-mortems without follow-through), Resume-Driven Architecture (technology choices for resumes not problems), The Ostrich Leader (avoiding organizational decisions), The Goodhart Trap (metrics gaming), and The Talent Hostage (hoarding talent by blocking mobility). Based on LeadDev articles on hard conversations, incident learning, and retention."
}

rp["sessions"].append(session14)

if "antiPatterns" in rp["totalAdditions"]:
    rp["totalAdditions"]["antiPatterns"] += 6
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["antiPatterns"] = len(ap)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

print(f"\n=== Session 14 Summary ===")
print(f"Anti-Patterns: +6 (C1, C3, C8, C9, C11, C14: all 4→5)")

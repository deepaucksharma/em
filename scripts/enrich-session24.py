#!/usr/bin/env python3
"""
Session 24 — Fill remaining framework gaps to reach floor counts.

Gaps identified:
  - Anti-patterns: C4, C9 need +1 each (4→5)
  - Playbooks: C1, C2, C3, C4, C9 need +1 each (4→5)
  - Interview Questions: C3 needs +2 (6→8), C10 and C11 need +1 each (7→8)

Additions:
  - Anti-patterns: +2 (AP-74 C4, AP-75 C9)
  - Playbooks: +5 (P-C1-5, P-C2-5, P-C3-5, P-C4-5, P-C9-6)
  - Interview Questions: +4 (IQ-113/114 C3, IQ-115 C10, IQ-116 C11)
  - Search Index: +7 entries (2 AP + 5 PB)
"""

import json
import os

DATA = "src/data"

def load(name):
    path = os.path.join(DATA, name)
    with open(path) as f:
        return json.load(f)

def save(name, data):
    path = os.path.join(DATA, name)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print("  Saved {}".format(path))

# ── Anti-Patterns ─────────────────────────────────────

NEW_APS = [
    # C4 — The Big-Bang Deploy (C4-O5 release process, C4-O10 change management)
    {
        "id": "AP-74",
        "name": "The Big-Bang Deploy",
        "slug": "the-big-bang-deploy",
        "observableIds": ["C4-O5", "C4-O10"],
        "capabilityId": "C4",
        "shortDesc": "Team batches weeks or months of changes into monolithic releases, turning every deploy into a high-risk event that requires weekend war rooms, rollback prayer, and post-deploy firefighting",
        "warningSigns": [
            "Deploys happen weekly or less frequently, always as large batches",
            "Release day requires a war room or dedicated 'release captain'",
            "Rollbacks are manual, untested, or nonexistent",
            "Engineers avoid deploying on Fridays (or any day near a deadline)",
            "Every deploy requires a change advisory board meeting",
            "Post-deploy incidents are considered normal, not exceptional",
            "Feature branches live for weeks before merging"
        ],
        "impact": "Each deploy carries accumulated risk from every change bundled together, making root cause analysis nearly impossible when things break. Teams develop deployment anxiety, shipping less frequently which compounds the problem. Feedback loops stretch from hours to weeks. Engineers can't connect their code change to production behavior because too many things changed at once. The organization develops a culture of risk aversion where 'don't deploy' feels safer than 'deploy small and often.'",
        "recoveryActions": [
            "Measure current deploy frequency and batch size — make the problem visible with data.",
            "Invest in automated rollback capability before increasing deploy frequency.",
            "Implement feature flags to decouple deployment from release — code ships dark, features activate independently.",
            "Move to trunk-based development with short-lived branches (< 1 day).",
            "Target multiple deploys per day with each containing a small, reviewable changeset.",
            "Implement progressive rollout (canary deploys, percentage-based rollout) to limit blast radius.",
            "Replace change advisory boards with automated change risk scoring for routine changes, reserving human review for genuinely novel risk."
        ],
        "sourceTopic": "Operational Leadership (Release Engineering)",
        "mappingNotes": "Big-bang deploys → release process / change management observables. Based on DORA research showing elite teams deploy multiple times per day with low change failure rates."
    },
    # C9 — The Vanity OKR (C9-O4 outcome OKRs, C9-O5 business translation)
    {
        "id": "AP-75",
        "name": "The Vanity OKR",
        "slug": "the-vanity-okr",
        "observableIds": ["C9-O4", "C9-O5"],
        "capabilityId": "C9",
        "shortDesc": "Team sets OKRs that are either so vague they can't be measured, so easy they're always green, or so disconnected from actual work that nobody references them between quarterly planning sessions",
        "warningSigns": [
            "Key results use words like 'improve,' 'enhance,' or 'optimize' without quantified targets",
            "Every team hits 100% of OKRs every quarter — targets are sandbagged",
            "OKRs are set in January and never referenced until the next planning cycle",
            "Key results measure activity (ship X features) rather than outcomes (reduce churn by Y%)",
            "Team can't explain how their daily work connects to their stated OKRs",
            "OKRs are copy-pasted from the previous quarter with minor wording changes",
            "Quarterly OKR review is a formality where everyone presents green slides"
        ],
        "impact": "Strategic alignment becomes theater — leadership believes engineering is executing on company priorities while teams are actually working on whatever feels most urgent. Resource allocation decisions are made without real outcome data. The OKR process itself becomes resented overhead that consumes planning time without providing direction. When real strategic pivots are needed, there's no mechanism to signal or measure the change.",
        "recoveryActions": [
            "Apply the 'would anyone disagree?' test to every objective — if not, it's not strategic enough.",
            "Require every key result to have a number, a baseline, and a target. 'Improve page load time' fails; 'Reduce p95 page load from 3.2s to 1.5s' passes.",
            "Set stretch targets where 70% completion is good — if you hit 100%, targets were too easy.",
            "Connect at least one key result per team to a measurable business outcome (revenue, retention, adoption).",
            "Review OKRs at mid-quarter with real data, not just end-of-quarter retrospectively.",
            "Kill OKRs that nobody references in sprint planning — they're not driving behavior."
        ],
        "sourceTopic": "Metrics, Measurement & Outcomes (Goal Setting)",
        "mappingNotes": "Vanity OKRs → outcome-oriented OKR / business translation observables. Based on common OKR dysfunction patterns in engineering organizations."
    }
]

# ── Playbooks ─────────────────────────────────────────

NEW_PBS = [
    # P-C1-5 — Platform strategy restructure
    {
        "id": "P-C1-5",
        "slug": "restructuring-teams-around-a-platform-strategy",
        "observableIds": ["C1-O11", "C1-O5", "C1-O2"],
        "capabilityIds": ["C1", "C3"],
        "title": "Restructuring Teams Around a Platform Strategy",
        "context": "Multiple product teams are independently building similar infrastructure — authentication wrappers, data pipelines, deployment tooling, notification services. Each team's version is slightly different, creating maintenance burden and inconsistent user experience. You've identified the opportunity to extract a platform team, but you need to restructure without disrupting current delivery.",
        "topicsActivated": [
            "Org Design (Platform Team Extraction)",
            "Architecture (Shared Infrastructure)",
            "Stakeholder Mgmt (Internal Customer Relationships)"
        ],
        "decisionFramework": "1. Validate the platform opportunity (Week 1-2): Count how many teams are building the same capability independently. A platform is justified when 3+ teams duplicate the same infrastructure. Map the current state: who owns what, how different are the implementations, what's the maintenance cost of the duplication. 2. Define the platform contract (Week 2-3): Before moving people, define what the platform will provide and what it won't. The biggest platform team failure is scope creep — trying to be everything to everyone. Start with the 2-3 highest-leverage shared capabilities. Define SLAs: the platform team serves product teams as internal customers with explicit response times and reliability commitments. 3. Staff the team carefully (Week 3-4): Seed the platform team with engineers who built the original implementations across different product teams — they understand both the domain and the consumer needs. Don't staff it with engineers nobody else wanted. Platform teams need your strongest infrastructure engineers because they're building multipliers. 4. Establish the operating model (Month 2): The platform team is a product team whose customers are internal engineers. They need a product manager (or PM-minded engineer), a roadmap driven by internal customer feedback, and clear prioritization criteria. Avoid the 'ticket queue' anti-pattern where the platform team just reacts to requests. 5. Migration strategy (Month 2-3): Don't force immediate migration. Let early adopter teams migrate first, iterate on the platform based on their feedback, then provide migration support for remaining teams. Set a deprecation date for the old implementations only after the platform is proven. 6. Measure platform health (Ongoing): Track adoption rate, developer satisfaction with platform APIs, time-to-integrate for new consumers, and incident rate of platform vs. bespoke solutions.",
        "commonMistakes": "Extracting a platform team before the shared need is proven (premature abstraction). Staffing the platform team with the weakest engineers. No product management — platform becomes a reactive ticket queue. Forcing migration before the platform is ready, creating resentment. Platform team builds what they think is elegant rather than what product teams need. No SLAs — product teams can't depend on the platform reliably.",
        "whatGoodLooksLike": "Within 3 months: 2-3 product teams have migrated to the platform with measurable reduction in their infrastructure maintenance burden. Platform team has a roadmap driven by internal customer feedback. Within 6 months: remaining teams migrated, duplicated infrastructure decommissioned. Developer satisfaction with shared infrastructure has improved. New product teams can start building features on day one instead of rebuilding common infrastructure.",
        "mappingNotes": "Platform team extraction and org restructuring",
        "suggestedMetricIds": ["1.2", "2.5", "3.2"]
    },
    # P-C2-5 — Strategic 'Not Doing' list
    {
        "id": "P-C2-5",
        "slug": "building-and-defending-a-strategic-not-doing-list",
        "observableIds": ["C2-O5", "C2-O2", "C2-O1"],
        "capabilityIds": ["C2", "C7"],
        "title": "Building and Defending a Strategic 'Not Doing' List",
        "context": "Your team is pulled in too many directions. Every stakeholder has a 'critical' request. Your backlog has 6 months of work but leadership expects everything in the next quarter. You've tried prioritization frameworks but they all result in 'everything is P1.' You need a way to make trade-offs explicit and defensible.",
        "topicsActivated": [
            "Strategy (Explicit Trade-offs)",
            "Communication (Stakeholder Alignment)",
            "Planning (Capacity-Based Prioritization)"
        ],
        "decisionFramework": "1. Establish capacity reality (Day 1-2): Calculate your team's actual delivery capacity based on the last 3 months of throughput — not idealized estimates. Show the gap: 'We have capacity for X weeks of work this quarter. The current ask is 3X.' This forces a prioritization conversation. 2. Build the 'Not Doing' list (Week 1): For every initiative that won't fit in capacity, create an explicit entry: what it is, who requested it, why it's not making the cut this quarter, and what would need to change for it to be prioritized. This is not a rejection — it's a transparent trade-off. 3. Rank by strategic value, not urgency (Week 1): Use a simple 2x2: strategic alignment (does this advance company goals?) vs. engineering leverage (does this make future work faster?). High/High items are obvious. Low/Low items go on the Not Doing list. The hard decisions are High/Low — these are where you earn your salary as a leader. 4. Present the trade-offs, not the decisions (Week 2): Go to leadership with: 'Given our capacity, here's what we can do and what we can't. Here are the trade-offs. Which set of trade-offs do you prefer?' This shifts the conversation from 'why isn't engineering doing more?' to 'which business outcomes matter most?' 5. Defend the list quarterly (Ongoing): The Not Doing list is a living document. Review it every quarter. Some items will be promoted as strategy shifts. Others will be permanently archived. The key discipline is that adding something to the 'Doing' list requires removing something of equal size.",
        "commonMistakes": "Keeping the Not Doing list private — its power comes from transparency. Allowing leadership to add work without removing work ('just fit it in'). Framing as 'engineering can't do this' instead of 'here's the trade-off.' Not updating the list — it becomes stale and loses credibility. Treating it as permanent rejection rather than 'not now, and here's why.'",
        "whatGoodLooksLike": "Stakeholders reference the Not Doing list in their own planning. Leadership uses it to make resource allocation decisions. The team focuses on fewer things and delivers them well. Quarterly planning takes days, not weeks, because priorities are already clear. New requests are evaluated against the list: 'What would this replace?'",
        "mappingNotes": "Explicit prioritization trade-offs and strategic communication",
        "suggestedMetricIds": ["8.3", "8.4"]
    },
    # P-C3-5 — Build vs buy decision
    {
        "id": "P-C3-5",
        "slug": "running-a-build-vs-buy-decision-for-a-critical-system",
        "observableIds": ["C3-O3", "C3-O9", "C3-O1"],
        "capabilityIds": ["C3", "C10"],
        "title": "Running a Build-vs-Buy Decision for a Critical System",
        "context": "Your team needs a capability — observability platform, feature flag system, CI/CD pipeline, identity provider, or similar infrastructure. You could build it in-house or buy/adopt an external solution. The build option gives you full control but costs engineering time. The buy option is faster but creates vendor dependency. Both camps have passionate advocates on the team. You need a structured decision process.",
        "topicsActivated": [
            "Architecture (Build vs. Buy Analysis)",
            "Cost Management (TCO Evaluation)",
            "Strategy (Vendor Dependency Trade-offs)"
        ],
        "decisionFramework": "1. Define the decision criteria (Week 1): Before evaluating options, agree on what matters. Common criteria: total cost of ownership over 3 years, time to production readiness, customization requirements, vendor lock-in risk, team expertise required, integration complexity, compliance requirements. Weight these criteria based on your context — a startup values speed-to-production differently than a regulated enterprise. 2. Calculate honest TCO for both options (Week 1-2): Build TCO includes: initial development time, ongoing maintenance (typically 20-30% of build cost annually), opportunity cost of engineers not working on product, hiring/training for specialized skills, infrastructure costs. Buy TCO includes: license fees (watch for per-seat scaling), integration engineering, migration costs if you switch later, vendor management overhead, customization limits that require workarounds. The most common mistake is underestimating build maintenance and underestimating buy integration costs. 3. Evaluate the 'core vs. context' question (Week 1): If this capability is core to your competitive advantage, lean toward building. If it's context (necessary but not differentiating), lean toward buying. Very few companies gain competitive advantage from their CI/CD pipeline or observability platform — these are almost always better bought. 4. Run a time-boxed proof of concept (Week 2-3): For the top 2 options (one build, one buy), run a 1-week spike with real engineers on real requirements. This surfaces integration issues, developer experience, and feasibility that no spreadsheet analysis can capture. 5. Make the decision and document it (Week 3): Write an ADR (Architecture Decision Record) capturing: the decision, alternatives considered, criteria and weights, trade-offs accepted, and conditions that would trigger revisiting. Publish it widely — this prevents relitigating the decision later.",
        "commonMistakes": "Defaulting to build because 'we're engineers, we can build it better.' Underestimating ongoing maintenance cost of custom solutions (the 20-30% annual tax). Not accounting for opportunity cost — engineers building infrastructure aren't building product. Choosing a vendor based on a demo without running a real proof of concept. Making the decision in a meeting without documented analysis. Treating the decision as permanent — not defining conditions for revisiting.",
        "whatGoodLooksLike": "Decision made within 3-4 weeks with documented rationale. TCO analysis covers 3-year horizon including maintenance and opportunity cost. Team understands and supports the decision because they participated in the evaluation. ADR is published and referenced in future discussions. The system is in production within the expected timeline. One year later: the decision still holds, or was explicitly revisited when conditions changed.",
        "mappingNotes": "Structured build-vs-buy decision process with TCO analysis",
        "suggestedMetricIds": ["3.2", "2.3"]
    },
    # P-C4-5 — Remote-first operating rhythm
    {
        "id": "P-C4-5",
        "slug": "establishing-a-remote-first-operating-rhythm",
        "observableIds": ["C4-O11", "C4-O1", "C4-O13"],
        "capabilityIds": ["C4"],
        "title": "Establishing a Remote-First Operating Rhythm",
        "context": "Your team is distributed across time zones (or transitioning from co-located to hybrid/remote). Meetings that worked in-person don't translate — some people are in a conference room while others are on small laptop screens. Information flows through hallway conversations that remote team members miss. Async communication is chaotic, and remote engineers feel like second-class citizens. You need to redesign your operating rhythm for distributed work.",
        "topicsActivated": [
            "Operational Rhythm (Distributed Cadences)",
            "Communication (Async-First Practices)",
            "Team Health (Inclusion & Equal Access)"
        ],
        "decisionFramework": "1. Audit the current information flow (Week 1): Track where decisions are actually made for one week. If more than 30% of decisions happen in hallway conversations, ad-hoc office discussions, or meetings without remote-friendly facilitation, your operating rhythm is office-first regardless of your stated policy. 2. Establish async-first defaults (Week 1-2): Default to async for status updates, decisions that don't need real-time debate, and information sharing. Use written RFCs for technical decisions, async standups (Slack/written updates), and recorded demos. Reserve synchronous time for things that genuinely need it: brainstorming, conflict resolution, relationship building. 3. Redesign synchronous meetings (Week 2): If even one person is remote, the meeting is remote — everyone joins from their own device, no conference rooms with a single camera. Keep meetings within overlapping hours. Record everything for team members in non-overlapping time zones. Rotate meeting times if the team spans more than 4 hours of time zones — don't always disadvantage the same people. 4. Create structured social connection (Week 2-3): Remote teams lose the organic social interaction of offices. Intentionally create it: virtual coffee pairings, team social hours, in-person offsites quarterly. The key is making it opt-in and varied — not everyone bonds the same way. 5. Protect focus time explicitly (Ongoing): Remote work's biggest advantage is deep focus time. Protect it with meeting-free days or blocks. Set team norms for response times — not everything needs an immediate reply. Async communication works only if people trust that messages will be read within a reasonable window (e.g., 4 hours during work hours).",
        "commonMistakes": "Treating hybrid as 'remote people dial into office meetings' — this creates two tiers. Requiring real-time presence for everything, negating remote work's flexibility advantage. No explicit async norms — people feel pressure to respond immediately to every message. Forgetting social connection — remote teams that never interact informally lose trust and cohesion. Over-indexing on tools over practices — Slack and Zoom don't fix a broken communication culture.",
        "whatGoodLooksLike": "Remote and office-based team members report equal access to information and decisions. Meeting load decreases as async practices mature. Team members in different time zones can contribute fully without heroic schedule accommodation. Documentation quality improves as a side benefit of async-first practices. New team members can onboard from anywhere with equal effectiveness.",
        "mappingNotes": "Remote-first operating practices for distributed teams",
        "suggestedMetricIds": ["1.2", "5.1"]
    },
    # P-C9-6 — OKR design
    {
        "id": "P-C9-6",
        "slug": "designing-okrs-that-actually-drive-engineering-behavior",
        "observableIds": ["C9-O4", "C9-O5", "C9-O3"],
        "capabilityIds": ["C9", "C2"],
        "title": "Designing OKRs That Actually Drive Engineering Behavior",
        "context": "Your organization uses OKRs but they're not working. Teams set objectives during quarterly planning, put them in a spreadsheet, and never look at them again until the next planning cycle. Key results are either unmeasurable ('improve developer experience'), sandbagged ('deploy at least once per sprint' when you already deploy daily), or activity-based ('ship features X, Y, Z') rather than outcome-based. Leadership reviews OKRs quarterly but the process feels like theater.",
        "topicsActivated": [
            "Metrics (Outcome-Oriented Goal Setting)",
            "Strategy (Engineering-to-Business Alignment)",
            "Communication (Cross-Functional Planning)"
        ],
        "decisionFramework": "1. Diagnose the current dysfunction (Week 1): Classify your existing OKRs into four categories: unmeasurable (no number), sandbagged (already achieved), activity-based (counts output not outcomes), and genuine (measures outcomes with stretch targets). If more than 50% fall into the first three categories, you have a systemic problem, not a writing problem. 2. Teach the outcome mindset (Week 1-2): The key shift is from 'what will we ship?' to 'what will change because we ship it?' Instead of 'Launch new onboarding flow' (activity), write 'Reduce time-to-first-value for new users from 14 days to 3 days' (outcome). The engineering team should own the outcome, not just the output. Run a workshop where each team rewrites their OKRs using the outcome frame. 3. Set the right difficulty level (Week 2): Google's guidance is useful — 70% achievement on a well-set OKR is good. If teams routinely hit 100%, targets are too easy. If they routinely hit 30%, targets are demoralizing. Set one 'committed' key result (must hit, 100% expected) and one 'aspirational' key result (stretch, 60-70% expected) per objective. 4. Create the review cadence (Week 2-3): OKRs that are only reviewed quarterly are OKRs in name only. Establish a mid-quarter check-in where teams assess trajectory and adjust approach (not targets). The question isn't 'are we on track?' but 'what's blocking progress and what should we change?' 5. Connect to resource allocation (Ongoing): OKRs should drive sprint planning. If a team's sprint work doesn't connect to any OKR, either the OKRs are wrong or the sprint is wrong. Use OKR progress to inform next quarter's resource allocation — teams delivering high-impact outcomes should get more investment.",
        "commonMistakes": "Writing OKRs as a compliance exercise rather than a strategic tool. Setting key results that are binary (shipped/didn't ship) rather than continuous. Not reviewing until end of quarter — too late to course-correct. Disconnecting OKRs from sprint work — they live in a spreadsheet nobody opens. Using OKRs for individual performance evaluation (kills honest target-setting). Setting too many OKRs — more than 3 objectives per team dilutes focus.",
        "whatGoodLooksLike": "Teams reference OKRs in sprint planning ('this story advances KR-2'). Mid-quarter reviews surface real blockers and drive tactical adjustments. At least 50% of key results measure business outcomes, not engineering outputs. Achievement rates average 60-80%, indicating appropriately ambitious targets. Leadership uses OKR data to make resource allocation decisions. The OKR process takes less time each quarter as teams internalize the outcome mindset.",
        "mappingNotes": "Outcome-oriented OKR design and operational integration",
        "suggestedMetricIds": ["8.3", "8.4", "1.1"]
    }
]

# ── Interview Questions ───────────────────────────────

NEW_IQS = [
    # C3 — Migration planning (C3-O6)
    {
        "id": "IQ-113",
        "capabilityId": "C3",
        "question": "Describe a system migration you planned or led. How did you ensure business continuity during the transition?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you manage the dual-running period where both old and new systems were active?",
            "What was your rollback plan if the migration failed partway through?",
            "How did you sequence the migration across dependent services or teams?",
            "What would you do differently if you ran the same migration again?"
        ],
        "lookFor": [
            "Incremental migration strategy — not a big-bang cutover",
            "Explicit rollback plan tested before migration began",
            "Stakeholder communication about risks and timeline",
            "Metrics to validate the new system matched the old system's behavior",
            "Managed the dual-running cost and complexity consciously"
        ],
        "redFlags": [
            "Big-bang migration with no rollback plan",
            "No validation that the new system matched existing behavior",
            "Migration driven by technology preference rather than business need",
            "No consideration of dependent teams or downstream systems"
        ]
    },
    # C3 — Build vs buy (C3-O3)
    {
        "id": "IQ-114",
        "capabilityId": "C3",
        "question": "Walk me through a build-vs-buy decision you were involved in. What framework did you use to evaluate the options?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you calculate total cost of ownership for the build option versus the buy option?",
            "How did you handle strong opinions on the team about which direction to go?",
            "Looking back, was it the right decision? What would you evaluate differently now?",
            "How did you factor in vendor lock-in risk?"
        ],
        "lookFor": [
            "Structured evaluation with explicit criteria, not gut feel",
            "TCO analysis that includes ongoing maintenance, not just initial build cost",
            "Considered opportunity cost of engineers building infrastructure vs. product",
            "Applied the core-vs-context lens — build what differentiates, buy what doesn't",
            "Documented the decision for future reference"
        ],
        "redFlags": [
            "Defaulted to 'build' without evaluating buy options seriously",
            "No TCO analysis or wildly underestimated maintenance costs",
            "Decision made unilaterally without team input or documented rationale",
            "Treated the decision as permanent with no conditions for revisiting"
        ]
    },
    # C10 — Headcount case building (C10-O1)
    {
        "id": "IQ-115",
        "capabilityId": "C10",
        "question": "Tell me about a time you built a case for additional headcount or resources. How did you justify the investment to leadership?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you quantify the impact of not getting the additional resources?",
            "What data did you use to support the request?",
            "How did you present tiered options (best case, minimum viable, status quo)?",
            "What happened after you got (or didn't get) the headcount?"
        ],
        "lookFor": [
            "Framed the request in business impact terms, not just engineering needs",
            "Used data — capacity models, velocity trends, opportunity cost — to justify the ask",
            "Presented tiered options showing trade-offs at different investment levels",
            "Connected headcount to specific deliverables or outcomes, not vague 'we need more people'"
        ],
        "redFlags": [
            "Couldn't quantify the business impact of the request",
            "Presented a single option rather than tiered trade-offs",
            "Framed it as 'my team is overworked' without connecting to business outcomes",
            "No follow-through on measuring ROI after getting the resources"
        ]
    },
    # C11 — Hiring bar under pressure (C11-O2)
    {
        "id": "IQ-116",
        "capabilityId": "C11",
        "question": "How do you maintain your hiring bar when there's pressure to fill roles quickly? Give me an example where you pushed back on a borderline candidate.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What signals told you the candidate wasn't above bar despite pressure to hire?",
            "How did you communicate the decision to the hiring manager or recruiter?",
            "How do you calibrate 'good enough' versus 'we're lowering the bar'?",
            "What's your approach when the team has been searching for months without a hire?"
        ],
        "lookFor": [
            "Clear articulation of what 'bar' means beyond a gut feeling",
            "Willingness to keep the role open rather than make a weak hire",
            "Structured debrief process that separates signal from noise",
            "Proactive pipeline building so urgency doesn't force compromise",
            "Understanding that a bad hire costs more than a delayed hire"
        ],
        "redFlags": [
            "Lowered the bar under pressure without acknowledging the trade-off",
            "No structured evaluation criteria — 'I just know a good hire when I see one'",
            "Blamed recruiting for pipeline quality without taking ownership",
            "Never pushed back on a borderline candidate despite years of hiring"
        ]
    }
]

# ── Search Index Entries ──────────────────────────────

CAP_META = {
    "C1": {"domain": "Strategy", "capabilityName": "Org-Level Thinking"},
    "C2": {"domain": "Strategy", "capabilityName": "Strategic Prioritization"},
    "C3": {"domain": "Execution", "capabilityName": "Systems Design & Architecture"},
    "C4": {"domain": "Execution", "capabilityName": "Operational Leadership & Rhythm"},
    "C9": {"domain": "Data", "capabilityName": "Metrics, Measurement & Outcomes"},
    "C10": {"domain": "Data", "capabilityName": "Resource Allocation & Tradeoffs"},
    "C11": {"domain": "People", "capabilityName": "Hiring, Onboarding & Role Design"},
}

def ap_search_entry(ap):
    cap = ap["capabilityId"]
    meta = CAP_META[cap]
    return {
        "title": "{}: {} — {}".format(ap["id"], ap["name"], ap["shortDesc"]),
        "description": ap["shortDesc"],
        "type": "anti-pattern",
        "url": "/anti-patterns/{}/".format(ap["slug"]),
        "domain": meta["domain"],
        "capabilityName": meta["capabilityName"],
        "id": ap["id"]
    }

def pb_search_entry(pb):
    cap = pb["capabilityIds"][0]
    meta = CAP_META[cap]
    return {
        "title": pb["title"],
        "description": pb["context"].split(". ")[0] + ".",
        "type": "playbook",
        "url": "/playbooks/{}/".format(pb["slug"]),
        "domain": meta["domain"],
        "capabilityName": meta["capabilityName"],
        "id": pb["id"]
    }

# ── Apply Changes ─────────────────────────────────────

print("=== Applying Session 24 Enrichments (Gap Fill) ===")

# Anti-patterns
ap = load("anti-patterns.json")
ap.extend(NEW_APS)
save("anti-patterns.json", ap)
print("  Added {} anti-patterns (total: {})".format(len(NEW_APS), len(ap)))

# Playbooks
pb = load("playbooks.json")
pb.extend(NEW_PBS)
save("playbooks.json", pb)
print("  Added {} playbooks (total: {})".format(len(NEW_PBS), len(pb)))

# Interview Questions
iq = load("interview-questions.json")
iq.extend(NEW_IQS)
save("interview-questions.json", iq)
print("  Added {} interview questions (total: {})".format(len(NEW_IQS), len(iq)))

# Search Index
si = load("search-index.json")
for a in NEW_APS:
    si.append(ap_search_entry(a))
for p in NEW_PBS:
    si.append(pb_search_entry(p))
save("search-index.json", si)
print("  Added {} search index entries (total: {})".format(len(NEW_APS) + len(NEW_PBS), len(si)))

# ── Verify Floor Counts ──────────────────────────────

print("\n=== Verifying Floor Counts ===")

# Reload to verify
ap = load("anti-patterns.json")
pb = load("playbooks.json")
iq = load("interview-questions.json")

# Count by capability
from collections import Counter

ap_counts = Counter(a["capabilityId"] for a in ap)
pb_counts = Counter(p["capabilityIds"][0] for p in pb)
iq_counts = Counter(q["capabilityId"] for q in iq)

caps = ["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","C11","C12","C13","C14"]

print("{:>4} {:>4} {:>4} {:>4}".format("Cap", "AP", "PB", "IQ"))
print("-" * 20)
ap_ok = pb_ok = iq_ok = True
for c in caps:
    a_n = ap_counts.get(c, 0)
    p_n = pb_counts.get(c, 0)
    i_n = iq_counts.get(c, 0)
    flags = []
    if a_n < 5: flags.append("AP<5"); ap_ok = False
    if p_n < 5: flags.append("PB<5"); pb_ok = False
    if i_n < 8: flags.append("IQ<8"); iq_ok = False
    flag_str = " <- " + ", ".join(flags) if flags else ""
    print("{:>4} {:>4} {:>4} {:>4}{}".format(c, a_n, p_n, i_n, flag_str))

print("\n=== Floor Check ===")
print("AP >= 5 for all caps: {}".format("PASS" if ap_ok else "FAIL"))
print("PB >= 5 for all caps: {}".format("PASS" if pb_ok else "FAIL"))
print("IQ >= 8 for all caps: {}".format("PASS" if iq_ok else "FAIL"))

print("\n=== Session 24 Summary ===")
print("Anti-patterns: +2 (C4: Big-Bang Deploy, C9: Vanity OKR)")
print("Playbooks: +5 (C1: Platform Strategy, C2: Not Doing List, C3: Build vs Buy, C4: Remote-First, C9: OKR Design)")
print("Interview Questions: +4 (C3: Migration + Build/Buy, C10: Headcount Case, C11: Hiring Bar)")
print("Search Index: +7 entries")

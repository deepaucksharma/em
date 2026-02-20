#!/usr/bin/env python3
"""
Session 8 Enrichment — Depth pass on thinnest areas
Based on critical reading of LeadDev articles:
  - "4 rituals that revolutionized my engineering teams" (C12 playbook)
  - "Build psychological safety in a world of layoffs" + "Rebuilding trust: Leadership after layoffs" (C12 playbook)
  - "5 best practices for annual budget planning" + "Overcoming challenges of annual budget planning" (C10 playbook)
  - "Five management anti-patterns and why they happen" (C1 anti-pattern)
  - "How to build a culture of accountability in your teams" + "Cultivating ownership at any engineering level" (C12 signals)
  - "Engineering leadership in 2025: Thriving when budgets shrink" (C10 signals)

Targets:
  - Playbooks: +3 (C12: 4→6, C10: 6→7)
  - Anti-Patterns: +3 (C1: 3→4, C10: 3→4, C4: 3→4)
  - Calibration Signals: +8 (C10: 11→15, C12: 12→16)
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

# ── Playbooks ──────────────────────────────────────────

NEW_PLAYBOOKS = [
    {
        "id": "P-C12-5",
        "slug": "building-team-culture-through-intentional-rituals",
        "observableIds": ["C12-O2", "C12-O4", "C12-O7"],
        "capabilityIds": ["C12"],
        "title": "Building Team Culture Through Intentional Rituals",
        "context": "Your team ships reliably but lacks cohesion. Engineers don't understand business metrics, don't contribute to roadmap discussions, and treat culture as 'something HR does.' Retros feel perfunctory and nobody proposes ambitious improvements. You want to move from a group of individuals to a genuine team.",
        "topicsActivated": [
            "Culture (Ritual Design)",
            "Engagement (Business Context Sharing)",
            "Innovation (Structured Ideation)"
        ],
        "decisionFramework": "1. Start with metrics visibility (Month 1): Establish a monthly 'numbers review' — a 45-minute meeting where engineering, product, design, and relevant business stakeholders review key metrics together. The goal isn't accountability theater; it's giving engineers the context they lack. When engineers understand business metrics, they make better technical trade-offs without being told. 2. Add structured ideation (Month 2): Monthly session where any team member can propose product, marketing, or process improvements. Key: proposals must include a lightweight problem statement and expected impact. This isn't a free-for-all brainstorm; it's a structured channel for bottom-up innovation. Engineers who contribute to the roadmap feel ownership over outcomes. 3. Create a 10X improvement space (Month 3): Bi-monthly session dedicated to ambitious technical improvements — monitoring stacks, automation, architecture evolution. The rule: ideas must aim for 10x improvement, not 10%. This gives engineers permission to think big and surfaces strategic technical investments. 4. Iterate and prune: Not every ritual will land. After 3 months, retrospect on the rituals themselves. Drop what isn't working. The goal is 2-3 high-value rituals, not a packed calendar.",
        "commonMistakes": "Adding rituals without removing anything, creating meeting overload. Making attendance mandatory without explaining purpose. Letting meetings become status updates instead of genuine discussions. Starting all four rituals at once instead of building incrementally. Not involving the team in choosing which rituals to adopt.",
        "whatGoodLooksLike": "Within 3 months: engineers can articulate team KPIs without prompting, at least one bottom-up idea ships per quarter, and the team proactively proposes technical improvements. The LeadDev article on team rituals emphasizes that these aren't add-ons — they replace the context and ownership that agile ceremonies alone don't provide.",
        "mappingNotes": "Based on LeadDev 'rituals that revolutionized engineering teams' — Numberzz, Ideation, and 10X patterns.",
        "suggestedMetricIds": ["6.3", "6.4"]
    },
    {
        "id": "P-C12-6",
        "slug": "rebuilding-psychological-safety-after-organizational-disruption",
        "observableIds": ["C12-O1", "C12-O6", "C12-O7"],
        "capabilityIds": ["C12", "C14"],
        "title": "Rebuilding Psychological Safety After Organizational Disruption",
        "context": "Your organization just went through layoffs, a major re-org, or leadership change. The remaining team is disengaged — people avoid speaking up in meetings, nobody challenges decisions, risk-taking has stopped, and your best performers are quietly interviewing. Trust has evaporated.",
        "topicsActivated": [
            "Culture (Psychological Safety Recovery)",
            "People (Trust Rebuilding)",
            "Leadership (Vulnerability and Transparency)"
        ],
        "decisionFramework": "1. Acknowledge reality immediately (Week 1): Do not pretend things are normal. In your first team meeting post-disruption, name what happened directly. Share what you know and what you don't. People's anxiety comes from uncertainty, not from bad news. The worst response is silence. 2. Listen before acting (Week 1-2): Run individual check-ins with every team member. Do not start with 'here's the plan going forward.' Start with 'how are you doing, and what are you worried about?' Write down themes but don't promise fixes yet. 3. Re-establish predictability (Week 2-4): People need to know what won't change. Reaffirm team mission, working agreements, and key processes. Publish a simple 30-60-90 plan. Predictability rebuilds the foundation of safety. 4. Model vulnerability (Ongoing): Share your own uncertainty. 'I don't have all the answers' is more powerful than a confident facade. Thank people publicly for disagreeing or raising concerns. 5. Create low-stakes participation (Month 2+): Start meetings with brief check-ins. Use written-first formats for sensitive discussions. Create anonymous feedback channels. Rebuild contributor safety gradually — people need to see that speaking up is safe before they'll do it.",
        "commonMistakes": "Jumping straight to 'rallying the troops' with false optimism. Avoiding the topic entirely and hoping time heals. Over-communicating strategy when people need emotional acknowledgment first. Treating symptoms (low velocity) instead of root cause (low trust). Expecting psychological safety to return on a timeline you control.",
        "whatGoodLooksLike": "Within 60 days: team members raise concerns in meetings again, at least one person publicly disagrees with a decision constructively, and attrition stabilizes. Within 90 days: team health survey shows improvement. The LeadDev articles on post-layoff leadership emphasize that consistency — not grand gestures — rebuilds trust. Show up, listen, be transparent, repeat.",
        "mappingNotes": "Based on LeadDev articles on psychological safety after layoffs and the REST framework for post-layoff leadership.",
        "suggestedMetricIds": ["6.3", "6.5"]
    },
    {
        "id": "P-C10-5",
        "slug": "navigating-your-first-annual-engineering-budget-cycle",
        "observableIds": ["C10-O1", "C10-O6", "C10-O7"],
        "capabilityIds": ["C10", "C1"],
        "title": "Navigating Your First Annual Engineering Budget Cycle",
        "context": "You've been promoted to a role where you now own budget planning for the first time. You need to present a headcount plan, tooling budget, and infrastructure forecast to finance and your VP. You've never done this before and don't want to show up with a wishlist that gets cut in half.",
        "topicsActivated": [
            "Resource Allocation (Budget Planning Process)",
            "Stakeholder (Cross-Functional Budget Alignment)",
            "Strategy (ROI-Driven Investment Cases)"
        ],
        "decisionFramework": "1. Understand last year first (Month before cycle): Get last year's approved budget, actual spend, and variance. Understand what was approved, what was actually spent, and why they differed. This is your baseline credibility — showing you understand history before proposing the future. 2. Build three tiers (During planning): For every major ask, present three options with quantified trade-offs. Tier 1 (minimum viable): what you need to keep the lights on. Tier 2 (recommended): what you need to hit committed goals. Tier 3 (investment): what would accelerate beyond current targets. Each tier has a number, a deliverable, and a trade-off. 3. Present with product as a united front: Align with your product counterpart before the budget meeting. Non-technical leaders see a joint eng+product plan as alignment, giving them confidence. A solo engineering budget request looks like empire building. 4. Bring data, not opinions: Every headcount request links to a deliverable. Every tooling request includes current cost and projected savings. Don't say 'we need more people' — say 'to deliver X by Q3, we need Y engineers; without them, the timeline extends to Q1 next year.' 5. Plan for what you'll cut: Finance will likely reduce your ask by 15-25%. Decide in advance which tier-3 items you'd sacrifice. Being prepared for the cut earns more trust than fighting it.",
        "commonMistakes": "Submitting a budget in isolation without product alignment. Asking for headcount without linking it to deliverables. Not knowing last year's actual spend. Presenting a single number instead of tiered options. Getting emotional when the budget gets cut instead of having a prepared fallback position.",
        "whatGoodLooksLike": "Budget approved within one revision cycle. Finance trusts your numbers because they're grounded in historical data and linked to deliverables. You get 80-90% of your tier-2 ask. Multiple LeadDev articles on budget planning converge on this: the leaders who get funded are the ones who present as business partners, not cost centers.",
        "mappingNotes": "Based on LeadDev articles on annual budget planning best practices and overcoming budget planning challenges.",
        "suggestedMetricIds": ["3.1", "3.3"]
    }
]

# ── Anti-Patterns ──────────────────────────────────────

NEW_ANTI_PATTERNS = [
    {
        "id": "AP-54",
        "name": "The Wrecking Ball",
        "slug": "the-wrecking-ball",
        "observableIds": ["C1-O13", "C1-O4"],
        "capabilityId": "C1",
        "shortDesc": "new leader makes drastic changes in first weeks without understanding context — scrapping processes, canceling projects, reorganizing teams based on assumptions rather than assessment",
        "warningSigns": [
            "Announces major changes before completing 1:1s with all directs",
            "Dismisses existing processes as 'broken' without understanding why they exist",
            "Cancels projects or changes priorities in first two weeks",
            "Uses phrases like 'at my last company we did it differently' as justification",
            "Team morale drops sharply within first month"
        ],
        "impact": "Team loses trust in new leadership immediately. Institutional knowledge is discarded. Good people leave because they feel their work was meaningless. Changes may solve problems that didn't exist while ignoring real ones. Creates a reputation that makes future change initiatives harder because the team has 'change fatigue.'",
        "recoveryActions": [
            "Pause all announced changes and communicate a structured assessment period",
            "Conduct proper 30-day listening tour with every team member and key stakeholders",
            "Map existing processes to the problems they were designed to solve before eliminating them",
            "Separate genuine problems from style preferences — only act on the former first",
            "Build credibility through quick wins on acknowledged pain points before tackling structural changes"
        ],
        "sourceTopic": "Org-Level Thinking (New Leader Entry)",
        "mappingNotes": "Based on LeadDev 'Five management anti-patterns and why they happen' — The Wrecking Ball pattern."
    },
    {
        "id": "AP-55",
        "name": "Budget in a Vacuum",
        "slug": "budget-in-a-vacuum",
        "observableIds": ["C10-O1", "C10-O6"],
        "capabilityId": "C10",
        "shortDesc": "engineering leader plans budget in isolation without cross-functional input from product, finance, or peer engineering teams, resulting in misaligned asks and adversarial budget reviews",
        "warningSigns": [
            "Budget proposal doesn't reference product roadmap or business goals",
            "Headcount requests say 'we need more engineers' without specifying deliverables",
            "Finance pushback is a surprise rather than an anticipated negotiation",
            "Product leader has a different number for the same initiative",
            "Cannot explain last year's budget variance"
        ],
        "impact": "Budget gets cut significantly because it lacks business justification. Engineering is perceived as a cost center rather than a strategic investment. Adversarial relationship with finance develops. Product team feels engineering isn't aligned. Cycle repeats annually with increasing frustration.",
        "recoveryActions": [
            "Schedule joint planning sessions with product counterpart before submitting budget",
            "Link every headcount request to a specific deliverable with timeline impact",
            "Build three-tier budget proposals (minimum, recommended, investment) with quantified trade-offs",
            "Meet with finance to understand their constraints and evaluation criteria before the formal review",
            "Review last year's actuals vs. approved budget to establish baseline credibility"
        ],
        "sourceTopic": "Resource Allocation & Tradeoffs (Budget Planning)",
        "mappingNotes": "Based on LeadDev articles on annual budget planning best practices."
    },
    {
        "id": "AP-56",
        "name": "The Stress Funnel",
        "slug": "the-stress-funnel",
        "observableIds": ["C4-O7", "C4-O13"],
        "capabilityId": "C4",
        "shortDesc": "manager passes organizational pressure, political conflicts, and exec anxiety directly to engineers instead of filtering and translating it into actionable context",
        "warningSigns": [
            "Team knows about every executive disagreement and political conflict",
            "Manager shares raw Slack threads from leadership arguing about priorities",
            "Engineers feel anxious about company politics rather than focused on their work",
            "Every new request comes with 'the VP is really worried about this' framing",
            "Team morale tracks leadership drama rather than their own delivery"
        ],
        "impact": "Engineers become anxious and distracted by problems they can't solve. Focus time is destroyed by context-switching on perceived emergencies that are actually just exec-level discussions. Best engineers leave because the environment feels chaotic and unsafe. Manager mistakes transparency for dumping, eroding psychological safety.",
        "recoveryActions": [
            "Establish a personal filter: 'Does this information change what my team should do today?'",
            "Translate executive concerns into specific, actionable asks before sharing with the team",
            "Protect the team's context: share decisions and relevant context, not the sausage-making",
            "Build an interrupt budget — cap the number of 'urgent' redirections per sprint",
            "Practice the 3-sentence rule: situation, what it means for us, what we're doing about it"
        ],
        "sourceTopic": "Operational Leadership (Information Filtering)",
        "mappingNotes": "Based on LeadDev 'Five management anti-patterns' — The Funnel pattern. Manager acts as stress amplifier rather than filter."
    }
]

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C10 signals (11→15) — budget planning and resource strategy depth
    {
        "id": "SIG-285",
        "observableId": "C10-O1",
        "capabilityId": "C10",
        "signalText": "Budget partnership: 'Presented joint eng+product budget to CFO — approved in one revision cycle with 90% of tier-2 ask, because every headcount linked to a roadmap deliverable with timeline impact.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Annual Budget Planning"
    },
    {
        "id": "SIG-286",
        "observableId": "C10-O6",
        "capabilityId": "C10",
        "signalText": "Negotiation readiness: 'Pre-identified which tier-3 investments to defer — when finance requested 20% cut, responded within 24 hours with revised plan and explicit trade-offs, maintaining trust.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Annual Budget Planning"
    },
    {
        "id": "SIG-287",
        "observableId": "C10-O7",
        "capabilityId": "C10",
        "signalText": "Historical grounding: 'Analyzed 3-year budget vs. actuals trend — identified consistent underspend on tooling and overspend on contractors, proposed rebalancing that saved $200K while improving developer productivity.'",
        "signalType": "metric",
        "sourceSubTopic": "Resource Allocation Strategy"
    },
    {
        "id": "SIG-288",
        "observableId": "C10-O5",
        "capabilityId": "C10",
        "signalText": "Strategic constraint navigation: 'During hiring freeze, negotiated contractor-to-FTE conversion for 2 critical roles — lower total cost with higher retention, accepted by finance because of ROI model.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Resource Allocation Under Constraints"
    },
    # C12 signals (12→16) — culture rituals, accountability, ownership depth
    {
        "id": "SIG-289",
        "observableId": "C12-O2",
        "capabilityId": "C12",
        "signalText": "Intentional ritual design: 'Introduced monthly cross-functional metrics review — within 3 months, engineers proactively flagged business-impacting technical decisions without being asked.'",
        "signalType": "manager_observation",
        "sourceSubTopic": "Culture Rituals"
    },
    {
        "id": "SIG-290",
        "observableId": "C12-O4",
        "capabilityId": "C12",
        "signalText": "Bottom-up innovation channel: 'Structured monthly ideation sessions produced 4 shipped features from engineer proposals in 6 months — team ownership scores increased 15 points.'",
        "signalType": "metric",
        "sourceSubTopic": "Culture Rituals"
    },
    {
        "id": "SIG-291",
        "observableId": "C12-O1",
        "capabilityId": "C12",
        "signalText": "Post-disruption recovery: 'After layoffs, ran individual listening sessions with all 14 remaining team members before making any changes. Published 30-60-90 stability plan. Attrition: zero regrettable departures in following quarter.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Psychological Safety"
    },
    {
        "id": "SIG-292",
        "observableId": "C12-O7",
        "capabilityId": "C12",
        "signalText": "Accountability without blame: 'Shifted team retrospectives from 'what went wrong' to 'what did we learn and what will we do differently' — action item completion rate improved from 40% to 85%, and engineers started volunteering ownership of improvements.'",
        "signalType": "manager_observation",
        "sourceSubTopic": "Accountability Culture"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 8 Enrichments ===")

# Playbooks
pb = load("playbooks.json")
pb.extend(NEW_PLAYBOOKS)
save("playbooks.json", pb)
print(f"  Added {len(NEW_PLAYBOOKS)} playbooks (total: {len(pb)})")

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

for p in NEW_PLAYBOOKS:
    new_si_entries.append({
        "id": p["id"],
        "type": "playbook",
        "title": p["title"],
        "content": f"{p['context']} {p['decisionFramework'][:200]}",
        "slug": f"/playbooks/{p['slug']}",
        "capability": p["capabilityIds"][0]
    })

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

session8 = {
    "session": 8,
    "date": "2026-02-20",
    "focus": "Depth pass: C12 culture playbooks, C10 budget playbook, C1/C10/C4 anti-patterns, C10/C12 calibration signals",
    "articlesReviewed": 10,
    "additions": {
        "playbooks": 3,
        "antiPatterns": 3,
        "calibrationSignals": 8
    },
    "capabilitiesEnriched": ["C1", "C4", "C10", "C12", "C14"],
    "coverageImpact": {
        "C12": "PB: 4→6, CS: 12→16",
        "C10": "PB: 6→7, CS: 11→15, AP: 3→4",
        "C1": "AP: 3→4",
        "C4": "AP: 3→4"
    },
    "notes": "Focused on thinnest content areas. C12 playbooks moved from problem-fixing to proactive culture building (rituals, post-disruption recovery). C10 gained proactive budget planning playbook complementing existing reactive playbooks. Anti-patterns added for new-leader entry mistakes, isolated budget planning, and stress funneling."
}

rp["sessions"].append(session8)

# Update totals
for key in session8["additions"]:
    mapped_key = key
    if key == "antiPatterns":
        mapped_key = "antiPatterns"
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session8["additions"][key]

rp["grandTotal"] = sum(rp["totalAdditions"].values())

# Update data file totals
rp["dataFileTotals"]["playbooks"] = len(pb)
rp["dataFileTotals"]["antiPatterns"] = len(ap)
rp["dataFileTotals"]["calibrationSignals"] = len(cs)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

# ── Summary ────────────────────────────────────────────

print(f"\n=== Session 8 Summary ===")
print(f"Playbooks: +{len(NEW_PLAYBOOKS)} (C12:2, C10:1)")
print(f"Anti-Patterns: +{len(NEW_ANTI_PATTERNS)} (C1:1, C10:1, C4:1)")
print(f"Calibration Signals: +{len(NEW_SIGNALS)} (C10:4, C12:4)")
print(f"Total additions: {len(NEW_PLAYBOOKS) + len(NEW_ANTI_PATTERNS) + len(NEW_SIGNALS)}")

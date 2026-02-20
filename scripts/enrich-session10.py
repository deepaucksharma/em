#!/usr/bin/env python3
"""
Session 10 Enrichment — Playbooks for C2/C3/C7 + thin calibration signals
Based on critical reading of LeadDev articles:
  - "Avoiding the priority zero trap" + "Building a prioritization framework" (C2 playbook)
  - "How to create a tech debt strategy that works" + "Practical tech-debt prioritization" (C3 playbook)
  - "Mastering tough technical decisions" + "How to make the right decisions under pressure" + "Every decision creates a policy" (C7 playbook)
  - Performance/calibration and metrics articles for calibration signals

Targets:
  - Playbooks: +3 (C2: 5→6, C3: 5→6, C7: 5→6)
  - Calibration Signals: +6 (C14: 16→18, C4: 17→19, C9: 17→19)
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
        "id": "P-C2-3",
        "slug": "everything-is-priority-zero-and-your-team-is-drowning",
        "observableIds": ["C2-O2", "C2-O5", "C2-O3"],
        "capabilityIds": ["C2", "C10"],
        "title": "Everything Is Priority Zero and Your Team Is Drowning",
        "context": "Every initiative in flight has been labeled 'highest priority' by a different stakeholder. Your team is context-switching between 5 workstreams, nothing is finishing, and engineers are frustrated. You tried pushing back but each stakeholder explains why theirs is genuinely the most urgent. Sprint commitments are meaningless.",
        "topicsActivated": [
            "Strategy (Ruthless Prioritization)",
            "Stakeholder (Priority Negotiation)",
            "Execution (Focus and Throughput)"
        ],
        "decisionFramework": "1. Make the cost visible (Day 1): List every active workstream with current allocation and expected completion date at current pace. Show stakeholders the math: 5 parallel priorities with 8 engineers means each gets 1.6 engineers and nothing ships for months. Parallelism has a cost and it's visible when you write it down. 2. Force-rank with a framework (Week 1): Use a simple scoring model — business impact, urgency (reversibility of delay), and confidence. Score each initiative. The framework doesn't have to be perfect; its value is making the ranking conversation explicit rather than political. Present the ranked list to leadership and ask: 'Do you agree with this order? If not, which two would you swap and why?' 3. Establish a 'not doing' list (Week 1): Publish what you're explicitly not doing and why. This is more important than the doing list. It forces acknowledgment that trade-offs exist. A highly visible task does not need to become your highest priority the moment you learn about it — but you should communicate where it sits on your list and why. 4. Limit active work (Week 2+): Set a WIP limit: no more than 2-3 active workstreams at a time. New priorities can only enter when something exits. This is not about saying no — it's about saying 'not yet, and here's when.' 5. Review monthly: Priorities shift. What wasn't important yesterday can become urgent tomorrow. Run a monthly priority review with stakeholders. This makes reprioritization a system, not a crisis.",
        "commonMistakes": "Trying to keep everyone happy by spreading the team thin across all priorities. Prioritizing based on who asks loudest rather than business impact. Not publishing the 'not doing' list because it feels confrontational. Using a framework so complex nobody trusts it. Failing to revisit priorities as context changes.",
        "whatGoodLooksLike": "Within 2 weeks: team is focused on 2-3 priorities, shipping tempo increases. Within a month: stakeholders reference the priority list in their own planning. The LeadDev article on the 'priority zero trap' captures it well: if everything is a priority then nothing is, and a prioritization system isn't about finding the perfect order — it's about creating a shared language for trade-offs.",
        "mappingNotes": "Based on LeadDev 'Avoiding the priority zero trap' and 'Building a prioritization framework.'",
        "suggestedMetricIds": ["1.2", "2.1"]
    },
    {
        "id": "P-C3-4",
        "slug": "managing-tech-debt-strategically-without-stopping-the-roadmap",
        "observableIds": ["C3-O4", "C3-O11", "C3-O1"],
        "capabilityIds": ["C3", "C9"],
        "title": "Managing Tech Debt Strategically Without Stopping the Roadmap",
        "context": "Your team has significant tech debt that's slowing delivery, but you can't stop the roadmap for a multi-month cleanup. Product is sympathetic but won't give you a quarter of dedicated refactoring time. Engineers are frustrated by working around old decisions. Previous 'tech debt sprints' produced feel-good cleanup that didn't move the needle on actual velocity.",
        "topicsActivated": [
            "Architecture (Systematic Debt Management)",
            "Strategy (Capacity Allocation)",
            "Metrics (Impact Quantification)"
        ],
        "decisionFramework": "1. Inventory and score (Week 1-2): Create a lightweight tech debt register. For each item, score three things: severity (how much does it slow us down daily?), strategic impact (does it block roadmap items?), and effort to resolve. Use a simple 1-5 scale. The goal isn't precision — it's creating shared language for comparing debts across the team. 2. Find the leverage points: The insight from experience is that debt isn't solved by scope — it's solved by relevance. Look for the 2-3 debt items blocking the most roadmap work. An e-commerce team found three requested features were blocked by just two architectural decisions from four years ago. Fixing those two items unblocked months of roadmap. 3. Establish a capacity allocation (Month 1): Adopt a 70/20/10 model — 70% on roadmap delivery, 20% on medium-term technical health (the debt items blocking roadmap), and 10% on longer-term cleanup or experiments. This gives product predictability and engineers breathing space. 4. Quantify in business terms (Ongoing): Frame debt as risk and velocity, not engineering purity. 'This service has 47 known issues and our deploy frequency has dropped from daily to weekly' is more compelling to leadership than 'the architecture needs modernizing.' 5. Make progress visible (Ongoing): Track the debt register publicly. Show items resolved, velocity improvements, and incidents prevented. Treat tech debt like a product backlog — prioritized, visible, and regularly groomed.",
        "commonMistakes": "Trying to fix all debt at once instead of targeting highest-leverage items. Framing debt as an engineering concern rather than a business risk. Running 'tech debt sprints' that clean up low-impact items for morale but don't improve velocity. Not tracking the impact of debt reduction, so leadership sees it as overhead. Allocating 0% to tech health because 'we'll get to it after the next launch.'",
        "whatGoodLooksLike": "Within 3 months: measurable improvement in deploy frequency or cycle time from targeted debt reduction. Team has a living debt register that product references during planning. The 70/20/10 allocation is respected in sprint planning. The LeadDev article's key insight resonates: the most effective tech debt strategies focus on relevance, not comprehensiveness.",
        "mappingNotes": "Based on LeadDev 'How to create a tech debt strategy that works' (70/20/10 model), 'Practical tech-debt prioritization', and tech debt scoring frameworks.",
        "suggestedMetricIds": ["2.3", "3.2"]
    },
    {
        "id": "P-C7-4",
        "slug": "making-a-high-stakes-technical-decision-under-time-pressure",
        "observableIds": ["C7-O1", "C7-O10", "C7-O6"],
        "capabilityIds": ["C7", "C3"],
        "title": "Making a High-Stakes Technical Decision Under Time Pressure",
        "context": "You need to decide between two architectural approaches for a critical project. Both have significant trade-offs. Your team is split. Leadership wants an answer by Friday. The wrong choice will be expensive to reverse. You're feeling pressure to either over-analyze (missing the deadline) or decide too fast (regret later). Previous big decisions have been revisited repeatedly because they weren't well-documented.",
        "topicsActivated": [
            "Decision Making (Structured Under Pressure)",
            "Communication (Decision Documentation)",
            "Architecture (Trade-off Analysis)"
        ],
        "decisionFramework": "1. Classify the decision (Hour 1): Is this a one-way door (irreversible, high cost to change) or a two-way door (reversible, low switching cost)? One-way doors deserve deliberation. Two-way doors should be made fast and revisited if needed. If you're not sure, default to two-way and use feature flags to contain blast radius. 2. Structure the options (Day 1): For each option, document three things: what it optimizes for, what it sacrifices, and what assumptions it depends on. Avoid framing as 'good option vs. bad option' — instead, frame as 'Option A optimizes for X at the cost of Y; Option B optimizes for Y at the cost of X.' 3. Seek disconfirming input (Day 1-2): Ask the strongest advocate of the option you're leaning against to make their best case. Run a 15-minute pre-mortem: 'It's 6 months from now and this decision was a disaster — what happened?' This surfaces risks your confidence might be hiding. 4. Decide and document (Day 2-3): Make the call. Write an Architecture Decision Record (ADR): context, options considered, decision, and rationale. The documentation matters because every decision creates a policy — future teams will encounter similar choices and need to understand why you chose what you chose. 5. Plan a decision retro (Schedule for 30/60/90 days out): After 30 days, run a 15-minute retro: 'What worked, what felt unclear, would we make the same call?' This normalizes learning from decisions and reduces the fear of making them.",
        "commonMistakes": "Analysis paralysis — waiting for perfect information that will never come. Making the decision in your head and announcing it without structured input. Treating the decision as purely technical when it has organizational and people implications. Not documenting the rationale, leading to the same debate resurfacing months later. Deciding quickly to relieve pressure without considering trade-offs.",
        "whatGoodLooksLike": "Decision made within timeline. ADR published and referenced by other teams facing similar choices. Team feels heard even if they disagreed. 30-day retro confirms the decision or surfaces learnings for the next one. The LeadDev articles on tough technical decisions converge on this: decision-making isn't about having all the answers — it's about creating structure when things are messy and helping your team feel confident moving forward.",
        "mappingNotes": "Based on LeadDev 'Mastering tough technical decisions', 'How to make the right decisions under pressure', and 'Every decision creates a policy' (ADR/documentation emphasis).",
        "suggestedMetricIds": ["2.2", "2.5"]
    }
]

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C14 signals (16→18) — performance management depth
    {
        "id": "SIG-299",
        "observableId": "C14-O7",
        "capabilityId": "C14",
        "signalText": "Continuous performance documentation: 'Maintained monthly performance notes for all 12 directs — review cycle prep took 2 hours per person instead of 2 days, and every rating was backed by 6+ specific examples with dates.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Continuous Performance Tracking"
    },
    {
        "id": "SIG-300",
        "observableId": "C14-O8",
        "capabilityId": "C14",
        "signalText": "High-performer differentiation: 'Created individualized growth plans for top 3 performers — one got a stretch architecture role, one got external conference speaking, one got cross-team project lead. All three stayed through a year of industry layoffs.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "High Performer Retention"
    },
    # C4 signals (17→19) — operational rhythm depth
    {
        "id": "SIG-301",
        "observableId": "C4-O7",
        "capabilityId": "C4",
        "signalText": "Interrupt management: 'Implemented interrupt budget of 15% capacity with designated interrupt handler rotation — unplanned work dropped from 40% to 18% of sprint capacity, and sprint completion rate improved from 65% to 88%.'",
        "signalType": "metric",
        "sourceSubTopic": "Focus Protection"
    },
    {
        "id": "SIG-302",
        "observableId": "C4-O12",
        "capabilityId": "C4",
        "signalText": "Velocity bottleneck diagnosis: 'Used value stream mapping to identify code review as throughput bottleneck — review queue averaged 3 days. Introduced review pairing and async-first reviews, reducing to 8 hours. Cycle time improved 35%.'",
        "signalType": "metric",
        "sourceSubTopic": "Delivery Velocity"
    },
    # C9 signals (17→19) — metrics sophistication
    {
        "id": "SIG-303",
        "observableId": "C9-O9",
        "capabilityId": "C9",
        "signalText": "Metric pairing discipline: 'Paired velocity metric with quality metric — when team optimized for story points, defect rate spiked. Added defect escape rate as counter-metric and coached team on the trade-off. Both metrics improved within 2 quarters.'",
        "signalType": "manager_observation",
        "sourceSubTopic": "Balanced Metrics"
    },
    {
        "id": "SIG-304",
        "observableId": "C9-O10",
        "capabilityId": "C9",
        "signalText": "Maturity-appropriate metrics: 'New team started with just 3 metrics (cycle time, deployment frequency, escaped defects). Resisted pressure to add DORA/SPACE dashboards until team had 6 months of baseline data and could interpret trends meaningfully.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Metrics Maturity"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 10 Enrichments ===")

# Playbooks
pb = load("playbooks.json")
pb.extend(NEW_PLAYBOOKS)
save("playbooks.json", pb)
print(f"  Added {len(NEW_PLAYBOOKS)} playbooks (total: {len(pb)})")

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

si.extend(new_si_entries)
save("search-index.json", si)
print(f"  Updated search index (total: {len(si)})")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session10 = {
    "session": 10,
    "date": "2026-02-20",
    "focus": "Playbooks for C2/C3/C7 + thin calibration signals for C14/C4/C9",
    "articlesReviewed": 9,
    "additions": {
        "playbooks": 3,
        "calibrationSignals": 6
    },
    "capabilitiesEnriched": ["C2", "C3", "C4", "C7", "C9", "C10", "C14"],
    "coverageImpact": {
        "C2": "PB: 5→6",
        "C3": "PB: 5→6",
        "C7": "PB: 5→6",
        "C14": "CS: 16→18",
        "C4": "CS: 17→19",
        "C9": "CS: 17→19"
    },
    "notes": "Targeted remaining thin playbook areas (C2/C3/C7 at 5) with high-value scenarios: priority overload, strategic tech debt management, and high-stakes decision-making under pressure. All three based on multiple LeadDev articles with genuine frameworks (RICE, 70/20/10, ADR). Calibration signals added for C14 (continuous performance tracking), C4 (interrupt management, bottleneck diagnosis), and C9 (metric pairing, maturity-appropriate metrics)."
}

rp["sessions"].append(session10)

for key in session10["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session10["additions"][key]

rp["grandTotal"] = sum(rp["totalAdditions"].values())

rp["dataFileTotals"]["playbooks"] = len(pb)
rp["dataFileTotals"]["calibrationSignals"] = len(cs)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

# ── Summary ────────────────────────────────────────────

print(f"\n=== Session 10 Summary ===")
print(f"Playbooks: +{len(NEW_PLAYBOOKS)} (C2:1, C3:1, C7:1)")
print(f"Calibration Signals: +{len(NEW_SIGNALS)} (C14:2, C4:2, C9:2)")
print(f"Total additions: {len(NEW_PLAYBOOKS) + len(NEW_SIGNALS)}")

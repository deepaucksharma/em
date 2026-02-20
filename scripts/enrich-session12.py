#!/usr/bin/env python3
"""
Session 12 Enrichment — Final playbook gap closure + signal depth
Based on critical reading of LeadDev articles:
  - "Driving positive change through PIPs" + "The relentless rise of the PIP" (C14 playbook)
  - "Getting good at delivering bad news" (C7 playbook)
  - "Introducing engineering metrics to your organization" + "Engineering metrics at every level" (C9 playbook)
  - Various articles for calibration signal depth

Targets:
  - Playbooks: +3 (C14: 6→7, C7: 6→7, C9: 6→7)
  - Calibration Signals: +6 (C10: 17→19, C2: 18→20, C7: 18→20)
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
        "id": "P-C14-5",
        "slug": "putting-an-engineer-on-a-pip-designed-to-succeed",
        "observableIds": ["C14-O6", "C14-O4", "C14-O7"],
        "capabilityIds": ["C14"],
        "title": "Putting an Engineer on a PIP Designed to Succeed",
        "context": "An engineer on your team has been underperforming for months despite verbal feedback and informal coaching. You've documented the pattern and HR agrees a formal Performance Improvement Plan is appropriate. You've never run a PIP before and you're unsure how to make it genuinely developmental rather than just a paper trail to termination. The engineer is anxious and the team is watching.",
        "topicsActivated": [
            "Performance (Formal Improvement Process)",
            "People (Developmental Support During PIP)",
            "Process (Documentation and Fairness)"
        ],
        "decisionFramework": "1. Before the PIP — exhaust informal paths (Pre-PIP): Ensure you've delivered clear, specific feedback using SBI (Situation-Behavior-Impact) at least 2-3 times with documented follow-up. If you haven't told someone clearly that their performance is below expectations, you haven't earned the right to put them on a PIP. The PIP should never be the first signal. 2. Define clear, measurable objectives (Day 1): The PIP document must specify exactly what 'meeting expectations' looks like — not 'improve code quality' but 'reduce escaped defects to <2 per sprint and complete code reviews within 24 hours.' Each objective needs a measurable success criterion and a timeline (typically 30-60 days). Ambiguous PIPs fail both the employee and you. 3. Show explicit support (Ongoing): Increase 1:1 frequency to weekly. Assign a peer mentor if appropriate (with their consent and without disclosing the PIP context). Remove obstacles to success — if the engineer needs training, pairing sessions, or reduced scope to focus, provide it. The goal is genuine support, not performative documentation. 4. Check in formally at midpoint: At the halfway mark, provide written feedback on progress against each objective. If the engineer is improving, say so explicitly. If not, be direct about what's still falling short and what needs to change in the remaining time. No surprises at the end. 5. Conclude with integrity: If objectives are met — celebrate genuinely. Remove the PIP, acknowledge the growth, and continue regular performance management. If objectives are not met — the outcome should not surprise the engineer. You've been transparent throughout. Proceed with the agreed consequence (role change, exit) with dignity. Either outcome, do a personal retrospective: could you have intervened earlier or more effectively?",
        "commonMistakes": "Using the PIP as a surprise weapon when feedback has been vague or absent. Writing objectives so ambiguous that success is impossible to prove or disprove. Treating the PIP as a formality to terminate rather than a genuine attempt at improvement. Isolating the engineer — reducing their scope so much they can't demonstrate capability. Not checking in regularly, then delivering a final verdict with no warning. Discussing the PIP with other team members.",
        "whatGoodLooksLike": "Engineer either successfully improves and remains a productive team member, or departs understanding why. No procedural issues raised by HR or the employee. Team observes fair process even if they don't know the details. The LeadDev articles on PIPs emphasize that they should be a last resort, not a first tool, and their effectiveness depends entirely on the manager's genuine commitment to the person's success.",
        "mappingNotes": "Based on LeadDev 'Driving positive change through performance improvement plans' and 'The relentless rise of the PIP.'",
        "suggestedMetricIds": ["5.5", "6.5"]
    },
    {
        "id": "P-C7-5",
        "slug": "your-project-is-going-to-miss-its-deadline",
        "observableIds": ["C7-O4", "C7-O3", "C7-O2"],
        "capabilityIds": ["C7", "C5"],
        "title": "Your Project Is Going to Miss Its Deadline",
        "context": "You're three weeks from a committed deadline and you've realized the team won't make it. The gap isn't small — you're looking at 2-4 weeks of additional work. Your VP has already communicated the date to customers. Product is counting on this for their quarterly goals. You're dreading the conversation but every day you delay makes it worse.",
        "topicsActivated": [
            "Communication (Bad News Delivery)",
            "Stakeholder (Trust Preservation)",
            "Execution (Recovery Planning)"
        ],
        "decisionFramework": "1. Own it before you share it (Hour 1): Before telling anyone, reflect on what led here. Could you have flagged this earlier? What signals did you miss? This isn't self-blame — it's preparation. When you walk into the room, you need to own the situation credibly. Leaders who accept responsibility earn trust even when delivering bad news. 2. Prepare the full picture (Day 1): Before the conversation, have answers to: How late will we be? What's the revised realistic date? What caused the slip? What options exist to reduce scope or parallelize? Don't walk in with just 'we're going to be late' — walk in with 'we're going to be late, here's by how much, here's why, and here are three options.' 3. Deliver early and directly (Day 1): Do not bury the lede. Open with the news: 'We're going to miss the March 15 date. Our realistic delivery is March 28. Here's what happened and what I recommend.' Resist the urge to soften with preamble. Stakeholders will respect directness more than disclosure that feels reluctant. 4. Present options, not just problems: Option A: Ship reduced scope on time. Option B: Ship full scope 2 weeks late. Option C: Add resources to compress by 1 week. Each option has trade-offs — present them clearly and make a recommendation. 5. Manage your emotions and theirs: In tense moments, pause and breathe. Name emotions if needed: 'I understand this is frustrating — this deadline matters and I take the miss seriously.' Don't get defensive. Don't blame the team. After the conversation, communicate the revised plan to your team transparently.",
        "commonMistakes": "Waiting until the deadline to disclose the miss, hoping for a miracle. Blaming the team or external factors instead of owning the situation. Presenting the problem without options or a recovery plan. Over-promising a compressed timeline to reduce tension in the moment, only to miss again. Soft-pedaling the news so stakeholders don't grasp the severity.",
        "whatGoodLooksLike": "Stakeholder is disappointed but trusts you more because you were honest and prepared. Revised timeline holds. Team feels supported, not thrown under the bus. The LeadDev article on delivering bad news captures the core insight: the greatest fear is blame, but owning your mistakes and showing accountability is what preserves trust.",
        "mappingNotes": "Based on LeadDev 'Getting good at delivering bad news' and deadline management articles.",
        "suggestedMetricIds": ["2.1", "2.4"]
    },
    {
        "id": "P-C9-5",
        "slug": "introducing-engineering-metrics-to-a-team-that-has-none",
        "observableIds": ["C9-O10", "C9-O5", "C9-O1"],
        "capabilityIds": ["C9", "C7"],
        "title": "Introducing Engineering Metrics to a Team That Has None",
        "context": "Your engineering organization has no systematic metrics. Leadership makes decisions based on gut feel and anecdotes. When asked 'how is engineering doing?' you struggle to answer beyond 'we shipped X features.' You want to introduce metrics but you're worried about creating a surveillance culture or picking the wrong things to measure.",
        "topicsActivated": [
            "Metrics (Cold Start Strategy)",
            "Culture (Measurement Without Surveillance)",
            "Communication (Data-Driven Storytelling)"
        ],
        "decisionFramework": "1. Start with one metric (Month 1): If you have to pick one metric, pick cycle time — the elapsed time from first commit to production deploy. It benefits the business (faster innovation wins customers), correlates with code quality (faster cycles produce more stable code), and correlates with developer satisfaction. One metric, well-understood, beats a dashboard nobody trusts. 2. Address engineers' problems first (Month 1-2): Introduce metrics that solve problems engineers already feel. If they complain about slow deploys, measure deployment frequency. If they complain about flaky tests, measure test reliability. When metrics address real pain, adoption is natural. When they feel like surveillance, resistance is inevitable. 3. Add process metrics gradually (Month 2-3): Layer in throughput and flow efficiency to identify bottlenecks. These are diagnostic tools, never performance measures for individuals. Be explicit: 'We measure systems, not people.' 4. Connect to business outcomes (Month 3-4): Work with product and business stakeholders to map engineering metrics to business impact. Deployment frequency → feature velocity → time to market. Cycle time → iteration speed → customer responsiveness. This is how engineering stops being seen as a cost center. 5. Evolve as you mature (Ongoing): Resist the temptation to adopt DORA, SPACE, or DX Core 4 on day one. Start simple, build baseline data for 2-3 months, then evaluate which framework fits your organization's maturity. Metrics are indicators, not ends — be prepared to retire metrics that no longer serve you.",
        "commonMistakes": "Launching a comprehensive dashboard on day one that overwhelms everyone. Measuring individual developer output (lines of code, commits, PRs) rather than system flow. Not explaining why metrics are being introduced, triggering fear. Using metrics punitively, destroying the trust needed for honest measurement. Adopting a framework (DORA, SPACE) without understanding what questions you're trying to answer.",
        "whatGoodLooksLike": "Within 3 months: team references cycle time in planning discussions, bottlenecks are identified from data rather than anecdotes. Within 6 months: leadership receives a monthly engineering health report grounded in data. Engineers advocate for the metrics because they solve real problems. The LeadDev articles on metrics converge on a key insight: if you must focus on one metric, focus on cycle time — it benefits everyone.",
        "mappingNotes": "Based on LeadDev 'Introducing engineering metrics to your organization', 'Engineering metrics at every level', and 'The flawed five engineering productivity metrics.'",
        "suggestedMetricIds": ["1.1", "2.2"]
    }
]

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C10 signals (17→19) — close to average
    {
        "id": "SIG-313",
        "observableId": "C10-O3",
        "capabilityId": "C10",
        "signalText": "Cloud cost ownership: 'Implemented per-service cost attribution dashboards and made cost a first-class metric in sprint reviews. Teams self-identified $400K in optimization opportunities within first quarter — no top-down mandates needed.'",
        "signalType": "metric",
        "sourceSubTopic": "Cloud Cost Management"
    },
    {
        "id": "SIG-314",
        "observableId": "C10-O8",
        "capabilityId": "C10",
        "signalText": "Proactive capacity reallocation: 'Identified two teams with excess capacity after feature launch stabilized. Proposed cross-team lending model — 3 engineers redeployed to high-priority initiative, delivering 6 weeks earlier than original plan without any new hires.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Dynamic Resource Allocation"
    },
    # C2 signals (18→20) — strategic prioritization depth
    {
        "id": "SIG-315",
        "observableId": "C2-O2",
        "capabilityId": "C2",
        "signalText": "Trade-off visibility: 'When VP requested urgent feature, responded within 4 hours with impact matrix: what stops, what slows, what continues. VP chose to defer their request after seeing the trade-offs — praised the transparent framing.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Saying No Through Trade-offs"
    },
    {
        "id": "SIG-316",
        "observableId": "C2-O3",
        "capabilityId": "C2",
        "signalText": "Decision-making under ambiguity: 'In fast-moving market with incomplete data, classified decisions as one-way vs. two-way doors. Made 12 two-way door decisions in one quarter with feature flags for safe rollback. Reversed 2 that didn't work — team learned fast without catastrophic risk.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Ambiguity Navigation"
    },
    # C7 signals (18→20) — targeting thinnest observables (C7-O2: 1 signal, C7-O3: 1 signal)
    {
        "id": "SIG-317",
        "observableId": "C7-O2",
        "capabilityId": "C7",
        "signalText": "Audience-adapted communication: 'Same migration proposal presented three ways: 2-page exec summary for VP (business impact and timeline), technical RFC for architects (approach and trade-offs), and team FAQ for ICs (what changes for you). All three audiences approved within one week.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Communication Altitude"
    },
    {
        "id": "SIG-318",
        "observableId": "C7-O3",
        "capabilityId": "C7",
        "signalText": "Proactive status communication: 'Established weekly status cadence with consistent format — shipped, at risk, blocked, help needed. After 8 weeks, VP said: I never have to ask how engineering is doing, I already know. Autonomy increased because trust was earned through transparency.'",
        "signalType": "manager_observation",
        "sourceSubTopic": "Status Communication"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 12 Enrichments ===")

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
for p in NEW_PLAYBOOKS:
    si.append({
        "id": p["id"],
        "type": "playbook",
        "title": p["title"],
        "content": f"{p['context']} {p['decisionFramework'][:200]}",
        "slug": f"/playbooks/{p['slug']}",
        "capability": p["capabilityIds"][0]
    })
save("search-index.json", si)
print(f"  Updated search index (total: {len(si)})")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session12 = {
    "session": 12,
    "date": "2026-02-20",
    "focus": "Final playbook pass (C14/C7/C9) + signal depth for C10/C2/C7",
    "articlesReviewed": 8,
    "additions": {
        "playbooks": 3,
        "calibrationSignals": 6
    },
    "capabilitiesEnriched": ["C2", "C5", "C7", "C9", "C10", "C14"],
    "coverageImpact": {
        "C14": "PB: 6→7",
        "C7": "PB: 6→7, CS: 18→20",
        "C9": "PB: 6→7",
        "C10": "CS: 17→19",
        "C2": "CS: 18→20"
    },
    "notes": "Three high-value practical playbooks: PIP management (based on LeadDev PIP articles — genuine developmental approach), deadline miss communication (based on 'Getting good at delivering bad news'), and metrics cold start (based on 'Introducing engineering metrics' and 'Metrics at every level'). Signals targeted the two thinnest C7 observables (C7-O2 and C7-O3 both had only 1 signal each) and brought C10 closer to average."
}

rp["sessions"].append(session12)

for key in session12["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session12["additions"][key]

rp["grandTotal"] = sum(rp["totalAdditions"].values())

rp["dataFileTotals"]["playbooks"] = len(pb)
rp["dataFileTotals"]["calibrationSignals"] = len(cs)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

# ── Summary ────────────────────────────────────────────

print(f"\n=== Session 12 Summary ===")
print(f"Playbooks: +{len(NEW_PLAYBOOKS)} (C14:1, C7:1, C9:1)")
print(f"Calibration Signals: +{len(NEW_SIGNALS)} (C10:2, C2:2, C7:2)")
print(f"Total additions: {len(NEW_PLAYBOOKS) + len(NEW_SIGNALS)}")

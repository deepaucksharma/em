#!/usr/bin/env python3
"""
Session 18 — Systematic C12 article review (ranks 2-56, 51 articles)
Reviewed all 51 Tier 1 C12 articles from priority queue.
41 covered by existing content, 10 with actionable findings.

Additions:
  - Playbook: +1 (C12: Driving Culture Change Against Organizational Resistance)
  - Learning Pathways: +3 article references (C12 practical tier)
  - Calibration Signals: +6 (C12: targeting thin observables with novel concepts)
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

# ── Playbook ───────────────────────────────────────────

NEW_PLAYBOOKS = [
    {
        "id": "P-C12-7",
        "slug": "driving-culture-change-against-organizational-resistance",
        "observableIds": ["C12-O1", "C12-O2", "C12-O8"],
        "capabilityIds": ["C12"],
        "title": "Driving Culture Change Against Organizational Resistance",
        "context": "You've been hired or promoted to improve engineering culture, but the broader organization actively resists change. Legacy norms, hostile leadership, or institutional inertia work against your efforts. Your skip-level doesn't see culture as a priority, peers are indifferent or defensive, and your team is cynical from failed past initiatives. You believe the culture needs to change, but you lack the organizational power to mandate it.",
        "topicsActivated": [
            "Culture (Grassroots Change Strategy)",
            "Stakeholder (Coalition Building)",
            "People (Team as Microculture)"
        ],
        "decisionFramework": "1. Assess the landscape honestly (Week 1-2): Before trying to change anything, understand the system you're in. Map the power dynamics: who benefits from the current culture, who suffers, who has influence. Identify the 2-3 most damaging cultural norms and the 2-3 people who might be natural allies. Be honest about your scope of influence — you can likely change your team's microculture, you may be able to influence your org, and you probably cannot change the company alone. 2. Build your team as a proof-of-concept (Month 1-2): Create the culture you want within your team first. Establish explicit norms (team charter), model the behavior you want to see, and protect your team from the worst of the broader culture. When your team starts outperforming, you have evidence, not just arguments. This is 'seeding' — growing something healthy in a controlled environment. 3. Build coalitions, not crusades (Month 2-4): Find 2-3 peer managers who share your concerns. Start informal alliances — shared rituals, cross-team norms, joint retros. Coalition-building is slower than top-down mandates but more durable. A single manager asking for change is a complaint; five managers asking together is a movement. 4. Choose your battles deliberately (Ongoing): You cannot fix everything. Pick the 1-2 cultural changes that would have the most impact and are most achievable given your influence. Focus your energy there. Let smaller issues go — fighting every battle guarantees you win none. The battles worth fighting are the ones that affect psychological safety and retention. 5. Know your limits and your exit criteria (Ongoing): Not every culture can be saved from inside. Set a personal timeline: if after 6-12 months of genuine effort, the organizational culture hasn't improved or has gotten worse, consider whether staying serves your team or just enables the dysfunction. The hardest leadership decision is sometimes 'I cannot fix this from here.' That's not failure — it's clarity.",
        "commonMistakes": "Going it alone without building coalitions — the 'lone crusader' burns out. Trying to change everything at once instead of focusing on 1-2 high-impact norms. Expecting organizational culture to change on your timeline rather than building incrementally. Confusing protecting your team with isolating them — your team needs to function within the broader org, not as an island. Staying too long in a genuinely toxic environment out of misplaced loyalty or sunk cost.",
        "whatGoodLooksLike": "Your team has a visibly healthier culture than the surrounding org. Peer managers start asking how you did it and adopting similar practices. At least one cultural norm you championed spreads beyond your team. You have honest clarity about what you can and cannot change. If you leave, the cultural improvements you built persist because they're embedded in team practices, not dependent on your presence. Jason Wong's LeadDev talk on culture change in hostile environments captures the key insight: know the limits of what you can change, and invest your energy where it can actually make a difference.",
        "mappingNotes": "Based on LeadDev 'Culture change in a hostile environment' (Jason Wong, ActBlue). Fills a genuine gap — existing C12 playbooks assume cooperative organizational context.",
        "suggestedMetricIds": ["6.1", "6.2"]
    }
]

# ── Learning Pathway Articles ──────────────────────────

LP_ADDITIONS = {
    "C12": [
        {
            "title": "How to Hire Force Multipliers, Not 10x Engineers (LeadDev)",
            "type": "article",
            "description": "Why teams should screen for force-multiplier traits (cumulative culture, intellectual humility, ecological awe) rather than raw individual output — hiring for team elevation, not solo performance.",
            "url": "https://leaddev.com/hiring/how-hire-force-multipliers-10x-engineers"
        },
        {
            "title": "Safety and Belonging: A Ritual to Jumpstart Psychological Safety (LeadDev)",
            "type": "article",
            "description": "Concrete facilitated ritual from Riot Games for rebuilding trust from near-zero — a structured circle exercise focused on personal sharing that builds the interpersonal foundation for professional candor.",
            "url": "https://leaddev.com/culture/safety-and-belonging-a-ritual-to-jumpstart-psychological-safety"
        },
        {
            "title": "Shaping Inclusive Cultures for Remote Engineering Teams (LeadDev)",
            "type": "article",
            "description": "Framework decomposing culture into norms, rituals, and spaces — and how to explicitly redesign each for remote/distributed contexts where equity requires intentional adaptation.",
            "url": "https://leaddev.com/culture/shaping-inclusive-cultures-remote-engineering-teams"
        }
    ]
}

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # Neurodiversity-specific inclusion (C12-O5, currently 3 signals)
    {
        "id": "SIG-296",
        "observableId": "C12-O5",
        "capabilityId": "C12",
        "signalText": "Manager proactively accommodates neurodivergent team members — provides agendas before meetings, offers written alternatives to verbal-only discussions, and adapts growth frameworks to recognize strengths-based contributions rather than requiring conformity to neurotypical communication patterns",
        "signalType": "calibration_language",
        "sourceSubTopic": "Neurodiversity & Inclusive Practices"
    },
    # Application identity as culture mechanism (C12-O4, currently 2 signals)
    {
        "id": "SIG-297",
        "observableId": "C12-O4",
        "capabilityId": "C12",
        "signalText": "Team has built identity and pride around their systems through naming, branding, or ownership rituals — engineers feel ownership of 'their' service and take pride in its health, using identity as a motivation lever especially for internal tools and legacy systems",
        "signalType": "calibration_language",
        "sourceSubTopic": "Team Identity & Application Ownership"
    },
    # Agile facilitation for inclusion (C12-O7, currently 2 signals)
    {
        "id": "SIG-298",
        "observableId": "C12-O7",
        "capabilityId": "C12",
        "signalText": "Manager uses structured facilitation techniques in meetings — silent brainstorming before discussion, round-robin input, joint working agreements for 1:1s — ensuring quieter voices contribute equally rather than defaulting to whoever speaks first or loudest",
        "signalType": "calibration_language",
        "sourceSubTopic": "Inclusive Meeting Facilitation"
    },
    # Internal mobility as culture health (C12-O6, currently 2 signals)
    {
        "id": "SIG-299",
        "observableId": "C12-O6",
        "capabilityId": "C12",
        "signalText": "Manager treats internal transfers out as a positive cultural signal — actively supports team members exploring other roles, maintains alumni relationships, and frames mobility as evidence that the team develops people others want rather than hoarding talent",
        "signalType": "calibration_language",
        "sourceSubTopic": "Internal Mobility & Cultural Health"
    },
    # Hackathons as belonging mechanism (C12-O4, currently 2 signals)
    {
        "id": "SIG-300",
        "observableId": "C12-O4",
        "capabilityId": "C12",
        "signalText": "Team runs regular hackathons or innovation days that serve dual purpose: generating creative solutions AND building cross-functional belonging — participants report increased connection to peers and ability to 'imagine new identities' within the engineering org",
        "signalType": "calibration_language",
        "sourceSubTopic": "Hackathons & Innovation Rituals"
    },
    # Conversation smells — micro-toxicity detection (C12-O8, currently 3 signals)
    {
        "id": "SIG-301",
        "observableId": "C12-O8",
        "capabilityId": "C12",
        "signalText": "Manager recognizes and addresses 'conversation smells' — subtle communication anti-patterns like chronic sarcasm, passive-aggressive Slack messages, or dismissive responses in code review — intervening at the micro-toxicity stage before patterns harden into overt toxic behavior",
        "signalType": "calibration_language",
        "sourceSubTopic": "Micro-Toxicity Detection & Early Intervention"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 18 Enrichments ===")

# Playbooks
pb = load("playbooks.json")
pb.extend(NEW_PLAYBOOKS)
save("playbooks.json", pb)
print(f"  Added {len(NEW_PLAYBOOKS)} playbook (total: {len(pb)})")

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

# Search Index
si = load("search-index.json")
for p in NEW_PLAYBOOKS:
    si.append({
        "id": p["id"],
        "type": "playbook",
        "title": p["title"],
        "content": "{} {}".format(p['context'], p['decisionFramework'][:200]),
        "slug": "/playbooks/{}".format(p['slug']),
        "capability": p["capabilityIds"][0]
    })
save("search-index.json", si)
print(f"  Updated search index (total: {len(si)})")

# ── Mark articles as reviewed in priority queue ────────

pq = json.load(open(os.path.join(REF, "articles-priority-queue.json")))

# All C12 Tier 1 articles ranks 2-56 (51 articles)
c12_reviewed_ranks = set(range(2, 57))
# Also include rank 1 which was already marked
c12_reviewed_ranks.add(1)

reviewed_count = 0
for article in pq:
    if article.get('primaryCapability') == 'C12' and article.get('tier') == 1 and article.get('rank', 0) <= 56:
        if not article.get('reviewed'):
            article['reviewed'] = True
            article['reviewedInSession'] = "18"
            reviewed_count += 1

with open(os.path.join(REF, "articles-priority-queue.json"), "w") as f:
    json.dump(pq, f, indent=2)
print(f"  Marked {reviewed_count} C12 articles as reviewed in priority queue")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session18 = {
    "session": 18,
    "date": "2026-02-20",
    "focus": "Systematic C12 article review (51 Tier 1 articles, ranks 2-56)",
    "articlesReviewed": 51,
    "additions": {
        "playbooks": 1,
        "learningPathways": 3,
        "calibrationSignals": 6
    },
    "capabilitiesEnriched": ["C12"],
    "coverageImpact": {
        "C12": "PB: 7->8, LP: 6P->9P, CS: 22->28 (6 novel signals from article insights)"
    },
    "notes": "Systematic review of all 51 Tier 1 C12 articles. 41 covered by existing content, 10 with actionable findings. New playbook for driving culture change against organizational resistance (based on Jason Wong's hostile environment talk). Learning pathways enriched with force multiplier hiring, psychological safety ritual, and remote culture framework. Calibration signals capture novel concepts: neurodiversity accommodation, application identity as culture, inclusive facilitation techniques, internal mobility as health signal, hackathons for belonging, and conversation smell detection."
}

rp["sessions"].append(session18)
for key in session18["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session18["additions"][key]
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["playbooks"] = len(pb)
rp["dataFileTotals"]["calibrationSignals"] = len(cs)
rp["dataFileTotals"]["searchIndex"] = len(si)

# Update remaining Tier 1 count
remaining_t1 = sum(1 for a in pq if a.get('tier') == 1 and not a.get('reviewed'))
rp["remainingTier1"] = remaining_t1

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")
print(f"  Remaining Tier 1: {remaining_t1}")

print(f"\n=== Session 18 Summary ===")
print(f"C12 articles reviewed: 51 (41 covered, 10 actionable)")
print(f"Playbooks: +1 (Culture Change Against Resistance)")
print(f"Learning Pathways: +3 article refs")
print(f"Calibration Signals: +6 (novel concepts from articles)")

#!/usr/bin/env python3
"""
Session 13 Enrichment — Final playbook floor equalization + learning pathway depth
Based on critical reading of LeadDev articles:
  - "Leading your engineering team through an unexpected product pivot" + sunk cost principles (C2 playbook)
  - "The great engineer hiring paradox" + "Rethinking your engineer hiring strategy" (C11 playbook)
  - "Shifting left on security" + "Born-left security" (C13 playbook)
  - Various LeadDev articles for learning pathway references

Targets:
  - Playbooks: +3 (C2: 6→7, C11: 6→7, C13: 6→7)
  - Learning Pathways: +6 article references (C1, C5, C6 practical tier)
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
        "id": "P-C2-4",
        "slug": "killing-a-project-that-should-have-died-months-ago",
        "observableIds": ["C2-O3", "C2-O4", "C2-O2"],
        "capabilityIds": ["C2", "C7"],
        "title": "Killing a Project That Should Have Died Months Ago",
        "context": "A major initiative has been running for 6+ months with growing scope, shifting requirements, and declining team morale. Nobody believes it will deliver the original value, but there's significant sunk cost — engineering hours, leadership credibility, customer promises. You suspect the right move is to kill it, but everyone is afraid to be the one to say it.",
        "topicsActivated": [
            "Strategy (Sunk Cost Decision Making)",
            "Communication (Delivering Project Cancellation)",
            "People (Team Morale After Cancellation)"
        ],
        "decisionFramework": "1. Separate sunk cost from future value (Day 1): The money and time already spent are gone regardless. The only question is: 'Starting from today, is the remaining investment justified by the expected outcome?' If the answer is no, the project should stop. This is harder than it sounds because teams conflate 'we've invested so much' with 'therefore we should continue.' Name the sunk cost fallacy explicitly. 2. Build the kill case with data (Week 1): Document the project's trajectory — original timeline vs. current, original scope vs. current, team velocity trend, customer feedback signal. Compare the remaining investment to alternative uses of the same capacity. What else could this team ship in the same timeframe? Present this as an investment decision, not a failure acknowledgment. 3. Get alignment before announcing (Week 1-2): Have private conversations with product, your VP, and key stakeholders before any public announcement. The conversation is: 'Given what we know now, continuing costs X and delivers Y. Stopping frees capacity for Z. I recommend stopping.' Give them space to process. Nobody likes killing something they championed. 4. Communicate with dignity (Day of announcement): To the team: acknowledge their effort explicitly. 'The work you did was good. The decision to stop reflects changed circumstances, not your execution.' Name what was learned and how it applies going forward. Nothing is more demoralizing than having months of work dismissed as wasted. 5. Redirect immediately (Week 2+): Don't leave the team in limbo. Have the next mission ready — ideally something with visible, near-term impact to rebuild momentum. Run a brief retrospective: what signals should have triggered the stop decision earlier? Use the answer to build kill criteria into future projects.",
        "commonMistakes": "Continuing because of sunk cost rather than future value. Framing cancellation as failure rather than strategic reallocation. Announcing the kill without preparing stakeholders privately. Not acknowledging the team's effort, leaving them feeling their work was meaningless. Failing to redirect the team to meaningful work immediately after.",
        "whatGoodLooksLike": "Project stops within 2 weeks of the decision. Team is redirected to high-impact work and morale recovers within a month. The freed capacity delivers visible value in the next quarter. Leadership credits you for making a hard call, not for wasting resources. Future projects include explicit checkpoints for go/no-go reassessment. The LeadDev article on product pivots captures a key insight: take time to celebrate what the team did learn, even when the project didn't succeed.",
        "mappingNotes": "Based on sunk cost decision frameworks and LeadDev 'Leading your engineering team through an unexpected product pivot.'",
        "suggestedMetricIds": ["1.2", "2.1"]
    },
    {
        "id": "P-C11-6",
        "slug": "your-top-candidate-just-declined-winning-in-competitive-market",
        "observableIds": ["C11-O6", "C11-O10", "C11-O5"],
        "capabilityIds": ["C11"],
        "title": "Your Top Candidate Just Declined — Winning in a Competitive Talent Market",
        "context": "You've lost three of your last five top candidates to competing offers. Your interview process is solid, candidates reach the offer stage enthusiastic, but they take another offer at the last moment. Your employer brand isn't strong enough, your compensation is competitive but not leading, and your closing process is too slow. Leadership is frustrated by open reqs that stay unfilled for months.",
        "topicsActivated": [
            "Hiring (Competitive Offer Strategy)",
            "Employer Brand (Value Proposition)",
            "Process (Closing Velocity)"
        ],
        "decisionFramework": "1. Diagnose why candidates decline (Week 1): Reach out to recent decliners with a brief, non-defensive follow-up: 'We're working to improve our process — would you share what led to your decision?' Common reasons: compensation gap, slower process than competitors, stronger team/mission fit elsewhere, or remote work flexibility. Don't guess — ask. 2. Compress your timeline (Week 2): If your process takes 3+ weeks end-to-end, you're losing to companies that close in 10 days. Map your pipeline and identify bottlenecks: scheduling delays, too many interview rounds, slow hiring committee approvals. Set a target: 10 business days from first screen to offer. Speed is a competitive advantage. 3. Differentiate your value proposition (Ongoing): If you can't win on total compensation, win on something else. What can you offer that FAANG can't? Impact per person (smaller team, more ownership), learning opportunity (harder problems, more autonomy), mission alignment, work-life balance, or career progression speed. Articulate this clearly in every interaction — candidates who choose you for the right reasons retain better. 4. Improve the closing experience (Per candidate): Assign a 'closing partner' (hiring manager or team member) for final-stage candidates. This person maintains warm contact between offer and acceptance: answers questions, arranges team meet-and-greets, shares exciting team updates. The close isn't the offer letter — it's the entire period until day one. 5. Build pipeline depth (Ongoing): The best way to handle candidate declines is to never depend on a single candidate. Maintain a sourcing pipeline through referrals, technical content, open source contributions, and conference presence. When one candidate declines, you should have another strong option within a week, not start sourcing from scratch.",
        "commonMistakes": "Matching counter-offers reactively instead of building a differentiated value proposition. Blaming candidates for making the wrong choice instead of fixing your process. Extending the interview process to 'be more thorough' when speed is the problem. Competing only on compensation when impact, growth, and culture matter more to many engineers. Not asking declined candidates why they declined.",
        "whatGoodLooksLike": "Offer acceptance rate above 80%. Time-to-offer under 2 weeks. Candidate experience feedback consistently positive even from those who decline. Pipeline depth ensures no single decline stalls hiring by more than a week. The LeadDev articles on hiring paradox and trends emphasize that the bar for talent is rising — the winners are teams that move fast, articulate their unique value, and treat hiring as a product, not a process.",
        "mappingNotes": "Based on LeadDev 'The great engineer hiring paradox', 'Rethinking your engineer hiring strategy 2024', and '6 engineering hiring trends 2025.'",
        "suggestedMetricIds": ["5.1", "5.2"]
    },
    {
        "id": "P-C13-6",
        "slug": "your-vp-wants-engineering-to-own-security-but-nobody-has-expertise",
        "observableIds": ["C13-O5", "C13-O1", "C13-O7"],
        "capabilityIds": ["C13", "C6"],
        "title": "Your VP Wants Engineering to 'Own Security' But Nobody Has Expertise",
        "context": "Your VP has decided that security should shift left into engineering. There's no dedicated security team, no AppSec engineer, and nobody on your team has deep security expertise. You're expected to embed security into the development lifecycle, but your engineers see security as 'not my job' and you don't know where to start. Meanwhile, compliance requirements are growing.",
        "topicsActivated": [
            "Security (Building Capability From Scratch)",
            "People (Security Champion Program)",
            "Process (Automated Security Integration)"
        ],
        "decisionFramework": "1. Start with automation, not training (Month 1): Don't begin by telling engineers to 'think about security more.' Begin by adding automated security scanning to your CI/CD pipeline — dependency scanning, SAST, secret detection. These tools catch the easy wins (known vulnerabilities, hardcoded secrets, common patterns) without requiring engineers to become security experts. The automation creates a baseline without adding cognitive load. 2. Designate security champions (Month 1-2): Identify 1-2 engineers per team who are curious about security. This isn't a full-time role — it's 10-15% of their time. Their job: review security scanner output, triage findings, learn enough to advise the team, and be the bridge to external security resources. Invest in their development — security training, conference attendance, cross-training with any security staff you do have. 3. Build threat modeling into design (Month 2-3): For any feature touching sensitive data, authentication, or external integrations, add a lightweight threat modeling step to the design phase. It doesn't have to be formal STRIDE analysis — start with three questions: 'What could go wrong? What's the worst case? How do we detect it?' This embeds security thinking without requiring deep expertise. 4. Establish severity-based response SLAs (Month 3): Define how quickly different severity vulnerabilities must be addressed: critical in 48 hours, high in 7 days, medium in 30 days. This gives the team clear expectations without asking them to prioritize security against every other demand subjectively. 5. Build the case for dedicated investment (Month 4+): After 3 months of data from automated scanning, you'll have visibility into your security posture that you didn't have before. Use this data to make the case for what you need next — whether that's a dedicated AppSec hire, a security contractor for audit prep, or a deeper investment in training.",
        "commonMistakes": "Starting with mandatory security training before engineers understand why it matters. Expecting engineers to become security experts overnight. Buying expensive security tools without the operational maturity to use them. Making security a gate that blocks deploys without clear ownership of remediation. Skipping automation and relying entirely on manual code review for security.",
        "whatGoodLooksLike": "Within 3 months: automated scanning catches vulnerabilities before production, security champions are triaging findings, and threat modeling happens for high-risk features. Within 6 months: vulnerability backlog is trending down, compliance evidence is generated automatically, and the team has data to justify next security investment. The LeadDev articles on born-left security emphasize that the goal is making security accessible to developers, not turning developers into security professionals.",
        "mappingNotes": "Based on LeadDev 'Shifting left on security: Five steps to transformation' and 'Born-left security: The new approach taking over shift-left.'",
        "suggestedMetricIds": ["3.4", "3.5"]
    }
]

# ── Learning Pathway References ────────────────────────

LP_ADDITIONS = {
    "C1": [
        {
            "title": "Four Rituals That Revolutionized My Engineering Teams (LeadDev)",
            "type": "article",
            "description": "How intentional rituals like metrics reviews and ideation sessions drive org-level alignment and team ownership.",
            "url": "https://leaddev.com/culture/4-rituals-that-revolutionized-my-engineering-teams"
        },
        {
            "title": "Five Management Anti-Patterns and Why They Happen (LeadDev)",
            "type": "article",
            "description": "Recognizing destructive leadership patterns — the Sphinx, Bottleneck, Funnel, and Wrecking Ball — and their organizational impact.",
            "url": "https://leaddev.com/communication/five-management-anti-patterns-and-why-they-happen"
        }
    ],
    "C5": [
        {
            "title": "Drive Product Gaps as an Engineering Leader (LeadDev)",
            "type": "article",
            "description": "Practical strategies for engineering leaders to influence product development and fill product management gaps.",
            "url": "https://leaddev.com/software-quality/drive-product-gaps-as-an-engineering-leader"
        },
        {
            "title": "Getting Good at Delivering Bad News (LeadDev)",
            "type": "article",
            "description": "Framework for owning mistakes, managing emotional reactions, and preserving trust when communicating difficult information.",
            "url": "https://leaddev.com/team/getting-good-delivering-bad-news"
        }
    ],
    "C6": [
        {
            "title": "Three Tips for Retaining Key Engineering Talent (LeadDev)",
            "type": "article",
            "description": "Individual growth plans (80/20 ratio), frequent 1:1s, and impact-focused development for retention.",
            "url": "https://leaddev.com/hiring/three-tips-retaining-key-engineering-talent"
        },
        {
            "title": "Cultivating Ownership at Any Engineering Level (LeadDev)",
            "type": "article",
            "description": "How to delegate effectively by setting guardrails and asking questions that spark critical thinking rather than dictating solutions.",
            "url": "https://leaddev.com/management/cultivating-ownership-at-any-engineering-level"
        }
    ]
}

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 13 Enrichments ===")

# Playbooks
pb = load("playbooks.json")
pb.extend(NEW_PLAYBOOKS)
save("playbooks.json", pb)
print(f"  Added {len(NEW_PLAYBOOKS)} playbooks (total: {len(pb)})")

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

# Search Index
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

session13 = {
    "session": 13,
    "date": "2026-02-20",
    "focus": "Final playbook floor equalization (C2/C11/C13→7) + learning pathway depth (C1/C5/C6)",
    "articlesReviewed": 8,
    "additions": {
        "playbooks": 3,
        "learningPathways": 6
    },
    "capabilitiesEnriched": ["C1", "C2", "C5", "C6", "C7", "C11", "C13"],
    "coverageImpact": {
        "C2": "PB: 6→7",
        "C11": "PB: 6→7",
        "C13": "PB: 6→7",
        "C1": "LP: 4P→6P",
        "C5": "LP: 4P→6P",
        "C6": "LP: 4P→6P"
    },
    "notes": "All 14 capabilities now have 7+ playbooks. Three high-value scenarios: killing a project with sunk cost (based on pivot/sunk cost articles), winning candidates in competitive market (based on hiring paradox articles), and building security capability from scratch (based on shift-left/born-left security articles). Learning pathways enriched with 6 curated LeadDev article references for the thinnest capabilities."
}

rp["sessions"].append(session13)

for key in session13["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session13["additions"][key]

rp["grandTotal"] = sum(rp["totalAdditions"].values())

rp["dataFileTotals"]["playbooks"] = len(pb)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

# ── Summary ────────────────────────────────────────────

print(f"\n=== Session 13 Summary ===")
print(f"Playbooks: +{len(NEW_PLAYBOOKS)} (C2:1, C11:1, C13:1)")
print(f"Learning Pathway refs: +{lp_articles_added} (C1:2, C5:2, C6:2)")
print(f"Total additions: {len(NEW_PLAYBOOKS) + lp_articles_added}")

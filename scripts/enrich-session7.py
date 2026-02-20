#!/usr/bin/env python3
"""
Enrich EM framework data files - Session 7.
Based on critical review of 11 additional LeadDev articles.

Articles reviewed:
- "Building a more effective DevSecOps culture" (Chaplin) — C13
- "Creating a technical interview process that works at scale" (GitLab) — C11
- "Three ways to remove bias from technical interviews" — C11
- "A manager's guide to performance calibration" — C14
- "A prioritization framework for uncertain times" — C2
- "Steel threads are the missing link in your system design" — C3
- "How to speed up code reviews" — C4
- "From on-call firefighting to future-proofing" (X/Twitter) — C8
- "How to run a great incident post-mortem" — C8
- "The trifecta model" (Shopify) — C5
- "The Beast Mode" — C4

Selective enrichment: playbooks for C13(was 3), C11(4), C14(4);
anti-patterns for C2(was 2); learning pathways updates.
"""

import json
import re
import os

def slugify(text):
    s = text.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_]+', '-', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')

def load(path):
    with open(path) as f:
        return json.load(f)

def save(path, data):
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"  Saved {path}")

playbooks = load('src/data/playbooks.json')
anti_patterns = load('src/data/anti-patterns.json')
calibration_signals = load('src/data/calibration-signals.json')
learning_pathways = load('src/data/learning-pathways.json')
search_index = load('src/data/search-index.json')

# ── NEW PLAYBOOKS ───────────────────────────────────────────────────
# C13(3→5), C11(4→5), C14(4→5), C4(adding 1 for Beast Mode)

new_playbooks = [
    # C13: Security & Compliance (was 3, adding 2 → 5)
    # Source: "Building a more effective DevSecOps culture", "From on-call firefighting to future-proofing"
    {
        "id": "P-C13-3",
        "slug": "your-team-keeps-failing-security-audits-with-the-same-findings",
        "observableIds": ["C13-O3", "C13-O6"],
        "capabilityIds": ["C13"],
        "title": "Your Team Keeps Failing Security Audits With the Same Findings",
        "context": "For the third year in a row, your external audit surfaces the same categories of findings: stale access permissions, unpatched dependencies, and missing encryption at rest. Your team scrambles before each audit but nothing sticks. Leadership is frustrated.",
        "topicsActivated": [
            "Security (Continuous Compliance vs. Audit Cramming)",
            "Process (Automated Evidence Collection)",
            "Culture (Security Ownership)"
        ],
        "decisionFramework": "1. Diagnose the pattern (Week 1): Map every repeat finding to a root cause. Stale permissions → no automated access review. Unpatched deps → no dependency scanning in CI. Missing encryption → no infrastructure-as-code enforcement. The findings are symptoms; the root causes are missing automation. 2. Automate evidence (Week 2-4): For each repeat finding, implement continuous automated checks: scheduled access reviews with auto-expiration, dependency scanning in CI/CD with severity gates, IaC policies that enforce encryption. The goal: compliance evidence generated continuously, not reconstructed annually. 3. Make it visible (Month 2): Create a compliance dashboard showing real-time posture — not a spreadsheet updated once a year. When something drifts, the team sees it within hours, not months. 4. Shift ownership (Month 2-3): Rotate a security champion role. Make compliance part of the definition of done, not a separate review step. 5. Prepare for next audit with confidence (Ongoing): If evidence is generated continuously, audit prep becomes a reporting exercise, not a fire drill.",
        "commonMistakes": "Treating audit prep as a periodic sprint instead of fixing root causes. Blaming the auditors for 'not understanding our context.' Adding headcount to manually check things that should be automated. Confusing compliance (checking boxes) with security (actually being secure). Building a compliance team instead of embedding compliance into engineering.",
        "whatGoodLooksLike": "Within 90 days: automated scanning for all previous repeat findings, compliance dashboard live, access reviews automated. Next audit: zero repeat findings, audit prep takes days not weeks. The LeadDev article on DevSecOps culture asks the right diagnostic question: when a vulnerability is found, is the response pathological (fingers pointed), bureaucratic (heads roll), or generative (seen as opportunity to improve)? Your answer reveals whether you'll keep repeating audit findings.",
        "mappingNotes": "Recurring security audit failure scenario",
        "suggestedMetricIds": ["3.3", "3.5"]
    },
    {
        "id": "P-C13-4",
        "slug": "balancing-security-risk-with-shipping-speed-after-a-close-call",
        "observableIds": ["C13-O1", "C13-O7"],
        "capabilityIds": ["C13", "C8"],
        "title": "Balancing Security Risk With Shipping Speed After a Close Call",
        "context": "A near-miss security incident revealed that a feature shipped without a threat model — a known SQL injection vulnerability was caught in production monitoring before it was exploited. Leadership wants to know how this happened and what you're doing to prevent it.",
        "topicsActivated": [
            "Security (Shift-Left Practices)",
            "Risk Management (Near-Miss Response)",
            "Process (Security Gates Without Bottlenecks)"
        ],
        "decisionFramework": "1. Treat the near-miss like an incident (Week 1): Run a blameless post-mortem on the near-miss. How did a feature touching user input ship without a security review? Map the failure in the process — not who to blame, but what structural gap allowed it. 2. Define security-sensitive triggers (Week 2): Not every feature needs a threat model. Define clear triggers: features touching authentication, user input, payments, PII, or external APIs require one. Everything else doesn't. This prevents security from becoming a bottleneck for routine work. 3. Implement proportional gates (Week 3-4): Add automated SAST scanning for all PRs (catches the SQL injection pattern). Add manual threat model requirement only for triggered features. Severity-based deployment gates: critical/high block, medium creates tracked ticket. 4. Measure the balance (Month 2+): Track both metrics: deployment lead time (didn't get slower) and vulnerability escape rate (trending toward zero). If security gates slow deployment by more than 10%, the gates are too heavy — tune them.",
        "commonMistakes": "Overreacting by requiring security review for everything (creates bottleneck, team routes around it). Underreacting because 'it didn't actually get exploited.' Adding a manual gate without automated scanning first (the opposite order of what works). Making security someone else's problem instead of the team's responsibility.",
        "whatGoodLooksLike": "Near-miss treated as learning opportunity, not blame event. Clear security triggers defined within 2 weeks. Automated scanning catching the class of vulnerability that escaped. Deployment velocity maintained while security posture improves. The team views security as 'how we work' rather than 'what slows us down.'",
        "mappingNotes": "Security near-miss response and proportional security gates scenario",
        "suggestedMetricIds": ["3.3", "3.5"]
    },

    # C11: Hiring & Onboarding (was 4, adding 1 → 5)
    # Source: "Creating a technical interview process that works at scale" (GitLab)
    {
        "id": "P-C11-4",
        "slug": "scaling-your-interview-process-from-5-to-50-hires-per-year",
        "observableIds": ["C11-O1", "C11-O9", "C11-O11"],
        "capabilityIds": ["C11"],
        "title": "Scaling Your Interview Process From 5 to 50 Hires Per Year",
        "context": "Your team went from hiring 1-2 engineers per quarter to needing 10+ per quarter. Your ad-hoc interview process worked fine at low volume but now you're seeing: inconsistent evaluations between interviewers, candidates getting wildly different interview experiences, no data on what predicts success, and your best engineers spending 30% of their time interviewing.",
        "topicsActivated": [
            "Hiring (Process Standardization)",
            "Metrics (Hiring Funnel Analytics)",
            "Culture (Interview Quality at Scale)"
        ],
        "decisionFramework": "1. Standardize the rubric (Week 1-2): Define the 4-6 competencies you're evaluating. Create a shared rubric with behavioral anchors for each scoring level. Every interviewer uses the same rubric, every candidate gets the same evaluation framework. 2. Separate scoring from discussion (Week 2): Require interviewers to submit scores independently before the debrief meeting. This prevents anchoring bias where the loudest interviewer's opinion dominates. 3. Build a data feedback loop (Month 1): Track per-interviewer pass rates, per-stage conversion rates, and score distributions. If one interviewer rejects 80% of candidates while peers reject 30%, that's a calibration problem, not a candidate quality problem. 4. Train interviewers (Month 1-2): Run calibration sessions using past candidate recordings or mock interviews. Align on what a 3/5 vs. 4/5 looks like on your rubric. 5. Optimize the funnel (Month 2-3): Use progressive questions that build on each other (simulating real work) rather than disconnected algorithmic puzzles. Track which interview stages are most predictive of on-the-job success and iterate. 6. Protect engineer time (Ongoing): Cap interview load per engineer. Rotate interviewers. Consider dedicated interview blocks to protect focus time on non-interview days.",
        "commonMistakes": "Letting each interviewer design their own questions and evaluation criteria. Debriefing before individual scores are submitted (anchoring). Not tracking per-interviewer calibration (one miscalibrated interviewer tanks your pipeline). Using LeetCode-style puzzles that test interview prep, not job skills. Burning out your best engineers with interview load.",
        "whatGoodLooksLike": "Rubric adopted within 2 weeks, independent scoring within 3 weeks. Interview experience consistent across candidates. Per-interviewer pass rates converge within 15% after calibration. Funnel data informing process improvements monthly. Time-to-hire decreasing while quality-of-hire stable or improving. GitLab's experience: standardized rubrics with Google Sheets automation to track scoring allowed them to test hypotheses (e.g., 'Do candidates need Vue experience specifically, or does any modern framework predict success?') and verify assumptions with data rather than opinions.",
        "mappingNotes": "Interview process scaling and standardization scenario",
        "suggestedMetricIds": ["7.3"]
    },

    # C14: Performance Management (was 4, adding 1 → 5)
    # Source: "A manager's guide to performance calibration", "Performance review mistakes"
    {
        "id": "P-C14-4",
        "slug": "running-your-first-cross-team-performance-calibration",
        "observableIds": ["C14-O1", "C14-O7"],
        "capabilityIds": ["C14"],
        "title": "Running Your First Cross-Team Performance Calibration",
        "context": "You've been asked to lead calibration across 4 engineering teams (~30 engineers). Each manager has their own standards — some are generous, some are strict. There's no shared vocabulary for what 'exceeds expectations' means. You need consistent, fair outcomes.",
        "topicsActivated": [
            "Performance (Cross-Team Consistency)",
            "Leadership (Calibration Facilitation)",
            "Culture (Fairness and Bias Reduction)"
        ],
        "decisionFramework": "1. Pre-calibration prep (2 weeks before): Have each manager prepare evidence portfolios for their reports — specific examples, not vibes. Share the rating rubric with behavioral anchors for each level. Ask managers to pre-rate their reports independently. 2. Run pre-calibration 1:1s (1 week before): Meet each manager individually. Review their ratings. Challenge vague justifications ('she's a strong performer' → 'show me the specific impact'). Flag potential biases: recency bias (are examples only from last 6 weeks?), similarity bias (do all high performers look like the manager?), gender bias (are women rated on past performance while men are rated on potential?). 3. Calibration meeting (2-3 hours): Review by level, not by team — compare all Senior engineers across teams, then all Mids, etc. Focus discussion on borderline cases, not clear performers. Require specific evidence for every rating. Track the distribution across teams — if one manager rates everyone 'exceeds', that's a calibration problem. 4. Post-calibration (Same week): Each manager delivers feedback to their reports within 5 business days. Share one-sentence distillation of the key message — this is the sentence the engineer will remember. Follow up with written summary and development plan within 1 week.",
        "commonMistakes": "Running calibration without pre-calibration prep (becomes a 6-hour meeting). Accepting vague evidence ('strong performer' without specific examples). Not checking for bias patterns across the distribution. Treating calibration as ranking instead of consistency alignment. Delivering feedback weeks after calibration (information goes stale). Writing reviews the engineer will forget — distill the key message into one sentence.",
        "whatGoodLooksLike": "Pre-calibration catches 3-5 inconsistencies before the formal meeting. Calibration meeting takes under 3 hours because managers come prepared. Ratings consistent across teams at the same level. Zero 'surprise' feedback when managers deliver reviews. Distribution looks reasonable — not everyone exceeds expectations. Smruti Patel's recommendation: run pre-calibration sessions to give managers a safe space to practice presenting their cases while you call out bias, subjectivity, and inconsistency before the formal calibration.",
        "mappingNotes": "Cross-team performance calibration facilitation scenario",
        "suggestedMetricIds": ["5.1", "7.1"]
    },

    # C4: Operational Leadership (adding 1 for Beast Mode pattern)
    # Source: "The Beast Mode"
    {
        "id": "P-C4-4",
        "slug": "mobilizing-your-team-for-a-high-stakes-deadline",
        "observableIds": ["C4-O1", "C4-O12"],
        "capabilityIds": ["C4", "C10"],
        "title": "Mobilizing Your Team for a High-Stakes Deadline",
        "context": "Your team has 6 weeks to deliver a major feature that would normally take 12. It's a real business-critical deadline (contract commitment, not artificial urgency). You need to supercharge execution without burning people out.",
        "topicsActivated": [
            "Operational Rhythm (Focused Execution)",
            "Resource Allocation (Temporary Concentration)",
            "Team Health (Sustainable Intensity)"
        ],
        "decisionFramework": "1. Validate the deadline (Day 1): Confirm this is genuinely immovable, not artificial urgency that will repeat. Beast Mode only works if it's rare and real. If it's the third 'critical deadline' this quarter, the problem isn't execution — it's planning. 2. Clear the deck (Day 1-3): Get stakeholder agreement to pause everything else. Every competing priority must be explicitly paused, not 'also done on the side.' If stakeholders won't pause other work, the deadline isn't actually the priority. 3. Structure for focus (Week 1): Split the team into pairs or small squads, each owning a vertical slice of the deliverable. Each squad chooses one task per sprint. Reduce meetings to the minimum: brief daily sync, weekly demo, nothing else. 4. Remove all friction (Ongoing): Your job is clearing blockers in real-time — unblock dependencies, make decisions fast, shield from distractions. You should not be writing code. You are the team's router. 5. Protect sustainability (Ongoing): Set explicit boundaries — no weekend work unless agreed, daily standup includes energy check, EM watches for burnout signals. The goal is focused intensity, not heroics. 6. Wind down (After delivery): Explicit cooldown period. Celebrate the achievement. Retrospective on what worked. Resume normal operations. Don't let Beast Mode become the new baseline.",
        "commonMistakes": "Making every sprint a 'Beast Mode' (it stops working and burns people out). Not pausing other work (team is doing Beast Mode + everything else). EM trying to contribute code instead of clearing blockers. No explicit wind-down — Beast Mode energy becomes expected baseline. Using Beast Mode to compensate for chronic under-resourcing or poor planning.",
        "whatGoodLooksLike": "Everything non-critical paused within 3 days. Team energized by clear focus and urgency. Pairs/squads owning vertical slices with high autonomy. Daily blockers cleared within hours, not days. Feature delivered on time. No burnout — team tired but proud, not exhausted. The LeadDev 'Beast Mode' case study: splitting into autonomous pairs with single-task focus, eliminating all distractions, and providing maximum trust resulted in features built from ground up at unseen speed — slight delay of weeks vs. potential delay of months.",
        "mappingNotes": "Time-constrained high-stakes execution scenario",
        "suggestedMetricIds": ["1.2", "2.1"]
    },
]

# ── NEW ANTI-PATTERNS ───────────────────────────────────────────────
# C2 was at 2 anti-patterns — lowest. Adding 2 → 4.
# Source: "Five mistakes to avoid when setting OKRs", "A prioritization framework for uncertain times"

new_anti_patterns = [
    {
        "id": "AP-52",
        "name": "The Task-List OKR",
        "slug": "the-task-list-okr",
        "observableIds": ["C2-O1", "C2-O6"],
        "capabilityId": "C2",
        "shortDesc": "Team's OKRs are formatted as task lists with binary checkboxes rather than measurable outcomes, turning goal-setting into project management theater",
        "warningSigns": "Key results are all binary (ship feature X, complete project Y); OKRs read like a project plan, not strategy; team measures completion, not impact; objectives depend on each other sequentially; 8+ OKRs per team per quarter; OKRs are set by leadership and handed to the team; nobody can articulate why these objectives matter to the business",
        "impact": "Team ships features without measuring impact; 'achieved 100% of OKRs' but business outcomes didn't move; OKRs become performative — teams game the system by setting easily achievable tasks; real strategic thinking replaced by task execution; team loses agency because goals were dictated, not co-created",
        "recoveryActions": "Key results should answer 'how will we know we succeeded?' not 'what will we build?' Rewrite binary KRs as measurable outcomes: instead of 'Ship search feature' → 'Reduce time-to-find from 45s to 15s.' Limit to 2-4 objectives with 2-3 KRs each. Let the team co-create OKRs — when people own their goals, they're motivated by them. Make objectives independent — you should be able to achieve any objective without first achieving another. Review OKRs mid-quarter and adjust if context has changed — rigid OKRs in a changing environment produce the wrong outcomes on time.",
        "sourceTopic": "Strategic Prioritization & Goals",
        "mappingNotes": "Task-list OKR → outcome measurement / goal-setting quality observables"
    },
    {
        "id": "AP-53",
        "name": "The Urgency Treadmill",
        "slug": "the-urgency-treadmill",
        "observableIds": ["C2-O1", "C2-O5"],
        "capabilityId": "C2",
        "shortDesc": "Everything is urgent, nothing is strategic — team constantly reacts to the loudest stakeholder or latest fire, never making progress on what actually matters",
        "warningSigns": "Roadmap changes weekly based on whoever shouted last; team can't finish multi-week projects because priorities shift mid-sprint; engineers describe their work as 'always firefighting'; quarterly goals abandoned by month 2; leadership asks 'why isn't X done?' but keeps adding new urgent requests; 'we don't have time for technical investment' is the permanent state",
        "impact": "Strategic work never happens; tech debt compounds because investment is perpetually deferred; engineers lose motivation because nothing ships to completion; the team appears busy but produces little lasting value; best engineers leave for teams with clearer direction",
        "recoveryActions": "Distinguish urgent from important using a simple framework: urgent (real deadline, real consequence) vs. important (high impact, no immediate deadline) vs. noise (someone wants it, no real consequence). Protect capacity: explicitly reserve 30-40% of team capacity for planned strategic work that cannot be interrupted. Force stakeholder prioritization: when a new 'urgent' request arrives, ask which current commitment should be deprioritized to make room — if nothing can be deprioritized, the new request isn't actually the priority. Make the cost visible: track how many planned commitments were completed vs. interrupted each quarter. Present this to leadership as 'we completed 3 of 8 quarterly goals because 5 were interrupted by ad-hoc requests.' The data makes the problem undeniable.",
        "sourceTopic": "Strategic Prioritization & Goals",
        "mappingNotes": "Urgency treadmill → prioritization discipline / stakeholder management observables"
    },
]

# ── NEW CALIBRATION SIGNALS ─────────────────────────────────────────

new_calibration_signals = [
    # C13 playbooks
    {"id": "SIG-275", "observableId": "C13-O3", "capabilityId": "C13",
     "signalText": "Continuous compliance: 'Automated evidence collection for all repeat audit findings — next audit had zero repeat findings, prep time dropped from 3 weeks to 2 days'",
     "signalType": "metric", "sourceSubTopic": "Audit Readiness Automation"},
    {"id": "SIG-276", "observableId": "C13-O6", "capabilityId": "C13",
     "signalText": "Proportional security gates: 'Defined security-sensitive triggers for threat model requirement — 30% of features needed review, 70% shipped with automated scanning only, zero escaped vulnerabilities, no deployment bottleneck'",
     "signalType": "metric", "sourceSubTopic": "Proportional Security Review"},

    # C11 hiring at scale
    {"id": "SIG-277", "observableId": "C11-O9", "capabilityId": "C11",
     "signalText": "Interview standardization: 'Standardized rubrics with independent scoring — interviewer pass rate variance narrowed from 50% spread to 15%, candidate experience scores improved 25%'",
     "signalType": "metric", "sourceSubTopic": "Interview Process Scaling"},

    # C14 calibration
    {"id": "SIG-278", "observableId": "C14-O1", "capabilityId": "C14",
     "signalText": "Calibration facilitation: 'Led cross-team calibration for 30 engineers across 4 teams — pre-calibration caught 5 bias instances, meeting completed in under 3 hours, zero surprise feedback in post-review survey'",
     "signalType": "calibration_language", "sourceSubTopic": "Cross-Team Calibration"},

    # C4 Beast Mode / focused execution
    {"id": "SIG-279", "observableId": "C4-O12", "capabilityId": "C4",
     "signalText": "Focused execution: 'Mobilized team for 6-week critical deadline — paused all other work, split into autonomous pairs, delivered on time with no weekend work, team reported high energy despite intensity'",
     "signalType": "calibration_language", "sourceSubTopic": "High-Stakes Execution"},

    # C3 steel threads
    {"id": "SIG-280", "observableId": "C3-O1", "capabilityId": "C3",
     "signalText": "Steel thread architecture: 'Required steel thread (thinnest end-to-end production path) before full feature build for all major projects — integration issues caught 6-8 weeks earlier, no cross-team surprise failures at launch'",
     "signalType": "metric", "sourceSubTopic": "Steel Thread Design Pattern"},

    # C5 trifecta model
    {"id": "SIG-281", "observableId": "C5-O16", "capabilityId": "C5",
     "signalText": "Trifecta model: 'Adopted named Eng-PM-Design trifecta with shared accountability — decisions made within the triad without escalation, feature delivery predictability improved from 60% to 85%'",
     "signalType": "metric", "sourceSubTopic": "Product Trifecta Partnership"},

    # C2 anti-patterns
    {"id": "SIG-282", "observableId": "C2-O1", "capabilityId": "C2",
     "signalText": "OKR quality: 'Redesigned OKRs from task lists to measurable outcomes — team co-creates goals, 85% KR achievement rate with all KRs tied to business metrics, zero binary checkboxes'",
     "signalType": "calibration_language", "sourceSubTopic": "Outcome-Based Goal Setting"},
    {"id": "SIG-283", "observableId": "C2-O5", "capabilityId": "C2",
     "signalText": "Focus protection: 'Protected 40% capacity for planned strategic work — quarterly goal completion improved from 35% to 80% by requiring stakeholders to trade priorities rather than add them'",
     "signalType": "metric", "sourceSubTopic": "Strategic Capacity Protection"},

    # C8 post-mortems and on-call
    {"id": "SIG-284", "observableId": "C8-O1", "capabilityId": "C8",
     "signalText": "Never solve the same problem twice: 'Created incident knowledge base from post-mortems — repeat incidents dropped to zero over 6 months, 30% of on-call time freed for proactive reliability work'",
     "signalType": "metric", "sourceSubTopic": "Incident Knowledge Management"},
]

# ── LEARNING PATHWAY UPDATES ───────────────────────────────────────
# Add article references to existing learning pathways where articles add genuine value

for lp in learning_pathways:
    cap = lp['capabilityId']
    if cap == 'C8' and 'practical' in lp:
        lp['practical'].append({
            "title": "How to Bring Order to Chaos Engineering (Liz Fong-Jones)",
            "type": "article",
            "description": "Practical guide on assessing readiness for chaos engineering, using error budgets to gauge ambition level, and running effective game days. Key insight: if you can't afford resilience testing, you can't afford unreliable systems.",
            "url": "https://leaddev.com/software-quality/how-bring-order-chaos-engineering"
        })
        lp['practical'].append({
            "title": "When, Not If: The Playbook Method for Managing Risk (Yonatan Zunger)",
            "type": "article",
            "description": "Alternative to traditional risk registers that assumes failures will happen and pre-writes response playbooks. Both a practical preparation tool and a psychological one that makes hard conversations easier.",
            "url": "https://leaddev.com/leadership/when-not-if-playbook-method-managing-risk"
        })
    elif cap == 'C7' and 'practical' in lp:
        lp['practical'].append({
            "title": "A Thorough Team Guide to RFCs (Juan Pablo Buriticá)",
            "type": "article",
            "description": "Comprehensive guide to implementing RFCs as a team decision-making process. Includes template, process design, and when NOT to use RFCs. Emphasizes that building software is a social exercise.",
            "url": "https://leaddev.com/software-quality/thorough-team-guide-rfcs"
        })
    elif cap == 'C3' and 'practical' in lp:
        lp['practical'].append({
            "title": "Steel Threads Are the Missing Link in Your System Design",
            "type": "article",
            "description": "Steel threads — the thinnest possible production-grade end-to-end flow — force teams to confront integration risk early. Key insight: the handoffs between components are where systems break; steel threads exercise those handoffs before you've built everything.",
            "url": "https://leaddev.com/software-quality/steel-threads-missing-link-your-system-design"
        })
    elif cap == 'C9' and 'practical' in lp:
        lp['practical'].append({
            "title": "Keep Your Delivery in Balance With These Metrics Pairings",
            "type": "article",
            "description": "Specific metric pairing examples: deployment frequency + PR size, change failure rate + unreviewed PRs. Metrics in isolation are misleading; pairing reveals the full picture and prevents gaming.",
            "url": "https://leaddev.com/reporting/keep-your-delivery-balance-these-metrics-pairings"
        })
    elif cap == 'C14' and 'practical' in lp:
        lp['practical'].append({
            "title": "Navigating Engineering Performance Reviews Part Two (Smruti Patel)",
            "type": "article",
            "description": "Practical guide to cross-team calibration, pre-calibration sessions for bias detection, and distilling feedback into one memorable sentence. Emphasizes fairness through evidence and process.",
            "url": "https://leaddev.com/hiring/navigating-engineering-performance-reviews-part-two"
        })
    elif cap == 'C11' and 'practical' in lp:
        lp['practical'].append({
            "title": "Creating a Technical Interview Process That Works at Scale (GitLab)",
            "type": "article",
            "description": "How GitLab standardized interview rubrics during hypergrowth using shared scoring templates and data-driven hypothesis testing. Proved that modern framework experience predicted success equally regardless of specific framework.",
            "url": "https://leaddev.com/hiring/creating-technical-interview-process-works-scale"
        })
    elif cap == 'C2' and 'practical' in lp:
        lp['practical'].append({
            "title": "Five Mistakes to Avoid When Setting OKRs",
            "type": "article",
            "description": "Five concrete OKR anti-patterns: external goal-setting, task-list key results, binary KRs, dependent objectives, and too many OKRs. Emphasizes team ownership and measurable outcomes over checkboxes.",
            "url": "https://leaddev.com/reporting/five-mistakes-avoid-when-setting-okrs-your-team"
        })

# ── APPLY ALL ADDITIONS ─────────────────────────────────────────────
print("=== Applying Session 7 Enrichments ===")

playbooks.extend(new_playbooks)
save('src/data/playbooks.json', playbooks)
print(f"  Added {len(new_playbooks)} playbooks (total: {len(playbooks)})")

anti_patterns.extend(new_anti_patterns)
save('src/data/anti-patterns.json', anti_patterns)
print(f"  Added {len(new_anti_patterns)} anti-patterns (total: {len(anti_patterns)})")

calibration_signals.extend(new_calibration_signals)
save('src/data/calibration-signals.json', calibration_signals)
print(f"  Added {len(new_calibration_signals)} calibration signals (total: {len(calibration_signals)})")

save('src/data/learning-pathways.json', learning_pathways)
print(f"  Updated learning pathways with 7 new article references")

# Update search index with new playbooks
caps_lookup = {c['id']: c for c in load('src/data/capabilities.json')}
for pb in new_playbooks:
    cap_names = [caps_lookup.get(cid, {}).get('name', '') for cid in pb['capabilityIds']]
    domains = list(set(caps_lookup.get(cid, {}).get('domain', '') for cid in pb['capabilityIds']))
    search_index.append({
        "title": f"{pb['id']}: {pb['title']}",
        "description": pb["context"],
        "type": "playbook",
        "url": f"/playbooks/{pb['slug']}/",
        "domain": domains[0] if domains else "",
        "capabilityName": ", ".join(cap_names),
        "id": pb["id"],
    })

# Add new anti-patterns to search index
for ap in new_anti_patterns:
    cap = caps_lookup.get(ap['capabilityId'], {})
    search_index.append({
        "title": f"{ap['id']}: {ap['shortDesc'][:80]}",
        "description": ap["warningSigns"],
        "type": "anti-pattern",
        "url": f"/anti-patterns/{ap['slug']}/",
        "domain": cap.get("domain", ""),
        "capabilityName": cap.get("name", ""),
        "id": ap["id"],
    })

save('src/data/search-index.json', search_index)
print(f"  Updated search index (total: {len(search_index)})")

# Update review progress
progress_path = 'reference/review-progress.json'
if os.path.exists(progress_path):
    progress = load(progress_path)
    progress['sessions'].append({
        "session": 7,
        "date": "2026-02-20",
        "focus": "Playbooks for C13/C11/C14/C4, Anti-patterns for C2, Learning pathway article refs",
        "articlesReviewed": 11,
        "additions": {
            "playbooks": len(new_playbooks),
            "antiPatterns": len(new_anti_patterns),
            "calibrationSignals": len(new_calibration_signals),
            "learningPathwayArticles": 7,
        },
        "capabilitiesEnriched": ["C2", "C3", "C4", "C5", "C7", "C8", "C9", "C11", "C13", "C14"],
        "coverageImpact": {
            "C13": "PB: 3→5",
            "C11": "PB: 4→5",
            "C14": "PB: 4→5",
            "C4": "PB: 7→8",
            "C2": "AP: 2→4",
        },
        "notes": "Selective enrichment from 11 LeadDev articles. Focused on capabilities with thinnest playbook and anti-pattern coverage. Added steel threads, trifecta model, and Beast Mode as calibration signals. Updated 7 learning pathways with article references."
    })
    progress['totalAdditions']['playbooks'] = progress['totalAdditions'].get('playbooks', 0) + len(new_playbooks)
    progress['totalAdditions']['antiPatterns'] = progress['totalAdditions'].get('antiPatterns', 0) + len(new_anti_patterns)
    progress['totalAdditions']['calibrationSignals'] = progress['totalAdditions'].get('calibrationSignals', 0) + len(new_calibration_signals)
    progress['grandTotal'] = progress.get('grandTotal', 0) + len(new_playbooks) + len(new_anti_patterns) + len(new_calibration_signals) + 7
    progress['metadata']['lastUpdated'] = "2026-02-20"
    progress['dataFileTotals']['playbooks'] = len(playbooks)
    progress['dataFileTotals']['antiPatterns'] = len(anti_patterns)
    progress['dataFileTotals']['calibrationSignals'] = len(calibration_signals)
    progress['dataFileTotals']['searchIndex'] = len(search_index)
    save(progress_path, progress)

print("\n=== Session 7 Summary ===")
print(f"Playbooks: +{len(new_playbooks)} (C13:2, C11:1, C14:1, C4:1)")
print(f"Anti-Patterns: +{len(new_anti_patterns)} (C2:2)")
print(f"Calibration Signals: +{len(new_calibration_signals)}")
print(f"Learning Pathway articles: +7 (C2, C3, C7, C8, C9, C11, C14)")
print(f"Total additions: {len(new_playbooks) + len(new_anti_patterns) + len(new_calibration_signals) + 7}")

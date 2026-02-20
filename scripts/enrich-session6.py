#!/usr/bin/env python3
"""
Enrich EM framework data files - Session 6.
Based on critical review of 12+ LeadDev articles.
Only additions that genuinely add value beyond existing content.

Articles reviewed:
- "A thorough team guide to RFCs" (Juan Pablo Buriticá) — C7
- "How to bring order to chaos engineering" (Liz Fong-Jones) — C8
- "When, not if: The playbook method for managing risk" (Yonatan Zunger) — C8
- "Navigating engineering performance reviews pt 2" (Smruti Patel) — C14
- "Performance review mistakes and how to avoid them" — C14
- "Strategies for an efficient performance review cycle" — C14
- "Keep your delivery in balance with these metrics pairings" — C9
- "Debugging engineering velocity" — C4
- "A leader's guide to fostering effective cross-team collaboration" — C5
- "Common management failures in developing ICs" — C6
- "How to make reorgs less terrible" (Katie Wilde) — C1
- "Five mistakes to avoid when setting OKRs" — C2
- "The secret to hiring engineers when you pay less than Google" — C11
- "How to create a tech debt strategy that works" (Shafeeq Ur Rahaman) — C3
"""

import json
import re

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

interview_qs = load('src/data/interview-questions.json')
playbooks = load('src/data/playbooks.json')
calibration_signals = load('src/data/calibration-signals.json')
learning_pathways = load('src/data/learning-pathways.json')
measurement_guidance = load('src/data/measurement-guidance.json')
search_index = load('src/data/search-index.json')

# ── NEW INTERVIEW QUESTIONS ─────────────────────────────────────────
# Focus on capabilities with only 4-6 questions: C2(4), C8(4), C11(4), C3(6), C6(6)

new_interview_qs = [
    # C2: Strategic Prioritization (was 4, adding 4 → 8)
    # Source: "Five mistakes to avoid when setting OKRs", "Building a prioritization framework"
    {
        "id": "IQ-97",
        "capabilityId": "C2",
        "question": "How do you set OKRs or goals for your engineering team? Walk me through your process from company strategy down to team-level objectives.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you involve your team in goal-setting versus dictating goals top-down?",
            "What happens when a key result is clearly not going to be met mid-quarter?",
            "How do you handle goals that depend on another team's output?"
        ],
        "lookFor": [
            "Team involvement in goal creation — not dictated from above",
            "Key results are measurable outcomes, not task lists",
            "Realistic number of objectives (2-4, not 8-10)",
            "Goals are independent — don't require sequential achievement"
        ],
        "redFlags": [
            "Sets goals for team without their input",
            "Key results are binary checkboxes or task lists",
            "Too many OKRs — trying to track everything",
            "No mechanism for adjusting goals when context changes"
        ]
    },
    {
        "id": "IQ-98",
        "capabilityId": "C2",
        "question": "Tell me about a time you had to kill or significantly deprioritize a project your team had already invested in. How did you make and communicate that decision?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did the team react and how did you handle the morale impact?",
            "What data informed the decision to stop?",
            "How did you communicate this to stakeholders who were expecting the deliverable?"
        ],
        "lookFor": [
            "Data-driven decision to stop, not sunk-cost thinking",
            "Clear communication of rationale to team and stakeholders",
            "Acknowledgment of team's effort while redirecting",
            "Used the freed capacity for higher-impact work"
        ],
        "redFlags": [
            "Has never killed a project — suggests inability to say no",
            "Killed project without communicating to stakeholders",
            "Team learned about cancellation indirectly",
            "No plan for redirecting freed capacity"
        ]
    },
    {
        "id": "IQ-99",
        "capabilityId": "C2",
        "question": "How do you decide the right split between feature work, technical investment, and operational work? What framework guides that allocation?",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "How do you justify technical investment to product stakeholders?",
            "How does this allocation change in different contexts (hypergrowth vs. contraction)?",
            "How do you track whether the allocation is actually being followed?"
        ],
        "lookFor": [
            "Explicit allocation ratios that are communicated and tracked",
            "Technical work justified in business terms, not just engineering preference",
            "Allocation adapts to context — not a fixed formula",
            "Regular review of whether allocation matches reality"
        ],
        "redFlags": [
            "No explicit allocation — feature work always wins by default",
            "Rigid formula applied regardless of context",
            "Technical investment done secretly without stakeholder awareness",
            "Can't articulate why current allocation is what it is"
        ]
    },
    {
        "id": "IQ-100",
        "capabilityId": "C2",
        "question": "Describe how you ensure engineering investment connects to measurable business outcomes. How do you prevent your team from becoming a feature factory?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "Can you give an example where you killed or redirected work based on outcome data?",
            "How do you define 'done' for an initiative — is it shipped or is it impact measured?",
            "How do you handle pressure to ship features without clear outcome definitions?"
        ],
        "lookFor": [
            "Success criteria defined before work begins — not after",
            "Outcome measurement is built into the process, not an afterthought",
            "Has actually redirected work based on impact data",
            "Team understands why their work matters in business terms"
        ],
        "redFlags": [
            "Ships features without measuring impact",
            "Success = shipped, not success = business outcome moved",
            "Can't connect recent projects to business outcomes",
            "No mechanism for post-launch outcome review"
        ]
    },

    # C8: Incidents, Risk & Reliability (was 4, adding 4 → 8)
    # Source: "How to bring order to chaos engineering", "The playbook method for managing risk"
    {
        "id": "IQ-101",
        "capabilityId": "C8",
        "question": "How do you assess your team's readiness for chaos engineering or proactive resilience testing? What prerequisites need to be in place before you start injecting failures?",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "What's the relationship between SLO error budgets and chaos engineering ambition?",
            "How do you handle the situation where your team is too busy fighting real fires to practice for them?",
            "How do you measure the ROI of resilience testing?"
        ],
        "lookFor": [
            "Understanding that chaos engineering requires baseline observability and SLOs first",
            "Uses error budget to gauge how aggressive resilience testing can be",
            "Starts small — doesn't jump to production chaos without groundwork",
            "Treats resilience testing as practice, not theater"
        ],
        "redFlags": [
            "Wants to do chaos engineering without basic monitoring in place",
            "No concept of error budgets or SLOs",
            "Treats chaos engineering as a checkbox rather than a practice",
            "Never considered resilience testing at all"
        ]
    },
    {
        "id": "IQ-102",
        "capabilityId": "C8",
        "question": "Tell me about your approach to risk management as an engineering leader. How do you prepare your team for things going wrong?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "Do you use traditional risk registers, playbooks, or something else?",
            "How do you handle the psychological aspect — getting the team to plan for failure without becoming pessimistic?",
            "Give me an example where a pre-written plan saved you during an actual incident."
        ],
        "lookFor": [
            "Assumes things will go wrong, not if — plans accordingly",
            "Has concrete pre-written runbooks or playbooks for likely failure modes",
            "Balances preparation with not over-engineering for unlikely scenarios",
            "Uses preparation process itself as a way to prevent incidents"
        ],
        "redFlags": [
            "Purely reactive — no pre-incident planning",
            "Risk register exists but is stale and never consulted",
            "Plans for everything equally instead of prioritizing likely failures",
            "Team has never practiced incident response before a real incident"
        ]
    },
    {
        "id": "IQ-103",
        "capabilityId": "C8",
        "question": "Walk me through how you run post-mortems. What makes a post-mortem genuinely useful versus a bureaucratic exercise?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you maintain blamelessness when there's clearly a human error involved?",
            "What percentage of your post-mortem action items actually get completed?",
            "How do you handle repeat incidents where the same root cause keeps appearing?"
        ],
        "lookFor": [
            "Genuinely blameless — focuses on systems, not individuals",
            "Action items are tracked and completed, not just written down",
            "Post-mortems lead to structural changes, not just documentation",
            "Addresses repeat patterns, not just individual incidents"
        ],
        "redFlags": [
            "Post-mortems are finger-pointing sessions dressed up as process",
            "Action items rarely completed — post-mortem theater",
            "Same root causes keep recurring without systemic fix",
            "Only runs post-mortems for major incidents — misses learning from smaller ones"
        ]
    },
    {
        "id": "IQ-104",
        "capabilityId": "C8",
        "question": "How do you balance reliability investment against feature velocity? Tell me about a time you had to make a hard call between shipping a feature and addressing a reliability concern.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you make the reliability case to product stakeholders who want features?",
            "What data do you use to quantify reliability risk in business terms?",
            "How do you prevent reliability from becoming a perpetual argument?"
        ],
        "lookFor": [
            "Uses error budgets or SLOs to make the trade-off objective",
            "Can translate reliability concerns into business impact",
            "Doesn't treat it as engineering vs. product — frames as shared outcome",
            "Has actually paused feature work for reliability and can explain why"
        ],
        "redFlags": [
            "Reliability always loses to features — no mechanism to protect it",
            "Can't quantify reliability risk in business terms",
            "Treats reliability as engineering's private concern",
            "No framework for making the trade-off — decides ad hoc each time"
        ]
    },

    # C11: Hiring, Onboarding & Role Design (was 4, adding 4 → 8)
    # Source: "Patching the hiring pipeline", "The secret to hiring when you pay less than Google"
    {
        "id": "IQ-105",
        "capabilityId": "C11",
        "question": "How do you compete for engineering talent when you can't match top-of-market compensation? What's your team's or company's employee value proposition?",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "What have you seen work besides compensation to win candidates?",
            "How do you identify candidates who are motivated by what you can offer?",
            "How do you train your hiring team to articulate the value proposition in interviews?"
        ],
        "lookFor": [
            "Articulates differentiated value beyond salary (mission, impact, growth, autonomy)",
            "Targets candidates whose priorities align with what they offer",
            "Trains interviewers to communicate the value proposition consistently",
            "Has actually won candidates against higher-paying offers"
        ],
        "redFlags": [
            "Only strategy is matching compensation",
            "No articulated employer value proposition",
            "Assumes all engineers are purely compensation-motivated",
            "Hasn't thought about what makes their team uniquely attractive"
        ]
    },
    {
        "id": "IQ-106",
        "capabilityId": "C11",
        "question": "Your hiring pipeline has been open for 3 months with no offers extended despite seeing candidates. How do you diagnose what's wrong?",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "What conversion rates would you look at and at which stages?",
            "How do you determine if the problem is candidate quality, process design, or interviewer calibration?",
            "What's the first thing you'd change?"
        ],
        "lookFor": [
            "Starts with data — conversion rates by stage, not assumptions",
            "Considers interviewer calibration as a potential problem, not just candidates",
            "Would audit scorecards for specificity vs. vague feedback",
            "Distinguishes between bar problems and process problems"
        ],
        "redFlags": [
            "Blames recruiting for candidate quality without examining own process",
            "No concept of funnel conversion rates",
            "Would lower the bar instead of fixing the process",
            "Never considered that interviewers might be miscalibrated"
        ]
    },
    {
        "id": "IQ-107",
        "capabilityId": "C11",
        "question": "Describe your approach to onboarding a new engineer. What does the first 30/60/90 days look like on your team?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you measure onboarding effectiveness?",
            "What's the fastest you've seen someone become productive, and what made that possible?",
            "How do you balance structured onboarding with not overwhelming new hires?"
        ],
        "lookFor": [
            "Structured plan with clear milestones, not just 'shadow someone'",
            "Buddy or mentor system paired with the new hire",
            "First meaningful contribution expected within 2-4 weeks",
            "Feedback loops — checking in on the new hire's experience"
        ],
        "redFlags": [
            "No structured onboarding — 'just start picking up tickets'",
            "No buddy or mentor system",
            "No milestones or checkpoints in the first 90 days",
            "New hires consistently take 6+ months to become productive"
        ]
    },
    {
        "id": "IQ-108",
        "capabilityId": "C11",
        "question": "Tell me about a bad hire you made or were involved in. What went wrong and what did you change about your process afterward?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How long did it take to recognize the mismatch?",
            "What signals did you miss in the interview process?",
            "What structural changes did you make to prevent the same mistake?"
        ],
        "lookFor": [
            "Honest accountability — doesn't blame the hire or recruiting",
            "Specific process changes made after the experience",
            "Faster pattern recognition over time",
            "Understanding that some hiring failures are inevitable"
        ],
        "redFlags": [
            "Claims to have never made a bad hire (unrealistic)",
            "Blames everything on the candidate",
            "No process changes made after the experience",
            "Took too long to recognize and act on the mismatch"
        ]
    },

    # C3: Systems Design & Architecture (was 6, adding 2 → 8)
    # Source: "How to create a tech debt strategy that works"
    {
        "id": "IQ-109",
        "capabilityId": "C3",
        "question": "How do you make the case for tech debt remediation to non-technical stakeholders? Walk me through a real example where you secured investment in technical work.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you quantify the cost of the tech debt in business terms?",
            "What allocation model do you use — dedicated sprints, percentage of capacity, or something else?",
            "How do you track whether the tech debt investment is paying off?"
        ],
        "lookFor": [
            "Frames tech debt in business terms — cost of delay, incident risk, velocity impact",
            "Quantifies with data, not just engineering frustration",
            "Has a sustainable allocation model, not one-off cleanups",
            "Tracks remediation ROI to justify continued investment"
        ],
        "redFlags": [
            "Can only describe tech debt in technical terms",
            "Guerrilla tech debt cleanup without visibility or permission",
            "No tracking of whether remediation improved anything",
            "Only addresses tech debt when it causes an outage"
        ]
    },
    {
        "id": "IQ-110",
        "capabilityId": "C3",
        "question": "Tell me about a significant architectural decision you drove or influenced. How did you evaluate options and get buy-in from the team?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What process did you use — RFC, ADR, design doc, or something else?",
            "How did you handle strong disagreement from senior engineers?",
            "When did you revisit the decision to evaluate whether it was working?"
        ],
        "lookFor": [
            "Used a structured decision process (RFC, ADR, or similar)",
            "Documented alternatives considered and rationale for choice",
            "Got input before deciding — didn't dictate",
            "Revisited the decision with data after implementation"
        ],
        "redFlags": [
            "Made unilateral architectural decisions",
            "No documentation of the decision or alternatives",
            "Never revisited to see if the decision was correct",
            "Couldn't handle dissent from the team"
        ]
    },

    # C6: Coaching & Talent Development (was 6, adding 2 → 8)
    # Source: "Common management failures in developing ICs"
    {
        "id": "IQ-111",
        "capabilityId": "C6",
        "question": "Beyond technical skills, what capabilities do you actively develop in your senior engineers? How do you coach on non-technical growth areas?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you give feedback on soft skills like communication or project leadership without it feeling vague?",
            "How do you help ICs learn project management and scope breakdown?",
            "What's the difference in your coaching approach for a mid-level vs. senior engineer?"
        ],
        "lookFor": [
            "Coaches on communication, project leadership, scope management — not just code quality",
            "Uses career framework to frame non-technical growth in concrete terms",
            "Provides specific, actionable feedback with examples",
            "Adapts coaching approach by level — technical depth for mid, leverage and influence for senior"
        ],
        "redFlags": [
            "Only gives technical feedback — ignores collaboration, communication, project leadership",
            "Treats all engineers the same regardless of level",
            "Feedback on soft skills is vague ('be more visible') without concrete examples",
            "Hasn't considered that senior+ growth is mostly non-technical"
        ]
    },
    {
        "id": "IQ-112",
        "capabilityId": "C6",
        "question": "How do you delegate effectively as a manager? Tell me about a time you had to let go of technical work to develop someone on your team.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you decide what to delegate vs. what to keep?",
            "How did you support the person without micromanaging?",
            "What happened when they made mistakes on the delegated work?"
        ],
        "lookFor": [
            "Delegates the interesting work, not just the grunt work",
            "Provides context and support without dictating the approach",
            "Treats mistakes on delegated work as learning opportunities",
            "Understands that their job is now generating leverage through others"
        ],
        "redFlags": [
            "Still doing 50%+ IC work — hasn't made the transition",
            "Only delegates tasks nobody else wants",
            "Takes work back at the first sign of difficulty",
            "Delegates without providing adequate context or support"
        ]
    },
]

# ── NEW PLAYBOOKS ───────────────────────────────────────────────────
# Focus on C8(3), C9(3), C13(3) which are lowest

new_playbooks = [
    # C8: Incidents, Risk & Reliability (was 3, adding 2 → 5)
    # Source: "The playbook method for managing risk", "How to bring order to chaos engineering"
    {
        "id": "P-C8-4",
        "slug": "building-incident-readiness-before-your-first-major-outage",
        "observableIds": ["C8-O1", "C8-O7"],
        "capabilityIds": ["C8"],
        "title": "Building Incident Readiness Before Your First Major Outage",
        "context": "Your team owns a growing service but has never had a serious incident. There are no runbooks, no defined on-call rotation, and no incident response process. You know it's a matter of when, not if.",
        "topicsActivated": [
            "Reliability (Incident Preparation)",
            "Operational Rhythm (On-Call Design)",
            "Risk Management (Pre-Incident Planning)"
        ],
        "decisionFramework": "1. Inventory (Week 1): List the 5 most likely failure modes for your service. For each, write a one-page playbook: what happens, how you detect it, how you mitigate it, who to notify. 2. Set up basics (Week 2): Define on-call rotation, escalation path, incident severity levels, and communication channels. 3. Practice (Month 2): Run a tabletop exercise — walk through a simulated incident using the playbooks. Identify gaps. 4. Graduate (Month 3): Run a controlled game day — actually inject a failure in staging, have the on-call respond using the playbook. 5. Improve (Ongoing): After each real incident, update playbooks. Review runbook accuracy quarterly. The process of building playbooks is itself a prevention tool — the conversations surface risks you would have missed.",
        "commonMistakes": "Trying to write runbooks for every possible failure (write for the 5 most likely first). Making on-call purely punitive instead of a learning rotation. Not practicing — having runbooks nobody has ever used. Writing runbooks at the wrong altitude (too abstract or too detailed). Not updating runbooks after incidents reveal gaps.",
        "whatGoodLooksLike": "Within 60 days: on-call rotation running, top 5 failure mode playbooks written, first tabletop exercise completed. Within 90 days: first game day run, runbook gaps identified and fixed. When the first real incident hits, the team responds with composure rather than panic because they've practiced. Yonatan Zunger's 'when, not if' framing: building playbooks is both practical preparation and psychological tool — planning for failure makes hard conversations easier and removes perverse incentives to hide risk.",
        "mappingNotes": "Pre-incident readiness building scenario",
        "suggestedMetricIds": ["3.3", "3.5"]
    },
    {
        "id": "P-C8-5",
        "slug": "your-on-call-rotation-is-burning-people-out",
        "observableIds": ["C8-O2", "C8-O8"],
        "capabilityIds": ["C8", "C4"],
        "title": "Your On-Call Rotation Is Burning People Out",
        "context": "Your on-call engineers are getting paged 10+ times per week. The same alerts fire repeatedly. Morale is cratering. Two engineers have asked to be removed from the rotation. You're losing people to teams with better operational hygiene.",
        "topicsActivated": [
            "Reliability (Alert Quality)",
            "Team Health (On-Call Sustainability)",
            "Operational Rhythm (Toil Reduction)"
        ],
        "decisionFramework": "1. Quantify (Week 1): Pull alert data for the last 30 days — frequency, repeat offenders, pages that required action vs. noise, time to resolve. 2. Triage alerts (Week 1-2): Categorize every alert: actionable (keep), informational (convert to ticket), noise (delete), duplicate (consolidate). 3. Fix top offenders (Week 2-4): Take the top 5 most frequent alerts and either fix the underlying issue, tune the threshold, or convert to non-paging. 4. Redesign rotation (Month 2): Ensure on-call burden is shared equitably, build in compensatory time off, pair junior on-call with experienced backup. 5. Set SLOs (Month 2-3): Define what 'healthy on-call' looks like — target <2 actionable pages per shift, <30 min mean time to engage. 6. Sustain (Ongoing): Review alert quality monthly, track on-call happiness, treat recurring alerts as bugs to fix, not toil to endure.",
        "commonMistakes": "Adding more people to the rotation instead of fixing alert quality (spreads suffering, doesn't fix it). Accepting alert fatigue as 'just how on-call works'. Not tracking alert-to-action ratio. Removing people from rotation when they complain instead of fixing the root cause. Compensating with on-call bonus instead of reducing toil.",
        "whatGoodLooksLike": "Within 30 days: alert volume reduced 50%+ by eliminating noise and fixing top offenders. Within 60 days: on-call engineers report sustainable workload. On-call shift averages <2 actionable pages. Nobody requests removal from rotation. Team sees on-call as learning opportunity, not punishment. Liz Fong-Jones' principle: if you can't afford the engineering resources to do chaos engineering, you definitely can't afford to have unreliable systems — same applies to alert quality: if you can't invest in reducing toil, you can't afford the attrition it causes.",
        "mappingNotes": "On-call burnout and alert fatigue scenario",
        "suggestedMetricIds": ["3.3", "7.1"]
    },

    # C9: Metrics, Measurement & Outcomes (was 3, adding 2 → 5)
    # Source: "Keep your delivery in balance with metrics pairings", "Are DORA metrics right for your team"
    {
        "id": "P-C9-3",
        "slug": "your-metrics-are-being-gamed-and-everyone-knows-it",
        "observableIds": ["C9-O1", "C9-O9"],
        "capabilityIds": ["C9"],
        "title": "Your Metrics Are Being Gamed and Everyone Knows It",
        "context": "Leadership set a deployment frequency target. Your team is now deploying tiny changes to hit the number, but cycle time is actually worse and code review quality has dropped. Engineers are cynical about measurement.",
        "topicsActivated": [
            "Metrics (Gaming Prevention)",
            "Culture (Measurement Trust)",
            "Leadership (Incentive Design)"
        ],
        "decisionFramework": "1. Acknowledge (Week 1): Name the problem openly with leadership and the team. Gaming is a rational response to misaligned incentives — it's a system design failure, not a character failure. 2. Diagnose (Week 1-2): Identify which metrics became targets rather than diagnostics. For each, find the paired metric that would have caught the gaming (deployment frequency should be paired with change failure rate or PR size). 3. Redesign (Week 2-3): Replace single-metric targets with paired metrics. Present speed metrics alongside quality counterparts. Stop setting metrics as individual or team performance targets — use them as diagnostic tools only. 4. Rebuild trust (Month 2): Communicate the new approach: metrics exist to help the team improve, not to judge them. Involve engineers in choosing which metrics matter. 5. Monitor (Ongoing): Ask quarterly: 'Which metrics drove a real decision? Which are being ignored or gamed?' Retire any metric that isn't informing action.",
        "commonMistakes": "Punishing the gaming instead of fixing the incentive structure. Replacing gamed metrics with more metrics (creates an arms race). Using metrics as individual performance targets (guarantees gaming). Not involving the team in metric selection. Reacting to metric fluctuations without investigating context.",
        "whatGoodLooksLike": "Within 4 weeks: single-metric targets replaced with paired metrics, team involved in selecting what to measure. Within 8 weeks: engineers engage with metrics constructively instead of gaming them. Metrics drive at least one real process improvement per month. Gaming stops because incentives are aligned. The article 'Keep your delivery in balance with these metrics pairings' emphasizes: metrics viewed in isolation are misleading — pairing deployment frequency with PR size, change failure rate with unreviewed PRs, reveals the full picture and prevents single-dimension optimization.",
        "mappingNotes": "Metrics gaming diagnosis and correction scenario",
        "suggestedMetricIds": ["2.1", "2.2"]
    },
    {
        "id": "P-C9-4",
        "slug": "choosing-the-right-metrics-framework-for-your-teams-maturity",
        "observableIds": ["C9-O1", "C9-O10"],
        "capabilityIds": ["C9", "C4"],
        "title": "Choosing the Right Metrics Framework for Your Team's Maturity",
        "context": "You've been asked to implement DORA metrics, but your team has no CI/CD pipeline, manual deployments, and no incident tracking. Jumping to DORA feels premature but leadership wants 'engineering productivity metrics'.",
        "topicsActivated": [
            "Metrics (Framework Selection)",
            "Stakeholder Mgmt (Expectation Management)",
            "Operational Maturity (Right-Sizing Measurement)"
        ],
        "decisionFramework": "1. Assess readiness (Week 1): DORA metrics require automated deployment, version control, and incident tracking as data sources. If those don't exist, DORA metrics will be meaningless or manually fabricated. Be honest with leadership about this. 2. Propose a maturity-appropriate starting point (Week 2): For immature teams: start with 3 handcrafted metrics — cycle time (PR open to merge), deployment count (however you deploy), and a simple happiness pulse. These require minimal tooling. 3. Build the foundation (Month 1-2): Get CI/CD in place, automate deployment tracking, implement basic incident logging. These are prerequisites for meaningful DORA metrics — and they deliver value independently. 4. Graduate to DORA (Month 3-4): Once automated data sources exist, DORA metrics become meaningful. Add deployment frequency, lead time for changes, change failure rate, and MTTR. 5. Evolve beyond DORA (Month 6+): DORA captures throughput and stability but misses developer experience, learning, and innovation. Add developer satisfaction surveys and outcome metrics when DORA is well-established.",
        "commonMistakes": "Implementing DORA metrics without the tooling to generate accurate data. Manually tracking DORA metrics (defeats the purpose). Treating DORA as the only metrics needed (misses satisfaction, learning). Jumping to complex frameworks before basic measurement discipline exists. Telling leadership 'we can't measure anything' instead of proposing a maturity-appropriate starting point.",
        "whatGoodLooksLike": "Honest conversation with leadership about current maturity within 1 week. Maturity-appropriate metrics live within 3 weeks. CI/CD and deployment automation improved as a side benefit. DORA metrics implemented with real data by month 4. Team trusts the metrics because they've been involved in building the measurement system from the start. Nathen Harvey's insight from 'Are DORA metrics right for your team': DORA requires automated data collection as a prerequisite — without it, you're measuring fiction.",
        "mappingNotes": "Metrics framework maturity selection scenario",
        "suggestedMetricIds": ["2.1", "1.2"]
    },
]

# ── NEW CALIBRATION SIGNALS ─────────────────────────────────────────
# Add signals that capture the article insights in calibration language

new_calibration_signals = [
    # C2: OKR and prioritization maturity
    {"id": "SIG-261", "observableId": "C2-O5", "capabilityId": "C2",
     "signalText": "Prioritization discipline: 'Killed 2 in-flight projects mid-quarter when outcome data showed <10% of projected impact — reallocated team to higher-ROI work, stakeholders aligned within 1 week'",
     "signalType": "metric", "sourceSubTopic": "Outcome-Driven Prioritization"},
    {"id": "SIG-262", "observableId": "C2-O6", "capabilityId": "C2",
     "signalText": "Goal-setting maturity: 'Team co-creates OKRs with measurable outcomes (not task lists) — 85% key result achievement rate, zero OKRs with dependencies on other teams without explicit agreements'",
     "signalType": "calibration_language", "sourceSubTopic": "OKR Design Quality"},

    # C8: Incident readiness and risk management
    {"id": "SIG-263", "observableId": "C8-O7", "capabilityId": "C8",
     "signalText": "Incident readiness: 'Pre-wrote failure playbooks for top 5 risk scenarios — when first major incident hit, team responded in 12 minutes using the playbook vs. estimated 2+ hours without it'",
     "signalType": "metric", "sourceSubTopic": "Pre-Incident Preparation"},
    {"id": "SIG-264", "observableId": "C8-O2", "capabilityId": "C8",
     "signalText": "On-call health: 'Reduced alert noise 70% by triaging all alerts (actionable vs. noise) — on-call pages dropped from 15/week to 3, zero requests to leave rotation in Q4'",
     "signalType": "metric", "sourceSubTopic": "On-Call Sustainability"},
    {"id": "SIG-265", "observableId": "C8-O3", "capabilityId": "C8",
     "signalText": "Post-mortem effectiveness: 'Post-mortem action item completion rate 90% — repeat incidents from same root cause dropped to zero in Q3, team views post-mortems as valuable learning, not bureaucracy'",
     "signalType": "metric", "sourceSubTopic": "Post-Mortem Quality"},

    # C9: Metrics maturity
    {"id": "SIG-266", "observableId": "C9-O9", "capabilityId": "C9",
     "signalText": "Anti-gaming design: 'Replaced single deployment frequency target with paired metrics (DF + CFR + PR size) — gaming stopped, team engaged with metrics as diagnostic tools, identified genuine bottleneck in code review turnaround'",
     "signalType": "calibration_language", "sourceSubTopic": "Metric Pairing for Integrity"},

    # C11: Hiring
    {"id": "SIG-267", "observableId": "C11-O10", "capabilityId": "C11",
     "signalText": "EVP differentiation: 'Articulated mission-driven value proposition emphasizing impact per engineer and career velocity — won 6 of 8 competing offers despite 20% lower total comp, all hires thriving at 12 months'",
     "signalType": "calibration_language", "sourceSubTopic": "Employer Value Proposition"},
    {"id": "SIG-268", "observableId": "C11-O11", "capabilityId": "C11",
     "signalText": "Pipeline diagnosis: 'Identified interviewer miscalibration as root cause of 4-month hiring drought — recalibrated team using mock interviews, first offer extended within 3 weeks of fix'",
     "signalType": "metric", "sourceSubTopic": "Hiring Pipeline Diagnosis"},

    # C14: Performance reviews
    {"id": "SIG-269", "observableId": "C14-O1", "capabilityId": "C14",
     "signalText": "Calibration preparation: 'Ran pre-calibration sessions with peer managers to identify bias and inconsistency before formal calibration — eliminated 3 instances of recency bias and 2 of similarity bias across the group'",
     "signalType": "calibration_language", "sourceSubTopic": "Pre-Calibration Quality"},
    {"id": "SIG-270", "observableId": "C14-O7", "capabilityId": "C14",
     "signalText": "Feedback distillation: 'Trained myself to distill each review into one sentence the engineer will remember — feedback retention (measured in follow-up 1:1s) improved from ~40% to ~85%'",
     "signalType": "metric", "sourceSubTopic": "Feedback Clarity"},

    # C1: Reorg navigation
    {"id": "SIG-271", "observableId": "C1-O4", "capabilityId": "C1",
     "signalText": "Reorg leadership: 'Led team through 2 reorgs in 18 months — addressed belonging, predictability, and significance needs proactively through personalized 1:1s, zero regrettable attrition during either transition'",
     "signalType": "calibration_language", "sourceSubTopic": "Organizational Change Navigation"},

    # C5: Cross-team collaboration
    {"id": "SIG-272", "observableId": "C5-O1", "capabilityId": "C5",
     "signalText": "Cross-team quick wins: 'Started new cross-team partnership by identifying 3 low-friction quick wins — delivered in first 2 weeks, built trust foundation that enabled successful 6-month platform migration'",
     "signalType": "calibration_language", "sourceSubTopic": "Cross-Team Trust Building"},

    # C6: IC development
    {"id": "SIG-273", "observableId": "C6-O1", "capabilityId": "C6",
     "signalText": "Non-technical coaching: 'Coached senior engineer on scope breakdown and stakeholder communication — not just code quality — resulting in first independently-led cross-team project, promotion case built naturally'",
     "signalType": "calibration_language", "sourceSubTopic": "Whole-Engineer Development"},

    # C3: Tech debt
    {"id": "SIG-274", "observableId": "C3-O11", "capabilityId": "C3",
     "signalText": "Tech debt business case: 'Categorized tech debt by type (velocity-blocking, risk-amplifying, cost-inflating) — business case showed top 3 items costing $600K/year in workarounds, secured dedicated 20% capacity allocation'",
     "signalType": "metric", "sourceSubTopic": "Tech Debt Categorization"},
]

# ── APPLY ALL ADDITIONS ─────────────────────────────────────────────
print("=== Applying Session 6 Enrichments ===")

interview_qs.extend(new_interview_qs)
save('src/data/interview-questions.json', interview_qs)
print(f"  Added {len(new_interview_qs)} interview questions (total: {len(interview_qs)})")

playbooks.extend(new_playbooks)
save('src/data/playbooks.json', playbooks)
print(f"  Added {len(new_playbooks)} playbooks (total: {len(playbooks)})")

calibration_signals.extend(new_calibration_signals)
save('src/data/calibration-signals.json', calibration_signals)
print(f"  Added {len(new_calibration_signals)} calibration signals (total: {len(calibration_signals)})")

# ── UPDATE SEARCH INDEX ─────────────────────────────────────────────
# Add new playbooks to search index
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
save('src/data/search-index.json', search_index)
print(f"  Updated search index (total: {len(search_index)})")

# ── UPDATE REVIEW PROGRESS ──────────────────────────────────────────
import os
progress_path = 'reference/review-progress.json'
if os.path.exists(progress_path):
    progress = load(progress_path)
    progress['sessions'].append({
        "session": 6,
        "date": "2026-02-20",
        "focus": "Depth enrichment: IQs for C2/C8/C11/C3/C6, Playbooks for C8/C9",
        "articlesReviewed": 14,
        "additions": {
            "interviewQuestions": len(new_interview_qs),
            "playbooks": len(new_playbooks),
            "calibrationSignals": len(new_calibration_signals),
        },
        "capabilitiesEnriched": ["C1", "C2", "C3", "C5", "C6", "C8", "C9", "C11", "C14"],
        "coverageImpact": {
            "C2": "IQ: 4→8",
            "C8": "IQ: 4→8, PB: 3→5",
            "C11": "IQ: 4→8",
            "C3": "IQ: 6→8",
            "C6": "IQ: 6→8",
            "C9": "PB: 3→5",
        },
        "notes": "Selective enrichment based on critical reading of 14 LeadDev articles. Focused on capabilities with thinnest interview question and playbook coverage. Added based on genuine insight value, not just coverage gaps."
    })
    # Update totals
    progress['totalAdditions']['interviewQuestions'] = progress['totalAdditions'].get('interviewQuestions', 0) + len(new_interview_qs)
    progress['totalAdditions']['playbooks'] = progress['totalAdditions'].get('playbooks', 0) + len(new_playbooks)
    progress['totalAdditions']['calibrationSignals'] = progress['totalAdditions'].get('calibrationSignals', 0) + len(new_calibration_signals)
    progress['grandTotal'] = progress.get('grandTotal', 0) + len(new_interview_qs) + len(new_playbooks) + len(new_calibration_signals)
    progress['metadata']['lastUpdated'] = "2026-02-20"
    progress['dataFileTotals']['interviewQuestions'] = len(interview_qs)
    progress['dataFileTotals']['playbooks'] = len(playbooks)
    progress['dataFileTotals']['calibrationSignals'] = len(calibration_signals)
    progress['dataFileTotals']['searchIndex'] = len(search_index)
    save(progress_path, progress)

print("\n=== Session 6 Summary ===")
print(f"Interview Questions: +{len(new_interview_qs)} (C2:4, C8:4, C11:4, C3:2, C6:2)")
print(f"Playbooks: +{len(new_playbooks)} (C8:2, C9:2)")
print(f"Calibration Signals: +{len(new_calibration_signals)}")
print(f"Total additions: {len(new_interview_qs) + len(new_playbooks) + len(new_calibration_signals)}")
print(f"\nArticles critically reviewed: 14")
print(f"Key sources: RFC guide (Buriticá), Chaos eng (Fong-Jones),")
print(f"  Playbook risk method (Zunger), Metrics pairings,")
print(f"  IC development failures, Reorg navigation (Wilde),")
print(f"  OKR mistakes, Hiring EVP, Performance reviews (Patel)")

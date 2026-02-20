#!/usr/bin/env python3
"""
Enrich EM framework data files - Sessions 2-5.
Session 2: C13 (Security), C11 (Hiring)
Session 3: C4 (Operational), C9 (Metrics)
Session 4: C1, C3, C5, C6 (depth scan)
Session 5: AI-era enrichment
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

observables = load('src/data/observables.json')
anti_patterns = load('src/data/anti-patterns.json')
playbooks = load('src/data/playbooks.json')
interview_qs = load('src/data/interview-questions.json')
calibration_signals = load('src/data/calibration-signals.json')

# ── NEW OBSERVABLES ─────────────────────────────────────────────────

new_observables = [
    # C13: Security & Compliance (was 4, adding 3 → 7)
    {
        "id": "C13-O5",
        "capabilityId": "C13",
        "shortText": "Embeds security champions within the team who own security awareness and review practices",
        "slug": "embeds-security-champions-within-the-team",
        "fullExample": "Rotates a security champion role quarterly among senior engineers, who attend security guild meetings, review threat models for new features, and run quarterly security training for the team.",
        "evidenceTypes": ["process_artifact", "peer_feedback"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs establish team-level security champion rotation; Directors ensure coverage across all teams in their org",
        "why": "Security can't be solely the security team's job — distributed champions create security muscle memory in every team and catch issues at development time, not at audit time",
        "how": "Rotate security champion role quarterly; have champion attend security guild; integrate threat modeling into design reviews; run quarterly security awareness sessions; track vulnerability SLA compliance",
        "expectedResult": "Vulnerabilities caught earlier in development cycle; security review turnaround faster; team has baseline security literacy; audit findings decrease over time",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-229",
                "observableId": "C13-O5",
                "capabilityId": "C13",
                "signalText": "Security champion program: 'Established rotating security champion role — vulnerability detection shifted 60% leftward (caught in code review vs. production scanning)'",
                "signalType": "metric",
                "sourceSubTopic": "Security Champions"
            }
        ]
    },
    {
        "id": "C13-O6",
        "capabilityId": "C13",
        "shortText": "Integrates automated security scanning into CI/CD pipeline with severity-based deployment gates",
        "slug": "integrates-automated-security-scanning-into-cicd-pipeline",
        "fullExample": "Pipeline includes SAST, dependency scanning, and container image scanning. Critical/High vulnerabilities block deployment automatically. Medium vulnerabilities create tracked tickets with 30-day SLA.",
        "evidenceTypes": ["dashboard", "process_artifact"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs ensure their team's pipelines have security gates; Directors set org-wide security scanning standards",
        "why": "Manual security reviews don't scale and create deployment bottlenecks; automated scanning catches known vulnerability patterns consistently without human toil",
        "how": "Add SAST/DAST tools to CI/CD; configure severity-based gates; track false positive rates; maintain vulnerability SLA dashboard; review and tune scanning rules quarterly",
        "expectedResult": "Zero critical/high vulnerabilities reach production; vulnerability remediation time predictable; security doesn't bottleneck deployments; compliance evidence generated automatically",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-230",
                "observableId": "C13-O6",
                "capabilityId": "C13",
                "signalText": "Automated security gates: 'Implemented automated security scanning in CI/CD — blocked 15 critical vulnerabilities from reaching production in Q3, zero manual security review bottlenecks'",
                "signalType": "metric",
                "sourceSubTopic": "Automated Security Scanning"
            }
        ]
    },
    {
        "id": "C13-O7",
        "capabilityId": "C13",
        "shortText": "Conducts threat modeling for features touching sensitive data, authentication, or external interfaces",
        "slug": "conducts-threat-modeling-for-sensitive-features",
        "fullExample": "Before launching a new payment integration, leads a STRIDE-based threat model session with the team, identifies 4 attack vectors, implements mitigations, and documents accepted risks with business justification.",
        "evidenceTypes": ["design_doc", "decision_doc"],
        "defaultWeight": 0.08,
        "requiredFrequency": "episodic",
        "emRelevance": "Medium",
        "directorRelevance": "High",
        "levelNotes": "EMs ensure threat modeling happens for their team's sensitive features; Directors establish org-wide threat modeling requirements",
        "why": "Threat modeling catches design-level security flaws that no amount of code scanning can find — it's cheaper to fix security issues in design than in production",
        "how": "Require threat models for features touching auth, payments, PII, or external APIs; use STRIDE or similar framework; document threats, mitigations, and accepted risks; review with security team",
        "expectedResult": "Design-level security flaws caught before code is written; security team engaged as partners, not gatekeepers; compliance evidence for audit readiness; no 'we didn't think about that' security incidents",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-231",
                "observableId": "C13-O7",
                "capabilityId": "C13",
                "signalText": "Proactive threat modeling: 'Required threat models for all features touching PII — identified and mitigated 8 design-level vulnerabilities before code was written, zero security incidents from new features'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Threat Modeling Practice"
            }
        ]
    },

    # C11: Hiring, Onboarding & Role Design (was 8, adding 3 → 11)
    {
        "id": "C11-O9",
        "capabilityId": "C11",
        "shortText": "Designs structured interview processes with rubrics that evaluate demonstrated competencies over pedigree",
        "slug": "designs-structured-interviews-evaluating-competencies-over-pedigree",
        "fullExample": "Replaces 'culture fit' assessment with structured behavioral questions mapped to role competencies. Every interviewer uses the same rubric. Scoring happens independently before debrief to prevent anchoring.",
        "evidenceTypes": ["process_artifact", "decision_doc"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs design and maintain team interview processes; Directors ensure consistency and fairness across teams",
        "why": "Unstructured interviews are poor predictors of job performance and amplify bias — structured rubrics improve both prediction accuracy and fairness",
        "how": "Map role requirements to interview questions; create scoring rubrics with concrete behavioral anchors; train interviewers on rubric use; collect scores independently before debrief; audit for demographic patterns",
        "expectedResult": "Hiring decisions more predictable; bias reduced measurably; interviewer calibration improved; quality-of-hire metrics trend positive; candidate experience is consistent",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-232",
                "observableId": "C11-O9",
                "capabilityId": "C11",
                "signalText": "Structured hiring process: 'Replaced unstructured interviews with competency-mapped rubrics — interviewer agreement rate improved from 55% to 85%, regrettable hires dropped 40%'",
                "signalType": "metric",
                "sourceSubTopic": "Structured Interview Design"
            }
        ]
    },
    {
        "id": "C11-O10",
        "capabilityId": "C11",
        "shortText": "Builds competitive hiring strategy that wins talent without solely competing on compensation",
        "slug": "builds-competitive-hiring-strategy-beyond-compensation",
        "fullExample": "When competing against FAANG offers, articulates differentiated value proposition: faster career growth, higher impact per engineer, meaningful product ownership. Pairs with competitive (if not top-of-market) compensation and strong employer branding.",
        "evidenceTypes": ["planning_artifact", "decision_doc"],
        "defaultWeight": 0.06,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs craft team-level employer value proposition; Directors design org-level talent acquisition strategy",
        "why": "Most companies can't match top-of-market compensation — sustainable hiring requires differentiated value propositions that attract candidates whose priorities align with what you can offer",
        "how": "Articulate what your team uniquely offers (impact, growth, autonomy, mission); build employer brand through tech blog, open source, conference talks; target candidates whose priorities match your strengths; train hiring managers on value proposition delivery",
        "expectedResult": "Offer acceptance rate competitive despite lower total compensation; hires aligned to team values and growth trajectory; reduced recruiter dependency; stronger employer brand",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-233",
                "observableId": "C11-O10",
                "capabilityId": "C11",
                "signalText": "Hiring strategy maturity: 'Built differentiated hiring pitch emphasizing career velocity and impact — offer acceptance rate 75% despite 15% below FAANG compensation, 90% retention at 1 year'",
                "signalType": "metric",
                "sourceSubTopic": "Competitive Hiring Strategy"
            }
        ]
    },
    {
        "id": "C11-O11",
        "capabilityId": "C11",
        "shortText": "Measures and optimizes hiring funnel conversion rates with data-driven pipeline management",
        "slug": "measures-and-optimizes-hiring-funnel-conversion-rates",
        "fullExample": "Tracks conversion rates at each hiring stage (sourcing → screen → onsite → offer → accept). Identifies bottlenecks, A/B tests improvements, and shares pipeline health with leadership weekly.",
        "evidenceTypes": ["dashboard", "planning_artifact"],
        "defaultWeight": 0.06,
        "requiredFrequency": "ongoing",
        "emRelevance": "Medium",
        "directorRelevance": "High",
        "levelNotes": "EMs track team hiring pipeline health; Directors optimize org-wide funnel and identify systemic bottlenecks",
        "why": "Without funnel data, hiring feels like black magic — conversion rate tracking reveals specific bottlenecks and enables targeted improvements instead of throwing more candidates at a broken process",
        "how": "Instrument hiring funnel stages; track conversion rates weekly; identify stages with largest drop-off; experiment with improvements; track time-to-fill alongside quality-of-hire; audit for demographic disparities at each stage",
        "expectedResult": "Hiring timeline predictable; bottlenecks identified and addressed; leadership has visibility into pipeline health; time-to-fill decreasing; no demographic drop-off patterns at specific stages",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-234",
                "observableId": "C11-O11",
                "capabilityId": "C11",
                "signalText": "Pipeline optimization: 'Instrumented hiring funnel — identified 60% drop-off at technical screen, redesigned assessment format, improved conversion to 45%, reduced time-to-fill from 65 to 40 days'",
                "signalType": "metric",
                "sourceSubTopic": "Hiring Pipeline Analytics"
            }
        ]
    },

    # C4: Operational Leadership & Rhythm (was 11, adding 2 → 13)
    {
        "id": "C4-O12",
        "capabilityId": "C4",
        "shortText": "Diagnoses and resolves engineering velocity bottlenecks using systemic analysis, not just process changes",
        "slug": "diagnoses-velocity-bottlenecks-using-systemic-analysis",
        "fullExample": "When team velocity drops, maps the entire value stream from idea to production, identifies specific bottleneck (code review turnaround was 3 days), implements targeted fix (review SLA + pairing rotation), and measures improvement.",
        "evidenceTypes": ["dashboard", "retrospective_output"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs diagnose team-level velocity issues; Directors identify org-level systemic bottlenecks across teams",
        "why": "Velocity problems rarely have a single cause — systemic analysis prevents whack-a-mole process changes that shift bottlenecks instead of resolving them",
        "how": "Map value stream end-to-end; measure time at each stage; identify largest wait times; distinguish between flow time and work time; target the constraint, not the symptom; measure post-intervention",
        "expectedResult": "Velocity improvements sustained (not temporary); team understands their own flow; bottlenecks resolved rather than shifted; cycle time trending down with stable quality",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-235",
                "observableId": "C4-O12",
                "capabilityId": "C4",
                "signalText": "Velocity diagnosis: 'Value stream mapped end-to-end — identified code review turnaround (3 day avg) as primary bottleneck, implemented review SLA and pairing rotation, reduced to 6 hours, overall cycle time improved 40%'",
                "signalType": "metric",
                "sourceSubTopic": "Velocity Bottleneck Analysis"
            }
        ]
    },
    {
        "id": "C4-O13",
        "capabilityId": "C4",
        "shortText": "Protects maker time with structural calendar policies ensuring engineers have 4+ hours of uninterrupted focus daily",
        "slug": "protects-maker-time-with-structural-calendar-policies",
        "fullExample": "Establishes meeting-free mornings, consolidates ceremonies into 2 days per week, defaults to async for status updates, and tracks focus time as a team health metric. Engineers report 5+ hours of focus time daily.",
        "evidenceTypes": ["team_survey", "process_artifact"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs protect team-level focus time; Directors set org-wide meeting norms and audit calendar health across teams",
        "why": "Context-switching is the biggest hidden tax on engineering productivity — a 30-minute meeting in the middle of a focus block costs 2+ hours of deep work productivity",
        "how": "Audit team calendars for focus blocks; establish meeting-free windows; consolidate ceremonies; default to async for status updates; track focus time as metric; model the behavior yourself",
        "expectedResult": "Engineers report 4+ hours of daily uninterrupted focus time; deep work improves; complex problems get solved; team satisfaction with working conditions increases",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-236",
                "observableId": "C4-O13",
                "capabilityId": "C4",
                "signalText": "Focus time protection: 'Established meeting-free mornings and async-first status updates — engineer focus time increased from 2.5 to 5 hours/day, complex feature delivery improved 35%'",
                "signalType": "metric",
                "sourceSubTopic": "Focus Time Protection"
            }
        ]
    },

    # C9: Metrics, Measurement & Outcomes (was 8, adding 2 → 10)
    {
        "id": "C9-O9",
        "capabilityId": "C9",
        "shortText": "Uses metric pairings to prevent single-metric optimization — always balances speed with quality",
        "slug": "uses-metric-pairings-to-prevent-single-metric-optimization",
        "fullExample": "Pairs deployment frequency with change failure rate; pairs cycle time with customer-reported bugs; pairs velocity with tech debt ratio. Never reports a speed metric without its quality counterpart.",
        "evidenceTypes": ["dashboard", "planning_artifact"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs implement paired metrics for their team; Directors establish org-wide metric pairing standards",
        "why": "Single metrics are gameable and misleading — metric pairs create natural guardrails that prevent optimizing one dimension at the cost of another",
        "how": "For every speed metric, pair with a quality metric; for every throughput metric, pair with a sustainability metric; present paired metrics together in dashboards and reviews; investigate when pairs diverge",
        "expectedResult": "No gaming of individual metrics; balanced delivery; quality doesn't degrade when speed improves; leadership gets accurate picture of team health",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-237",
                "observableId": "C9-O9",
                "capabilityId": "C9",
                "signalText": "Balanced measurement: 'Implemented paired metrics dashboard — deployment frequency improved 40% while change failure rate remained stable, preventing the velocity-quality tradeoff'",
                "signalType": "metric",
                "sourceSubTopic": "Metric Pairings"
            }
        ]
    },
    {
        "id": "C9-O10",
        "capabilityId": "C9",
        "shortText": "Adapts metric sophistication to organizational maturity — starts simple and evolves based on decisions driven",
        "slug": "adapts-metric-sophistication-to-organizational-maturity",
        "fullExample": "For a new team, starts with 3 core metrics (cycle time, deployment frequency, change failure rate). Adds developer satisfaction surveys after 1 quarter. Introduces SPACE framework dimensions only after basic metrics drive consistent decisions.",
        "evidenceTypes": ["dashboard", "planning_artifact"],
        "defaultWeight": 0.06,
        "requiredFrequency": "quarterly",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs calibrate team metric sophistication; Directors establish org-wide metrics maturity roadmap",
        "why": "Teams that jump to complex metrics frameworks before building basic measurement discipline end up with death-by-metrics; starting simple and evolving based on decisions driven ensures metrics remain useful, not burdensome",
        "how": "Start with 3-5 core metrics; ask monthly 'what decision did this metric inform?'; retire unused metrics; add new metrics only when team demonstrates they use existing ones; evolve toward SPACE/DORA as maturity increases",
        "expectedResult": "Metrics actually drive decisions (not just dashboards); team engaged with measurement rather than resenting it; metric overhead proportional to value delivered; no 'death by metrics' syndrome",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-238",
                "observableId": "C9-O10",
                "capabilityId": "C9",
                "signalText": "Metrics maturity: 'Started with 3 core metrics, retired 2 that weren't driving decisions, added developer satisfaction survey after Q2 — every active metric informed at least one decision per quarter'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Metrics Maturity Evolution"
            }
        ]
    },

    # C3: Systems Design & Architecture (was 10, adding 1 → 11)
    {
        "id": "C3-O11",
        "capabilityId": "C3",
        "shortText": "Quantifies tech debt impact in business terms and maintains a prioritized tech debt backlog with ROI justification",
        "slug": "quantifies-tech-debt-in-business-terms-with-roi-justification",
        "fullExample": "Maintains a tech debt registry where each item has estimated cost-of-delay, risk rating, and remediation cost. Presents quarterly tech debt report to leadership in business terms: 'This tech debt item costs us 2 engineer-days per sprint in workarounds and has caused 3 incidents.'",
        "evidenceTypes": ["planning_artifact", "dashboard"],
        "defaultWeight": 0.06,
        "requiredFrequency": "quarterly",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs maintain team-level tech debt visibility; Directors advocate for tech debt investment at org level with business justification",
        "why": "Tech debt is invisible until it causes incidents or blocks features — making it visible in business terms enables informed investment decisions rather than emergency firefighting",
        "how": "Maintain tech debt registry with business impact estimates; categorize by risk (security, reliability, velocity); present in business terms; include tech debt in quarterly planning alongside features; track remediation ROI",
        "expectedResult": "Tech debt investment is deliberate, not reactive; leadership understands tech debt impact in business terms; tech debt ratio stable or improving; fewer 'surprise' incidents from accumulated debt",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-239",
                "observableId": "C3-O11",
                "capabilityId": "C3",
                "signalText": "Tech debt management: 'Maintained quantified tech debt registry — business case for top 3 items showed $500K/year in engineering productivity savings, secured 20% capacity allocation for remediation'",
                "signalType": "metric",
                "sourceSubTopic": "Tech Debt Quantification"
            }
        ]
    },

    # C5: Cross-Functional Influence (was 15, adding 1 → 16)
    {
        "id": "C5-O16",
        "capabilityId": "C5",
        "shortText": "Maintains alignment with product and design through regular triad syncs and shared success metrics",
        "slug": "maintains-triad-alignment-through-regular-syncs-and-shared-metrics",
        "fullExample": "Weekly 30-minute triad sync with PM and Design lead. Shared OKRs (not separate Eng/PM OKRs). Joint quarterly retrospective. When disagreements arise, resolves within the triad before escalating.",
        "evidenceTypes": ["1_1_notes", "planning_artifact"],
        "defaultWeight": 0.06,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs maintain team-level triad health; Directors ensure triad model adopted across their org",
        "why": "Most cross-functional friction stems from misaligned incentives and infrequent communication — regular triad alignment prevents the adversarial dynamic that derails delivery",
        "how": "Establish weekly triad sync; create shared success metrics; resolve disagreements within triad first; run joint retros quarterly; build personal relationship with PM and Design counterparts",
        "expectedResult": "No 'us vs them' dynamic between Eng, PM, and Design; shared ownership of outcomes; disagreements resolved quickly; team sees unified leadership",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-240",
                "observableId": "C5-O16",
                "capabilityId": "C5",
                "signalText": "Triad health signal: 'Established shared OKRs and weekly triad syncs with PM and Design — cross-functional escalations dropped from 5/quarter to 0, joint retro satisfaction 4.5/5'",
                "signalType": "metric",
                "sourceSubTopic": "Product Triad Alignment"
            }
        ]
    },

    # C6: Coaching & Talent Development (was 12, adding 1 → 13)
    {
        "id": "C6-O13",
        "capabilityId": "C6",
        "shortText": "Creates clear career pathways for engineers at all levels, including IC and management tracks",
        "slug": "creates-clear-career-pathways-including-ic-and-management-tracks",
        "fullExample": "Maintains documented career ladder with specific expectations per level. Helps engineers choose between IC and management tracks based on strengths and interests. Creates explicit pathways for Staff+ ICs alongside management progression.",
        "evidenceTypes": ["career_plan", "decision_doc"],
        "defaultWeight": 0.06,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs guide individual career conversations; Directors ensure career framework exists and is applied consistently",
        "why": "Without clear pathways, engineers guess at what's needed for promotion, high performers stall, and the management track becomes the only perceived path to growth — losing your best ICs to management roles they don't want",
        "how": "Document expectations per level for both IC and management tracks; discuss career paths in 1:1s; help engineers choose the right track; create stretch assignments aligned to next-level expectations; review and update framework annually",
        "expectedResult": "Engineers understand what's needed for advancement; both IC and management tracks valued equally; promotions feel predictable and fair; fewer 'accidental managers' (ICs who manage because it was the only path to growth)",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-241",
                "observableId": "C6-O13",
                "capabilityId": "C6",
                "signalText": "Career pathway clarity: 'Documented explicit IC and management career tracks — 100% of reports have active career plans, Staff IC track adopted by 3 engineers who would have otherwise become reluctant managers'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Career Pathway Design"
            }
        ]
    },
]

# ── NEW ANTI-PATTERNS ──────────────────────────────────────────────

new_anti_patterns = [
    # C13
    {
        "id": "AP-45",
        "name": "The Checkbox Audit",
        "slug": "the-checkbox-audit",
        "observableIds": ["C13-O3", "C13-O4"],
        "capabilityId": "C13",
        "shortDesc": "EM treats security and compliance as a checklist exercise, achieving minimal technical compliance without genuine security posture improvement",
        "warningSigns": "Security reviews are copy-paste from templates; compliance evidence collected only during audit prep; security training is annual checkbox with no retention; same audit findings recur year after year; security champion role is ceremonial",
        "impact": "False sense of security; vulnerabilities accumulate behind green compliance checkmarks; audit findings repeat because root causes aren't addressed; team develops no security intuition; real security incidents expose the gap between compliance and actual security",
        "recoveryActions": "Shift from compliance-driven to threat-driven security. Automate evidence collection continuously. Make security posture visible daily, not annually. Track unique audit findings (repeat findings = checkbox approach). Require genuine threat models, not template copies. Netflix's security approach treats compliance as a byproduct of strong security posture, not the goal — continuous monitoring replaces periodic audits.",
        "sourceTopic": "Security & Compliance Posture",
        "mappingNotes": "Checkbox audit → continuous compliance / automated evidence observables"
    },

    # C11
    {
        "id": "AP-46",
        "name": "The Vibes-Based Hire",
        "slug": "the-vibes-based-hire",
        "observableIds": ["C11-O1", "C11-O9"],
        "capabilityId": "C11",
        "shortDesc": "EM relies on gut feeling and 'culture fit' rather than structured evaluation, leading to biased and unpredictable hiring outcomes",
        "warningSigns": "Interview feedback uses subjective language ('not a good fit', 'seems sharp', 'I liked them'); no scoring rubrics; debrief decisions driven by loudest interviewer; interviewers not calibrated; 'culture fit' assessment has no defined criteria; hire rate correlates with candidate similarity to existing team",
        "impact": "Inconsistent hiring quality; unconscious bias amplified; diverse candidates systematically disadvantaged; regrettable hires increase; team composition becomes homogeneous; legal risk from undocumented decision criteria",
        "recoveryActions": "Implement structured rubrics with behavioral anchors for every interview stage. Require independent scoring before debrief. Replace 'culture fit' with specific behavioral criteria ('culture add'). Train all interviewers on rubric use and bias awareness. Audit hire/reject patterns by demographic. Google's structured interviewing program requires predefined rubrics and independent scoring, reducing hiring variance by 40% compared to unstructured interviews.",
        "sourceTopic": "Talent Acquisition & Team Building",
        "mappingNotes": "Vibes-based hire → structured interview / competency rubric observables"
    },

    # C4
    {
        "id": "AP-47",
        "name": "Process Cargo Cult",
        "slug": "process-cargo-cult",
        "observableIds": ["C4-O1", "C4-O7"],
        "capabilityId": "C4",
        "shortDesc": "EM adopts agile ceremonies and processes by name without understanding their purpose, running rituals that deliver no value",
        "warningSigns": "Standups are status reports to the manager (not team coordination); retros generate the same action items every sprint (never completed); sprint planning is task assignment (not collaborative estimation); team does 'scrum' but can't explain why any ceremony exists; ceremonies take up 30%+ of the week; process was adopted wholesale from another team without adaptation",
        "impact": "Team resents process as overhead; ceremonies consume time without value; engineers work around the process instead of through it; agile transformation fails because the form is adopted without the substance; velocity decreases as process overhead increases",
        "recoveryActions": "For every ceremony, ask: 'What problem does this solve for our team?' If no one can answer, cancel it. Adapt ceremonies to your team's actual needs (not the textbook version). Measure ceremony value: does the retro generate completed action items? Does standup unblock people? Kill low-value ceremonies and see if anyone notices. Spotify evolved away from textbook Scrum because they adapted processes to squad needs rather than following prescriptive frameworks — each squad chose the practices that actually worked for them.",
        "sourceTopic": "Operational Leadership & Rhythm",
        "mappingNotes": "Process cargo cult → ceremony value / operational cadence observables"
    },

    # C9
    {
        "id": "AP-48",
        "name": "The Lagging-Only Dashboard",
        "slug": "the-lagging-only-dashboard",
        "observableIds": ["C9-O1", "C9-O9"],
        "capabilityId": "C9",
        "shortDesc": "EM only tracks lagging indicators (incidents, attrition, missed deadlines) and never has early warning signals for emerging problems",
        "warningSigns": "Dashboard shows outcomes (deployment frequency, MTTR, attrition) but no predictive signals; team finds out about problems only after incidents or missed deadlines; no developer experience surveys; no leading indicators for team health; every problem feels like a surprise; metrics are retrospective, never prospective",
        "impact": "Every problem is discovered too late for cheap intervention; firefighting replaces prevention; team and leadership feel like they're always reacting; confidence in measurement erodes because metrics only confirm what everyone already knew; proactive management impossible",
        "recoveryActions": "For every lagging indicator, identify a leading counterpart: attrition → engagement survey scores; incidents → error budget consumption rate; missed deadlines → sprint burndown trajectory. Make leading indicators the primary dashboard and lagging indicators the validation. Review leading indicators weekly, lagging indicators monthly. Google's DORA team explicitly distinguishes leading (deployment frequency, lead time) from lagging (change failure rate, MTTR) metrics, using pairs to enable both prediction and validation.",
        "sourceTopic": "Metrics, Measurement & Outcomes",
        "mappingNotes": "Lagging-only dashboard → metric pairing / leading indicator observables"
    },

    # C3
    {
        "id": "AP-49",
        "name": "The Invisible Tech Debt",
        "slug": "the-invisible-tech-debt",
        "observableIds": ["C3-O4", "C3-O11"],
        "capabilityId": "C3",
        "shortDesc": "tech debt accumulates invisibly because it's never quantified, tracked, or communicated to stakeholders in business terms",
        "warningSigns": "No tech debt registry or backlog; tech debt only discussed when it causes incidents; engineers complain about tech debt but leadership doesn't see it; planning cycles have no tech debt allocation; 'we'll address it later' is the perpetual response; tech debt remediation is guerrilla work done without visibility",
        "impact": "Tech debt compounds silently until it blocks feature delivery or causes major incidents; engineering credibility suffers when 'suddenly' velocity drops; leadership blindsided by tech debt crisis; tech debt remediation never prioritized because its cost is invisible",
        "recoveryActions": "Create a tech debt registry with business impact estimates. Quantify each item: 'This debt costs us X engineer-days per sprint in workarounds and creates Y risk of incidents.' Present quarterly tech debt report to leadership. Secure explicit capacity allocation (minimum 15-20% of engineering time). Track remediation ROI to justify continued investment. Amazon includes tech debt in their PRFAQ process — every initiative must account for the debt it creates and the plan to manage it.",
        "sourceTopic": "Systems Design & Architecture",
        "mappingNotes": "Invisible tech debt → tech debt quantification / business-terms communication observables"
    },

    # C5
    {
        "id": "AP-50",
        "name": "The Silo Builder",
        "slug": "the-silo-builder",
        "observableIds": ["C5-O1", "C5-O16"],
        "capabilityId": "C5",
        "shortDesc": "EM optimizes for their team's local success at the expense of cross-team collaboration and org-wide outcomes",
        "warningSigns": "Team builds custom solutions rather than contributing to shared platforms; EM hoards information that would help other teams; team's velocity is high but cross-team projects stall; EM avoids cross-team meetings; team's success metrics disconnected from org goals; 'not my team's problem' is a common response to cross-team requests",
        "impact": "Duplicated effort across teams; cross-team initiatives fail; other teams can't depend on your team; EM's reputation suffers despite strong local results; eventually leadership intervenes to force collaboration; org-level outcomes suffer while team-level metrics look great",
        "recoveryActions": "Tie team success metrics to org-level outcomes, not just team-level velocity. Participate actively in cross-team forums. Contribute to shared platforms even when it's not the fastest path for your team. Track cross-team dependencies and proactively unblock them. Ask: 'Would a peer team describe us as good partners?' Spotify's squad model works because squads are measured on shared outcomes, not just squad-level metrics — squad health checks include collaboration with other squads.",
        "sourceTopic": "Cross-Functional Partnership",
        "mappingNotes": "Silo builder → cross-team collaboration / triad alignment observables"
    },

    # C6
    {
        "id": "AP-51",
        "name": "The Accidental Manager",
        "slug": "the-accidental-manager",
        "observableIds": ["C6-O1", "C6-O13"],
        "capabilityId": "C6",
        "shortDesc": "someone promoted into management because they were the best IC, without any management training, coaching, or support — and expected to figure it out",
        "warningSigns": "New EM still doing 50%+ IC work; 1:1s are technical problem-solving sessions, not coaching conversations; new EM hasn't been trained on feedback delivery, performance management, or conflict resolution; skip-level feedback reveals reports feel unsupported; EM frustrated by management responsibilities interfering with 'real work'",
        "impact": "New EM burns out trying to be both manager and IC; reports don't get the coaching and career development they need; strong IC skills wasted on management tasks they haven't been trained for; EM either reverts to IC work (neglecting team) or struggles visibly; some of the best potential managers are lost because the transition was unsupported",
        "recoveryActions": "Never promote to management without an explicit transition plan. First 90 days: pair with experienced EM mentor, reduce IC commitments to <20%, provide management training (feedback, 1:1s, performance management). Define what success looks like as an EM (not IC metrics). Regular check-ins with skip-level on transition health. Offer an explicit return-to-IC path if management isn't the right fit — removing this stigma retains great engineers who tried management honestly. Google provides structured EM training (Managing@Google) for all new managers, and explicitly offers return-to-IC without stigma within the first year.",
        "sourceTopic": "Coaching & Talent Development",
        "mappingNotes": "Accidental manager → career pathway / IC-to-EM transition observables"
    },
]

# ── NEW PLAYBOOKS ───────────────────────────────────────────────────

new_playbooks = [
    # C13
    {
        "id": "P-C13-2",
        "slug": "building-devsecops-culture-from-scratch",
        "observableIds": ["C13-O1", "C13-O5", "C13-O6"],
        "capabilityIds": ["C13"],
        "title": "Building a DevSecOps Culture From Scratch",
        "context": "Your team has no security practices embedded in the development workflow. Security reviews happen only when the security team has bandwidth (which is never). Your team shipped a feature with a known SQL injection vulnerability because 'security didn't review it in time.'",
        "topicsActivated": [
            "Security (Shift-Left)",
            "Culture (Security as Shared Responsibility)",
            "Process (CI/CD Security Integration)"
        ],
        "decisionFramework": "1. Immediate (Week 1): Add automated dependency scanning to CI/CD — this catches the lowest-hanging fruit with zero cultural change required. 2. Quick win (Week 2-3): Rotate a security champion role — one engineer per quarter attends security guild and reviews threat models. 3. Build muscle (Month 2): Add SAST scanning with severity-based gates (Critical/High block, Medium track). 4. Level up (Month 3): Require threat models for features touching auth, payments, or PII. 5. Sustain (Ongoing): Quarterly security training, track vulnerability SLA compliance, celebrate security catches.",
        "commonMistakes": "Trying to implement everything at once (team will rebel). Making security someone else's job (it's everyone's). Being so strict that deployments are blocked for false positives. Not tuning scanning tools (alert fatigue kills adoption). Treating security as punishment rather than practice.",
        "whatGoodLooksLike": "Within 3 months: automated scanning running, security champion active, threat models for sensitive features. Within 6 months: vulnerability SLA compliance >90%, security catches shifting left (found in development, not production). Team sees security as 'how we work', not 'extra overhead'. Industry reference: Google's BeyondCorp model integrates security into every layer of the development and deployment pipeline, making security a structural property rather than an add-on review step.",
        "mappingNotes": "DevSecOps culture building scenario",
        "suggestedMetricIds": ["3.3", "3.5"]
    },

    # C11
    {
        "id": "P-C11-3",
        "slug": "your-interview-process-is-rejecting-good-candidates",
        "observableIds": ["C11-O1", "C11-O9"],
        "capabilityIds": ["C11"],
        "title": "Your Interview Process Is Rejecting Good Candidates",
        "context": "Your team has been hiring for 4 months with zero offers extended. Recruiting says candidate quality is high, but your interviewers keep saying 'not a strong enough signal.' You suspect the interview process itself is the problem.",
        "topicsActivated": [
            "Hiring (Interview Process Design)",
            "Metrics (Conversion Rates)",
            "Culture (Bias in Assessment)"
        ],
        "decisionFramework": "1. Diagnose (Week 1): Pull conversion rates by interview stage. Where's the biggest drop-off? Is it consistent across interviewers? 2. Audit (Week 1-2): Review recent interview scorecards. Are scores specific (behavioral evidence) or vague ('didn't seem senior enough')? Are rubrics being used? Is scoring happening before debrief? 3. Calibrate (Week 2-3): Run a calibration session with all interviewers using a mock candidate. Identify scoring discrepancies. 4. Fix (Week 3-4): Revise rubrics with specific behavioral anchors. Retrain interviewers. Implement independent scoring before debrief. 5. Monitor (Ongoing): Track conversion rates weekly, interviewer agreement rates, and candidate feedback scores.",
        "commonMistakes": "Blaming recruiting for candidate quality without examining your process. Not tracking per-interviewer pass rates (one miscalibrated interviewer can tank your pipeline). Using vague rubrics that different interviewers interpret differently. Not collecting candidate feedback on the interview experience. Lowering the bar instead of fixing the process.",
        "whatGoodLooksLike": "Root cause identified within 2 weeks. Rubrics revised with specific behavioral anchors. Interviewer calibration complete. Conversion rate improving within 6 weeks. Hire within 8 weeks of fix. Candidate experience scores improving. Industry reference: Meta's structured interviewing program requires predefined rubrics with behavioral anchors and independent scoring, achieving consistent evaluation across thousands of interviews per month.",
        "mappingNotes": "Broken interview process diagnosis scenario",
        "suggestedMetricIds": ["7.3"]
    },

    # C4
    {
        "id": "P-C4-3",
        "slug": "your-team-is-agile-in-name-only",
        "observableIds": ["C4-O1", "C4-O3"],
        "capabilityIds": ["C4"],
        "title": "Your Team Is Agile in Name Only",
        "context": "Your team runs 'sprints' but nothing is really iterative. Sprint planning is task assignment by the EM. Retros generate action items nobody completes. Standup is a status report to you. The team jokes about 'waterfall with standups.'",
        "topicsActivated": [
            "Process (Agile Implementation)",
            "Team Health (Ownership)",
            "Operational Rhythm (Ceremony Design)"
        ],
        "decisionFramework": "1. Honest audit (Week 1): For each ceremony, ask 'What decision did this change last month?' If nothing, it's cargo cult. 2. Strip to essentials (Week 2): Cancel all ceremonies except retro and planning. Let the team feel the difference. 3. Rebuild from need (Week 3-4): Ask the team 'What problems do we have that a recurring meeting could solve?' Reintroduce only ceremonies the team wants. 4. Fix ownership (Month 2): Shift standup from status-report-to-EM to team-coordination. Let the team run planning. Make retro action items the first item on next planning. 5. Measure (Ongoing): Track ceremony participation, action item completion, and team satisfaction with process.",
        "commonMistakes": "Adding more process to fix a process problem. Adopting SAFe/LeSS/Scrum-of-Scrums when basic Scrum isn't working. Making it about the framework instead of the outcomes. Not letting the team own their process. Running retros without ever completing the action items. Treating agile as a noun instead of an adjective.",
        "whatGoodLooksLike": "Within 6 weeks: team owns their ceremonies, retro action items >80% completion rate, standup is team coordination (not status report), sprint commitments are team-made (not EM-assigned). Team describes their process as 'what works for us' rather than 'what we're supposed to do.' Industry reference: Spotify evolved away from prescriptive Scrum because squads adapted processes to their actual needs — the best agile teams don't follow a framework, they continuously improve how they work.",
        "mappingNotes": "Cargo cult agile diagnosis and fix scenario",
        "suggestedMetricIds": ["2.1", "1.2"]
    },

    # C9
    {
        "id": "P-C9-2",
        "slug": "leadership-wants-engineering-productivity-metrics-yesterday",
        "observableIds": ["C9-O1", "C9-O9", "C9-O10"],
        "capabilityIds": ["C9"],
        "title": "Leadership Wants Engineering Productivity Metrics Yesterday",
        "context": "Your VP asks for a 'developer productivity dashboard' by next month. They want to see engineering ROI. Your team currently has no metrics infrastructure. You know that naive productivity metrics can be destructive.",
        "topicsActivated": [
            "Metrics (Framework Selection)",
            "Stakeholder Mgmt (Managing Expectations)",
            "Team Health (Avoiding Surveillance)"
        ],
        "decisionFramework": "1. Understand the real need (Week 1): What decision is leadership trying to make? 'See engineering ROI' could mean many things. Ask: 'If you had this dashboard, what would you do differently?' 2. Propose a phased approach (Week 1): Phase 1 (Month 1): 3 core DORA metrics from existing tooling. Phase 2 (Month 2): Add developer satisfaction survey. Phase 3 (Month 3): Add business outcome connection (features → impact). 3. Set guardrails (Week 2): Metrics for team-level trends, not individual surveillance. Paired metrics (speed + quality). No metrics as performance targets. 4. Build Phase 1 (Month 1): Deploy basic DORA dashboard from CI/CD data. 5. Iterate (Ongoing): Add metrics only when previous ones drive decisions. Retire metrics that don't inform action.",
        "commonMistakes": "Giving leadership lines-of-code or tickets-closed metrics (gameable and misleading). Building a complex dashboard nobody uses. Using metrics for individual performance evaluation. Not asking what decisions the metrics should inform. Building everything at once instead of iterating. Not pairing speed metrics with quality metrics.",
        "whatGoodLooksLike": "Basic DORA dashboard live within 4 weeks. Leadership can see team-level trends. No individual developer surveillance. Metrics driving at least one decision per month. Developer satisfaction survey running by Month 2. Team trusts the metrics (not cynical about measurement). Industry reference: Microsoft's SPACE framework explicitly combines satisfaction, performance, activity, communication, and efficiency — preventing single-dimension measurement while giving leadership the multi-faceted view they need.",
        "mappingNotes": "Engineering productivity metrics rollout scenario",
        "suggestedMetricIds": ["2.1", "2.2", "1.2"]
    },

    # C5
    {
        "id": "P-C5-6",
        "slug": "product-and-engineering-have-separate-roadmaps",
        "observableIds": ["C5-O1", "C5-O16"],
        "capabilityIds": ["C5", "C2"],
        "title": "Product and Engineering Have Separate Roadmaps",
        "context": "You discover that PM has a roadmap they share with stakeholders, and your engineering team has a separate technical roadmap. The two don't align. PM is frustrated that engineering is 'doing their own thing.' Engineering is frustrated that PM doesn't account for technical investment.",
        "topicsActivated": [
            "Cross-Functional Partnership (Alignment)",
            "Strategic Prioritization (Unified Planning)",
            "Communication (Shared Artifacts)"
        ],
        "decisionFramework": "1. Diagnose (Week 1): Compare both roadmaps. What's overlapping? What's unique to each? Where are the conflicts? 2. Align on reality (Week 2): Joint session with PM to reconcile. Present engineering investment needs (tech debt, platform, reliability) as business investments with expected ROI. 3. Unify (Week 3): Create a single roadmap with explicit capacity allocation — e.g., 60% product features, 20% tech debt/platform, 10% reliability, 10% experimentation. 4. Share (Week 4): Publish unified roadmap to all stakeholders. Both PM and Engineering present it together. 5. Sustain (Ongoing): Joint planning sessions quarterly. Weekly triad syncs. Any roadmap changes require mutual agreement.",
        "commonMistakes": "Engineering building their own roadmap in secret. PM not allocating any capacity for engineering-initiated work. Treating it as a power struggle instead of an alignment problem. Not quantifying the business impact of technical investment. Agreeing on a unified roadmap but reverting to separate ones within a quarter.",
        "whatGoodLooksLike": "Single unified roadmap within 4 weeks. Explicit capacity allocation visible to all stakeholders. Both PM and Engineering can articulate the full roadmap (not just their part). No more 'surprise' engineering work or 'surprise' PM commitments. Industry reference: Spotify's squad model requires squads to own both product and technical outcomes through shared OKRs, making separate roadmaps structurally impossible.",
        "mappingNotes": "Separate roadmaps alignment scenario",
        "suggestedMetricIds": ["1.2", "8.4"]
    },

    # C6
    {
        "id": "P-C6-5",
        "slug": "your-new-engineering-manager-is-struggling-with-the-transition-from-ic",
        "observableIds": ["C6-O1", "C6-O13"],
        "capabilityIds": ["C6"],
        "title": "Your New Engineering Manager Is Struggling With the IC-to-EM Transition",
        "context": "You promoted your best senior engineer to EM 3 months ago. They're still writing code 50% of the time, 1:1s are technical problem-solving sessions, and skip-level feedback reveals reports feel unsupported. Your new EM is frustrated that 'management is keeping me from real work.'",
        "topicsActivated": [
            "Coaching (New Manager Development)",
            "Career Development (IC to EM Transition)",
            "Team Health (Report Experience)"
        ],
        "decisionFramework": "1. Validate (Week 1): Confirm the problem through skip-level feedback and 1:1 with the new EM. Understand their perspective without judgment. 2. Redefine success (Week 1-2): Have an explicit conversation about what 'good EM work' looks like. It's not coding. It's growing people, removing blockers, setting direction. 3. Create structure (Week 2-3): Set explicit time allocation targets (code: <10%, 1:1s: 25%, strategy/planning: 25%, cross-functional: 20%, admin: 20%). Pair them with an experienced EM mentor. 4. Build skills (Month 2): Coaching on feedback delivery, 1:1 structure, career conversations. Shadow their 1:1s (with consent) and provide feedback. 5. Check and adjust (Month 3): Review skip-level feedback. If improving, continue coaching. If not, have honest conversation about whether management is the right path. 6. Offer the exit ramp (If needed): Make return to IC genuinely safe and unstigmatized.",
        "commonMistakes": "Expecting the transition to happen naturally without coaching. Not reducing their IC responsibilities explicitly. Criticizing their management without teaching alternatives. Not offering a genuine return-to-IC path. Promoting again too soon (next person) without providing better transition support.",
        "whatGoodLooksLike": "Within 90 days: EM spending <20% time on code, 1:1s focused on career and growth, skip-level feedback improving. Within 6 months: EM has found their management identity, reports feel supported, EM is invested in management (not pining for IC work). Or: EM has returned to IC track gracefully, and someone better suited has taken the role. Both outcomes are wins. Industry reference: Google's Managing@Google program provides structured training for all new managers in their first 90 days, covering feedback, 1:1s, performance management, and career development.",
        "mappingNotes": "IC-to-EM transition support scenario",
        "suggestedMetricIds": ["5.1", "7.1"]
    },
]

# ── NEW INTERVIEW QUESTIONS ─────────────────────────────────────────

new_interview_qs = [
    # C13 (currently 4, adding 4 → 8)
    {
        "id": "IQ-87",
        "capabilityId": "C13",
        "question": "How do you embed security practices into your team's daily development workflow rather than treating it as a separate review step?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What automated security tools have you implemented in CI/CD?",
            "How do you handle the tension between deployment speed and security review thoroughness?",
            "How do you build security awareness across your team, not just among specialists?"
        ],
        "lookFor": [
            "Shift-left security practices (early, automated, continuous)",
            "Security champion or distributed ownership model",
            "Automation over manual gates where possible",
            "Balanced approach — security doesn't become a deployment bottleneck"
        ],
        "redFlags": [
            "Security is entirely delegated to a separate team",
            "No automated scanning in the development pipeline",
            "Security reviews only happen before major releases",
            "Can't name specific security tools or practices in their workflow"
        ]
    },
    {
        "id": "IQ-88",
        "capabilityId": "C13",
        "question": "Describe a time you had to respond to a security vulnerability or compliance finding. How did you prioritize remediation against existing feature work?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you communicate the risk and remediation plan to stakeholders?",
            "What processes did you put in place to prevent similar issues?",
            "How did you balance urgency with avoiding panic?"
        ],
        "lookFor": [
            "Severity-based triage with clear SLAs",
            "Transparent communication about risk to stakeholders",
            "Structural follow-up (not just fixing the symptom)",
            "Composure under security pressure"
        ],
        "redFlags": [
            "Ignored or deprioritized security findings for feature work",
            "No severity-based prioritization framework",
            "No structural changes after remediation (likely to recur)",
            "Panicked response that disrupted the team unnecessarily"
        ]
    },
    {
        "id": "IQ-89",
        "capabilityId": "C13",
        "question": "How do you approach compliance requirements (SOC2, GDPR, PCI, etc.) as an engineering leader? Walk me through your approach to maintaining compliance posture.",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "How do you make compliance sustainable rather than a periodic scramble?",
            "How do you handle access reviews and permission management?",
            "What's your approach to evidence collection for audits?"
        ],
        "lookFor": [
            "Continuous compliance posture, not periodic audit prep",
            "Automated evidence collection where possible",
            "Regular access reviews with auto-expiring permissions",
            "Compliance as engineering practice, not administrative burden"
        ],
        "redFlags": [
            "Compliance is an annual fire drill",
            "No automated evidence collection",
            "Access reviews are reactive or non-existent",
            "Views compliance as someone else's responsibility"
        ]
    },
    {
        "id": "IQ-90",
        "capabilityId": "C13",
        "question": "Tell me about a time you had to make a decision that balanced security risk against business urgency. How did you evaluate the trade-off?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you communicate the risk to leadership?",
            "What mitigation measures did you put in place?",
            "How did you document the decision for future reference?"
        ],
        "lookFor": [
            "Structured risk assessment, not gut feel",
            "Transparent communication of risk to stakeholders",
            "Documented decision with accepted risks and mitigations",
            "Follow-up plan to address accepted risks"
        ],
        "redFlags": [
            "Always prioritizes business speed over security",
            "Can't articulate how they evaluate security risk",
            "No documentation of security trade-off decisions",
            "No follow-up plan for accepted risks"
        ]
    },

    # C4 (currently 6, adding 2 → 8)
    {
        "id": "IQ-91",
        "capabilityId": "C4",
        "question": "Tell me about a time you identified a systemic bottleneck in your team's delivery pipeline and how you resolved it.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you diagnose the root cause versus treating symptoms?",
            "How did you measure the improvement?",
            "What was the team's reaction to the change?"
        ],
        "lookFor": [
            "Systemic diagnosis (value stream mapping or equivalent)",
            "Data-driven identification of the actual constraint",
            "Targeted intervention rather than broad process overhaul",
            "Measured improvement after the change"
        ],
        "redFlags": [
            "Only addressed symptoms, not root causes",
            "Made process changes without measuring impact",
            "Added process to fix a process problem",
            "Couldn't distinguish between flow time and work time"
        ]
    },
    {
        "id": "IQ-92",
        "capabilityId": "C4",
        "question": "How do you protect engineering focus time while maintaining necessary coordination and communication? Walk me through your approach.",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "How do you audit whether your team has enough focus time?",
            "What's your approach to meeting hygiene and async-first communication?",
            "How do you balance this for yourself as a manager who needs to be available?"
        ],
        "lookFor": [
            "Structural solutions (meeting-free blocks, async defaults)",
            "Active measurement of focus time",
            "Willingness to cancel low-value meetings",
            "Models the behavior themselves"
        ],
        "redFlags": [
            "Team's calendars are wall-to-wall meetings",
            "No awareness of focus time as a metric",
            "Relies on individual engineers to 'protect their time' without structural support",
            "Adds meetings for coordination without removing others"
        ]
    },

    # C9 (currently 4, adding 4 → 8)
    {
        "id": "IQ-93",
        "capabilityId": "C9",
        "question": "How do you decide which engineering metrics to track? Walk me through your framework for selecting, implementing, and retiring metrics.",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "How do you prevent metrics from being gamed?",
            "How do you balance what's easy to measure with what's important to measure?",
            "When was the last time you retired a metric and why?"
        ],
        "lookFor": [
            "Decision-driven metric selection (what decision will this inform?)",
            "Metric pairing to prevent single-dimension optimization",
            "Regular auditing and retirement of unused metrics",
            "Understanding that not everything important is measurable"
        ],
        "redFlags": [
            "Tracks metrics because they're available, not because they drive decisions",
            "Never retired a metric",
            "Uses metrics as individual performance targets",
            "No concept of metric pairs or guardrail metrics"
        ]
    },
    {
        "id": "IQ-94",
        "capabilityId": "C9",
        "question": "Tell me about a time metrics told you something surprising about your team's performance. What did you discover and how did you act on it?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you distinguish between a real signal and measurement noise?",
            "Did the team agree with what the metrics were showing?",
            "How did you communicate findings to the team and leadership?"
        ],
        "lookFor": [
            "Curiosity-driven investigation when metrics diverge from expectations",
            "Combined quantitative data with qualitative team input",
            "Took action based on findings (metrics drove a decision)",
            "Communicated with nuance rather than simplistic metric interpretation"
        ],
        "redFlags": [
            "Never had metrics surprise them (not looking closely enough)",
            "Acted on metrics without investigating context",
            "Metrics never actually changed a decision",
            "Interpreted metrics without team input"
        ]
    },
    {
        "id": "IQ-95",
        "capabilityId": "C9",
        "question": "How do you approach DORA metrics and developer productivity measurement? What's your philosophy on measuring engineering output?",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "What are the limitations of DORA metrics?",
            "How do you measure things that DORA doesn't capture (like developer experience)?",
            "How do you present engineering metrics to non-technical stakeholders?"
        ],
        "lookFor": [
            "Nuanced view of DORA (useful but not sufficient)",
            "Awareness of limitations (doesn't capture satisfaction, learning, innovation)",
            "Multi-dimensional approach (SPACE framework or similar)",
            "Metrics as diagnostic tools, not performance targets"
        ],
        "redFlags": [
            "Treats DORA as the only metrics needed",
            "Uses metrics for individual developer comparison",
            "No awareness of developer experience or satisfaction metrics",
            "Over-indexes on activity metrics rather than outcome metrics"
        ]
    },
    {
        "id": "IQ-96",
        "capabilityId": "C9",
        "question": "Describe how you connect engineering metrics to business outcomes. How do you demonstrate engineering ROI to non-technical leadership?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What was the most compelling metric you used to justify an engineering investment?",
            "How do you translate technical improvements into business language?",
            "How do you handle when leadership asks for metrics that you think are harmful?"
        ],
        "lookFor": [
            "Can translate engineering work to business impact",
            "Uses specific examples of metric-to-business-outcome connections",
            "Diplomatically redirects harmful metric requests",
            "Treats engineering as a business investment, not a cost center"
        ],
        "redFlags": [
            "Can't connect engineering work to business outcomes",
            "Gives leadership whatever metrics they ask for without pushback",
            "Only speaks in technical terms to non-technical audiences",
            "No framework for engineering ROI communication"
        ]
    },
]

# ── NEW CALIBRATION SIGNALS ─────────────────────────────────────────

new_calibration_signals = [
    # C13
    {"id": "SIG-242", "observableId": "C13-O5", "capabilityId": "C13",
     "signalText": "Security champion rotation: 'Rotating security champion catches 2-3 vulnerability patterns per sprint that automated tools miss, team security literacy measurably improved'",
     "signalType": "metric", "sourceSubTopic": "Security Champions"},
    {"id": "SIG-243", "observableId": "C13-O6", "capabilityId": "C13",
     "signalText": "CI/CD security gates: 'Automated scanning blocks critical vulnerabilities at build time — zero critical findings in production for 6 months'",
     "signalType": "metric", "sourceSubTopic": "Automated Security Scanning"},
    {"id": "SIG-244", "observableId": "C13-O7", "capabilityId": "C13",
     "signalText": "Threat modeling practice: 'Required STRIDE threat models for auth and payment features — caught 5 design-level vulnerabilities before implementation'",
     "signalType": "calibration_language", "sourceSubTopic": "Threat Modeling"},

    # C11
    {"id": "SIG-245", "observableId": "C11-O9", "capabilityId": "C11",
     "signalText": "Structured hiring: 'Implemented competency-mapped rubrics and independent scoring — interviewer agreement improved 30%, offer-to-accept rate 80%'",
     "signalType": "metric", "sourceSubTopic": "Structured Interview Design"},
    {"id": "SIG-246", "observableId": "C11-O10", "capabilityId": "C11",
     "signalText": "Competitive hiring: 'Won 4 of 5 competing offers against FAANG by differentiating on career velocity and impact — all hires retained at 1 year'",
     "signalType": "calibration_language", "sourceSubTopic": "Competitive Hiring Strategy"},
    {"id": "SIG-247", "observableId": "C11-O11", "capabilityId": "C11",
     "signalText": "Pipeline optimization: 'Instrumented full hiring funnel — identified technical screen bottleneck, redesigned assessment, improved pass-through rate from 25% to 45%'",
     "signalType": "metric", "sourceSubTopic": "Hiring Pipeline Analytics"},

    # C4
    {"id": "SIG-248", "observableId": "C4-O12", "capabilityId": "C4",
     "signalText": "Bottleneck resolution: 'Value stream mapping identified CI pipeline as primary bottleneck (45min avg build) — parallelized build stages, reduced to 12min, cycle time improved 30%'",
     "signalType": "metric", "sourceSubTopic": "Velocity Bottleneck Analysis"},
    {"id": "SIG-249", "observableId": "C4-O13", "capabilityId": "C4",
     "signalText": "Focus time protection: 'Implemented no-meeting mornings — engineers report 5+ hours of daily focus time, complex feature velocity improved 35%'",
     "signalType": "metric", "sourceSubTopic": "Focus Time Protection"},

    # C9
    {"id": "SIG-250", "observableId": "C9-O9", "capabilityId": "C9",
     "signalText": "Metric pairing: 'Paired deployment frequency with change failure rate — shipping 3x faster while maintaining <5% failure rate, proving velocity and quality are not inherently opposed'",
     "signalType": "metric", "sourceSubTopic": "Metric Pairings"},
    {"id": "SIG-251", "observableId": "C9-O10", "capabilityId": "C9",
     "signalText": "Metrics maturity: 'Started with 3 DORA metrics, retired 1, added developer satisfaction survey — every active metric informed a decision within 90 days'",
     "signalType": "calibration_language", "sourceSubTopic": "Metrics Maturity Evolution"},

    # C3
    {"id": "SIG-252", "observableId": "C3-O11", "capabilityId": "C3",
     "signalText": "Tech debt visibility: 'Quantified top 5 tech debt items in business terms — secured 20% capacity allocation, remediated items saving estimated $400K/year in engineering time'",
     "signalType": "metric", "sourceSubTopic": "Tech Debt Quantification"},

    # C5
    {"id": "SIG-253", "observableId": "C5-O16", "capabilityId": "C5",
     "signalText": "Triad alignment: 'Shared OKRs with PM and Design lead — zero cross-functional escalations in Q4, joint satisfaction scores 4.7/5'",
     "signalType": "metric", "sourceSubTopic": "Product Triad Alignment"},

    # C6
    {"id": "SIG-254", "observableId": "C6-O13", "capabilityId": "C6",
     "signalText": "Career pathway clarity: 'Documented IC and management tracks — 100% of reports have career plans, Staff IC track retained 3 senior engineers who would have otherwise sought management elsewhere'",
     "signalType": "calibration_language", "sourceSubTopic": "Career Pathway Design"},
]

# ── APPLY ALL ADDITIONS ─────────────────────────────────────────────
print("=== Applying Session 2-5 Enrichments ===")

observables.extend(new_observables)
save('src/data/observables.json', observables)
print(f"  Added {len(new_observables)} observables (total: {len(observables)})")

anti_patterns.extend(new_anti_patterns)
save('src/data/anti-patterns.json', anti_patterns)
print(f"  Added {len(new_anti_patterns)} anti-patterns (total: {len(anti_patterns)})")

playbooks.extend(new_playbooks)
save('src/data/playbooks.json', playbooks)
print(f"  Added {len(new_playbooks)} playbooks (total: {len(playbooks)})")

interview_qs.extend(new_interview_qs)
save('src/data/interview-questions.json', interview_qs)
print(f"  Added {len(new_interview_qs)} interview questions (total: {len(interview_qs)})")

calibration_signals.extend(new_calibration_signals)
save('src/data/calibration-signals.json', calibration_signals)
print(f"  Added {len(new_calibration_signals)} calibration signals (total: {len(calibration_signals)})")

print("\n=== Session 2-5 Summary ===")
print(f"New observables: {len(new_observables)}")
print(f"  C13: 3 new (4→7)")
print(f"  C11: 3 new (8→11)")
print(f"  C4:  2 new (11→13)")
print(f"  C9:  2 new (8→10)")
print(f"  C3:  1 new (10→11)")
print(f"  C5:  1 new (15→16)")
print(f"  C6:  1 new (12→13)")
print(f"New anti-patterns: {len(new_anti_patterns)}")
print(f"  C13: AP-45 (Checkbox Audit)")
print(f"  C11: AP-46 (Vibes-Based Hire)")
print(f"  C4:  AP-47 (Process Cargo Cult)")
print(f"  C9:  AP-48 (Lagging-Only Dashboard)")
print(f"  C3:  AP-49 (Invisible Tech Debt)")
print(f"  C5:  AP-50 (Silo Builder)")
print(f"  C6:  AP-51 (Accidental Manager)")
print(f"New playbooks: {len(new_playbooks)}")
print(f"New interview questions: {len(new_interview_qs)}")
print(f"New calibration signals: {len(new_calibration_signals)}")

#!/usr/bin/env python3
"""
Enrich EM framework data files based on LeadDev article review.
Session 1: Focus on C12, C10, C7, C14 (lowest coverage capabilities)
"""

import json
import re

def slugify(text):
    """Convert text to URL slug."""
    s = text.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[\s_]+', '-', s)
    s = re.sub(r'-+', '-', s)
    return s.strip('-')

# ── Load existing data ──────────────────────────────────────────────
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
# Sources: LeadDev articles on culture, trust, decision-making, performance, resource allocation

new_observables = [
    # C12: Culture & Norms Shaping (was 5, adding 3 → 8)
    {
        "id": "C12-O6",
        "capabilityId": "C12",
        "shortText": "Maintains cultural continuity through leadership transitions and team growth",
        "slug": "maintains-cultural-continuity-through-leadership-transitions-and-team-growth",
        "fullExample": "When onboarding a new tech lead, pairs them with culture carriers and ensures they absorb existing norms before introducing changes. During rapid growth, scales culture through structured mentoring rather than hoping new hires absorb it organically.",
        "evidenceTypes": ["1_1_notes", "retrospective_output"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs maintain team-level culture during growth; Directors ensure culture survives cross-team leadership transitions",
        "why": "Culture degrades fastest during rapid growth and leadership changes — without intentional continuity, toxic norms can emerge in weeks",
        "how": "Pair new leaders with culture carriers; document and discuss team norms explicitly during onboarding; run quarterly culture retros; make values observable in daily decisions, not just posters",
        "expectedResult": "New team members describe team culture consistently within 60 days; culture surveys stable through growth periods; no 'culture shock' complaints in skip-levels",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-199",
                "observableId": "C12-O6",
                "capabilityId": "C12",
                "signalText": "Key signal for cultural stewardship: 'Onboarded 5 new engineers in Q3 while maintaining team health scores — structured culture buddy program and explicit norms documentation'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Cultural Continuity"
            }
        ]
    },
    {
        "id": "C12-O7",
        "capabilityId": "C12",
        "shortText": "Creates explicit feedback channels ensuring every voice is heard, not just the loudest",
        "slug": "creates-explicit-feedback-channels-ensuring-every-voice-is-heard",
        "fullExample": "Implements anonymous team health surveys, rotating meeting facilitators, and written-first discussion formats that ensure introverts and underrepresented voices have equal opportunity to contribute.",
        "evidenceTypes": ["team_survey", "retrospective_output"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs design and maintain feedback channels; Directors audit equitable participation across teams",
        "why": "Without deliberate inclusive structures, decisions reflect the preferences of the most senior or vocal team members, creating blind spots and marginalizing quieter contributors",
        "how": "Rotate meeting facilitation; use written-first formats for decisions; track meeting participation patterns; create anonymous escalation channels; solicit input from quieter members directly in 1:1s",
        "expectedResult": "Meeting participation is distributed; engagement surveys show all demographics feel heard; decisions reflect diverse perspectives; fewer surprise escalations from unheard concerns",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-200",
                "observableId": "C12-O7",
                "capabilityId": "C12",
                "signalText": "Observable inclusive practice: 'Implemented written-first RFC process and rotating facilitation — meeting participation equity improved from 40% to 80% of team contributing in design discussions'",
                "signalType": "metric",
                "sourceSubTopic": "Inclusive Feedback Channels"
            }
        ]
    },
    {
        "id": "C12-O8",
        "capabilityId": "C12",
        "shortText": "Proactively addresses toxic behaviors before they become normalized team patterns",
        "slug": "proactively-addresses-toxic-behaviors-before-they-become-normalized",
        "fullExample": "When observing dismissive code review comments from a senior engineer, addresses it in 1:1 within 24 hours, resets expectations with the team publicly, and monitors for recurrence rather than waiting for an HR complaint.",
        "evidenceTypes": ["1_1_notes", "peer_feedback"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs address individual behaviors; Directors identify systemic toxicity patterns across teams",
        "why": "Toxic behaviors compound quickly — one unchecked bad actor can destroy psychological safety for the entire team within weeks, causing attrition among the best performers first",
        "how": "Name the behavior specifically (not the person's character); address within 24-48 hours; reset expectations publicly when appropriate; track whether behavior changes; escalate if pattern continues",
        "expectedResult": "Team perceives EM as culture guardian; toxic patterns caught early; psychological safety surveys trend positive; no 'missing stair' dynamics tolerated",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-201",
                "observableId": "C12-O8",
                "capabilityId": "C12",
                "signalText": "Culture protection signal: 'Addressed pattern of dismissive code review comments within 48 hours — reset team norms in retro, followed up in 1:1s, tracked improvement over 4 weeks'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Toxic Behavior Intervention"
            }
        ]
    },

    # C10: Resource Allocation & Tradeoffs (was 5, adding 3 → 8)
    {
        "id": "C10-O6",
        "capabilityId": "C10",
        "shortText": "Presents resource requests as tiered options with quantified trade-offs for each level",
        "slug": "presents-resource-requests-as-tiered-options-with-quantified-trade-offs",
        "fullExample": "Instead of requesting 5 headcount, presents three options: (A) 2 heads — deliver core features only, delay platform work 6 months; (B) 4 heads — core + platform, accept tech debt in monitoring; (C) 6 heads — full roadmap with reliability investment. Each option includes timeline, risk, and ROI.",
        "evidenceTypes": ["decision_doc", "planning_artifact"],
        "defaultWeight": 0.08,
        "requiredFrequency": "quarterly",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs present team-level options; Directors present org-level portfolio allocation options",
        "why": "Binary resource requests force leadership into yes/no decisions without understanding trade-offs; tiered options enable informed prioritization across the org",
        "how": "For every resource request, prepare minimum/target/stretch options with explicit deliverables, risks, and ROI for each tier; let decision-makers choose the right investment level",
        "expectedResult": "Resource discussions are productive, not adversarial; leadership trusts your judgment; approvals come faster because trade-offs are clear",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-202",
                "observableId": "C10-O6",
                "capabilityId": "C10",
                "signalText": "Resource planning maturity: 'Presented 3-tier headcount proposal with quantified ROI per tier — leadership approved Option B, allocating 4 engineers to cover core + platform workstream'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Tiered Resource Planning"
            }
        ]
    },
    {
        "id": "C10-O7",
        "capabilityId": "C10",
        "shortText": "Tracks and communicates cost-per-outcome to demonstrate engineering ROI",
        "slug": "tracks-cost-per-outcome-to-demonstrate-engineering-roi",
        "fullExample": "Maintains a running dashboard showing cost-per-feature, cost-per-customer-served, and engineering investment by workstream category (growth, reliability, platform, debt). Uses this to justify investments and identify efficiency opportunities.",
        "evidenceTypes": ["dashboard", "planning_artifact"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "Medium",
        "directorRelevance": "High",
        "levelNotes": "EMs track team-level cost efficiency; Directors build org-level cost models connecting engineering spend to business outcomes",
        "why": "Without cost-per-outcome tracking, engineering is perceived as a cost center; with it, engineering becomes a strategic investment with measurable returns",
        "how": "Categorize engineering time by investment type (feature, reliability, platform, debt); track cloud costs per service; calculate cost per key business outcome; present as regular dashboard to leadership",
        "expectedResult": "Engineering seen as strategic investment; budget conversations grounded in data; efficiency improvements visible; trust with finance partners increases",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-203",
                "observableId": "C10-O7",
                "capabilityId": "C10",
                "signalText": "Business partnership signal: 'Built cost-per-customer-served dashboard — identified 30% efficiency gain by consolidating two redundant services, saving $200K/year in infra costs'",
                "signalType": "metric",
                "sourceSubTopic": "Engineering ROI Tracking"
            }
        ]
    },
    {
        "id": "C10-O8",
        "capabilityId": "C10",
        "shortText": "Proactively reallocates capacity to highest-impact work without waiting for top-down direction",
        "slug": "proactively-reallocates-capacity-to-highest-impact-work",
        "fullExample": "When a planned project's expected impact decreases due to market changes, proposes reallocating two engineers to a higher-ROI reliability initiative without waiting for quarterly planning. Communicates the shift with data and gets alignment within a week.",
        "evidenceTypes": ["decision_doc", "1_1_notes"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs reallocate within their team; Directors reallocate across teams in their org",
        "why": "Static resource allocation wastes engineering capacity on diminishing-return work; proactive reallocation maximizes impact per engineer-month",
        "how": "Review allocation against expected impact monthly; identify diminishing-return workstreams; propose reallocation with data; communicate what stops and why; get stakeholder alignment quickly",
        "expectedResult": "Team always working on highest-impact projects; stakeholders trust your judgment; no 'why are we still building this?' complaints; impact per engineer-month improves",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-204",
                "observableId": "C10-O8",
                "capabilityId": "C10",
                "signalText": "Proactive allocation signal: 'Identified diminishing returns on Feature X mid-quarter — reallocated 2 engineers to reliability workstream, improving SLA from 99.5% to 99.9% with zero feature delay'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Dynamic Resource Reallocation"
            }
        ]
    },

    # C7: Decision Framing & Communication (was 7, adding 3 → 10)
    {
        "id": "C7-O8",
        "capabilityId": "C7",
        "shortText": "Structures difficult conversations with preparation, empathy, and clear follow-through",
        "slug": "structures-difficult-conversations-with-preparation-empathy-and-follow-through",
        "fullExample": "Before delivering a promotion rejection, documents specific gaps with examples, prepares a development plan, schedules a private 1:1 with sufficient time, delivers the message with empathy, and follows up with written summary and action items within 24 hours.",
        "evidenceTypes": ["1_1_notes", "peer_feedback"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs deliver individual difficult conversations; Directors also handle org-level difficult messaging",
        "why": "Difficult conversations avoided or botched destroy trust, create surprises, and let problems compound; handled well, they build credibility and accelerate resolution",
        "how": "Prepare with specific examples and data; schedule adequate private time; deliver with empathy but clarity; allow space for response; follow up in writing; track outcomes",
        "expectedResult": "Difficult messages delivered within 48 hours of trigger; no surprise escalations; team trusts EM to be honest; problems resolved early rather than festering",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-205",
                "observableId": "C7-O8",
                "capabilityId": "C7",
                "signalText": "Communication maturity signal: 'Delivered promotion rejection with specific gap analysis and 6-month development plan — engineer expressed appreciation for clarity and achieved promotion next cycle'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Difficult Conversations"
            }
        ]
    },
    {
        "id": "C7-O9",
        "capabilityId": "C7",
        "shortText": "Scales communication systems as org grows — replaces hallway decisions with documented processes",
        "slug": "scales-communication-systems-as-org-grows",
        "fullExample": "As team grows from 8 to 25 engineers, replaces informal decision-making with an RFC process, introduces weekly written status updates replacing daily syncs, and creates tiered communication channels (urgent/informational/discussion).",
        "evidenceTypes": ["decision_doc", "process_artifact"],
        "defaultWeight": 0.06,
        "requiredFrequency": "episodic",
        "emRelevance": "Medium",
        "directorRelevance": "High",
        "levelNotes": "EMs adapt team communication as team grows; Directors design org-level communication architecture",
        "why": "Communication patterns that work for 5 people break at 15 and collapse at 50 — scaling communication is a leadership design problem, not something that happens naturally",
        "how": "Audit communication effectiveness as team scales; introduce written-first decision processes at 10+ people; create tiered channels; establish communication cadences that scale; document decisions for async consumption",
        "expectedResult": "Team operates effectively despite growth; decisions aren't bottlenecked by meetings; new members can find context without asking; communication overhead grows sub-linearly with team size",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-206",
                "observableId": "C7-O9",
                "capabilityId": "C7",
                "signalText": "Scaling communication: 'Introduced RFC process as team grew past 15 — reduced decision revisitation by 60% and cut average meeting hours per engineer from 12/week to 7/week'",
                "signalType": "metric",
                "sourceSubTopic": "Communication Scaling"
            }
        ]
    },
    {
        "id": "C7-O10",
        "capabilityId": "C7",
        "shortText": "Distributes decision authority using clear frameworks — knows which decisions need consensus vs. a driver",
        "slug": "distributes-decision-authority-using-clear-frameworks",
        "fullExample": "Maintains a decision authority matrix: team norms require consensus, technical design decisions use DACI with tech lead as Driver, tooling choices are delegated to individual engineers, and architecture bets require EM + TL alignment. Team knows which decisions they can make autonomously.",
        "evidenceTypes": ["decision_doc", "team_charter"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs distribute decisions within their team; Directors distribute decision authority across their EM reports",
        "why": "Without clear decision authority, teams either wait for permission (slow) or make conflicting decisions (chaotic); clarity enables both speed and alignment",
        "how": "Map common decision types to authority levels (individual/team/consensus/escalation); communicate the framework; adjust based on outcomes; resist the urge to centralize",
        "expectedResult": "Team makes most decisions without EM involvement; decisions are faster; fewer reversals due to misalignment; team feels empowered",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-207",
                "observableId": "C7-O10",
                "capabilityId": "C7",
                "signalText": "Decision distribution signal: 'Implemented decision authority matrix — 80% of technical decisions now made without my involvement, freeing me to focus on strategic alignment and people development'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Decision Authority Distribution"
            }
        ]
    },

    # C14: Performance Management & Calibration (was 6, adding 2 → 8)
    {
        "id": "C14-O7",
        "capabilityId": "C14",
        "shortText": "Maintains continuous performance signal through ongoing documentation, not end-of-cycle reconstruction",
        "slug": "maintains-continuous-performance-signal-through-ongoing-documentation",
        "fullExample": "Keeps running performance notes for each report updated weekly. When review cycle arrives, has 6 months of specific examples ready — not scrambling to remember what happened. Shares feedback themes in 1:1s monthly so reviews contain zero surprises.",
        "evidenceTypes": ["1_1_notes", "review_doc"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "Medium",
        "levelNotes": "EMs maintain individual performance records; Directors ensure their EMs practice continuous documentation",
        "why": "Reconstructing performance from memory creates recency bias, misses critical examples, and leads to inaccurate reviews; continuous documentation produces fair, evidence-rich assessments",
        "how": "Keep running doc per report with dated examples; flag themes monthly in 1:1s; use brag docs or shared achievement logs; review trends quarterly before formal review cycles",
        "expectedResult": "Performance reviews are evidence-rich with specific examples; zero surprises for reports; calibration cases are strong; review cycle takes days not weeks to prepare",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-208",
                "observableId": "C14-O7",
                "capabilityId": "C14",
                "signalText": "Review quality signal: 'Maintained running performance logs for all 8 reports — review cycle preparation completed in 3 days with 15+ specific examples per person, zero surprises reported in engagement survey'",
                "signalType": "calibration_language",
                "sourceSubTopic": "Continuous Performance Documentation"
            }
        ]
    },
    {
        "id": "C14-O8",
        "capabilityId": "C14",
        "shortText": "Manages high performers with differentiated development plans and retention-conscious conversations",
        "slug": "manages-high-performers-with-differentiated-development-and-retention",
        "fullExample": "Identifies top performers' growth aspirations proactively, creates stretch assignments aligned to next-level expectations, has quarterly career conversations (not just at review time), and flags retention risks to leadership before they become emergencies.",
        "evidenceTypes": ["1_1_notes", "career_plan"],
        "defaultWeight": 0.08,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs develop individual high performers; Directors create org-level programs for top talent retention and development",
        "why": "High performers leave when they feel stagnant, under-recognized, or taken for granted; proactive investment in their growth is the highest-ROI management activity",
        "how": "Quarterly career conversations; stretch assignments aligned to growth goals; visible recognition; sponsor for high-visibility opportunities; flag retention risks early; differentiate — don't apply one-size-fits-all management",
        "expectedResult": "High performer retention above 90%; top talent promoted or given growth opportunities within 12-18 months; no surprise departures from top performers; team sees that excellence is rewarded",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-209",
                "observableId": "C14-O8",
                "capabilityId": "C14",
                "signalText": "High performer management signal: 'Created differentiated development plans for top 3 performers — all received stretch assignments aligned to promotion criteria, one promoted this cycle, zero regrettable departures'",
                "signalType": "calibration_language",
                "sourceSubTopic": "High Performer Development"
            }
        ]
    },

    # C2: Strategic Prioritization (was 4, adding 2 → 6)
    {
        "id": "C2-O5",
        "capabilityId": "C2",
        "shortText": "Maintains an explicit 'not doing' list that communicates strategic trade-offs to stakeholders",
        "slug": "maintains-explicit-not-doing-list-communicating-strategic-trade-offs",
        "fullExample": "Quarterly planning output includes not just the roadmap but a named list of requests deliberately declined with rationale. Stakeholders understand what was deprioritized and why, reducing re-litigation.",
        "evidenceTypes": ["planning_artifact", "decision_doc"],
        "defaultWeight": 0.1,
        "requiredFrequency": "quarterly",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs maintain team-level trade-off visibility; Directors communicate portfolio-level strategic trade-offs",
        "why": "Without an explicit 'not doing' list, stakeholders assume their requests are still in queue; the team gets re-asked and re-litigates decisions; focus is eroded by invisible expectations",
        "how": "For every planning cycle, document what was deprioritized alongside what was prioritized; share with stakeholders; include rationale; revisit when conditions change",
        "expectedResult": "Stakeholders don't re-ask for deprioritized items; team focus is protected; trade-offs are transparent; re-prioritization decisions are explicit, not silent",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-210",
                "observableId": "C2-O5",
                "capabilityId": "C2",
                "signalText": "Strategic clarity signal: 'Published explicit not-doing list alongside Q3 roadmap — stakeholder re-litigation requests dropped 70%, freeing team focus for committed deliverables'",
                "signalType": "metric",
                "sourceSubTopic": "Strategic Trade-off Transparency"
            }
        ]
    },
    {
        "id": "C2-O6",
        "capabilityId": "C2",
        "shortText": "Connects engineering investment to business outcomes with measurable success criteria",
        "slug": "connects-engineering-investment-to-business-outcomes",
        "fullExample": "Every major engineering initiative has defined success metrics tied to business outcomes before work begins. Team can articulate why they're building what they're building in business terms, not just technical terms.",
        "evidenceTypes": ["planning_artifact", "decision_doc"],
        "defaultWeight": 0.1,
        "requiredFrequency": "quarterly",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs connect team projects to business outcomes; Directors connect org portfolio to company strategy",
        "why": "Engineering without business outcome connection becomes a feature factory; connecting work to outcomes ensures the team is building the right things, not just building things right",
        "how": "Require business success metrics for every initiative; ask 'how will we know this worked?'; review outcomes quarterly; kill initiatives that aren't delivering expected business impact",
        "expectedResult": "Every engineer can explain why their work matters in business terms; initiatives without clear outcomes are questioned; engineering seen as strategic partner, not cost center",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-211",
                "observableId": "C2-O6",
                "capabilityId": "C2",
                "signalText": "Business alignment signal: 'Required business success metrics for all Q2 initiatives — killed 2 projects mid-quarter when metrics showed no business impact, reallocated team to higher-ROI work'",
                "signalType": "metric",
                "sourceSubTopic": "Outcome-Connected Planning"
            }
        ]
    },

    # C8: Incidents, Risk & Reliability (was 6, adding 2 → 8)
    {
        "id": "C8-O7",
        "capabilityId": "C8",
        "shortText": "Builds system resilience through proactive chaos engineering and game days",
        "slug": "builds-system-resilience-through-proactive-chaos-engineering",
        "fullExample": "Schedules quarterly game days that simulate production failures with heroes explicitly excluded. Tests runbook accuracy, on-call readiness, and failover procedures before real incidents occur.",
        "evidenceTypes": ["decision_doc", "incident_report"],
        "defaultWeight": 0.06,
        "requiredFrequency": "quarterly",
        "emRelevance": "Medium",
        "directorRelevance": "High",
        "levelNotes": "EMs participate in and organize team game days; Directors establish org-wide resilience testing programs",
        "why": "Resilience untested is resilience assumed; game days reveal gaps in runbooks, tooling, and team readiness before real incidents force discovery under pressure",
        "how": "Schedule quarterly game days; simulate realistic failure modes; exclude known heroes to test team depth; review runbook accuracy; track gaps discovered and time to fix",
        "expectedResult": "Team confident in incident handling; runbooks tested and current; no single point of failure in incident response; MTTR improves from proactive preparation",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-212",
                "observableId": "C8-O7",
                "capabilityId": "C8",
                "signalText": "Proactive resilience signal: 'Ran quarterly game days with heroes excluded — discovered 3 runbook gaps and 2 tooling issues before they caused real incidents. On-call readiness improved from 60% to 90%'",
                "signalType": "metric",
                "sourceSubTopic": "Proactive Resilience Testing"
            }
        ]
    },
    {
        "id": "C8-O8",
        "capabilityId": "C8",
        "shortText": "Manages error budgets to balance reliability investment against feature velocity",
        "slug": "manages-error-budgets-to-balance-reliability-against-velocity",
        "fullExample": "Defines SLOs with product team and maintains error budgets. When budget is consumed, automatically shifts team focus to reliability work. When budget is healthy, uses it to justify faster feature shipping with acceptable risk.",
        "evidenceTypes": ["dashboard", "decision_doc"],
        "defaultWeight": 0.06,
        "requiredFrequency": "ongoing",
        "emRelevance": "High",
        "directorRelevance": "High",
        "levelNotes": "EMs implement error budgets for their services; Directors set SLO policy and error budget governance across the org",
        "why": "Without error budgets, reliability vs. velocity is a perpetual argument; error budgets make the trade-off objective and data-driven",
        "how": "Define SLOs with product and business stakeholders; calculate error budget from SLO; monitor consumption; trigger reliability focus when budget is at risk; use healthy budget to justify velocity",
        "expectedResult": "Reliability investment is data-driven, not argument-driven; feature teams and SREs aligned on acceptable risk; no surprise outages from over-shipping",
        "status": "NEW",
        "calibrationSignals": [
            {
                "id": "SIG-213",
                "observableId": "C8-O8",
                "capabilityId": "C8",
                "signalText": "Error budget maturity: 'Implemented SLO-based error budgets for 3 critical services — triggered automatic reliability sprint when checkout service consumed 80% of monthly budget, preventing customer-facing degradation'",
                "signalType": "metric",
                "sourceSubTopic": "Error Budget Management"
            }
        ]
    },
]

# ── NEW ANTI-PATTERNS ──────────────────────────────────────────────
new_anti_patterns = [
    # C12
    {
        "id": "AP-40",
        "name": "The Missing Stair",
        "slug": "the-missing-stair",
        "observableIds": ["C12-O1", "C12-O8"],
        "capabilityId": "C12",
        "shortDesc": "EM tolerates a known toxic or underperforming person because the team has learned to 'work around' them",
        "warningSigns": "New hires warned informally about 'how to handle' a specific person; team has workarounds for someone's behavior; complaints in skip-levels about someone EM hasn't addressed; code review avoidance patterns around one person; 1:1s with other reports frequently mention the same person",
        "impact": "Psychological safety destroyed for everyone except the problem person; high performers leave because they shouldn't have to compensate; team energy diverted to managing around one person instead of doing work; EM's credibility eroded — team sees the avoidance",
        "recoveryActions": "Name it: acknowledge the problem exists instead of hoping it resolves. Document specific behaviors (not personality traits) with dates and impact. Deliver direct feedback with clear expectations and timeline. If behavior doesn't change, escalate to PIP or managed exit. The team is watching how you handle this — inaction is a decision that signals tolerance. Google's culture research shows that teams with one unaddressed toxic member have 30-40% lower psychological safety scores — the cost of inaction is measurable.",
        "sourceTopic": "Engineering Culture & Team Identity",
        "mappingNotes": "Missing stair → psychological safety / toxic behavior intervention observables"
    },
    {
        "id": "AP-41",
        "name": "Culture Tourism",
        "slug": "culture-tourism",
        "observableIds": ["C12-O2", "C12-O4"],
        "capabilityId": "C12",
        "shortDesc": "EM treats culture building as periodic events (off-sites, pizza, team lunches) rather than daily structural practices",
        "warningSigns": "Team building = quarterly off-sites; culture initiative = Slack emoji reactions; no written team norms; culture conversations only happen when engagement scores drop; fun activities substituted for addressing real team dysfunction; 'we have great culture' but people are leaving",
        "impact": "Surface-level camaraderie masks deep team dysfunction; real culture problems never addressed; budget spent on events instead of structural changes; team cynical about 'culture initiatives'; new hires experience disconnect between marketed culture and reality",
        "recoveryActions": "Culture is daily decisions, not quarterly events. Audit: are your team norms written? Does hiring reinforce desired culture? Does recognition align with values? Does the feedback process surface real issues? Events complement structural culture — they can't substitute for it. Stripe's culture is embedded in their writing culture, hiring rubrics, and feedback norms — not in their office perks or events.",
        "sourceTopic": "Engineering Culture & Team Identity",
        "mappingNotes": "Culture tourism → team charter / recognition rituals observables"
    },

    # C10
    {
        "id": "AP-42",
        "name": "Peanut Butter Spreading",
        "slug": "peanut-butter-spreading",
        "observableIds": ["C10-O2", "C10-O8"],
        "capabilityId": "C10",
        "shortDesc": "EM distributes resources evenly across all projects instead of concentrating on highest-impact bets",
        "warningSigns": "Every project gets exactly 1-2 engineers; no project has enough resources to succeed; everything moves slowly; nothing gets killed; team feels spread thin; 'we're working on everything' but shipping nothing meaningful",
        "impact": "No project gets enough investment to succeed; velocity is slow everywhere; team frustrated by inability to finish anything; leadership sees lots of activity but no outcomes; competitors who focus beat you on every front",
        "recoveryActions": "Rank projects by expected impact. Staff top 2-3 projects properly. Explicitly pause or kill bottom-tier projects. Better to ship 3 things excellently than 8 things poorly. Communicate the focusing decision with rationale. Amazon's two-pizza team model implicitly prevents peanut-butter spreading — if a project can't justify a full team, it either gets killed or folded into an existing team's scope.",
        "sourceTopic": "Resource Allocation & Cost Management",
        "mappingNotes": "Peanut butter spreading → aggressive reprioritization / capacity reallocation observables"
    },

    # C7
    {
        "id": "AP-43",
        "name": "The Telephone Game",
        "slug": "the-telephone-game",
        "observableIds": ["C7-O2", "C7-O9"],
        "capabilityId": "C7",
        "shortDesc": "information degrades as it passes through management layers because there's no source-of-truth documentation",
        "warningSigns": "Team's understanding of strategy differs from leadership's intent; 'I heard from my manager who heard from their manager' is common; written strategy docs don't exist or are stale; different teams interpret the same directive differently; confusion after all-hands about what was actually decided",
        "impact": "Teams work on the wrong things because they received garbled strategy; leadership confused why execution doesn't match intent; trust erodes as different managers tell different stories; rework when misalignment is eventually discovered",
        "recoveryActions": "Write it down. Every important decision, strategy shift, and priority change should have a single written source of truth accessible to everyone affected. Use 'strategy on a page' documents. After verbal communication, follow up with written summary. Ask team to reflect back what they understood — check for signal loss. Amazon's 6-pager culture ensures that strategic communication is written, precise, and readable by anyone in the org — eliminating the telephone game by design.",
        "sourceTopic": "Decision Framing & Communication",
        "mappingNotes": "Telephone game → communication altitude / scaling communication observables"
    },

    # C14
    {
        "id": "AP-44",
        "name": "The Recency Trap",
        "slug": "the-recency-trap",
        "observableIds": ["C14-O1", "C14-O7"],
        "capabilityId": "C14",
        "shortDesc": "EM's performance assessment dominated by last 6 weeks instead of full review period, rewarding or punishing based on timing rather than sustained performance",
        "warningSigns": "Review feedback mostly references recent projects; engineers who had strong H1 but quiet H2 get middling reviews; someone's one mistake in November overshadows 10 months of excellence; EM can't cite specific examples from early in the review period; performance rating correlates with what happened last month, not the full cycle",
        "impact": "Reviews feel unfair; high performers who had a rough final month get underrated; coasting employees who happened to have a good recent week get overrated; trust in the review process erodes; engineers learn to time their visible work around review deadlines",
        "recoveryActions": "Keep running performance notes updated weekly — not reconstructed at review time. Review your notes at the start of cycle, middle, and end to weight the full period. Ask for peer feedback that covers the full cycle. Use brag docs that engineers maintain throughout the cycle. Structure your review to explicitly address each quarter. Google's Perf encourages managers to maintain 'snippets' — weekly notes on each report — ensuring full-cycle visibility rather than recency-dependent assessment.",
        "sourceTopic": "Performance, Calibration & Growth",
        "mappingNotes": "Recency trap → continuous performance documentation / evidence-based reviews observables"
    },
]

# ── NEW PLAYBOOKS ───────────────────────────────────────────────────
new_playbooks = [
    # C12
    {
        "id": "P-C12-3",
        "slug": "your-team-culture-is-deteriorating-after-rapid-growth",
        "observableIds": ["C12-O1", "C12-O2", "C12-O6"],
        "capabilityIds": ["C12"],
        "title": "Your Team Culture Is Deteriorating After Rapid Growth",
        "context": "Your team doubled from 6 to 12 in 3 months. Skip-level feedback reveals new hires feel excluded, original team members feel their culture is gone, and collaboration norms are breaking down.",
        "topicsActivated": [
            "Team Health (Culture Continuity)",
            "Onboarding (Cultural Integration)",
            "Communication (Scaling Norms)"
        ],
        "decisionFramework": "1. Diagnose: run anonymous team health survey to quantify the problem. 2. Acknowledge: in team meeting, name the challenge — growth is hard, culture erosion is natural, and you're going to address it intentionally. 3. Rebuild: facilitate team charter session with ALL members (not just originals) to co-create norms. 4. Pair: create culture buddy system pairing new hires with veterans. 5. Formalize: document onboarding culture guide. 6. Monitor: monthly culture pulse checks for 2 quarters. 7. Adjust: iterate on norms based on feedback.",
        "commonMistakes": "Assuming culture will 'rub off' naturally. Only listening to original team members. Treating it as a one-time off-site exercise. Not documenting norms (they live in people's heads). Blaming new hires for 'not getting it'. Trying to preserve old culture exactly instead of evolving it.",
        "whatGoodLooksLike": "Co-created team charter within 4 weeks of recognizing the problem. New and tenured members both feel ownership of team norms. Culture buddy program running. Monthly pulse checks showing improvement within 2 months. New hires report feeling integrated within 60 days. Industry reference: Spotify uses squad Health Checks to make cultural dimensions explicit and discussable, enabling rapid intervention when scores decline.",
        "mappingNotes": "Culture deterioration during growth scenario",
        "suggestedMetricIds": ["7.1", "7.2", "5.1"]
    },
    {
        "id": "P-C12-4",
        "slug": "addressing-a-toxic-team-member-senior-engineer-others-avoid",
        "observableIds": ["C12-O1", "C12-O8"],
        "capabilityIds": ["C12", "C6"],
        "title": "Addressing a Toxic Senior Engineer the Team Works Around",
        "context": "Your most technically skilled senior engineer is dismissive in code reviews, dominates discussions, and makes junior engineers afraid to speak up. The team has learned to 'work around' this person, but you're losing good people.",
        "topicsActivated": [
            "Team Health (Psychological Safety)",
            "Performance (Behavioral Standards)",
            "Culture (Norm Enforcement)"
        ],
        "decisionFramework": "1. Document: collect specific behavioral examples with dates and impact (code review comments, meeting behaviors, peer feedback). 2. Private 1:1: deliver feedback using SBI framework — specific behavior, its impact on team and business, expected change. 3. Set timeline: clear behavioral expectations with 30-day checkpoint. 4. Support: provide coaching or resources (communication training, mentoring). 5. Monitor: check with team members (without naming) about improvement. 6. Follow through: if no improvement at 30 days, escalate to formal performance process. 7. Communicate: when behavior improves, acknowledge it; if person exits, address team about culture standards.",
        "commonMistakes": "Avoiding the conversation because of the person's technical value. Giving vague feedback like 'be nicer'. Addressing it publicly instead of privately first. Not documenting specific examples. Treating it as a personality issue rather than behavioral impact. Waiting for an HR complaint instead of acting proactively.",
        "whatGoodLooksLike": "Feedback delivered within 1 week of recognizing the pattern. Specific behavioral examples cited. Clear improvement plan with timeline. Psychological safety survey administered before and 30 days after intervention. Outcome: either behavioral improvement or managed exit. Team knows culture standards are enforced regardless of seniority. Industry reference: Netflix's culture memo explicitly states that brilliant jerks are a net negative — technical skill doesn't exempt anyone from behavioral standards.",
        "mappingNotes": "Toxic senior engineer scenario",
        "suggestedMetricIds": ["7.1", "5.1", "7.2"]
    },

    # C10
    {
        "id": "P-C10-4",
        "slug": "asked-to-do-more-with-fewer-people-after-layoffs",
        "observableIds": ["C10-O2", "C10-O6", "C10-O8"],
        "capabilityIds": ["C10"],
        "title": "Asked to Do More With Fewer People After Layoffs",
        "context": "After a round of layoffs, your team lost 3 of 10 engineers. Leadership still expects the same deliverables. Team morale is low, survivors are anxious, and you need to figure out what's actually possible.",
        "topicsActivated": [
            "Resource Allocation (Capacity Planning)",
            "Stakeholder Mgmt (Expectation Setting)",
            "Team Health (Post-Layoff Recovery)"
        ],
        "decisionFramework": "1. Immediate (Week 1): Acknowledge the loss with the team — don't pretend things are normal. Address survivor anxiety directly. 2. Assess (Week 1-2): Map remaining capacity honestly. Identify critical path work vs. nice-to-haves. 3. Present options (Week 2-3): Go to leadership with tiered plan — (A) what's possible with current team, (B) what requires deprioritizing, (C) what needs to stop entirely. Use data, not emotions. 4. Communicate (Week 3): Share the new reality with team and stakeholders. Be specific about what stops. 5. Protect (Ongoing): Shield team from creeping scope. Monitor burnout signals aggressively. 6. Optimize (Month 2+): Identify automation and process improvements that multiply remaining capacity.",
        "commonMistakes": "Accepting all original commitments and expecting the team to absorb the load. Not acknowledging the emotional impact of layoffs. Presenting a single option instead of tiered trade-offs. Burning out remaining team trying to prove the layoffs weren't needed. Not renegotiating timelines with stakeholders. Being vague about what stops — 'we'll try our best' is not a plan.",
        "whatGoodLooksLike": "Honest capacity assessment within 2 weeks. Tiered options presented to leadership with quantified trade-offs. At least 30% of previous scope explicitly deprioritized or stopped. Team morale stabilized within 6 weeks (measured). No additional regrettable departures in the quarter following layoffs. Industry reference: Shopify's 2023 post-layoff playbook focused on radical scope reduction rather than expecting remaining team to absorb the load — leadership explicitly killed projects proportional to headcount reduction.",
        "mappingNotes": "Post-layoff resource management scenario",
        "suggestedMetricIds": ["7.1", "5.1", "1.2"]
    },

    # C7
    {
        "id": "P-C7-2",
        "slug": "communicating-a-major-technical-decision-that-not-everyone-agrees-with",
        "observableIds": ["C7-O1", "C7-O6", "C7-O10"],
        "capabilityIds": ["C7"],
        "title": "Communicating a Major Technical Decision Not Everyone Agrees With",
        "context": "After an RFC process, you've decided to migrate from microservices back to a modular monolith. Senior engineers are split — some are excited, others feel their microservices expertise is being devalued. You need to communicate the decision without creating factions.",
        "topicsActivated": [
            "Decision Framing (Controversial Decisions)",
            "Communication (Technical Audience)",
            "Culture (Constructive Disagreement)"
        ],
        "decisionFramework": "1. Document the decision fully: what was decided, why, what alternatives were considered and why they were rejected. 2. Acknowledge dissent: name the strongest counter-arguments and explain specifically why you decided differently. 3. Communicate in writing first: publish the decision doc before the meeting so people can process it. 4. Hold a Q&A: let people ask questions and express concerns without relitigating. 5. Commit explicitly: 'This is the decision. If you disagree, I respect that, and I need you to commit to execution.' 6. Follow up individually: talk to the loudest dissenters 1:1 to address concerns and check for commitment.",
        "commonMistakes": "Announcing without explaining the reasoning. Dismissing disagreement as 'not understanding'. Not documenting the alternative options considered. Relitigating the decision in every meeting. Making it personal — 'I decided' vs. 'we evaluated'. Not following up with dissenters who might sabotage silently.",
        "whatGoodLooksLike": "Decision doc published with alternatives analysis. Team can articulate the reasoning even if they disagreed. Execution begins within 2 weeks. No underground resistance. Dissenters feel heard even though they didn't 'win'. Team retrospective at 90 days evaluates whether the decision is working. Industry reference: Amazon's 'disagree and commit' principle provides a clear framework — voice disagreement during the decision process, commit fully once the decision is made.",
        "mappingNotes": "Controversial technical decision communication scenario",
        "suggestedMetricIds": ["1.2", "8.4"]
    },
    {
        "id": "P-C7-3",
        "slug": "your-team-has-communication-debt-decisions-not-documented",
        "observableIds": ["C7-O6", "C7-O9"],
        "capabilityIds": ["C7", "C4"],
        "title": "Your Team Has Communication Debt — Decisions Aren't Documented",
        "context": "Your team has grown from 5 to 15 people. Key technical decisions live in Slack threads, hallway conversations, and individual memories. New hires can't find context. The same decisions are relitigated monthly. You're drowning in 'quick syncs'.",
        "topicsActivated": [
            "Communication (Documentation Practices)",
            "Decision Making (Process Design)",
            "Operational Rhythm (Scaling)"
        ],
        "decisionFramework": "1. Audit: List the top 10 decisions made in the last quarter — can you find the documentation? If not, you have communication debt. 2. Triage: retroactively document the most impactful undocumented decisions (tech choices, process decisions, ownership assignments). 3. Introduce lightweight RFC process: not bureaucratic — a simple template for decisions that affect >2 people. 4. Create decision log: a single page listing recent decisions with links to context. 5. Establish norms: 'If it was decided in Slack, it didn't happen until it's in the decision log.' 6. Review: monthly audit of decision documentation completeness.",
        "commonMistakes": "Making the RFC process too heavy (kills adoption). Not retroactively documenting the most critical past decisions. Expecting the team to change overnight (habits take weeks). Documenting everything (leads to documentation fatigue). Not having a single searchable location for decisions. Confusing meeting notes with decision documentation.",
        "whatGoodLooksLike": "Within 6 weeks: lightweight RFC template adopted, decision log created and maintained, new hires can find context for major decisions without asking. Within 3 months: same-decision relitigations drop measurably. Communication overhead per person decreases as team scales. Industry reference: Spotify's decision log (DACI-based) ensures every significant decision has a single documented source of truth accessible to the entire squad and stakeholders.",
        "mappingNotes": "Communication debt and documentation scaling scenario",
        "suggestedMetricIds": ["1.2", "2.1"]
    },

    # C14
    {
        "id": "P-C14-3",
        "slug": "high-performer-wants-promotion-but-isnt-ready",
        "observableIds": ["C14-O5", "C14-O8"],
        "capabilityIds": ["C14", "C6"],
        "title": "High Performer Wants Promotion But Isn't Ready",
        "context": "Your best engineer is pushing hard for promotion to Senior. They're technically excellent and deliver consistently, but they lack the influence, mentoring, and scope leadership expected at the next level. They're getting impatient and you're worried about retention.",
        "topicsActivated": [
            "Performance (Promotion Readiness)",
            "Coaching (Development Planning)",
            "Retention (Managing Expectations)"
        ],
        "decisionFramework": "1. Validate: Review the level expectations document and honestly assess where the engineer is vs. where they need to be. 2. Prepare the conversation: document specific gaps with examples (not 'you need more leadership' but 'at Senior level, you'd need to have led a cross-team initiative end-to-end'). 3. Deliver with care: acknowledge their strengths, name the specific gaps, and frame it as 'here's what we're building toward' not 'you're not good enough'. 4. Co-create a plan: identify 2-3 specific stretch opportunities over the next 6 months that address the gaps. 5. Commit to support: regular check-ins on progress, sponsor for the right opportunities, provide visibility. 6. Manage retention: separate promo from retention — explore comp adjustment, scope expansion, or recognition to address flight risk without premature promotion.",
        "commonMistakes": "Promoting to retain (creates level inflation and sets them up to fail). Vague feedback like 'you need more scope'. Not separating retention from promotion — they're different problems. Saying 'maybe next cycle' without a concrete plan. Comparing them to others who were promoted. Not sponsoring opportunities that would fill the gaps. Over-promising timeline for promotion.",
        "whatGoodLooksLike": "Specific gap analysis delivered within 2 weeks. 6-month development plan with concrete milestones co-created. At least one stretch assignment initiated within 30 days. Monthly check-ins on progress. Engineer feels invested in (not rejected). If comp is the real issue, address it separately. Industry reference: Google's promo committee model requires sustained next-level evidence across multiple review periods — managers coach to the bar rather than lowering it, and use 'development partnership' framing to retain ambitious engineers.",
        "mappingNotes": "Promotion readiness gap management scenario",
        "suggestedMetricIds": ["5.1", "7.1"]
    },
]

# ── NEW INTERVIEW QUESTIONS ─────────────────────────────────────────
new_interview_qs = [
    # C12 (currently 4, adding 4 → 8)
    {
        "id": "IQ-71",
        "capabilityId": "C12",
        "question": "Tell me about a time you inherited or observed a team culture that was unhealthy. How did you diagnose the issues and what did you change?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you measure whether the culture actually changed?",
            "What resistance did you encounter and how did you handle it?",
            "How long did it take to see real change?"
        ],
        "lookFor": [
            "Systematic diagnosis rather than gut feel",
            "Specific actions beyond 'team building events'",
            "Patience — understanding culture change takes months",
            "Measurement of cultural outcomes"
        ],
        "redFlags": [
            "Only mentions surface-level interventions (pizza, off-sites)",
            "Blames the team rather than examining structural causes",
            "No evidence of measuring change",
            "Replaced the team instead of addressing culture"
        ]
    },
    {
        "id": "IQ-72",
        "capabilityId": "C12",
        "question": "Describe how you've intentionally designed team norms or a team charter. What principles did you establish and how did you reinforce them?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you get buy-in from the team rather than imposing norms top-down?",
            "What happened when someone violated the norms?",
            "How did you onboard new team members into these norms?"
        ],
        "lookFor": [
            "Collaborative norm-setting rather than dictating",
            "Written, explicit norms rather than assumed",
            "Enforcement through coaching, not punishment",
            "Regular revisiting and updating of norms"
        ],
        "redFlags": [
            "Norms imposed without team input",
            "No mechanism for enforcement or evolution",
            "Confuses rules with culture",
            "Never revisited norms after initial creation"
        ]
    },
    {
        "id": "IQ-73",
        "capabilityId": "C12",
        "question": "How do you ensure every team member has equal opportunity to contribute, especially quieter or underrepresented members?",
        "level": "em",
        "questionType": "situational",
        "followUps": [
            "How do you track whether opportunity distribution is actually equitable?",
            "Can you give a specific example of a structural change you made to improve inclusion?",
            "How do you handle someone who consistently dominates discussions?"
        ],
        "lookFor": [
            "Structural solutions (rotating facilitators, written-first processes) not just good intentions",
            "Awareness of power dynamics and privilege",
            "Tracking mechanisms for opportunity distribution",
            "Willingness to address dominant behaviors"
        ],
        "redFlags": [
            "Claims everyone already has equal opportunity without evidence",
            "Relies on 'open door policy' without structural support",
            "Hasn't noticed or addressed participation imbalances",
            "Conflates equality with equity"
        ]
    },
    {
        "id": "IQ-74",
        "capabilityId": "C12",
        "question": "Tell me about a time you had to address toxic behavior from a high-performing team member. What was the behavior, how did you handle it, and what was the outcome?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you balance the person's technical contributions against their behavioral impact?",
            "How did the rest of the team respond to your intervention?",
            "What would you do differently next time?"
        ],
        "lookFor": [
            "Swift action — didn't let the behavior persist for months",
            "Specific behavioral feedback, not personality attacks",
            "Willingness to enforce standards regardless of seniority",
            "Awareness of the team-wide impact of individual behavior"
        ],
        "redFlags": [
            "Tolerated the behavior because the person was technically strong",
            "Only acted after an HR complaint or attrition",
            "Vague feedback that didn't address specific behaviors",
            "Doesn't acknowledge the team-wide cost of toxic behavior"
        ]
    },

    # C10 (currently 4, adding 4 → 8)
    {
        "id": "IQ-75",
        "capabilityId": "C10",
        "question": "Describe a time you had to make difficult resource allocation decisions — where you had more work than capacity. How did you decide what to fund and what to cut?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you communicate the trade-offs to stakeholders?",
            "What framework did you use to evaluate competing priorities?",
            "How did you handle pushback from stakeholders whose projects were cut?"
        ],
        "lookFor": [
            "Data-driven prioritization framework, not gut feel",
            "Transparent communication of trade-offs",
            "Willingness to make hard calls and say no",
            "Evidence of stakeholder management around the decision"
        ],
        "redFlags": [
            "Tried to do everything (peanut-butter spreading)",
            "Made decisions without stakeholder input or communication",
            "Can't articulate the criteria used for prioritization",
            "Avoided making cuts and let the team burn out instead"
        ]
    },
    {
        "id": "IQ-76",
        "capabilityId": "C10",
        "question": "Tell me about a time you built a business case for headcount or significant engineering investment. How did you quantify the ROI?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What data did you use to support your case?",
            "How did you present different investment tiers and their trade-offs?",
            "What happened when the request was partially approved?"
        ],
        "lookFor": [
            "Quantified ROI, not just qualitative arguments",
            "Multiple options presented with clear trade-offs",
            "Understanding of financial/business context",
            "Ability to adapt when full request isn't approved"
        ],
        "redFlags": [
            "Only argument was 'we need more people'",
            "No ROI quantification or business case",
            "Binary ask (all or nothing) rather than tiered options",
            "Couldn't adapt to partial approval"
        ]
    },
    {
        "id": "IQ-77",
        "capabilityId": "C10",
        "question": "How do you decide the right mix of full-time engineers, contractors, and vendor solutions for your team? Walk me through a real example.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What criteria do you use to determine what should be done in-house vs. outsourced?",
            "How do you manage quality and knowledge transfer with contractors?",
            "What are the hidden costs of vendor solutions that most managers miss?"
        ],
        "lookFor": [
            "Principled framework for build-vs-buy-vs-contract decisions",
            "Understanding of total cost of ownership beyond salary",
            "Awareness of knowledge transfer and quality risks",
            "Experience managing mixed teams effectively"
        ],
        "redFlags": [
            "No framework — decisions made ad hoc",
            "Only considers cost, not knowledge retention or quality",
            "Treats contractors as second-class team members",
            "No experience managing vendor relationships"
        ]
    },
    {
        "id": "IQ-78",
        "capabilityId": "C10",
        "question": "Tell me about a time you proactively identified and eliminated wasteful spending or inefficient resource usage on your team.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you identify the waste?",
            "How did you quantify the savings?",
            "How did you communicate this to leadership?"
        ],
        "lookFor": [
            "Proactive identification, not responding to cost-cutting pressure",
            "Quantified impact of the optimization",
            "Balanced approach — didn't cut things that created future risk",
            "Communicated results to leadership demonstrating business acumen"
        ],
        "redFlags": [
            "Only optimized when forced to by budget pressure",
            "Can't quantify the impact",
            "Cut corners that created technical debt or reliability risk",
            "No awareness of cost management as a leadership responsibility"
        ]
    },

    # C7 (currently 4, adding 4 → 8)
    {
        "id": "IQ-79",
        "capabilityId": "C7",
        "question": "Tell me about a time you had to deliver a difficult message to your team or leadership — something they didn't want to hear. How did you prepare and deliver it?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you decide when to deliver the message?",
            "What was the reaction and how did you handle it?",
            "What would you do differently next time?"
        ],
        "lookFor": [
            "Delivered early rather than delaying",
            "Preparation with specific data and proposed solutions",
            "Empathy in delivery combined with clarity",
            "Ownership of the message rather than deflecting"
        ],
        "redFlags": [
            "Delayed delivery hoping the problem would resolve itself",
            "Delivered without a plan or proposed solutions",
            "Blamed others or deflected responsibility",
            "Sugar-coated to the point of obscuring the message"
        ]
    },
    {
        "id": "IQ-80",
        "capabilityId": "C7",
        "question": "Describe a technical or strategic decision you made that was controversial. How did you frame the decision, communicate it, and handle disagreement?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you ensure dissenters felt heard while still moving forward?",
            "How did you document the decision and alternatives considered?",
            "When did you revisit the decision to see if it was working?"
        ],
        "lookFor": [
            "Clear decision framework (DACI, RFC, or similar)",
            "Documentation of alternatives and rationale",
            "Respect for dissent combined with decisiveness",
            "Post-decision follow-up and review"
        ],
        "redFlags": [
            "Made unilateral decisions without input",
            "Couldn't handle disagreement constructively",
            "No documentation of the decision process",
            "Never revisited to evaluate outcomes"
        ]
    },
    {
        "id": "IQ-81",
        "capabilityId": "C7",
        "question": "How do you adapt your communication style when presenting to different audiences — engineers, product managers, executives? Give me a specific example.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you know if your communication was effective?",
            "What's the biggest communication failure you've had and what did you learn?",
            "How do you handle when your audience isn't understanding your point?"
        ],
        "lookFor": [
            "Conscious altitude adjustment (detail vs. summary)",
            "Audience awareness and empathy",
            "Specific examples of adapting the same message",
            "Self-awareness about communication failures"
        ],
        "redFlags": [
            "Same communication style regardless of audience",
            "Too deep in technical detail with executives",
            "Too shallow with engineers (perceived as not technical)",
            "No awareness of when communication is failing"
        ]
    },
    {
        "id": "IQ-82",
        "capabilityId": "C7",
        "question": "Tell me about a time your team or organization was making a decision that kept getting revisited. How did you break the loop?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What was causing the revisitation?",
            "What process or framework did you introduce?",
            "How did you prevent the same pattern from recurring?"
        ],
        "lookFor": [
            "Root cause analysis of why decisions were being revisited",
            "Introduction of process or framework to prevent recurrence",
            "Balance between inclusivity and decisiveness",
            "Documentation as a tool for closure"
        ],
        "redFlags": [
            "Forced a decision through without addressing underlying concerns",
            "Couldn't identify the root cause of revisitation",
            "No systemic fix — just made this one decision stick",
            "Blamed others for indecision"
        ]
    },

    # C14 (currently 4, adding 4 → 8)
    {
        "id": "IQ-83",
        "capabilityId": "C14",
        "question": "Walk me through how you prepare for and navigate a performance calibration session. How do you ensure fair outcomes for your reports?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you handle when a peer manager's calibration standard is very different from yours?",
            "What do you do when the calibration committee pushes back on your ratings?",
            "How do you address recency bias in calibration discussions?"
        ],
        "lookFor": [
            "Thorough preparation with evidence portfolio for each report",
            "Understanding of calibration purpose (consistency, not ranking)",
            "Willingness to advocate for reports with data",
            "Honest differentiation rather than Lake Wobegon ratings"
        ],
        "redFlags": [
            "Goes in without prepared evidence",
            "Treats calibration as adversarial rather than collaborative",
            "Rates everyone the same to avoid conflict",
            "Can't articulate why their ratings differ from peer managers'"
        ]
    },
    {
        "id": "IQ-84",
        "capabilityId": "C14",
        "question": "Tell me about a time you had to put someone on a performance improvement plan. How did you approach it, and what happened?",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How did you decide that a PIP was necessary rather than continued coaching?",
            "What support did you provide during the PIP period?",
            "How did the team perceive and react to the situation?"
        ],
        "lookFor": [
            "PIP as a genuine improvement tool, not a firing process",
            "Clear, measurable success criteria",
            "Real coaching and support during the PIP",
            "Prior feedback and coaching before PIP was initiated"
        ],
        "redFlags": [
            "PIP with no prior feedback — first time hearing about problems",
            "PIP designed to fail (unrealistic goals, no support)",
            "No documentation of coaching prior to PIP",
            "Sees PIP solely as legal cover for termination"
        ]
    },
    {
        "id": "IQ-85",
        "capabilityId": "C14",
        "question": "How do you build promotion cases for your engineers? Describe your approach to identifying readiness and building evidence over time.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "How do you handle an engineer who wants to be promoted but isn't ready?",
            "How do you ensure equitable promotion opportunities across your team?",
            "How do you balance sponsoring promotions with maintaining a high bar?"
        ],
        "lookFor": [
            "Long-term evidence building, not last-minute scramble",
            "Deliberate gap identification and stretch assignment creation",
            "Honest conversations about readiness with specific feedback",
            "Equitable approach across different backgrounds and styles"
        ],
        "redFlags": [
            "Promotes for retention rather than readiness",
            "Can't articulate the difference between current level and next level",
            "Builds promotion cases only when explicitly asked",
            "Inequitable pattern — some engineers consistently overlooked"
        ]
    },
    {
        "id": "IQ-86",
        "capabilityId": "C14",
        "question": "How do you manage performance feedback as a continuous practice versus an end-of-cycle surprise? Give me a specific example of how you've avoided review surprises.",
        "level": "em",
        "questionType": "behavioral",
        "followUps": [
            "What's your system for tracking performance throughout the cycle?",
            "How do you ensure feedback is timely — within days, not months?",
            "How do you balance real-time feedback with formal review cycles?"
        ],
        "lookFor": [
            "Continuous documentation and feedback cadence",
            "No surprises at review time — themes discussed throughout cycle",
            "Specific tracking system (running notes, brag docs, etc.)",
            "Integration of feedback into regular 1:1s"
        ],
        "redFlags": [
            "Scrambles to write reviews from memory at cycle end",
            "Reports are surprised by review feedback",
            "No system for ongoing tracking",
            "Feedback only delivered during formal review cycles"
        ]
    },
]

# ── NEW CALIBRATION SIGNALS ─────────────────────────────────────────
new_calibration_signals = [
    # C12 signals
    {
        "id": "SIG-214",
        "observableId": "C12-O6",
        "capabilityId": "C12",
        "signalText": "Cultural stewardship during growth: 'Scaled team from 8 to 20 while maintaining top-quartile engagement scores — structured culture onboarding, buddy system, and quarterly norms review'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Cultural Continuity"
    },
    {
        "id": "SIG-215",
        "observableId": "C12-O7",
        "capabilityId": "C12",
        "signalText": "Inclusive participation: 'Restructured design review process with written-first input — participation from underrepresented team members increased from 30% to 75%'",
        "signalType": "metric",
        "sourceSubTopic": "Inclusive Feedback Channels"
    },
    {
        "id": "SIG-216",
        "observableId": "C12-O8",
        "capabilityId": "C12",
        "signalText": "Culture enforcement: 'Addressed senior engineer's dismissive behavior within 48 hours — behavior improved within 30 days, team psychological safety scores recovered by next survey'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Toxic Behavior Intervention"
    },
    # C10 signals
    {
        "id": "SIG-217",
        "observableId": "C10-O6",
        "capabilityId": "C10",
        "signalText": "Resource planning maturity: 'Every headcount request includes three tiers with quantified ROI and explicit trade-offs — leadership approval rate increased from 40% to 85%'",
        "signalType": "metric",
        "sourceSubTopic": "Tiered Resource Planning"
    },
    {
        "id": "SIG-218",
        "observableId": "C10-O7",
        "capabilityId": "C10",
        "signalText": "FinOps discipline: 'Established cost-per-transaction dashboards — identified $300K/year in idle infrastructure, redirected savings to reliability investment'",
        "signalType": "metric",
        "sourceSubTopic": "Engineering ROI Tracking"
    },
    {
        "id": "SIG-219",
        "observableId": "C10-O8",
        "capabilityId": "C10",
        "signalText": "Dynamic reallocation: 'Proactively reallocated 3 engineers from diminishing-return project to critical reliability initiative mid-quarter — SLA improvement from 99.5% to 99.95% with no stakeholder escalation'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Dynamic Resource Reallocation"
    },
    # C7 signals
    {
        "id": "SIG-220",
        "observableId": "C7-O8",
        "capabilityId": "C7",
        "signalText": "Difficult conversation skill: 'Delivered 12 difficult messages in H2 (promotion rejections, project cancellations, performance concerns) — all within 48 hours of trigger, zero surprises in skip-levels'",
        "signalType": "metric",
        "sourceSubTopic": "Difficult Conversations"
    },
    {
        "id": "SIG-221",
        "observableId": "C7-O9",
        "capabilityId": "C7",
        "signalText": "Communication scaling: 'Introduced RFC process + decision log as team grew to 20 — meeting hours per engineer dropped 35%, decision revisitation incidents dropped from 8/quarter to 1'",
        "signalType": "metric",
        "sourceSubTopic": "Communication Scaling"
    },
    {
        "id": "SIG-222",
        "observableId": "C7-O10",
        "capabilityId": "C7",
        "signalText": "Distributed authority: 'Documented decision authority matrix — team now makes 85% of decisions autonomously, escalation rate down 60%, team reports feeling more empowered in engagement survey'",
        "signalType": "metric",
        "sourceSubTopic": "Decision Authority Distribution"
    },
    # C14 signals
    {
        "id": "SIG-223",
        "observableId": "C14-O7",
        "capabilityId": "C14",
        "signalText": "Continuous documentation practice: 'Maintained weekly performance notes for all reports — review preparation time dropped from 2 weeks to 3 days, zero 'surprise' complaints in post-review feedback'",
        "signalType": "metric",
        "sourceSubTopic": "Continuous Performance Documentation"
    },
    {
        "id": "SIG-224",
        "observableId": "C14-O8",
        "capabilityId": "C14",
        "signalText": "High performer investment: 'Created stretch assignment program for top performers — 3 of 4 achieved promotion readiness within 12 months, zero regrettable departures from top-performer cohort'",
        "signalType": "metric",
        "sourceSubTopic": "High Performer Development"
    },
    # C2 signals
    {
        "id": "SIG-225",
        "observableId": "C2-O5",
        "capabilityId": "C2",
        "signalText": "Strategic trade-off transparency: 'Published not-doing list alongside roadmap — stakeholder re-litigation dropped 65%, team focus improved measurably'",
        "signalType": "metric",
        "sourceSubTopic": "Strategic Trade-off Transparency"
    },
    {
        "id": "SIG-226",
        "observableId": "C2-O6",
        "capabilityId": "C2",
        "signalText": "Outcome-connected planning: 'Required business success metrics for all initiatives — identified 2 low-impact projects mid-quarter and reallocated to higher-ROI work'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Outcome-Connected Planning"
    },
    # C8 signals
    {
        "id": "SIG-227",
        "observableId": "C8-O7",
        "capabilityId": "C8",
        "signalText": "Proactive resilience: 'Quarterly game days discovered 5 runbook gaps and 3 tooling issues before production impact — MTTR improved 40% in real incidents'",
        "signalType": "metric",
        "sourceSubTopic": "Proactive Resilience Testing"
    },
    {
        "id": "SIG-228",
        "observableId": "C8-O8",
        "capabilityId": "C8",
        "signalText": "Error budget discipline: 'Implemented SLO-based error budgets — automatically triggered reliability sprint when checkout service consumed 80% of monthly budget, preventing SLA breach'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Error Budget Management"
    },
]

# ── APPLY ALL ADDITIONS ─────────────────────────────────────────────
print("=== Applying Enrichments ===")

# Add observables
observables.extend(new_observables)
save('src/data/observables.json', observables)
print(f"  Added {len(new_observables)} observables (total: {len(observables)})")

# Add anti-patterns
anti_patterns.extend(new_anti_patterns)
save('src/data/anti-patterns.json', anti_patterns)
print(f"  Added {len(new_anti_patterns)} anti-patterns (total: {len(anti_patterns)})")

# Add playbooks
playbooks.extend(new_playbooks)
save('src/data/playbooks.json', playbooks)
print(f"  Added {len(new_playbooks)} playbooks (total: {len(playbooks)})")

# Add interview questions
interview_qs.extend(new_interview_qs)
save('src/data/interview-questions.json', interview_qs)
print(f"  Added {len(new_interview_qs)} interview questions (total: {len(interview_qs)})")

# Add calibration signals
calibration_signals.extend(new_calibration_signals)
save('src/data/calibration-signals.json', calibration_signals)
print(f"  Added {len(new_calibration_signals)} calibration signals (total: {len(calibration_signals)})")

print("\n=== Summary ===")
print(f"New observables: {len(new_observables)}")
print(f"  C12: 3 new (5→8)")
print(f"  C10: 3 new (5→8)")
print(f"  C7:  3 new (7→10)")
print(f"  C14: 2 new (6→8)")
print(f"  C2:  2 new (4→6)")
print(f"  C8:  2 new (6→8)")
print(f"New anti-patterns: {len(new_anti_patterns)}")
print(f"  C12: 2 new (AP-40, AP-41)")
print(f"  C10: 1 new (AP-42)")
print(f"  C7:  1 new (AP-43)")
print(f"  C14: 1 new (AP-44)")
print(f"New playbooks: {len(new_playbooks)}")
print(f"  C12: 2 new (P-C12-3, P-C12-4)")
print(f"  C10: 1 new (P-C10-4)")
print(f"  C7:  2 new (P-C7-2, P-C7-3)")
print(f"  C14: 1 new (P-C14-3)")
print(f"New interview questions: {len(new_interview_qs)}")
print(f"  C12: 4 new (IQ-71..74)")
print(f"  C10: 4 new (IQ-75..78)")
print(f"  C7:  4 new (IQ-79..82)")
print(f"  C14: 4 new (IQ-83..86)")
print(f"New calibration signals: {len(new_calibration_signals)}")

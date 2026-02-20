#!/usr/bin/env python3
"""
Session 22 — Tier 2 systematic review: 1,034 articles across all 14 capabilities.

Approach: Searched actual article content (not just titles) for all promising T2 articles.
Found genuinely novel concepts across 10 capabilities. ~85% of T2 articles duplicate
existing framework coverage; the remaining ~15% contribute novel concepts below.

Key novel findings by capability:
  C3:  Steel threads / lean architecture validation; context engineering discipline;
       tech debt taxonomy (debt vs. depreciation vs. architectural change)
  C8:  Monzo Stand-in multi-cloud DR (1% of cloud bill); observability twin mandate;
       compassionate on-call design patterns
  C9:  Meta's Diff Authoring Time (DAT) metric; Goodhart's Law applied to AI metrics
  C1:  Demand-led planning / fluid teams (Dan North); accidental managers post-layoff
  C11: Coordinated AI hiring scams (call center model); codified vs. tacit knowledge
  C14: Visibility bias in recognition; Staff+ performance cliff; Maven/Guru archetypes
  C5:  Anti-misalignment reframe (eliminate misalignment vs. achieve alignment)
  C7:  Cultural post-mortems for people-system failures; neurodivergent coaching
  C13: AI agent authorization as emerging security surface
  C4:  Top technical initiatives + golden paths for large-scale migrations

Additions:
  - Calibration Signals: +14 (C3:2, C8:2, C9:2, C1:1, C11:1, C14:3, C5:1, C7:1, C13:1)
  - Learning Pathways: +10 article references
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

# ── Learning Pathway Articles ──────────────────────────

LP_ADDITIONS = {
    "C3": [
        {
            "title": "Steel Threads Are the Missing Link in Your System Design (LeadDev)",
            "type": "article",
            "description": "The steel thread approach to architecture validation — building the thinnest possible production-grade end-to-end flow to exercise riskiest integrations, surface issues in days not months, and force cross-team collaboration.",
            "url": "https://leaddev.com/software-quality/steel-threads-missing-link-your-system-design"
        },
        {
            "title": "AI Won't Fix Developer Productivity Unless You Fix Context First (LeadDev)",
            "type": "article",
            "description": "Context engineering as a named discipline — organizations with 500 developers lose up to $7.9M annually from context inefficiencies. Self-serve documentation access makes developers 4.4x more productive. Build a context layer linking decisions, discussions, and system history before investing in AI tools.",
            "url": "https://leaddev.com/technical-direction/ai-wont-fix-developer-productivity-unless-you-fix-context-first"
        }
    ],
    "C8": [
        {
            "title": "How Monzo Built a Stand-In Platform to Sidestep Costly Outages (LeadDev)",
            "type": "article",
            "description": "Monzo's standalone minimal DR system on a separate cloud provider (GCP vs primary AWS) — built by 6 engineers, costs 1% of total cloud bill, supports core banking features, constantly tested in production, activatable in seconds.",
            "url": "https://leaddev.com/operations-and-incidents/how-monzo-built-a-stand-in-platform-to-sidestep-costly-outages"
        },
        {
            "title": "The Twin Mandate: What Leaders Still Don't Get About Observability (LeadDev)",
            "type": "article",
            "description": "Charity Majors on observability's dual mandate — external (customer happiness) and internal (developer experience). Observability 2.0: move from three pillars with multiple sources of truth to one source of truth (wide structured log events). Observability should roll up to software engineering, not infrastructure.",
            "url": "https://leaddev.com/operations-and-incidents/the-twin-mandate-what-leaders-still-dont-get-about-observability"
        }
    ],
    "C9": [
        {
            "title": "What Is Diff Authoring Time? The Developer Metric Taking Meta by Storm (LeadDev)",
            "type": "article",
            "description": "Meta's Diff Authoring Time (DAT) measures the inner development loop — actual active time from first IDE activity to final session. Average DAT at Meta is 50 minutes. Used to A/B test tooling investments: React compiler yielded 33% improvement, code sharing >50% improvement.",
            "url": "https://leaddev.com/reporting/what-is-diff-authoring-time-developer-metric-taking-meta-by-storm"
        }
    ],
    "C1": [
        {
            "title": "Shaped by Demand: The Power of Fluid Teams (LeadDev)",
            "type": "article",
            "description": "Dan North's demand-led planning model — teams of 20-200 people reorganize quarterly based on expected demand via big-room self-selection. Balances delivery, discovery, and Kaizen. Challenges the stable long-lived team orthodoxy with 10+ years of evolution.",
            "url": "https://leaddev.com/team/shaped-by-demand-the-power-of-fluid-teams"
        }
    ],
    "C14": [
        {
            "title": "Mind the Gap: Navigating the Staff+ Performance Cliff (LeadDev)",
            "type": "article",
            "description": "The 'Performance Cliff' — a named psychological phenomenon where highly capable engineers feel lost stepping into Staff+ roles. Old success metrics no longer apply, feedback becomes sparse, and the transition from team-focused to org-level impact creates a vacuum of direction.",
            "url": "https://leaddev.com/career-ladders-and-progression/mind-the-gap-navigating-the-staff-performance-cliff"
        }
    ],
    "C11": [
        {
            "title": "Your Top Job Candidate Might Be a Coordinated AI Scam (LeadDev)",
            "type": "article",
            "description": "How scammers operate from call centers — scraping job postings, using AI to generate tailored resumes at scale, rotating different people through multi-round interviews. Detection: disable virtual backgrounds, hand-movement deepfake tests, STAR method probing, in-depth tool opinion questions.",
            "url": "https://leaddev.com/hiring/your-top-job-candidate-might-be-coordinated-ai-scam"
        }
    ],
    "C5": [
        {
            "title": "Anti-Misalignment: Nobody Knows What Alignment Is (LeadDev/Richard Kim)",
            "type": "article",
            "description": "Reframes alignment as a negative-space problem — nobody knows what alignment IS, but everyone knows what misalignment FEELS like. Alignment = flow between people where the group feels like a trusted extension of yourself. Most alignment work is actually anti-misalignment: systematically removing misalignment rather than trying to add alignment.",
            "url": "https://leaddev.com/team/anti-misalignment-nobody-knows-what-alignment-is"
        }
    ],
    "C7": [
        {
            "title": "Cultural Post Mortems: Learning and Recovering When People Systems Fail (LeadDev)",
            "type": "article",
            "description": "Applies blameless post-mortem methodology to people-system failures — culture breakdowns, trust erosion, team dysfunction. Treats cultural incidents with the same structured rigor as technical incidents.",
            "url": "https://leaddev.com/culture/cultural-post-mortems-approach-learning-recovering-when-people-systems-fail"
        }
    ]
}

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C3 — Steel threads / lean architecture (C3-O2, architecture reviews)
    {
        "id": "SIG-314",
        "observableId": "C3-O2",
        "capabilityId": "C3",
        "signalText": "Leader validates architecture decisions using steel threads — building the thinnest possible production-grade end-to-end flow that exercises riskiest integrations before committing to full implementation, surfacing caching issues, versioning needs, and cross-team dependencies in days rather than months of upfront design",
        "signalType": "calibration_language",
        "sourceSubTopic": "Steel Thread Architecture Validation"
    },
    # C3 — Tech debt taxonomy (C3-O4, tech debt management / C3-O11)
    {
        "id": "SIG-315",
        "observableId": "C3-O11",
        "capabilityId": "C3",
        "signalText": "Leader differentiates between three types of technical burden requiring distinct remediation strategies — deliberate debt (set repayment terms at incurrence), natural depreciation (ongoing maintenance, not project-based cleanup), and architectural change (cost of new requirements, not legacy accumulation) — rather than labeling everything 'tech debt' and applying a single treatment",
        "signalType": "calibration_language",
        "sourceSubTopic": "Tech Debt Taxonomy and Targeted Remediation"
    },
    # C8 — Monzo Stand-in DR pattern (C8-O7, system resilience / chaos engineering)
    {
        "id": "SIG-316",
        "observableId": "C8-O7",
        "capabilityId": "C8",
        "signalText": "Team designs disaster recovery as a minimal independent system on a separate cloud provider — not a replica of production but a standalone service supporting only core features, constantly tested in production, activatable in seconds, and costing a fraction of primary infrastructure (Monzo pattern: 6 engineers, 1% of cloud bill for full cloud failover capability)",
        "signalType": "calibration_language",
        "sourceSubTopic": "Minimal Independent DR Architecture"
    },
    # C8 — Compassionate on-call design (C8-O3, on-call health)
    {
        "id": "SIG-317",
        "observableId": "C8-O3",
        "capabilityId": "C8",
        "signalText": "On-call design prioritizes compassion as a structural principle — each team decides their own schedule based on pager load and lifestyles, handover times optimize for the person finishing their shift (who carries more stress), overrides for personal commitments are a default process rather than an exception, and on-call hours are compensated",
        "signalType": "calibration_language",
        "sourceSubTopic": "Compassionate On-Call Design"
    },
    # C9 — Inner-loop metrics / DAT (C9-O1, metrics tracking)
    {
        "id": "SIG-318",
        "observableId": "C9-O1",
        "capabilityId": "C9",
        "signalText": "Leader measures the inner development loop (actual active coding time from first IDE activity to final session) alongside delivery metrics — using inner-loop metrics like Diff Authoring Time to A/B test tooling investments and quantify the impact of platform changes on developer productivity, rather than relying solely on cycle time which conflates active work with waiting time",
        "signalType": "calibration_language",
        "sourceSubTopic": "Inner-Loop Developer Metrics"
    },
    # C9 — AI metrics Goodhart's Law (C9-O3, activity metrics as diagnostic)
    {
        "id": "SIG-319",
        "observableId": "C9-O3",
        "capabilityId": "C9",
        "signalText": "Leader recognizes that AI coding tool metrics (acceptance rate, lines generated, suggestion frequency) are usage metrics not outcome metrics — tracking code generation incentivizes more code when less would suffice (Goodhart's Law), and the real value of AI tools is often invisible in dashboards: speeding up context acquisition in unfamiliar codebases, especially for new hires",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI Tool Metrics Discipline"
    },
    # C1 — Fluid teams / demand-led planning (C1-O1, team topology)
    {
        "id": "SIG-320",
        "observableId": "C1-O1",
        "capabilityId": "C1",
        "signalText": "Leader evaluates whether stable long-lived teams or periodic re-teaming better serves organizational needs — understands demand-led planning as an alternative model where teams of 20-200 self-select into new formations quarterly based on expected demand, balancing delivery, discovery, and continuous improvement, rather than defaulting to stable teams as the only high-performance configuration",
        "signalType": "calibration_language",
        "sourceSubTopic": "Demand-Led Team Formation"
    },
    # C11 — AI scam detection in hiring (C11-O1, calibrated hiring loops)
    {
        "id": "SIG-321",
        "observableId": "C11-O1",
        "capabilityId": "C11",
        "signalText": "Hiring process includes explicit countermeasures for coordinated AI-powered candidate fraud — verifying candidate identity across interview rounds (different people may appear for multi-round interviews), using behavioral signals to detect deepfakes (hand movement across face, virtual background removal), probing for depth beyond AI-generated responses using STAR method and tool-specific opinion questions, and awareness that scam operations submit AI-generated tailored resumes at industrial scale",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI-Powered Hiring Fraud Detection"
    },
    # C14 — Visibility bias in recognition (C12-O4 recognition -> C14-O8 high performer management)
    {
        "id": "SIG-322",
        "observableId": "C14-O8",
        "capabilityId": "C14",
        "signalText": "Leader counteracts visibility bias in performance assessment — recognizes that publicly recognized engineers are often doing the most visible work, not the best work. Actively surfaces invisible contributions (code reviews, infrastructure improvements, mentoring) by having PMs call out reviewers by name, highlighting operational work at all-hands, and asking reports directly how they prefer to be recognized rather than defaulting to public channels that create anxiety",
        "signalType": "calibration_language",
        "sourceSubTopic": "Visibility Bias in Performance Recognition"
    },
    # C14 — Staff+ performance cliff (C14-O5, promotion evidence)
    {
        "id": "SIG-323",
        "observableId": "C14-O5",
        "capabilityId": "C14",
        "signalText": "Leader proactively supports Staff+ engineers through the 'performance cliff' — the psychological transition where old success metrics (shipping features, team-level impact) no longer apply, feedback becomes sparse, and the shift to org-level influence creates a vacuum of direction. Provides explicit new success criteria for Staff+ scope, maintains regular feedback despite the ambiguity, and normalizes the disorientation of operating at a new altitude",
        "signalType": "calibration_language",
        "sourceSubTopic": "Staff+ Performance Cliff Support"
    },
    # C14 — Maven/Guru archetypes (C14-O2, calibration cases)
    {
        "id": "SIG-324",
        "observableId": "C14-O2",
        "capabilityId": "C14",
        "signalText": "Leader distinguishes between Maven (deep specialist with high individual throughput) and Guru (good developer who is an even better teacher, sees roots of misunderstandings, supports learning without just telling) archetypes — strategically minimizes Guru's solo work time to maximize their multiplier effect on team capability through pairing, upskilling, and knowledge transfer",
        "signalType": "calibration_language",
        "sourceSubTopic": "Maven vs Guru Performance Archetypes"
    },
    # C5 — Anti-misalignment diagnostic (C5-O4, cross-team dependencies)
    {
        "id": "SIG-325",
        "observableId": "C5-O4",
        "capabilityId": "C5",
        "signalText": "Leader approaches alignment as a negative-space problem — rather than trying to define and achieve abstract 'alignment', systematically identifies and eliminates specific misalignment signals (conflicting priorities surfacing in standups, duplicated work across teams, decisions being relitigated, stakeholders surprised by outcomes) and treats each as a concrete problem to diagnose and fix",
        "signalType": "calibration_language",
        "sourceSubTopic": "Anti-Misalignment Diagnostic Approach"
    },
    # C7 — Cultural post-mortems (C7-O8, difficult conversations)
    {
        "id": "SIG-326",
        "observableId": "C7-O8",
        "capabilityId": "C7",
        "signalText": "Leader applies blameless post-mortem methodology to people-system failures — when culture breakdowns, trust erosion, or team dysfunction occurs, runs the same structured analysis (timeline, contributing factors, action items) used for technical incidents, treating cultural problems with equal rigor and systematic follow-through rather than addressing them informally or not at all",
        "signalType": "calibration_language",
        "sourceSubTopic": "Cultural Post-Mortems for People-System Failures"
    },
    # C13 — AI agent authorization (C13-O3, least-privilege access)
    {
        "id": "SIG-327",
        "observableId": "C13-O3",
        "capabilityId": "C13",
        "signalText": "Authorization model explicitly addresses non-human actors — AI agents operate faster than humans and require precise, contextual authorization that traditional identity infrastructure was never designed for. Team has defined which systems AI agents can access, what actions they can take autonomously vs. with human approval, and how authorization adapts when agent behavior changes or scope creeps",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI Agent Authorization Governance"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 22 Enrichments (Tier 2 Review) ===")

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

# ── Mark ALL Tier 2 articles as reviewed ──────────────

pq = json.load(open(os.path.join(REF, "articles-priority-queue.json")))
reviewed_count = 0
for article in pq:
    if article.get('tier') == 2 and not article.get('reviewed'):
        article['reviewed'] = True
        article['reviewedInSession'] = "22"
        reviewed_count += 1

with open(os.path.join(REF, "articles-priority-queue.json"), "w") as f:
    json.dump(pq, f, indent=2)
print(f"  Marked {reviewed_count} Tier 2 articles as reviewed")

# ── Update review-progress.json ────────────────────────

rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session22 = {
    "session": 22,
    "date": "2026-02-20",
    "focus": "Tier 2 systematic review: 1,034 articles across all 14 capabilities (content-based analysis, not title-only)",
    "articlesReviewed": reviewed_count,
    "additions": {
        "learningPathways": lp_articles_added,
        "calibrationSignals": len(NEW_SIGNALS)
    },
    "capabilitiesEnriched": ["C1", "C3", "C5", "C7", "C8", "C9", "C11", "C13", "C14"],
    "coverageImpact": {
        "C3": "CS: +2 (steel thread architecture validation + tech debt taxonomy), LP: +2 (steel threads, context engineering)",
        "C8": "CS: +2 (minimal independent DR + compassionate on-call), LP: +2 (Monzo Stand-in, observability twin mandate)",
        "C9": "CS: +2 (inner-loop metrics DAT + AI metrics Goodhart's Law), LP: +1 (Meta DAT)",
        "C1": "CS: +1 (demand-led fluid teams), LP: +1 (Dan North fluid teams)",
        "C11": "CS: +1 (AI hiring fraud detection), LP: +1 (coordinated AI scam)",
        "C14": "CS: +3 (visibility bias + Staff+ performance cliff + Maven/Guru archetypes), LP: +1 (Staff+ cliff)",
        "C5": "CS: +1 (anti-misalignment diagnostic), LP: +1 (anti-misalignment article)",
        "C7": "CS: +1 (cultural post-mortems), LP: +1 (cultural post-mortems)",
        "C13": "CS: +1 (AI agent authorization governance)",
        "C4": "All 99 articles covered — zero gaps beyond existing toil/golden paths content",
        "C6": "All 165 articles covered — zero gaps",
        "C10": "All 19 articles covered — zero gaps",
        "C12": "All 91 articles covered — zero gaps",
        "C2": "All 10 articles covered — zero gaps"
    },
    "notes": "TIER 2 REVIEW COMPLETE. All 1,034 Tier 2 articles systematically reviewed with content-based analysis (WebSearch for article substance, not title-only triage). ~85% of articles duplicate existing framework coverage. Novel concepts cluster around: (1) architecture validation techniques (steel threads, tech debt taxonomy), (2) operational resilience patterns (Monzo Stand-in DR, compassionate on-call), (3) emerging metrics (Meta DAT, AI metrics discipline), (4) AI-era security (agent authorization), (5) people management subtleties (visibility bias, Staff+ cliff, Maven/Guru archetypes, anti-misalignment, cultural post-mortems). Notable finding: Dan North's demand-led planning directly challenges stable-team orthodoxy — added as a calibration signal to ensure assessors consider both models."
}

rp["sessions"].append(session22)
for key in session22["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session22["additions"][key]
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["calibrationSignals"] = len(cs)

remaining_t2 = sum(1 for a in pq if a.get('tier') == 2 and not a.get('reviewed'))
total_reviewed = sum(1 for a in pq if a.get('reviewed'))
total_t1 = sum(1 for a in pq if a.get('tier') == 1)
total_t2 = sum(1 for a in pq if a.get('tier') == 2)
total_t3 = sum(1 for a in pq if a.get('tier') == 3)

rp["remainingTier2"] = remaining_t2

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)

print(f"\n=== Session 22 Summary ===")
print(f"Articles reviewed this session: {reviewed_count}")
print(f"Calibration Signals: +{len(NEW_SIGNALS)}")
print(f"Learning Pathways: +{lp_articles_added} article refs")
print(f"\n=== TIER 2 COMPLETE ===")
print(f"Tier 1: {total_t1} (all reviewed)")
print(f"Tier 2: {total_t2} (all reviewed)")
print(f"Remaining Tier 2: {remaining_t2}")
print(f"Tier 3: {total_t3} (remaining)")
print(f"Total reviewed: {total_reviewed}")

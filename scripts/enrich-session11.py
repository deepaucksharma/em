#!/usr/bin/env python3
"""
Session 11 Enrichment — Close remaining playbook gaps + thin calibration signals
Based on critical reading of LeadDev articles:
  - "5 ways onboarding can accelerate engineering efficiency" + "How to successfully onboard remote engineering staff" (C11 playbook)
  - Supply chain security trends + XZ Utils incident lessons (C13 playbook)
  - "Seven things you need to know about retaining engineering talent" + "How to stop shrinkage" + "Three tips for retaining" (C11 signals)
  - Security/compliance content (C13 signals)
  - "How to stop shrinkage in engineering teams" (C10 signals)

Targets:
  - Playbooks: +2 (C11: 5→6, C13: 5→6)
  - Calibration Signals: +8 (C10: 15→17, C12: 16→18, C13: 17→19, C11: 23→25)
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
        "id": "P-C11-5",
        "slug": "your-onboarding-is-broken-and-new-hires-are-struggling",
        "observableIds": ["C11-O3", "C11-O4"],
        "capabilityIds": ["C11", "C12"],
        "title": "Your Onboarding Is Broken and New Hires Are Struggling",
        "context": "New engineers take 6+ months to become productive. They report feeling lost in their first weeks, unsure who to ask for help, and overwhelmed by undocumented tribal knowledge. Your most recent hire quietly admitted in their 1:1 that they considered leaving in month two. Meanwhile, your tenured engineers complain they spend too much time answering basic questions.",
        "topicsActivated": [
            "Onboarding (Structured Ramp Program)",
            "Culture (Knowledge Sharing and Belonging)",
            "Metrics (Time-to-Productivity Measurement)"
        ],
        "decisionFramework": "1. Diagnose the gaps (Week 1): Interview your 3 most recent hires about their first 90 days. Ask: 'What did you wish you'd known on day one? When did you first feel productive? What almost made you leave?' Also ask tenured engineers: 'What questions do new hires always ask that shouldn't require asking?' The gap between these two perspectives reveals your onboarding holes. 2. Build progressive structure (Week 2-3): Design a 30/60/90 day plan with specific milestones — not 'learn the codebase' but 'deploy your first change to production by day 10, own a small feature by day 30, lead a design discussion by day 60.' Progressive information introduction works: team, then tech stack, then product domain, then first meaningful project. 3. Assign a buddy (not the manager): Every new hire gets a peer-level buddy for 90 days. The buddy's role is distinct from the manager's: the buddy covers 'where things live, how to ask for help, unwritten team norms.' The manager covers 'expectations, career, feedback.' Early buddy 1:1s dramatically increase comfort in asking questions. 4. Make knowledge discoverable: Audit the most common questions new hires ask and document the answers. This isn't about comprehensive documentation — it's about eliminating the 10 questions that every new hire asks in their first month. 5. Measure and iterate (Quarterly): Track time-to-first-deploy, time-to-first-feature, and run an onboarding exit survey at 90 days. Each cohort should onboard faster than the last. Act on the survey feedback — the fixes are usually small and high-leverage.",
        "commonMistakes": "Throwing new hires at the codebase with 'just read the code.' Assigning the manager as the only point of contact, creating a bottleneck. Having no milestones, so nobody knows if onboarding is going well or not. Blaming the hire for 'not being a good fit' when onboarding set them up to fail. Never collecting or acting on feedback from recent hires.",
        "whatGoodLooksLike": "Time-to-first-deploy under 5 days. 90-day exit survey satisfaction above 8/10. No new hire considers leaving in the first 3 months. Tenured engineers report fewer repeated questions. Top-quartile companies achieve full productivity in 3-4 months versus the 6-7 month average. Each new cohort ramps faster than the last because the program improves from their feedback.",
        "mappingNotes": "Based on LeadDev '5 ways onboarding can accelerate engineering efficiency' and 'How to successfully onboard remote engineering staff in four weeks.'",
        "suggestedMetricIds": ["5.2", "5.3"]
    },
    {
        "id": "P-C13-5",
        "slug": "responding-to-a-critical-dependency-vulnerability",
        "observableIds": ["C13-O2", "C13-O6", "C13-O1"],
        "capabilityIds": ["C13", "C8"],
        "title": "Responding to a Critical Dependency Vulnerability",
        "context": "A CVE is published for a widely-used open source dependency in your stack (think Log4Shell, XZ Utils-class events). The vulnerability is rated critical. Your team doesn't know how many services are affected, there's no bill of materials, and leadership is asking for a status update. Security is asking when you'll be patched. You're not sure where to start.",
        "topicsActivated": [
            "Security (Supply Chain Vulnerability Response)",
            "Operations (Rapid Dependency Assessment)",
            "Process (SBOM and Dependency Governance)"
        ],
        "decisionFramework": "1. Assess blast radius (Hour 1-4): Before patching anything, answer: where is this dependency? If you have dependency scanning in CI/CD, query it. If not, run a manual search across all repos. Build a list of affected services ranked by exposure (internet-facing > internal > dev-only). This is your battlefield map. 2. Triage by exposure (Hour 4-8): Not everything needs to be patched simultaneously. Internet-facing services with the vulnerable code path active get patched first. Services behind authentication or internal-only are next. Dev/test environments are last. Communicate this triage to security and leadership — they need to see a plan, not just effort. 3. Patch and verify (Day 1-3): For each affected service: update the dependency, run tests, deploy to staging, verify no regression, deploy to production. If a clean upgrade isn't possible, evaluate workarounds (WAF rules, configuration changes, feature disabling) as temporary mitigations. 4. Communicate continuously: Send status updates at fixed intervals (every 4 hours during active response, then daily). Include: services patched, services remaining, blockers, ETA. Leadership doesn't need technical details — they need 'X of Y services patched, ETA for full remediation is Z.' 5. Prevent recurrence (Week 2+): This is where the real work starts. Implement automated dependency scanning in CI/CD with severity-based gates. Create a software bill of materials (SBOM) so you never have to ask 'where is this dependency?' again. Establish vulnerability SLAs by severity (critical: 24-48hrs, high: 7 days, medium: 30 days).",
        "commonMistakes": "Panicking and trying to patch everything at once without triaging by exposure. Not knowing your dependency tree because there's no scanning or SBOM. Patching production without adequate testing, creating a new incident. Over-communicating technical details to leadership instead of status and ETA. Treating it as a one-time fire drill instead of building systematic prevention.",
        "whatGoodLooksLike": "All critical-exposure services patched within 48 hours. Full remediation within 7 days. SBOM established for all production services within 30 days. Dependency scanning in CI/CD within 60 days. Next time a critical CVE drops, blast radius assessment takes minutes instead of hours because the SBOM exists. The 2024 XZ Utils near-miss showed that supply chain attacks are becoming more sophisticated — preparedness is the differentiator.",
        "mappingNotes": "Based on supply chain security trends, XZ Utils incident analysis, and SBOM best practices.",
        "suggestedMetricIds": ["3.4", "3.5"]
    }
]

# ── Calibration Signals ────────────────────────────────

NEW_SIGNALS = [
    # C10 signals (15→17) — resource strategy depth
    {
        "id": "SIG-305",
        "observableId": "C10-O2",
        "capabilityId": "C10",
        "signalText": "Reprioritization communication: 'When 3 engineers were pulled for incident response, immediately published updated timeline for all active projects with explicit 'what stops, what slows, what continues' — stakeholders thanked the transparency instead of discovering delays later.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Reprioritization Under Constraint"
    },
    {
        "id": "SIG-306",
        "observableId": "C10-O4",
        "capabilityId": "C10",
        "signalText": "Team composition optimization: 'Identified that 60% of contractor spend was on roles that should be FTE for knowledge retention. Built business case for 4 contractor-to-FTE conversions — net savings of $180K/year with improved institutional knowledge and reduced onboarding overhead.'",
        "signalType": "metric",
        "sourceSubTopic": "Team Composition"
    },
    # C12 signals (16→18) — culture depth
    {
        "id": "SIG-307",
        "observableId": "C12-O3",
        "capabilityId": "C12",
        "signalText": "Knowledge sharing institutionalized: 'Established weekly tech talks rotation — 90% of team presented within 6 months. Bus factor improved from 1.2 to 3.1 on critical systems. New hires cited tech talks as top onboarding resource in exit surveys.'",
        "signalType": "metric",
        "sourceSubTopic": "Knowledge Sharing"
    },
    {
        "id": "SIG-308",
        "observableId": "C12-O6",
        "capabilityId": "C12",
        "signalText": "Cultural continuity during transition: 'When 3 of 8 senior engineers left in one quarter, preserved culture through explicit documentation of team norms, temporary mentoring pairs, and weekly team health check-ins. Engagement scores recovered within 2 months.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "Cultural Resilience"
    },
    # C13 signals (17→19) — security posture depth
    {
        "id": "SIG-309",
        "observableId": "C13-O2",
        "capabilityId": "C13",
        "signalText": "Vulnerability SLA discipline: 'Established severity-based patching SLAs (critical: 48hrs, high: 7 days, medium: 30 days). Compliance rate: 95% for critical, 88% for high. Mean time to remediate for critical vulns dropped from 12 days to 36 hours.'",
        "signalType": "metric",
        "sourceSubTopic": "Vulnerability Management"
    },
    {
        "id": "SIG-310",
        "observableId": "C13-O6",
        "capabilityId": "C13",
        "signalText": "Supply chain readiness: 'Implemented SBOM generation in CI/CD for all production services. When Log4Shell-class vulnerability dropped, identified all 23 affected services within 15 minutes vs. previous incident where blast radius assessment took 2 days.'",
        "signalType": "metric",
        "sourceSubTopic": "Supply Chain Security"
    },
    # C11 signals (23→25) — retention and onboarding depth
    {
        "id": "SIG-311",
        "observableId": "C11-O3",
        "capabilityId": "C11",
        "signalText": "Onboarding iteration: 'Reduced time-to-first-deploy from 14 days to 3 days over 4 cohorts by acting on 90-day exit survey feedback. Key fix: replaced 'read the wiki' with structured buddy-guided first-week tasks.'",
        "signalType": "metric",
        "sourceSubTopic": "Onboarding Effectiveness"
    },
    {
        "id": "SIG-312",
        "observableId": "C11-O4",
        "capabilityId": "C11",
        "signalText": "Retention through development: 'Built individual growth plans for all engineers (80% self-directed goals, 20% team needs). Combined with regular 1:1 context-sharing and public recognition. Regrettable attrition dropped from 18% to 6% year-over-year.'",
        "signalType": "metric",
        "sourceSubTopic": "Talent Retention"
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 11 Enrichments ===")

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

session11 = {
    "session": 11,
    "date": "2026-02-20",
    "focus": "Close remaining playbook gaps (C11/C13) + depth signals for C10/C12/C13/C11",
    "articlesReviewed": 8,
    "additions": {
        "playbooks": 2,
        "calibrationSignals": 8
    },
    "capabilitiesEnriched": ["C10", "C11", "C12", "C13"],
    "coverageImpact": {
        "C11": "PB: 5→6, CS: 23→25",
        "C13": "PB: 5→6, CS: 17→19",
        "C10": "CS: 15→17",
        "C12": "CS: 16→18"
    },
    "notes": "C11 onboarding playbook based on LeadDev articles on engineering onboarding efficiency (buddy system, progressive structure, time-to-productivity metrics). C13 supply chain vulnerability playbook based on XZ Utils lessons and SBOM best practices. Calibration signals target the 4 thinnest CS capabilities, all grounded in specific LeadDev retention, security, and knowledge-sharing content."
}

rp["sessions"].append(session11)

for key in session11["additions"]:
    if key in rp["totalAdditions"]:
        rp["totalAdditions"][key] += session11["additions"][key]

rp["grandTotal"] = sum(rp["totalAdditions"].values())

rp["dataFileTotals"]["playbooks"] = len(pb)
rp["dataFileTotals"]["calibrationSignals"] = len(cs)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

# ── Summary ────────────────────────────────────────────

print(f"\n=== Session 11 Summary ===")
print(f"Playbooks: +{len(NEW_PLAYBOOKS)} (C11:1, C13:1)")
print(f"Calibration Signals: +{len(NEW_SIGNALS)} (C10:2, C12:2, C13:2, C11:2)")
print(f"Total additions: {len(NEW_PLAYBOOKS) + len(NEW_SIGNALS)}")

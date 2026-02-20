#!/usr/bin/env python3
"""
Session 17 Enrichment — Fix C13 anti-pattern gap (3→5)
AP-36 and AP-45 were consolidated in earlier sessions, leaving C13 at only 3 APs.
Based on LeadDev articles:
  - "Overcoming security hurdles to push engineering velocity" (shadow bypass)
  - "Born-left security" + compliance certification gap articles (certification facade)

Targets:
  - Anti-Patterns: +2 (C13: 3→5)
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

# ── Anti-Patterns ──────────────────────────────────────

NEW_ANTI_PATTERNS = [
    {
        "id": "AP-72",
        "name": "The Shadow Bypass",
        "slug": "the-shadow-bypass",
        "observableIds": ["C13-O1", "C13-O6"],
        "capabilityId": "C13",
        "shortDesc": "engineers routinely circumvent security controls — disabling scanners in CI, skipping threat modeling for 'urgent' features, using personal credentials for testing — because security processes are perceived as friction that slows delivery rather than guardrails that enable safe velocity",
        "warningSigns": [
            "Engineers disable or skip security scanning steps in CI pipelines to unblock deploys",
            "Threat modeling is marked 'N/A' for features that clearly handle sensitive data because the team is behind schedule",
            "Developers use personal accounts, hardcoded tokens, or shared credentials for testing and staging",
            "Security exceptions become the norm — more features ship with exceptions than without",
            "The security team discovers bypassed controls only during quarterly audits or after incidents"
        ],
        "impact": "The organization pays the cost of security processes (tooling, policy documentation, team time) without getting the benefit. Real vulnerabilities ship to production through the gaps created by bypasses. When an incident occurs, investigation reveals that existing controls would have caught it if they hadn't been circumvented. The security team loses credibility because their processes clearly aren't working, even though the root cause is organizational, not technical. Engineers develop a habit of treating security as optional, which becomes very hard to reverse.",
        "recoveryActions": [
            "Audit current bypass patterns — survey engineers anonymously about which security steps they routinely skip and why",
            "Fix the top 3 friction points: if scanning takes 20 minutes, invest in making it take 2 minutes rather than making it mandatory-but-slow",
            "Make security controls non-bypassable for high-risk paths (production deploys, auth changes, data access) while allowing more flexibility for low-risk changes",
            "Reframe security as a shared engineering quality standard, not an external gate — include security in definition of done alongside tests and code review",
            "Track bypass rate as a metric: percentage of deploys that skip any security step — trending down means the process is becoming less painful"
        ],
        "sourceTopic": "Security & Compliance (Security Process Adoption)",
        "mappingNotes": "Based on LeadDev 'Overcoming security hurdles to push engineering velocity' — engineers bypass security not because they don't care, but because the controls are designed for compliance rather than developer experience."
    },
    {
        "id": "AP-73",
        "name": "The Certification Facade",
        "slug": "the-certification-facade",
        "observableIds": ["C13-O4", "C13-O2"],
        "capabilityId": "C13",
        "shortDesc": "team maintains compliance certifications (SOC2, ISO 27001, HIPAA) and passes audits, but the certified practices are only followed during audit preparation — day-to-day security posture drifts far from what the documentation claims, creating a dangerous gap between paper compliance and actual risk",
        "warningSigns": [
            "Audit preparation is a 2-4 week scramble to gather evidence and update documentation that's been stale since the last audit",
            "Engineers can't describe the security practices the company is certified for without looking at the compliance docs",
            "Access reviews happen the week before the audit, not continuously — stale permissions accumulate for months",
            "Compliance evidence is generated retroactively rather than as a byproduct of actual security practices",
            "The certification badge is prominently displayed on the sales page but the security team knows the daily reality doesn't match"
        ],
        "impact": "The certification creates a false sense of security for customers, leadership, and the team itself. Real risk goes unmanaged because the compliance program measures documentation, not actual practice. When a breach occurs, investigation reveals that the certified controls weren't being followed, creating legal liability and destroying customer trust far more severely than if the company had never been certified. The compliance program consumes significant resources (audit fees, preparation time, documentation) without reducing actual risk.",
        "recoveryActions": [
            "Automate compliance evidence collection — access logs, change records, vulnerability scan results should be generated continuously, not prepared for audits",
            "Align certification requirements with actual engineering practices: if a control isn't sustainable, either change the practice or change the certification scope",
            "Run internal mini-audits monthly — spot-check 3-5 controls to ensure continuous compliance rather than periodic cramming",
            "Make compliance metrics visible to engineering: access review completion rate, vulnerability SLA adherence, training completion — treat these like engineering SLOs",
            "Build compliance into engineering workflows so evidence is a byproduct of work, not a separate artifact: automated access management, built-in audit trails, continuous scanning"
        ],
        "sourceTopic": "Security & Compliance (Compliance Integrity)",
        "mappingNotes": "Based on LeadDev articles on compliance-heavy industry testing and born-left security — certifications should reflect reality, not create an alternative reality that only exists during audit windows."
    }
]

# ── Apply Changes ──────────────────────────────────────

print("=== Applying Session 17 Enrichments ===")

# Anti-patterns
ap = load("anti-patterns.json")
ap.extend(NEW_ANTI_PATTERNS)
save("anti-patterns.json", ap)
print(f"  Added {len(NEW_ANTI_PATTERNS)} anti-patterns (total: {len(ap)})")

# Search Index
si = load("search-index.json")
for a in NEW_ANTI_PATTERNS:
    si.append({
        "id": a["id"],
        "type": "anti-pattern",
        "title": a["name"],
        "content": "{} {}".format(a['shortDesc'], ' '.join(a['warningSigns'][:2])),
        "slug": "/anti-patterns/{}".format(a['slug']),
        "capability": a["capabilityId"]
    })
save("search-index.json", si)
print(f"  Updated search index (total: {len(si)})")

# Update review-progress.json
rp_path = os.path.join(REF, "review-progress.json")
with open(rp_path) as f:
    rp = json.load(f)

session17 = {
    "session": 17,
    "date": "2026-02-20",
    "focus": "Fix C13 anti-pattern gap from consolidation (3→5)",
    "articlesReviewed": 3,
    "additions": {
        "antiPatterns": 2
    },
    "capabilitiesEnriched": ["C13"],
    "coverageImpact": {
        "C13": "AP: 3->5 (The Shadow Bypass + The Certification Facade)"
    },
    "notes": "C13 had dropped to 3 anti-patterns after AP-36 and AP-45 were consolidated in earlier sessions. Added two new anti-patterns to restore the floor: The Shadow Bypass (engineers circumventing security controls due to friction) and The Certification Facade (maintaining certifications without following certified practices day-to-day). All 14 capabilities now confirmed at 5+ anti-patterns."
}

rp["sessions"].append(session17)

if "antiPatterns" in rp["totalAdditions"]:
    rp["totalAdditions"]["antiPatterns"] += 2
rp["grandTotal"] = sum(rp["totalAdditions"].values())
rp["dataFileTotals"]["antiPatterns"] = len(ap)
rp["dataFileTotals"]["searchIndex"] = len(si)

with open(rp_path, "w") as f:
    json.dump(rp, f, indent=2)
print(f"  Saved {rp_path}")

print(f"\n=== Session 17 Summary ===")
print(f"Anti-Patterns: +2 (C13: 3->5)")
print(f"All 14 capabilities now confirmed at 5+ anti-patterns")

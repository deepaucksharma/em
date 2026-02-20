#!/usr/bin/env python3
"""
Fix remaining content quality issues:
1. Add 5 calibration signals for metrics 3.1, 3.2, 7.8, AI-2, AI-3
2. Sharpen vague shortText for C5-O6 and C6-O1
3. Fix search index description for P-C2-5
"""

import json

DATA = "src/data"

def load(name):
    with open(f"{DATA}/{name}") as f:
        return json.load(f)

def save(name, data):
    with open(f"{DATA}/{name}", "w") as f:
        json.dump(data, f, indent=2)
    print(f"  Saved {DATA}/{name}")

# ── 1. Calibration Signals ───────────────────────────────

NEW_SIGNALS = [
    # Metric 3.1 — SLI Definition (Reliability, C8)
    {
        "id": "SIG-330",
        "observableId": "C8-O8",
        "capabilityId": "C8",
        "signalText": "Leader defines SLIs that map to user-visible impact rather than infrastructure metrics — 'successful checkout in <2s' rather than 'CPU <80%'. Each SLI has a documented measurement method, data source, and owner. Google SRE principle: if your SLI doesn't correlate with user happiness, it's the wrong SLI.",
        "signalType": "calibration_language",
        "sourceSubTopic": "SLI Definition Quality"
    },
    # Metric 3.2 — SLO Target (Reliability, C8)
    {
        "id": "SIG-331",
        "observableId": "C8-O8",
        "capabilityId": "C8",
        "signalText": "SLO targets are set through negotiation between engineering and product — not aspirational '99.99%' without capacity analysis. Leader can articulate the cost curve: 'Moving from 99.9% to 99.95% availability requires $X in redundancy and reduces feature velocity by Y%'. SLO is reviewed quarterly and adjusted based on error budget consumption trends.",
        "signalType": "calibration_language",
        "sourceSubTopic": "SLO Target Setting"
    },
    # Metric 7.8 — eNPS / Engagement Score (People, C12)
    {
        "id": "SIG-332",
        "observableId": "C12-O2",
        "capabilityId": "C12",
        "signalText": "Leader treats eNPS as a lagging diagnostic, not a target — investigates root causes when scores drop rather than running 'engagement initiatives' that address symptoms. Can correlate engagement trends with specific events (re-orgs, on-call changes, leadership shifts) and demonstrate that structural fixes moved the score, not pizza parties.",
        "signalType": "calibration_language",
        "sourceSubTopic": "Engagement Score Diagnostic Use"
    },
    # Metric AI-2 — AI PR Quality Delta (AI-Era, C9)
    {
        "id": "SIG-333",
        "observableId": "C9-O9",
        "capabilityId": "C9",
        "signalText": "Leader measures the quality differential between AI-assisted and human-authored PRs — tracking review revision cycles, post-merge defect rates, and test coverage gaps. Uses this data to calibrate AI tool adoption rather than relying on acceptance rates: 'AI-assisted PRs have 1.3x review cycles but ship 40% faster — net positive when paired with enhanced test requirements.'",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI PR Quality Measurement"
    },
    # Metric AI-3 — Verification Overhead Ratio (AI-Era, C9)
    {
        "id": "SIG-334",
        "observableId": "C9-O10",
        "capabilityId": "C9",
        "signalText": "Leader tracks verification overhead as a distinct cost center — measuring review time spent validating AI-generated code vs. human-authored code, and the ratio of AI output volume to human validation capacity. When verification overhead exceeds 30% of review time, triggers process adjustments: smaller AI-generated PRs, mandatory test coverage thresholds, or domain-scoped AI usage policies.",
        "signalType": "calibration_language",
        "sourceSubTopic": "AI Verification Overhead Management"
    },
]

cs = load("calibration-signals.json")
cs.extend(NEW_SIGNALS)
save("calibration-signals.json", cs)
print(f"  Added {len(NEW_SIGNALS)} calibration signals (total: {len(cs)})")

# ── 2. Sharpen Vague shortText ───────────────────────────

obs = load("observables.json")

for o in obs:
    if o["id"] == "C5-O6":
        old = o["shortText"]
        o["shortText"] = "Manages up by mapping to manager's priorities, pre-wiring before surprises, and sending structured updates"
        print(f"  C5-O6 shortText: '{old}' -> '{o['shortText']}'")

    elif o["id"] == "C6-O1":
        old = o["shortText"]
        o["shortText"] = "Runs structured 1:1s with 60/20/20 agenda split, shared doc, and quarterly career conversations"
        print(f"  C6-O1 shortText: '{old}' -> '{o['shortText']}'")

save("observables.json", obs)

# ── 3. Fix Search Index Description ──────────────────────

si = load("search-index.json")

for entry in si:
    if entry.get("id") == "P-C2-5":
        old = entry["description"]
        entry["description"] = "A framework for establishing and defending explicit scope boundaries — creating a documented list of deprioritized work that protects focus and forces stakeholders to trade off rather than pile on."
        print(f"  P-C2-5 description: '{old}' -> '{entry['description']}'")
        break

save("search-index.json", si)

print("\nAll remaining quality fixes applied.")

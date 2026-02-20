#!/usr/bin/env python3
"""
Sharpen 10 observable shortText entries: replace vague leading verbs
("Builds", "Maintains", "Drives") with specific practices from the how field.

Same fix pattern as C5-O6 and C6-O1 (already fixed).
Does NOT change slugs to preserve existing URLs.
"""

import json

with open("src/data/observables.json") as f:
    obs = json.load(f)

REWRITES = {
    "C3-O7": (
        "Defines observability standards (structured logging, required metrics, trace propagation) "
        "and dependency maps with fallback strategies per service"
    ),
    "C5-O7": (
        "Accumulates trust through tracked commitments, 24-hour peer unblocking, public credit "
        "sharing, and proactive written updates"
    ),
    "C5-O9": (
        "Presents at VP reviews quarterly and cultivates sponsor relationships through recurring "
        "1:1s and cross-org initiative delivery"
    ),
    "C5-O16": (
        "Runs weekly triad syncs with PM and Design using shared OKRs and joint quarterly "
        "retrospectives"
    ),
    "C6-O7": (
        "Develops manager pipeline through TL rotations, EM-in-Training shadowing programs, "
        "and a succession matrix with ready-now candidates"
    ),
    "C6-O10": (
        "Runs monthly career conversations (separate from performance 1:1s) focused on 18-month "
        "aspirations with written development plans"
    ),
    "C6-O12": (
        "Maps succession for critical roles with primary/secondary successors assessed on a "
        "3-tier readiness framework updated quarterly"
    ),
    "C8-O7": (
        "Runs quarterly game days with heroes excluded, testing runbook accuracy and failover "
        "procedures against a rotating failure catalog"
    ),
    "C11-O10": (
        "Wins talent through differentiated value proposition (impact, growth velocity, autonomy) "
        "backed by employer brand presence"
    ),
    "C14-O7": (
        "Keeps weekly running performance notes per report and surfaces feedback themes monthly "
        "so reviews contain zero surprises"
    ),
}

fixes = 0
for o in obs:
    if o["id"] in REWRITES:
        old = o["shortText"]
        o["shortText"] = REWRITES[o["id"]]
        fixes += 1
        print(f"  {o['id']}:")
        print(f"    OLD: {old}")
        print(f"    NEW: {o['shortText']}")

with open("src/data/observables.json", "w") as f:
    json.dump(obs, f, indent=2)

print(f"\nSharpened {fixes} observable shortText entries")
print("Saved src/data/observables.json")

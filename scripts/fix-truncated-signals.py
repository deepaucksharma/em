#!/usr/bin/env python3
"""
Fix truncated calibration signal quotes in playbooks.json.

15 entries have signal text cut off with "..." — replace with full text
from calibration-signals.json.
"""

import json
import re

# Load data
with open("src/data/playbooks.json") as f:
    playbooks = json.load(f)

with open("src/data/calibration-signals.json") as f:
    signals = json.load(f)

# Build SIG lookup
sig_map = {}
for s in signals:
    sig_map[s["id"]] = s["signalText"]

# Track fixes
fixes = 0

for pb in playbooks:
    wgl = pb.get("whatGoodLooksLike", "")

    # Pattern: truncated signal quote followed by (SIG-XXX)
    # The quotes start with "... or just the text and end with ...\" or ..." before the SIG ref
    # Look for pattern: Calibration signal: "...<text>..." (SIG-XXX).
    # or: "...<text>..." (SIG-XXX).

    # Find all SIG references in the text
    sig_refs = re.findall(r'\(SIG-(\d+)\)', wgl)

    for sig_num in sig_refs:
        sig_id = f"SIG-{sig_num}"
        if sig_id not in sig_map:
            print(f"  WARNING: {sig_id} not found in calibration-signals.json")
            continue

        full_text = sig_map[sig_id]

        # Check if this reference has truncated text (contains ...)
        # Pattern: some label + "truncated text..." (SIG-XXX).
        # Match the truncated quote: starts with \" and has ... before closing
        pattern = r'((?:Calibration signal|Calibration evidence|Judgment signal|Director-level insight|OKR quality|Reprioritization communication|Error budget discipline|Metrics maturity|Tech debt tracking|Manager maintains)[^"]*: )?"[^"]*\.\.\.(?:\\"|")[^)]*\(' + re.escape(sig_id) + r'\)'

        match = re.search(pattern, wgl)
        if match:
            old_fragment = match.group(0)

            # Extract the label prefix if any
            # Determine the label from the full signal text or use existing
            # The replacement should be: "full signal text" (SIG-XXX)
            replacement = f'"{full_text}" ({sig_id})'

            wgl = wgl.replace(old_fragment, replacement)
            fixes += 1
            print(f"  Fixed {pb['id']}: {sig_id}")
        elif "..." in wgl and sig_id in wgl:
            print(f"  MANUAL CHECK: {pb['id']} has {sig_id} with ... but pattern didn't match")

    pb["whatGoodLooksLike"] = wgl

# Save
with open("src/data/playbooks.json", "w") as f:
    json.dump(playbooks, f, indent=2)

print(f"\nFixed {fixes} truncated signal quotes")
print("Saved src/data/playbooks.json")

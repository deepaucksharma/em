#!/usr/bin/env python3
"""
Normalize observable defaultWeight values so each capability sums to exactly 1.0.

Current state: weights sum to 1.06–1.30 per capability.
Fix: divide each weight by capability sum, round to 3 decimal places,
then adjust the largest weight to absorb rounding remainder.
"""

import json
from collections import defaultdict

DATA = "src/data/observables.json"

with open(DATA) as f:
    observables = json.load(f)

# Group by capability
by_cap = defaultdict(list)
for obs in observables:
    by_cap[obs["capabilityId"]].append(obs)

print("=== Weight Normalization ===\n")

for cap_id in sorted(by_cap.keys(), key=lambda x: int(x[1:])):
    cap_obs = by_cap[cap_id]
    old_sum = sum(o["defaultWeight"] for o in cap_obs)

    # Normalize: divide each by sum
    for o in cap_obs:
        o["defaultWeight"] = round(o["defaultWeight"] / old_sum, 3)

    # Fix rounding remainder by adjusting the largest-weight observable
    new_sum = sum(o["defaultWeight"] for o in cap_obs)
    remainder = round(1.0 - new_sum, 3)

    if remainder != 0:
        # Find the observable with the largest weight
        largest = max(cap_obs, key=lambda o: o["defaultWeight"])
        largest["defaultWeight"] = round(largest["defaultWeight"] + remainder, 3)

    final_sum = sum(o["defaultWeight"] for o in cap_obs)
    status = "OK" if abs(final_sum - 1.0) < 0.001 else "FAIL"
    print(f"  {cap_id}: {old_sum:.4f} -> {final_sum:.4f} ({len(cap_obs)} obs) [{status}]")

# Save
with open(DATA, "w") as f:
    json.dump(observables, f, indent=2)

print(f"\nSaved {DATA}")
print("Done.")

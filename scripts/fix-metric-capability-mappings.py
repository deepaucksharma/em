#!/usr/bin/env python3
"""
Fix metric-to-capability mappings in metrics.json.

Applies a curated set of capabilityIds rewrites and verifies
the final per-capability counts match expected totals.
"""

import json
import sys
from collections import Counter
from pathlib import Path

METRICS_PATH = Path(__file__).resolve().parent.parent / "src" / "data" / "metrics.json"

REWRITES = {
    "1.1": ["C4"],
    "1.2": ["C4"],
    "1.3": ["C8"],
    "1.4": ["C4", "C8"],
    "2.5": ["C4"],
    "2.6": ["C1", "C4", "C5"],
    "3.3": ["C8"],
    "3.5": ["C8"],
    "3.7": ["C8"],
    "4.2": ["C4"],
    "4.4": ["C4"],
    "5.2": ["C7"],
    "5.3": ["C4"],
    "5.4": ["C4", "C5", "C7"],
    "5.5": ["C7"],
    "5.6": ["C6", "C8", "C12"],
    "5.8": ["C4"],
    "5.9": ["C9"],
    "7.1": ["C6", "C12", "C14"],
    "7.2": ["C6", "C14"],
    "7.3": ["C11"],
    "7.4": ["C11"],
    "7.5": ["C6", "C11", "C14"],
    "7.6": ["C1", "C11", "C14"],
    "7.7": ["C11", "C12"],
    "7.8": ["C6", "C12"],
    "7.9": ["C6", "C12"],
    "8.1": ["C1", "C2", "C5"],
    "8.4": ["C2", "C7", "C9", "C10"],
    "8.2": ["C1", "C2", "C5"],
    "8.5": ["C2", "C3", "C5"],
    "8.6": ["C3", "C4", "C10"],
    "9.1": ["C13"],
    "9.4": ["C13"],
    "10.1": ["C1", "C10"],
    "10.2": ["C10"],
    "10.5": ["C1", "C10"],
}

EXPECTED_COUNTS = {
    "C1": 9,
    "C2": 5,
    "C3": 3,
    "C4": 16,
    "C5": 9,
    "C6": 7,
    "C7": 6,
    "C8": 10,
    "C9": 8,
    "C10": 6,
    "C11": 5,
    "C12": 6,
    "C13": 4,
    "C14": 4,
}


def main():
    # Read metrics
    with open(METRICS_PATH, "r", encoding="utf-8") as f:
        metrics = json.load(f)

    print(f"Loaded {len(metrics)} metrics from {METRICS_PATH}")

    # Apply rewrites
    rewrite_count = 0
    metrics_by_id = {m["id"]: m for m in metrics}

    for metric_id, new_caps in REWRITES.items():
        if metric_id not in metrics_by_id:
            print(f"  WARNING: metric {metric_id} not found in data, skipping")
            continue
        old_caps = metrics_by_id[metric_id].get("capabilityIds", [])
        metrics_by_id[metric_id]["capabilityIds"] = new_caps
        if old_caps != new_caps:
            print(f"  {metric_id}: {old_caps} -> {new_caps}")
            rewrite_count += 1
        else:
            print(f"  {metric_id}: already correct {new_caps}")

    print(f"\nRewrote {rewrite_count} metric(s)")

    # Count capabilities across all metrics
    cap_counter = Counter()
    for m in metrics:
        for cap in m.get("capabilityIds", []):
            cap_counter[cap] += 1

    # Print summary
    print("\n--- Capability counts after rewrite ---")
    all_caps = sorted(EXPECTED_COUNTS.keys(), key=lambda c: int(c[1:]))
    for cap in all_caps:
        actual = cap_counter.get(cap, 0)
        expected = EXPECTED_COUNTS[cap]
        status = "OK" if actual == expected else "MISMATCH"
        print(f"  {cap}: {actual} (expected {expected}) [{status}]")

    # Assert counts
    mismatches = []
    for cap in all_caps:
        actual = cap_counter.get(cap, 0)
        expected = EXPECTED_COUNTS[cap]
        if actual != expected:
            mismatches.append(f"{cap}: got {actual}, expected {expected}")

    if mismatches:
        print(f"\nASSERTION FAILED - {len(mismatches)} mismatch(es):")
        for m in mismatches:
            print(f"  {m}")
        sys.exit(1)

    print("\nAll capability counts match expected values.")

    # Write back
    with open(METRICS_PATH, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2, ensure_ascii=False)
        f.write("\n")

    print(f"Wrote updated metrics to {METRICS_PATH}")


if __name__ == "__main__":
    main()

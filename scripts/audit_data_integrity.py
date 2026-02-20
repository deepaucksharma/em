
import json
import os
import sys
from collections import defaultdict

# Configuration
DATA_DIR = "src/data"

def load_json(filename):
    path = os.path.join(DATA_DIR, filename)
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found: {path}")
        return None
    except json.JSONDecodeError as e:
        print(f"Error: Failed to decode JSON {path}: {e}")
        return None

def check_duplicates(items, id_key, filename):
    seen = set()
    duplicates = []
    for item in items:
        val = item.get(id_key)
        if val in seen:
            duplicates.append(val)
        seen.add(val)
    if duplicates:
        print(f"ERROR: Duplicate IDs in {filename}: {duplicates}")
        return True
    return False

def audit():
    print("Starting Data Integrity Audit...")
    errors = 0
    warnings = 0

    # 1. Load Definition Files (The "Truth")
    metrics = load_json("metrics.json")
    capabilities = load_json("capabilities.json")
    observables = load_json("observables.json")
    
    if not metrics or not capabilities or not observables:
        print("CRITICAL: Failed to load core definition files.")
        return

    # 2. Build ID Sets
    metric_ids = {m['id'] for m in metrics}
    capability_ids = {c['id'] for c in capabilities}
    observable_ids = {o['id'] for o in observables}

    print(f"Loaded {len(metric_ids)} metrics, {len(capability_ids)} capabilities, {len(observable_ids)} observables.")

    # 3. Check for Duplicates in Definitions
    if check_duplicates(metrics, 'id', 'metrics.json'): errors += 1
    if check_duplicates(capabilities, 'id', 'capabilities.json'): errors += 1
    if check_duplicates(observables, 'id', 'observables.json'): errors += 1

    # 4. Check Referential Integrity in Consumer Files

    # --- Dashboards ---
    dashboards = load_json("dashboard-blueprints.json")
    if dashboards:
        for db in dashboards.get('dashboards', []):
            for section in db.get('sections', []):
                for widget in section.get('widgets', []):
                    mid = widget.get('metricId')
                    if mid and mid not in metric_ids:
                        print(f"ERROR: dashboard-blueprints.json references unknown metricId '{mid}' in dashboard '{db['id']}'")
                        errors += 1

    # --- Metric Pairs ---
    pairs = load_json("metric-pairs.json")
    if pairs:
        for pair in pairs:
            for role in ['metricA', 'metricB']:
                mid = pair.get(role, {}).get('id')
                if mid and mid not in metric_ids:
                    print(f"ERROR: metric-pairs.json references unknown metricId '{mid}' in pair '{pair['id']}'")
                    errors += 1
                for also in pair.get(role, {}).get('alsoIds', []):
                    if also not in metric_ids:
                        print(f"ERROR: metric-pairs.json references unknown alsoId '{also}' in pair '{pair['id']}'")
                        errors += 1

    # --- Metrics Roadmap ---
    roadmap = load_json("metrics-roadmap.json")
    if roadmap:
        for phase in roadmap.get('phases', []):
            for mid in phase.get('metricsActivated', []):
                if mid not in metric_ids:
                    print(f"ERROR: metrics-roadmap.json references unknown metricId '{mid}' in phase '{phase['name']}'")
                    errors += 1

    # --- Diagnostic Chains ---
    chains = load_json("diagnostic-chains.json")
    if chains:
        for chain in chains:
            trigger = chain.get('triggerMetricId')
            if trigger and trigger not in metric_ids:
                print(f"ERROR: diagnostic-chains.json references unknown triggerMetricId '{trigger}' in chain '{chain['id']}'")
                errors += 1
            for step in chain.get('steps', []):
                check = step.get('checkMetricId')
                if check and check not in metric_ids:
                    print(f"ERROR: diagnostic-chains.json references unknown checkMetricId '{check}' in chain '{chain['id']}'")
                    errors += 1
                for also in step.get('alsoCheckMetricIds', []):
                    if also not in metric_ids:
                        print(f"ERROR: diagnostic-chains.json references unknown alsoCheckMetricId '{also}' in chain '{chain['id']}'")
                        errors += 1

    # --- Calibration Signals ---
    signals = load_json("calibration-signals.json")
    if signals:
        for sig in signals:
            cid = sig.get('capabilityId')
            oid = sig.get('observableId')
            if cid and cid not in capability_ids:
                print(f"ERROR: calibration-signals.json references unknown capabilityId '{cid}' in signal '{sig['id']}'")
                errors += 1
            if oid and oid not in observable_ids:
                print(f"ERROR: calibration-signals.json references unknown observableId '{oid}' in signal '{sig['id']}'")
                errors += 1

    # --- Calibration Language ---
    calib_lang = load_json("calibration-language.json")
    if calib_lang:
        for cl in calib_lang:
            mid = cl.get('metricId')
            if mid and mid not in metric_ids:
                print(f"ERROR: calibration-language.json references unknown metricId '{mid}' in entry '{cl['id']}'")
                errors += 1

    # --- Playbooks ---
    playbooks = load_json("playbooks.json")
    if playbooks:
        for pb in playbooks:
            for cid in pb.get('capabilityIds', []):
                if cid not in capability_ids:
                    print(f"ERROR: playbooks.json references unknown capabilityId '{cid}' in playbook '{pb['id']}'")
                    errors += 1
            for oid in pb.get('observableIds', []):
                if oid not in observable_ids:
                    print(f"ERROR: playbooks.json references unknown observableId '{oid}' in playbook '{pb['id']}'")
                    errors += 1
            for mid in pb.get('suggestedMetricIds', []):
                if mid not in metric_ids:
                    print(f"ERROR: playbooks.json references unknown suggestedMetricId '{mid}' in playbook '{pb['id']}'")
                    errors += 1

    # --- Archetypes ---
    archetypes = load_json("archetypes.json")
    if archetypes:
        for arch in archetypes:
            for mid in arch.get('diagnosticMetricIds', []):
                if mid not in metric_ids:
                    print(f"ERROR: archetypes.json references unknown diagnosticMetricId '{mid}' in archetype '{arch['id']}'")
                    errors += 1
            for mid in arch.get('recommendedMetricIds', []):
                if mid not in metric_ids:
                    print(f"ERROR: archetypes.json references unknown recommendedMetricId '{mid}' in archetype '{arch['id']}'")
                    errors += 1

    # --- Priority Stacks ---
    stacks = load_json("priority-stacks.json")
    if stacks:
        for role in ['em', 'director']:
            for entry in stacks.get(role, []):
                mid = entry.get('metricId')
                if mid and mid not in metric_ids:
                    print(f"ERROR: priority-stacks.json references unknown metricId '{mid}' in {role} stack")
                    errors += 1

    # --- Anti-Patterns ---
    antipatterns = load_json("anti-patterns.json")
    if antipatterns:
        for ap in antipatterns:
            cid = ap.get('capabilityId')
            if cid and cid not in capability_ids:
                print(f"ERROR: anti-patterns.json references unknown capabilityId '{cid}' in AP '{ap['id']}'")
                errors += 1
            for oid in ap.get('observableIds', []):
                if oid not in observable_ids:
                    print(f"ERROR: anti-patterns.json references unknown observableId '{oid}' in AP '{ap['id']}'")
                    errors += 1

    # --- Rubric Anchors ---
    # Logic: Rubric anchors should cover all capabilities.
    # Note: Rubric anchors usually map to a range of observables or a subtopic.
    # We can check if the capabilityId is valid.
    anchors = load_json("rubric-anchors.json")
    if anchors:
        for anchor in anchors:
            cid = anchor.get('capabilityId')
            if cid and cid not in capability_ids:
                print(f"ERROR: rubric-anchors.json references unknown capabilityId '{cid}' in anchor '{anchor['anchorId']}'")
                errors += 1

    # --- Search Index ---
    # Logic: Search index items should match existing items.
    search_index = load_json("search-index.json")
    if search_index:
        for item in search_index:
            itype = item.get('type')
            iid = item.get('id')
            if itype == 'capability':
                if iid not in capability_ids:
                    print(f"ERROR: search-index.json has dead capability '{iid}'")
                    errors += 1
            elif itype == 'metric':
                if iid not in metric_ids:
                    print(f"ERROR: search-index.json has dead metric '{iid}'")
                    errors += 1
            elif itype == 'observable':
                if iid not in observable_ids:
                    print(f"ERROR: search-index.json has dead observable '{iid}'")
                    errors += 1
    
    # 5. Logical Consistency Checks (Phase 2 preview)
    # Check if Observable count in capability matches actual observables
    print("\n--- Logical Consistency Checks ---")
    obs_counts = defaultdict(int)
    for o in observables:
        obs_counts[o['capabilityId']] += 1
    
    for c in capabilities:
        expected = c.get('observableCount', 0)
        actual = obs_counts[c['id']]
        if expected != actual:
            print(f"WARNING: Capability {c['id']} expects {expected} observables, found {actual}")
            warnings += 1

    print(f"\nAudit Complete. Found {errors} errors and {warnings} warnings.")

if __name__ == "__main__":
    audit()

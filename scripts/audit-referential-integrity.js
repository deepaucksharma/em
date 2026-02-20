import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');

function loadJSON(filename) {
  const filepath = path.join(dataDir, filename);
  const content = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(content);
}

function collectBrokenRefs(sourceItems, refExtractor, validIds, sourceLabel, refLabel) {
  const broken = [];
  let total = 0;
  for (const item of sourceItems) {
    const refs = refExtractor(item);
    for (const ref of refs) {
      total++;
      if (!validIds.has(ref)) {
        broken.push({ source: item.id || item.slug || JSON.stringify(item), ref, sourceLabel, refLabel });
      }
    }
  }
  return { total, broken };
}

function main() {
  console.log('=== EM Data Referential Integrity Audit ===\n');

  const capabilities = loadJSON('capabilities.json');
  const observables = loadJSON('observables.json');
  const calibrationSignals = loadJSON('calibration-signals.json');
  const antiPatterns = loadJSON('anti-patterns.json');
  const playbooks = loadJSON('playbooks.json');
  const metrics = loadJSON('metrics.json');
  const rubricAnchors = loadJSON('rubric-anchors.json');
  const searchIndex = loadJSON('search-index.json');

  const capabilityIds = new Set(capabilities.map(c => c.id));
  const observableIds = new Set(observables.map(o => o.id));
  const metricIds = new Set(metrics.map(m => m.id));
  const antiPatternIds = new Set(antiPatterns.map(ap => ap.id));
  const antiPatternSlugs = new Set(antiPatterns.map(ap => ap.slug));

  const report = {
    capabilityReferences: { checks: [] },
    observableReferences: { checks: [] },
    metricReferences: { checks: [] },
    antiPatternReferences: { checks: [] },
    searchIndexReferences: { checks: [] },
    summary: { totalChecks: 0, totalBroken: 0 }
  };

  console.log('## 1. Capability References\n');

  const capChecks = report.capabilityReferences.checks;

  const obsCapRefs = collectBrokenRefs(
    observables,
    o => [o.capabilityId].filter(Boolean),
    capabilityIds,
    'observables.json',
    'capabilityId'
  );
  capChecks.push({ name: 'observables.json capabilityId', ...obsCapRefs });
  console.log(`- observables.json capabilityId: ${obsCapRefs.total} refs, ${obsCapRefs.broken.length} broken`);
  if (obsCapRefs.broken.length > 0) {
    obsCapRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const calSigCapRefs = collectBrokenRefs(
    calibrationSignals,
    s => [s.capabilityId].filter(Boolean),
    capabilityIds,
    'calibration-signals.json',
    'capabilityId'
  );
  capChecks.push({ name: 'calibration-signals.json capabilityId', ...calSigCapRefs });
  console.log(`- calibration-signals.json capabilityId: ${calSigCapRefs.total} refs, ${calSigCapRefs.broken.length} broken`);
  if (calSigCapRefs.broken.length > 0) {
    calSigCapRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const apCapRefs = collectBrokenRefs(
    antiPatterns,
    ap => [ap.capabilityId].filter(Boolean),
    capabilityIds,
    'anti-patterns.json',
    'capabilityId'
  );
  capChecks.push({ name: 'anti-patterns.json capabilityId', ...apCapRefs });
  console.log(`- anti-patterns.json capabilityId: ${apCapRefs.total} refs, ${apCapRefs.broken.length} broken`);
  if (apCapRefs.broken.length > 0) {
    apCapRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const playbookCapRefs = collectBrokenRefs(
    playbooks,
    p => (p.capabilityIds || []),
    capabilityIds,
    'playbooks.json',
    'capabilityIds'
  );
  capChecks.push({ name: 'playbooks.json capabilityIds[]', ...playbookCapRefs });
  console.log(`- playbooks.json capabilityIds[]: ${playbookCapRefs.total} refs, ${playbookCapRefs.broken.length} broken`);
  if (playbookCapRefs.broken.length > 0) {
    playbookCapRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const metricCapRefs = collectBrokenRefs(
    metrics,
    m => (m.capabilityIds || []),
    capabilityIds,
    'metrics.json',
    'capabilityIds'
  );
  capChecks.push({ name: 'metrics.json capabilityIds[]', ...metricCapRefs });
  console.log(`- metrics.json capabilityIds[]: ${metricCapRefs.total} refs, ${metricCapRefs.broken.length} broken`);
  if (metricCapRefs.broken.length > 0) {
    metricCapRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const rubricCapRefs = collectBrokenRefs(
    rubricAnchors,
    ra => [ra.capabilityId].filter(Boolean),
    capabilityIds,
    'rubric-anchors.json',
    'capabilityId'
  );
  capChecks.push({ name: 'rubric-anchors.json capabilityId', ...rubricCapRefs });
  console.log(`- rubric-anchors.json capabilityId: ${rubricCapRefs.total} refs, ${rubricCapRefs.broken.length} broken`);
  if (rubricCapRefs.broken.length > 0) {
    rubricCapRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  console.log('\n## 2. Observable References\n');

  const obsChecks = report.observableReferences.checks;

  const calSigObsRefs = collectBrokenRefs(
    calibrationSignals,
    s => [s.observableId].filter(Boolean),
    observableIds,
    'calibration-signals.json',
    'observableId'
  );
  obsChecks.push({ name: 'calibration-signals.json observableId', ...calSigObsRefs });
  console.log(`- calibration-signals.json observableId: ${calSigObsRefs.total} refs, ${calSigObsRefs.broken.length} broken`);
  if (calSigObsRefs.broken.length > 0) {
    calSigObsRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const playbookObsRefs = collectBrokenRefs(
    playbooks,
    p => (p.observableIds || []),
    observableIds,
    'playbooks.json',
    'observableIds'
  );
  obsChecks.push({ name: 'playbooks.json observableIds[]', ...playbookObsRefs });
  console.log(`- playbooks.json observableIds[]: ${playbookObsRefs.total} refs, ${playbookObsRefs.broken.length} broken`);
  if (playbookObsRefs.broken.length > 0) {
    playbookObsRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const metricObsRefs = collectBrokenRefs(
    metrics,
    m => (m.observableIds || []),
    observableIds,
    'metrics.json',
    'observableIds'
  );
  obsChecks.push({ name: 'metrics.json observableIds[]', ...metricObsRefs });
  console.log(`- metrics.json observableIds[]: ${metricObsRefs.total} refs, ${metricObsRefs.broken.length} broken`);
  if (metricObsRefs.broken.length > 0) {
    metricObsRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const apObsRefs = collectBrokenRefs(
    antiPatterns,
    ap => (ap.observableIds || []),
    observableIds,
    'anti-patterns.json',
    'observableIds'
  );
  obsChecks.push({ name: 'anti-patterns.json observableIds[]', ...apObsRefs });
  console.log(`- anti-patterns.json observableIds[]: ${apObsRefs.total} refs, ${apObsRefs.broken.length} broken`);
  if (apObsRefs.broken.length > 0) {
    apObsRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  console.log('\n## 3. Metric References\n');

  const metricChecks = report.metricReferences.checks;

  const playbookMetricRefs = collectBrokenRefs(
    playbooks,
    p => (p.suggestedMetricIds || []),
    metricIds,
    'playbooks.json',
    'suggestedMetricIds'
  );
  metricChecks.push({ name: 'playbooks.json suggestedMetricIds[]', ...playbookMetricRefs });
  console.log(`- playbooks.json suggestedMetricIds[]: ${playbookMetricRefs.total} refs, ${playbookMetricRefs.broken.length} broken`);
  if (playbookMetricRefs.broken.length > 0) {
    playbookMetricRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const metricPairRefs = collectBrokenRefs(
    metrics,
    m => (m.mandatoryPairIds || []),
    metricIds,
    'metrics.json',
    'mandatoryPairIds'
  );
  metricChecks.push({ name: 'metrics.json mandatoryPairIds[]', ...metricPairRefs });
  console.log(`- metrics.json mandatoryPairIds[]: ${metricPairRefs.total} refs, ${metricPairRefs.broken.length} broken`);
  if (metricPairRefs.broken.length > 0) {
    metricPairRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  const metricReplacesRefs = collectBrokenRefs(
    metrics,
    m => m.replaces ? m.replaces.split(',').map(s => s.trim()).filter(Boolean) : [],
    metricIds,
    'metrics.json',
    'replaces'
  );
  metricChecks.push({ name: 'metrics.json replaces', ...metricReplacesRefs });
  console.log(`- metrics.json replaces: ${metricReplacesRefs.total} refs, ${metricReplacesRefs.broken.length} broken`);
  if (metricReplacesRefs.broken.length > 0) {
    metricReplacesRefs.broken.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}`));
  }

  console.log('\n## 4. Anti-Pattern References\n');

  const apChecks = report.antiPatternReferences.checks;

  let totalApRelated = 0;
  let brokenApRelated = [];
  for (const ap of antiPatterns) {
    const related = ap.relatedAntiPatterns || [];
    totalApRelated += related.length;
    for (const ref of related) {
      if (!antiPatternSlugs.has(ref) && !antiPatternIds.has(ref)) {
        brokenApRelated.push({ source: ap.id, ref });
      }
      if (ap.slug === ref || ap.id === ref) {
        brokenApRelated.push({ source: ap.id, ref, issue: 'SELF_REFERENCE' });
      }
    }
  }
  apChecks.push({ name: 'anti-patterns.json relatedAntiPatterns[]', total: totalApRelated, broken: brokenApRelated });
  console.log(`- anti-patterns.json relatedAntiPatterns[]: ${totalApRelated} refs, ${brokenApRelated.length} broken`);
  brokenApRelated.forEach(b => console.log(`  BROKEN: ${b.source} -> ${b.ref}${b.issue ? ` (${b.issue})` : ''}`));

  console.log('\n## 5. Search Index References\n');

  const searchChecks = report.searchIndexReferences.checks;

  const searchObservableIds = new Set(searchIndex.filter(e => e.type === 'observable').map(e => e.id));
  const searchMetricIds = new Set(searchIndex.filter(e => e.type === 'metric').map(e => e.id));
  const searchAPIds = new Set(searchIndex.filter(e => e.type === 'anti-pattern').map(e => e.id));

  let missingObs = [];
  for (const obsId of observableIds) {
    if (!searchObservableIds.has(obsId)) {
      missingObs.push(obsId);
    }
  }
  searchChecks.push({ name: 'search-index.json observable IDs', total: observableIds.size, broken: missingObs.length, missing: missingObs });
  console.log(`- search-index.json observable IDs: ${observableIds.size} expected, ${missingObs.length} missing`);
  if (missingObs.length > 0 && missingObs.length <= 10) {
    missingObs.forEach(id => console.log(`  MISSING: ${id}`));
  } else if (missingObs.length > 10) {
    console.log(`  (showing first 10 of ${missingObs.length})`);
    missingObs.slice(0, 10).forEach(id => console.log(`  MISSING: ${id}`));
  }

  let extraObs = [];
  for (const id of searchObservableIds) {
    if (!observableIds.has(id)) {
      extraObs.push(id);
    }
  }
  if (extraObs.length > 0) {
    console.log(`- search-index.json has ${extraObs.length} unknown observable IDs`);
    extraObs.forEach(id => console.log(`  UNKNOWN: ${id}`));
  }

  let missingMetrics = [];
  for (const mid of metricIds) {
    if (!searchMetricIds.has(mid)) {
      missingMetrics.push(mid);
    }
  }
  searchChecks.push({ name: 'search-index.json metric IDs', total: metricIds.size, broken: missingMetrics.length, missing: missingMetrics });
  console.log(`- search-index.json metric IDs: ${metricIds.size} expected, ${missingMetrics.length} missing`);
  if (missingMetrics.length > 0 && missingMetrics.length <= 10) {
    missingMetrics.forEach(id => console.log(`  MISSING: ${id}`));
  } else if (missingMetrics.length > 10) {
    console.log(`  (showing first 10 of ${missingMetrics.length})`);
    missingMetrics.slice(0, 10).forEach(id => console.log(`  MISSING: ${id}`));
  }

  let extraMetrics = [];
  for (const id of searchMetricIds) {
    if (!metricIds.has(id)) {
      extraMetrics.push(id);
    }
  }
  if (extraMetrics.length > 0) {
    console.log(`- search-index.json has ${extraMetrics.length} unknown metric IDs`);
    extraMetrics.forEach(id => console.log(`  UNKNOWN: ${id}`));
  }

  let missingAPs = [];
  for (const id of antiPatternIds) {
    if (!searchAPIds.has(id)) {
      missingAPs.push(id);
    }
  }
  searchChecks.push({ name: 'search-index.json anti-pattern IDs', total: antiPatternIds.size, broken: missingAPs.length, missing: missingAPs });
  console.log(`- search-index.json anti-pattern IDs: ${antiPatternIds.size} expected, ${missingAPs.length} missing`);
  if (missingAPs.length > 0 && missingAPs.length <= 10) {
    missingAPs.forEach(id => console.log(`  MISSING: ${id}`));
  } else if (missingAPs.length > 10) {
    console.log(`  (showing first 10 of ${missingAPs.length})`);
    missingAPs.slice(0, 10).forEach(id => console.log(`  MISSING: ${id}`));
  }

  let extraAPs = [];
  for (const id of searchAPIds) {
    if (!antiPatternIds.has(id)) {
      extraAPs.push(id);
    }
  }
  if (extraAPs.length > 0) {
    console.log(`- search-index.json has ${extraAPs.length} unknown anti-pattern IDs`);
    extraAPs.forEach(id => console.log(`  UNKNOWN: ${id}`));
  }

  console.log('\n## Summary\n');

  let totalRefs = 0;
  let totalBroken = 0;

  for (const check of [...capChecks, ...obsChecks, ...metricChecks, ...apChecks]) {
    totalRefs += check.total || 0;
    totalBroken += (check.broken || []).length;
  }

  console.log(`Total references checked: ${totalRefs}`);
  console.log(`Total broken references: ${totalBroken}`);

  if (totalBroken === 0) {
    console.log('\nAll referential integrity checks passed!');
  } else {
    console.log(`\nFound ${totalBroken} broken reference(s) that need attention.`);
  }

  report.summary = { totalChecks: totalRefs, totalBroken };

  return report;
}

main();

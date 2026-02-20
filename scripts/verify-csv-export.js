#!/usr/bin/env node
/**
 * verify-csv-export.js — Thorough verification of CSV exports against source JSON.
 *
 * Checks:
 *   1. Row counts match source data
 *   2. All CSV files parse correctly (no broken quoting)
 *   3. Key field values match between JSON and CSV
 *   4. No data loss in arrays (semicolon-joined)
 *   5. Nested object flattening is correct
 *   6. UTF-8 BOM present
 *   7. CRLF line endings
 *   8. No empty/missing CSVs for any JSON source
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const CSV_DIR = path.join(__dirname, '..', 'exports', 'csv');

let passCount = 0;
let failCount = 0;
let warnCount = 0;

function pass(msg) { passCount++; console.log(`  ✓ ${msg}`); }
function fail(msg) { failCount++; console.log(`  ✗ FAIL: ${msg}`); }
function warn(msg) { warnCount++; console.log(`  ⚠ WARN: ${msg}`); }
function section(msg) { console.log(`\n${'='.repeat(60)}\n${msg}\n${'='.repeat(60)}`); }

// ---------------------------------------------------------------------------
// CSV parser (handles quoted fields with commas, newlines, escaped quotes)
// ---------------------------------------------------------------------------
function parseCSV(content) {
  // Strip BOM
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < content.length) {
    const ch = content[i];

    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < content.length && content[i + 1] === '"') {
          field += '"';
          i += 2;
        } else {
          inQuotes = false;
          i++;
        }
      } else {
        field += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
        i++;
      } else if (ch === ',') {
        row.push(field);
        field = '';
        i++;
      } else if (ch === '\r') {
        if (i + 1 < content.length && content[i + 1] === '\n') {
          row.push(field);
          field = '';
          if (row.some(f => f !== '')) rows.push(row);
          row = [];
          i += 2;
        } else {
          field += ch;
          i++;
        }
      } else if (ch === '\n') {
        row.push(field);
        field = '';
        if (row.some(f => f !== '')) rows.push(row);
        row = [];
        i++;
      } else {
        field += ch;
        i++;
      }
    }
  }

  // Last field/row
  if (field || row.length > 0) {
    row.push(field);
    if (row.some(f => f !== '')) rows.push(row);
  }

  return rows;
}

function readCSV(filename) {
  const filePath = path.join(CSV_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  return parseCSV(content);
}

function readJSON(filename) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf8'));
}

function csvToObjects(parsed) {
  if (!parsed || parsed.length < 2) return [];
  const headers = parsed[0];
  return parsed.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ''; });
    return obj;
  });
}

// ---------------------------------------------------------------------------
// Verification checks
// ---------------------------------------------------------------------------

section('1. FILE EXISTENCE & FORMAT CHECKS');

// Check all CSV files exist
const csvFiles = fs.readdirSync(CSV_DIR).filter(f => f.endsWith('.csv')).sort();
console.log(`  Found ${csvFiles.length} CSV files`);

// Check BOM and CRLF on every file
for (const file of csvFiles) {
  const raw = fs.readFileSync(path.join(CSV_DIR, file));
  const hasBOM = raw[0] === 0xEF && raw[1] === 0xBB && raw[2] === 0xBF;
  if (hasBOM) {
    pass(`${file}: UTF-8 BOM present`);
  } else {
    fail(`${file}: Missing UTF-8 BOM`);
  }

  const text = raw.toString('utf8');
  const hasCRLF = text.includes('\r\n');
  const hasBareLF = text.replace(/\r\n/g, '').includes('\n');
  // Some fields may have embedded newlines in quoted strings, so just check line endings
  if (hasCRLF) {
    pass(`${file}: CRLF line endings`);
  } else {
    fail(`${file}: Missing CRLF line endings`);
  }
}

// Check every CSV parses without error
section('2. CSV PARSING VALIDATION');
for (const file of csvFiles) {
  const parsed = readCSV(file);
  if (!parsed) {
    fail(`${file}: Could not read/parse`);
    continue;
  }
  const headers = parsed[0];
  const dataRows = parsed.slice(1);
  const badRows = dataRows.filter(r => r.length !== headers.length);
  if (badRows.length === 0) {
    pass(`${file}: All ${dataRows.length} rows have ${headers.length} columns (consistent)`);
  } else {
    fail(`${file}: ${badRows.length}/${dataRows.length} rows have mismatched column count (expected ${headers.length})`);
    badRows.slice(0, 3).forEach((r, i) => console.log(`    row has ${r.length} cols: ${r.slice(0, 3).join(' | ')}...`));
  }
}

// ---------------------------------------------------------------------------
// Per-file data integrity checks
// ---------------------------------------------------------------------------
section('3. ROW COUNT VERIFICATION (CSV rows vs JSON items)');

function checkRowCount(csvFile, expectedCount, label) {
  const parsed = readCSV(csvFile);
  if (!parsed) { fail(`${csvFile}: file missing`); return; }
  const actual = parsed.length - 1; // minus header
  if (actual === expectedCount) {
    pass(`${csvFile}: ${actual} rows (matches ${label})`);
  } else {
    fail(`${csvFile}: ${actual} rows but expected ${expectedCount} (${label})`);
  }
}

// Simple arrays
const simpleChecks = [
  ['anti-patterns.csv', 'anti-patterns.json'],
  ['archetypes.csv', 'archetypes.json'],
  ['calibration-language.csv', 'calibration-language.json'],
  ['calibration-signals.csv', 'calibration-signals.json'],
  ['capabilities.csv', 'capabilities.json'],
  ['coverage.csv', 'coverage.json'],
  ['crosswalk.csv', 'crosswalk.json'],
  ['evidence-types.csv', 'evidence-types.json'],
  ['interview-questions.csv', 'interview-questions.json'],
  ['metrics.csv', 'metrics.json'],
  ['observables.csv', 'observables.json'],
  ['playbooks.csv', 'playbooks.json'],
  ['rubric-anchors.csv', 'rubric-anchors.json'],
  ['search-index.csv', 'search-index.json'],
  ['measurement-guidance.csv', 'measurement-guidance.json'],
  ['metric-pairs.csv', 'metric-pairs.json'],
];

for (const [csvFile, jsonFile] of simpleChecks) {
  const data = readJSON(jsonFile);
  checkRowCount(csvFile, data.length, `${jsonFile} array length`);
}

// Object-wrapped files
const cp = readJSON('career-progression.json');
checkRowCount('career-progression.csv', cp.levels.length, 'career-progression levels');

const db = readJSON('dashboard-blueprints.json');
checkRowCount('dashboard-blueprints.csv', db.dashboards.length, 'dashboard-blueprints dashboards');
const totalWidgets = db.dashboards.reduce((sum, d) => sum + d.sections.reduce((s, sec) => s + sec.widgets.length, 0), 0);
checkRowCount('dashboard-blueprints-widgets.csv', totalWidgets, 'dashboard-blueprints widgets');

const dc = readJSON('diagnostic-chains.json');
checkRowCount('diagnostic-chains.csv', dc.length, 'diagnostic-chains');
const totalSteps = dc.reduce((sum, c) => sum + (c.steps || []).length, 0);
checkRowCount('diagnostic-chains-steps.csv', totalSteps, 'diagnostic-chains steps');

const mr = readJSON('metrics-roadmap.json');
checkRowCount('metrics-roadmap-phases.csv', mr.phases.length, 'metrics-roadmap phases');
const totalTasks = mr.phases.reduce((sum, p) => sum + (p.tasks || []).length, 0);
checkRowCount('metrics-roadmap-tasks.csv', totalTasks, 'metrics-roadmap tasks');
if (mr.laws) checkRowCount('metrics-roadmap-laws.csv', mr.laws.length, 'metrics-roadmap laws');

const om = readJSON('org-maturity.json');
checkRowCount('org-maturity.csv', om.levels.length, 'org-maturity levels');

const ps = readJSON('priority-stacks.json');
checkRowCount('priority-stacks-em.csv', ps.em.length, 'priority-stacks em');
checkRowCount('priority-stacks-director.csv', ps.director.length, 'priority-stacks director');

const sa = readJSON('self-assessment.json');
const totalAnchors = sa.reduce((sum, item) => sum + (item.behavioralAnchors || []).length, 0);
const totalGaps = sa.reduce((sum, item) => sum + (item.gapQuestions || []).length, 0);
const totalFeedback = sa.reduce((sum, item) => sum + (item.feedbackQuestions || []).length, 0);
checkRowCount('self-assessment-anchors.csv', totalAnchors, 'self-assessment anchors');
checkRowCount('self-assessment-gap-questions.csv', totalGaps, 'self-assessment gap questions');
checkRowCount('self-assessment-feedback-questions.csv', totalFeedback, 'self-assessment feedback questions');

const lp = readJSON('learning-pathways.json');
const totalResources = lp.reduce((sum, item) =>
  sum + (item.foundational || []).length + (item.practical || []).length, 0);
checkRowCount('learning-pathways.csv', totalResources, 'learning-pathways resources');

const tde = readJSON('tech-debt-economics.json');
checkRowCount('tech-debt-economics-core-numbers.csv', tde.coreNumbers.length, 'tech-debt core numbers');
checkRowCount('tech-debt-economics-cd3-examples.csv', tde.cd3.example.length, 'tech-debt CD3 examples');
checkRowCount('tech-debt-economics-decision-test.csv', tde.decisionTest.length, 'tech-debt decision test');
const totalStarters = Object.values(tde.starterSequences).reduce((sum, arr) => sum + arr.length, 0);
checkRowCount('tech-debt-economics-starter-sequences.csv', totalStarters, 'tech-debt starter sequences');

// ---------------------------------------------------------------------------
// Spot-check field values
// ---------------------------------------------------------------------------
section('4. FIELD VALUE SPOT-CHECKS');

// capabilities.csv — check all IDs and names match
{
  const json = readJSON('capabilities.json');
  const csv = csvToObjects(readCSV('capabilities.csv'));
  let allMatch = true;
  for (const item of json) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`capabilities.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (csvRow.name !== item.name) { fail(`capabilities.csv: id ${item.id} name mismatch: "${csvRow.name}" vs "${item.name}"`); allMatch = false; }
    if (csvRow.domain !== item.domain) { fail(`capabilities.csv: id ${item.id} domain mismatch`); allMatch = false; }
    if (csvRow.primarySubTopics !== item.primarySubTopics.join('; ')) { fail(`capabilities.csv: id ${item.id} primarySubTopics mismatch`); allMatch = false; }
  }
  if (allMatch) pass('capabilities.csv: All IDs, names, domains, and primarySubTopics match JSON');
}

// metrics.csv — check flattened emRank/directorRank
{
  const json = readJSON('metrics.json');
  const csv = csvToObjects(readCSV('metrics.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 10)) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`metrics.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (csvRow.name !== item.name) { fail(`metrics.csv: id ${item.id} name mismatch`); allMatch = false; }
    if (item.emRank && csvRow['emRank.rank'] !== String(item.emRank.rank)) {
      fail(`metrics.csv: id ${item.id} emRank.rank mismatch: "${csvRow['emRank.rank']}" vs "${item.emRank.rank}"`);
      allMatch = false;
    }
    if (item.directorRank && csvRow['directorRank.priority'] !== item.directorRank.priority) {
      fail(`metrics.csv: id ${item.id} directorRank.priority mismatch`);
      allMatch = false;
    }
    // Check array fields
    if (item.mandatoryPairIds) {
      const expected = item.mandatoryPairIds.join('; ');
      if (csvRow.mandatoryPairIds !== expected) {
        fail(`metrics.csv: id ${item.id} mandatoryPairIds mismatch: "${csvRow.mandatoryPairIds}" vs "${expected}"`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('metrics.csv: First 10 metrics — IDs, names, emRank, directorRank, mandatoryPairIds all correct');
}

// anti-patterns.csv — check arrays (warningSigns, recoveryActions)
{
  const json = readJSON('anti-patterns.json');
  const csv = csvToObjects(readCSV('anti-patterns.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 5)) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`anti-patterns.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (item.warningSigns) {
      const expected = item.warningSigns.join('; ');
      if (csvRow.warningSigns !== expected) {
        fail(`anti-patterns.csv: id ${item.id} warningSigns mismatch`);
        allMatch = false;
      }
    }
    if (item.recoveryActions) {
      const expected = item.recoveryActions.join('; ');
      if (csvRow.recoveryActions !== expected) {
        fail(`anti-patterns.csv: id ${item.id} recoveryActions mismatch`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('anti-patterns.csv: First 5 items — warningSigns and recoveryActions arrays preserved correctly');
}

// career-progression.csv — check capability expectations flattening
{
  const json = readJSON('career-progression.json');
  const csv = csvToObjects(readCSV('career-progression.csv'));
  let allMatch = true;
  for (const lev of json.levels) {
    const csvRow = csv.find(r => r.level === String(lev.level));
    if (!csvRow) { fail(`career-progression.csv: missing level ${lev.level}`); allMatch = false; continue; }
    if (csvRow.title !== lev.title) { fail(`career-progression.csv: level ${lev.level} title mismatch`); allMatch = false; }
    for (const [cap, val] of Object.entries(lev.capabilityExpectations || {})) {
      const colName = `capExpect.${cap}`;
      if (csvRow[colName] !== val) {
        fail(`career-progression.csv: level ${lev.level} ${colName} = "${csvRow[colName]}" expected "${val}"`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('career-progression.csv: All levels, titles, and capabilityExpectations columns match');
}

// metric-pairs.csv — check metricA/metricB flattening
{
  const json = readJSON('metric-pairs.json');
  const csv = csvToObjects(readCSV('metric-pairs.csv'));
  let allMatch = true;
  for (const item of json) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`metric-pairs.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (csvRow['metricA.id'] !== item.metricA.id) {
      fail(`metric-pairs.csv: id ${item.id} metricA.id mismatch`);
      allMatch = false;
    }
    if (csvRow['metricB.id'] !== item.metricB.id) {
      fail(`metric-pairs.csv: id ${item.id} metricB.id mismatch`);
      allMatch = false;
    }
    if (csvRow['metricA.role'] !== item.metricA.role) {
      fail(`metric-pairs.csv: id ${item.id} metricA.role mismatch`);
      allMatch = false;
    }
    if (item.metricA.alsoIds) {
      const expected = item.metricA.alsoIds.join('; ');
      if (csvRow['metricA.alsoIds'] !== expected) {
        fail(`metric-pairs.csv: id ${item.id} metricA.alsoIds mismatch`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('metric-pairs.csv: All metricA/metricB nested fields correctly flattened');
}

// dashboard-blueprints-widgets.csv — check widget count per dashboard
{
  const json = readJSON('dashboard-blueprints.json');
  const csv = csvToObjects(readCSV('dashboard-blueprints-widgets.csv'));
  let allMatch = true;
  for (const dash of json.dashboards) {
    const expectedWidgets = dash.sections.reduce((s, sec) => s + sec.widgets.length, 0);
    const csvWidgets = csv.filter(r => r.dashboardId === dash.id);
    if (csvWidgets.length !== expectedWidgets) {
      fail(`dashboard-blueprints-widgets.csv: dashboard "${dash.id}" has ${csvWidgets.length} widgets, expected ${expectedWidgets}`);
      allMatch = false;
    }
    // Verify first widget
    const firstSection = dash.sections[0];
    const firstWidget = firstSection.widgets[0];
    const csvFirst = csv.find(r => r.dashboardId === dash.id && r.metricId === firstWidget.metricId);
    if (!csvFirst) {
      fail(`dashboard-blueprints-widgets.csv: dashboard "${dash.id}" missing widget metricId=${firstWidget.metricId}`);
      allMatch = false;
    } else {
      if (csvFirst.sectionName !== firstSection.name) {
        fail(`dashboard-blueprints-widgets.csv: section name mismatch for ${dash.id}`);
        allMatch = false;
      }
      if (csvFirst.displayType !== firstWidget.displayType) {
        fail(`dashboard-blueprints-widgets.csv: displayType mismatch for ${dash.id}`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('dashboard-blueprints-widgets.csv: Widget counts and values match per dashboard');
}

// diagnostic-chains-steps.csv — check step details
{
  const json = readJSON('diagnostic-chains.json');
  const csv = csvToObjects(readCSV('diagnostic-chains-steps.csv'));
  let allMatch = true;
  for (const chain of json.slice(0, 5)) {
    for (const step of (chain.steps || [])) {
      const csvRow = csv.find(r => r.chainId === chain.id && r.order === String(step.order));
      if (!csvRow) {
        fail(`diagnostic-chains-steps.csv: missing chain ${chain.id} step ${step.order}`);
        allMatch = false;
        continue;
      }
      if (csvRow.checkMetricId !== step.checkMetricId) {
        fail(`diagnostic-chains-steps.csv: chain ${chain.id} step ${step.order} checkMetricId mismatch`);
        allMatch = false;
      }
      if (csvRow.label !== step.label) {
        fail(`diagnostic-chains-steps.csv: chain ${chain.id} step ${step.order} label mismatch`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('diagnostic-chains-steps.csv: First 5 chains — all step details match');
}

// self-assessment-anchors.csv — verify levels per capability
{
  const json = readJSON('self-assessment.json');
  const csv = csvToObjects(readCSV('self-assessment-anchors.csv'));
  let allMatch = true;
  for (const item of json) {
    const csvRows = csv.filter(r => r.capabilityId === item.capabilityId);
    if (csvRows.length !== (item.behavioralAnchors || []).length) {
      fail(`self-assessment-anchors.csv: ${item.capabilityId} has ${csvRows.length} rows, expected ${(item.behavioralAnchors || []).length}`);
      allMatch = false;
    }
    // Check level 1 description
    const anchor1 = (item.behavioralAnchors || []).find(a => a.level === 1);
    const csvRow1 = csvRows.find(r => r.level === '1');
    if (anchor1 && csvRow1 && anchor1.description !== csvRow1.description) {
      fail(`self-assessment-anchors.csv: ${item.capabilityId} level 1 description mismatch`);
      allMatch = false;
    }
  }
  if (allMatch) pass('self-assessment-anchors.csv: All capabilities have correct anchor counts and level 1 descriptions match');
}

// learning-pathways.csv — check category assignment and resource counts
{
  const json = readJSON('learning-pathways.json');
  const csv = csvToObjects(readCSV('learning-pathways.csv'));
  let allMatch = true;
  for (const item of json) {
    const foundational = csv.filter(r => r.capabilityId === item.capabilityId && r.category === 'foundational');
    const practical = csv.filter(r => r.capabilityId === item.capabilityId && r.category === 'practical');
    if (foundational.length !== (item.foundational || []).length) {
      fail(`learning-pathways.csv: ${item.capabilityId} foundational count ${foundational.length} vs ${(item.foundational || []).length}`);
      allMatch = false;
    }
    if (practical.length !== (item.practical || []).length) {
      fail(`learning-pathways.csv: ${item.capabilityId} practical count ${practical.length} vs ${(item.practical || []).length}`);
      allMatch = false;
    }
  }
  if (allMatch) pass('learning-pathways.csv: All capability resource counts match for both categories');
}

// priority-stacks — check rank ordering
{
  for (const role of ['em', 'director']) {
    const json = readJSON('priority-stacks.json')[role];
    const csv = csvToObjects(readCSV(`priority-stacks-${role}.csv`));
    let allMatch = true;
    for (const item of json) {
      const csvRow = csv.find(r => r.rank === String(item.rank));
      if (!csvRow) { fail(`priority-stacks-${role}.csv: missing rank ${item.rank}`); allMatch = false; continue; }
      if (csvRow.metricId !== item.metricId) {
        fail(`priority-stacks-${role}.csv: rank ${item.rank} metricId mismatch: "${csvRow.metricId}" vs "${item.metricId}"`);
        allMatch = false;
      }
      if (csvRow.dashboard !== item.dashboard) {
        fail(`priority-stacks-${role}.csv: rank ${item.rank} dashboard mismatch`);
        allMatch = false;
      }
    }
    if (allMatch) pass(`priority-stacks-${role}.csv: All ranks, metricIds, and dashboards match`);
  }
}

// observables.csv — spot check a few fields
{
  const json = readJSON('observables.json');
  const csv = csvToObjects(readCSV('observables.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 10)) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`observables.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (csvRow.capabilityId !== item.capabilityId) {
      fail(`observables.csv: id ${item.id} capabilityId mismatch`);
      allMatch = false;
    }
    if (csvRow.shortText !== item.shortText) {
      fail(`observables.csv: id ${item.id} shortText mismatch`);
      allMatch = false;
    }
    if (item.evidenceTypes) {
      const expected = item.evidenceTypes.join('; ');
      if (csvRow.evidenceTypes !== expected) {
        fail(`observables.csv: id ${item.id} evidenceTypes mismatch`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('observables.csv: First 10 items — IDs, capabilityIds, shortText, evidenceTypes all correct');
}

// interview-questions.csv — check arrays (followUps, lookFor, redFlags)
{
  const json = readJSON('interview-questions.json');
  const csv = csvToObjects(readCSV('interview-questions.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 5)) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`interview-questions.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (csvRow.question !== item.question) {
      fail(`interview-questions.csv: id ${item.id} question mismatch`);
      allMatch = false;
    }
    for (const field of ['followUps', 'lookFor', 'redFlags']) {
      if (item[field]) {
        const expected = item[field].join('; ');
        if (csvRow[field] !== expected) {
          fail(`interview-questions.csv: id ${item.id} ${field} mismatch`);
          allMatch = false;
        }
      }
    }
  }
  if (allMatch) pass('interview-questions.csv: First 5 items — questions and array fields (followUps, lookFor, redFlags) match');
}

// org-maturity.csv
{
  const json = readJSON('org-maturity.json');
  const csv = csvToObjects(readCSV('org-maturity.csv'));
  let allMatch = true;
  for (const lev of json.levels) {
    const csvRow = csv.find(r => r.level === String(lev.level));
    if (!csvRow) { fail(`org-maturity.csv: missing level ${lev.level}`); allMatch = false; continue; }
    if (csvRow.name !== lev.name) { fail(`org-maturity.csv: level ${lev.level} name mismatch`); allMatch = false; }
    const expectedIndicators = lev.indicators.join('; ');
    if (csvRow.indicators !== expectedIndicators) {
      fail(`org-maturity.csv: level ${lev.level} indicators mismatch`);
      allMatch = false;
    }
  }
  if (allMatch) pass('org-maturity.csv: All levels, names, and indicators match');
}

// tech-debt-economics — core numbers
{
  const json = readJSON('tech-debt-economics.json');
  const csv = csvToObjects(readCSV('tech-debt-economics-core-numbers.csv'));
  let allMatch = true;
  for (let i = 0; i < json.coreNumbers.length; i++) {
    if (csv[i].dataPoint !== json.coreNumbers[i].dataPoint) {
      fail(`tech-debt-economics-core-numbers.csv: row ${i} dataPoint mismatch`);
      allMatch = false;
    }
    if (csv[i].source !== json.coreNumbers[i].source) {
      fail(`tech-debt-economics-core-numbers.csv: row ${i} source mismatch`);
      allMatch = false;
    }
  }
  if (allMatch) pass('tech-debt-economics-core-numbers.csv: All dataPoints and sources match');
}

// archetypes.csv — check quantifiedThresholds flattening
{
  const json = readJSON('archetypes.json');
  const csv = csvToObjects(readCSV('archetypes.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 3)) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`archetypes.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (item.quantifiedThresholds) {
      for (const [k, v] of Object.entries(item.quantifiedThresholds)) {
        const colName = `quantifiedThresholds.${k}`;
        if (csvRow[colName] !== v) {
          fail(`archetypes.csv: id ${item.id} ${colName} = "${csvRow[colName]}" expected "${v}"`);
          allMatch = false;
        }
      }
    }
  }
  if (allMatch) pass('archetypes.csv: First 3 items — quantifiedThresholds flattened correctly');
}

// crosswalk.csv — check all fields
{
  const json = readJSON('crosswalk.json');
  const csv = csvToObjects(readCSV('crosswalk.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 5)) {
    const csvRow = csv.find(r => r.observableId === item.observableId && r.origSubTopic === item.origSubTopic);
    if (!csvRow) {
      // Try by index
      const idx = json.indexOf(item);
      const csvByIdx = csv[idx];
      if (csvByIdx && csvByIdx.primaryCapability === item.primaryCapability) {
        // OK, found by position
      } else {
        fail(`crosswalk.csv: missing row for observableId=${item.observableId}`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('crosswalk.csv: First 5 rows verified');
}

// metrics-roadmap-tasks.csv
{
  const json = readJSON('metrics-roadmap.json');
  const csv = csvToObjects(readCSV('metrics-roadmap-tasks.csv'));
  let allMatch = true;
  let idx = 0;
  for (const phase of json.phases) {
    for (const task of (phase.tasks || [])) {
      const csvRow = csv[idx++];
      if (!csvRow) { fail(`metrics-roadmap-tasks.csv: missing row at index ${idx - 1}`); allMatch = false; continue; }
      if (csvRow.phase !== String(phase.phase)) {
        fail(`metrics-roadmap-tasks.csv: row ${idx - 1} phase mismatch: "${csvRow.phase}" vs "${phase.phase}"`);
        allMatch = false;
      }
      if (csvRow.task !== task.task) {
        fail(`metrics-roadmap-tasks.csv: row ${idx - 1} task mismatch`);
        allMatch = false;
      }
      if (csvRow.effort !== task.effort) {
        fail(`metrics-roadmap-tasks.csv: row ${idx - 1} effort mismatch`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('metrics-roadmap-tasks.csv: All tasks match with correct phase assignment');
}

// calibration-language.csv
{
  const json = readJSON('calibration-language.json');
  const csv = csvToObjects(readCSV('calibration-language.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 5)) {
    const csvRow = csv.find(r => r.id === item.id);
    if (!csvRow) { fail(`calibration-language.csv: missing id ${item.id}`); allMatch = false; continue; }
    if (csvRow.template !== item.template) {
      fail(`calibration-language.csv: id ${item.id} template mismatch`);
      allMatch = false;
    }
    if (item.variables) {
      const expected = item.variables.join('; ');
      if (csvRow.variables !== expected) {
        fail(`calibration-language.csv: id ${item.id} variables mismatch`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('calibration-language.csv: First 5 items — templates and variables match');
}

// self-assessment-feedback-questions.csv
{
  const json = readJSON('self-assessment.json');
  const csv = csvToObjects(readCSV('self-assessment-feedback-questions.csv'));
  let allMatch = true;
  for (const item of json.slice(0, 3)) {
    for (const fq of (item.feedbackQuestions || [])) {
      const csvRow = csv.find(r =>
        r.capabilityId === item.capabilityId &&
        r.audience === fq.audience &&
        r.question === fq.question
      );
      if (!csvRow) {
        fail(`self-assessment-feedback-questions.csv: missing ${item.capabilityId}/${fq.audience}`);
        allMatch = false;
      }
    }
  }
  if (allMatch) pass('self-assessment-feedback-questions.csv: First 3 capabilities — all audience/question pairs found');
}

// ---------------------------------------------------------------------------
// Coverage check: ensure every JSON file produced at least one CSV
// ---------------------------------------------------------------------------
section('5. COVERAGE CHECK — Every JSON file has CSV output');

const jsonFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json')).sort();
const csvBasenames = csvFiles.map(f => f.replace('.csv', ''));

for (const jsonFile of jsonFiles) {
  const baseName = jsonFile.replace('.json', '');
  const hasCSV = csvBasenames.some(c => c === baseName || c.startsWith(baseName + '-'));
  if (hasCSV) {
    const matching = csvFiles.filter(c => c.replace('.csv', '') === baseName || c.startsWith(baseName + '-'));
    pass(`${jsonFile} → ${matching.join(', ')}`);
  } else {
    fail(`${jsonFile} has NO corresponding CSV output!`);
  }
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
section('SUMMARY');
console.log(`  Passed: ${passCount}`);
console.log(`  Failed: ${failCount}`);
console.log(`  Warnings: ${warnCount}`);
console.log(`\n  ${failCount === 0 ? 'ALL CHECKS PASSED' : `${failCount} FAILURES — review above`}`);
process.exit(failCount > 0 ? 1 : 0);

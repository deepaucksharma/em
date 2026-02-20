#!/usr/bin/env node
/**
 * export-csv.js — Convert all src/data/*.json to Excel-compatible CSV files.
 *
 * Usage:
 *   node scripts/export-csv.js                    # output to exports/csv/
 *   node scripts/export-csv.js --out-dir ./my-dir # custom output directory
 *   node scripts/export-csv.js --file metrics     # export only metrics.json
 *
 * Notes:
 *   - Produces UTF-8 CSV with BOM (so Excel opens it correctly)
 *   - Nested arrays are joined with "; "
 *   - Nested objects are flattened with dot-prefixed column names
 *   - Deeply nested structures (arrays of objects) are split into related CSVs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
let outDir = path.join(__dirname, '..', 'exports', 'csv');
let fileFilter = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--out-dir' && args[i + 1]) { outDir = path.resolve(args[++i]); }
  if (args[i] === '--file' && args[i + 1]) { fileFilter = args[++i]; }
}

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
const BOM = '\uFEFF'; // Excel UTF-8 BOM

// ---------------------------------------------------------------------------
// CSV helpers
// ---------------------------------------------------------------------------
function escapeCSV(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function rowToCSV(values) {
  return values.map(escapeCSV).join(',');
}

function writeCSV(filename, headers, rows) {
  const filePath = path.join(outDir, filename);
  const lines = [rowToCSV(headers), ...rows.map(r => rowToCSV(r))];
  fs.writeFileSync(filePath, BOM + lines.join('\r\n') + '\r\n', 'utf8');
  console.log(`  -> ${filename}  (${rows.length} rows)`);
}

/** Flatten a value: arrays of primitives → joined string, objects → prefixed keys */
function flattenValue(val) {
  if (val === null || val === undefined) return '';
  if (Array.isArray(val)) {
    if (val.length === 0) return '';
    if (typeof val[0] === 'object') return JSON.stringify(val); // complex — handled separately
    return val.join('; ');
  }
  if (typeof val === 'object') return JSON.stringify(val); // handled separately
  return val;
}

/** Flatten an object one level deep: nested objects get dot-prefixed keys */
function flattenObject(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const colName = prefix ? `${prefix}.${key}` : key;
    if (val === null || val === undefined) {
      result[colName] = '';
    } else if (Array.isArray(val)) {
      if (val.length === 0) {
        result[colName] = '';
      } else if (typeof val[0] !== 'object') {
        result[colName] = val.join('; ');
      } else {
        result[colName] = JSON.stringify(val); // marker for complex
      }
    } else if (typeof val === 'object') {
      // Flatten one more level
      const nested = flattenObject(val, colName);
      Object.assign(result, nested);
    } else {
      result[colName] = val;
    }
  }
  return result;
}

/** Auto-convert an array of objects into CSV (simple flat case) */
function autoFlatCSV(filename, items) {
  const flattened = items.map(item => flattenObject(item));
  const headerSet = new Set();
  flattened.forEach(row => Object.keys(row).forEach(k => headerSet.add(k)));
  const headers = [...headerSet];
  const rows = flattened.map(row => headers.map(h => row[h] !== undefined ? row[h] : ''));
  writeCSV(filename, headers, rows);
}

// ---------------------------------------------------------------------------
// Per-file converters
// ---------------------------------------------------------------------------
const converters = {};

// --- Simple flat arrays (auto-flatten) ---
const simpleFiles = [
  'capabilities', 'coverage', 'evidence-types', 'search-index',
  'crosswalk', 'calibration-language', 'rubric-anchors',
];
for (const name of simpleFiles) {
  converters[name] = (data) => autoFlatCSV(`${name}.csv`, data);
}

// --- calibration-signals ---
converters['calibration-signals'] = (data) => autoFlatCSV('calibration-signals.csv', data);

// --- anti-patterns ---
converters['anti-patterns'] = (data) => autoFlatCSV('anti-patterns.csv', data);

// --- playbooks ---
converters['playbooks'] = (data) => autoFlatCSV('playbooks.csv', data);

// --- observables ---
converters['observables'] = (data) => autoFlatCSV('observables.csv', data);

// --- metrics (flatten emRank / directorRank objects) ---
converters['metrics'] = (data) => autoFlatCSV('metrics.csv', data);

// --- interview-questions ---
converters['interview-questions'] = (data) => autoFlatCSV('interview-questions.csv', data);

// --- measurement-guidance ---
converters['measurement-guidance'] = (data) => autoFlatCSV('measurement-guidance.csv', data);

// --- archetypes (flatten quantifiedThresholds) ---
converters['archetypes'] = (data) => autoFlatCSV('archetypes.csv', data);

// --- metric-pairs (flatten metricA / metricB) ---
converters['metric-pairs'] = (data) => autoFlatCSV('metric-pairs.csv', data);

// --- diagnostic-chains: main + steps child table ---
converters['diagnostic-chains'] = (data) => {
  // Main table
  const main = data.map(dc => ({
    id: dc.id,
    triggerMetricId: dc.triggerMetricId,
    triggerCondition: dc.triggerCondition,
    slug: dc.slug,
    directorQuestion: dc.directorQuestion,
    stepCount: dc.steps ? dc.steps.length : 0,
  }));
  autoFlatCSV('diagnostic-chains.csv', main);

  // Steps child table
  const stepRows = [];
  for (const dc of data) {
    for (const step of (dc.steps || [])) {
      stepRows.push({
        chainId: dc.id,
        order: step.order,
        checkMetricId: step.checkMetricId,
        alsoCheckMetricIds: (step.alsoCheckMetricIds || []).join('; '),
        label: step.label,
        reason: step.reason,
      });
    }
  }
  autoFlatCSV('diagnostic-chains-steps.csv', stepRows);
};

// --- self-assessment: anchors + gap questions + feedback questions ---
converters['self-assessment'] = (data) => {
  const anchors = [];
  const gaps = [];
  const feedback = [];

  for (const item of data) {
    for (const anchor of (item.behavioralAnchors || [])) {
      anchors.push({
        capabilityId: item.capabilityId,
        level: anchor.level,
        description: anchor.description,
      });
    }
    for (const q of (item.gapQuestions || [])) {
      gaps.push({ capabilityId: item.capabilityId, question: q });
    }
    for (const fq of (item.feedbackQuestions || [])) {
      feedback.push({
        capabilityId: item.capabilityId,
        audience: fq.audience,
        question: fq.question,
      });
    }
  }

  autoFlatCSV('self-assessment-anchors.csv', anchors);
  autoFlatCSV('self-assessment-gap-questions.csv', gaps);
  autoFlatCSV('self-assessment-feedback-questions.csv', feedback);
};

// --- learning-pathways: foundational + practical resources ---
converters['learning-pathways'] = (data) => {
  const resources = [];
  for (const item of data) {
    for (const category of ['foundational', 'practical']) {
      for (const res of (item[category] || [])) {
        resources.push({
          capabilityId: item.capabilityId,
          category,
          title: res.title,
          type: res.type,
          description: res.description,
          url: res.url || '',
        });
      }
    }
  }
  autoFlatCSV('learning-pathways.csv', resources);
};

// --- career-progression: levels (flatten capabilityExpectations) ---
converters['career-progression'] = (data) => {
  const levels = (data.levels || []).map(lev => {
    const row = {
      level: lev.level,
      title: lev.title,
      slug: lev.slug,
      scope: lev.scope,
      keyDifferences: (lev.keyDifferences || []).join('; '),
      promotionBlockers: (lev.promotionBlockers || []).join('; '),
      transitionSignals: (lev.transitionSignals || []).join('; '),
    };
    // Flatten capabilityExpectations (C1: high, C2: medium, ...)
    if (lev.capabilityExpectations) {
      for (const [cap, val] of Object.entries(lev.capabilityExpectations)) {
        row[`capExpect.${cap}`] = val;
      }
    }
    return row;
  });
  autoFlatCSV('career-progression.csv', levels);
};

// --- dashboard-blueprints: dashboards + widgets child table ---
converters['dashboard-blueprints'] = (data) => {
  const dashboards = (data.dashboards || []).map(d => ({
    id: d.id,
    name: d.name,
    slug: d.slug,
    description: d.description,
    cadence: d.cadence,
    sectionCount: (d.sections || []).length,
  }));
  autoFlatCSV('dashboard-blueprints.csv', dashboards);

  const widgets = [];
  for (const d of (data.dashboards || [])) {
    for (const section of (d.sections || [])) {
      for (const widget of (section.widgets || [])) {
        widgets.push({
          dashboardId: d.id,
          sectionName: section.name,
          sectionPosition: section.position,
          metricId: widget.metricId,
          displayType: widget.displayType,
          label: widget.label,
        });
      }
    }
  }
  autoFlatCSV('dashboard-blueprints-widgets.csv', widgets);
};

// --- metrics-roadmap: phases + tasks + laws ---
converters['metrics-roadmap'] = (data) => {
  // Phases
  const phases = (data.phases || []).map(p => ({
    phase: p.phase,
    name: p.name,
    slug: p.slug,
    duration: p.duration,
    goal: p.goal,
    metricsActivated: (p.metricsActivated || []).join('; '),
    exitCriteria: p.exitCriteria || '',
  }));
  autoFlatCSV('metrics-roadmap-phases.csv', phases);

  // Tasks
  const tasks = [];
  for (const p of (data.phases || [])) {
    for (const t of (p.tasks || [])) {
      tasks.push({
        phase: p.phase,
        phaseName: p.name,
        task: t.task,
        effort: t.effort,
        successCriteria: t.successCriteria,
      });
    }
  }
  autoFlatCSV('metrics-roadmap-tasks.csv', tasks);

  // Laws (if present)
  if (data.laws && data.laws.length > 0) {
    autoFlatCSV('metrics-roadmap-laws.csv', data.laws);
  }

  // Decision test (if present)
  if (data.decisionTest) {
    const dtRows = data.decisionTest.map((q, i) => ({ order: i + 1, question: q }));
    autoFlatCSV('metrics-roadmap-decision-test.csv', dtRows);
  }

  // Starter sequences (if present)
  if (data.starterSequences) {
    const seqRows = [];
    for (const [role, steps] of Object.entries(data.starterSequences)) {
      steps.forEach((s, i) => {
        seqRows.push({
          role,
          order: i + 1,
          question: s.question,
          noAction: s.noAction,
          yesNext: s.yesNext,
        });
      });
    }
    autoFlatCSV('metrics-roadmap-starter-sequences.csv', seqRows);
  }
};

// --- org-maturity ---
converters['org-maturity'] = (data) => {
  const levels = (data.levels || []).map(lev => ({
    level: lev.level,
    name: lev.name,
    slug: lev.slug,
    description: lev.description,
    indicators: (lev.indicators || []).join('; '),
    recommendedActions: (lev.recommendedActions || []).join('; '),
    capabilityFocus: (lev.capabilityFocus || []).join('; '),
  }));
  autoFlatCSV('org-maturity.csv', levels);
};

// --- priority-stacks: em + director ---
converters['priority-stacks'] = (data) => {
  for (const role of ['em', 'director']) {
    if (data[role]) {
      const rows = data[role].map(item => ({ ...item, role }));
      autoFlatCSV(`priority-stacks-${role}.csv`, rows);
    }
  }
};

// --- tech-debt-economics: multiple sections ---
converters['tech-debt-economics'] = (data) => {
  // Core numbers
  if (data.coreNumbers) {
    autoFlatCSV('tech-debt-economics-core-numbers.csv', data.coreNumbers);
  }

  // Investment mandate
  if (data.investmentMandate) {
    const im = data.investmentMandate;
    const rows = [{
      target: im.target,
      source: im.source,
      description: im.description,
      strategies: (im.strategies || []).join('; '),
    }];
    autoFlatCSV('tech-debt-economics-investment-mandate.csv', rows);
  }

  // CD3 examples
  if (data.cd3) {
    const cd3Main = [{
      formula: data.cd3.formula,
      description: data.cd3.description,
      whenToUse: data.cd3.whenToUse,
      impact: data.cd3.impact,
    }];
    autoFlatCSV('tech-debt-economics-cd3.csv', cd3Main);

    if (data.cd3.example) {
      autoFlatCSV('tech-debt-economics-cd3-examples.csv', data.cd3.example);
    }
  }

  // Starter sequences
  if (data.starterSequences) {
    const seqRows = [];
    for (const [role, steps] of Object.entries(data.starterSequences)) {
      steps.forEach((s, i) => {
        seqRows.push({
          role,
          order: i + 1,
          question: s.question,
          noAction: s.noAction,
          yesNext: s.yesNext,
        });
      });
    }
    autoFlatCSV('tech-debt-economics-starter-sequences.csv', seqRows);
  }

  // Decision test
  if (data.decisionTest) {
    const dtRows = data.decisionTest.map((q, i) => ({ order: i + 1, question: q }));
    autoFlatCSV('tech-debt-economics-decision-test.csv', dtRows);
  }
};

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  // Ensure output directory
  fs.mkdirSync(outDir, { recursive: true });

  // Get all JSON files
  let files = fs.readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  if (fileFilter) {
    const filterName = fileFilter.replace(/\.json$/, '');
    files = files.filter(f => f.replace(/\.json$/, '') === filterName);
    if (files.length === 0) {
      console.error(`No file matching "${fileFilter}" found in ${DATA_DIR}`);
      process.exit(1);
    }
  }

  console.log(`Exporting ${files.length} JSON files to CSV...\n`);
  console.log(`Output directory: ${outDir}\n`);

  let totalCSVs = 0;

  for (const file of files) {
    const name = file.replace(/\.json$/, '');
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`[${name}]`);

    if (converters[name]) {
      const before = fs.readdirSync(outDir).length;
      converters[name](data);
      const after = fs.readdirSync(outDir).length;
      totalCSVs += (after - before);
    } else {
      // Fallback: if it's an array, auto-flatten
      if (Array.isArray(data)) {
        autoFlatCSV(`${name}.csv`, data);
        totalCSVs++;
      } else if (typeof data === 'object') {
        // Try to find the main array inside the object
        const arrayKeys = Object.keys(data).filter(k => Array.isArray(data[k]));
        if (arrayKeys.length > 0) {
          for (const key of arrayKeys) {
            autoFlatCSV(`${name}-${key}.csv`, data[key]);
            totalCSVs++;
          }
        } else {
          // Single-row object
          autoFlatCSV(`${name}.csv`, [data]);
          totalCSVs++;
        }
      }
    }
    console.log('');
  }

  console.log(`Done! ${totalCSVs} CSV files written to ${outDir}`);
}

main();

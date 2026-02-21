#!/usr/bin/env node
/**
 * Comprehensive Observable Analysis Script
 * Analyzes observables.json for quality issues and patterns
 */

const observables = require('../src/data/observables.json');
const capabilities = require('../src/data/capabilities.json');

// Expected counts per capability
const EXPECTED_COUNTS = {
  'C1': 16, 'C2': 6, 'C3': 11, 'C4': 13, 'C5': 16, 'C6': 13, 'C7': 11,
  'C8': 8, 'C9': 10, 'C10': 8, 'C11': 11, 'C12': 8, 'C13': 7, 'C14': 9
};

// Vague terms to flag
const VAGUE_TERMS = [
  'effectively', 'appropriately', 'ensures', 'fosters', 'drives',
  'leverages', 'facilitates', 'optimizes', 'enhances', 'improves'
];

console.log('='.repeat(80));
console.log('OBSERVABLES.JSON ANALYSIS REPORT');
console.log('='.repeat(80));
console.log();

// ============================================================================
// 1. ID PATTERN & COUNT VERIFICATION
// ============================================================================
console.log('1. ID PATTERN & COUNT VERIFICATION');
console.log('-'.repeat(80));

const byCapability = {};
const idPattern = /^C(\d+)-O(\d+)$/;
let invalidIds = [];
let gaps = [];

observables.forEach(obs => {
  const match = obs.id.match(idPattern);
  if (!match) {
    invalidIds.push(obs.id);
    return;
  }

  const capId = `C${match[1]}`;
  if (!byCapability[capId]) {
    byCapability[capId] = [];
  }
  byCapability[capId].push(parseInt(match[2]));
});

// Check counts and gaps
Object.keys(EXPECTED_COUNTS).sort().forEach(capId => {
  const numbers = byCapability[capId]?.sort((a, b) => a - b) || [];
  const expected = EXPECTED_COUNTS[capId];
  const actual = numbers.length;

  // Check for gaps
  const capGaps = [];
  for (let i = 1; i <= expected; i++) {
    if (!numbers.includes(i)) {
      capGaps.push(i);
    }
  }

  const status = actual === expected && capGaps.length === 0 ? '✓' : '✗';
  console.log(`  ${status} ${capId}: Expected ${expected}, Found ${actual}${capGaps.length > 0 ? ` (gaps: ${capGaps.join(', ')})` : ''}`);

  if (capGaps.length > 0) {
    gaps.push({ capability: capId, gaps: capGaps });
  }
});

if (invalidIds.length > 0) {
  console.log(`\n  Invalid ID formats: ${invalidIds.join(', ')}`);
}

console.log();

// ============================================================================
// 2. ENUM VALUES
// ============================================================================
console.log('2. ENUM VALUES VERIFICATION');
console.log('-'.repeat(80));

const emRelevanceValues = new Set();
const directorRelevanceValues = new Set();
const requiredFrequencyValues = new Set();

observables.forEach(obs => {
  emRelevanceValues.add(obs.emRelevance);
  directorRelevanceValues.add(obs.directorRelevance);
  requiredFrequencyValues.add(obs.requiredFrequency);
});

console.log('  emRelevance values:', Array.from(emRelevanceValues).sort().join(', '));
console.log('  directorRelevance values:', Array.from(directorRelevanceValues).sort().join(', '));
console.log('  requiredFrequency values:', Array.from(requiredFrequencyValues).sort().join(', '));
console.log();

// ============================================================================
// 3. WEIGHT SUMS
// ============================================================================
console.log('3. WEIGHT SUMS PER CAPABILITY');
console.log('-'.repeat(80));

const weightSums = {};
observables.forEach(obs => {
  const capId = obs.id.split('-')[0];
  if (!weightSums[capId]) {
    weightSums[capId] = 0;
  }
  weightSums[capId] += obs.defaultWeight;
});

Object.keys(weightSums).sort().forEach(capId => {
  const sum = weightSums[capId];
  const deviation = Math.abs(sum - 1.0);
  const status = deviation <= 0.05 ? '✓' : '✗';
  console.log(`  ${status} ${capId}: ${sum.toFixed(4)} (deviation: ${deviation > 0.05 ? '**' : ''}${deviation.toFixed(4)}${deviation > 0.05 ? '**' : ''})`);
});
console.log();

// ============================================================================
// 4. VAGUE LANGUAGE
// ============================================================================
console.log('4. VAGUE LANGUAGE DETECTION');
console.log('-'.repeat(80));

const vagueness = [];

observables.forEach(obs => {
  ['why', 'how', 'expectedResult', 'fullExample'].forEach(field => {
    const text = obs[field] || '';
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());

    sentences.forEach(sentence => {
      VAGUE_TERMS.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        if (regex.test(sentence)) {
          // Check if there's a mechanism nearby (specific noun, number, format)
          const hasMechanism = /\b(via|through|by|using|with|during|at|every|weekly|monthly|quarterly|daily|sprint|review|meeting|template|dashboard|metric|threshold|\d+%|\d+ (hours|days|weeks)|specific|concrete)\b/i.test(sentence);

          if (!hasMechanism) {
            vagueness.push({
              id: obs.id,
              field,
              term,
              sentence: sentence.trim().substring(0, 100)
            });
          }
        }
      });
    });
  });
});

if (vagueness.length > 0) {
  console.log(`  Found ${vagueness.length} instances of vague language:\n`);
  vagueness.slice(0, 30).forEach(v => {
    console.log(`  ${v.id} [${v.field}] "${v.term}": ${v.sentence}...`);
  });
  if (vagueness.length > 30) {
    console.log(`\n  ... and ${vagueness.length - 30} more`);
  }
} else {
  console.log('  ✓ No vague language detected');
}
console.log();

// ============================================================================
// 5. THIN CONTENT
// ============================================================================
console.log('5. THIN CONTENT DETECTION');
console.log('-'.repeat(80));

const thinContent = {
  shortText: [],
  why: [],
  how: [],
  expectedResult: [],
  fullExample: []
};

const thresholds = {
  shortText: 30,
  why: 40,
  how: 50,
  expectedResult: 30,
  fullExample: 80
};

observables.forEach(obs => {
  Object.keys(thresholds).forEach(field => {
    const text = obs[field] || '';
    if (text.length < thresholds[field]) {
      thinContent[field].push({
        id: obs.id,
        length: text.length,
        text: text.substring(0, 60)
      });
    }
  });
});

Object.keys(thinContent).forEach(field => {
  if (thinContent[field].length > 0) {
    console.log(`  ${field} (< ${thresholds[field]} chars): ${thinContent[field].length} instances`);
    thinContent[field].slice(0, 10).forEach(item => {
      console.log(`    ${item.id} (${item.length} chars): "${item.text}..."`);
    });
    if (thinContent[field].length > 10) {
      console.log(`    ... and ${thinContent[field].length - 10} more`);
    }
    console.log();
  }
});

// ============================================================================
// 6. PUNCTUATION ARTIFACTS
// ============================================================================
console.log('6. PUNCTUATION ARTIFACTS');
console.log('-'.repeat(80));

const punctuationIssues = [];

observables.forEach(obs => {
  ['shortText', 'why', 'how', 'expectedResult', 'fullExample'].forEach(field => {
    const text = obs[field] || '';

    if (/\.\./.test(text)) {
      punctuationIssues.push({ id: obs.id, field, issue: 'double period', text: text.substring(0, 80) });
    }
    if (/\w\.\w/.test(text) && !/\b(e\.g|i\.e|etc)\b/i.test(text)) {
      punctuationIssues.push({ id: obs.id, field, issue: 'missing space after period', text: text.substring(0, 80) });
    }
    if (/,\s*$/.test(text.trim())) {
      punctuationIssues.push({ id: obs.id, field, issue: 'trailing comma', text: text.substring(0, 80) });
    }
    if (/\s\s+/.test(text)) {
      punctuationIssues.push({ id: obs.id, field, issue: 'multiple spaces', text: text.substring(0, 80) });
    }
  });
});

if (punctuationIssues.length > 0) {
  console.log(`  Found ${punctuationIssues.length} punctuation issues:\n`);
  punctuationIssues.forEach(p => {
    console.log(`  ${p.id} [${p.field}] ${p.issue}: "${p.text}..."`);
  });
} else {
  console.log('  ✓ No punctuation artifacts detected');
}
console.log();

// ============================================================================
// 7. DUPLICATE DETECTION
// ============================================================================
console.log('7. SEMANTIC DUPLICATE DETECTION');
console.log('-'.repeat(80));

function normalize(text) {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function similarity(s1, s2) {
  const n1 = normalize(s1);
  const n2 = normalize(s2);

  if (n1 === n2) return 1.0;

  const words1 = new Set(n1.split(' '));
  const words2 = new Set(n2.split(' '));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

const duplicates = [];

for (let i = 0; i < observables.length; i++) {
  for (let j = i + 1; j < observables.length; j++) {
    const obs1 = observables[i];
    const obs2 = observables[j];

    const sim = similarity(obs1.shortText, obs2.shortText);

    if (sim > 0.7) {
      duplicates.push({
        id1: obs1.id,
        id2: obs2.id,
        similarity: sim,
        text1: obs1.shortText.substring(0, 60),
        text2: obs2.shortText.substring(0, 60)
      });
    }
  }
}

if (duplicates.length > 0) {
  console.log(`  Found ${duplicates.length} potential duplicates (>70% similar):\n`);
  duplicates.slice(0, 20).forEach(d => {
    console.log(`  ${d.id1} ↔ ${d.id2} (${(d.similarity * 100).toFixed(0)}% similar)`);
    console.log(`    "${d.text1}..."`);
    console.log(`    "${d.text2}..."`);
    console.log();
  });
  if (duplicates.length > 20) {
    console.log(`  ... and ${duplicates.length - 20} more`);
  }
} else {
  console.log('  ✓ No semantic duplicates detected');
}
console.log();

// ============================================================================
// 8. MECHANISM SPECIFICITY
// ============================================================================
console.log('8. MECHANISM SPECIFICITY IN "HOW" FIELD');
console.log('-'.repeat(80));

const mechanismKeywords = [
  'via', 'through', 'by', 'using', 'with', 'during', 'at',
  'every', 'weekly', 'monthly', 'quarterly', 'daily', 'sprint',
  'review', 'meeting', 'template', 'dashboard', 'metric', 'threshold',
  'format', 'structure', 'process', 'cadence', 'role', 'team',
  'system', 'tool', 'document', 'report', 'agenda', 'framework'
];

const vaguePhrases = [
  /^(improve|foster|ensure|drive|enhance|optimize|leverage|facilitate|strengthen|build|develop|create|establish)\s+\w+\s*(and|to|\.|$)/i,
  /without\s+(specific|concrete|clear|defined|measurable)/i
];

const vagueHows = [];

observables.forEach(obs => {
  const how = obs.how || '';
  const hasKeyword = mechanismKeywords.some(kw =>
    new RegExp(`\\b${kw}\\b`, 'i').test(how)
  );

  const hasNumber = /\d+/.test(how);
  const hasSpecificNoun = /\b(template|dashboard|metric|format|agenda|checklist|criteria|framework|model|standard)\b/i.test(how);

  const hasMechanism = hasKeyword || hasNumber || hasSpecificNoun;

  const isVaguePhrase = vaguePhrases.some(pattern => pattern.test(how));

  if (!hasMechanism || isVaguePhrase) {
    vagueHows.push({
      id: obs.id,
      how: how.substring(0, 120)
    });
  }
});

if (vagueHows.length > 0) {
  console.log(`  Found ${vagueHows.length} vague "how" fields lacking concrete mechanisms:\n`);
  vagueHows.slice(0, 25).forEach(v => {
    console.log(`  ${v.id}: "${v.how}..."`);
  });
  if (vagueHows.length > 25) {
    console.log(`\n  ... and ${vagueHows.length - 25} more`);
  }
} else {
  console.log('  ✓ All "how" fields contain concrete mechanisms');
}
console.log();

// ============================================================================
// SUMMARY STATISTICS
// ============================================================================
console.log('='.repeat(80));
console.log('SUMMARY STATISTICS');
console.log('='.repeat(80));
console.log(`Total observables: ${observables.length}`);
console.log(`Invalid IDs: ${invalidIds.length}`);
console.log(`Capabilities with gaps: ${gaps.length}`);
console.log(`Capabilities with weight deviation >0.05: ${Object.keys(weightSums).filter(k => Math.abs(weightSums[k] - 1.0) > 0.05).length}`);
console.log(`Vague language instances: ${vagueness.length}`);
console.log(`Thin content fields: ${Object.values(thinContent).flat().length}`);
console.log(`Punctuation artifacts: ${punctuationIssues.length}`);
console.log(`Potential duplicates: ${duplicates.length}`);
console.log(`Vague "how" fields: ${vagueHows.length}`);
console.log('='.repeat(80));

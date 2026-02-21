const data = require('../src/data/metrics.json');

console.log('=== METRICS ANALYSIS ===\n');

// 1. ID Pattern Check
console.log('1. ID PATTERN CHECK');
const idPattern = /^(\d+)\.(\d+)$|^(AI|I)-\d+$/;
const malformedIds = [];

data.forEach(item => {
  if (!idPattern.test(item.id)) {
    malformedIds.push(item.id);
  }
});

if (malformedIds.length > 0) {
  console.log(`✗ Found ${malformedIds.length} malformed IDs:`);
  malformedIds.forEach(id => console.log(`  ${id}`));
} else {
  console.log('✓ All metric IDs match pattern {N}.{M} or {AI|I}-{N}');
}

// 2. Counts Per Capability
console.log('\n2. METRICS PER CAPABILITY');
const capabilityMetrics = {};
const allCapabilities = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14'];

allCapabilities.forEach(cap => capabilityMetrics[cap] = []);

data.forEach(item => {
  const caps = item.capabilityIds || [];
  caps.forEach(cap => {
    if (!capabilityMetrics[cap]) capabilityMetrics[cap] = [];
    capabilityMetrics[cap].push(item.id);
  });
});

console.log('Distribution (metrics can map to multiple capabilities):');
allCapabilities.forEach(cap => {
  const count = capabilityMetrics[cap].length;
  const status = count >= 3 ? '✓' : '✗';
  console.log(`  ${status} ${cap}: ${count} metrics ${count < 3 ? '⚠ UNDER-INSTRUMENTED' : ''}`);
  if (count < 5) {
    console.log(`      ${capabilityMetrics[cap].join(', ')}`);
  }
});

// Summary
const distribution = Object.values(capabilityMetrics).map(m => m.length);
console.log(`\nStats: min=${Math.min(...distribution)}, max=${Math.max(...distribution)}, avg=${(distribution.reduce((a, b) => a + b, 0) / distribution.length).toFixed(1)}`);

// 3. Enum Values Check
console.log('\n3. ENUM VALUES CHECK');
const categories = new Set();
const tiers = new Set();
const types = new Set();

data.forEach(item => {
  if (item.category) categories.add(item.category);
  if (item.tier) tiers.add(item.tier);
  if (item.type) types.add(item.type);
});

console.log(`Categories: ${Array.from(categories).join(', ')}`);
console.log(`Tiers: ${Array.from(tiers).join(', ')}`);
console.log(`Types: ${Array.from(types).join(', ')}`);

// 4. Vague Language Check
console.log('\n4. VAGUE LANGUAGE IN MEASUREMENT GUIDANCE & WHAT GOOD LOOKS LIKE');
const vagueWords = [
  'good', 'better', 'best', 'strong', 'weak', 'effective', 'efficient',
  'quality', 'appropriate', 'adequate', 'reasonable', 'properly',
  'significant', 'substantial', 'considerable', 'various', 'several'
];

const vagueFindings = [];
data.forEach(item => {
  const fields = [
    { name: 'measurementGuidance', text: item.measurementGuidance || '' },
    { name: 'whatGoodLooksLike', text: item.whatGoodLooksLike || '' }
  ];

  fields.forEach(field => {
    vagueWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(field.text)) {
        const match = field.text.search(regex);
        vagueFindings.push({
          id: item.id,
          field: field.name,
          word,
          context: field.text.substring(Math.max(0, match - 30), match + word.length + 30)
        });
      }
    });
  });
});

console.log(`Found ${vagueFindings.length} instances of vague language:`);
vagueFindings.slice(0, 15).forEach(f => {
  console.log(`  ${f.id} [${f.field}]: "${f.word}" in "...${f.context}..."`);
});
if (vagueFindings.length > 15) {
  console.log(`  ... and ${vagueFindings.length - 15} more`);
}

// 5. Thin Content Check
console.log('\n5. THIN CONTENT CHECK');
const thinNames = [];
const thinGuidance = [];

data.forEach(item => {
  if (item.name && item.name.length < 15) {
    thinNames.push({ id: item.id, length: item.name.length, text: item.name });
  }
  // Note: measurementGuidance is often missing (many metrics don't have it)
  // so we'll check if it exists AND is thin
  if (item.measurementGuidance && item.measurementGuidance.length < 50 && item.measurementGuidance.length > 0) {
    thinGuidance.push({ id: item.id, length: item.measurementGuidance.length, text: item.measurementGuidance });
  }
});

if (thinNames.length > 0) {
  console.log(`Found ${thinNames.length} thin names (<15 chars):`);
  thinNames.forEach(t => {
    console.log(`  ${t.id}: ${t.length} chars - "${t.text}"`);
  });
} else {
  console.log('✓ No thin names found (all names ≥15 chars)');
}

if (thinGuidance.length > 0) {
  console.log(`\nFound ${thinGuidance.length} thin measurementGuidance entries (<50 chars):`);
  thinGuidance.forEach(t => {
    console.log(`  ${t.id}: ${t.length} chars - "${t.text}"`);
  });
} else {
  console.log('✓ No thin measurementGuidance found');
}

// Check how many metrics are missing measurementGuidance
const missingGuidance = data.filter(item => !item.measurementGuidance || item.measurementGuidance.trim().length === 0);
console.log(`\nℹ ${missingGuidance.length}/${data.length} metrics have no measurementGuidance field (this may be intentional)`);

// 6. Punctuation Artifacts
console.log('\n6. PUNCTUATION ARTIFACTS');
const punctuationIssues = [];
const checks = [
  { pattern: /\s\s+/, desc: 'double spaces' },
  { pattern: /\.\s*\./, desc: 'double periods' },
  { pattern: /\s+[,;.]/, desc: 'space before punctuation' }
];

data.forEach(item => {
  const fields = [
    { name: 'name', text: item.name || '' },
    { name: 'description', text: item.description || '' },
    { name: 'measurementGuidance', text: item.measurementGuidance || '' }
  ];

  fields.forEach(field => {
    checks.forEach(check => {
      if (check.pattern.test(field.text)) {
        punctuationIssues.push({
          id: item.id,
          field: field.name,
          issue: check.desc,
          sample: field.text.match(check.pattern)?.[0]
        });
      }
    });
  });
});

if (punctuationIssues.length > 0) {
  console.log(`Found ${punctuationIssues.length} punctuation issues:`);
  punctuationIssues.slice(0, 10).forEach(p => {
    console.log(`  ${p.id} [${p.field}]: ${p.issue} - "${p.sample}"`);
  });
  if (punctuationIssues.length > 10) {
    console.log(`  ... and ${punctuationIssues.length - 10} more`);
  }
} else {
  console.log('✓ No major punctuation artifacts found');
}

// 7. Under-Instrumented Capabilities Detail
console.log('\n7. UNDER-INSTRUMENTED CAPABILITIES DETAIL');
const underInstrumented = allCapabilities.filter(cap => capabilityMetrics[cap].length < 3);

if (underInstrumented.length > 0) {
  console.log(`⚠ ${underInstrumented.length} capabilities have <3 metrics:`);
  underInstrumented.forEach(cap => {
    console.log(`  ${cap}: ${capabilityMetrics[cap].length} metrics - ${capabilityMetrics[cap].join(', ')}`);
  });
} else {
  console.log('✓ All 14 capabilities have at least 3 metrics');
}

console.log('\n=== END METRICS ANALYSIS ===');

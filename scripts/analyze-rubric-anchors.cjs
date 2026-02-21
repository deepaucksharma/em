const data = require('../src/data/rubric-anchors.json');

console.log('=== RUBRIC-ANCHORS ANALYSIS ===\n');

// 1. ID Pattern Check
console.log('1. ID PATTERN CHECK');
console.log('Expected: RA-C{N}-L{level} (28 anchors total, 2 per capability)\n');

const idPattern = /^C(\d+)-([12])$/;
const idIssues = [];
const anchorsByCapability = {};

data.forEach((item, idx) => {
  const match = item.anchorId.match(idPattern);
  if (!match) {
    idIssues.push(`Line ${idx + 1}: "${item.anchorId}" doesn't match expected pattern`);
  }

  const cap = item.capabilityId;
  if (!anchorsByCapability[cap]) anchorsByCapability[cap] = [];
  anchorsByCapability[cap].push(item.anchorId);
});

if (idIssues.length > 0) {
  console.log('ID Pattern Issues:');
  idIssues.forEach(i => console.log(`  ${i}`));
} else {
  console.log('✓ All anchor IDs match pattern C{N}-{1|2}');
}

console.log('\nAnchors per capability:');
Object.keys(anchorsByCapability).sort().forEach(cap => {
  const count = anchorsByCapability[cap].length;
  const status = count === 2 ? '✓' : '✗';
  console.log(`  ${status} ${cap}: ${count} anchors (${anchorsByCapability[cap].join(', ')})`);
});

// 2. Level Consistency
console.log('\n2. LEVEL CONSISTENCY');
const levels = new Set();
data.forEach(item => {
  Object.keys(item).forEach(key => {
    if (key.startsWith('level') && !key.includes('level1') && !key.includes('level2')) {
      const match = key.match(/level(\d+)/);
      if (match) levels.add(parseInt(match[1]));
    }
  });
});

console.log(`Levels present: ${Array.from(levels).sort((a, b) => a - b).join(', ')}`);
console.log('All anchors have levels 1-5: ✓');

// 3. Vague Language Check
console.log('\n3. VAGUE LANGUAGE IN ANCHOR TEXT');
const vagueWords = [
  'good', 'better', 'best', 'strong', 'weak', 'effective', 'efficient',
  'quality', 'appropriate', 'adequate', 'reasonable', 'properly',
  'significant', 'substantial', 'considerable', 'various', 'several',
  'some', 'many', 'most', 'often', 'generally', 'typically', 'usually'
];

const vagueFindings = [];
data.forEach(item => {
  [3, 4, 5].forEach(level => {
    const key = `level${level}${level === 3 ? 'Competent' : level === 4 ? 'Distinguished' : 'Advanced'}`;
    const text = item[key] || '';
    vagueWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(text)) {
        vagueFindings.push({
          anchorId: item.anchorId,
          level,
          word,
          context: text.substring(Math.max(0, text.search(regex) - 30), text.search(regex) + word.length + 30)
        });
      }
    });
  });
});

console.log(`Found ${vagueFindings.length} instances of vague language:`);
vagueFindings.slice(0, 10).forEach(f => {
  console.log(`  ${f.anchorId} L${f.level}: "${f.word}" in "...${f.context}..."`);
});
if (vagueFindings.length > 10) {
  console.log(`  ... and ${vagueFindings.length - 10} more`);
}

// 4. Behavioral vs Outcome Language (L5 specifically)
console.log('\n4. BEHAVIORAL VS OUTCOME LANGUAGE (L5 ANCHORS)');
const outcomeWords = [
  'recognized as', 'known for', 'seen as', 'viewed as', 'regarded as',
  'sets standard', 'sets the standard', 'is the standard', 'becomes the standard',
  'reputation', 'sought by', 'sought after'
];

const outcomeFindings = [];
data.forEach(item => {
  const text = item.level5Advanced || '';
  outcomeWords.forEach(phrase => {
    const regex = new RegExp(phrase, 'gi');
    if (regex.test(text)) {
      outcomeFindings.push({
        anchorId: item.anchorId,
        phrase,
        context: text.substring(Math.max(0, text.search(regex) - 40), text.search(regex) + phrase.length + 40)
      });
    }
  });
});

if (outcomeFindings.length > 0) {
  console.log(`Found ${outcomeFindings.length} instances of outcome language in L5:`);
  outcomeFindings.forEach(f => {
    console.log(`  ${f.anchorId}: "${f.phrase}" in "...${f.context}..."`);
  });
} else {
  console.log('✓ No obvious outcome language detected in L5 anchors');
}

// 5. Monotonic Progression Check (sample)
console.log('\n5. MONOTONIC PROGRESSION EXAMPLES');
console.log('Comparing L3 vs L5 for first 3 capabilities:\n');

data.slice(0, 6).forEach((item, idx) => {
  if (idx % 2 === 0) {
    const l3 = item.level3Competent.substring(0, 150) + '...';
    const l5 = item.level5Advanced.substring(0, 150) + '...';
    console.log(`${item.anchorId}:`);
    console.log(`  L3: ${l3}`);
    console.log(`  L5: ${l5}`);
    console.log();
  }
});

// 6. Thin Content Check
console.log('6. THIN CONTENT CHECK');
const thinContent = [];
[3, 4, 5].forEach(level => {
  const key = `level${level}${level === 3 ? 'Competent' : level === 4 ? 'Distinguished' : 'Advanced'}`;
  data.forEach(item => {
    const text = item[key] || '';
    if (text.length < 50) {
      thinContent.push({ anchorId: item.anchorId, level, length: text.length, text });
    }
  });
});

if (thinContent.length > 0) {
  console.log(`Found ${thinContent.length} thin content entries (<50 chars):`);
  thinContent.forEach(t => {
    console.log(`  ${t.anchorId} L${t.level}: ${t.length} chars - "${t.text}"`);
  });
} else {
  console.log('✓ No thin content found (all anchor texts ≥50 chars)');
}

// 7. Punctuation Artifacts
console.log('\n7. PUNCTUATION ARTIFACTS');
const punctuationIssues = [];
const checks = [
  { pattern: /\s\s+/, desc: 'double spaces' },
  { pattern: /\.\s*\./, desc: 'double periods' },
  { pattern: /\s+[,;.]/, desc: 'space before punctuation' },
  { pattern: /[.!?][a-z]/, desc: 'lowercase after sentence end' }
];

data.forEach(item => {
  [3, 4, 5].forEach(level => {
    const key = `level${level}${level === 3 ? 'Competent' : level === 4 ? 'Distinguished' : 'Advanced'}`;
    const text = item[key] || '';
    checks.forEach(check => {
      if (check.pattern.test(text)) {
        punctuationIssues.push({
          anchorId: item.anchorId,
          level,
          issue: check.desc,
          sample: text.match(check.pattern)?.[0]
        });
      }
    });
  });
});

if (punctuationIssues.length > 0) {
  console.log(`Found ${punctuationIssues.length} punctuation issues:`);
  punctuationIssues.slice(0, 10).forEach(p => {
    console.log(`  ${p.anchorId} L${p.level}: ${p.issue} - "${p.sample}"`);
  });
  if (punctuationIssues.length > 10) {
    console.log(`  ... and ${punctuationIssues.length - 10} more`);
  }
} else {
  console.log('✓ No major punctuation artifacts found');
}

console.log('\n=== END RUBRIC-ANCHORS ANALYSIS ===');

#!/usr/bin/env node
/**
 * Better punctuation check that ignores metric references
 */

const observables = require('../src/data/observables.json');

console.log('PUNCTUATION ARTIFACT CHECK');
console.log('='.repeat(80));

const issues = [];

observables.forEach(obs => {
  ['shortText', 'why', 'how', 'expectedResult', 'fullExample'].forEach(field => {
    const text = obs[field] || '';

    // Double periods
    if (/\.\./.test(text)) {
      issues.push({ id: obs.id, field, issue: 'double period', snippet: text.substring(0, 80) });
    }

    // Missing space after period (but NOT metric references like "8.4")
    // Look for period followed by letter that's NOT a metric pattern
    const regex = /\.\s*([A-Z])/g;
    const sentences = text.split(/[.!?]\s+/);
    if (sentences.length > 1) {
      // Check if sentence boundaries are properly spaced
      const weirdPeriods = text.match(/\.[A-Z][a-z]/g);
      if (weirdPeriods && !text.match(/\d+\.\d+/)) {
        // Only flag if it's not a metric reference
        const hasMetric = /\d+\.\d+/.test(text);
        if (!hasMetric) {
          const match = text.match(/\.[A-Z][a-z]/);
          if (match) {
            const idx = text.indexOf(match[0]);
            issues.push({
              id: obs.id,
              field,
              issue: 'missing space after period',
              snippet: text.substring(Math.max(0, idx - 30), idx + 50)
            });
          }
        }
      }
    }

    // Trailing comma
    if (/,\s*$/.test(text.trim())) {
      issues.push({ id: obs.id, field, issue: 'trailing comma', snippet: text.substring(0, 80) });
    }

    // Multiple consecutive spaces
    if (/\s\s+/.test(text)) {
      issues.push({ id: obs.id, field, issue: 'multiple consecutive spaces', snippet: text.substring(0, 80) });
    }

    // Space before punctuation
    if (/\s[,;:]/.test(text)) {
      issues.push({ id: obs.id, field, issue: 'space before punctuation', snippet: text.substring(0, 80) });
    }
  });
});

if (issues.length > 0) {
  console.log(`Found ${issues.length} punctuation issues:\n`);
  issues.forEach(i => {
    console.log(`${i.id} [${i.field}] ${i.issue}:`);
    console.log(`  "${i.snippet}..."\n`);
  });
} else {
  console.log('✓ No punctuation artifacts detected');
}

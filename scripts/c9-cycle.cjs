#!/usr/bin/env node
/**
 * C9 (Metrics, Measurement & Outcomes) Deep Cycle
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
function readJSON(file) { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8')); }
function writeJSON(file, data) { fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8'); }

// ─── 1. CAPABILITIES ───
console.log('Processing capabilities.json...');
let caps = readJSON('capabilities.json');
let c9 = caps.find(c => c.id === 'C9');
c9.description = "Assessed by: DORA metric tracking, developer satisfaction measurement, OKR scoring discipline, business metric translation, and metric pairing against gaming. Absence causes: invisible delivery problems, unmeasured developer friction, vague OKRs that don't drive behavior, and engineering investment invisible to business leadership.";
c9.enabledBy = [];
writeJSON('capabilities.json', caps);
console.log('  ✓ C9 description rewritten');

// ─── 2. OBSERVABLES ───
console.log('Processing observables.json...');
let obs = readJSON('observables.json');
function updateObs(id, changes) {
  const o = obs.find(x => x.id === id); if (!o) return;
  Object.assign(o, changes); console.log(`  ✓ ${id}`);
}

updateObs('C9-O1', {
  why: "Without measurement, delivery problems are invisible and improvement is guesswork. DORA research proved that deployment frequency, lead time, change failure rate, and MTTR predict both engineering effectiveness and business outcomes — these are diagnostic instruments, not vanity metrics.",
  expectedResult: "Within 1 quarter: visibility into delivery cadence with weekly trend data; targeted friction removal based on stage-level decomposition; measurable improvement in at least one DORA metric."
});

updateObs('C9-O2', {
  why: "Satisfaction problems that go unmeasured become attrition problems that are expensive to fix. Developer satisfaction is a leading indicator of productivity — not a lagging feel-good metric. The SPACE framework established that satisfaction predicts both retention and output quality.",
  expectedResult: "Within 2 quarters: early warning on retention risk with 1-2 quarter lead time; targeted DX investment with measurable satisfaction improvement; developer satisfaction scores trending above 4.0/5.0."
});

updateObs('C9-O3', {
  why: "Activity metrics used as performance measures incentivize gaming and destroy trust. The purpose of measurement is to identify systemic blockers, not to rank individual engineers by commit count or lines of code.",
  expectedResult: "Within 1 quarter: blocked teams identified early; no surveillance culture; developer survey confirms metrics are seen as diagnostic tools, not punishment; zero complaints about metrics being used punitively."
});

updateObs('C9-O4', {
  why: "Vague OKRs don't drive behavior; too many OKRs mean none get focus. OKRs scored quarterly with brutal honesty — a team hitting 100% wasn't stretching enough; a team that can't articulate their top 3 objectives has a prioritization problem.",
  expectedResult: "Within 1 quarter: team focused on outcomes not output; progress measurable weekly; OKRs influence daily prioritization decisions; scoring average between 0.6-0.8 indicating appropriate stretch."
});

updateObs('C9-O5', {
  why: "Engineering work described only in technical terms is invisible to business leadership. Framing a latency improvement as a conversion lift is the difference between 'nice to have' and 'funded priority.'",
  expectedResult: "Within 2 quarters: leadership approves >80% of engineering investment proposals because they include clear ROI; engineering is invited to business planning conversations."
});

updateObs('C9-O6', {
  why: "Without classification, all attrition looks the same and systemic issues stay hidden. Distinguishing regrettable from non-regrettable attrition and tracking root causes separates random departures from patterns requiring intervention.",
  expectedResult: "Within 2 quarters: systemic retention issues identified with data; regrettable attrition below industry benchmark; exit interview themes addressed proactively."
});

updateObs('C9-O7', {
  why: "Feature flags without lifecycle management become permanent technical debt. Forgotten flags create exponential complexity — 10 flags means 1024 possible code paths that nobody tests. Stale flags slow down every engineer who touches that code.",
  expectedResult: "Within 1 quarter: active flag count stays manageable (target: <20 active flags per service); no production incidents from forgotten flags; experimentation velocity maintained without accumulating flag debt."
});

updateObs('C9-O8', {
  why: "Bad A/B testing is worse than no testing — it gives false confidence. Underpowered tests, peeking at results, and cherry-picked metrics lead to shipping features that don't actually work."
});

updateObs('C9-O9', {
  why: "Single metrics are gameable and misleading — metric pairs create natural guardrails that prevent optimizing one dimension at the cost of another. Every speed metric needs a quality counterweight.",
  expectedResult: "Within 1 quarter: no gaming of individual metrics; balanced delivery; quality doesn't degrade when speed improves; leadership gets accurate picture of team health."
});

updateObs('C9-O10', {
  why: "Teams that jump to complex metrics frameworks before building basic measurement discipline end up with death-by-metrics. Starting simple and evolving based on decisions driven ensures metrics remain useful, not burdensome.",
  expectedResult: "Within 2 quarters: every active metric has informed at least one decision within 90 days; team engaged with measurement rather than resenting it; metric overhead proportional to value delivered."
});

writeJSON('observables.json', obs);

// ─── 3. CALIBRATION SIGNALS ───
console.log('Processing calibration-signals.json...');
let sigs = readJSON('calibration-signals.json');
function updateSig(id, changes) {
  const s = sigs.find(x => x.id === id); if (!s) return;
  Object.assign(s, changes); console.log(`  ✓ ${id}`);
}

updateSig('SIG-012', {
  signalText: "DORA elite benchmark: on-demand deployment frequency, <1 hour lead time, <5% change failure rate, <1 hour MTTR. Evidence: EM can state their team's current numbers and trend direction for all four metrics."
});

updateSig('SIG-014', {
  signalText: "High change failure rate despite fast deploys = shipping garbage fast. Low CFR + low frequency = over-cautious. EMs own this balance. Elite benchmark: <5% change failure rate. Evidence: CFR tracked weekly with root cause analysis for each failure."
});

updateSig('SIG-015', {
  signalText: "Promo packet: 'Reduced MTTR from 4hrs to 20min through [automated rollback / improved observability / incident response training]'. Elite benchmark: <1 hour MTTR for user-facing services."
});

updateSig('SIG-016', {
  signalText: "Directors track satisfaction trends across teams; EMs act on individual signals. Evidence: attrition spike after ignoring survey results is a leadership failure. Threshold: developer satisfaction >4.0/5.0; action plan for any score below 3.5."
});

updateSig('SIG-053', {
  signalText: "Directors own org-level attrition analysis. 'Identified [pattern] driving regrettable attrition, addressed through [action], reduced rate from X% to Y%'. Evidence: attrition classified by regrettable/non-regrettable with root cause tracking."
});

updateSig('SIG-105', {
  signalText: "Highest-leverage framing skill: 'Reduced p99 latency 40%, driving estimated 2% conversion lift worth $Xm ARR'. Evidence: engineering metrics translated to business metrics in investment proposals."
});

// SIG-018 — "NEVER use as perf eval" is advisory, not a signal. Rewrite as observable behavior.
updateSig('SIG-018', {
  signalText: "Activity metrics (commit counts, lines of code, PR volume) used exclusively as team-level diagnostic signals, never in individual performance evaluations. Evidence: performance review rubric contains no activity metric references; team survey confirms metrics are not perceived as surveillance."
});

writeJSON('calibration-signals.json', sigs);

// ─── 4. RUBRIC ANCHORS ───
console.log('Processing rubric-anchors.json...');
let anchors = readJSON('rubric-anchors.json');
function updateAnchor(id, changes) {
  const a = anchors.find(x => x.anchorId === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAnchor('C9-1', {
  level1Developing: "Scope: Individual. Key Behavior: No metrics tracked; delivery health is anecdotal; dashboards don't exist or are never consulted. Artifact: None. Distinguishing Test: Cannot state team's deployment frequency or lead time.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Basic DORA metrics tracked; dashboards exist but checked infrequently; metrics used to report status, not drive decisions. Artifact: Basic delivery dashboard. Distinguishing Test: Can state DORA numbers but cannot name a decision driven by metric data in the last quarter.",
  level3Competent: "Scope: Team (systematic). Key Behavior: DORA metrics tracked weekly with trend analysis; developer satisfaction measured quarterly; metric pairings prevent single-metric gaming; feature flag lifecycle governed. Artifact: Delivery dashboard with trend data; developer satisfaction survey; metric pair documentation. Distinguishing Test: Every active metric has informed a decision within 90 days; no surveillance culture complaints.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Metric frameworks adapted to team maturity; metrics benchmarked across teams; insights shared to improve adjacent teams; metric sophistication evolves based on decisions driven. Artifact: Cross-team metric benchmarks; maturity-appropriate metric recommendations for each team. Distinguishing Test: Teams at different maturity levels have appropriately different metric sets; no death-by-metrics.",
  level5Advanced: "Scope: Org. Key Behavior: Metrics culture established org-wide; measurement frameworks (DORA, SPACE) applied appropriately; engineering metrics integrated with business metrics. Artifact: Org-wide metrics framework with documented decision impact. Distinguishing Test: Business leadership references engineering metrics in planning; engineering metrics drive budget allocation."
});

updateAnchor('C9-2', {
  level1Developing: "Scope: Individual. Key Behavior: OKRs vague or absent; engineering outcomes not translated to business terms; attrition not classified. Artifact: None. Distinguishing Test: Cannot state team's OKRs or explain how engineering work connects to business outcomes.",
  level2Emerging: "Scope: Team (emerging). Key Behavior: OKRs defined but not scored quarterly; some engineering outcomes translated to business terms; attrition tracked but not classified. Artifact: OKR document (not actively scored). Distinguishing Test: OKRs exist on paper but team cannot describe how they influenced a prioritization decision.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Outcome-oriented OKRs scored quarterly with 0.6-0.8 average; engineering outcomes translated to business metrics; attrition classified and patterns addressed; A/B testing with statistical rigor. Artifact: Scored OKRs with quarterly review; business metric translation in investment proposals; attrition classification. Distinguishing Test: >80% of engineering investment proposals include business ROI; regrettable attrition below benchmark.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: OKR quality improved through coaching; business metric translation is standard across teams; experimentation infrastructure supports multiple teams. Artifact: OKR quality rubric; cross-team experimentation platform. Distinguishing Test: Engineering leaders invited to business planning conversations based on metric credibility.",
  level5Advanced: "Scope: Org. Key Behavior: Data-driven decision culture established; engineering metrics integrated into business strategy; experimentation at scale with organizational learning. Artifact: Org-wide experimentation platform; engineering-business metric integration. Distinguishing Test: Engineering investment decisions driven by data at board level; experimentation velocity is a competitive advantage."
});

writeJSON('rubric-anchors.json', anchors);

// ─── 5. ANTI-PATTERNS ───
console.log('Processing anti-patterns.json...');
let aps = readJSON('anti-patterns.json');
function updateAP(id, changes) {
  const a = aps.find(x => x.id === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAP('AP-03', {
  shortDesc: "Dashboards exist but nobody uses them for decisions. Metrics are collected for reporting, not for diagnosis. The team can't name a single decision that was changed by metric data.",
  impact: "Within 1-2 quarters: metrics become overhead that produces no value; team resents measurement as busywork; delivery problems stay invisible; leadership distrusts engineering's self-reporting.",
  recoveryActions: [
    "Audit every dashboard: for each metric, name the last decision it informed. Delete metrics with no decision in 90 days.",
    "Start with 3 DORA metrics and one developer satisfaction measure — nothing else until these drive decisions.",
    "Review metrics weekly in team standup: 'What does this data tell us? What should we do differently?'",
    "Track 'decisions driven by data' as a meta-metric for the first 2 quarters."
  ]
});

updateAP('AP-29', {
  shortDesc: "EM introduces 20+ metrics, dashboards, and reports. Team spends more time measuring than delivering. Engineers game metrics or ignore them entirely because the volume is overwhelming.",
  impact: "Within 1 quarter: team resents measurement overhead; engineers optimize for metric gaming rather than actual outcomes; signal lost in noise; trust in metrics collapses.",
  recoveryActions: [
    "Cut to 5 metrics maximum. For each, it must answer: 'What decision does this inform?'",
    "Use metric pairings (speed + quality) to prevent gaming — never measure one dimension alone.",
    "Start simple and evolve: 3 DORA metrics for 2 quarters before adding anything else.",
    "Remove any metric that hasn't informed a decision in 90 days."
  ]
});

updateAP('AP-48', {
  shortDesc: "Dashboard shows only lagging indicators (incident count, velocity, release date) with no leading indicators. Problems are visible only after they've already caused damage.",
  impact: "Within 2 quarters: team can only react to problems, never prevent them; leadership loses trust because bad news always arrives late; no early warning system for delivery or quality risks.",
  recoveryActions: [
    "Add at least one leading indicator per lagging indicator: pair incident rate with error budget burn rate; pair velocity with WIP count.",
    "Review leading indicators weekly, lagging indicators monthly.",
    "Define action thresholds for leading indicators: 'When WIP exceeds 3x team size, we stop starting and start finishing.'",
    "Track whether leading indicators predicted lagging outcomes — calibrate thresholds quarterly."
  ]
});

updateAP('AP-64', {
  shortDesc: "A metric becomes a target, then gets gamed. Deployment frequency is optimized by splitting PRs into tiny changes; cycle time is optimized by skipping reviews. The metric improves but actual outcomes don't.",
  impact: "Within 1-2 quarters: metric looks great but real outcomes deteriorate; team loses trust in measurement; leadership makes bad decisions based on gamed numbers; gaming becomes cultural norm.",
  recoveryActions: [
    "Always pair metrics: deployment frequency with change failure rate; cycle time with escaped defect rate; velocity with customer satisfaction.",
    "Look for metric-outcome divergence: if the metric improves but the experience doesn't, the metric is being gamed.",
    "Make gaming visible by tracking paired metrics on the same dashboard — divergence is the signal.",
    "Rotate metrics quarterly to prevent optimization lock-in."
  ]
});

updateAP('AP-75', {
  shortDesc: "OKRs are aspirational statements with no measurable key results. 'Improve developer experience' without defining what improvement looks like or how to measure it. Team can't tell if they succeeded.",
  impact: "Within 1 quarter: OKRs don't influence daily work; prioritization decisions are disconnected from stated objectives; quarterly reviews are opinion-based because there's no measurement.",
  recoveryActions: [
    "Rewrite every key result to include a number: 'Reduce CI build time from 45min to 10min' not 'Improve CI performance.'",
    "Limit to 3 objectives with 3 key results each — if you can't prioritize, you have too many.",
    "Score OKRs quarterly with brutal honesty: 0.6-0.8 is healthy; 1.0 means you didn't stretch; below 0.4 means the OKR was wrong.",
    "Test each OKR: 'Would we make different daily decisions if this OKR didn't exist?' If no, rewrite it."
  ]
});

writeJSON('anti-patterns.json', aps);

// ─── 6. PLAYBOOKS ───
console.log('Processing playbooks.json...');
let playbooks = readJSON('playbooks.json');
function updatePlaybook(id, changes) {
  const p = playbooks.find(x => x.id === id); if (!p) return;
  Object.assign(p, changes); console.log(`  ✓ ${id}`);
}

updatePlaybook('P-C9-1', {
  whatGoodLooksLike: "Within 1 week: stage-level decomposition of delivery pipeline completed. Within 2 weeks: specific bottleneck identified with data. Within 1 month: targeted intervention showing measurable improvement. Outcome: DORA metrics improving and team understands why. Measured by: stage-by-stage lead time, deployment frequency trend, team perception alignment with data."
});

updatePlaybook('P-C9-2', {
  whatGoodLooksLike: "Within 1 week: existing measurement state assessed. Within 2 weeks: 3-5 metrics proposed with clear decision linkage. Within 1 month: first metrics review conducted with leadership. Outcome: leadership gets useful data without weaponizing metrics against engineers. Measured by: leadership satisfaction with visibility, zero complaints about surveillance, decisions driven by data."
});

updatePlaybook('P-C9-3', {
  whatGoodLooksLike: "Within 1 week: gaming behavior identified with evidence. Within 2 weeks: metric pairs introduced to prevent single-metric optimization. Within 1 month: team re-engaged with metrics as diagnostic tools. Outcome: metrics reflect reality; gaming stops because paired metrics make it self-defeating. Measured by: metric-outcome alignment, team trust in metrics (survey)."
});

updatePlaybook('P-C9-5', {
  whatGoodLooksLike: "Within 2 weeks: 3 baseline metrics chosen (cycle time, deployment frequency, escaped defects). Within 1 month: first data available and reviewed in team standup. Within 1 quarter: team makes at least one decision based on metric data. Outcome: team develops measurement habit without resentment. Measured by: decisions driven by data, team engagement with metrics."
});

updatePlaybook('P-C9-6', {
  whatGoodLooksLike: "Within 2 weeks: draft OKRs with measurable key results. Within 1 month: OKRs finalized and influencing sprint planning. At quarter end: OKRs scored honestly with 0.6-0.8 average. Outcome: OKRs drive daily prioritization; team can explain how their current work connects to an objective. Measured by: OKR score, team ability to state connection between daily work and objectives."
});

writeJSON('playbooks.json', playbooks);

// ─── 7. INTERVIEW QUESTIONS ───
console.log('Processing interview-questions.json...');
let iqs = readJSON('interview-questions.json');
function updateIQ(id, changes) {
  const q = iqs.find(x => x.id === id); if (!q) return;
  Object.assign(q, changes); console.log(`  ✓ ${id}`);
}

updateIQ('IQ-33', {
  lookFor: [
    "Tracks specific DORA metrics — can name their team's current deployment frequency, lead time, CFR, and MTTR",
    "Uses metrics to drive decisions, not just report status — gives a specific example of a decision changed by data",
    "Understands metric limitations — acknowledges what their metrics don't capture",
    "Pairs metrics to prevent gaming — can explain their counterbalance strategy"
  ],
  redFlags: [
    "Cannot name their team's current DORA numbers",
    "Tracks metrics but cannot cite a decision that changed based on metric data",
    "Uses activity metrics (commit count, lines of code) for individual evaluation",
    "Has 15+ metrics with no clear decision linkage for most"
  ]
});

updateIQ('IQ-34', {
  lookFor: [
    "Frames engineering outcomes in business terms — gives a specific example of metric translation",
    "Connects technical improvements to customer-visible or revenue-impacting outcomes",
    "Differentiates between leading and lagging indicators",
    "Uses data to win engineering investment, not just report progress"
  ],
  redFlags: [
    "Describes engineering work only in technical terms",
    "Cannot explain how their metrics connect to business outcomes",
    "Uses metrics only for internal team consumption, not for stakeholder communication",
    "No leading indicators — only reports lagging outcomes"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT ───
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c9sa = sa.find(s => s.capabilityId === 'C9');
if (c9sa) {
  c9sa.behavioralAnchors[0].description = "No delivery metrics tracked; team health is anecdotal; cannot state deployment frequency, lead time, or change failure rate";
  c9sa.behavioralAnchors[1].description = "Basic metrics exist but are checked infrequently; dashboards built but not used for decisions; metrics used to report status upward, not to diagnose problems";
  console.log('  ✓ C9 self-assessment L1-L2 sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT GUIDANCE ───
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c9mg = mg.find(m => m.capabilityId === 'C9');
if (c9mg) {
  c9mg.leadingIndicators = c9mg.leadingIndicators.map(i =>
    i.replace(/\s*(?:Google['']s?|Amazon['']s?|Netflix['']s?|at Google|at Amazon|Spotify['']s?)[^.;]*[.;]/g, '').trim()
  ).filter(i => i.length > 0);
  c9mg.laggingIndicators = c9mg.laggingIndicators.map(i =>
    i.replace(/\s*(?:Google['']s?|Amazon['']s?|Netflix['']s?|at Google|at Amazon|Spotify['']s?)[^.;]*[.;]/g, '').trim()
  ).filter(i => i.length > 0);
  console.log('  ✓ C9 measurement guidance cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING PATHWAYS ───
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c9lp = lp.find(l => l.capabilityId === 'C9');
if (c9lp) {
  if (c9lp.foundational[0]) c9lp.foundational[0].description = "DORA research: the four key metrics that predict engineering and business performance. Essential for understanding what to measure and why.";
  if (c9lp.foundational[1]) c9lp.foundational[1].description = "OKR methodology: setting outcome-oriented objectives with measurable key results. Practical scoring and calibration.";
  if (c9lp.foundational[2]) c9lp.foundational[2].description = "Developer productivity measurement: the SPACE framework (Satisfaction, Performance, Activity, Communication, Efficiency) for multi-dimensional productivity assessment.";
  if (c9lp.foundational[3]) c9lp.foundational[3].description = "Analytics fundamentals for engineering leaders: A/B testing, statistical significance, and data-driven decision making.";
  console.log('  ✓ C9 learning pathways cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C9 deep cycle complete.');

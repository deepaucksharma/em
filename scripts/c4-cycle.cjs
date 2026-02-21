#!/usr/bin/env node
/**
 * C4 (Operational Leadership & Rhythm) Deep Cycle
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
function readJSON(file) { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8')); }
function writeJSON(file, data) { fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8'); }

// ─── 1. CAPABILITIES.JSON ───
console.log('Processing capabilities.json...');
let caps = readJSON('capabilities.json');
let c4cap = caps.find(c => c.id === 'C4');
c4cap.description = "Assessed by: sprint commitment accuracy, delivery cadence consistency, toil reduction metrics, and developer focus time. Absence causes: unpredictable delivery, eroded stakeholder trust, meeting overhead displacing deep work, and compounding operational toil.";
c4cap.enabledBy = ["C9"];
writeJSON('capabilities.json', caps);
console.log('  ✓ C4 description rewritten');

// ─── 2. OBSERVABLES.JSON ───
console.log('Processing observables.json...');
let obs = readJSON('observables.json');
function updateObs(id, changes) {
  const o = obs.find(x => x.id === id);
  if (!o) { console.error(`  ✗ ${id} not found`); return; }
  Object.assign(o, changes);
  console.log(`  ✓ ${id} updated`);
}

updateObs('C4-O1', {
  why: "Without clear cadences, teams drift between meetings that produce nothing and chaos with no alignment. A consistent operating rhythm with defined inputs and outputs creates organizational muscle memory — the cadence itself is the management mechanism.",
  how: "Define each meeting's purpose, required inputs, expected outputs, and cadence. Eliminate purposeless meetings ruthlessly. Structure: weekly metrics review (what happened), monthly operational review (what's broken), quarterly planning (where we're going). Validate with metric 2.5 (Sprint Commitment Accuracy) and 2.1 (Flow Time).",
  expectedResult: "Within 1 month: predictable rhythm; every meeting produces decisions or action items; new hires understand the operating system within their first week; zero meetings without a stated purpose."
});

updateObs('C4-O2', {
  why: "Without measurement, delivery is unpredictable and stakeholder trust erodes. DORA research proved that deployment frequency, lead time, change failure rate, and mean time to recovery predict both engineering performance and business outcomes.",
  how: "Track commitment accuracy, velocity trend, carryover rate (<10%); augment with DORA metrics (deployment frequency, lead time to change, change failure rate, MTTR). Use velocity for planning calibration, never for individual evaluation. Validate with metric 2.1 (Flow Time) and 2.3 (Cycle Time).",
  expectedResult: "Within 2 quarters: >85% commitment hit rate sustained for 3+ consecutive cycles; sustainable pace; early warning when delivery drifts; DORA metrics trending in healthy direction."
});

updateObs('C4-O3', {
  why: "Slow builds, flaky tests, and broken dev environments silently drain engineering capacity. Teams that ignore developer experience lose their best engineers to teams that don't. Developer wait time is a first-class cost metric.",
  how: "Instrument CI/CD pipeline stages, set targets for each stage (build <5min, test <10min, deploy <15min), dedicate 10-15% capacity for DX improvements quarterly, measure developer satisfaction and time-to-first-commit for new hires. Validate with metric 1.2 (Lead Time for Changes) and 5.4 (Code Review Turnaround Time)."
});

updateObs('C4-O4', {
  why: "Toil accumulates invisibly and drains capacity from value-creating work. When toil exceeds 50% of operational time, the team must stop feature work and automate. Unchecked toil compounds: 10 minutes/day becomes a full engineer-month per year.",
  how: "Run a 1-week toil audit: every team member logs repetitive manual work with time spent, frequency, and people affected. Calculate annualized cost (hours × frequency × team members × loaded cost). Stack-rank by impact and automate the top 3 items. Track hours reclaimed monthly — target: recover at least 10% of team capacity in the first quarter. Validate with metric 5.2 (Developer Toil Hours)."
});

updateObs('C4-O5', {
  why: "One-size-fits-all release process is either too slow for low-risk changes or too risky for high-risk ones. Risk-tiered deployments — configuration changes in minutes, feature changes through canary, infrastructure changes through staged rollout with automatic rollback — optimize both speed and safety."
});

updateObs('C4-O6', {
  why: "Slow reviews block flow and create single-reviewer bottlenecks that are a bus factor risk. Teams with >24-hour review turnaround see PR abandonment rates climb and developer satisfaction drop measurably.",
  how: "Set a code-review SLA of <24 hours median turnaround, tracked weekly via PR analytics. Implement reviewer rotation to spread knowledge — no single reviewer handling >30% of PRs. Surface review bottleneck trends in sprint retrospectives and adjust rotation accordingly. Target: every PR reviewed by at least one non-author within 8 business hours; bus-factor >=2 for every critical service. Validate with metric 5.4 (Code Review Turnaround Time) and 2.3 (Cycle Time)."
});

updateObs('C4-O7', {
  why: "Unmanaged interrupts fragment focus; scope creep erodes trust in commitments. Deep work requires 4+ hour uninterrupted blocks, and the operating model must structurally protect that constraint."
});

updateObs('C4-O8', {
  why: "Retros without follow-through teach teams that feedback doesn't matter. Teams that close 80%+ of retro action items see 2x fewer repeated failures in subsequent quarters.",
  expectedResult: "Within 1 quarter: >80% retro action item completion rate; specific process improvements implemented each cycle; team reports feeling agency over their working environment."
});

updateObs('C4-O12', {
  why: "Velocity problems rarely have a single cause — systemic analysis prevents whack-a-mole process changes that shift bottlenecks instead of resolving them. Teams who measure their flow end-to-end and target the actual constraint improve 2-3x faster than teams who guess."
});

updateObs('C4-O13', {
  why: "Context-switching is the biggest hidden tax on engineering productivity — a 30-minute meeting in the middle of a focus block costs 2+ hours of deep work productivity. Protecting maker schedules is a leadership responsibility, not an individual one.",
  how: "Audit team calendars monthly for focus block availability; establish meeting-free mornings (or equivalent 4-hour protected windows). Consolidate ceremonies into 2 days per week; default to async for status updates using Slack/Loom/recorded standups. Track focus time as a team health metric in quarterly pulse surveys — target >=4 hours of uninterrupted focus time daily, with >80% of engineers reporting satisfaction with focus time. Validate with metric 5.1 (Developer Satisfaction Score) and 2.4 (Throughput)."
});

// Fix embedded calibration signal ID mismatches
for (const o of obs.filter(x => x.capabilityId === 'C4')) {
  if (!o.calibrationSignals) continue;
  for (const sig of o.calibrationSignals) {
    const idMap = { 'SIG-175': 'SIG-172', 'SIG-235': 'SIG-217', 'SIG-236': 'SIG-218' };
    if (idMap[sig.id]) {
      console.log(`  ✓ Fixed embedded signal ${sig.id} → ${idMap[sig.id]}`);
      sig.id = idMap[sig.id];
    }
  }
}

writeJSON('observables.json', obs);

// ─── 3. CALIBRATION-SIGNALS.JSON ───
console.log('Processing calibration-signals.json...');
let sigs = readJSON('calibration-signals.json');
function updateSig(id, changes) {
  const s = sigs.find(x => x.id === id);
  if (!s) { console.error(`  ✗ Signal ${id} not found`); return; }
  Object.assign(s, changes);
  console.log(`  ✓ ${id} updated`);
}

updateSig('SIG-017', {
  signalText: "Concrete impact: 'Reduced CI pipeline from 45min to 8min, reclaiming [X] developer-hours/week across team'. Benchmark: CI build target <10 minutes; full test suite <15 minutes."
});

updateSig('SIG-019', {
  signalText: "Leverage-thinking: 'Automated [X], saving [Y] eng-hours/quarter, equivalent to [Z] FTE capacity reclaimed'. Threshold: team spends no more than 50% of time on operational toil — exceeding this triggers formal automation investment."
});

// SIG-020 FAILS charismatic test — "EMs own release culture" is a role description, not observable behavior
updateSig('SIG-020', {
  signalText: "Release process documented with risk tiers, automated rollback triggers, and feature flag discipline. Evidence: deploy frequency >1x/day for low-risk changes; rollback time <5 minutes; zero manual deploy gates for automated-pass changes."
});

// SIG-022 FAILS — "should articulate testing philosophy" is vocabulary test
updateSig('SIG-022', {
  signalText: "Testing strategy documented and measurable: 'Team runs [X] integration tests covering [Y]% of critical paths; flaky test rate <[Z]%; test suite execution time <[target]'. Evidence: test coverage dashboard and flaky test tracking system."
});

updateSig('SIG-021', {
  signalText: "Healthy review culture is a team health indicator. 'Implemented review SLA, reduced review bottleneck from 3 days to <8 hours'. Target: <24 hour code review turnaround; same-day for small changes; time-to-first-review tracked as team health metric."
});

updateSig('SIG-023', {
  signalText: "Execution credibility: 'Team delivers 85%+ of committed scope for 3+ consecutive quarters'. Evidence: commit-vs-deliver ratio tracked and visible to stakeholders."
});

updateSig('SIG-027', {
  signalText: "Operational maturity that scales beyond individual heroics. 'Every page has a runbook; new on-call engineers effective within first rotation'. Standard: every production service has runbooks covering top-10 alert scenarios; runbooks tested by a new team member before launch approval."
});

updateSig('SIG-046', {
  signalText: "Capacity model accounts for interrupts, on-call, PTO, and tech debt allocation. 'Capacity model predicted [X] velocity, team delivered within 10% for 4 consecutive sprints'. Standard: reserves 20-30% for operational work explicitly."
});

writeJSON('calibration-signals.json', sigs);

// ─── 4. RUBRIC-ANCHORS.JSON ───
console.log('Processing rubric-anchors.json...');
let anchors = readJSON('rubric-anchors.json');
function updateAnchor(id, changes) {
  const a = anchors.find(x => x.anchorId === id);
  if (!a) { console.error(`  ✗ Anchor ${id} not found`); return; }
  Object.assign(a, changes);
  console.log(`  ✓ ${id} updated`);
}

updateAnchor('C4-1', {
  level1Developing: "Scope: Individual. Key Behavior: Follows existing processes without evaluating their effectiveness; interrupts handled reactively. Artifact: None — no documented cadence or operating norms. Distinguishing Test: Cannot describe the purpose of team ceremonies or how information flows.",
  level2Emerging: "Scope: Team (emerging). Key Behavior: Establishing regular operating cadence; sprint predictability improving; interrupt management attempted but inconsistent. Artifact: Basic meeting schedule with stated purposes. Distinguishing Test: Can articulate why each ceremony exists but retro action items still incomplete >50% of the time.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Clear operating cadence with defined outputs; interrupt rotation implemented; retro action items tracked to >80% completion; engineers have 4+ hours of daily focus time. Artifact: Team operating manual; velocity bottleneck analysis using value stream mapping. Distinguishing Test: New hire understands the operating system within first week; focus time is structurally protected by calendar policy.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Operating cadence requires minimal intervention — team self-corrects when rituals drift; toil eliminated through quarterly reviews with measurable time reclaimed; process improvements shared with adjacent teams. Artifact: Documented process improvements with before/after metrics; async contribution rates measured. Distinguishing Test: Team operates effectively when EM is out for 2+ weeks; remote/hybrid participation is equitable by measured contribution.",
  level5Advanced: "Scope: Org. Key Behavior: Operating rhythm is the org standard; teams self-manage within cadence; systemic velocity analysis and focus time protection are organizational norms. Artifact: Org-wide operating framework adopted by multiple teams with measured outcomes. Distinguishing Test: Other EMs adopt this operating model; remote/hybrid practices produce equal engagement measured across locations."
});

updateAnchor('C4-2', {
  level1Developing: "Scope: Individual. Key Behavior: Sprint velocity inconsistent; scope creep common; commitments aspirational not evidence-based; delivery risks surface at deadline. Artifact: None — no delivery tracking or capacity model. Distinguishing Test: Cannot state team's commitment accuracy rate or identify the top delivery bottleneck.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Beginning to track delivery metrics; risks identified mid-sprint but mitigation is reactive; starting to use data for capacity planning. Artifact: Basic delivery dashboard; some historical velocity data. Distinguishing Test: Can state last sprint's commitment accuracy but mitigation plans are after-the-fact.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Meeting 85%+ of committed scope for 3+ consecutive quarters; capacity model accounts for interrupts, on-call, and PTO; risks flagged early with mitigation plans. Artifact: Capacity model with interrupt/PTO buffers; delivery dashboard with trend data; documented scope negotiation with stakeholders. Distinguishing Test: Stakeholders trust delivery estimates; scope trade-offs are negotiated proactively, not at deadline.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Delivery predictability maintained through team transitions and scope changes; capacity model refined using actuals-vs-plan variance; teams self-manage scope trade-offs. Artifact: Variance analysis history; delivery practices documented for adoption. Distinguishing Test: Predictability sustained above 85% during organizational disruption; adjacent teams adopt delivery practices.",
  level5Advanced: "Scope: Org. Key Behavior: Delivery practices are the org standard; predictability maintained through organizational change; cross-team delivery coordination is seamless. Artifact: Org-wide delivery framework with measured adoption and outcomes. Distinguishing Test: Elite-level DORA metrics maintained alongside high predictability — velocity and reliability are complementary, not competing."
});

writeJSON('rubric-anchors.json', anchors);

// ─── 5. ANTI-PATTERNS.JSON ───
console.log('Processing anti-patterns.json...');
let aps = readJSON('anti-patterns.json');
function updateAP(id, changes) {
  const a = aps.find(x => x.id === id);
  if (!a) { console.error(`  ✗ ${id} not found`); return; }
  Object.assign(a, changes);
  console.log(`  ✓ ${id} updated`);
}

updateAP('AP-31', {
  shortDesc: "Team drowns in ceremonies and rituals nobody can justify. Engineers get less than two hours of uninterrupted focus time per day; real work happens only after hours.",
  impact: "Within 1-2 quarters: deep work becomes impossible; complex problems don't get solved; engineers burned out from context-switching; senior engineers leave for teams that protect focus time.",
  recoveryActions: [
    "Calendar audit: have every team member count hours of uninterrupted 2+ hour blocks per week. Target minimum 4 hours of focus time per day.",
    "For every ceremony, ask: 'What problem does this solve for our team?' If no one can answer, cancel it.",
    "Cancel bottom 30% of recurring meetings immediately and monitor whether anyone notices.",
    "Adapt remaining ceremonies to actual needs — async standups, shorter retros, meeting-free blocks.",
    "Measure ceremony value: does the retro generate completed action items? Does standup unblock people? Kill what doesn't deliver."
  ]
});

updateAP('AP-32', {
  shortDesc: "EM mandates documentation for everything but never ensures it's maintained, discoverable, or useful. A graveyard of stale pages accumulates; engineers stop trusting docs.",
  impact: "Within 2 quarters: team loses trust in documentation and reverts to tribal knowledge; onboarding takes longer because new hires can't distinguish current from stale docs; time invested in writing is wasted.",
  recoveryActions: [
    "Quality over quantity: fewer, better docs that are actually maintained.",
    "Assign owners to critical docs with quarterly review dates.",
    "Archive ruthlessly — stale docs are worse than no docs because they erode trust.",
    "Make documentation discoverable: if people can't find it in 60 seconds, it effectively doesn't exist.",
    "Only mandate documentation for high-leverage items: onboarding, runbooks, architecture decisions, API contracts."
  ]
});

updateAP('AP-56', {
  shortDesc: "Manager passes organizational pressure, political conflicts, and exec anxiety directly to engineers instead of filtering it into actionable context. Team becomes anxious and distracted; productivity drops.",
  impact: "Within 1 quarter: engineers anxious about problems they can't solve; focus time destroyed by perceived emergencies; best engineers leave because the environment feels chaotic; manager mistakes transparency for dumping.",
  recoveryActions: [
    "Apply a filter before sharing: 'Does this information change what my team should do today?' If no, absorb it. If yes, translate into a specific action item — never forward raw anxiety.",
    "Translate executive concerns into specific, actionable asks before sharing with the team.",
    "Share decisions and relevant context, not the sausage-making process.",
    "Practice the 3-sentence rule: situation, what it means for us, what we're doing about it.",
    "Track interrupt count per sprint and team sentiment quarterly. Target fewer than two unplanned redirections per sprint."
  ]
});

updateAP('AP-67', {
  shortDesc: "Team neglects operational health — toil reduction, developer experience, tech debt — because feature delivery always wins. Accumulated neglect eventually degrades velocity so badly that the team can't ship features either.",
  impact: "Within 2-3 quarters: toil compounds into a death spiral where declining velocity creates pressure for more shortcuts, which generate more toil. Developer experience degrades until senior engineers leave. The remaining team lacks capacity to dig out.",
  recoveryActions: [
    "Reserve 20-30% of every sprint capacity for operational health, non-negotiably.",
    "Track toil explicitly — measure hours spent on repetitive manual tasks weekly and set reduction targets.",
    "Start with the highest-leverage automation: the one manual task every engineer does multiple times per week.",
    "Make DX metrics visible to leadership — deploy frequency, build time, onboarding time-to-first-commit.",
    "Frame operational investment in business terms: 'Reducing deploy time from 45 min to 5 min recovers X engineer-hours per week.'"
  ]
});

updateAP('AP-74', {
  shortDesc: "Team batches weeks of changes into monolithic releases, turning every deploy into a high-risk event. Deploy frequency drops because nobody wants to trigger the next crisis.",
  impact: "Within 1-2 quarters: each deploy carries accumulated risk making root cause analysis impossible when things break; engineers develop deployment anxiety; feedback loops stretch from hours to weeks; culture of risk aversion develops.",
  recoveryActions: [
    "Measure current deploy frequency and batch size — make the problem visible with data.",
    "Invest in automated rollback capability before increasing deploy frequency.",
    "Ship every new feature behind a feature flag by default. Set a 90-day flag lifecycle.",
    "Move to trunk-based development with short-lived branches (< 1 day).",
    "Target multiple deploys per day; roll out through canary pipeline (1%→10%→50%→100%) with automatic rollback triggers.",
    "Replace change advisory boards with automated change risk scoring for routine changes."
  ]
});

writeJSON('anti-patterns.json', aps);

// ─── 6. PLAYBOOKS.JSON ───
console.log('Processing playbooks.json...');
let playbooks = readJSON('playbooks.json');
function updatePlaybook(id, changes) {
  const p = playbooks.find(x => x.id === id);
  if (!p) { console.error(`  ✗ ${id} not found`); return; }
  Object.assign(p, changes);
  console.log(`  ✓ ${id} updated`);
}

updatePlaybook('P-C4-1', {
  whatGoodLooksLike: "Within 1 week: root cause analysis completed. Within 2 weeks: interrupt load measured and buffer created; commitments reduced to 70% of historical capacity. Within 6 weeks: 3 consecutive sprints hitting >80% of commitments. Outcome: stakeholders see improving trend and regain trust; team morale improves as they start hitting goals. Measured by: sprint commitment accuracy (metric 2.5), flow time (metric 2.1), carryover rate."
});

updatePlaybook('P-C4-2', {
  whatGoodLooksLike: "Week 1-2: observation period before changes. Week 3-4: team co-designs operating cadence; one ceremony introduced per 2-week cycle. Within 30 days: written runbook for on-call. Within 60 days: team reports less chaos and fewer knowledge silos. Outcome: process is lightweight and valued, not resented. Measured by: meeting purpose clarity (can every attendee state the purpose?), knowledge silo reduction, team satisfaction."
});

updatePlaybook('P-C4-3', {
  whatGoodLooksLike: "Within 6 weeks: team owns their ceremonies; retro action items >80% completion rate; standup is team coordination not status report; sprint commitments are team-made not EM-assigned. Outcome: team describes their process as 'what works for us' rather than 'what we're supposed to do.' Measured by: retro action item completion rate, sprint commitment accuracy, team ownership of ceremonies."
});

updatePlaybook('P-C4-4', {
  whatGoodLooksLike: "Within 3 days: everything non-critical paused. During sprint: pairs/squads own vertical slices with high autonomy; daily blockers cleared within hours. Outcome: feature delivered on time; no burnout — team tired but proud. Measured by: on-time delivery, team burnout signals post-sprint, zero weekend work."
});

updatePlaybook('P-C4-5', {
  whatGoodLooksLike: "Within 1 month: remote and office-based team members report equal access to information and decisions. Within 2 months: meeting load decreases as async practices mature. Ongoing: team members in different time zones contribute fully; documentation quality improves as a side benefit. Outcome: new team members onboard from anywhere with equal effectiveness. Measured by: information access parity surveys, meeting count trend, onboarding time by location."
});

writeJSON('playbooks.json', playbooks);

// ─── 7. INTERVIEW-QUESTIONS.JSON ───
console.log('Processing interview-questions.json...');
let iqs = readJSON('interview-questions.json');
function updateIQ(id, changes) {
  const q = iqs.find(x => x.id === id);
  if (!q) { console.error(`  ✗ ${id} not found`); return; }
  Object.assign(q, changes);
  console.log(`  ✓ ${id} updated`);
}

updateIQ('IQ-13', {
  lookFor: [
    "Designed cadence around team needs, not copy-pasted from a framework — can explain why each ceremony exists",
    "Has removed or changed at least one ritual based on team feedback",
    "Balances visibility and accountability with protected maker time — can state their focus time target",
    "Adapts cadence to team maturity and project phase — different cadence for exploration vs. execution"
  ],
  redFlags: [
    "Cannot explain the purpose of their standing meetings beyond 'we always have this'",
    "Never changed or removed a ritual despite team feedback",
    "Either no structure at all or >10 hours/week of meetings per engineer",
    "Standup is a status report to the manager, not team coordination"
  ]
});

updateIQ('IQ-67', {
  lookFor: [
    "Starts with data collection before proposing solutions — names specific metrics to examine first",
    "Considers multiple root causes: estimation error, interrupt load, scope creep, technical blockers",
    "Has specific techniques: value stream mapping, interrupt auditing, commitment reduction with rebuild",
    "Addresses both the delivery problem and the stakeholder trust problem simultaneously"
  ],
  redFlags: [
    "Immediately adds more process without diagnosing root cause",
    "Blames the team's estimation ability without examining external factors",
    "Commits to aggressive recovery targets without data basis",
    "Ignores stakeholder communication while focusing only on internal fixes"
  ]
});

updateIQ('IQ-15', {
  lookFor: [
    "Creates lightweight, scalable processes rather than heavy bureaucracy — can describe what was intentionally left out",
    "Adapts practices to team context: different cadence for different maturity levels",
    "Measures operational health with leading indicators (focus time, ceremony purpose clarity) not just lagging ones (velocity)",
    "Built operational capability in managers rather than running everything centrally"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT.JSON ───
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c4sa = sa.find(s => s.capabilityId === 'C4');
if (c4sa) {
  c4sa.behavioralAnchors[0].description = "Team operates without consistent rituals; standups, retros, and planning happen sporadically or not at all; cannot state the purpose of any team ceremony";
  c4sa.behavioralAnchors[1].description = "Basic operational cadences exist but are inconsistently enforced; blockers surface late in the sprint; sprint commitments missed >30% of the time";
  console.log('  ✓ C4 self-assessment L1-L2 sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT-GUIDANCE.JSON ───
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c4mg = mg.find(m => m.capabilityId === 'C4');
if (c4mg) {
  c4mg.leadingIndicators = [
    "Sprint planning and retrospectives happen on schedule every cycle",
    "Blockers are identified and escalated within 24 hours",
    "Team working agreements are documented and reviewed quarterly",
    "Delivery forecasts are shared with stakeholders before each cycle",
    "Squad health check scores tracked as leading indicator of operational rhythm",
    "Engineers report 4+ hours of daily uninterrupted focus time",
    "Every team ceremony has documented purpose and measured value delivery"
  ];
  c4mg.laggingIndicators = [
    "Sprint commitment accuracy is 85%+ consistently",
    "Cycle time for standard work items is stable or improving quarter-over-quarter",
    "Meeting effectiveness scores above 3.5/5 in team surveys",
    "Zero missed external deadlines in the quarter",
    "Mechanism completion rate — percentage of identified process gaps with automated solutions",
    "Retro action item completion rate above 80%"
  ];
  console.log('  ✓ C4 measurement guidance cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING-PATHWAYS.JSON ───
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c4lp = lp.find(l => l.capabilityId === 'C4');
if (c4lp) {
  c4lp.foundational[0].description = "Covers engineering leadership at every level: establishing team processes, running effective meetings, and creating operational cadences that scale.";
  c4lp.foundational[1].description = "Management fundamentals: leverage, output measurement, and creating operational rhythms. The concept of managerial output as the output of the organization under your management.";
  c4lp.foundational[2].description = "Framework for organizing teams for fast flow: team types, interaction modes, and how operational structure directly affects software delivery speed.";
  c4lp.foundational[3].description = "Practical guide to running standups, retrospectives, planning sessions, and demos that drive team effectiveness rather than becoming bureaucratic overhead.";
  c4lp.practical[0].description = "Template for documenting team operating rhythm: meeting cadences, communication norms, decision-making processes, and escalation paths.";
  c4lp.advanced[0].description = "Case studies of how engineering organizations scaled operational cadences from one team to ten, covering what stayed the same and what changed.";
  c4lp.advanced[3].description = "Framework covering five pillars of operational leadership: cadence design, information flow, decision velocity, accountability structures, and continuous improvement loops.";
  console.log('  ✓ C4 learning pathways cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C4 deep cycle complete.');

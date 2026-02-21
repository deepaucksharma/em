#!/usr/bin/env node
/**
 * C2 (Strategic Prioritization) Deep Cycle
 * Applies ultra-strict content validation across all C2 items.
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

function readJSON(file) {
  return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
}
function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// ─── 1. CAPABILITIES.JSON ───────────────────────────────────────────────────
console.log('Processing capabilities.json...');
let caps = readJSON('capabilities.json');
let c2cap = caps.find(c => c.id === 'C2');
c2cap.description = "Assessed by: planning artifact quality, roadmap delivery rate, stakeholder alignment metrics, resource allocation transparency, and business ROI articulation. Absence causes: engineering work invisible to business, strategic misalignment, resource thrashing between competing priorities, and wasted engineering capacity.";
c2cap.enabledBy = [];
writeJSON('capabilities.json', caps);
console.log('  ✓ C2 description rewritten to diagnostic format');

// ─── 2. OBSERVABLES.JSON ────────────────────────────────────────────────────
console.log('Processing observables.json...');
let obs = readJSON('observables.json');

function updateObs(id, changes) {
  const o = obs.find(x => x.id === id);
  if (!o) { console.error(`  ✗ Observable ${id} not found`); return; }
  Object.assign(o, changes);
  console.log(`  ✓ ${id} updated`);
}

updateObs('C2-O1', {
  why: "Without structured planning, engineering reacts to whatever screams loudest, teams get deprioritized mid-sprint, and business strategists don't know what engineering can actually deliver. A documented planning process with clear inputs (business priorities, capacity constraints) and outputs (roadmap, trade-off decisions) aligns engineering to business outcomes measurably.",
  how: "Define the planning cycle: inputs due 2 weeks before planning (business priorities from leadership, technical debt inventory, capacity model). Plan quarterly with monthly re-prioritization gates. Output: written roadmap with quarterly commitment, risk register, and defer decisions. Maintain a visible decision log of what was considered but deferred. Review roadmap completion monthly against actual delivery. Validate with metric 8.1 (OKR Achievement Rate) and 2.5 (Sprint Commitment Accuracy).",
  expectedResult: "Within 1 quarter: every initiative maps to a business outcome; stakeholders can articulate why each team member is allocated as they are; roadmap delivery rate reaches 80%+."
});

updateObs('C2-O2', {
  why: "Declining requests without showing trade-offs feels arbitrary and erodes stakeholder trust. Transparent trade-off analysis — 'we can do X, Y, or Z but not all three; here's the ROI of each' — turns 'no' into a credible business decision that stakeholders respect.",
  how: "Create a prioritization scorecard with explicit criteria (business impact, technical risk, alignment to strategy, team capacity required). Score every incoming request. Present top N options ranked by score with ROI estimates and time requirements. Show explicitly what gets deferred if you commit to a new request. Decision must include stakeholders — EM doesn't unilaterally decide. Validate with metric 8.1 (OKR Achievement Rate) and 6.2 (Stakeholder Satisfaction).",
  expectedResult: "Within 2 quarters: stakeholders stop fighting deferral decisions because the scoring is transparent and they were involved; trade-off meetings take 1-2 hours instead of recurring debates."
});

updateObs('C2-O3', {
  why: "Technical debt treated as urgent only after it becomes a crisis creates a vicious cycle: feature teams skip debt work, velocity degrades, leadership pressures for more features, debt accumulates faster, and the cycle tightens. Proactive debt allocation (15-20% of capacity) as a first-class planning input prevents both under- and over-investment in reliability.",
  how: "Include tech debt as a line item in every planning cycle: rank debt by impact (velocity drag, incident risk, security risk), allocate capacity explicitly (typically 15-20%), and make debt work visible in the roadmap. Track before/after velocity for each major debt item resolved. Validate with metric 8.6 (Tech Debt Ratio) and 1.2 (Lead Time for Changes).",
  expectedResult: "Within 2 quarters: debt inventory prioritized; allocation defended in planning; velocity improves measurably after targeted debt resolution; tech debt ratio stable or improving."
});

updateObs('C2-O4', {
  why: "Platform investments that aren't measured for adoption and ROI look like unnecessary infrastructure work. Teams stop using platforms built for them because the business case was never clear. Measuring platform adoption and cost-per-user across consuming teams turns platform work into a visible business investment.",
  how: "For every platform investment (shared library, internal tool, infra), define adoption target (% of team-that-could-use-this that do), measure time saved per team, track total engineering-hours recovered per quarter. Present platform ROI in planning alongside feature ROI. Set explicit adoption targets with timelines. Validate with metric 5.5 (Platform Adoption Rate) and 3.2 (Cycle Time).",
  expectedResult: "Within 1 quarter: platforms have adoption metrics tracked quarterly; business case for each platform documented; teams explicitly commit to platform migration as part of planning."
});

updateObs('C2-O5', {
  why: "When engineering work is described only in technical terms ('refactor auth module', 'upgrade to Kubernetes v1.26'), business stakeholders can't evaluate trade-offs. Translating technical work to business outcomes ('reduce customer support tickets by 15%', 'enable 3x faster onboarding for new customers') makes engineering visible in business conversations.",
  how: "Require every planning initiative to include a business outcome statement: what changes for customers or operations when this ships? Estimate ROI using the same framework as product features. Train EMs to lead this translation — not engineering, but the business impact of engineering. Present roadmap to business stakeholders in outcome terms, not technical terms. Validate with metric 8.1 (OKR Achievement Rate) and 6.2 (Stakeholder Satisfaction).",
  expectedResult: "Within 1 quarter: every engineering initiative has an articulated business outcome; stakeholders stop asking 'why are we doing this?'; leadership approves engineering investment proposals at higher rates."
});

updateObs('C2-O6', {
  why: "Reprioritization happens ad hoc and mid-sprint, leaving teams whiplashed. A formal re-prioritization gate monthly — where business priorities are revisited and the current roadmap adjusted if needed — separates genuine priority shifts from noise.",
  how: "Schedule monthly re-prioritization review (2-4 weeks into quarterly planning cycle). Inputs: current quarter progress, business context changes, new requests queued. Output: adjusted roadmap with clear rationale for any changes. Communicate changes explicitly to affected teams. Require at least one planned initiative to be revisited if incoming requests exceed a threshold (e.g., >20% of next quarter capacity). Validate with metric 2.5 (Sprint Commitment Accuracy) and 6.2 (Stakeholder Satisfaction).",
  expectedResult: "Within 2 quarters: planned reprioritization gates replace ad hoc changes; teams experience fewer surprise redirections; stakeholders can articulate the last time priorities were formally reviewed."
});

// Update embedded calibration signal content to match standalone file
// Fix SIG IDs and content where they diverge
for (const o of obs.filter(x => x.capabilityId === 'C2')) {
  if (!o.calibrationSignals) continue;
  for (const sig of o.calibrationSignals) {
    // Fix known ID mismatches (embedded → standalone)
    const idMap = {
      'SIG-100': 'SIG-169',
      'SIG-183': 'SIG-158',
      'SIG-184': 'SIG-159',
      'SIG-134': 'SIG-160',
      'SIG-185': 'SIG-161',
      'SIG-186': 'SIG-162',
      'SIG-135': 'SIG-163',
      'SIG-187': 'SIG-164',
      'SIG-188': 'SIG-165',
      'SIG-136': 'SIG-166',
      'SIG-189': 'SIG-167',
      'SIG-190': 'SIG-168',
      'SIG-210': 'SIG-157',
      'SIG-211': 'SIG-169'
    };
    if (idMap[sig.id]) {
      console.log(`  ✓ Fixed embedded signal ${sig.id} → ${idMap[sig.id]}`);
      sig.id = idMap[sig.id];
    }
  }
}

writeJSON('observables.json', obs);

// ─── 3. CALIBRATION-SIGNALS.JSON ────────────────────────────────────────────
console.log('Processing calibration-signals.json...');
let sigs = readJSON('calibration-signals.json');

function updateSig(id, changes) {
  const s = sigs.find(x => x.id === id);
  if (!s) { console.error(`  ✗ Signal ${id} not found`); return; }
  Object.assign(s, changes);
  console.log(`  ✓ ${id} updated`);
}

// Strip company-reference padding, sharpen signals
updateSig('SIG-169', {
  signalText: "Promo packet: 'Led quarterly planning for [X] team, defined roadmap with [Y] initiatives, achieved [Z]% delivery rate against plan'. Evidence required: roadmap document with initiative mapping to business outcomes and monthly completion tracking."
});

updateSig('SIG-158', {
  signalText: "Director-level: 'Instituted planning process across [X] teams — prioritization scorecard with explicit criteria, stakeholder alignment mechanism, monthly re-prioritization gates'. Evidence: planning artifacts from multiple teams showing consistent structure and decision transparency."
});

updateSig('SIG-159', {
  signalText: "Technical planning: 'Identified [X] technical risks in planned initiatives via pre-execution gate; [Y]% of flagged work required spikes before full commitment'. Evidence: pre-execution design review template and track record of prevented mid-sprint blockers."
});

updateSig('SIG-160', {
  signalText: "Trade-off transparency: 'Declined [X] requests by making trade-offs visible; stakeholders cite clarity of decision-making as reason for trust'. Evidence: prioritization scorecard, documented trade-offs, stakeholder feedback confirming clarity."
});

updateSig('SIG-161', {
  signalText: "Roadmap delivery credibility: 'Achieved 80%+ roadmap completion for 3+ consecutive quarters'. Evidence: quarterly roadmap documents with completion tracking; leadership feedback on predictability."
});

updateSig('SIG-162', {
  signalText: "Business outcome framing: 'Translated 95% of engineering initiatives to business outcomes; stakeholders reference engineering proposals in business planning conversations'. Evidence: planning documents with business impact statements; feedback from product/business leaders."
});

updateSig('SIG-163', {
  signalText: "Tech debt prioritization: 'Reserved 15-20% quarterly capacity for tech debt allocation; demonstrated velocity improvement of X% from targeted debt resolution'. Evidence: quarterly roadmap showing debt allocation; before/after velocity trends."
});

updateSig('SIG-164', {
  signalText: "Platform ROI transparency: 'Measured adoption and cost-per-user for [X] platform investments; [Y]% of teams using platform; demonstrated [Z] engineer-hours saved quarterly'. Evidence: platform adoption dashboard; ROI calculation methodology."
});

updateSig('SIG-165', {
  signalText: "Strategic alignment: 'Connected quarterly roadmaps to 12-month strategy; demonstrated measurable progress toward strategic goals quarterly, not just annually'. Evidence: strategic theme mapping in roadmap; quarterly progress reviews."
});

updateSig('SIG-166', {
  signalText: "Engineering voice in prioritization: 'Included engineering reps in trade-off discussions; Tech Lead co-owns prioritization decisions'. Evidence: meeting notes showing engineering participation; trade-off decisions that incorporated technical feasibility input."
});

updateSig('SIG-167', {
  signalText: "Reprioritization discipline: 'Implemented formal monthly re-prioritization gate; [X] planned initiatives adjusted based on new context; teams experienced predictable change cadence'. Evidence: monthly review meeting notes; change logs showing which initiatives were reprioritized and why."
});

updateSig('SIG-168', {
  signalText: "Planning feedback loop: 'Tracked roadmap metrics quarterly — commitment-vs-actual, time-to-value, ROI realization; planning forecasts improved from [X]% to [Y]% accuracy over 3 quarters'. Evidence: roadmap metrics dashboard; quarterly planning reviews showing forecast improvement."
});

writeJSON('calibration-signals.json', sigs);

// ─── 4. RUBRIC-ANCHORS.JSON ────────────────────────────────────────────────
console.log('Processing rubric-anchors.json...');
let anchors = readJSON('rubric-anchors.json');

function updateAnchor(id, changes) {
  const a = anchors.find(x => x.anchorId === id);
  if (!a) { console.error(`  ✗ Anchor ${id} not found`); return; }
  Object.assign(a, changes);
  console.log(`  ✓ ${id} updated`);
}

updateAnchor('C2-1', {
  level1Developing: "Scope: Individual. Key Behavior: Participates in planning but doesn't lead or influence priorities; treats roadmap as handed down from above. Artifact: None — no documented planning. Distinguishing Test: Cannot articulate the rationale behind current quarter's priorities.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Documents roadmap and gets stakeholder sign-off, but planning is ad hoc; priorities shift mid-quarter without formal re-evaluation; technical debt needs aren't surfaced in planning. Artifact: Basic roadmap document. Distinguishing Test: Can describe current roadmap but cannot articulate trade-offs that were made.",
  level3Competent: "Scope: Team (proactive). Key Behavior: Structured quarterly planning with documented inputs and outputs; monthly re-prioritization gates; tech debt allocated and tracked; roadmap delivery 80%+. Artifact: Planning process doc; roadmap with business outcome mapping; monthly re-prioritization meeting notes. Distinguishing Test: Stakeholders can articulate the prioritization criteria; engineers understand why they're allocated as they are; roadmap delivery consistent.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Planning discipline scaled across teams with consistent prioritization framework; strategic alignment measurable quarterly; technical feasibility gates prevent mid-sprint surprises. Artifact: Cross-team planning framework; strategic theme mapping; pre-execution design review documentation. Distinguishing Test: Planning process shared as best practice; other EMs adopt the framework; roadmap delivery maintained >80% during organizational change.",
  level5Advanced: "Scope: Org. Key Behavior: Planning culture institutionalized org-wide; roadmap metrics drive continuous planning improvement; strategic and quarterly rhythms well-defined and executed at scale. Artifact: Org-wide planning framework with measured outcomes; strategic roadmap updated annually with quarterly adjustments. Distinguishing Test: Business leadership cites engineering's planning credibility when discussing investment decisions; planning artifacts shape board-level conversations."
});

updateAnchor('C2-2', {
  level1Developing: "Scope: Individual. Key Behavior: Trade-offs made arbitrarily; declined requests feel personal to stakeholders; rationale not documented; same requests recur quarterly. Artifact: None. Distinguishing Test: Stakeholder cannot explain why their request was deferred; feels like EM said 'no' without hearing them.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Some prioritization scoring attempted; trade-offs explained informally; stakeholder satisfaction with trade-off process still low; scoring criteria not consistent. Artifact: Basic prioritization scorecard (inconsistently applied). Distinguishing Test: Scoring exists but stakeholders experienced different criteria for different requests.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Explicit prioritization scorecard with consistent criteria; trade-offs presented with impact/effort/ROI analysis; stakeholders involved in trade-off discussions; same request not resurfaces repeatedly. Artifact: Documented prioritization scorecard; decision log with rationale for each deferred initiative. Distinguishing Test: Stakeholders can articulate the scoring criteria; deferred requests stay deferred unless context changes.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Prioritization framework refined from delivery experience; trade-off patterns analyzed quarterly for systemic insights; prioritization consistency ensured across teams. Artifact: Prioritization framework with calibration notes; cross-team decision consistency analysis. Distinguishing Test: Different teams use same prioritization framework and get consistent outcomes; stakeholders benchmark their requests against other teams' initiatives.",
  level5Advanced: "Scope: Org. Key Behavior: Prioritization discipline becomes organizational norm; business and engineering share prioritization framework; strategic decisions made visibly with trade-off data. Artifact: Org-wide prioritization methodology with decision impact tracking. Distinguishing Test: Board-level decisions reference engineering prioritization trade-offs; prioritization framework shapes exec-level conversations about resource allocation."
});

writeJSON('rubric-anchors.json', anchors);

// ─── 5. ANTI-PATTERNS.JSON ──────────────────────────────────────────────────
console.log('Processing anti-patterns.json...');
let aps = readJSON('anti-patterns.json');

function updateAP(id, changes) {
  const a = aps.find(x => x.id === id);
  if (!a) { console.error(`  ✗ Anti-pattern ${id} not found`); return; }
  Object.assign(a, changes);
  console.log(`  ✓ ${id} updated`);
}

updateAP('AP-11', {
  shortDesc: "Priorities shift constantly. Every week, the most senior person in the room reproritizes what the team is working on. Teams thrash between contexts and finish nothing.",
  warningSigns: [
    "Team can't describe what quarter they're planning for",
    "More than one unplanned priority shift per sprint",
    "Engineers complain about context-switching and half-finished work",
    "Retrospectives mention whiplash and inability to focus"
  ],
  impact: "Within 1-2 quarters: velocity craters from context-switching; senior engineers leave due to chaos; team loses trust in planning; morale drops as work feels meaningless.",
  recoveryActions: [
    "Freeze the current quarter plan — no new prioritizations for 30 days.",
    "Implement formal planning cycle: quarterly plan, monthly re-prioritization gate, no ad hoc changes.",
    "When new requests arrive, queue them for the next planning cycle — don't disrupt current work.",
    "Track unplanned reprioritizations weekly; target zero within 2 months.",
    "Hold post-quarter review: what % of plan shipped? What % was disrupted? Use data to justify planning discipline."
  ]
});

updateAP('AP-50', {
  shortDesc: "Tech debt is never formally allocated in planning. It gets squeezed in around feature work until velocity deteriorates, then panic ensues and a 'tech debt sprint' derails the roadmap.",
  warningSigns: [
    "Tech debt discussed reactively only after velocity hits alert thresholds",
    "No debt allocation in quarterly planning",
    "Debt work competes with features and always loses",
    "Team discusses debt in retros but EM doesn't act to allocate capacity"
  ],
  impact: "Within 2-3 quarters: velocity degrades; deployment frequency drops; incidents increase from accumulated risk; team becomes demoralized from death-by-a-thousand-cuts.",
  recoveryActions: [
    "Create a tech debt inventory: list top 15 debt items, estimate effort and impact (velocity drag, incident risk, security risk).",
    "Allocate 15-20% of each quarter's capacity explicitly to debt — add it as a line item in quarterly planning.",
    "Prioritize debt by impact/effort ratio; schedule top 3 items into the quarter.",
    "Track velocity improvement after major debt items resolved; use data to justify continued debt allocation.",
    "Review debt inventory quarterly and adjust priorities based on new technical risks."
  ]
});

updateAP('AP-54', {
  shortDesc: "Engineering initiatives are planned and executed with no consideration of how they connect to business outcomes. 'We did the architecture refactor' is treated the same as 'we shipped a feature that increased conversion.'",
  warningSigns: [
    "Roadmap initiatives described only in technical terms",
    "Engineering proposals lack business outcome statements",
    "Business leadership can't articulate why engineering work matters",
    "Engineering doesn't participate in business planning conversations"
  ],
  impact: "Within 2 quarters: business stops funding engineering investment proposals; engineering seen as a cost center; strategic engineering work treated as nice-to-have.",
  recoveryActions: [
    "Require every planning initiative to include: business outcome, ROI estimate, and customer/operational impact.",
    "Train EMs to translate technical work to business terms: 'This reduces onboarding time from 2 weeks to 3 days, enabling 50% faster revenue per new employee.'",
    "Present roadmap to business stakeholders in business language, not technical language.",
    "Create a template for engineering proposals that mirrors product feature proposals — same ROI analysis format.",
    "Invite EM to quarterly business planning based on engineering investment track record."
  ]
});

updateAP('AP-63', {
  shortDesc: "Priorities are set by whoever screams loudest, not by systematic analysis. The person who escalates to the VP gets their initiative moved to top of roadmap. Systematic prioritization abandoned.",
  warningSigns: [
    "Major priority shifts happen within days of escalation",
    "Prioritization decisions made outside of formal process",
    "Different stakeholders experience different prioritization criteria",
    "Senior people bypass prioritization process for pet projects"
  ],
  impact: "Within 1-2 quarters: team can't trust the roadmap; planning discipline collapses; organizational anxiety rises; people learn to escalate instead of working through process.",
  recoveryActions: [
    "Create a formal prioritization scorecard with transparent criteria (business impact, technical risk, alignment to strategy, team capacity).",
    "All requests — regardless of source — go through the scorecard.",
    "Hold formal prioritization meetings where all stakeholders participate; decisions are joint and transparent.",
    "Publish the prioritization scorecard and all scored requests; make the methodology visible to everyone.",
    "When someone asks to bypass the process, point to the scorecard: 'Your request scored 65; top priority scored 92. If we change the plan, we have to defer something that scored higher. Which?'"
  ]
});

writeJSON('anti-patterns.json', aps);

// ─── 6. PLAYBOOKS.JSON ─────────────────────────────────────────────────────
console.log('Processing playbooks.json...');
let playbooks = readJSON('playbooks.json');

function updatePlaybook(id, changes) {
  const p = playbooks.find(x => x.id === id);
  if (!p) { console.error(`  ✗ Playbook ${id} not found`); return; }
  Object.assign(p, changes);
  console.log(`  ✓ ${id} updated`);
}

updatePlaybook('P-C2-1', {
  whatGoodLooksLike: "Within 1 week: planning process documented with inputs, outputs, and cadence. Within 2 weeks: stakeholders understand the prioritization criteria. Within 1 month: first quarterly roadmap published with business outcome mapping. Outcome: priorities feel clear and stable; stakeholders feel heard. Measured by: roadmap delivery rate, stakeholder satisfaction, team morale."
});

updatePlaybook('P-C2-2', {
  whatGoodLooksLike: "Within 1 week: tech debt inventory created; top 10 items prioritized. Within 2 weeks: debt allocation negotiated and secured in next quarter's plan. Within 1 quarter: measurable velocity improvement from targeted debt resolution. Outcome: debt is acknowledged and budgeted for; team feels capacity relief as debt is systematically addressed. Measured by: % of planned debt items completed, velocity trend, team satisfaction."
});

updatePlaybook('P-C2-3', {
  whatGoodLooksLike: "Within 1 week: prioritization scorecard drafted with explicit criteria. Within 2 weeks: all current requests scored and ranked. Within 1 month: deferred requests tracked and revisited monthly during re-prioritization gate. Outcome: stakeholders understand why requests are deferred; same requests don't recur monthly. Measured by: stakeholder feedback on clarity, repeat request rate, prioritization consistency."
});

updatePlaybook('P-C2-4', {
  whatGoodLooksLike: "Within 2 weeks: draft business outcome statements for all planned initiatives. Within 1 month: business outcome framing reviewed with stakeholders and refined. Within 1 quarter: roadmap presented to business in outcome terms; leadership approves next round of engineering proposals. Outcome: engineering visible in business conversations; investment proposals approved more frequently. Measured by: stakeholder feedback on clarity, approval rate for proposals, business leader understanding of engineering contribution."
});

updatePlaybook('P-C2-5', {
  whatGoodLooksLike: "Within 1 week: monthly re-prioritization gate scheduled into calendar. Within 2 weeks: first gate held; process documented. Within 1 month: reprioritization becomes routine; unplanned changes decrease. Outcome: planned reprioritization reduces ad hoc disruption; teams experience predictable change rhythm. Measured by: unplanned priority change frequency, team perception of stability."
});

writeJSON('playbooks.json', playbooks);

// ─── 7. INTERVIEW-QUESTIONS.JSON ────────────────────────────────────────────
console.log('Processing interview-questions.json...');
let iqs = readJSON('interview-questions.json');

function updateIQ(id, changes) {
  const q = iqs.find(x => x.id === id);
  if (!q) { console.error(`  ✗ Interview question ${id} not found`); return; }
  Object.assign(q, changes);
  console.log(`  ✓ ${id} updated`);
}

updateIQ('IQ-08', {
  lookFor: [
    "Describes structured planning process with clear cadence (quarterly + monthly re-prioritization)",
    "Can articulate the prioritization criteria they use (business impact, technical risk, strategic alignment, capacity)",
    "Names stakeholders involved in prioritization decisions; not a unilateral EM decision",
    "Tracks roadmap delivery rate and can describe what drove any misses"
  ],
  redFlags: [
    "No documented planning process or cadence",
    "Priorities decided by whoever escalates highest",
    "Roadmap not shared with or understood by stakeholders",
    "Cannot describe their team's roadmap delivery rate or how they measure it"
  ]
});

updateIQ('IQ-73', {
  lookFor: [
    "Can translate a technical initiative to business outcome — gives a specific example",
    "Frames ROI analysis the same way as product features: time required, user/customer impact, revenue impact",
    "Uses business outcome framing in proposals to leadership",
    "Measures whether business outcomes were realized after initiative ships"
  ],
  redFlags: [
    "Describes initiatives only in technical terms",
    "Cannot explain how a technical improvement connects to customer or business impact",
    "Business proposals lack ROI analysis or use different frameworks than product",
    "Engineering initiatives not discussed in business planning conversations"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT.JSON ────────────────────────────────────────────────
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c2sa = sa.find(s => s.capabilityId === 'C2');
if (c2sa) {
  c2sa.behavioralAnchors[0].description = "Priorities shift frequently without formal process; team can't articulate why they're allocated as they are; no documented roadmap or prioritization criteria";
  c2sa.behavioralAnchors[1].description = "Structured planning exists but roadmap delivery is inconsistent; stakeholders feel trade-offs are made arbitrarily; tech debt not formally allocated in planning";
  console.log('  ✓ C2 self-assessment L1-L2 anchors sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT-GUIDANCE.JSON ───────────────────────────────────────────
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c2mg = mg.find(m => m.capabilityId === 'C2');
if (c2mg) {
  // Strip company references from leading indicators
  c2mg.leadingIndicators = [
    "Quarterly roadmap published with business outcome mapping",
    "Prioritization scorecard applied consistently to all incoming requests",
    "Monthly re-prioritization gate held with documented decisions",
    "Tech debt allocation visible in quarterly planning (15-20% capacity)",
    "Pre-execution design review completed for all planned initiatives >20% quarter capacity",
    "Roadmap communicated to all stakeholders with clear rationale"
  ];
  // Strip company references from lagging indicators
  c2mg.laggingIndicators = [
    "Roadmap delivery rate 80%+ for 3+ consecutive quarters",
    "Planning forecast accuracy improving quarter-over-quarter",
    "Unplanned priority shifts <1 per sprint",
    "Stakeholder satisfaction with planning process >4.0/5.0",
    "Business outcome statements included in 95%+ of planned initiatives",
    "Tech debt inventory maintained and prioritized quarterly"
  ];
  console.log('  ✓ C2 measurement guidance indicators cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING-PATHWAYS.JSON ─────────────────────────────────────────────
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c2lp = lp.find(l => l.capabilityId === 'C2');
if (c2lp) {
  // Clean foundational resource descriptions (strip marketing copy)
  c2lp.foundational[0].description = "Practical framework for planning engineering work: setting quarterly objectives, evaluating trade-offs, and allocating resources across competing priorities with transparency.";
  c2lp.foundational[1].description = "How engineering strategy connects to business strategy. Frameworks for translating technical work to business outcomes and defending engineering investment to leadership.";
  c2lp.foundational[2].description = "Principles of capacity planning: understanding team constraints, forecasting delivery, and managing technical debt alongside feature work without compromising either.";
  c2lp.foundational[3].description = "Framework for communicating trade-offs and building alignment across engineering, product, and business on resource allocation and priority decisions.";

  // Clean practical resource descriptions
  c2lp.practical[0].description = "Template for quarterly planning: roadmap structure, business outcome mapping, stakeholder involvement, and monthly re-prioritization cadence.";
  c2lp.practical[1].description = "Prioritization scorecard framework: defining criteria, scoring consistently, and using data to defend priority decisions to stakeholders.";
  c2lp.practical[2].description = "Pre-execution design review process: identifying technical feasibility risks before initiatives start, reducing mid-execution surprises.";

  // Clean advanced resource descriptions
  c2lp.advanced[0].description = "Strategic planning at scale: coordinating roadmaps across multiple teams, maintaining strategic alignment, and ensuring consistent prioritization across the organization.";
  c2lp.advanced[1].description = "Building business acumen in engineering: translating technical work to business outcomes, understanding business drivers of prioritization, and participating in executive strategy.";
  c2lp.advanced[2].description = "Case studies of organizations that scaled planning discipline: how planning frameworks evolve as teams grow and what changes when coordinating across many teams.";
  c2lp.advanced[3].description = "Balancing feature velocity with technical health: frameworks for allocating capacity to tech debt, platform work, and operational investment without sacrificing delivery speed.";

  console.log('  ✓ C2 learning pathways descriptions cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C2 deep cycle complete. All files updated.');

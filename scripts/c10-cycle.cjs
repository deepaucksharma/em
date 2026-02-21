#!/usr/bin/env node
/**
 * C10 (Resource Allocation & Tradeoffs) Deep Cycle
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
function readJSON(file) { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8')); }
function writeJSON(file, data) { fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8'); }

// ─── 1. CAPABILITIES ───
console.log('Processing capabilities.json...');
let caps = readJSON('capabilities.json');
let c10 = caps.find(c => c.id === 'C10');
c10.description = "Assessed by: TCO analysis rigor, capacity model accuracy, scope negotiation discipline, budget variance, and cloud cost per transaction. Absence causes: reactive firefighting from misallocated capacity, surprise cost overruns, deadline-driven shortcuts, and unfunded engineering investment.";
c10.enabledBy = ["C9"];
writeJSON('capabilities.json', caps);
console.log('  ✓ C10 description rewritten');

// ─── 2. OBSERVABLES ───
console.log('Processing observables.json...');
let obs = readJSON('observables.json');
function updateObs(id, changes) {
  const o = obs.find(x => x.id === id); if (!o) return;
  Object.assign(o, changes); console.log(`  ✓ ${id}`);
}

updateObs('C10-O1', {
  why: "Without explicit capacity allocation, teams overcommit and underdeliver. A capacity model that accounts for interrupts (10-15%), on-call (5-10%), PTO (10-15%), and operational work (15-20%) prevents planning from fantasy. Teams that account for reality hit >85% of commitments; teams that don't hit <60%.",
  how: "Build a capacity model: historical sprint velocity adjusted for known interrupts, upcoming PTO, on-call rotation burden, and planned operational work. Reserve 20-30% for non-feature work explicitly. Track actuals vs. plan variance weekly and refine the model. Validate with metric 2.5 (Sprint Commitment Accuracy) and 2.2 (Velocity Variance).",
  expectedResult: "Within 2 quarters: >85% sprint commitment hit rate sustained; stakeholder trust rebuilds as delivery becomes predictable; team operates at sustainable pace without regular overtime."
});

updateObs('C10-O2', {
  why: "Saying yes to everything means delivering nothing well. Scope negotiation is a core EM skill — the willingness to push back on unfunded asks is what separates strategic leaders from task executors.",
  how: "Use a prioritization framework (ICE, RICE, or weighted scoring) to make trade-offs transparent. When scope exceeds capacity, present options: descope features, extend timeline, or add resources. Never accept the squeeze without flagging risk. Document what was not funded and why. Validate with metric 8.1 (OKR Achievement Rate).",
  expectedResult: "Within 1 quarter: scope trade-offs are negotiated proactively, not discovered at deadline; stakeholders understand the zero-sum nature of capacity; team focused on high-impact work."
});

updateObs('C10-O3', {
  why: "Infrastructure costs compound invisibly without monitoring and accountability. Teams that track cost-per-transaction as a first-class metric alongside latency and error rate catch runaway spend early; teams that don't face surprise bills that trigger emergency cost-cutting that damages product quality.",
  how: "Make cost visible: dashboard cost per service, per team, per transaction. Include cost estimates in design reviews. Set cost budgets with alert thresholds. Run quarterly cost optimization sprints. Validate with metric 10.1 (Cloud Cost per Transaction/User).",
  expectedResult: "Within 2 quarters: cost-per-transaction stable or decreasing; no surprise bills; cost optimization is planned investment, not emergency reaction."
});

updateObs('C10-O4', {
  why: "Build-vs-buy decisions made on sticker price alone ignore the 3-5x ongoing cost of maintenance, opportunity cost, and team cognitive load. A rigorous TCO analysis over a 3-year horizon prevents both errors: building commodity tools and buying solutions the team will outgrow.",
  how: "For every major build-vs-buy decision, calculate TCO: initial cost, ongoing maintenance (typically 20-30% annually), opportunity cost (what else could the team build?), team skill fit, vendor lock-in risk. Document in an ADR with explicit revisit date. Validate with metric 10.2 (Engineering ROI on Projects).",
  expectedResult: "Within 1 quarter: build-vs-buy decisions documented with TCO; regrettable decisions fewer than 1 per year; team builds where it differentiates, buys where it doesn't."
});

updateObs('C10-O5', {
  why: "Unfunded mandates — security fixes, compliance work, platform migrations — consume capacity but often aren't visible in planning. When these surface as 'surprises,' they either get skipped (creating risk) or displace planned work (destroying predictability).",
  how: "Maintain a non-negotiable work register: security patches, compliance requirements, platform migrations, SLA commitments. Include in capacity planning as first-class citizens with explicit percentage allocation. Track as separate swim lane from feature work. Validate with metric 2.5 (Sprint Commitment Accuracy).",
  expectedResult: "Within 1 quarter: non-negotiable work is visible and accounted for; no 'surprise' mandatory work disrupts sprint commitments; compliance and security work happens on schedule."
});

updateObs('C10-O6', {
  why: "Engineers are not fungible — specialized skills create natural constraints. Treating the team as a homogeneous resource pool leads to bottlenecks when the one engineer who knows the billing system is overloaded while others have capacity.",
  how: "Map team skills to critical paths and identify single points of failure (bus factor = 1). Track work distribution by skill area, not just by person. Invest in pairing and documentation to distribute specialized knowledge. Plan capacity considering skill constraints, not just headcount. Validate with metric 5.3 (Knowledge Distribution).",
  expectedResult: "Within 2 quarters: bus factor ≥2 for all critical systems; work distribution accounts for skill constraints; no single-engineer bottlenecks."
});

updateObs('C10-O7', {
  why: "Opportunity cost is invisible but real — every hour spent on Project A is an hour not spent on Project B. Making opportunity cost explicit in prioritization prevents 'yes to everything' drift.",
  how: "For every prioritization decision, articulate what is not being done: 'If we build this feature, we won't have capacity for X.' Use impact-effort matrices to make trade-offs visible. Present capacity as zero-sum to stakeholders. Validate with metric 8.1 (OKR Achievement Rate)."
});

updateObs('C10-O8', {
  why: "Technical debt is an investment trade-off, not a moral failing. Treating debt as shameful means it accumulates invisibly; treating it as strategic leverage means taking on the right debt at the right time and paying it down deliberately.",
  expectedResult: "Within 2 quarters: debt allocation is visible and funded; strategic debt is taken deliberately with explicit payback plans; tech debt ratio stable or improving."
});

updateObs('C10-O9', {
  why: "Multi-tasking and context-switching destroy productivity — engineers switching between >2 projects lose 20-40% capacity to context overhead. Limiting WIP and protecting focus time is a resource allocation decision.",
  how: "Limit WIP per engineer to 1-2 active projects; protect 4+ hour uninterrupted focus blocks daily; batch interrupts into dedicated time slots. Track context-switching in sprint retros. Validate with metric 5.1 (Developer Satisfaction Score).",
  expectedResult: "Within 1 quarter: engineers report improved focus time; throughput increases despite same headcount; context-switching overhead visible and managed."
});

writeJSON('observables.json', obs);

// ─── 3. CALIBRATION SIGNALS ───
console.log('Processing calibration-signals.json...');
let sigs = readJSON('calibration-signals.json');
function updateSig(id, changes) {
  const s = sigs.find(x => x.id === id); if (!s) return;
  Object.assign(s, changes); console.log(`  ✓ ${id}`);
}

updateSig('SIG-036', {
  signalText: "Promo packet: 'Maintained >85% sprint commitment accuracy for [X] consecutive quarters through disciplined capacity modeling accounting for interrupts, PTO, and operational work.' Evidence: capacity model with variance tracking."
});

updateSig('SIG-037', {
  signalText: "Negotiation discipline: 'When [major initiative] scope exceeded capacity by 40%, presented descope options, negotiated 2-month timeline extension, delivered on revised plan with zero team overtime.' Evidence: documented scope trade-off decision."
});

updateSig('SIG-038', {
  signalText: "Cost management: 'Reduced cloud spend by [X]% while maintaining performance through [specific optimizations].' Threshold: cost-per-transaction tracked as first-class metric; no surprise cost overruns."
});

updateSig('SIG-039', {
  signalText: "TCO thinking: 'Build-vs-buy decision for [tool] documented with 3-year TCO analysis including maintenance burden and opportunity cost; decision revisited annually.' Evidence: ADR with TCO calculation."
});

updateSig('SIG-040', {
  signalText: "Directors own resource allocation across teams. 'Reallocated [X] engineers from [low-impact area] to [high-impact area], delivered [Y] business outcome.' Evidence: portfolio-level prioritization with impact measurement."
});

updateSig('SIG-041', {
  signalText: "Opportunity cost framing: every resource allocation proposal articulates what is not being done. 'Funded [Project A] over [Project B] based on impact analysis; revisited decision at quarter-end with outcome data.'"
});

writeJSON('calibration-signals.json', sigs);

// ─── 4. RUBRIC ANCHORS ───
console.log('Processing rubric-anchors.json...');
let anchors = readJSON('rubric-anchors.json');
function updateAnchor(id, changes) {
  const a = anchors.find(x => x.anchorId === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAnchor('C10-1', {
  level1Developing: "Scope: Individual. Key Behavior: Accepts all scope without negotiation; no capacity model; chronic overcommitment. Artifact: None — capacity planning is informal. Distinguishing Test: Cannot state team's planned vs. actual capacity variance or sprint commitment hit rate.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Beginning to track capacity; occasional pushback on scope; actuals vs. plan variance visible but not used for refinement. Artifact: Basic capacity tracking. Distinguishing Test: Tracks capacity but commitment accuracy still below 70%; pushback is reactive, not proactive.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Disciplined capacity modeling accounting for interrupts, PTO, and operational work; proactive scope negotiation; >85% commitment accuracy sustained. Artifact: Capacity model with variance tracking; documented scope trade-offs; cost dashboard. Distinguishing Test: Stakeholders trust delivery estimates; scope trade-offs negotiated weeks before deadline, not at deadline.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Portfolio-level capacity allocation across teams; opportunity cost explicit in prioritization; cross-team resource balancing. Artifact: Cross-team capacity model; portfolio prioritization framework with documented trade-offs. Distinguishing Test: Reallocates capacity across teams based on impact; opportunity cost articulated in every major decision.",
  level5Advanced: "Scope: Org. Key Behavior: Resource allocation is strategic function; capacity modeling institutionalized; budget allocation driven by impact measurement. Artifact: Org-wide resource allocation framework with measured outcomes. Distinguishing Test: Engineering investment treated as portfolio; resource allocation defended with ROI data at executive level."
});

updateAnchor('C10-2', {
  level1Developing: "Scope: Individual. Key Behavior: Infrastructure costs untracked; no TCO analysis for build-vs-buy; tech debt allocation invisible. Artifact: None. Distinguishing Test: Cannot state team's cloud spend or cost trend.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Cost visible but not actively managed; basic TCO comparisons for major decisions; tech debt allocation informal. Artifact: Basic cost dashboard. Distinguishing Test: Aware of costs but no proactive optimization; cost overruns discovered after the fact.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Cost-per-transaction tracked and optimized; rigorous TCO analysis for build-vs-buy; explicit tech debt budgeting (15-20% capacity). Artifact: Cost dashboard with per-transaction metrics; TCO analysis in ADRs; tech debt budget. Distinguishing Test: No surprise cost overruns; build-vs-buy regrets <1/year; tech debt allocation visible in planning.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Cost optimization coordinated across teams; shared infrastructure TCO analyzed at area level; portfolio-level tech debt prioritization. Artifact: Cross-team cost benchmarks; shared infrastructure ROI analysis. Distinguishing Test: Cost optimization creates org-wide leverage; infrastructure decisions evaluated with multi-team TCO.",
  level5Advanced: "Scope: Org. Key Behavior: Cost management culture established; ROI analysis standard for engineering investment; tech debt treated as strategic investment portfolio. Artifact: Org-wide cost optimization framework; engineering ROI measurement. Distinguishing Test: CFO references engineering cost efficiency in board meetings; cost-per-transaction is exec-level KPI."
});

writeJSON('rubric-anchors.json', anchors);

// ─── 5. ANTI-PATTERNS ───
console.log('Processing anti-patterns.json...');
let aps = readJSON('anti-patterns.json');
function updateAP(id, changes) {
  const a = aps.find(x => x.id === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAP('AP-08', {
  shortDesc: "EM says yes to every request without negotiating scope, timeline, or resources. Team chronically overcommits and underdelivers; stakeholder trust erodes as commitments are repeatedly missed.",
  warningSigns: [
    "Sprint commitment hit rate consistently <70%",
    "Regular weekend work or overtime to hit deadlines",
    "Stakeholders stop trusting delivery estimates",
    "Team retros repeatedly surface 'too much work' without EM action"
  ],
  impact: "Within 2-3 quarters: chronic overcommitment becomes cultural norm; burnout increases; stakeholders stop believing estimates and pad timelines independently; EM loses credibility as delivery partner.",
  recoveryActions: [
    "Build a capacity model accounting for interrupts, PTO, on-call, and operational work — reserve 20-30% for non-feature work.",
    "Track planned vs. actual capacity weekly and refine model based on variance.",
    "Practice saying 'yes, and here's what won't get done' — make trade-offs explicit.",
    "When scope exceeds capacity, present three options: descope, extend timeline, or add resources. Never accept the squeeze silently.",
    "Measure success by commitment accuracy, not by how much you said yes to."
  ]
});

updateAP('AP-09', {
  shortDesc: "EM hoards team capacity, declining all asks even when team has slack. Becomes a bottleneck to cross-team collaboration; seen as uncooperative and protective rather than strategic.",
  warningSigns: [
    "Team velocity stable but stakeholder requests routinely declined",
    "Cross-team collaboration requests rejected without exploration",
    "Team has slack capacity but EM doesn't surface it",
    "Peer EMs route around this EM for shared work"
  ],
  impact: "Within 1-2 quarters: isolated from org priorities; team works on low-impact projects while high-impact cross-team work happens elsewhere; EM excluded from strategic planning.",
  recoveryActions: [
    "Distinguish between legitimate capacity constraints and protective hoarding — audit last quarter's scope decisions.",
    "Say yes to high-impact work even if it means descoping internal projects.",
    "Make capacity model transparent to stakeholders so 'no' is based on data, not perception.",
    "Proactively offer capacity for high-impact org initiatives when team has slack."
  ]
});

updateAP('AP-30', {
  shortDesc: "Infrastructure costs invisible until finance sends a surprise bill. No cost tracking, no budgets, no accountability. Emergency cost-cutting scramble damages product quality.",
  warningSigns: [
    "Cannot state team's monthly cloud spend or trend",
    "Cost discussed only when finance flags overspend",
    "No cost estimates in design reviews for new infrastructure",
    "Cost optimization is emergency reaction, not planned work"
  ],
  impact: "Within 2-3 quarters: surprise cost overruns trigger emergency cutbacks; quality degraded by rushed optimization; loss of finance trust; future budget requests denied.",
  recoveryActions: [
    "Dashboard cloud costs by service and team; review monthly.",
    "Set cost budgets with alert thresholds at 80% of budget.",
    "Include cost estimates in every design review for infrastructure changes.",
    "Track cost-per-transaction as first-class metric alongside latency and error rate.",
    "Run planned quarterly cost optimization sprints instead of waiting for finance escalation."
  ]
});

updateAP('AP-42', {
  shortDesc: "EM treats engineers as interchangeable resources, ignoring skill specialization. Assigns work without considering expertise; creates bottlenecks when specialized knowledge is needed.",
  warningSigns: [
    "Bus factor = 1 for multiple critical systems",
    "Work assignments ignore skill fit — backend engineers assigned frontend work arbitrarily",
    "The 'only person who knows X' is constantly overloaded while others have capacity",
    "Knowledge transfer and pairing are not prioritized"
  ],
  impact: "Within 2 quarters: specialized engineers become bottlenecks and burn out; knowledge stays siloed; team velocity drops when key person is unavailable; attrition of specialized engineers paralyzes team.",
  recoveryActions: [
    "Map team skills to critical systems and identify bus factor = 1 risks.",
    "Prioritize pairing and documentation to distribute specialized knowledge — target bus factor ≥2 for all critical paths.",
    "Plan capacity considering skill constraints, not just headcount: 'We have 8 engineers but only 2 know the billing system.'",
    "Track work distribution by skill area; rebalance if one person handles >40% of a critical area."
  ]
});

updateAP('AP-63', {
  shortDesc: "EM focuses only on feature velocity, treating operational work, tech debt, and security as optional. Eventually, accumulated neglect collapses delivery capacity.",
  warningSigns: [
    "Tech debt, security patches, and operational improvements always deprioritized",
    "Sprint planning allocates 100% capacity to features with no buffer",
    "On-call burden increasing but no capacity allocated for reliability work",
    "Deployment frequency decreasing over time despite same or larger team"
  ],
  impact: "Within 2-3 quarters: operational burden compounds until it consumes >50% of capacity; incidents increase; velocity collapses under weight of accumulated debt; team can't ship features because they're firefighting.",
  recoveryActions: [
    "Reserve minimum 20% capacity for operational health, security, and tech debt — non-negotiable.",
    "Track tech debt and operational toil explicitly in capacity planning.",
    "Use error budget policy: when reliability degrades, pause features until health improves.",
    "Frame operational investment in business terms to stakeholders: 'Paying down this debt recovers X engineer-weeks per quarter.'"
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

updatePlaybook('P-C10-1', {
  whatGoodLooksLike: "Within 1 week: historical velocity and actuals-vs-plan variance analyzed. Within 2 weeks: capacity model built accounting for interrupts (10-15%), PTO (10-15%), on-call (5-10%), operational work (15-20%). Within 4 weeks: first sprint planned with new model; commitment reduced to 70% of historical velocity. Within 2 months: 2 consecutive sprints at >80% commitment accuracy. Outcome: stakeholder trust rebuilds; team operates at sustainable pace. Measured by: sprint commitment accuracy (metric 2.5), velocity variance (metric 2.2), team burnout signals."
});

updatePlaybook('P-C10-2', {
  whatGoodLooksLike: "Within 1 week: scope-capacity gap quantified with data. Within 2 weeks: three options presented to stakeholders (descope, extend timeline, or add resources) with impact analysis. Within 1 month: revised plan committed and delivered. Outcome: stakeholder respects data-driven trade-off; EM seen as strategic partner, not order-taker. Measured by: negotiated outcome quality, stakeholder satisfaction with transparency, on-time delivery to revised plan."
});

updatePlaybook('P-C10-3', {
  whatGoodLooksLike: "Within 2 weeks: cost dashboard by service/team live. Within 1 month: cost budgets set with 80% alert thresholds. Within 1 quarter: cost-per-transaction stable or decreasing; planned cost optimization sprint completed. Outcome: no surprise bills; cost optimization is strategic investment. Measured by: cloud cost per transaction (metric 10.1), cost variance, finance satisfaction."
});

updatePlaybook('P-C10-4', {
  whatGoodLooksLike: "Within 2 weeks: TCO framework defined (initial cost, 3-year maintenance, opportunity cost, skill fit, lock-in risk). Within 4 weeks: build-vs-buy decision documented in ADR with explicit revisit date. Within expected timeline: decision implemented. At 1-year review: decision revisited; if context changed, documented explicitly. Outcome: decision quality high; regrets <1/year. Measured by: time-to-production, TCO accuracy vs. actuals, decision revisit discipline."
});

updatePlaybook('P-C10-5', {
  whatGoodLooksLike: "Within 1 week: skill map created with bus factor per critical system. Within 2 weeks: bus factor = 1 risks identified; pairing plan created for top 3 risks. Within 1 quarter: bus factor ≥2 for all critical systems through pairing and documentation. Outcome: no single-engineer bottlenecks; knowledge distribution improves. Measured by: bus factor improvement, knowledge distribution (metric 5.3), team capacity flexibility."
});

writeJSON('playbooks.json', playbooks);

// ─── 7. INTERVIEW QUESTIONS ───
console.log('Processing interview-questions.json...');
let iqs = readJSON('interview-questions.json');
function updateIQ(id, changes) {
  const q = iqs.find(x => x.id === id); if (!q) return;
  Object.assign(q, changes); console.log(`  ✓ ${id}`);
}

updateIQ('IQ-35', {
  lookFor: [
    "Uses a capacity model that accounts for realistic constraints (interrupts, PTO, on-call, operational work) — can state the percentage allocations",
    "Negotiates scope proactively when capacity is constrained — gives specific example of successful negotiation",
    "Tracks sprint commitment accuracy and uses variance to refine planning",
    "Frames capacity as zero-sum: 'If we do X, we won't have capacity for Y'"
  ],
  redFlags: [
    "Plans at 100% feature capacity with no buffer for operational work",
    "Chronically overcommits — hit rate <70% over multiple quarters",
    "Accepts all scope without negotiation or pushback",
    "Cannot state team's commitment accuracy or actuals-vs-plan variance"
  ]
});

updateIQ('IQ-36', {
  lookFor: [
    "Describes specific scope trade-off presented with data-backed options",
    "Negotiated timeline, scope, or resources — didn't just accept the squeeze",
    "Made opportunity cost explicit: 'If we do this, we won't do that'",
    "Outcome: stakeholder understood trade-off and respected the data-driven approach"
  ],
  redFlags: [
    "Always says yes to scope without negotiation",
    "Trade-offs discovered at deadline rather than negotiated proactively",
    "Cannot articulate how they made scope decisions when capacity was constrained",
    "Scope negotiation is seen as 'pushback' rather than strategic partnership"
  ]
});

updateIQ('IQ-37', {
  lookFor: [
    "Tracks infrastructure costs by service or team — can state current spend and trend",
    "Includes cost in design reviews and capacity planning",
    "Has conducted cost optimization with measurable results",
    "Treats cost as first-class metric alongside performance and reliability"
  ],
  redFlags: [
    "Cannot state team's cloud spend or cost trend",
    "Cost discussed only when finance escalates",
    "No cost estimates in design reviews for infrastructure changes",
    "Cost optimization is reactive emergency response, not planned work"
  ]
});

updateIQ('IQ-104', {
  lookFor: [
    "Describes TCO framework including initial cost, ongoing maintenance, opportunity cost, and lock-in risk",
    "Calculated 3-year TCO, not just sticker price comparison",
    "Decision documented in ADR with explicit revisit criteria",
    "Applied core-vs-context lens: build what differentiates, buy what doesn't"
  ],
  redFlags: [
    "Build-vs-buy decision based only on initial cost, ignoring maintenance",
    "Always builds (or always buys) regardless of context",
    "No documented alternatives analysis",
    "Decision made without team participation or proof-of-concept"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT ───
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c10sa = sa.find(s => s.capabilityId === 'C10');
if (c10sa) {
  c10sa.behavioralAnchors[0].description = "Accepts all scope without negotiation; no capacity model; chronic overcommitment with <70% sprint hit rate; infrastructure costs untracked";
  c10sa.behavioralAnchors[1].description = "Beginning to track capacity and costs; occasional pushback on scope but commitment accuracy still inconsistent; basic cost visibility but no proactive optimization";
  console.log('  ✓ C10 self-assessment L1-L2 sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT GUIDANCE ───
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c10mg = mg.find(m => m.capabilityId === 'C10');
if (c10mg) {
  c10mg.leadingIndicators = [
    "Capacity model exists and is updated weekly based on actuals vs. plan variance",
    "Scope negotiations happen during planning phase, not at delivery deadline",
    "Cost budgets set with alert thresholds for all major services",
    "Build-vs-buy decisions documented with TCO analysis and revisit dates",
    "Non-negotiable work (security, compliance) explicitly allocated in capacity planning",
    "Bus factor tracked for all critical systems with mitigation plans for bus factor = 1"
  ];
  c10mg.laggingIndicators = [
    "Sprint commitment accuracy sustained above 85% for 3+ consecutive quarters",
    "Cloud cost per transaction stable or decreasing quarter-over-quarter",
    "Build-vs-buy regret rate below 1 per year",
    "Zero surprise cost overruns flagged by finance",
    "Tech debt ratio stable or improving with explicit allocation",
    "Knowledge distribution improving with bus factor ≥2 for critical systems"
  ];
  console.log('  ✓ C10 measurement guidance cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING PATHWAYS ───
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c10lp = lp.find(l => l.capabilityId === 'C10');
if (c10lp) {
  if (c10lp.foundational[0]) c10lp.foundational[0].description = "Frameworks for prioritization: ICE, RICE, weighted scoring. How to make scope trade-offs transparent and defensible.";
  if (c10lp.foundational[1]) c10lp.foundational[1].description = "Capacity planning fundamentals: accounting for interrupts, operational work, and realistic constraints in sprint planning.";
  if (c10lp.foundational[2]) c10lp.foundational[2].description = "Build-vs-buy decision frameworks including TCO analysis, opportunity cost, and strategic fit evaluation.";
  if (c10lp.practical[0]) c10lp.practical[0].description = "Template for building capacity models: historical velocity, interrupt buffers, operational allocation, PTO planning.";
  if (c10lp.practical[1]) c10lp.practical[1].description = "TCO analysis template covering initial cost, 3-year maintenance burden, opportunity cost, team skill fit, and lock-in risk.";
  if (c10lp.advanced[0]) c10lp.advanced[0].description = "Portfolio-level resource allocation: balancing capacity across multiple teams based on impact measurement and strategic priorities.";
  console.log('  ✓ C10 learning pathways cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C10 deep cycle complete.');

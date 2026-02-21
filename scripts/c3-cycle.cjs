#!/usr/bin/env node
/**
 * C3 (Systems Design & Architecture) Deep Cycle
 * Applies ultra-strict content validation across all C3 items.
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
let c3cap = caps.find(c => c.id === 'C3');
c3cap.description = "Assessed by: architecture decision records, design review process, SLO framework, tech debt registry, and migration execution. Absence causes: conflicting architectural decisions, compounding tech debt, reactive reliability investment, and failed migrations.";
c3cap.enabledBy = [];
writeJSON('capabilities.json', caps);
console.log('  ✓ C3 description rewritten to diagnostic format');

// ─── 2. OBSERVABLES.JSON ────────────────────────────────────────────────────
console.log('Processing observables.json...');
let obs = readJSON('observables.json');

function updateObs(id, changes) {
  const o = obs.find(x => x.id === id);
  if (!o) { console.error(`  ✗ Observable ${id} not found`); return; }
  Object.assign(o, changes);
  console.log(`  ✓ ${id} updated`);
}

updateObs('C3-O1', {
  why: "Teams lack coherent direction without a written technical strategy; engineers make conflicting architectural decisions. A strategy doc with alternatives considered and trade-offs explicit becomes the shared source of truth that aligns engineers across the area.",
  how: "Collaborate with TL/Staff+ to author a living technical strategy doc; structure as current state → target state → migration path → success metrics. Review quarterly against delivery reality and update when assumptions change. Validate with metric 8.2 (Revenue / Business Impact Attribution).",
  expectedResult: "Within 2 quarters: team ships coherently toward goals; new engineers read one doc and understand system direction; conflicting architectural decisions drop to near-zero."
});

updateObs('C3-O2', {
  why: "Inconsistent design quality; service boundaries don't match team boundaries (violating Conway's Law); monolith coupling slows all teams while over-decomposition adds coordination overhead. Design reviews catch these misalignments before they become production problems.",
  how: "Create RFC template with required sections: alternatives, rollback plan, SLO impact. Review evaluates: does this service boundary align with team ownership? Does modularity reduce or increase coordination? Maintain searchable decision log. Use RACI to clarify review roles. Validate with metric 8.1 (OKR Achievement Rate)."
});

updateObs('C3-O3', {
  why: "Teams default to building when buying is faster, or buy solutions they outgrow in 6 months. A rigorous TCO analysis including maintenance burden, team opportunity cost, and lock-in risk over a 3-year horizon prevents both errors.",
  expectedResult: "Within 1 quarter of decision: custom where it differentiates, commodity where it doesn't; regretted build-vs-buy decisions fewer than 1 per year."
});

updateObs('C3-O4', {
  why: "Unchecked debt slows velocity quarter over quarter; over-investment in debt starves features. Explicit tech debt budgets (typically 15-20% of sprint capacity) prevent both extremes by treating debt as an engineering investment with expected returns.",
  expectedResult: "Within 2 quarters: sustained velocity trend without compounding debt; deployment frequency and incident rate improve measurably after major debt items are resolved."
});

updateObs('C3-O5', {
  why: "Without clear targets, every incident feels like a crisis and reliability investment is reactive. The error budget model transforms reliability from a subjective debate into an objective trade-off: when the error budget is consumed, feature work stops and reliability work starts.",
  how: "Set SLOs for latency/availability/error rates aligned to user-visible impact. Define error budgets as the inverse of the SLO. Dashboard with burn rate alerts. When budget consumption exceeds the burn rate threshold, shift team focus to reliability. Validate with metric 8.5 (Customer Impact Metrics)."
});

updateObs('C3-O6', {
  why: "Big-bang migrations fail because risk compounds nonlinearly. The strangler fig pattern — replacing components incrementally while keeping the old system running — lets teams ship incremental value, catch issues early, and maintain business continuity throughout."
});

updateObs('C3-O7', {
  shortText: "Defines observability standards and dependency maps with fallback strategies per service",
  why: "Without observability, debugging is guesswork and incidents take hours to diagnose. Observability is a prerequisite for ownership — if you can't measure it, you can't own it.",
  how: "Define standards (structured logs, required metrics per service, end-to-end trace propagation). Instrument critical paths. Map upstream/downstream dependencies with health checks and fallback patterns. Set alerting thresholds. Every new service must meet observability requirements before production launch. Validate with metric 1.3 (Mean Time to Restore)."
});

updateObs('C3-O9', {
  how: "Make cost visible per service/team via dashboards. Include cost estimates in design reviews. Set cost budgets per team with alert thresholds. Run quarterly cost optimization sprints. Track cost-per-transaction as a first-class metric alongside latency and error rate. Validate with metric 10.1 (Cloud Cost per Transaction/User)."
});

updateObs('C3-O10', {
  shortText: "Incorporates energy efficiency into architecture decisions and infrastructure planning",
  why: "Engineering organizations are increasingly accountable for their carbon footprint. Sustainability metrics affect procurement decisions, regulatory compliance, and corporate ESG commitments.",
  expectedResult: "Within 2 quarters: measurable reduction in compute carbon intensity per transaction; sustainability metrics reported alongside cost and performance in quarterly reviews."
});

updateObs('C3-O11', {
  shortText: "Quantifies tech debt in business terms with ROI-justified remediation backlog",
  why: "Tech debt is invisible until it causes incidents or blocks features — making it visible in business terms enables informed investment decisions rather than emergency firefighting.",
  how: "Maintain tech debt registry with business impact estimates (cost-of-delay, incident risk, velocity drag). Categorize by risk (security, reliability, velocity). Present in business terms using the same format as feature ROI analysis. Include tech debt in quarterly planning alongside features. Track remediation ROI. Validate with metric 8.6 (Tech Debt Ratio)."
});

// Update embedded calibration signal content to match standalone file
// Fix SIG IDs and content where they diverge
for (const o of obs.filter(x => x.capabilityId === 'C3')) {
  if (!o.calibrationSignals) continue;
  for (const sig of o.calibrationSignals) {
    // Fix known ID mismatches (embedded → standalone)
    const idMap = {
      'SIG-174': 'SIG-171',
      'SIG-150': 'SIG-147',
      'SIG-151': 'SIG-148',
      'SIG-152': 'SIG-149',
      'SIG-239': 'SIG-221'
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
updateSig('SIG-001', {
  signalText: "Promo packet: 'Authored and drove technical vision for [area], adopted by [X] teams, enabling [measurable outcome]'. Evidence required: written strategy doc with quarterly review history and cross-team adoption metrics."
});

updateSig('SIG-002', {
  signalText: "Directors: 'Institutionalized design review process across org — reduced production incidents from design gaps by X%'. Threshold: design review required for changes >500 lines or crossing service boundaries."
});

// SIG-003 FAILS charismatic-ineffective-leader test — "Demonstrates strategic thinking" is unfalsifiable
updateSig('SIG-003', {
  signalText: "Build-vs-buy decision documented with 3-year TCO analysis: 'Saved [X] eng-months by buying [tool], redirected capacity to [high-value project]. Decision recorded in ADR with annual revisit criteria.'"
});

updateSig('SIG-004', {
  signalText: "Promo packet: 'Reduced incident rate X% and deployment time Y% through strategic tech debt paydown of [specific systems]'. Evidence: before/after DORA metrics showing velocity improvement."
});

updateSig('SIG-005', {
  signalText: "Directors own SLO culture across their org; EMs own per-service. 'Established SLO framework, reduced Sev1s by X% through error budget discipline'. Target: 99.99% availability for user-facing services; error budget policy freezes launches when budget is exhausted."
});

updateSig('SIG-006', {
  signalText: "Operational maturity signal: 'Anticipated [X]x load for [event], pre-scaled with zero downtime'. Threshold: capacity headroom validated via load test at least 2 weeks before projected demand spike."
});

// SIG-007: already concise, keep
updateSig('SIG-008', {
  signalText: "Table-stakes expectation — absence is a red flag. 'Instrumented [X] services, reduced mean time to diagnose from Y hours to Z minutes'. Standard: every service has SLIs with automated alerting and distributed tracing."
});

updateSig('SIG-009', {
  signalText: "High-visibility promo evidence: 'Led migration of [system] serving [X] QPS from [old] to [new] with zero customer-facing incidents'. Evidence: dual-read/dual-write validation logs and phased rollout metrics."
});

updateSig('SIG-010', {
  signalText: "Director-level: 'Identified [platform opportunity], built team around it, [X] teams adopted, saving [Y] eng-months/quarter across org'. Evidence: platform adoption metrics and maintenance cost reduction."
});

updateSig('SIG-011', {
  signalText: "Conway's Law in practice: 'Realigned service boundaries to team topology, reduced cross-team deploy coordination by X%'. Evidence: deployment frequency improvement and cross-team dependency count reduction."
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

updateAnchor('C3-1', {
  level1Developing: "Scope: Individual. Key Behavior: Follows technical direction set by TL/Staff without contributing architectural input. Artifact: None — relies on others' design docs. Distinguishing Test: Cannot identify technical trade-offs in their team's system without prompting.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Participates in design reviews and forms technical opinions; begins advocating for system health based on data. Artifact: Written comments on design docs with specific technical concerns. Distinguishing Test: Can explain their team's architecture and identify one concrete improvement, but hasn't driven it.",
  level3Competent: "Scope: Team (proactive). Key Behavior: Co-authors tech strategy with TL/Staff; runs design reviews with clear criteria; makes build-vs-buy decisions with TCO analysis. Artifact: Tech strategy doc with current→target→migration path; searchable decision log. Distinguishing Test: Design review criteria exist as a written checklist; build-vs-buy decisions include documented TCO.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Architecture decisions account for cross-team system interactions; design review criteria refined from post-mortems; influences platform direction through written proposals. Artifact: Cross-team architecture proposals with data-backed justification; post-mortem-derived review criteria. Distinguishing Test: Peer EMs seek technical input on their architecture decisions; design review improvements trace to specific production learnings.",
  level5Advanced: "Scope: Org. Key Behavior: Sets multi-quarter technical vision adopted across teams; architecture review process institutionalized; drives platform thinking. Artifact: Org-wide technical strategy doc referenced by multiple teams; institutionalized review process with measured outcomes. Distinguishing Test: Technical governance scales across teams without creating bottlenecks; vision doc updated quarterly with delivery reality checks."
});

updateAnchor('C3-2', {
  level1Developing: "Scope: Individual. Key Behavior: Acknowledges tech debt exists but doesn't track or prioritize it. Artifact: None — tech debt is undocumented. Distinguishing Test: Cannot quantify any tech debt item's impact on delivery velocity or incident risk.",
  level2Emerging: "Scope: Team (informal). Key Behavior: Tracks tech debt informally; makes occasional build-vs-buy arguments with basic cost comparison. Artifact: Informal tech debt list; basic cost comparisons. Distinguishing Test: Can name the top 3 tech debt items but cannot quantify their business impact.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Manages 15-20% sprint capacity for debt; quantifies debt in business terms; makes build-vs-buy decisions with TCO analysis. Artifact: Tech debt registry with cost-of-delay and remediation estimates; documented build-vs-buy decisions. Distinguishing Test: Debt allocation is visible in sprint planning; each registry item has a business impact estimate.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Identifies systemic tech debt spanning team boundaries; proposes remediation with velocity impact measurement; evaluates platform ROI across consuming teams. Artifact: Cross-team debt remediation proposals with before/after velocity data; platform investment ROI analysis. Distinguishing Test: Tech debt allocation defended to leadership with delivery speed correlation data; platform decisions evaluated with multi-team adoption metrics.",
  level5Advanced: "Scope: Org. Key Behavior: Drives strategic tech debt paydown with measurable velocity impact; platform investments create org-wide leverage with documented ROI. Artifact: Org-level tech debt report in business terms; platform adoption dashboard with multi-team ROI. Distinguishing Test: Tech debt investment is a first-class budget line item reviewed alongside feature delivery; platform teams have measurable internal adoption targets."
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

updateAP('AP-01', {
  shortDesc: "EM defers all technical direction to TL/Staff with no opinion on system evolution. Architecture drifts without vision; tech debt compounds unchecked.",
  warningSigns: [
    "No tech strategy doc exists or current doc is >6 months stale",
    "Architecture decisions lack documented rationale (no ADRs)",
    "Design reviews are skipped or EM doesn't attend",
    "Tech debt surfaces only through incidents, never through planned review"
  ],
  impact: "Within 2-3 quarters: team drifts architecturally; senior engineers route around EM for technical decisions; tech debt compounds until velocity drops measurably.",
  recoveryActions: [
    "Co-author tech strategy doc with TL within first month: current state → target state → migration path.",
    "Attend every design review; contribute by bringing business constraints and asking about failure modes.",
    "Build technical opinion through asking questions, not pretending expertise.",
    "Own tech debt visibility: maintain a registry even if you don't write the remediation code."
  ]
});

updateAP('AP-02', {
  shortDesc: "EM inserts themselves into every technical decision, bypassing TL and senior engineers. Creates a single point of failure; team cannot function autonomously.",
  warningSigns: [
    "EM reviews all or most PRs personally",
    "Design docs require EM sign-off before proceeding",
    "Senior engineers escalate decisions they should own; PR approval requires EM sign-off",
    "Team velocity drops measurably when EM is on vacation or in back-to-back meetings"
  ],
  impact: "Within 1-2 quarters: senior engineers leave (not empowered); team velocity drops when EM is unavailable; EM spends >50% time on IC work instead of management.",
  recoveryActions: [
    "Create a Decision Authority Matrix within first month: list 10-15 common decision types and assign each to EM, TL, or IC with explicit escalation criteria.",
    "Remove yourself from PR review for all changes under 500 lines that don't cross service boundaries.",
    "Practice 'what do you think?' before 'here's what we should do.'",
    "Track delegation: measure how many decisions you make vs. delegate per week; target <20% EM-decided within 2 months."
  ]
});

updateAP('AP-38', {
  shortDesc: "EM pushes architectural purity over pragmatic delivery. Systems are technically impressive but ship late; the team gold-plates solutions nobody asked for.",
  warningSigns: [
    "Every project requires a multi-page design doc before any code is written, regardless of scope or reversibility",
    "Simple features get enterprise-grade architecture (e.g., microservices for a single-use endpoint)",
    "Team velocity is below peer teams despite strong engineers",
    "Architecture reviews block PRs for style/pattern issues, not correctness or risk"
  ],
  impact: "Within 1-2 quarters: delivery pace falls below 50% of peer teams; team frustration surfaces in retros; business stakeholders lose confidence in engineering timelines.",
  recoveryActions: [
    "Match architectural rigor to project scope: use a decision matrix mapping project size/reversibility to required documentation level.",
    "Time-box design phases: 1 day for small projects, 1 week for large.",
    "Ask 'what's the simplest thing that could work?' before 'what's the ideal architecture?'",
    "Celebrate pragmatic solutions in team retros alongside technical elegance."
  ]
});

updateAP('AP-49', {
  shortDesc: "Tech debt accumulates invisibly because it's never quantified or communicated in business terms. Leadership sees no reason to fund remediation; velocity degrades until a catastrophic failure forces attention.",
  warningSigns: [
    "No tech debt registry, backlog, or tracking system exists",
    "Tech debt is only discussed during incident post-mortems",
    "Sprint planning has no explicit tech debt allocation",
    "Engineers do guerrilla debt cleanup without visibility or approval",
    "Deployment frequency has decreased >20% over 2 quarters with no corresponding scope increase"
  ],
  impact: "Within 2-3 quarters: deployment frequency drops measurably; incident rate increases from accumulated risk; engineering credibility suffers when leadership is blindsided by velocity collapse.",
  recoveryActions: [
    "Create a tech debt registry within 2 weeks: list top 10 items with business impact estimates (engineer-days lost per sprint, incident risk, blocked features).",
    "Quantify each item: 'This debt costs us X engineer-days per sprint in workarounds and creates Y% probability of incident per quarter.'",
    "Secure minimum 15-20% capacity allocation in next sprint planning cycle.",
    "Track remediation ROI: before/after deployment frequency and incident rate for each resolved item."
  ]
});

updateAP('AP-62', {
  shortDesc: "Technology choices driven by resume appeal rather than problem fit. Team adopts complex tools (Kubernetes for 3 services, microservices for 5 engineers) adding operational complexity that dwarfs engineering value.",
  warningSigns: [
    "Architecture designed for 10x scale the product has never reached",
    "Nobody can articulate what business problem the chosen technology solves better than simpler alternatives",
    "Engineering proposals lead with technology ('let's use Kafka') rather than problem ('we need reliable async processing')",
    "New hire onboarding exceeds 3 months due to stack complexity",
    "Operational on-call burden exceeds 20% of team capacity"
  ],
  impact: "Within 1-2 quarters: operational complexity consumes >30% of team capacity; onboarding time doubles; deployment frequency drops as infrastructure fighting displaces feature work.",
  recoveryActions: [
    "Require every architecture proposal to start with 'What problem does this solve?' and 'What's the simplest solution?'",
    "Write a 1-page TCO analysis for every technology decision: license cost, operational burden (on-call hours), hiring pool size, and cognitive load.",
    "Adopt a 'boring technology' default: proven tools unless there's a quantified reason the established option fails.",
    "Create a team tech radar with explicit adopt/trial/assess/hold categories."
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

updatePlaybook('P-C3-1', {
  whatGoodLooksLike: "Within 1 week: risk flagged with clear options document. Within 2 weeks: leadership approves trade-off (scope, timeline, or resources). Ongoing: weekly progress visible to stakeholders; team executes at sustainable pace. Outcome: if phased, phase 1 delivered on deadline with clear plan for phase 2; team emerges without burnout. Measured by: deployment frequency (metric 1.2), change failure rate (metric 1.4), team burnout signals (metric 2.5)."
});

updatePlaybook('P-C3-2', {
  whatGoodLooksLike: "Within 2 weeks: strangler fig migration plan published. Within 4 weeks: team upskilling started (pairing sessions, training budget). Within 6 weeks: first service migrated as proof of concept. Ongoing: feature development at 70% capacity; weekly migration metrics visible. Outcome: zero production incidents from migration; team has new skills and stronger architecture. Measured by: % services migrated per sprint, deployment frequency (metric 1.2), incident rate during migration, tech debt ratio (metric 8.6)."
});

updatePlaybook('P-C3-3', {
  whatGoodLooksLike: "By month 6: every team member knows their next role — zero involuntary departures. By month 9: 90%+ users migrated with minimal support tickets. Throughout: product quality maintained until cutover; user communication transparent and empathetic. Outcome: team members report the process was handled well; NPS impact minimized. Measured by: user migration completion rate, support ticket volume, team retention, user satisfaction."
});

updatePlaybook('P-C3-4', {
  whatGoodLooksLike: "Within 1 month: debt register created with scored items; 70/20/10 allocation adopted in sprint planning. Within 3 months: measurable improvement in deploy frequency or cycle time from targeted debt reduction. Ongoing: living debt register referenced by product during planning; 70/20/10 allocation respected in sprint planning. Measured by: deployment frequency (metric 2.3), cycle time (metric 3.2), debt registry item count trend."
});

updatePlaybook('P-C3-5', {
  whatGoodLooksLike: "Within 3-4 weeks: decision made with documented rationale. ADR published with TCO analysis covering 3-year horizon including maintenance and opportunity cost. Team supports decision because they participated in evaluation via proof-of-concept. Within expected timeline: system in production. At 1-year review: decision still holds, or was explicitly revisited when conditions changed. Measured by: time-to-production vs. projection, ongoing maintenance cost vs. TCO estimate."
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

updateIQ('IQ-09', {
  lookFor: [
    "Describes specific business constraints they brought into a technical discussion (e.g., deadline, compliance requirement, cost target)",
    "Shows how they added value without overriding the tech lead — specific example of complementary input",
    "Names the architectural trade-off and explains how it maps to team delivery capability",
    "Reviewed the tech lead's proposal critically with specific questions, not just rubber-stamped it"
  ],
  redFlags: [
    "Cannot describe their team's system architecture at service-boundary level",
    "Either 'I trust my tech lead completely' (no engagement) or describes making the technical decision themselves",
    "Takes sole credit for architectural decisions without mentioning the tech lead or engineers",
    "Cannot explain how architecture choices affected team structure, ownership, or delivery speed"
  ]
});

updateIQ('IQ-12', {
  lookFor: [
    "Names a specific governance mechanism they use (RFC process, design review board, ADR template)",
    "Allocates explicit capacity for architectural work — can state the percentage or hours reserved",
    "Describes a specific cross-team alignment forum they run or participate in",
    "Ties architecture evolution to quantified business growth scenarios, not vague 'future-proofing'"
  ],
  redFlags: [
    "No proactive architecture planning; only responds to scaling emergencies after they hit",
    "Relies on a single architect rather than distributing architectural capability across teams",
    "Cannot name the top 3 scaling limitations in their current architecture",
    "Architecture decisions made in team silos — no cross-team coordination mechanism exists"
  ]
});

updateIQ('IQ-70', {
  lookFor: [
    "Uses a documented evaluation framework with explicit criteria and weights",
    "TCO calculation includes ongoing maintenance (20-30% annual cost) and opportunity cost of engineers not building product",
    "Engineering team participated in evaluation via proof-of-concept, not just EM deciding",
    "Plans for migration and adoption rollout, not just vendor selection",
    "Applied core-vs-context lens: built what differentiates, bought what doesn't"
  ],
  redFlags: [
    "Always defaults to building (or always to buying) regardless of context",
    "TCO excludes maintenance costs or opportunity costs — only considers initial build/license cost",
    "Made the decision unilaterally or in a small group without team proof-of-concept",
    "No documented alternatives analysis — cannot name other options considered"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT.JSON ────────────────────────────────────────────────
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c3sa = sa.find(s => s.capabilityId === 'C3');
if (c3sa) {
  c3sa.behavioralAnchors[0].description = "Defers all architecture decisions to senior ICs; cannot name the top 3 technical risks in their system; does not attend or contribute to design reviews";
  c3sa.behavioralAnchors[1].description = "Understands basic system components and follows technical discussions; asks clarifying questions about scalability or reliability in design reviews; can diagram their team's service dependencies";
  console.log('  ✓ C3 self-assessment L1-L2 anchors sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT-GUIDANCE.JSON ───────────────────────────────────────────
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c3mg = mg.find(m => m.capabilityId === 'C3');
if (c3mg) {
  // Strip company references from leading indicators
  c3mg.leadingIndicators = [
    "Architecture Decision Records (ADRs) created for all major changes",
    "Tech debt backlog is triaged and prioritized quarterly",
    "System reliability targets (SLOs) are defined for all critical services",
    "Architecture review board meets regularly with clear decision log",
    "Design doc completion rate and review turnaround time tracked",
    "Tech debt registry maintained with business impact estimates per item"
  ];
  // Strip company references from lagging indicators
  c3mg.laggingIndicators = [
    "System uptime meets defined SLO targets (e.g., 99.9%)",
    "Median time to integrate a new service decreased over 6 months",
    "Tech debt ratio (debt work / total work) remains within target band",
    "No architecture-related production incidents recurring after fix",
    "Design doc adoption rate and architecture decision reversal frequency tracked as quality signals",
    "Tech debt ratio stable or improving quarter-over-quarter"
  ];
  console.log('  ✓ C3 measurement guidance indicators cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING-PATHWAYS.JSON ─────────────────────────────────────────────
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c3lp = lp.find(l => l.capabilityId === 'C3');
if (c3lp) {
  // Clean foundational resource descriptions (strip marketing copy)
  c3lp.foundational[0].description = "Covers consistency, partitioning, replication, and stream processing for distributed data systems. Essential mental models for evaluating architecture trade-offs.";
  c3lp.foundational[1].description = "Covers complexity management through deep modules, information hiding, and strategic vs. tactical programming. Directly applicable to design review criteria.";
  c3lp.foundational[2].description = "Walkthrough of large-scale system design problems; builds mental models for distributed systems including load balancing, caching, and data partitioning.";
  c3lp.foundational[3].description = "Covers architecture styles (monolith, microservices, event-driven), architecture characteristics (scalability, reliability), and the architect's role in modern organizations.";

  // Clean practical resource descriptions
  c3lp.practical[0].description = "Lightweight template for documenting architecture decisions: context, decision, status, and consequences. Enables institutional memory and prevents relitigating settled decisions.";
  c3lp.practical[1].description = "Facilitated workshop: participants present system designs and receive structured feedback on scalability, reliability, operability, and business alignment.";
  c3lp.practical[2].description = "Take an existing system design and systematically identify failure modes, single points of failure, and cascading failure risks; propose mitigations for each.";

  // Clean advanced resource descriptions
  c3lp.advanced[0].description = "Analysis of large-scale system migrations (monolith to microservices, data center to cloud, legacy rewrites) covering both technical and organizational strategies.";
  c3lp.advanced[1].description = "Join or establish an architecture review board that evaluates cross-cutting technical decisions for consistency and quality across teams.";
  c3lp.advanced[2].description = "Pair with a Staff or Principal engineer to develop trade-off evaluation skills, navigate design ambiguity, and influence technical direction.";
  c3lp.advanced[3].description = "Framework for designing systems that support guided, incremental change across multiple dimensions as business requirements evolve.";

  console.log('  ✓ C3 learning pathways descriptions cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C3 deep cycle complete. All files updated.');

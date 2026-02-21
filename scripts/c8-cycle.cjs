#!/usr/bin/env node
/**
 * C8 (Incidents, Risk & Reliability) Deep Cycle
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
function readJSON(file) { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8')); }
function writeJSON(file, data) { fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8'); }

// ─── 1. CAPABILITIES ───
console.log('Processing capabilities.json...');
let caps = readJSON('capabilities.json');
let c8 = caps.find(c => c.id === 'C8');
c8.description = "Assessed by: incident MTTR, post-mortem action completion rate, on-call page volume, game day frequency, and error budget burn rate. Absence causes: prolonged outages, repeat incidents from unaddressed root causes, on-call burnout, and unmanaged operational risk.";
c8.enabledBy = ["C3"];
writeJSON('capabilities.json', caps);
console.log('  ✓ C8 description rewritten');

// ─── 2. OBSERVABLES ───
console.log('Processing observables.json...');
let obs = readJSON('observables.json');
function updateObs(id, changes) {
  const o = obs.find(x => x.id === id); if (!o) return;
  Object.assign(o, changes); console.log(`  ✓ ${id}`);
}

updateObs('C8-O1', {
  why: "Without clear roles, incidents devolve into chaos with everyone talking and nobody deciding. Defined ICS roles (IC, Comms, Ops) practiced through regular game days separate a 30-minute resolution from a 4-hour fire drill.",
  how: "Define ICS roles (Incident Commander, Comms Lead, Ops Lead), practice with quarterly game days using realistic scenarios, debrief every incident for process improvements. Assign IC on-call rotation separate from engineering on-call. Validate with metric 1.3 (Mean Time to Restore) and 3.6 (Incident Rate by Severity).",
  expectedResult: "Within 2 quarters: Sev1 MTTR reduced by 40%+; clear stakeholder communication during every incident; team confident in handling production emergencies."
});

updateObs('C8-O2', {
  why: "Blame-oriented post-mortems drive incidents underground; incomplete follow-through means repeat failures. Teams that blame people for incidents learn to hide them; teams that complete >90% of action items see repeat incident rates drop to near-zero.",
  how: "Run blameless methodology with structured template (timeline, 5-whys, contributing factors, systemic action items). Assign owners and deadlines to every action item. Track completion rate weekly. Conduct quarterly meta-review of post-mortem themes. Validate with metric 3.7 (Post-Incident Action Item Completion Rate) and 1.4 (Change Failure Rate)."
});

updateObs('C8-O3', {
  why: "High page volume drives burnout and attrition; on-call shouldn't be a source of dread. When on-call load exceeds thresholds, the team earns the right to stop feature work and fix reliability — making on-call health a first-class engineering concern.",
  how: "Track pages per rotation, off-hours pages, and false positive rate on a dashboard. Run noise reduction sprints when thresholds exceeded. Implement compensatory time off. Use error budget policy to justify reliability investment when on-call degrades. Validate with metric 5.6 (On-Call Burden)."
});

updateObs('C8-O4', {
  why: "Reactive risk management means you only learn from failures, not prevent them. Pre-mortem exercises before major launches — imagining failure before it happens and building mitigations — are cheaper by orders of magnitude than learning from production incidents.",
  how: "Run pre-mortem exercises before every major launch (>100 users affected or new infrastructure dependency) using structured FMEA template. Identify failure modes, assign severity × probability scores, build mitigations for top risks. Include launch readiness checklist: observability, rollback plan, on-call coverage, communication plan. Validate with metric 3.6 (Incident Rate by Severity)."
});

updateObs('C8-O5', {
  why: "Regulatory violations carry existential risk — fines, lawsuits, lost customer trust. Reactive compliance is always more expensive and disruptive than proactive frameworks.",
  how: "Map applicable regulations (GDPR, SOX, HIPAA, PCI) to engineering practices using a compliance requirements matrix. Automate compliance checks in CI/CD where possible (PII detection, data retention enforcement, audit trail). Review matrix quarterly and after any regulatory change. Validate with metric 3.5 (SLO Compliance Rate)."
});

writeJSON('observables.json', obs);

// ─── 3. CALIBRATION SIGNALS ───
console.log('Processing calibration-signals.json...');
let sigs = readJSON('calibration-signals.json');
function updateSig(id, changes) {
  const s = sigs.find(x => x.id === id); if (!s) return;
  Object.assign(s, changes); console.log(`  ✓ ${id}`);
}

updateSig('SIG-030', {
  signalText: "Response speed: 'Implemented ICS model, reduced mean Sev1 time-to-mitigation from [X] hours to [Y] minutes'. Benchmark: Sev1 MTTR <1 hour; ICS roles assigned within 5 minutes of page."
});

updateSig('SIG-031', {
  signalText: "Follow-through completeness: the real signal is action item completion, not the post-mortem document itself. 'Post-mortem action item completion rate >90% within 14 days, repeat incidents of same root cause reduced to zero.'"
});

updateSig('SIG-032', {
  signalText: "Proactive on-call improvement: on-call health is a retention signal. High page volume + attrition = EM failure. 'Reduced off-hours pages by X% through noise reduction and architecture improvement.' Threshold: <2 off-hours pages per night."
});

updateSig('SIG-033', {
  signalText: "Launch readiness is a maturity signal — skipping it creates visible risk. 'Zero Sev1 incidents on launches in [X] quarters through readiness discipline'. Standard: launch readiness review mandatory for any launch affecting >100 users or introducing new infrastructure dependency."
});

updateSig('SIG-034', {
  signalText: "'Identified and mitigated [X] failure modes proactively — prevented estimated [Y] incidents'. Evidence: FMEA document with scored failure modes, mitigations implemented before launch."
});

updateSig('SIG-035', {
  signalText: "Cross-org risk awareness: 'Mapped [X] critical dependencies, implemented fallbacks — survived upstream service outage with zero customer impact'. Evidence: dependency map with health checks and tested fallback strategies."
});

writeJSON('calibration-signals.json', sigs);

// ─── 4. RUBRIC ANCHORS ───
console.log('Processing rubric-anchors.json...');
let anchors = readJSON('rubric-anchors.json');
function updateAnchor(id, changes) {
  const a = anchors.find(x => x.anchorId === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAnchor('C8-1', {
  level1Developing: "Scope: Individual. Key Behavior: Reacts to incidents without defined process; post-mortems blame individuals or don't happen; on-call health unmonitored. Artifact: None. Distinguishing Test: Cannot describe incident command roles or the team's on-call page rate.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Participates in incident response; post-mortems attempted but action items incomplete; on-call load tracked but not actively managed. Artifact: Post-mortem documents exist but completion tracking is informal. Distinguishing Test: Post-mortems happen but action item completion rate is below 50%.",
  level3Competent: "Scope: Team (systematic). Key Behavior: ICS roles defined and practiced; blameless post-mortems with >90% action item completion; on-call health maintained at <2 off-hours pages/night. Artifact: ICS roster, post-mortem template with tracked action items, on-call health dashboard. Distinguishing Test: Repeat incidents from same root cause drop to near-zero; on-call is viewed as sustainable.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Incident response patterns shared across teams; post-mortem themes analyzed quarterly for systemic improvements; on-call excellence is a team differentiator. Artifact: Cross-team incident pattern analysis; on-call health benchmarks across teams. Distinguishing Test: Other teams adopt incident response practices; MTTR consistently below area average.",
  level5Advanced: "Scope: Org. Key Behavior: Incident management culture institutionalized; error budget model drives reliability investment; org-wide MTTR improving year-over-year. Artifact: Org-wide incident management framework with measured outcomes. Distinguishing Test: Reliability metrics used as first-class business KPIs; error budget policy automatically governs feature/reliability trade-offs."
});

updateAnchor('C8-2', {
  level1Developing: "Scope: Individual. Key Behavior: Risk management is purely reactive — learns only from production incidents; no pre-launch risk assessment. Artifact: None. Distinguishing Test: Cannot identify the top 3 failure modes in their system.",
  level2Emerging: "Scope: Team (emerging). Key Behavior: Conducts ad hoc risk assessments before major launches; beginning to track vendor dependencies; awareness of compliance requirements. Artifact: Launch checklist exists but not consistently used. Distinguishing Test: Can name critical dependencies but has no tested fallback for any of them.",
  level3Competent: "Scope: Team (systematic). Key Behavior: FMEA before every major launch; vendor risk registry maintained; compliance requirements mapped to engineering practices; quarterly game days run. Artifact: FMEA documents, vendor risk registry, compliance matrix, game day results. Distinguishing Test: Zero Sev1 incidents on launches; game days reveal and fix gaps proactively.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Risk management practices shared across teams; game days include cross-team failure scenarios; vendor management coordinated at area level. Artifact: Cross-team risk register; shared game day exercises. Distinguishing Test: Cross-team incidents handled smoothly; vendor risk mitigation coordinated rather than duplicated.",
  level5Advanced: "Scope: Org. Key Behavior: Proactive resilience is an organizational norm; chaos engineering culture established; error budgets govern feature/reliability trade-offs. Artifact: Org-wide resilience framework with chaos engineering program. Distinguishing Test: Resilience investment justified with data; org handles major incidents without heroics."
});

writeJSON('rubric-anchors.json', anchors);

// ─── 5. ANTI-PATTERNS ───
console.log('Processing anti-patterns.json...');
let aps = readJSON('anti-patterns.json');
function updateAP(id, changes) {
  const a = aps.find(x => x.id === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAP('AP-04', {
  shortDesc: "EM prioritizes feature velocity over reliability until incidents force attention. On-call degrades, post-mortems are skipped or incomplete, and the team enters a cycle of firefighting.",
  impact: "Within 2-3 quarters: incident rate increases; on-call becomes unsustainable; senior engineers leave due to burnout; stakeholder trust erodes as outages accumulate.",
  recoveryActions: [
    "Track and publish on-call page rate, MTTR, and post-mortem action completion alongside velocity metrics.",
    "Implement error budget policy: when error budget is consumed, feature work pauses until reliability improves.",
    "Reserve minimum 20% capacity for reliability work — protect this in sprint planning.",
    "Frame reliability investment in business terms: 'Each Sev1 costs approximately X hours of engineering time and Y in customer impact.'"
  ]
});

updateAP('AP-06', {
  shortDesc: "One or two engineers handle all incidents because they're fastest, creating a single point of failure. The heroes burn out, nobody else learns, and the team is paralyzed when heroes are unavailable.",
  impact: "Within 1-2 quarters: heroes burn out or leave; remaining team can't handle incidents independently; MTTR spikes when heroes are unavailable; knowledge stays in one person's head.",
  recoveryActions: [
    "Implement mandatory on-call rotation — every team member takes on-call, including senior engineers who currently dodge it.",
    "Pair junior engineers with experienced ones during on-call rotations for the first 2 cycles.",
    "Require runbooks for every alert so incident response doesn't depend on tribal knowledge.",
    "Track incident resolution by person — if one person handles >40% of incidents, redistribute."
  ]
});

updateAP('AP-07', {
  shortDesc: "Post-mortems focus on finding someone to blame rather than systemic causes. Team learns to hide incidents and near-misses; repeat failures continue because root causes go unaddressed.",
  impact: "Within 1-2 quarters: incident reporting drops (hidden incidents); same failures repeat; team psychological safety erodes; voluntary near-miss reporting stops entirely.",
  recoveryActions: [
    "Rewrite post-mortem template to remove individual names from root cause section — focus on systems, processes, and tooling.",
    "EM explicitly models blameless language in every post-mortem they attend.",
    "Track repeat incident rate as the primary post-mortem effectiveness metric — if incidents repeat, the post-mortem failed.",
    "Celebrate near-miss reporting publicly — reward the behavior you want to see."
  ]
});

updateAP('AP-57', {
  shortDesc: "Team normalizes high alert volume — hundreds of alerts per week, most ignored. Real signals drown in noise; when a genuine incident occurs, it's missed because alerts have lost credibility.",
  impact: "Within 1-2 quarters: genuine incidents missed because on-call ignores pages; MTTR increases as alert fatigue grows; on-call engineers develop habit of silencing alerts without investigating.",
  recoveryActions: [
    "Run an alert audit: classify every alert from the last 30 days as actionable, noise, or duplicate.",
    "Delete or silence all non-actionable alerts immediately — target alert-to-action ratio of 1:2 or better.",
    "Set a monthly alert hygiene review cadence with the team.",
    "Track alert volume and false positive rate on the on-call dashboard; set threshold: <2 off-hours pages per night."
  ]
});

updateAP('AP-61', {
  shortDesc: "Post-mortems are written but never referenced; the same incidents recur because learnings aren't integrated into team practices. Post-mortem documents accumulate in a wiki nobody reads.",
  impact: "Within 2-3 quarters: repeat incidents from known root causes; team loses faith in post-mortem process; action items are completed but systemic patterns go unaddressed.",
  recoveryActions: [
    "Run quarterly meta-review of post-mortem themes — identify the top 3 recurring patterns across incidents.",
    "Create an incident knowledge base linked to runbooks — every resolved incident should improve a runbook.",
    "Track repeat incident rate as the primary measure of post-mortem effectiveness.",
    "Reference previous post-mortems in new post-mortems when patterns overlap — make the connection explicit."
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

updatePlaybook('P-C8-1', {
  whatGoodLooksLike: "Within 5 minutes: on-call IC contacted and confirmed; EM notified but not required to take command. Within 1 hour: incident mitigated by on-call team using existing runbooks. Within 24 hours: EM reviews incident response quality and coaches on gaps. Outcome: team handles incidents independently; EM's vacation proves the process works. Measured by: MTTR during EM absence vs. presence, team confidence survey."
});

updatePlaybook('P-C8-2', {
  whatGoodLooksLike: "Within 15 minutes: incident detected and IC assigned. Within 1 hour: mitigation applied (rollback, feature flag, or fix-forward). Within 48 hours: blameless post-mortem completed with root cause identified. Within 2 weeks: all action items assigned, tracked, and >90% completed. Outcome: the deploy failure becomes a process improvement catalyst, not a blame event. Measured by: MTTR, post-mortem action completion rate, change failure rate trend."
});

updatePlaybook('P-C8-4', {
  whatGoodLooksLike: "Within 2 weeks: ICS roles defined and documented. Within 1 month: first game day completed; runbook gaps identified and fixed. Within 1 quarter: team has handled at least one real incident using the new process. Outcome: team is prepared before the first major outage, not during it. Measured by: game day gap count, runbook coverage, team incident readiness confidence."
});

updatePlaybook('P-C8-5', {
  whatGoodLooksLike: "Within 2 weeks: on-call health metrics dashboarded (page volume, off-hours pages, false positive rate). Within 1 month: noise reduction sprint completed; top 5 noisy alerts fixed or silenced. Within 1 quarter: off-hours pages <2 per night; on-call satisfaction survey shows improvement. Outcome: on-call viewed as sustainable, not punitive; zero requests to leave the rotation. Measured by: on-call burden (metric 5.6), alert-to-action ratio, on-call satisfaction."
});

writeJSON('playbooks.json', playbooks);

// ─── 7. INTERVIEW QUESTIONS ───
console.log('Processing interview-questions.json...');
let iqs = readJSON('interview-questions.json');
function updateIQ(id, changes) {
  const q = iqs.find(x => x.id === id); if (!q) return;
  Object.assign(q, changes); console.log(`  ✓ ${id}`);
}

updateIQ('IQ-29', {
  lookFor: [
    "Describes specific ICS roles they assigned and how communication flowed during the incident",
    "Post-mortem focused on systemic causes, not individual blame — names a specific systemic fix",
    "Can state the MTTR and compare it to their target",
    "Describes how they improved the process after the incident — specific change implemented"
  ],
  redFlags: [
    "Cannot describe their role vs. the IC role during the incident",
    "Post-mortem blamed an individual engineer rather than identifying systemic causes",
    "No measurement of incident duration or improvement over time",
    "Incident response was ad hoc — no defined process or roles"
  ]
});

updateIQ('IQ-103', {
  lookFor: [
    "Uses structured post-mortem template with timeline, 5-whys, and systemic action items",
    "Tracks action item completion rate — can state the number",
    "Describes how post-mortem learnings changed team practices, not just fixed the immediate issue",
    "Models blameless language — can give an example of redirecting blame to systems"
  ],
  redFlags: [
    "Post-mortems are irregular or skipped for 'small' incidents",
    "Action items assigned but completion not tracked",
    "Post-mortem focuses on 'who' rather than 'what' and 'why'",
    "Cannot name a specific process change that came from a post-mortem"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT ───
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c8sa = sa.find(s => s.capabilityId === 'C8');
if (c8sa) {
  c8sa.behavioralAnchors[0].description = "Reacts to incidents without defined roles or process; post-mortems blame individuals or don't happen; on-call page volume unknown";
  c8sa.behavioralAnchors[1].description = "Participates in incident response but roles are ad hoc; post-mortems happen inconsistently with <50% action item completion; on-call load tracked but not actively managed";
  console.log('  ✓ C8 self-assessment L1-L2 sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT GUIDANCE ───
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c8mg = mg.find(m => m.capabilityId === 'C8');
if (c8mg) {
  // Strip company references
  c8mg.leadingIndicators = c8mg.leadingIndicators.map(i =>
    i.replace(/\s*(?:Google SRE|Amazon|Netflix|at Google|at Amazon)[^.]*\./g, '').trim()
  );
  c8mg.laggingIndicators = c8mg.laggingIndicators.map(i =>
    i.replace(/\s*(?:Google SRE|Amazon|Netflix|at Google|at Amazon)[^.]*\./g, '').trim()
  );
  console.log('  ✓ C8 measurement guidance cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING PATHWAYS ───
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c8lp = lp.find(l => l.capabilityId === 'C8');
if (c8lp) {
  c8lp.foundational[0].description = "Covers SRE principles: SLOs, error budgets, toil management, incident response, and blameless post-mortems. The foundational text for reliability engineering.";
  c8lp.foundational[1].description = "Practical incident management: ICS roles, communication during incidents, post-incident learning, and building incident response muscle memory.";
  if (c8lp.foundational[2]) c8lp.foundational[2].description = "Human factors in incidents: how cognitive biases, organizational pressures, and system complexity contribute to failures. Shifts focus from blame to systemic understanding.";
  if (c8lp.foundational[3]) c8lp.foundational[3].description = "Principles and practices of chaos engineering: controlled experiments to discover systemic weaknesses before they cause production incidents.";
  console.log('  ✓ C8 learning pathways cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C8 deep cycle complete.');

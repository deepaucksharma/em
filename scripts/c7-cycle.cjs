#!/usr/bin/env node
/**
 * C7 (Decision Framing & Communication) Deep Cycle
 * Applies ultra-strict content validation across all C7 items.
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
let c7cap = caps.find(c => c.id === 'C7');
c7cap.description = "Assessed by: decision memo quality and approval rates, exec presentation crisp communication, proactive status updates, bad news flag timing, roadmap transparency, and DACI/RFC adoption. Absence causes: decisions revisited endlessly, stakeholder misalignment, late problem escalation, poor exec perception, and wasted organizational energy on rework.";
c7cap.enabledBy = ["C3"];
writeJSON('capabilities.json', caps);
console.log('  ✓ C7 description rewritten to diagnostic format');

// ─── 2. OBSERVABLES.JSON ────────────────────────────────────────────────────
console.log('Processing observables.json...');
let obs = readJSON('observables.json');

function updateObs(id, changes) {
  const o = obs.find(x => x.id === id);
  if (!o) { console.error(`  ✗ Observable ${id} not found`); return; }
  Object.assign(o, changes);
  console.log(`  ✓ ${id} updated`);
}

updateObs('C7-O1', {
  why: "Vague proposals get sent back; options without trade-offs don't enable real decisions. The written proposal is where thinking happens — when it takes time to write it down clearly, weak reasoning surfaces early and gets fixed before the meeting.",
  how: "Create a decision memo template with required sections: context, options (minimum 3 including 'do nothing'), quantified trade-offs, recommended path, risks, and reversibility assessment. Lead with recommendation and 'why now,' then supporting data. For every significant decision (>1 engineer-week of effort), produce a written artifact before scheduling a review meeting. Circulate 48 hours before the meeting with a 'silent reading' period. Target first-meeting approval rate >80% as a quality signal. Validate with metric 8.1 (OKR Achievement Rate).",
  expectedResult: "Proposals get approved in first review meeting; proposals are clear enough that stakeholders understand the trade-offs before the meeting; seen as a strategic partner, not just an implementer; decisions stick because stakeholders understood the reasoning upfront."
});

updateObs('C7-O2', {
  why: "Engineering detail overwhelms executives; executive brevity leaves engineers without context. The same decision needs three different framings — 1-slide executive summary for VPs (30-second read), 3-slide peer briefing (5-minute read), full technical appendix for ICs (15-minute read).",
  how: "Apply pyramid principle: conclusion first for execs (3 bullets, business impact), technical trade-offs for peers, full implementation context for ICs. Maintain 3 versions of key communications in a shared template. Practice the 'so what' test on every slide and paragraph before sending. For recurring updates (weekly status, quarterly reviews), use a consistent template so the audience learns where to find information. Solicit feedback quarterly from each audience tier: 'Is my communication at the right altitude for you?' Validate with metric 5.1 (Developer Satisfaction Score).",
  expectedResult: "Executives understand and support direction; engineers have implementation context; zero instances per quarter of 'too much detail' or 'not enough context' feedback from any audience tier."
});

updateObs('C7-O3', {
  why: "Leaders who learn about problems from others lose trust fast. The 'no surprises' principle is non-negotiable — your manager should never learn about a problem in your area from someone else's status update.",
  how: "Send weekly written update structured as: top 3 outcomes (not activities), top 3 risks with mitigation status, specific asks. Flag bad news within 24 hours, never in a weekly summary. Maintain a consistent template for regularity and predictability. Validate with metric 5.1 (Developer Satisfaction Score).",
  expectedResult: "Leadership trusts you; more autonomy and scope granted proactively; problems discussed early when options still exist; manager's manager knows your name for the right reasons."
});

updateObs('C7-O4', {
  why: "Hiding bad news to 'try to fix it first' is how surprises destroy credibility. Structured decision-making requires surfacing risks early with data — the penalty for a late surprise far exceeds the penalty for an early honest assessment.",
  how: "Immediately upon discovery (within 4 hours for Sev1, within 24 hours for Sev2): send a structured bad-news notification using a template with sections: what happened, customer/business impact (quantified), preliminary root cause, current mitigation actions, what you need from leadership, and next update ETA. Own it even if the root cause wasn't your team — accountability builds credibility. Follow up with a written post-incident summary within 48 hours using blameless retrospective format. Track time-from-discovery-to-notification as a personal SLA (target <4 hours for Sev1). Validate with metric 1.3 (Mean Time to Restore).",
  expectedResult: "Leadership trusts you to handle problems; they learn issues from you first; credibility survives setbacks; zero instances per quarter where leadership learns about a problem from someone other than you."
});

updateObs('C7-O5', {
  why: "Executives have short attention spans; burying the lead wastes their time and your opportunity. Presentations that don't drive a decision within the allotted slot are presentations that failed.",
  how: "Structure every exec presentation using pyramid principle: conclusion on slide 1, 2-3 key data points on slide 2, appendix for deep-dives. Use a consistent 5-slide template (Situation, Recommendation, Data, Risks, Ask) in a shared tool. Anticipate the question behind the question by pre-briefing a trusted exec peer 24 hours before the meeting. Rehearse to fit within 50% of allotted time, leaving room for discussion. Measure success by decisions made in meeting (target: decision reached in first review >80% of the time). Validate with metric 8.1 (OKR Achievement Rate).",
  expectedResult: "Executives understand and support initiatives; on their radar for higher-scope opportunities; strong executive presence opens doors to Director+ scope and visibility."
});

updateObs('C7-O6', {
  why: "Without clear decision ownership, decisions get revisited endlessly or made by whoever argues loudest. Every significant decision needs a written artifact with explicit ownership and a defined comment/escalation process.",
  how: "Name DACI roles explicitly for every decision above threshold (suggest: >3 engineer-days of effort or cross-team impact). Maintain an RFC template with required sections: context, options, recommendation, risks. Establish a 5-day comment period with clear escalation path. Maintain a searchable decision log. Use templates (Google Docs or Confluence) to standardize the format. Validate with metric 2.6 (Blocked Work Rate).",
  expectedResult: "Decisions made efficiently and stick; decision revisitation drops below 10%; new hires can understand why things are the way they are by reading the decision log; no decision re-opens after decision date without explicit record of changed facts."
});

updateObs('C7-O7', {
  why: "Hidden trade-offs create surprise scope cuts and erode stakeholder trust. Stakeholders who discover trade-offs through omission lose confidence in the team's transparency and escalate to leadership.",
  how: "Every quarterly planning doc must include a mandatory 'What we are NOT doing' section listing de-prioritized items with rationale. Maintain a visible priority stack rank ordered by business impact, shared with all stakeholders. New requests require an explicit trade-off: 'To add X, we must deprioritize Y — do you approve?' documented in the request ticket. Review the stack rank in a monthly stakeholder sync (30 minutes) to ensure alignment. Publish the roadmap with 'not doing' section to all stakeholders within 1 week of planning completion. Validate with metric 8.1 (OKR Achievement Rate).",
  expectedResult: "Informed decisions; no surprise cuts; stakeholders own trade-offs jointly. Zero roadmap items cut without prior stakeholder notification; trade-off document exists for every planning cycle; stakeholder satisfaction with communication >4/5."
});

// Update embedded calibration signal content to match standalone file
for (const o of obs.filter(x => x.capabilityId === 'C7')) {
  if (!o.calibrationSignals) continue;
  for (const sig of o.calibrationSignals) {
    // Fix known ID mismatches (embedded → standalone)
    const idMap = {
      'SIG-064': 'SIG-061',
      'SIG-115': 'SIG-103',
      'SIG-133': 'SIG-109',
      'SIG-138': 'SIG-111',
      'SIG-114': 'SIG-104',
      'SIG-117': 'SIG-107',
      'SIG-178': 'SIG-177',
      'SIG-118': 'SIG-108',
      'SIG-121': 'SIG-110',
      'SIG-131': 'SIG-112',
      'SIG-132': 'SIG-113',
      'SIG-101': 'SIG-99',
      'SIG-102': 'SIG-100'
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

updateSig('SIG-061', {
  signalText: "Judgment signal: 'Identified [X] issues in first month, addressed critical ones immediately, built 90-day plan for systemic changes'. Evidence: written decision memo with options, trade-offs, and recommendation; proposal approved in first review meeting."
});

updateSig('SIG-103', {
  signalText: "Director-level framing: every proposal should pass the 'so what' test. 'Secured [resources] by framing [project] as [business impact]'. Evidence: investment proposals include ROI and business outcome translation."
});

updateSig('SIG-109', {
  signalText: "Applied reversibility thinking: 'Classified [X] as reversible, shipped in 2 days instead of 2 weeks. Classified [Y] as irreversible, invested 3 weeks in analysis — avoided $Zm mistake'. Evidence: reversibility assessment in decision documents."
});

updateSig('SIG-111', {
  signalText: "Director-level differentiation: same update tailored to 3 audiences — exec summary for VP (3 bullets, business impact), team-level detail for peers (technical trade-offs), and full context for IC contributors (implementation specifics). Evidence: skip-level feedback confirms communication is at the right level for each audience."
});

updateSig('SIG-104', {
  signalText: "The #1 lever for getting more scope and responsibility. Manager feedback: 'Always knows what's happening, no surprises'. Evidence: weekly proactive status updates with outcomes, risks, and asks documented."
});

updateSig('SIG-107', {
  signalText: "Trust is built by how you handle bad news. 'Flagged [project slip] early with mitigation plan, leadership appreciated transparency'. Evidence: time-from-discovery-to-notification <4 hours for Sev1; structured bad-news notification with impact assessment and options."
});

updateSig('SIG-177', {
  signalText: "Observed in exec reviews and skip-level conversations: delivers updates with appropriate altitude (business impact, not implementation detail), surfaces risks proactively with options rather than waiting to be asked, handles tough questions with composure."
});

updateSig('SIG-108', {
  signalText: "'Strong executive presence in [review type]' — opens doors to Director+ scope and visibility. Evidence: presentations drive decisions; invited to strategy discussions; promotion packet notes consistent executive communication quality."
});

updateSig('SIG-110', {
  signalText: "The unlock for Director → Sr. Director/VP trajectory. 'Consistently delivers crisp executive communication' — noted in promo discussions. Evidence: presentations result in >80% first-meeting decisions; repeat invitations to exec forums."
});

updateSig('SIG-112', {
  signalText: "Directors use DACI for org-level decisions; EMs use for team-level. 'Implemented DACI framework, reduced decision revisitation by X%'. Evidence: DACI roles explicitly named; decision log maintained and searchable; zero decisions revisited without record of changed facts."
});

updateSig('SIG-113', {
  signalText: "Engineering maturity signal: 'Established RFC culture, [X] design docs/quarter, referenced in [Y] onboarding sessions'. Evidence: RFC template with required sections; decision log used in onboarding; engineers can articulate rationale for existing decisions."
});

updateSig('SIG-099', {
  signalText: "Communication quality differentiates in calibration. 'Stakeholder feedback: team roadmap is the clearest in the org'. Evidence: roadmap includes explicit 'what we are NOT doing' section; stakeholder satisfaction with communication >4/5."
});

updateSig('SIG-100', {
  signalText: "Maturity signal: 'Recommended de-prioritizing [X] to invest in [Y], presented trade-off to [VP], resulting in [Z] better outcome'. Evidence: trade-off decisions documented and approved by stakeholders; roadmap reflects decisions."
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

updateAnchor('C7-1', {
  level1Developing: "Scope: Individual. Key Behavior: Proposals lack structure; options presented without trade-offs; no written decision artifacts. Artifact: None — decisions made verbally. Distinguishing Test: Cannot produce a written decision memo; stakeholders report ambiguity about what was decided.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Beginning to write decision memos; options presented but trade-offs quantified incompletely; decisions sometimes revisited. Artifact: Occasional decision memos, inconsistent format. Distinguishing Test: Proposals sometimes require rework before approval; can articulate rationale but decision memo wasn't sufficient first time.",
  level3Competent: "Scope: Team (proactive). Key Behavior: Decision memos template followed consistently; options with quantified trade-offs; first-meeting approval rate >80%; roadmap includes 'what we are NOT doing.' Artifact: Searchable decision log; consistent memo template; roadmap with trade-off section. Distinguishing Test: Decisions don't get revisited; stakeholders understand and accept trade-offs; new hires can read decision log to understand system rationale.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Decision processes improved based on past errors; DACI framework adopted across teams; exec communication shapes organizational strategy. Artifact: Cross-team decision framework; DACI role assignments for org-level decisions; roadmap coordination across teams. Distinguishing Test: Decision revisitation <5% across teams; other EMs adopt this decision process; execs reference EMs' proposals in strategy discussions.",
  level5Advanced: "Scope: Org. Key Behavior: Org-wide decision discipline established; decision culture embedded in hiring/onboarding; historical decisions used as reference material; strategy visibility across org. Artifact: Org-wide decision framework with measured adoption; decision log referenced in all organizational communications. Distinguishing Test: New hires understand org rationale by reading decisions; no decision revisitation; org strategy traces back to transparent decisions."
});

updateAnchor('C7-2', {
  level1Developing: "Scope: Individual. Key Behavior: Communication altitude not adapted; detail level same whether speaking to execs or ICs; bad news delivered late or not at all. Artifact: None — no structured communication. Distinguishing Test: Execs complain about too much detail; ICs complain about missing context; manager surprised by bad news.",
  level2Emerging: "Scope: Team (emerging). Key Behavior: Attempting to adapt communication; sometimes delivers bad news early; weekly updates exist but inconsistent quality. Artifact: Weekly status update template (used inconsistently). Distinguishing Test: Some altitude adaptation attempted but execution uneven; bad news flag timing inconsistent.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Three-altitude communication (exec summary, peer detail, IC implementation); weekly proactive status with outcomes/risks/asks; bad news flagged within 24 hours with mitigation plan. Artifact: Three-version communication template; consistent weekly status update; bad-news flag log. Distinguishing Test: Execs get 1-slide summary; peers get trade-offs; ICs get implementation context; manager never surprised; zero instances per quarter where leadership learns about problem from someone other than EM.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Exec communication drives org strategy; communication quality evaluated across teams; bad news culture normalized. Artifact: Org communication standards; cross-team communication templates; exec presentation best practices documented. Distinguishing Test: Other teams adopt this communication approach; execs invite EM to strategy conversations based on communication quality; bad news surfaces systematically across org.",
  level5Advanced: "Scope: Org. Key Behavior: Communication culture is organizational norm; altitude adaptation second-nature; transparent escalation practiced at all levels. Artifact: Org-wide communication framework with measured outcomes. Distinguishing Test: Communication quality is a hiring criterion; transparency is described as org characteristic; bad news surfaces early across org."
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

updateAP('AP-08', {
  shortDesc: "EM presents vague proposals without options or trade-offs. Proposals get sent back; stakeholders lose confidence; decisions take 3x longer than necessary.",
  warningSigns: [
    "Proposal submitted without written artifact; decision made 'in the meeting'",
    "Options presented without quantified trade-offs — 'option A vs option B' with no cost or benefit comparison",
    "No DACI roles assigned; decision authority unclear",
    "First-meeting approval rate <50%; proposals regularly require rework"
  ],
  impact: "Within 1-2 quarters: stakeholder trust erodes; proposals get sent back repeatedly; EM seen as unprepared; team velocity decreases as decisions take longer.",
  recoveryActions: [
    "Create a decision memo template with required sections: context, options (minimum 3), quantified trade-offs, recommendation, risks, reversibility.",
    "Write a decision memo for every decision >1 engineer-week of effort before scheduling a meeting.",
    "Circulate 48 hours before the meeting; establish a silent reading period.",
    "Measure first-meeting approval rate (target >80%) and track improvements."
  ]
});

updateAP('AP-39', {
  shortDesc: "EM drowns stakeholders in detail, overwhelms executives with implementation specifics, leaves ICs confused about broader context. Communication altitude not adapted to audience.",
  warningSigns: [
    "Execs get 30-slide presentations with architecture diagrams",
    "ICs get 1-slide summaries and don't understand the 'why'",
    "Manager complains: 'I never know what's actually happening'",
    "Same presentation given to all audiences"
  ],
  impact: "Within 1 quarter: execs dismiss EM as unprepared or unseasoned; ICs feel disconnected from direction; manager loses trust.",
  recoveryActions: [
    "Create three versions of key communications: 1-slide exec summary (30-second read), 3-slide peer brief (5-minute read), full technical appendix (15-minute read).",
    "Apply pyramid principle: conclusion first for execs, trade-offs for peers, implementation details for ICs.",
    "Practice the 'so what' test on every slide and paragraph.",
    "Solicit feedback quarterly from each audience tier: 'Is my communication at the right altitude?'"
  ]
});

updateAP('AP-50', {
  shortDesc: "EM hides bad news or delays escalation, hoping to fix it before anyone notices. When the problem becomes visible, trust is destroyed.",
  warningSigns: [
    "Bad news surfaces in a meeting with leadership rather than being escalated first",
    "Manager hears about problems from other teams before EM mentions them",
    "Major project slip disclosed days before deadline, too late for mitigation",
    "Zero structured escalation process for bad news"
  ],
  impact: "Within 1 quarter: manager loses trust; EM is no longer invited to strategic discussions; credibility becomes fragile.",
  recoveryActions: [
    "Establish an SLA: flag Sev1 news within 4 hours, Sev2 within 24 hours, with written notification including impact assessment and options.",
    "Create a bad-news template: what happened, customer/business impact (quantified), preliminary root cause, mitigation actions, what you need, next update ETA.",
    "Own problems even if the root cause wasn't your team — accountability builds credibility.",
    "Follow up with written post-incident summary within 48 hours."
  ]
});

updateAP('AP-63', {
  shortDesc: "EM makes decisions without documenting rationale; decisions get revisited endlessly; nobody knows why things are the way they are.",
  warningSigns: [
    "No decision log exists or it's unsearchable",
    "Same decision debated multiple times in different meetings",
    "New hires ask 'why is it done this way?' and the answer is 'it just is'",
    "Decision authority unclear — doesn't know who decided what"
  ],
  impact: "Within 2 quarters: decisions revisited continuously, draining organizational energy; new hires frustrated by lack of context; onboarding takes longer.",
  recoveryActions: [
    "Create an RFC template with required sections: context, options, recommendation, risks, reversibility.",
    "Name DACI roles explicitly for every decision above threshold (suggest >3 engineer-days).",
    "Establish a 5-day comment period with clear escalation path.",
    "Maintain a searchable decision log in Confluence or similar tool.",
    "Reference previous decisions in new discussions when patterns overlap."
  ]
});

updateAP('AP-73', {
  shortDesc: "EM builds roadmap in secret, announces it to the team, then surprises stakeholders with scope cuts and re-prioritizations.",
  warningSigns: [
    "Roadmap has no 'what we are NOT doing' section",
    "Stakeholders discover de-prioritized items through absence rather than explicit communication",
    "New requests handled ad hoc without explicit trade-off discussion",
    "Scope cuts happen unannounced late in the cycle"
  ],
  impact: "Within 1 quarter: stakeholder trust erodes; every request becomes a negotiation; team blamed for 'moving goalposts.'",
  recoveryActions: [
    "Create a mandatory 'What we are NOT doing' section in every quarterly roadmap with rationale for each de-prioritization.",
    "Maintain a visible priority stack rank ordered by business impact, shared with all stakeholders.",
    "Review the stack rank in monthly stakeholder syncs (30 minutes) to ensure alignment.",
    "For every new request: 'To add X, we must deprioritize Y — do you approve?'",
    "Publish the roadmap with trade-off section to all stakeholders within 1 week of planning completion."
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

updatePlaybook('P-C7-1', {
  whatGoodLooksLike: "Within 1 week: decision memo template created with required sections. Within 2 weeks: first decision memo written and approved. Within 1 month: three consecutive decisions approved in first review meeting. Outcome: stakeholders understand reasoning upfront; decisions don't get revisited. Measured by: first-meeting approval rate (target >80%), decision revisitation rate (target <10%)."
});

updatePlaybook('P-C7-2', {
  whatGoodLooksLike: "Within 2 weeks: audit existing communications for altitude consistency. Within 3 weeks: three-altitude template created (exec summary, peer detail, IC context). Within 6 weeks: all major communications published in three versions. Outcome: execs get business impact, peers get trade-offs, ICs get implementation context. Measured by: audience feedback on altitude appropriateness, manager confidence in understanding."
});

updatePlaybook('P-C7-3', {
  whatGoodLooksLike: "Within 1 week: bad-news escalation SLA established (Sev1 4 hours, Sev2 24 hours). Within 2 weeks: first bad-news flag sent using template. Within 1 month: consistent tracking of flag timing. Outcome: manager never surprised; bad news surfaces early when options still exist. Measured by: time-from-discovery-to-notification (target <4 hours Sev1), manager feedback."
});

updatePlaybook('P-C7-4', {
  whatGoodLooksLike: "Within 2 weeks: RFC template created and socialized. Within 1 month: DACI roles assigned to all significant decisions; decision log started. Within 2 months: searchable decision log populated with 10+ historical decisions. Outcome: decision authority clear; new hires understand rationale from decision log. Measured by: decision revisitation rate (target <10%), new hire ramp time."
});

updatePlaybook('P-C7-5', {
  whatGoodLooksLike: "Within 1 week: roadmap audit completed to identify all implicit trade-offs. Within 2 weeks: 'What we are NOT doing' section drafted for roadmap. Within 1 month: first quarterly roadmap published with explicit de-prioritizations. Outcome: stakeholders understand trade-offs upfront; no surprise cuts. Measured by: roadmap change tracking (target zero cuts without prior notification), stakeholder satisfaction survey."
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

updateIQ('IQ-14', {
  lookFor: [
    "Can describe a recent decision using structured framework: context, options with trade-offs, recommendation, risks",
    "Written decision artifact was created before the meeting — decision didn't happen 'in the meeting'",
    "First-meeting approval rate mentioned as a quality metric (target >80%)",
    "Adapts communication altitude to audience — exec summary vs. technical detail vs. implementation context"
  ],
  redFlags: [
    "Decisions made verbally without written artifact",
    "Cannot articulate the trade-offs in a recent decision",
    "No structured process for framing proposals",
    "Same presentation given to all audiences regardless of seniority"
  ]
});

updateIQ('IQ-72', {
  lookFor: [
    "Describes a recent bad news escalation: project slip, incident, or missed goal",
    "Flagged the issue early with specific timing (e.g., 'I surfaced this 3 weeks before deadline')",
    "Included impact assessment (business impact quantified) and mitigation options",
    "Manager feedback confirms 'no surprises' principle — leadership learned from EM first"
  ],
  redFlags: [
    "Bad news always surfaces after it's too late to mitigate",
    "Manager hears about problems from other teams before EM mentions them",
    "Lacks a structured escalation process for bad news",
    "Delays announcing bad news hoping to fix it first"
  ]
});

updateIQ('IQ-101', {
  lookFor: [
    "Maintains a decision log or searchable record of significant decisions",
    "Can articulate DACI roles (Decider, Accountable, Consulted, Informed) for their decisions",
    "Describes how they prevent decision revisitation — specific mechanism like RFC process or decision record",
    "New hires can understand system rationale by reading the decision log"
  ],
  redFlags: [
    "No searchable decision log exists",
    "Same decision debated multiple times",
    "Cannot name the decision-making framework used",
    "No documented rationale for existing decisions"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT.JSON ────────────────────────────────────────────────
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c7sa = sa.find(s => s.capabilityId === 'C7');
if (c7sa) {
  c7sa.behavioralAnchors[0].description = "Proposals lack structure and written artifacts; decisions made verbally without documented rationale; communication not adapted to audience (same level of detail for execs and ICs)";
  c7sa.behavioralAnchors[1].description = "Written decisions exist but inconsistently structured; attempting to adapt communication altitude but execution uneven; bad news escalation sometimes delayed";
  console.log('  ✓ C7 self-assessment L1-L2 anchors sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT-GUIDANCE.JSON ───────────────────────────────────────────
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c7mg = mg.find(m => m.capabilityId === 'C7');
if (c7mg) {
  // Strip company references from leading indicators
  c7mg.leadingIndicators = [
    "Decision memos written for all decisions >1 engineer-week of effort",
    "DACI roles assigned to significant decisions (documented)",
    "Weekly proactive status updates sent to manager with outcomes, risks, and asks",
    "Bad-news escalation SLA tracked (Sev1 <4 hours, Sev2 <24 hours)",
    "Roadmap includes explicit 'What we are NOT doing' section with trade-off rationale",
    "Three-altitude communication versions prepared for major announcements"
  ];
  // Strip company references from lagging indicators
  c7mg.laggingIndicators = [
    "First-meeting decision approval rate >80% (decisions approved without rework)",
    "Decision revisitation rate <10% (decisions don't reopen without changed facts)",
    "Manager feedback: no surprises, learns about issues from EM first",
    "Stakeholder satisfaction with communication >4/5",
    "Roadmap change tracking: zero items cut without prior stakeholder notification",
    "Exec feedback on communication quality and presence"
  ];
  console.log('  ✓ C7 measurement guidance indicators cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING-PATHWAYS.JSON ─────────────────────────────────────────────
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c7lp = lp.find(l => l.capabilityId === 'C7');
if (c7lp) {
  // Clean foundational resource descriptions (strip marketing copy)
  c7lp.foundational[0].description = "Narrative memo structure: how to think through a decision and communicate it clearly. The 6-pager forces structured thinking and prevents hiding weak reasoning behind presentation slides.";
  c7lp.foundational[1].description = "Covers presentation structure, audience adaptation, and executive presence. Essential for influence at scale.";
  c7lp.foundational[2].description = "Frameworks for decision-making: DACI, RFC process, decision documentation. Enables organizational learning by creating an institutional memory of decisions and their rationale.";

  // Clean practical resource descriptions
  c7lp.practical[0].description = "Decision memo template with required sections: context, options, trade-offs, recommendation, risks, reversibility. Directly usable in your organization.";
  c7lp.practical[1].description = "Communication templates for three audiences: executive summary, peer briefing, technical implementation context. Teaches altitude adaptation.";
  c7lp.practical[2].description = "Workshop: practice delivering bad news early with structured escalation format. Role-play leadership's perspective to improve timing and framing.";

  // Clean advanced resource descriptions
  c7lp.advanced[0].description = "Case studies: how high-performing leaders maintain decision discipline at scale; preventing decision revisitation as organizations grow.";
  c7lp.advanced[1].description = "Org-wide decision frameworks: how to standardize decision-making across teams while preserving autonomy; building decision culture.";
  c7lp.advanced[2].description = "Executive communication mastery: navigating cross-functional decisions, executive stakeholder management, and strategic influence.";

  console.log('  ✓ C7 learning pathways descriptions cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C7 deep cycle complete. All files updated.');

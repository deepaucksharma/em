#!/usr/bin/env node
/**
 * C12 (Culture & Norms Shaping) Deep Cycle
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
function readJSON(file) { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8')); }
function writeJSON(file, data) { fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8'); }

// ─── 1. CAPABILITIES ───
console.log('Processing capabilities.json...');
let caps = readJSON('capabilities.json');
let c12 = caps.find(c => c.id === 'C12');
c12.description = "Assessed by: team psychological safety scores, collaboration effectiveness, norm adherence, conflict resolution time, and cultural debt visibility. Absence causes: toxic dynamics, siloed knowledge, norm erosion, unresolved conflicts, and value-behavior misalignment.";
c12.enabledBy = [];
writeJSON('capabilities.json', caps);
console.log('  ✓ C12 description rewritten');

// ─── 2. OBSERVABLES ───
console.log('Processing observables.json...');
let obs = readJSON('observables.json');
function updateObs(id, changes) {
  const o = obs.find(x => x.id === id); if (!o) return;
  Object.assign(o, changes); console.log(`  ✓ ${id}`);
}

updateObs('C12-O1', {
  why: "Psychological safety — the belief that you won't be punished for mistakes, questions, or disagreement — is the #1 predictor of team performance (Google's Project Aristotle). Without it, innovation dies, problems hide, and junior engineers stay silent.",
  how: "Run quarterly psychological safety survey (7-item Edmondson scale). Model vulnerability: admit mistakes publicly, ask 'dumb questions,' surface your own uncertainty. Reward risk-taking and learning from failure. Track safety as a first-class team health metric. Validate with metric 5.1 (Developer Satisfaction Score).",
  expectedResult: "Within 2 quarters: team reports >4.0/5.0 psychological safety; junior engineers speak up in meetings; failures are discussed openly without blame; innovation rate increases."
});

updateObs('C12-O2', {
  why: "Culture is what you celebrate, tolerate, and punish — not what's written on the wall. Brilliant jerks who get promoted signal that outcomes justify bad behavior. The fastest way to destroy culture is to reward people who violate it.",
  expectedResult: "Within 1 quarter: team observes that violators face consequences; stated values align with promotion decisions; no exceptions for high performers who are toxic; trust in leadership increases."
});

updateObs('C12-O3', {
  why: "Written norms are aspirational without behavioral anchors. 'Be collaborative' means nothing; 'Respond to code reviews within 24 hours' is actionable. Norms with examples, metrics, and consequences are norms that actually shape behavior.",
  how: "Co-create team norms with explicit behaviors (not vague values). Structure: Norm → Example → Counter-example → How we measure. Review norms quarterly; retire what doesn't serve the team. Make visible: post in team space, reference in retrospectives. Validate with metric 5.5 (Collaboration Effectiveness).",
  expectedResult: "Within 1 month: norms are referenced in daily work; new hires learn norms in onboarding; norm violations are addressed quickly; team can articulate norms without prompting."
});

updateObs('C12-O4', {
  why: "Unresolved conflict festers into toxicity. Conflict avoidance is as damaging as conflict escalation — both prevent healthy problem-solving. Skilled conflict resolution is a core EM competency, not an HR escalation.",
  how: "Address conflict within 1 week of awareness. Use structured format: separate people from problem, focus on interests not positions, generate options together, use objective criteria. Escalate to HR only when behavioral violations occur, not for every disagreement. Validate with metric 7.1 (Stakeholder Satisfaction Score).",
  expectedResult: "Within 1 quarter: conflicts resolved constructively within 1-2 weeks; team reports ability to disagree productively; psychological safety maintained during conflict; zero festering resentments."
});

updateObs('C12-O5', {
  why: "Remote and hybrid teams fracture into in-office and remote subgroups when rituals favor one over the other. Equitable participation requires structural support: async documentation, inclusive meeting practices, and deliberate over-communication.",
  expectedResult: "Within 2 quarters: remote and office team members report equal access to information and influence; meeting participation rates equal across locations; no 'hallway decisions' that exclude remote members."
});

updateObs('C12-O6', {
  why: "Knowledge silos create single points of failure and breed resentment. 'Expert only' cultures slow down teams when the expert is unavailable and create invisible hierarchies where some people's time is valued over others.",
  how: "Rotate ownership of critical systems (no permanent 'owners'). Require pair programming or code review for knowledge transfer. Document tribal knowledge in runbooks and ADRs. Track bus factor per service — target minimum 3 people can maintain any critical service. Validate with metric 4.2 (Knowledge Distribution Index).",
  expectedResult: "Within 2 quarters: no service has bus factor <2; on-call rotation distributes knowledge; team velocity maintained during PTO or departures; junior engineers contribute to previously 'expert only' areas."
});

updateObs('C12-O7', {
  why: "Celebrating learning from failure transforms it from shameful to valuable. Blameless post-mortems, demo days for experiments that failed, and 'what we learned' retro items normalize iteration and reduce fear of trying new approaches.",
  expectedResult: "Within 1 quarter: team shares failed experiments publicly; retrospectives surface learnings from failures without blame; innovation rate increases because fear of failure decreases."
});

updateObs('C12-O8', {
  why: "Informal 1-on-1 conversations in hallways create information asymmetry that disadvantages remote workers, underrepresented groups, and anyone not in the inner circle. Transparent decision-making requires documentation and inclusive forums.",
  how: "Document all decisions in accessible locations (wiki, Slack, ADR). Use async-first communication where possible. Record or summarize hallway discussions that affect team direction. Create inclusive decision forums where all voices are heard. Validate with metric 7.1 (Stakeholder Satisfaction Score)."
});

updateObs('C12-O9', {
  why: "Diversity of thought, background, and experience improves decision quality and product outcomes. Inclusive culture requires active management: surfacing underrepresented voices, addressing microaggressions, and ensuring equitable growth opportunities.",
  expectedResult: "Within 2 quarters: all team members report psychological safety equally across demographics; retention rates equal; promotion rates proportional to population; team composition reflects diverse perspectives."
});

updateObs('C12-O10', {
  why: "Culture drift is inevitable as teams grow and people turn over. Intentional culture maintenance — onboarding that teaches norms, rituals that reinforce values, stories that encode history — prevents drift from aspiration to reality.",
  how: "Embed culture in onboarding: new hires learn team norms, values, and why they exist. Use storytelling in team meetings to reinforce desired behaviors. Revisit values quarterly and prune or evolve as needed. Measure culture through surveys and behavior observation. Validate with metric 5.1 (Developer Satisfaction Score)."
});

writeJSON('observables.json', obs);

// ─── 3. CALIBRATION SIGNALS ───
console.log('Processing calibration-signals.json...');
let sigs = readJSON('calibration-signals.json');
function updateSig(id, changes) {
  const s = sigs.find(x => x.id === id); if (!s) return;
  Object.assign(s, changes); console.log(`  ✓ ${id}`);
}

updateSig('SIG-050', {
  signalText: "Psychological safety measured and improving: 'Team psychological safety increased from [X] to [Y]; all team members report ability to speak up'. Benchmark: >4.0/5.0 on Edmondson scale."
});

updateSig('SIG-051', {
  signalText: "Values-behavior alignment: 'Addressed high performer's toxic behavior — chose culture over short-term output'. Evidence: documented case where values were upheld despite performance trade-off."
});

updateSig('SIG-052', {
  signalText: "Norm adherence: 'Team norms documented with behavioral anchors; norm violations addressed within 1 week; norms revised quarterly based on team input'. Evidence: written norms referenced in retrospectives and 1-on-1s."
});

updateSig('SIG-053', {
  signalText: "Conflict resolution: 'Resolved [X] team conflicts constructively within 2 weeks; zero HR escalations from avoidable issues'. Evidence: conflict log with resolution timeline and outcomes."
});

updateSig('SIG-054', {
  signalText: "Inclusive culture: 'Remote and office participation rates equal; underrepresented team members report psychological safety >4.0/5.0; promotion rates proportional across demographics'. Evidence: participation and satisfaction data by location and demographic."
});

updateSig('SIG-055', {
  signalText: "Knowledge distribution: 'Bus factor ≥3 for all critical services; on-call rotation distributes expertise; team velocity maintained during PTO'. Evidence: knowledge distribution metrics (metric 4.2)."
});

writeJSON('calibration-signals.json', sigs);

// ─── 4. RUBRIC ANCHORS ───
console.log('Processing rubric-anchors.json...');
let anchors = readJSON('rubric-anchors.json');
function updateAnchor(id, changes) {
  const a = anchors.find(x => x.anchorId === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAnchor('C12-1', {
  level1Developing: "Scope: Individual. Key Behavior: Accepts existing culture without shaping it; doesn't address toxic behavior; psychological safety unmeasured. Artifact: None. Distinguishing Test: Cannot describe team's cultural norms or psychological safety level.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Addresses egregious behavior violations but tolerates minor toxicity; some awareness of psychological safety. Artifact: Informal norms (unwritten). Distinguishing Test: Responds to cultural issues when escalated but doesn't proactively shape culture.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Psychological safety measured and maintained >4.0/5.0; written norms with behavioral anchors; conflict resolved within 1-2 weeks; celebrates learning from failure. Artifact: Team norms document; psychological safety survey results; conflict resolution log. Distinguishing Test: Team can articulate norms; junior members speak up; failures discussed openly without blame.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Culture practices shared across teams; inclusive practices for remote/hybrid teams institutionalized; values-behavior alignment enforced at area level. Artifact: Area-level culture framework; inclusive meeting practices guide. Distinguishing Test: Cultural consistency across teams; adjacent EMs adopt practices; remote/office participation equal.",
  level5Advanced: "Scope: Org. Key Behavior: Culture is competitive advantage; psychological safety is org norm; values upheld in promotion decisions org-wide; inclusive practices embedded. Artifact: Org-wide culture framework with measured outcomes. Distinguishing Test: Culture attracts talent; retention above industry benchmark; values visible in all leadership decisions."
});

updateAnchor('C12-2', {
  level1Developing: "Scope: Individual. Key Behavior: Knowledge silos exist; no effort to distribute expertise; single points of failure in every critical area. Artifact: None. Distinguishing Test: Bus factor is 1 for multiple critical services.",
  level2Emerging: "Scope: Team (emerging). Key Behavior: Some awareness of knowledge silos; occasional efforts at cross-training but not systematic. Artifact: Ad hoc documentation. Distinguishing Test: Knowledge transfer happens during crises, not proactively.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Knowledge distribution measured (bus factor ≥2 for all services); pair programming and code review for knowledge transfer; documentation in runbooks and ADRs. Artifact: Knowledge distribution metrics; runbooks for critical services. Distinguishing Test: Team operates effectively during individual PTO; on-call rotation distributes expertise.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Cross-team knowledge sharing; rotation programs for skill development; expertise distributed across area. Artifact: Area-level knowledge map; rotation program. Distinguishing Test: Knowledge flows across team boundaries; no single-team knowledge silos.",
  level5Advanced: "Scope: Org. Key Behavior: Knowledge sharing culture institutionalized; internal mobility spreads expertise; documentation and learning prioritized org-wide. Artifact: Org-wide knowledge management framework. Distinguishing Test: Institutional knowledge persists through turnover; onboarding leverages org-wide knowledge base."
});

writeJSON('rubric-anchors.json', anchors);

// ─── 5. ANTI-PATTERNS ───
console.log('Processing anti-patterns.json...');
let aps = readJSON('anti-patterns.json');
function updateAP(id, changes) {
  const a = aps.find(x => x.id === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAP('AP-18', {
  shortDesc: "EM tolerates 'brilliant jerks' — high performers with toxic behavior. Team morale collapses because culture is obviously secondary to output.",
  warningSigns: [
    "High performer regularly violates team norms (dismisses others, skips code review, works in silos) but faces no consequences",
    "Team members avoid collaborating with the person; morale drops when they're in meetings",
    "Feedback about toxic behavior is dismissed with 'but they ship so much'",
    "Turnover rate is higher than average, with exit interviews citing toxic team member"
  ],
  impact: "Within 6 months: top performers leave because they won't tolerate the toxic environment; collaboration breaks down; psychological safety collapses; team effectiveness drops despite individual output; stated values become meaningless.",
  recoveryActions: [
    "Address toxic behavior immediately: clear feedback with specific examples, timeline for improvement, consequences if behavior continues.",
    "No exceptions: performance does not excuse cultural violations — make this explicit.",
    "If behavior doesn't improve in 30-60 days, manage out — the team is watching to see if you mean it.",
    "Communicate to team: 'We value both performance and culture. High output doesn't excuse toxic behavior.'"
  ]
});

updateAP('AP-19', {
  shortDesc: "Manager preaches psychological safety but punishes mistakes, disagreement, or bad news. Team learns to hide problems and tell the manager what they want to hear.",
  warningSigns: [
    "Team members visibly hesitant to share bad news or dissenting opinions",
    "Manager reacts defensively or with blame when mistakes surface",
    "Problems discovered late because team hid them until they couldn't be hidden",
    "Junior engineers never speak up in team meetings"
  ],
  impact: "Within 1-2 quarters: psychological safety collapses; team hides problems until they explode; innovation stops because risk-taking is punished; best engineers leave for teams where they can speak honestly.",
  recoveryActions: [
    "Model vulnerability first: publicly admit your own mistakes and uncertainties — create permission for others to do the same.",
    "Reward messengers: when someone surfaces bad news early, thank them explicitly — 'I'm glad you told me now while we can fix it.'",
    "Separate learning from consequences: ask 'what did we learn?' before 'who's responsible?'",
    "Track psychological safety with quarterly surveys (Edmondson 7-item scale) and act on results."
  ]
});

updateAP('AP-27', {
  shortDesc: "Team operates without explicit norms or agreements. Every interaction is a negotiation; new hires guess at unwritten rules; conflict arises from misaligned expectations.",
  warningSigns: [
    "No documented team norms or working agreements",
    "New hires ask 'how do things work here?' and get different answers from different people",
    "Frequent conflicts over process issues (code review speed, meeting attendance, communication style)",
    "Team can't articulate what makes their culture unique or what behaviors are valued"
  ],
  impact: "Within 2 quarters: onboarding takes longer because norms are implicit; conflicts multiply as team grows; remote workers especially disadvantaged because they can't observe hallway culture; team culture drifts as people interpret norms differently.",
  recoveryActions: [
    "Co-create team norms in a working session: 60-90 minutes, whole team, cover communication, code review, meetings, conflict resolution.",
    "Make norms explicit and behavioral: not 'be collaborative' but 'respond to code reviews within 24 hours.'",
    "Document and post visibly: team wiki, onboarding docs, meeting room walls.",
    "Review quarterly: what's working, what's not, what should we add/remove/change?"
  ]
});

updateAP('AP-40', {
  shortDesc: "Manager avoids all conflict, letting interpersonal issues fester. Team becomes toxic as unresolved resentments accumulate; passive-aggressive behavior becomes the norm.",
  warningSigns: [
    "Manager aware of interpersonal conflicts but doesn't address them",
    "Team members complain about each other in 1-on-1s but nothing changes",
    "Passive-aggressive communication (snark in code reviews, exclusion from meetings)",
    "Conflict finally explodes after months of festering"
  ],
  impact: "Within 2-3 quarters: psychological safety collapses; collaboration breaks down; team factions form; productivity drops as people route around each other; attrition increases as people escape toxic environment.",
  recoveryActions: [
    "Address conflict within 1 week of awareness — festering makes it exponentially harder.",
    "Structured approach: meet with each party separately to understand interests, then facilitate joint conversation focused on problem-solving.",
    "Separate people from problem: 'We both want [outcome], we disagree on approach. Let's explore options.'",
    "Get comfortable being uncomfortable — conflict resolution is a core EM skill, not optional."
  ]
});

updateAP('AP-59', {
  shortDesc: "Manager makes all decisions in 1-on-1s or hallway conversations, creating information asymmetry and excluding remote or quieter team members from influence.",
  warningSigns: [
    "Decisions announced in team meetings without prior discussion",
    "Remote team members feel out of the loop despite being in all meetings",
    "Frequent 'I didn't know we decided that' surprises",
    "Influence correlates with physical proximity or social comfort, not merit of ideas"
  ],
  impact: "Within 1-2 quarters: remote team members disengage; diversity of thought lost as only the loudest voices shape decisions; resentment builds among those excluded; decision quality suffers from limited input.",
  recoveryActions: [
    "Default to transparent decision-making: decisions documented in wiki or Slack, not just someone's memory.",
    "Use async-first for decisions where possible: RFC process, written proposals, time for reflection before deciding.",
    "Summarize hallway discussions that affect team direction and share broadly.",
    "Create inclusive forums: round-robin speaking in meetings, anonymous input mechanisms, explicit solicitation of quieter voices."
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

updatePlaybook('P-C12-1', {
  whatGoodLooksLike: "Within 1 week: baseline psychological safety survey (Edmondson 7-item scale). Within 2 weeks: team retrospective identifying specific safety concerns. Within 1 month: visible action on top concerns (e.g., blame removed from post-mortems, 'dumb questions' welcomed in standup). Within 1 quarter: follow-up survey shows improvement; junior team members speak up regularly. Outcome: team reports >4.0/5.0 psychological safety; innovation and risk-taking increase. Measured by: psychological safety survey scores, meeting participation equity, incident reporting rate."
});

updatePlaybook('P-C12-2', {
  whatGoodLooksLike: "Within 1 week: co-create team norms in 90-minute working session covering communication, code review, meetings, conflict resolution. Within 2 weeks: norms documented with behavioral anchors and examples. Ongoing: norms referenced in onboarding, retrospectives, and when violations occur. Quarterly: norms reviewed and updated. Outcome: new hires learn norms quickly; norm violations addressed consistently; team culture is explicit, not implicit. Measured by: new hire ramp time, norm adherence (observed in retrospectives), conflict resolution speed."
});

updatePlaybook('P-C12-3', {
  whatGoodLooksLike: "Within 1 week: meet with each party separately to understand interests and perspectives. Within 2 weeks: facilitate joint conversation using structured format (separate people from problem, focus on interests, generate options together). Throughout: maintain psychological safety; focus on problem-solving, not blame. Outcome: conflict resolved constructively; relationship restored or managed; no festering resentment. Measured by: resolution timeline (<2 weeks), team member satisfaction with resolution, no recurring conflict."
});

updatePlaybook('P-C12-4', {
  whatGoodLooksLike: "Within 1 week: clear feedback with specific examples of toxic behavior. Within 2 weeks: written improvement plan with behavioral expectations and timeline (30-60 days). Throughout: weekly check-ins on progress; support for improvement but no wavering on expectations. If no improvement by deadline: manage out. Outcome: behavior improves or person exits; team sees values upheld; psychological safety restored. Measured by: behavior change (360 feedback), team psychological safety scores, retention of other team members."
});

updatePlaybook('P-C12-5', {
  whatGoodLooksLike: "Within 2 weeks: assess current knowledge distribution (bus factor per service). Within 1 month: pair programming rotation and code review requirements implemented; documentation sprint for critical services. Within 1 quarter: bus factor ≥2 for all services; on-call rotation distributes knowledge. Outcome: team operates effectively during individual PTO; no single points of failure. Measured by: bus factor (metric 4.2), on-call confidence, team velocity during PTO."
});

writeJSON('playbooks.json', playbooks);

// ─── 7. INTERVIEW QUESTIONS ───
console.log('Processing interview-questions.json...');
let iqs = readJSON('interview-questions.json');
function updateIQ(id, changes) {
  const q = iqs.find(x => x.id === id); if (!q) return;
  Object.assign(q, changes); console.log(`  ✓ ${id}`);
}

updateIQ('IQ-41', {
  lookFor: [
    "Measures psychological safety (e.g., Edmondson scale) and can state team's current level",
    "Models vulnerability — gives specific example of admitting mistake or uncertainty publicly",
    "Rewards risk-taking and learning from failure — describes specific instance",
    "Addresses behavior that undermines safety — gives example of confronting toxic behavior"
  ],
  redFlags: [
    "Cannot define psychological safety or state whether their team has it",
    "Punishes mistakes or bad news — team likely hiding problems",
    "Tolerates brilliant jerks because of their output",
    "Junior engineers never speak up in meetings — clear signal of low safety"
  ]
});

updateIQ('IQ-42', {
  lookFor: [
    "Team norms are documented with behavioral anchors — can recite 3-5 specific norms",
    "Norms co-created with team, not imposed top-down",
    "Norm violations addressed consistently and quickly — gives specific example",
    "Norms evolve based on team feedback — describes what changed and why"
  ],
  redFlags: [
    "No documented norms or 'they're in my head'",
    "Norms are vague values ('be collaborative') not actionable behaviors",
    "Cannot describe how norms are enforced or what happens when violated",
    "Norms never change despite team growth or context shifts"
  ]
});

updateIQ('IQ-43', {
  lookFor: [
    "Addresses conflict within 1-2 weeks — describes specific recent example",
    "Uses structured approach: separate people from problem, focus on interests not positions",
    "Maintains psychological safety during conflict — neither avoids nor escalates",
    "Escalates to HR only for behavioral violations, not for every disagreement"
  ],
  redFlags: [
    "Avoids conflict until it explodes — lets issues fester for months",
    "Escalates every disagreement to HR instead of managing it directly",
    "Cannot describe a specific conflict they resolved in the last year",
    "Team has visible factions or passive-aggressive dynamics"
  ]
});

updateIQ('IQ-106', {
  lookFor: [
    "Describes specific action taken when high performer violated cultural norms",
    "Values-behavior alignment enforced in promotion decisions — gives example",
    "Clear on what behaviors are non-negotiable regardless of performance",
    "Can articulate the long-term cost of tolerating toxic high performers"
  ],
  redFlags: [
    "Tolerates toxic behavior from high performers — 'but they ship so much'",
    "Cannot name a case where they chose culture over short-term output",
    "Promotion decisions reward output without considering cultural contribution",
    "Team has visible cultural violations that go unaddressed"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT ───
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c12sa = sa.find(s => s.capabilityId === 'C12');
if (c12sa) {
  c12sa.behavioralAnchors[0].description = "Accepts existing culture without shaping it; doesn't address toxic behavior; psychological safety unmeasured; no documented team norms";
  c12sa.behavioralAnchors[1].description = "Addresses egregious behavior violations but tolerates minor toxicity; some awareness of psychological safety but no measurement; norms are informal";
  console.log('  ✓ C12 self-assessment L1-L2 sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT GUIDANCE ───
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c12mg = mg.find(m => m.capabilityId === 'C12');
if (c12mg) {
  c12mg.leadingIndicators = [
    "Team norms documented with behavioral anchors and reviewed quarterly",
    "Psychological safety measured quarterly (Edmondson 7-item scale)",
    "Conflict resolution timeline tracked (target: <2 weeks from awareness to resolution)",
    "Knowledge distribution measured (bus factor ≥2 for all critical services)",
    "Meeting participation rates tracked by location (remote vs. office)",
    "Norm violations addressed within 1 week with documented follow-up"
  ];
  c12mg.laggingIndicators = [
    "Psychological safety score >4.0/5.0 sustained for 2+ consecutive quarters",
    "Team retention rate above industry benchmark with equal rates across demographics",
    "Zero toxic behavior complaints in 360 feedback or exit interviews",
    "Knowledge distribution index shows no single points of failure",
    "Remote and office team members report equal satisfaction and influence",
    "Conflict escalation rate low (<1 HR escalation per year per 10 team members)"
  ];
  console.log('  ✓ C12 measurement guidance cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING PATHWAYS ───
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c12lp = lp.find(l => l.capabilityId === 'C12');
if (c12lp) {
  if (c12lp.foundational[0]) c12lp.foundational[0].description = "Foundational research on psychological safety as the #1 predictor of team performance. Covers measurement (7-item scale) and practices to build safety.";
  if (c12lp.foundational[1]) c12lp.foundational[1].description = "Culture is what you celebrate, tolerate, and punish. Practical frameworks for diagnosing and shaping team culture intentionally.";
  if (c12lp.foundational[2]) c12lp.foundational[2].description = "Conflict resolution frameworks: getting to yes by focusing on interests not positions, principled negotiation, and maintaining relationships.";
  if (c12lp.practical[0]) c12lp.practical[0].description = "Workshop template for co-creating team norms with behavioral anchors covering communication, collaboration, and conflict resolution.";
  if (c12lp.practical[1]) c12lp.practical[1].description = "Quarterly psychological safety survey using Edmondson 7-item scale with action planning based on results.";
  if (c12lp.advanced[0]) c12lp.advanced[0].description = "Building inclusive culture for diverse and distributed teams: equitable participation, microaggression awareness, and systemic bias reduction.";
  if (c12lp.advanced[1]) c12lp.advanced[1].description = "Scaling culture across growing organizations: maintaining cultural coherence while allowing team-level adaptation.";
  console.log('  ✓ C12 learning pathways cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C12 deep cycle complete.');

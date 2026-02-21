#!/usr/bin/env node
/**
 * C1 (Org-Level Thinking) Deep Cycle
 * Applies ultra-strict content validation across all C1 items.
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
let c1cap = caps.find(c => c.id === 'C1');
c1cap.description = "Assessed by: org topology clarity, cross-team ownership single-threading, re-org execution velocity, coordination overhead ratios, and strategic alignment metrics. Absence causes: ambiguous ownership creating coordination tax, re-orgs that destroy trust and attrition, scaling bottlenecks, and misalignment between org structure and architecture.";
c1cap.enabledBy = [];
writeJSON('capabilities.json', caps);
console.log('  ✓ C1 description rewritten to diagnostic format');

// ─── 2. OBSERVABLES.JSON ────────────────────────────────────────────────────
console.log('Processing observables.json...');
let obs = readJSON('observables.json');

function updateObs(id, changes) {
  const o = obs.find(x => x.id === id);
  if (!o) { console.error(`  ✗ Observable ${id} not found`); return; }
  Object.assign(o, changes);
  console.log(`  ✓ ${id} updated`);
}

updateObs('C1-O1', {
  why: "Teams organized by technology layer create handoff bottlenecks and unclear ownership; value flows get stuck waiting on other teams. Stream-aligned teams with clear boundaries ship faster because ownership is unambiguous and teams can deploy independently.",
  how: "Map value streams using a dependency matrix updated quarterly; assign ownership boundaries documented in a team topology registry; minimize cross-team handoffs to <5% of sprint work. Assess cognitive load per team using a structured survey (domains owned, number of services, on-call scope) reviewed semi-annually. Validate each team can deploy independently. Validate with metric 8.4 (Engineering Investment Mix) and 2.6 (Blocked Work Rate).",
  expectedResult: "Within 2 quarters: teams ship independently with <5% requiring cross-team coordination; clear accountability; each team's blast radius contained."
});

updateObs('C1-O2', {
  why: "Architecture mirrors org structure (Conway's Law) whether planned or not. Misaligned org structure and architecture creates permanent coordination overhead — every deployment requires cross-team handoffs. Intentional alignment means org structure produces the target architecture automatically.",
  how: "Map current architecture to team structure quarterly; identify misalignments where service boundaries don't match team boundaries; restructure teams to match desired architecture. Use Working Backwards: start from target architecture and design org to produce it. Validate with metric 8.4 (Engineering Investment Mix).",
  expectedResult: "Within 2-3 quarters: architecture and org structure reinforce each other; service boundaries align with team boundaries; deployment frequency increases because teams don't block each other."
});

updateObs('C1-O3', {
  why: "Poorly executed re-orgs destroy trust and productivity for months — people leave because of how it was handled, not what was decided. Structured communication, clear transition plans, and DRI assignment separate orgs that recover in weeks from those that bleed talent for quarters.",
  how: "Communication plan (managers→ICs→broader org within 24hrs), phased transition with explicit ownership transfer docs, named DRI for each workstream, 30-day check-in cadence to catch integration issues early. Validate with metric 2.6 (Blocked Work Rate).",
  expectedResult: "Within 3-4 weeks: teams productive; zero regrettable attrition directly from re-org; people feel respected; full velocity restored."
});

updateObs('C1-O4', {
  why: "Teams accumulate scope creep and unclear ownership invisibly; re-org signals appear late, after productivity is already degrading. Early detection via coordination overhead, ownership confusion, and team size thresholds enables proactive structural changes before crises.",
  how: "Monitor via quarterly team health scorecard: coordination overhead, ownership confusion, team size >10, >3 active contexts. Track cross-team handoff frequency and meeting load as leading indicators — when coordination cost exceeds 20% of capacity, structure is wrong. Review signals monthly in dedicated org-design checkpoint; trigger re-org evaluation when two+ thresholds breached for two consecutive months. Validate with metric 2.6 (Blocked Work Rate) and 7.6 (Span of Control).",
  expectedResult: "Within 2 quarters: proactive structural changes feel intentional, not reactive; team splits happen before productivity degrades."
});

updateObs('C1-O5', {
  why: "Ambiguous ownership creates 'not my job' scenarios where work falls through cracks. Service disputes escalate endlessly because there's no registry of record. Single-threaded ownership (one team per service, one person per domain) eliminates ambiguity and accelerates decisions.",
  how: "Build and maintain service→team→on-call→contact registry; resolve disputes by escalation to a clear DRI, not by sharing ownership. Review registry monthly; ask 'for service X, who decides if it ships?' If answer isn't immediate, ownership is ambiguous. Validate with metric 7.6 (Span of Control).",
  expectedResult: "Within 1 quarter: zero 'I thought you owned that' moments; ownership questions resolved within hours, not meetings; decisions fast because authority is clear."
});

updateObs('C1-O6', {
  why: "Org chart doesn't reflect how work actually flows; reporting structure and work structure mismatch creates coordination overhead. Visible work topology enables leaders to spot structural problems and optimize for flow.",
  how: "Create and maintain a work topology diagram showing dependencies and dataflows (not just org chart). Update quarterly during strategic planning cycles. Use to identify span-of-control risks, dependency bottlenecks, and coordinated work patterns.",
  expectedResult: "Within 1 quarter: leaders can quickly identify structural dependencies and bottlenecks; org changes are data-driven, not political."
});

updateObs('C1-O7', {
  why: "Without clear strategic intent and team alignment, engineers optimize locally for their team instead of globally for the org. Strategic clarity cascades from director to IC, enabling every team to make trade-offs in service of larger goals.",
  how: "Articulate strategic intent in terms of business outcomes and customer impact, not just engineering projects. Cascade to team-level OKRs with explicit trade-off rationale. Use quarterly all-hands to reinforce strategic pillars and how individual teams contribute. Validate with metric 8.2 (Revenue / Business Impact Attribution).",
  expectedResult: "Within 1 quarter: engineers can explain how their team's work connects to strategic outcomes; trade-offs feel aligned with org priorities, not arbitrary."
});

updateObs('C1-O8', {
  why: "Leaders scale org effectively by understanding constraints and leverage points. Spending time on high-leverage decisions (hiring structure, team boundaries, tool platform choices) has exponential impact; low-leverage work (individual code reviews) doesn't scale with org size.",
  how: "For each major decision category (hiring, tooling, team structure, architectural direction), clarify the decision authority: director decides vs. manager decides vs. IC decides. Teach managers to recognize leverage — which decisions, if made well, multiply impact across teams. Reserve leadership time for high-leverage work.",
  expectedResult: "Within 2 quarters: senior leadership spending <20% time on low-leverage individual decisions; org scales without creating new management layers."
});

updateObs('C1-O9', {
  why: "Cross-team technical decisions require alignment on constraints and trade-offs. Lack of forums for this alignment creates architectural drift, duplicated work, and local optimization that degrades global performance.",
  how: "Establish regular architectural review forums (monthly minimum) with named participants from each team. Create transparent decision registry (ADRs or equivalent) accessible to all teams. Align on shared standards for logging, monitoring, data formats, and dependency management. Validate with metric 8.4 (Engineering Investment Mix).",
  expectedResult: "Within 2 quarters: zero major duplication of effort across teams; shared standards adopted with buy-in; teams understand their dependencies."
});

updateObs('C1-O10', {
  why: "Career development and retention of high performers depends on visible advancement paths and role clarity. Ambiguous career progression causes regrettable attrition of top talent to competitors with clearer advancement.",
  how: "Define distinct IC (IC1-IC5) and Manager (TL, Manager, Senior Manager, Director) tracks with behavioral anchors. Communicate advancement criteria quarterly. Use career conversations to align on development goals tied to visible progression. Review regrettable attrition by seniority level quarterly; investigate any unexpected departures of high performers.",
  expectedResult: "Within 2 quarters: engineers can articulate the next level and what it takes to get there; regrettable attrition of high performers drops below 5% annually."
});

// Update embedded calibration signal content to match standalone file
// Fix SIG IDs and content where they diverge
for (const o of obs.filter(x => x.capabilityId === 'C1')) {
  if (!o.calibrationSignals) continue;
  for (const sig of o.calibrationSignals) {
    // Fix known ID mismatches (embedded → standalone)
    const idMap = {
      'SIG-173': 'SIG-173'  // Already correct
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
updateSig('SIG-036', {
  signalText: "Foundational org design: 'Restructured from layer-based to stream-aligned teams, reducing cross-team handoffs from [X]% to <5%.' Evidence: team topology registry, handoff metrics, independent deployment capability per team."
});

updateSig('SIG-038', {
  signalText: "Cognitive load awareness: 'Team owns [X] services across [Y] domains; proposed split based on cognitive load analysis to keep teams <10 people managing <8 services.'  Evidence: team size trending and cognitive load survey scores."
});

updateSig('SIG-039', {
  signalText: "Inverse Conway mastery: 'Applied inverse Conway — restructured teams to align with target microservices architecture, enabling independent deployment.' Evidence: architecture diagram matches team ownership boundaries; deployment frequency increase post-restructure."
});

updateSig('SIG-040', {
  signalText: "Proactive re-org signals: 'Identified coordination overhead and ownership confusion before productivity degraded; proposed and executed re-org.' Evidence: coordination overhead metrics, cross-team handoff tracking showing trend before and after."
});

updateSig('SIG-041', {
  signalText: "'Executed re-org of [X] engineers across [Y] teams with zero regrettable attrition and full productivity restored within 3 weeks.' Evidence: communication timeline, transition plan documentation, attrition tracking, velocity recovery metrics."
});

updateSig('SIG-042', {
  signalText: "Strategic alignment clarity: Directors articulate org strategy in business outcomes and team-level OKRs. 'Set [X] strategic pillars; teams defined OKRs aligned to pillars; every team can explain how their work connects.' Evidence: published strategic docs with OKR mapping visible to team."
});

updateSig('SIG-043', {
  signalText: "Ownership single-threading: 'Every service has one named team; every domain has one clear DRI.' Evidence: service→team→contact registry maintained and kept up-to-date; zero disputes about who decides for a given area lasting >24 hours."
});

updateSig('SIG-044', {
  signalText: "Work topology visibility: 'Maintains work topology diagram showing data flows and dependencies; uses it to identify bottlenecks proactively.' Evidence: updated dependency map, decisions made based on topology analysis documented."
});

updateSig('SIG-173', {
  signalText: "Re-org execution quality: observed in team interactions during and after re-org — communicated rationale with empathy, answered hard questions directly, followed up individually with affected engineers within 24 hours. Evidence: manager and peer observations of communication quality during transition."
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

updateAnchor('C1-1', {
  level1Developing: "Scope: Individual. Key Behavior: Operates within their team's boundaries without understanding broader org context; cannot articulate how their work connects to other teams or strategic outcomes. Artifact: None. Distinguishing Test: Cannot name the top 3 dependencies their team has on other teams.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Understands basic team topology and some dependencies; participates in cross-team meetings but doesn't drive decisions. Artifact: Team dependency diagram exists but not actively maintained. Distinguishing Test: Can list their team's key dependencies but cannot describe why the org is structured this way.",
  level3Competent: "Scope: Team/Area (2-3 teams). Key Behavior: Owns team structure and topology for their area; recognizes re-org signals early; executes team transitions with clear communication. Artifact: Updated team topology registry for area; re-org communication plans. Distinguishing Test: Team can explain org structure rationale; re-org execution produces zero regrettable attrition; coordination overhead <10%.",
  level4Distinguished: "Scope: Area (3-5 teams). Key Behavior: Designs org structure for multiple teams using stream-aligned principles; applies inverse Conway to align org and architecture; coaches peer managers on topology decisions. Artifact: Cross-team topology strategy; architectural alignment proposals. Distinguishing Test: Org decisions drive architecture improvements; peer managers seek input on topology changes; cross-team coordination overhead measurably decreases.",
  level5Advanced: "Scope: Org. Key Behavior: Org structure is a strategic asset aligned with business outcomes and technical architecture; senior leadership uses org structure as a primary lever for change; teams can scale without creating dysfunction. Artifact: Org-wide topology strategy integrated with technology roadmap; documented org design principles. Distinguishing Test: Multiple re-orgs executed flawlessly with zero attrition; org structure enables scaling without adding management layers; architecture and org reinforce each other."
});

updateAnchor('C1-2', {
  level1Developing: "Scope: Individual. Key Behavior: Ownership is ambiguous or shared; 'who decides for this service' is a frequent question; escalations happen frequently because authority is unclear. Artifact: None. Distinguishing Test: Cannot state who owns 50% of their team's key dependencies.",
  level2Emerging: "Scope: Team (emerging). Key Behavior: Team ownership is clear but cross-team ownership disputes take >24 hours to resolve; some DRIs named for key decisions. Artifact: Team owns their services clearly; broader ownership has gaps. Distinguishing Test: Most people know who owns their team's services, but disputes with other teams about shared areas take meetings to resolve.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Single-threaded ownership registry maintained and consulted; zero ambiguity about who decides for any service or domain; disputes resolved through clear escalation path within hours. Artifact: Service→team→contact registry; explicitly documented DRIs for cross-team domains. Distinguishing Test: Any engineer can answer 'who decides about X?' within 30 seconds for 100% of critical services.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Ownership model extends across multiple teams with rare disputes; shared services have clear escalation procedures and named arbiters. Artifact: Cross-team ownership agreements with decision rights documented; escalation flowcharts. Distinguishing Test: Ownership disputes across teams resolved in <4 hours; teams coordinate without explicit permission because authority is transparent.",
  level5Advanced: "Scope: Org. Key Behavior: Org-wide single-threaded ownership culture; ambiguity is rare; decisions made by clear DRIs even in complex, cross-cutting scenarios. Artifact: Org-wide ownership registry used as ground truth; ownership model taught to new leaders as standard. Distinguishing Test: Org-wide decisions that span multiple teams happen without coordination overhead; escalation is rare because ownership is universally understood."
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

updateAP('AP-10', {
  shortDesc: "Org structure doesn't match architecture; teams organized by technology layer instead of value streams. Coordination overhead paralyzes delivery; every feature requires cross-team handoffs.",
  warningSigns: [
    "Team boundaries are by technology layer (backend team, frontend team, data team) instead of by customer value or product area",
    ">30% of sprint work requires coordination across teams",
    "No clear single owner for any service — shared ownership of critical systems is normal",
    "Deploy process requires tickets to be handed off between teams"
  ],
  impact: "Within 2-3 quarters: coordination overhead compounds; deployment frequency drops because features require serialized work across teams; team morale suffers from 'not my problem' dynamics; hiring stalls because org is clearly broken.",
  recoveryActions: [
    "Map value streams: what customer outcomes do we deliver? What's the end-to-end path from request to delivery?",
    "Propose stream-aligned teams (not layer-aligned) where each team owns a complete value stream end-to-end.",
    "Restructure org to match target architecture, not the other way around (inverse Conway).",
    "Set a target: <5% of sprint work requires cross-team handoffs; measure quarterly."
  ]
});

updateAP('AP-11', {
  shortDesc: "Ambiguous ownership where multiple teams claim responsibility for a service or nobody claims responsibility for critical infrastructure. Every decision becomes a meeting.",
  warningSigns: [
    "When something breaks, the first 30 minutes are spent figuring out who should fix it",
    "Multiple teams have commit access to the same repository with no clear ownership",
    "Services have no documented owner or on-call rotation",
    "Requests for changes get bounced between teams: 'I thought you owned that'"
  ],
  impact: "Within 1-2 quarters: critical bugs sit in queue while teams argue about who fixes them; features requiring cross-team coordination stall; trust erodes as work falls through cracks.",
  recoveryActions: [
    "Create a service→team→on-call→contact registry within 1 week and enforce single-team ownership for every service.",
    "For any shared/platform service, assign a clear DRI (Directly Responsible Individual) with authority to make decisions.",
    "Review registry monthly; if you find ambiguous ownership, escalate to director level immediately — fix it before more work queues.",
    "Use the rule: 'For service X, who decides if it ships?' If the answer isn't immediate, ownership is still ambiguous."
  ]
});

updateAP('AP-37', {
  shortDesc: "Re-org executed without structured communication or transition plan. People blindsided by changes; rumor mill fills the void; talented engineers leave because they feel disrespected.",
  warningSigns: [
    "Re-org announced to managers without coordination plan for how to roll out",
    "ICs find out about changes via Slack or gossip, not from their manager",
    "No transition timeline: team assignments change without a 30-day ramp period",
    "Duplicate ownership or gaps appear in first week because handoff wasn't explicit"
  ],
  impact: "Within 1-2 quarters: regrettable attrition spikes; productivity destroyed for 2-3 months while people figure out new structure; psychological safety erodes; trust in leadership tank.",
  recoveryActions: [
    "For any re-org, create a communication and transition plan within first 3 days: who tells whom, in what order, with what messaging.",
    "Manager-first communication (24 hours early if possible) so managers can field questions and anxiety directly.",
    "All-hands within 24 hours of IC notification with clear rationale, org chart, and Q&A.",
    "Explicit transition plan: 30 days minimum; named DRI for each workstream transition; daily blockers cleared by the transition team."
  ]
});

updateAP('AP-74', {
  shortDesc: "Team grows without structure; ownership becomes unclear, cognitive load explodes, coordination overhead balloons. Eventually team must be split, but late (after productivity already degraded).",
  warningSigns: [
    "Team size >12 people with >5 active service ownership domains",
    ">30% of sprint work requires cross-team coordination or review",
    "Team members report confusion about who owns what; decisions take longer as team size grows",
    "On-call rotation becoming unsustainable; shared context is lost"
  ],
  impact: "Within 1-2 quarters: team productivity drops as coordination overhead grows; cognitive load exhausts senior engineers; decision velocity slows; team splits become chaotic because deferred too long.",
  recoveryActions: [
    "Monitor team health quarterly: size, number of service domains, coordination overhead %, meeting load per engineer.",
    "Trigger re-org evaluation when: team >10 people managing >8 services, OR >20% of work requires cross-team coordination for 2+ consecutive quarters.",
    "Plan split by matching teams to value streams, not by arbitrary size cuts.",
    "Use inverse Conway: desired architecture should dictate team structure, not the reverse."
  ]
});

updateAP('AP-75', {
  shortDesc: "Strategic intent is vague or internal-facing; engineers don't understand why the org is structured this way or how their work connects to business outcomes. Local optimization replaces strategic alignment.",
  warningSigns: [
    "Team-level OKRs don't obviously connect to org-level strategy",
    "Engineers can't explain why their team is structured as it is beyond 'someone decided'",
    "Strategic direction changes frequently without visible reason; engineers feel whiplashed",
    "Team retros devolve into griping about org decisions instead of proposing changes"
  ],
  impact: "Within 2-3 quarters: teams optimize for their local success at expense of org-wide outcomes; duplicated effort across teams; strategic direction feels arbitrary; senior engineers leave for organizations with clearer purpose.",
  recoveryActions: [
    "Articulate strategic intent in business outcome terms (not engineering jargon): 'We need to reduce customer churn by X%, and that requires improving Y capability.'",
    "Cascade to team-level OKRs with explicit trade-off rationale: 'Why does this team own this piece? How does their work connect to reducing churn?'",
    "Use quarterly all-hands to reinforce strategic pillars and connect team work to org outcomes.",
    "Revisit org structure decision rationale annually: ask 'does our org structure still support our strategy?' If no, re-org."
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

updatePlaybook('P-C1-1', {
  whatGoodLooksLike: "Within 1 week: decide on new team topology and communicate to managers. Within 2 weeks: full org chart and ownership changes communicated to all ICs with Q&A. Within 30 days: transition completed; new team assignments effective. Outcome: zero regrettable attrition; teams productive within 3 weeks; people feel heard and respected. Measured by: attrition tracking post-re-org, velocity recovery by week 4, team sentiment survey."
});

updatePlaybook('P-C1-2', {
  whatGoodLooksLike: "Within 1 week: current team topology and architecture documented; misalignments identified. Within 2 weeks: target topology proposed aligned with desired architecture. Within 6 weeks: new team structure operational. Outcome: teams can deploy independently without cross-team handoffs; coordination overhead drops from 30% to <5%. Measured by: coordination overhead metrics, deployment frequency trend, handoff count trend."
});

updatePlaybook('P-C1-3', {
  whatGoodLooksLike: "Within 1 week: service→team→contact registry created. Within 2 weeks: registry published and socialized; every team knows the canonical owner for every service. Within 1 month: zero ownership ambiguity incidents reported; disputes resolve in <4 hours. Outcome: clear authority on all decisions; coordination requires no permission because authority is transparent. Measured by: time-to-resolve ownership disputes, team survey on clarity."
});

updatePlaybook('P-C1-4', {
  whatGoodLooksLike: "Within 2 weeks: strategic pillars drafted and socialized with leadership. Within 1 month: team-level OKRs aligned to strategic pillars; connection documented. Within 1 quarter: every team can articulate how their current work connects to strategic outcomes. Outcome: decisions are locally autonomous because they're constrained by clear strategy; reduced need for approval-seeking because intent is transparent. Measured by: team ability to articulate strategic connection (survey), decision velocity trend."
});

updatePlaybook('P-C1-5', {
  whatGoodLooksLike: "Within 2 weeks: re-org signals identified via health scoring (size, coordination overhead, cognitive load). Within 1 month: re-org decision made and communicated. Within 60-90 days: new structure operational. Outcome: team splits feel proactive, not reactive; happen before productivity degrades. Measured by: lead time from signal detection to re-org completion, productivity impact post-re-org vs. historical re-orgs."
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

updateIQ('IQ-01', {
  lookFor: [
    "Describes specific misalignment between org structure and architecture they fixed, with measurable outcome (e.g., handoff rate reduction)",
    "Names a specific stream-aligned vs. layer-aligned decision and why stream-alignment won",
    "Shows cognitive load consideration: explains how they right-size team scope to avoid overload",
    "Articulates inverse Conway principle: 'We designed the org to produce the architecture we wanted'"
  ],
  redFlags: [
    "Cannot describe their org structure rationale beyond 'that's how it was when I got here'",
    "Makes org decisions without considering architecture implications",
    "Teams remain layer-aligned (backend, frontend, data) without justification",
    "Treats re-orgs as purely personnel moves without considering work topology"
  ]
});

updateIQ('IQ-48', {
  lookFor: [
    "Explicitly states ownership model for their org — can name who owns every critical service",
    "Describes a dispute about ownership and how they resolved it (escalation path, DRI decision)",
    "Maintains a registry or system of record for ownership; can pull it up during conversation",
    "Uses the 'who decides?' test to validate ownership clarity"
  ],
  redFlags: [
    "Ownership is fuzzy — 'we share responsibility' for critical services",
    "Cannot quickly name the owner of their team's key dependencies",
    "No documented registry of ownership; relies on institutional knowledge",
    "Has tolerated ambiguous ownership for >1 month without fixing it"
  ]
});

updateIQ('IQ-14', {
  lookFor: [
    "Describes a re-org they executed with communication plan, transition timeline, and measured attrition impact",
    "Can state: how many regrettable departures occurred, how long until team was productive, how they managed anxiety",
    "Handled tough conversations directly — followed up individually with affected engineers",
    "Executed re-org through phases with explicit handoff points, not a big-bang change"
  ],
  redFlags: [
    "Re-org caused regrettable attrition that they attribute to other factors",
    "Team spent >4 weeks recovering productivity post-re-org",
    "People found out about the re-org through rumor or Slack, not from management",
    "No structured communication plan — just announced the new structure and moved on"
  ]
});

updateIQ('IQ-80', {
  lookFor: [
    "Clearly articulates org strategy in business outcome terms (not engineering jargon)",
    "Shows how team-level OKRs connect to org strategy with specific examples",
    "Demonstrates why org is structured the way it is in service of strategy",
    "Updates strategy as business needs change; treats org structure as a strategic lever"
  ],
  redFlags: [
    "Strategy is vague or internally focused ('scale the platform', 'improve quality')",
    "Team OKRs don't have visible connection to stated org strategy",
    "Org structure is static — hasn't changed despite shifts in business direction",
    "Cannot explain to a new hire why their team was created or how it fits the bigger picture"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT.JSON ────────────────────────────────────────────────
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c1sa = sa.find(s => s.capabilityId === 'C1');
if (c1sa) {
  c1sa.behavioralAnchors[0].description = "Operates within team boundaries without understanding broader org context; cannot articulate how their work connects to other teams or strategic intent; unsure why teams are structured as they are";
  c1sa.behavioralAnchors[1].description = "Understands their team's dependencies and basic org topology; can explain some rationale for org structure; beginning to recognize coordination overhead as a problem";
  console.log('  ✓ C1 self-assessment L1-L2 anchors sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT-GUIDANCE.JSON ───────────────────────────────────────────
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c1mg = mg.find(m => m.capabilityId === 'C1');
if (c1mg) {
  // Strip company references from leading indicators
  c1mg.leadingIndicators = [
    "Org topology registry maintained and up-to-date",
    "Cross-team handoff frequency tracked as % of total work",
    "Team cognitive load assessed via quarterly health survey (services owned, domains, on-call scope)",
    "Ownership ambiguity incidents logged and tracked",
    "Strategic alignment visible in team-level OKRs and documented connections",
    "Re-org signals monitored via coordination overhead and team health metrics"
  ];
  // Strip company references from lagging indicators
  c1mg.laggingIndicators = [
    "Org structure changes are proactive (signals detected early), not reactive (after productivity impacts)",
    "Cross-team coordination overhead <5% of total sprint work",
    "Re-orgs execute with zero regrettable attrition (measured post-re-org)",
    "Team productivity restored within 3-4 weeks of structural change",
    "Ownership disputes resolved in <24 hours on average",
    "Deployment frequency stable or improving after structural changes"
  ];
  console.log('  ✓ C1 measurement guidance indicators cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING-PATHWAYS.JSON ─────────────────────────────────────────────
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c1lp = lp.find(l => l.capabilityId === 'C1');
if (c1lp) {
  // Clean foundational resource descriptions (strip marketing copy)
  if (c1lp.foundational[0]) c1lp.foundational[0].description = "Team topology patterns: stream-aligned teams, platform teams, enabling teams. Why org structure is a technical decision with direct impact on architecture and delivery speed.";
  if (c1lp.foundational[1]) c1lp.foundational[1].description = "Conway's Law and inverse Conway: how org structure drives architecture whether intentional or not. Using org design to produce desired architecture.";
  if (c1lp.foundational[2]) c1lp.foundational[2].description = "Cognitive load theory: how to right-size team scope to avoid overload. Assessing cognitive load across different org models.";
  if (c1lp.foundational[3]) c1lp.foundational[3].description = "Strategic planning and OKRs: translating business outcomes to team-level objectives with clear decision trade-offs.";

  // Clean practical resource descriptions
  if (c1lp.practical[0]) c1lp.practical[0].description = "Team topology workshop: map current state, desired state, and transition plan for org restructuring.";
  if (c1lp.practical[1]) c1lp.practical[1].description = "Executing a re-org: communication plan, transition timeline, managing anxiety, measuring success.";
  if (c1lp.practical[2]) c1lp.practical[2].description = "Building a service ownership registry: documenting single-threaded ownership, resolving ambiguity, maintaining as source of truth.";

  // Clean advanced resource descriptions
  if (c1lp.advanced[0]) c1lp.advanced[0].description = "Designing org for scale: how stream-aligned teams, clear ownership, and cognitive load management enable scaling without chaos.";
  if (c1lp.advanced[1]) c1lp.advanced[1].description = "Strategic org design: using org structure as a lever to execute business strategy and shape technical direction.";
  if (c1lp.advanced[2]) c1lp.advanced[2].description = "Mentorship: peer learning with other directors on org design decisions, re-org execution, and strategic alignment.";

  console.log('  ✓ C1 learning pathways descriptions cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C1 deep cycle complete. All files updated.');

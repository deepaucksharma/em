#!/usr/bin/env node
/**
 * C5 (Cross-Functional Influence) Deep Cycle
 * Applies ultra-strict content validation across all C5 items.
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
let c5cap = caps.find(c => c.id === 'C5');
c5cap.description = "Assessed by: cross-functional stakeholder satisfaction, influence on major decisions, stakeholder escalation reduction, and peer feedback credibility. Absence causes: misaligned initiatives, cross-functional blame games, delayed delivery from lack of coordination, and EM isolation from product/design leadership.";
c5cap.enabledBy = [];
writeJSON('capabilities.json', caps);
console.log('  ✓ C5 description rewritten to diagnostic format');

// ─── 2. OBSERVABLES.JSON ────────────────────────────────────────────────────
console.log('Processing observables.json...');
let obs = readJSON('observables.json');

function updateObs(id, changes) {
  const o = obs.find(x => x.id === id);
  if (!o) { console.error(`  ✗ Observable ${id} not found`); return; }
  Object.assign(o, changes);
  console.log(`  ✓ ${id} updated`);
}

updateObs('C5-O1', {
  why: "Misaligned triad causes rework, delays, scope fights, and blame games. The Eng/PM/Design triad is the atomic unit of product development — breakdowns here cascade into missed deadlines, quality problems, and interpersonal friction.",
  how: "Run weekly triad syncs with shared context documents; establish joint roadmap ownership with explicit DACI roles; resolve disagreements through data and structured trade-off analysis using a shared decision matrix. Document decisions made and trade-offs accepted. Create one-pager showing how each function's constraints shaped the final decision. Validate with metric 2.5 (Sprint Commitment Accuracy) and 3.6 (Incident Rate by Severity).",
  expectedResult: "Within 2 quarters: aligned decisions balancing user needs, business goals, and technical feasibility; cross-functional escalations drop to near-zero; triad partners actively seek each other's input on scope decisions; no rework from misalignment."
});

updateObs('C5-O2', {
  why: "When EMs hide engineering constraints from product, product makes unrealistic commitments. When product hides market/business pressures from engineering, engineers over-engineer for non-existent requirements. Transparent constraint sharing prevents both.",
  how: "Create shared constraint visibility documents: engineering shares technical debt, capacity limits, and dependency risks monthly; product shares market windows, competitor moves, and customer requests. Use these constraints explicitly in planning. Do a quarterly 'constraint reset' where each function shares top 3 constraints that should influence the next quarter's planning.",
  expectedResult: "Within 1 quarter: product accurately understands engineering capacity and scheduling constraints; engineering understands market urgency and business priorities; planning conversations shift from blame ('why didn't you build it?') to trade-offs ('what's the minimum viable scope given constraints?')."
});

updateObs('C5-O3', {
  why: "Unresolved cross-functional conflicts escalate to leadership, signaling that peer-level influence is weak. Leadership overhead from resolving engineering-product disputes is a sign the triad is broken. Healthy triads resolve disagreements at the pair level.",
  expectedResult: "Within 2 quarters: escalations from cross-functional disagreements drop to fewer than 1 per quarter; disputes resolved through data and structured frameworks; leadership time on cross-functional alignment reduces by 50%."
});

updateObs('C5-O4', {
  why: "Design lacks engineering context and builds flows that require architectural changes; engineering lacks design input and builds systems that constrain product options; product lacks both and makes commitments that satisfy neither. Early collaboration prevents expensive rework.",
  how: "Involve engineering in design critique: do design reviews with engineering present; flag architectural implications early. Involve design in architecture decisions: do tech talks and design walkthroughs to share how system constraints affect user experience. Include design feedback in tech specs. Validate with metric 3.6 (Incident Rate by Severity) and 4.1 (Feature Completeness)."
});

updateObs('C5-O5', {
  why: "PM-Eng tensions surface as 'product always changes their mind' (eng perspective) or 'engineering always says no' (product perspective). Both are symptoms of poor information flow — either product has imperfect market data or engineering doesn't understand the business rationale.",
  how: "Share decision rationale alongside decisions. When product deprioritizes, explain the market change that drove the shift. When engineering says a feature is infeasible, explain what's actually hard and what might be possible with different constraints. Pair on hard trade-offs rather than alternating who 'wins.'"
});

updateObs('C5-O6', {
  why: "Stakeholder trust erodes when EMs are perceived as lacking engineering credibility or understanding of business/product realities. Trust is the capital that makes influence possible.",
  expectedResult: "Within 2 quarters: peer feedback from PM and design leaders cites EM's technical acumen and business judgment; no reputation for being either 'too technical' or 'too businessy'; EM sought out for perspective before major decisions."
});

updateObs('C5-O7', {
  why: "Product/design decisions made without engineering input create technical debt, scalability problems, and ops complexity. Late engineering involvement means rework or acceptance of poor solutions.",
  how: "Establish 'engineering office hours' — 30 min weekly slots where product/design can ask technical feasibility questions before committing. Do lightweight architecture reviews on major features before design phase completes. Pair engineers with designers on explorations. Validate with metric 3.2 (Cycle Time) and 8.6 (Tech Debt Ratio)."
});

updateObs('C5-O8', {
  why: "Without clear escalation paths, conflicts either fester (breaking the triad) or escalate prematurely (overwhelming leadership). Clear escalation criteria help teams resolve disagreements at the appropriate level.",
  how: "Define escalation criteria: if triad can't decide in 1 meeting, document the disagreement, options, and what info would resolve it. Identify who decides in each domain: PM decides product scope, Design decides UX, Eng decides technical approach (within agreed constraints). Escalate only when the decision affects someone else's domain or overall strategy. Validate with metric 2.3 (Cycle Time)."
});

updateObs('C5-O9', {
  why: "Cross-functional teams without cadenced alignment drift apart — each function optimizes locally rather than for the outcome. Regular forums prevent drift and surface misalignment early.",
  how: "Run triads or cross-functional pods: weekly tactical sync (blockers, next steps), monthly strategic review (progress vs. roadmap, reprioritization), quarterly planning (next quarter scope). Use running notes to create institutional memory. Celebrate joint wins — reinforce that success belongs to the triad, not individuals."
});

updateObs('C5-O10', {
  why: "EMs who work only with their own team lack visibility into product direction and business context. Isolation means engineering is reactive rather than anticipatory.",
  how: "Attend product planning meetings (not just product review meetings). Sit in on user research sessions quarterly. Participate in business planning conversations. Be proactive in offering engineering perspective on strategic decisions, not just reactive to product asks. Validate with metric 8.1 (OKR Achievement Rate)."
});

updateObs('C5-O11', {
  why: "Misaligned incentives drive conflicts: if product is incentivized on feature velocity, PM will push for quick-and-dirty implementations; if engineering is incentivized on zero-incident deployments, Eng will resist shipping new features. Shared success metrics align incentives.",
  how: "Define shared success metrics where possible: joint OKRs that require all three functions to succeed. For example: 'Ship feature X to 50% of users within Q2 with zero Sev1 incidents and <3% quality rejects.' This forces the triad to collaborate on the trade-off between speed, quality, and scope. Validate with metric 8.1 (OKR Achievement Rate)."
});

updateObs('C5-O12', {
  why: "Vague communication ('we need to ship faster' or 'we're worried about reliability') doesn't resolve disagreements. Structured frameworks (Five Whys, Trade-off Analysis, DACI) make disagreements discussable instead of political.",
  how: "Use structured frameworks for hard conversations: trade-off analysis that shows what you're accepting and rejecting; DACI for clarity on who decides; Five Whys to surface root cause before proposing solutions. Insist on data-backed positions. Document the decision and what assumptions change it."
});

updateObs('C5-O13', {
  why: "New initiatives fail because exec expectation (set without engineering input) collides with engineering reality. Early engineering involvement in planning prevents scope suicide.",
  how: "Participate in strategic planning earlier. When leadership is exploring a new initiative, get engineering input on feasibility, team capacity, and timeline before a launch date gets promised. Be willing to say 'we need a 3-month discovery phase to see if this is even possible.' Validate with metric 2.5 (Sprint Commitment Accuracy)."
});

updateObs('C5-O14', {
  why: "Trust is built through repeated, positive interactions where each party does what they said. Broken commitments or surprises destroy trust faster than any single conflict.",
  expectedResult: "Within 2 quarters: EM-PM-Design relationships characterized by predictability (you do what you say); scope commitments hit 85%+ of their targets; surprise discoveries or changes drop to <2 per quarter."
});

updateObs('C5-O15', {
  why: "Cross-functional collaboration skills are rare and learnable. EMs who develop them become invaluable to leadership because they unblock whole organizations.",
  how: "Observe great cross-functional leaders; pair with mature PMs/designers on difficult conversations; take communication and negotiation training; read case studies of failed vs. successful cross-functional partnerships."
});

updateObs('C5-O16', {
  why: "Product and Design leaders respect EMs who understand their constraints and priorities, not just push back on every ask. Respect is earned through demonstrating you understand the other function's world."
});

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
updateSig('SIG-106', {
  signalText: "Triad health is measurable: 'Weekly syncs with shared docs, DACI clarity on who decides scope/UX/technical approach, no scope escalations in last 2 quarters'. Evidence: meeting notes show joint decision-making; stakeholder feedback confirms collaboration."
});

updateSig('SIG-107', {
  signalText: "Cross-functional conflict resolution skill: 'Mediated disagreement between Product and Design on timeline, resolved through shared data and trade-off analysis rather than escalation'. Evidence: decision documented with options considered and rationale for chosen path."
});

updateSig('SIG-108', {
  signalText: "Early involvement in planning: 'Identified [X] technical constraints in pre-planning phase, shaped roadmap before commitments were made'. Evidence: pre-planning feedback integrated into final roadmap; fewer scope surprises in execution."
});

updateSig('SIG-109', {
  signalText: "Stakeholder credibility: peer feedback from PM/Design leaders cites EM as credible technical voice and business-aware partner. 'We trust [EM] to think beyond engineering; we ask for perspective before big decisions.'"
});

updateSig('SIG-110', {
  signalText: "Transparency on constraints: 'Shared [X] engineering constraints with Product/Design monthly; roadmap decisions reflect understanding of technical reality'. Evidence: constraint docs; roadmap reflects realistic timelines."
});

updateSig('SIG-111', {
  signalText: "Escalation discipline: 'Fewer than 1 cross-functional escalation per quarter to leadership'. Threshold: escalations should be rare; most triad conflicts resolved at pair level with data."
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

updateAnchor('C5-1', {
  level1Developing: "Scope: Individual. Key Behavior: Works primarily within engineering; limited visibility into product/design strategy; reactive to product asks. Artifact: None — collaboration is ad hoc. Distinguishing Test: Cannot articulate the product roadmap or explain why product prioritized the current quarter's top 3 items.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Attends some cross-functional meetings; beginning to understand product constraints; responds to product/design input but doesn't proactively seek it. Artifact: Attendance at cross-functional forums. Distinguishing Test: Can describe product goals but hasn't influenced a major planning decision; waits for product to ask rather than volunteering perspective.",
  level3Competent: "Scope: Team (proactive). Key Behavior: Active participant in triad; shares engineering constraints transparently; influences decisions through data and structured frameworks; scope surprises rare. Artifact: Weekly triad sync notes with shared decision rationale; documented constraints and trade-offs. Distinguishing Test: Triad partners seek engineering input on scope/feasibility before finalizing plans; product/design explicitly reference engineering constraints in decisions.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Cross-functional practices shared across teams; influences product strategy through early involvement in planning; mediates conflicts between Product and Design from engineering perspective. Artifact: Cross-team triad frameworks; documented planning involvement in major initiatives. Distinguishing Test: Other EMs adopt cross-functional practices; leadership invites engineering input on strategic decisions before commitments are made.",
  level5Advanced: "Scope: Org. Key Behavior: Engineering voice integrated into org-level strategy; cross-functional collaboration is a cultural norm; influences long-horizon roadmap decisions. Artifact: Org-wide cross-functional governance with engineering representation. Distinguishing Test: Engineering perspective shapes business strategy; major initiatives reflect technical feasibility analysis from the planning phase."
});

updateAnchor('C5-2', {
  level1Developing: "Scope: Individual. Key Behavior: Conflicts with product/design often escalate to leadership; communication is unclear or politicized. Artifact: None. Distinguishing Test: Leadership frequently resolves cross-functional disagreements; EM describes conflicts in blame language ('product always changes their mind').",
  level2Emerging: "Scope: Team (emerging). Key Behavior: Attempts to resolve disagreements with product/design; communication improving but still occasional misalignment; escalations less frequent but still happen quarterly. Artifact: Informal conversation attempts. Distinguishing Test: Can resolve 1:1 disagreements but struggles with complex multi-party conflicts.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Uses structured frameworks (trade-off analysis, DACI) to resolve disagreements; escalations rare (<1 per quarter); stakeholders describe collaboration as professional and data-driven. Artifact: Documented decision frameworks and resolved disagreement examples. Distinguishing Test: Triad members describe EM as collaborative and respectful of different perspectives; disagreements resolved at team level without escalation.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Helps adjacent teams resolve cross-functional conflicts; frameworks adopted across teams; relationship-building skills evident in ease of working with stakeholders across organization. Artifact: Cross-team collaboration norms and documented conflict resolution patterns. Distinguishing Test: Other teams seek this EM's mediation help; reputation for fair-mindedness and understanding of multiple perspectives.",
  level5Advanced: "Scope: Org. Key Behavior: Org-level cross-functional health improved; stakeholder satisfaction with engineering collaboration high; influences how the org handles cross-functional complexity. Artifact: Org-wide collaboration frameworks; cross-functional satisfaction metrics trending upward. Distinguishing Test: Other functions cite this leader's influence as a major reason for better engineering-business alignment."
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

updateAP('AP-05', {
  shortDesc: "EM focuses exclusively on engineering and treats product/design as 'the business side.' Engineering is isolated, reactive to asks, and develops an oppositional relationship with Product.",
  warningSigns: [
    "EM doesn't attend product planning or strategy meetings",
    "Engineering is surprised by major initiatives or scope changes",
    "Decisions are presented to engineering as done deals rather than negotiated",
    "Communication with Product/Design is primarily through email or async comments, not synchronous discussion",
    "EM describes Product as 'always changing their mind' or Design as 'unrealistic'"
  ],
  impact: "Within 2-3 quarters: engineering becomes delivery-only, not strategic; product/design stops trusting engineering feasibility input; scope surprises and rework become common; EM is excluded from important planning conversations.",
  recoveryActions: [
    "Start attending product planning meetings and ask clarifying questions about priorities and market context.",
    "Schedule 1:1s with PM and Design lead to understand their constraints and goals; share engineering's constraints.",
    "Volunteer engineering perspective on upcoming initiatives — be proactive, not reactive.",
    "Co-author roadmaps or planning documents with PM; ensure engineering constraints are reflected before commitments are made.",
    "Build trust through consistency: do what you commit to; escalate obstacles early rather than surprising people."
  ]
});

updateAP('AP-39', {
  shortDesc: "EM says yes to every product ask and commits to unrealistic timelines. Engineering is constantly overloaded, quality suffers, and the team burns out from perpetual crunch mode.",
  warningSigns: [
    "Commitment accuracy is <70%; scope regularly carries over or misses deadlines",
    "Engineers report they're always in crunch mode; burnout signals rising in pulse surveys",
    "Quality metrics degrade (increased bugs, more rollbacks, higher incident rate)",
    "EM hasn't said 'no' or negotiated scope in the last 2 quarters",
    "Product/Design treats engineering commitments as aspirational guidance, not firm plans"
  ],
  impact: "Within 1-2 quarters: team burnout rises; quality degrades; senior engineers leave; velocity becomes unpredictable; stakeholder trust erodes when commitments aren't met anyway.",
  recoveryActions: [
    "Make your current capacity visible: if you're at 100% utilization, you can't say yes to more.",
    "Learn to negotiate scope, not time: 'We can ship this in 2 weeks if we cut this feature' instead of 'I'll figure out how to fit it in.'",
    "Start refusing some asks: begin with lower-impact items to build the skill.",
    "Track and share commitment accuracy weekly; let the data show when you're overcommitted.",
    "Set a minimum 20% capacity buffer for unexpected work, on-call, and tech debt."
  ]
});

updateAP('AP-50', {
  shortDesc: "EM blames Product for scope creep or poor planning without examining whether engineering communicated constraints clearly. 'Product doesn't understand engineering reality' but engineering never explained it.",
  warningSigns: [
    "EM complains about Product/Design decisions being 'unrealistic' but never pushed back during planning",
    "Engineering constraints are implicit, not documented or shared proactively",
    "Surprises surface late (in implementation) rather than early (in planning)",
    "EM's explanation of why work took longer is defensive, not explanatory"
  ],
  impact: "Within 2 quarters: Product loses confidence in engineering's ability to estimate; scope becomes a battleground; blame culture develops; escalations increase.",
  recoveryActions: [
    "Write down your constraints and share them with Product/Design monthly — don't assume they know.",
    "When asked for a timeline, explain the assumptions: 'This is 4 weeks assuming X resources and no interruptions; with Y interrupts, it's 6 weeks.'",
    "During planning, flag technical risks before commitments are made, not during delivery.",
    "When delivering late, explain what was harder than expected — help Product understand the actual constraints.",
    "Frame communication as 'here's what's possible' rather than 'you should have asked differently.'"
  ]
});

updateAP('AP-51', {
  shortDesc: "EM hoards engineering information and doesn't share constraints, capacity limits, or technical risks with Product. Product makes unrealistic commitments because they don't understand what's actually possible.",
  warningSigns: [
    "Product frequently commits to things engineering didn't know were needed until mid-sprint",
    "Engineering capacity and constraints are unknown to Product/Design",
    "EM is the only person who can answer 'can we do X?' questions from Product",
    "Product treats all feature requests as equally doable"
  ],
  impact: "Within 2 quarters: Product makes unrealistic commitments; engineering is constantly surprised and overcommitted; relationship deteriorates as Product feels engineering is uncooperative.",
  recoveryActions: [
    "Create a shared constraints doc: document technical debt, capacity limits, dependency risks; share with Product/Design monthly.",
    "Run monthly 'capacity and constraints' planning meeting where engineering shares what's possible and what's not given current state.",
    "Teach your team to be transparent: any engineer can explain a technical constraint to Product; it's not EM-only information.",
    "Make tradeoffs visible: 'If you want feature X, you're getting feature Y delayed by 2 weeks or we drop feature Z.'"
  ]
});

updateAP('AP-60', {
  shortDesc: "EM avoids all conflict and never disagrees with Product/Design. Concerns about feasibility, quality, or timeline are swallowed; EM just finds a way to make it work.",
  warningSigns: [
    "EM is known as 'always agreeable' but engineering feels unheard",
    "Engineering workarounds and heroics accumulate because nobody pushed back on unrealistic plans",
    "EM's 1:1 feedback from Product/Design is consistently 'great to work with' but team morale is low",
    "Cross-functional disagreements never surface — either EM absorbs the conflict or the team does"
  ],
  impact: "Within 2 quarters: team burns out from accepting impossible asks; quality degrades as corners are cut; EM loses credibility with engineering because they didn't advocate for realistic scope.",
  recoveryActions: [
    "Start small: disagree on one small thing this month to build the skill.",
    "Frame disagreement as 'here's another perspective' not 'you're wrong.'",
    "Prepare specific data before disagreeing: 'We'll need X engineer-weeks for this, which pushes back Y by 2 weeks. Here are our options.'",
    "Practice saying 'that's not feasible at that timeline' and then proposing alternatives.",
    "Get feedback from Product/Design on whether they find your perspective valuable; most good partners appreciate thoughtful pushback."
  ]
});

updateAP('AP-76', {
  shortDesc: "EMs have unclear decision authority with Product and Design. It's not clear who decides scope, who decides timeline, who decides technical approach. Every decision becomes a negotiation or escalation.",
  warningSigns: [
    "Same disagreements recur because decision authority was never clarified",
    "Escalations are common because it's unclear who should decide",
    "EM second-guesses their own decisions because authority wasn't explicit",
    "Product/Design are unclear on whether Engineering's technical input is advisory or veto"
  ],
  impact: "Within 1-2 quarters: decision-making slows because nobody knows who decides; conflicts escalate because process is unclear; relationships degrade from ambiguity.",
  recoveryActions: [
    "Have an explicit conversation with PM and Design: 'Who decides scope? Timeline? Technical approach? When there's disagreement, how do we resolve it?'",
    "Document this as a decision authority matrix: PM decides product scope (within technical feasibility); Design decides UX (within performance budgets); Eng decides technical approach (within scope and timeline constraints).",
    "Use the matrix to resolve disagreements: 'This is a scope decision, so PM decides; we're providing technical feasibility input.'",
    "Revisit this quarterly — adjust as the team matures or context changes."
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

updatePlaybook('P-C5-1', {
  whatGoodLooksLike: "Within 2 weeks: first triad sync scheduled with documented format (shared context, decision framework, DACI roles). Within 1 month: shared constraints doc created; Product/Design understand engineering capacity limits. Within 2 months: first major decision made jointly with documented rationale. Outcome: triad operates as a unit; scope surprises drop. Measured by: escalation count, shared decision documentation quality, scope commitment accuracy."
});

updatePlaybook('P-C5-2', {
  whatGoodLooksLike: "Within 1 week: conversation with PM and Design lead: understand their top concerns and constraints. Within 2 weeks: attend product planning session; ask questions; share engineering perspective. Within 1 month: volunteer engineering input on an upcoming initiative. Outcome: EM is invited to planning conversations; relationships deepen. Measured by: invitation frequency, quality of engineering input valued by PM/Design, initiatives that reflect engineering input."
});

updatePlaybook('P-C5-3', {
  whatGoodLooksLike: "Within 2 weeks: decision authority matrix drafted with PM/Design. Within 1 month: tested in a real disagreement (resolved using matrix). Within 2 months: adopted and referenced in team communication. Outcome: future disagreements resolve faster because process is clear. Measured by: escalation count, team perception of clarity, time-to-resolution for disagreements."
});

updatePlaybook('P-C5-4', {
  whatGoodLooksLike: "Within 1 month: constraints doc published with engineering capacity, tech debt, and architectural limits. Updated monthly. Within 2 months: Product/Design reference constraints in planning decisions. Within 1 quarter: surprise scope changes drop to <2 per quarter. Outcome: alignment increases because both sides understand reality. Measured by: Product/Design survey on perceived constraint clarity, scope surprise count, commitment accuracy."
});

updatePlaybook('P-C5-5', {
  whatGoodLooksLike: "Within 2 weeks: peer feedback collected from PM and Design leads. Within 1 month: specific reputation-building actions (e.g., volunteer for cross-functional working group). Within 1 quarter: subtle shift in how peers talk about engineering — from 'they always resist change' to 'they think about the bigger picture.' Outcome: EM's credibility grows; influence increases naturally. Measured by: peer feedback evolution, invitations to strategic discussions, cited influence examples."
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

updateIQ('IQ-11', {
  lookFor: [
    "Describes a specific recent disagreement with Product/Design and how they resolved it together",
    "Can articulate the other function's constraints and goals, not just engineering's perspective",
    "Uses data or structured frameworks to explain how decisions are made (trade-off analysis, DACI)",
    "Demonstrates that they sought input from Product/Design before finalizing engineering approach, not just notified them after"
  ],
  redFlags: [
    "Describes cross-functional relationships only in terms of conflicts or resistance",
    "Cannot articulate what Product/Design are trying to achieve; only knows what they asked engineering to build",
    "Decisions are made unilaterally by engineering with no input from other functions",
    "Describes Product/Design in dismissive language ('they don't understand engineering' or 'they always change their minds')"
  ]
});

updateIQ('IQ-14', {
  lookFor: [
    "Participates in product/business planning, not just engineering planning",
    "Can describe a recent initiative where engineering input shaped the approach before work started",
    "Knows the product roadmap for the next 2 quarters and explains the business rationale",
    "Gives examples of proposing engineering solutions to business problems, not just responding to asks"
  ],
  redFlags: [
    "Only attends engineering-specific meetings; doesn't know what Product is planning beyond next quarter",
    "Reactive stance: engineering waits to be asked, doesn't proactively shape plans",
    "Cannot articulate the business rationale for the current quarter's priorities",
    "EM is surprised by major product announcements or strategy shifts"
  ]
});

updateIQ('IQ-68', {
  lookFor: [
    "Specific example of a complex disagreement with Product or Design and how they handled it",
    "Used structured framework (trade-off analysis, DACI, shared data) to discuss the disagreement",
    "Listened to the other perspective before advocating for engineering's position",
    "Resolution was collaborative, not a win-loss outcome"
  ],
  redFlags: [
    "Avoids conflict; doesn't push back on unrealistic asks",
    "Conflicts are described as Product/Design making bad decisions, not as legitimate disagreements",
    "Resolution usually involves escalation to leadership",
    "No specific examples; generalizations about cross-functional challenges"
  ]
});

updateIQ('IQ-72', {
  lookFor: [
    "Names their PM and Design partner's current top priorities and explains the business context",
    "Describes a time they volunteered engineering perspective on a decision outside their direct scope",
    "Peer feedback citing this EM as credible and collaborative",
    "Initiate conversations with Product/Design, not only when asked"
  ],
  redFlags: [
    "Vague about what Product/Design are trying to achieve",
    "Never volunteers perspective; waits to be asked",
    "Doesn't know their counterparts' priorities",
    "Doesn't maintain regular 1:1s with PM/Design leads"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT.JSON ────────────────────────────────────────────────
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c5sa = sa.find(s => s.capabilityId === 'C5');
if (c5sa) {
  c5sa.behavioralAnchors[0].description = "Works primarily within engineering; doesn't attend product/design planning; reactive to product asks without proactive input";
  c5sa.behavioralAnchors[1].description = "Attends some cross-functional meetings and beginning to understand product/design perspectives; responds to input but doesn't proactively shape decisions";
  console.log('  ✓ C5 self-assessment L1-L2 anchors sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT-GUIDANCE.JSON ───────────────────────────────────────────
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c5mg = mg.find(m => m.capabilityId === 'C5');
if (c5mg) {
  // Strip company references from leading indicators
  c5mg.leadingIndicators = [
    "Regular triad syncs (weekly or bi-weekly) with documented agendas and decisions",
    "Shared constraints and capacity planning documents reviewed monthly",
    "Early engineering involvement in planning cycles (pre-commitment validation)",
    "Cross-functional satisfaction survey scores for collaboration quality",
    "Decision authority matrix documented and referenced in dispute resolution",
    "Peer 1:1s with PM and Design leads scheduled regularly and consistent"
  ];
  // Strip company references from lagging indicators
  c5mg.laggingIndicators = [
    "Cross-functional escalations (fewer than 1 per quarter)",
    "Scope change requests mid-sprint (trend toward zero)",
    "Peer feedback from Product/Design on engineering collaboration credibility",
    "Commitment accuracy (scope delivered vs. scope committed) stays above 85%",
    "Cross-functional satisfaction survey trending upward",
    "EM invited to strategic planning conversations based on merit"
  ];
  console.log('  ✓ C5 measurement guidance indicators cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING-PATHWAYS.JSON ─────────────────────────────────────────────
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c5lp = lp.find(l => l.capabilityId === 'C5');
if (c5lp) {
  // Clean foundational resource descriptions (strip marketing copy)
  c5lp.foundational[0].description = "Covers influence without authority, persuasion frameworks, and how to build credibility across organizational boundaries. Essential for leaders who must work through peers.";
  c5lp.foundational[1].description = "Frameworks for cross-functional collaboration: DACI decision-making, shared OKRs, and conflict resolution. Applicable to any engineering-product-design environment.";
  c5lp.foundational[2].description = "Communication fundamentals: active listening, perspective-taking, and framing technical concepts for non-technical audiences. Enables influence across functions.";
  c5lp.foundational[3].description = "Understanding business and product thinking: how to translate between technical and business languages, and why business constraints matter as much as technical ones.";

  // Clean practical resource descriptions
  c5lp.practical[0].description = "Templates for cross-functional coordination: shared planning docs, decision authority matrices, escalation criteria. Ready-to-use frameworks.";
  c5lp.practical[1].description = "Running effective triad meetings: agendas, decision frameworks, documentation practices that build alignment without overhead.";
  c5lp.practical[2].description = "Negotiation skills for engineering leaders: how to disagree professionally, frame trade-offs, and resolve conflicts without escalation.";

  // Clean advanced resource descriptions
  c5lp.advanced[0].description = "Building trust across functions: how great leaders develop credibility with peers from different disciplines and influence strategy.";
  c5lp.advanced[1].description = "Case studies of engineering-product-design partnerships: what works, what fails, and how mature leaders maintain alignment during chaos.";
  c5lp.advanced[2].description = "Pair with a respected peer from Product or Design to learn their decision-making frameworks and build cross-functional relationship skills.";

  console.log('  ✓ C5 learning pathways descriptions cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C5 deep cycle complete. All files updated.');

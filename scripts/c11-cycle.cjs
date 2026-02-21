#!/usr/bin/env node
/**
 * C11 (Hiring, Onboarding & Role Design) Deep Cycle
 */
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');
function readJSON(file) { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8')); }
function writeJSON(file, data) { fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2) + '\n', 'utf8'); }

// ─── 1. CAPABILITIES ───
console.log('Processing capabilities.json...');
let caps = readJSON('capabilities.json');
let c11 = caps.find(c => c.id === 'C11');
c11.description = "Assessed by: sourcing conversion rate, interview-to-offer ratio, offer acceptance rate, time-to-productivity for new hires, and hiring bar consistency. Absence causes: hiring the wrong people, losing strong candidates to poor process, slow ramp-up from weak onboarding, and role ambiguity creating performance gaps.";
c11.enabledBy = [];
writeJSON('capabilities.json', caps);
console.log('  ✓ C11 description rewritten');

// ─── 2. OBSERVABLES ───
console.log('Processing observables.json...');
let obs = readJSON('observables.json');
function updateObs(id, changes) {
  const o = obs.find(x => x.id === id); if (!o) return;
  Object.assign(o, changes); console.log(`  ✓ ${id}`);
}

updateObs('C11-O1', {
  why: "Hiring without a written rubric degrades to 'I'll know it when I see it' — leading to inconsistent bar, bias-driven decisions, and regrettable hires. A structured interview rubric with observable behaviors at each level creates consistency, reduces bias, and makes hiring defensible.",
  how: "Create interview rubric with 3-5 core competencies; define observable behaviors at each level (e.g., 'Describes a design pattern' vs. 'Evaluates trade-offs between patterns with production examples'). Train interviewers on rubric scoring. Debrief using rubric scores, not gut feel. Calibrate by reviewing borderline decisions quarterly. Validate with metric 6.1 (Quality of Hire).",
  expectedResult: "Within 1 quarter: hiring consistency improves measurably; interviewers can articulate why they scored each competency; borderline candidates get consistent treatment; regrettable hire rate drops below 10%."
});

updateObs('C11-O2', {
  why: "Passive sourcing yields mediocre candidate pools; great engineers rarely apply cold. Active sourcing — identifying and reaching specific people with relevant skills — is the difference between hiring who shows up and hiring who you actually need.",
  how: "Build sourcing strategy: employee referrals (highest conversion), targeted outreach to specific engineers (GitHub, open source contributions, conference speakers), diversity-focused sourcing (specific communities and networks). Track sourcing channel conversion rates. Invest in channels with highest quality-of-hire, not just volume. Validate with metric 6.2 (Time to Fill Roles).",
  expectedResult: "Within 2 quarters: candidate quality improves; referral rate >30%; pipeline includes diverse candidates; sourcing conversion rate (sourced → phone screen) >20%."
});

updateObs('C11-O3', {
  why: "First 30 days determine whether a new hire ramps quickly or struggles for months. Structured onboarding with clear milestones, a buddy system, and incremental complexity prevents the sink-or-swim pattern that wastes months of productivity.",
  how: "Create 30-60-90 day onboarding plan with concrete milestones (Week 1: dev environment setup + first PR merged, Week 2: ship a small bug fix, Week 4: own a small feature end-to-end). Assign onboarding buddy for first 60 days. Track time-to-first-commit and time-to-first-feature. Survey new hires at 30/60/90 days. Validate with metric 6.3 (Time to Productivity).",
  expectedResult: "Within 1 quarter: new hires productive within 4 weeks; onboarding satisfaction >4.0/5.0; time-to-first-commit <3 days; attrition in first year <5%."
});

updateObs('C11-O4', {
  why: "Role ambiguity creates performance gaps — when success criteria are unclear, good engineers fail and the EM can't diagnose why. Written role definitions with explicit scope, expectations, and success metrics create shared understanding.",
  expectedResult: "Within 1 month of hire: new hire can articulate their role scope and success criteria; 30-day check-in confirms alignment; no role ambiguity surfacing in first 90-day review."
});

updateObs('C11-O5', {
  why: "Hiring bar erosion is invisible and insidious — it happens one 'close enough' hire at a time. Tracking quality-of-hire and analyzing regrettable hires makes bar drift visible before it damages the team.",
  how: "Track quality-of-hire at 6-month intervals: manager rating (1-5), performance against role expectations, regrettable hire rate. Analyze patterns in regrettable hires — interview stage failures, specific competencies missed. Calibrate rubric and interviewer training based on patterns. Validate with metric 6.1 (Quality of Hire).",
  expectedResult: "Within 2 quarters: quality-of-hire scores stable or improving; regrettable hire rate <10%; hiring bar maintained through team growth."
});

updateObs('C11-O6', {
  why: "Weak candidate experience loses strong engineers to competitors. Great candidates evaluate you as much as you evaluate them — slow process, poor communication, and inconsistent treatment cost offers.",
  expectedResult: "Within 1 quarter: offer acceptance rate >80%; candidate NPS positive; time from first contact to offer <3 weeks; candidates report positive experience even when not hired."
});

updateObs('C11-O7', {
  why: "Interviewer skill varies widely — untrained interviewers ask illegal questions, bias decisions, and damage candidate experience. Trained interviewers produce consistent, defensible hiring decisions.",
  how: "Require interviewer training covering: structured interviewing, rubric scoring, bias awareness, illegal questions to avoid, candidate experience. Shadow 3 interviews before leading one. Calibrate quarterly by reviewing borderline decisions as a panel. Track interviewer consistency (score variance). Validate with metric 6.1 (Quality of Hire)."
});

updateObs('C11-O8', {
  why: "Diversity doesn't happen by accident — homogeneous networks produce homogeneous teams. Diversity hiring requires intentional sourcing, inclusive job descriptions, and interview process audits for bias.",
  how: "Audit job descriptions for gendered language and unnecessary requirements. Source from diversity-focused communities and networks (Women Who Code, /dev/color, Lesbians Who Tech, etc.). Ensure interview panels include diverse representation. Track diversity metrics at each stage (sourced → phone screen → onsite → offer → accept). Address drop-off points. Validate with metric 6.4 (Diversity Hiring Metrics).",
  expectedResult: "Within 2 quarters: diverse candidate slate for every role; interview panel includes diverse representation; diversity metrics improve at each funnel stage."
});

updateObs('C11-O9', {
  why: "Offer negotiations are high-stakes moments where poor handling loses candidates or creates compensation inequities. Structured offer frameworks with defensible ranges prevent both errors.",
  expectedResult: "Within 1 quarter: offer acceptance rate >80%; compensation equity maintained; candidates rarely counter-offer because initial offer is strong."
});

writeJSON('observables.json', obs);

// ─── 3. CALIBRATION SIGNALS ───
console.log('Processing calibration-signals.json...');
let sigs = readJSON('calibration-signals.json');
function updateSig(id, changes) {
  const s = sigs.find(x => x.id === id); if (!s) return;
  Object.assign(s, changes); console.log(`  ✓ ${id}`);
}

updateSig('SIG-042', {
  signalText: "Hiring bar consistency: 'Maintained interview rubric with observable behaviors; regrettable hire rate <10% over [X] hires'. Evidence: structured rubric, interviewer training, calibration sessions."
});

updateSig('SIG-043', {
  signalText: "Sourcing excellence: 'Built referral program generating [X]% of hires; targeted sourcing in [specific communities] improved diversity pipeline by [Y]%'. Evidence: sourcing channel conversion rates tracked."
});

updateSig('SIG-044', {
  signalText: "Onboarding speed: 'Structured 30-60-90 onboarding reduced time-to-productivity from [X] months to [Y] weeks'. Evidence: time-to-first-commit, time-to-first-feature, new hire satisfaction scores."
});

updateSig('SIG-045', {
  signalText: "Offer acceptance rate >80% sustained — candidates choose your team over competitors. Evidence: candidate experience feedback, offer acceptance tracking, time-to-offer <3 weeks."
});

updateSig('SIG-094', {
  signalText: "Directors own hiring bar across teams. 'Calibrated interview rubrics across [X] teams, maintained consistent bar through [Y]% headcount growth'. Evidence: regrettable hire rate tracked across org."
});

updateSig('SIG-095', {
  signalText: "Role design clarity: 'Defined IC and EM career ladders with observable behaviors; zero role ambiguity in performance reviews'. Evidence: written career ladder, role definitions referenced in reviews."
});

writeJSON('calibration-signals.json', sigs);

// ─── 4. RUBRIC ANCHORS ───
console.log('Processing rubric-anchors.json...');
let anchors = readJSON('rubric-anchors.json');
function updateAnchor(id, changes) {
  const a = anchors.find(x => x.anchorId === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAnchor('C11-1', {
  level1Developing: "Scope: Individual. Key Behavior: Interviews without rubric; hiring decisions based on gut feel; no sourcing strategy; onboarding is ad hoc. Artifact: None. Distinguishing Test: Cannot describe hiring rubric or onboarding plan; regrettable hire rate unknown.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Participates in hiring with informal criteria; basic onboarding checklist exists; sourcing is passive (post-and-pray). Artifact: Informal interview notes, basic onboarding checklist. Distinguishing Test: Can describe what they look for but no written rubric; onboarding exists but not measured.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Structured interview rubric with observable behaviors; active sourcing strategy; 30-60-90 onboarding with milestones; time-to-productivity tracked. Artifact: Interview rubric with scoring guide, sourcing channel metrics, onboarding plan with milestones. Distinguishing Test: Interviewers score consistently using rubric; time-to-first-commit <3 days; offer acceptance rate >80%.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Hiring bar calibrated across teams; interviewer training program; diversity metrics tracked and improved; role definitions written and referenced. Artifact: Cross-team hiring rubric, interviewer training materials, diversity funnel metrics. Distinguishing Test: Regrettable hire rate <10% across area; hiring bar consistent despite team growth.",
  level5Advanced: "Scope: Org. Key Behavior: Hiring excellence is org standard; employer brand attracts passive candidates; diversity hiring intentional and measurable; role ladder institutionalized. Artifact: Org-wide hiring framework, employer brand metrics, diversity hiring outcomes. Distinguishing Test: Sourcing conversion rate industry-leading; org known for hiring bar and candidate experience."
});

updateAnchor('C11-2', {
  level1Developing: "Scope: Individual. Key Behavior: Role expectations unstated; new hires sink-or-swim; no tracking of hiring or onboarding effectiveness. Artifact: None. Distinguishing Test: Cannot state time-to-productivity or quality-of-hire for recent hires.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Role expectations communicated verbally; basic onboarding support; quality-of-hire intuited but not measured. Artifact: Verbal role expectations. Distinguishing Test: New hires report ambiguity about expectations in first 90 days.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Role definitions written with scope and success criteria; quality-of-hire tracked at 6-month intervals; regrettable hires analyzed for patterns. Artifact: Written role definitions, quality-of-hire tracking, regrettable hire analysis. Distinguishing Test: New hires articulate success criteria within first week; regrettable hire rate <10%.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Career ladder spans IC and EM tracks with observable behaviors; quality-of-hire analysis informs rubric refinement; interviewer consistency measured. Artifact: Career ladder document, quality-of-hire trends, interviewer calibration data. Distinguishing Test: Career progression criteria referenced in all performance reviews; hiring bar maintained across teams.",
  level5Advanced: "Scope: Org. Key Behavior: Role design and career ladders are org standard; hiring data informs org-wide calibration; talent density increases measurably. Artifact: Org-wide career framework, hiring quality trends. Distinguishing Test: Performance calibration uses shared career ladder; talent density is competitive advantage."
});

writeJSON('rubric-anchors.json', anchors);

// ─── 5. ANTI-PATTERNS ───
console.log('Processing anti-patterns.json...');
let aps = readJSON('anti-patterns.json');
function updateAP(id, changes) {
  const a = aps.find(x => x.id === id); if (!a) return;
  Object.assign(a, changes); console.log(`  ✓ ${id}`);
}

updateAP('AP-10', {
  shortDesc: "EM lowers hiring bar under deadline pressure, making 'good enough' hires to fill seats quickly. Regrettable hires create performance drag for years; cost of a bad hire far exceeds time saved.",
  warningSigns: [
    "Hiring decisions described as 'we need someone, anyone'",
    "Interview feedback ignored to push candidate through",
    "Regrettable hire rate increasing or unknown",
    "New hires underperform and require excessive management attention within first 6 months"
  ],
  impact: "Within 6-12 months: regrettable hires consume management time; team morale suffers; high performers leave because they're carrying low performers; hiring bar erosion becomes cultural norm.",
  recoveryActions: [
    "Track regrettable hire rate and make it visible — measure cost of bad hires (management time, team impact).",
    "Reinforce hiring bar with written rubric and interviewer training.",
    "When under pressure, articulate the trade-off: 'We can fill this seat in 2 weeks with risk or 6 weeks with confidence.'",
    "Practice 'no hire is better than a bad hire' — empty seat is temporary, regrettable hire is long-term damage.",
    "Analyze regrettable hires for patterns — which interview stages missed signals? Refine rubric accordingly."
  ]
});

updateAP('AP-11', {
  shortDesc: "EM delegates all hiring to recruiters and interviews sporadically. Loses touch with candidate quality; hiring bar drifts; strong candidates lost to poor process and weak EM engagement.",
  warningSigns: [
    "EM interviews fewer than 50% of finalists",
    "Cannot describe recent candidate quality or pipeline health",
    "Offer acceptance rate <60%",
    "Recruiters complain EM is unresponsive or unavailable"
  ],
  impact: "Within 2 quarters: hiring bar drifts; strong candidates choose competitors due to poor EM engagement; team grows with mismatched talent; EM loses credibility with recruiting partners.",
  recoveryActions: [
    "Interview every finalist personally — hiring is non-delegable.",
    "Weekly pipeline review with recruiter (15-30 minutes).",
    "Respond to recruiter requests within 24 hours — candidate experience depends on your responsiveness.",
    "Treat candidate experience as team brand — every interaction reflects on the team.",
    "Track offer acceptance rate and candidate feedback — adjust process based on data."
  ]
});

updateAP('AP-12', {
  shortDesc: "New hire onboarding is sink-or-swim with no structure. New engineers waste weeks on setup, have no clear goals, and ramp slowly. Time-to-productivity stretches to 3-6 months instead of 4-6 weeks.",
  warningSigns: [
    "No written onboarding plan or milestones",
    "New hires report confusion about first tasks or expectations",
    "Time-to-first-commit >1 week",
    "Time-to-first-feature >8 weeks",
    "New hire attrition >10% in first year"
  ],
  impact: "Within 1 quarter: new hires ramp slowly, costing months of productivity; some new hires leave during onboarding; team morale suffers as new hires struggle; hiring ROI delayed by 3+ months.",
  recoveryActions: [
    "Create 30-60-90 day onboarding plan with concrete milestones (Week 1: first PR merged, Week 4: first feature shipped).",
    "Assign onboarding buddy for first 60 days — specific person responsible for success.",
    "Track time-to-first-commit and time-to-first-feature — set targets and measure.",
    "Survey new hires at 30/60/90 days — identify onboarding gaps and fix them.",
    "Pre-provision dev environment so new hire can commit code on day 1."
  ]
});

updateAP('AP-47', {
  shortDesc: "EM optimizes for pedigree (top school, FAANG background) over demonstrated capability. Hires credentialed engineers who can't execute; misses strong engineers from non-traditional backgrounds.",
  warningSigns: [
    "Interview rubric emphasizes resume credentials over technical assessment",
    "Strong interview performance dismissed because candidate lacks 'brand name' experience",
    "Team hiring exclusively from same schools or companies",
    "Diversity pipeline weak despite availability of qualified candidates"
  ],
  impact: "Within 2 quarters: team lacks diversity; credentialed hires underperform because credentials don't predict execution; strong non-traditional candidates lost to bias; team groupthink increases.",
  recoveryActions: [
    "Shift rubric focus from 'where they worked' to 'what they can do' — use work sample tests and practical assessments.",
    "Blind resume reviews — strip school and company names during initial screening.",
    "Expand sourcing beyond traditional pipelines — bootcamps, self-taught engineers, career switchers.",
    "Track correlation between pedigree and performance — often it's weak or zero.",
    "Celebrate non-traditional hires who succeed — make it visible that alternative paths work."
  ]
});

updateAP('AP-65', {
  shortDesc: "Interview process is slow, multi-stage, and bureaucratic. Strong candidates withdraw because they get competing offers while waiting; process optimizes for thoroughness over candidate experience.",
  warningSigns: [
    "Time from first contact to offer >4 weeks",
    "Multiple interview rounds without clear purpose",
    "Candidate has to 'sell themselves' to multiple stakeholders repeatedly",
    "Offer acceptance rate <60% with candidates citing 'took too long' as reason"
  ],
  impact: "Within 1 quarter: strong candidates lost to faster competitors; offer acceptance rate drops below 60%; pipeline conversion suffers; recruiting team frustrated by process inefficiency.",
  recoveryActions: [
    "Compress timeline: target 2-3 weeks from first contact to offer.",
    "Consolidate interview stages — one phone screen, one onsite (or equivalent virtual). Each interview must serve distinct purpose.",
    "Empower hiring manager to make offer decision without lengthy committee approvals.",
    "Communicate timeline expectations upfront and meet them.",
    "Track time-to-offer and offer acceptance rate — treat them as quality metrics."
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

updatePlaybook('P-C11-1', {
  whatGoodLooksLike: "Within 2 weeks: hiring need justified with scope definition and success criteria. Within 1 month: interview rubric created with 3-5 core competencies and observable behaviors at each level; interviewers trained. Within 6-8 weeks: candidate pipeline active with diverse sourcing. Within 10-12 weeks: offer extended to strong candidate who accepts. Outcome: right person hired with clear role expectations. Measured by: time to fill (metric 6.2), offer acceptance rate, quality of hire at 6 months (metric 6.1)."
});

updatePlaybook('P-C11-2', {
  whatGoodLooksLike: "Day 1: dev environment provisioned, first PR merged. Week 1: onboarding buddy assigned, small bug fix shipped. Week 4: first feature shipped end-to-end. Week 8: fully productive on team velocity. 30/60/90 day check-ins: alignment confirmed, feedback gathered, onboarding refined. Outcome: new hire productive in 4-6 weeks, not 3-6 months. Measured by: time to first commit (<3 days), time to first feature (<4 weeks), new hire satisfaction (>4.0/5.0)."
});

updatePlaybook('P-C11-3', {
  whatGoodLooksLike: "Within 1 week: regrettable hire rate calculated (% of hires underperforming at 6 months). Within 2 weeks: regrettable hire patterns analyzed — which interview stages missed signals? Within 1 month: rubric refined to address gaps; interviewer recalibration conducted. Within 1 quarter: regrettable hire rate decreasing. Outcome: hiring bar maintained; quality-of-hire improves. Measured by: regrettable hire rate trend, quality of hire scores (metric 6.1)."
});

updatePlaybook('P-C11-4', {
  whatGoodLooksLike: "Within 2 weeks: sourcing strategy defined (referrals, targeted outreach, diversity-focused communities). Within 1 month: sourcing channels measured; highest-quality channels prioritized. Within 1 quarter: sourcing conversion rate >20%; diverse candidate slate for every role. Outcome: pipeline quality improves; diversity metrics improve at every stage. Measured by: sourcing conversion rate, diversity funnel metrics (metric 6.4)."
});

updatePlaybook('P-C11-5', {
  whatGoodLooksLike: "Within 2 weeks: role scope and success criteria documented. Within 1 month: compensation range researched and approved; offer letter drafted. Within 1 week of final interview: offer extended. Offer competitive enough that candidate accepts without lengthy negotiation. Outcome: offer acceptance rate >80%; compensation equity maintained. Measured by: offer acceptance rate, time from final interview to offer, compensation equity analysis."
});

writeJSON('playbooks.json', playbooks);

// ─── 7. INTERVIEW QUESTIONS ───
console.log('Processing interview-questions.json...');
let iqs = readJSON('interview-questions.json');
function updateIQ(id, changes) {
  const q = iqs.find(x => x.id === id); if (!q) return;
  Object.assign(q, changes); console.log(`  ✓ ${id}`);
}

updateIQ('IQ-38', {
  lookFor: [
    "Uses structured interview rubric with observable behaviors — can describe specific competencies and scoring",
    "Trains interviewers and calibrates decisions — describes calibration process",
    "Tracks hiring quality metrics — can state regrettable hire rate and quality-of-hire trend",
    "Adapts rubric based on regrettable hire analysis — gives example of refinement"
  ],
  redFlags: [
    "Interviews based on gut feel without rubric",
    "Cannot describe hiring bar or how it's maintained",
    "Regrettable hire rate unknown or >15%",
    "No interviewer training or calibration process"
  ]
});

updateIQ('IQ-39', {
  lookFor: [
    "Describes 30-60-90 day onboarding plan with specific milestones",
    "Assigns onboarding buddy and tracks their effectiveness",
    "Measures time-to-productivity (time-to-first-commit, time-to-first-feature)",
    "Surveys new hires and refines onboarding based on feedback"
  ],
  redFlags: [
    "Onboarding is ad hoc or sink-or-swim",
    "Cannot state time-to-productivity for recent hires",
    "No onboarding buddy or structured support",
    "New hire attrition >10% in first year"
  ]
});

updateIQ('IQ-105', {
  lookFor: [
    "Active sourcing strategy — referrals, targeted outreach, diversity-focused sourcing",
    "Tracks sourcing channel conversion rates and invests in highest-quality channels",
    "Builds employer brand through team visibility (blog posts, conference talks, open source)",
    "Candidate experience treated as team brand — every interaction matters"
  ],
  redFlags: [
    "Sourcing is passive (post-and-pray)",
    "Cannot state sourcing conversion rate or which channels produce best hires",
    "Offer acceptance rate <60%",
    "No diversity sourcing strategy"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT ───
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c11sa = sa.find(s => s.capabilityId === 'C11');
if (c11sa) {
  c11sa.behavioralAnchors[0].description = "Interviews without rubric; hiring decisions based on gut feel; no sourcing strategy; onboarding is ad hoc sink-or-swim; regrettable hire rate unknown";
  c11sa.behavioralAnchors[1].description = "Participates in hiring with informal criteria; basic onboarding checklist exists; sourcing is passive; quality-of-hire intuited but not measured";
  console.log('  ✓ C11 self-assessment L1-L2 sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT GUIDANCE ───
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c11mg = mg.find(m => m.capabilityId === 'C11');
if (c11mg) {
  c11mg.leadingIndicators = [
    "Interview rubric with observable behaviors exists and is used by all interviewers",
    "Interviewer training completed for all hiring team members",
    "Sourcing channel conversion rates tracked and optimized",
    "30-60-90 day onboarding plan documented with concrete milestones",
    "Candidate pipeline diversity metrics tracked at each funnel stage",
    "Role definitions written with scope and success criteria"
  ];
  c11mg.laggingIndicators = [
    "Quality of hire scores at 6-month intervals averaging >4.0/5.0",
    "Regrettable hire rate below 10%",
    "Time to productivity: first commit <3 days, first feature <4 weeks",
    "Offer acceptance rate sustained above 80%",
    "New hire attrition in first year below 5%",
    "Diversity hiring metrics improving across funnel stages"
  ];
  console.log('  ✓ C11 measurement guidance cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING PATHWAYS ───
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c11lp = lp.find(l => l.capabilityId === 'C11');
if (c11lp) {
  if (c11lp.foundational[0]) c11lp.foundational[0].description = "Evidence-based hiring practices: structured interviews, work sample tests, and bias reduction in candidate evaluation.";
  if (c11lp.foundational[1]) c11lp.foundational[1].description = "Building and maintaining a high-performing team through intentional hiring, onboarding, and role design.";
  if (c11lp.foundational[2]) c11lp.foundational[2].description = "Practical onboarding frameworks: 30-60-90 day plans, buddy systems, and measuring time-to-productivity.";
  if (c11lp.practical[0]) c11lp.practical[0].description = "Interview rubric template with competency definitions and observable behaviors at each level for consistent evaluation.";
  if (c11lp.practical[1]) c11lp.practical[1].description = "Onboarding plan template covering first 90 days with weekly milestones, buddy assignment, and feedback loops.";
  if (c11lp.advanced[0]) c11lp.advanced[0].description = "Scaling hiring bar across growing organizations: calibration processes, interviewer training programs, and quality-of-hire tracking.";
  console.log('  ✓ C11 learning pathways cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C11 deep cycle complete.');

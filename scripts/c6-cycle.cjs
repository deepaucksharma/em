#!/usr/bin/env node
/**
 * C6 (Coaching & Talent Development) Deep Cycle
 * Applies ultra-strict content validation across all C6 items.
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
let c6cap = caps.find(c => c.id === 'C6');
c6cap.description = "Assessed by: skip-level conversation quality, performance review calibration rigor, promotion success rate, retention of high performers, and team growth velocity. Absence causes: high-potential talent leaves for development, performance reviews become recency-biased, weak managers go uncoached, and promotions feel arbitrary rather than earned.";
c6cap.enabledBy = ["C7"];
writeJSON('capabilities.json', caps);
console.log('  ✓ C6 description rewritten to diagnostic format');

// ─── 2. OBSERVABLES.JSON ────────────────────────────────────────────────────
console.log('Processing observables.json...');
let obs = readJSON('observables.json');

function updateObs(id, changes) {
  const o = obs.find(x => x.id === id);
  if (!o) { console.error(`  ✗ Observable ${id} not found`); return; }
  Object.assign(o, changes);
  console.log(`  ✓ ${id} updated`);
}

updateObs('C6-O1', {
  why: "Skip-level conversations are the most reliable diagnostic for team health. They surface hidden problems (toxic peers, missed promotions, burnout) that don't show up in 1:1s where the direct manager is the potential problem. EMs who skip their skip-level conversations are flying blind.",
  how: "Schedule quarterly skip-level conversations with every team member, minimum 30 minutes. Prepare questions: career goals, manager feedback (what's working, what isn't), and team health. Document themes (not names). Share themes with the manager; coach them based on patterns. Frame as 'I want to understand how I can support your development better.' Validate with metric 2.2 (Team Retention Rate) and 3.2 (Internal Promotion Rate).",
  expectedResult: "Within 2 quarters: hidden problems surfaced and addressed; team reports EM is aware of their development goals; retention of high-potential talent improves measurably."
});

updateObs('C6-O2', {
  why: "Without structured feedback, performance reviews become personality contests — 'I remember your most recent work' rather than 'here's the pattern of your contributions over 6 months.' Feedback calibrated across the team prevents the halo effect where one big success washes out six months of mediocrity.",
  how: "Use a feedback collection template (situation-behavior-impact) with 3-5 peer reviewers per person. Calibration session: managers align on rating scales, discuss edge cases, ensure consistency across the team. Feedback grounded in specific examples, not adjectives. Discussion-based performance reviews (conversation not lecturing). Validate with metric 3.3 (Manager Feedback Quality) and 3.4 (Performance Review Clarity).",
  expectedResult: "Within 1 quarter: feedback is specific and behavioral; calibration prevents rating disparity >1 level for similar performance; employees see reviews as fair and coaching-oriented."
});

updateObs('C6-O3', {
  why: "Without a promotion framework, promotions feel arbitrary and high-performers leave. 'I don't know what I need to do to get promoted' is the #1 reason talented people leave. Transparent criteria, written examples, and pre-promotion visibility prevent surprise rejections.",
  how: "Define promotion levels with explicit criteria per level (L3→L4 requires 'demonstrated system thinking on 2+ problems' + 'influenced peers on at least 3 architectural decisions'). Maintain a promotion register tracking candidates, readiness assessment, and timeline. Conduct pre-promotion conversations with candidates: 'Here's what we're seeing, here's what we need to see, here's the timeline.' Validate with metric 3.2 (Internal Promotion Rate) and 2.2 (Retention of High Performers).",
  expectedResult: "Within 2 quarters: zero surprised rejections; high-potential team members see clear path to next level; internal promotion rate improves; retention of senior individual contributors improves."
});

updateObs('C6-O4', {
  why: "High performers leaving is a signal of poor coaching or blocked growth. Exit interviews that say 'didn't feel like I was developing' mean the EM failed. Proactive career conversations and rotation opportunities keep top talent engaged.",
  how: "Annual career conversation with every high performer: 'Where do you want to be in 2 years? What skills do you need to get there?' Identify rotation opportunities (leadership rotations, cross-team project ownership, acting role in new area). Create a development plan with milestones. Check in quarterly. For people interested in management, pilot them on 1-2 person as an acting manager before full transition. Validate with metric 2.2 (Retention of High Performers) and 3.1 (Team Satisfaction with Growth Opportunities).",
  expectedResult: "Within 2 quarters: zero regrettable attrition of high performers due to lack of growth; multiple rotation opportunities created; retention of senior ICs above 90%."
});

updateObs('C6-O5', {
  why: "Early career engineers who don't get structured coaching stagnate or leave before reaching potential. Junior-to-mid career support is the highest leverage development investment an EM can make — it creates L4+ performers instead of losing them to other teams.",
  how: "Define growth tracks for junior engineers with explicit behavioral milestones (e.g., L2→L3: from following instructions to proposing solutions, from needing detailed code review to PRs reviewed by peers, from asking for help to unblocking others). Pair each junior with a mentor (can be peer mentor, senior IC, or TL). Monthly check-in on development progress. Celebrate wins publicly. Create a progression framework visible to everyone. Validate with metric 3.1 (Team Satisfaction with Growth Opportunities) and 3.5 (Internal Promotion Rate).",
  expectedResult: "Within 1 year: every junior engineer has a visible progression path; retention of L2/L3 engineers improves measurably; L3→L4 promotion rate increases due to better preparation."
});

updateObs('C6-O6', {
  why: "Weak managers hurt everyone — their teams lose talent and motivation, peers spend energy compensating, and the weak manager becomes a retention bottleneck. Coaching weak managers prevents individual failure from becoming organizational drag.",
  how: "Identify weak managers via skip-level feedback themes, direct report attrition, and peer feedback. Provide targeted coaching: weekly 1:1s with the manager, clear improvement areas, specific 30-60-90 day goals. Pair weak manager with a strong peer mentor. Track improvement via skip-level feedback; if no improvement in 6 months, move manager to IC track. Validate with metric 2.2 (Manager Retention, not just team retention) and team pulse surveys.",
  expectedResult: "Within 6 months: weak managers showing measurable improvement or moved to IC track; team morale improves; no further attrition driven by the manager's weakness."
});

updateObs('C6-O7', {
  why: "Without structure, underperforming senior engineers become invisible bottlenecks — they block others from learning, create technical debt, and drag down team morale. Addressing underperformance early prevents six months of team friction.",
  how: "Define expectations clearly: what does L4 performance look like in this context? If senior IC is not meeting expectations, have a direct conversation: 'Here's what we're seeing, here's what we need, here's support we'll provide, here's the timeline.' Create a 60-day improvement plan with specific, measurable outcomes. Daily check-ins for accountability. If improvement happens, reinforce publicly. If not, begin transition planning (different team, role change, or exit). Validate with metric 3.3 (Performance Review Calibration) and 3.8 (Underperformance Resolution Time).",
  expectedResult: "Within 60 days: underperformance either resolved or clear plan for transition; team morale improves; no lingering ambiguity about expectations or consequences."
});

updateObs('C6-O8', {
  why: "Diversity of backgrounds prevents groupthink and creates better decision-making. Homogeneous teams optimize for local maxima. Intentional recruiting, sponsorship of underrepresented candidates, and inclusive team culture prevent accidental homogeneity.",
  how: "Track team demographics quarterly (gender, ethnicity, experience diversity). Ensure diverse interview panels and hiring criteria that don't accidentally favor certain backgrounds. Sponsor high-potential people from underrepresented groups for visible projects and skip-level conversations. Measure psychological safety and belonging in team surveys. Address microaggressions immediately. Validate with metric 2.6 (Team Diversity Parity) and survey-based belonging measures.",
  expectedResult: "Within 2 quarters: team demographics move toward org targets; belonging survey scores above 4.0/5.0; zero incidents of exclusionary behavior going unaddressed."
});

updateObs('C6-O9', {
  why: "Managers who haven't done IC work don't understand technical decision-making context, can't evaluate engineering quality, and lose credibility with their team. Technical credibility is foundational to coaching engineering talent.",
  how: "EMs should maintain 5-10% hands-on technical work: code reviews of their team's work, occasional small features, architecture discussions. Not to code-review everything (that's insecurity), but enough to understand the technical constraints their team faces. Read design docs. Pair program occasionally. Stay current on tech debt and system limitations. Model learning by coding alongside the team. Validate with metric 5.3 (Manager Technical Credibility) via team survey.",
  expectedResult: "Within 2 quarters: EM credibility improves; team perceives EM understands technical constraints; architectural discussions include EM as peer contributor, not just manager."
});

updateObs('C6-O10', {
  why: "Without structured 1:1s, conversations drift to fire-drills. Structured 1:1s with development-focused agendas create coaching moments instead of status updates becoming the default.",
  how: "Weekly 1:1 template: three sections (5 min status/blockers, 15 min focused topic, 5 min coaching). Focused topic rotates: one week career development, one week technical growth, one week project deep-dive, one week feedback/coaching. EM prepares a question or observation. Employee owns the agenda. Skip-level manager provides coaching on how to run 1:1s. Validate with metric 5.3 (1:1 Quality) via team survey.",
  expectedResult: "Within 1 quarter: team reports 1:1s are valuable; development conversations happen regularly; blockers surface early; employees feel coached, not managed."
});

// Update embedded calibration signal content to match standalone file
// Fix SIG IDs and content where they diverge
for (const o of obs.filter(x => x.capabilityId === 'C6')) {
  if (!o.calibrationSignals) continue;
  for (const sig of o.calibrationSignals) {
    // Fix known ID mismatches (embedded → standalone) — update when calibration-signals sync occurs
    const idMap = {};
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

updateSig('SIG-039', {
  signalText: "Skip-level visibility: 'Run quarterly skip-level conversations with every report; identified [X] coaching areas from skip-level themes'. Benchmark: >90% participation rate; themes documented and acted on within 30 days."
});

updateSig('SIG-040', {
  signalText: "Feedback calibration: 'Conducted calibration session across team on performance reviews; adjusted ratings for consistency; zero surprises in final reviews'. Evidence: calibration session attendance; rating distribution alignment; zero post-review disputes."
});

updateSig('SIG-041', {
  signalText: "Promotion clarity: 'Maintained promotion register; promoted [X] people with zero surprises; all candidates knew exactly what was needed before decision'. Evidence: pre-promotion conversation documentation; zero rejected candidates who felt unfairly evaluated."
});

updateSig('SIG-042', {
  signalText: "High-performer retention: 'Identified [X] high-performers at risk; created rotation opportunities; retained all [Y] at-risk senior ICs through targeted development conversations'. Evidence: individual development plans; rotation assignments; exit interview data."
});

updateSig('SIG-043', {
  signalText: "Junior engineer growth: 'Defined progression framework; mentored [X] L2/L3 engineers; [Y]% promoted to L4 within 18 months vs. historical [Z]%'. Evidence: explicit milestones per level; mentor assignments; promotion velocity data."
});

updateSig('SIG-044', {
  signalText: "Manager coaching: 'Identified weak manager; provided targeted coaching with specific 30-60-90 goals; improvement measurable in skip-level feedback'. Evidence: coaching plan; monthly progress reviews; skip-level sentiment improvement."
});

updateSig('SIG-045', {
  signalText: "Underperformance resolution: 'Identified senior IC not meeting L4 expectations; created 60-day improvement plan; either improved or transitioned within 90 days'. Evidence: clear expectations documentation; weekly check-ins; measurable outcomes or transition plan."
});

updateSig('SIG-047', {
  signalText: "Diverse hiring and sponsorship: 'Built diverse team through intentional recruiting; sponsored [X] people from underrepresented groups for visible projects'. Evidence: interview panel diversity; hiring source data; sponsorship tracking; belonging survey >4.0/5.0."
});

updateSig('SIG-048', {
  signalText: "Technical credibility: 'Maintains 5-10% hands-on technical work; participates in architecture discussions as peer contributor'. Evidence: code review participation; team perception (can state 'EM understands our technical constraints')."
});

updateSig('SIG-049', {
  signalText: "Structured 1:1s: 'Runs weekly 1:1s with development-focused agenda; team survey shows >80% satisfaction with 1:1 quality'. Evidence: 1:1 template documented; team survey feedback; employees describe 1:1s as coaching-oriented."
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

updateAnchor('C6-1', {
  level1Developing: "Scope: Individual. Key Behavior: 1:1s are reactive status meetings; no development conversations; team career goals unknown to EM. Artifact: None — no development plans or career frameworks. Distinguishing Test: EM cannot name a single development goal for any direct report.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Some 1:1s include development conversations; annual performance reviews completed but feedback is generic; promotion decisions reactive to business need. Artifact: Performance reviews exist but lack behavioral specificity. Distinguishing Test: Development conversations are occasional, not structural; team cannot describe clear progression path.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Structured 1:1s with development focus; quarterly skip-level conversations; performance feedback calibrated; promotion framework with transparent criteria. Artifact: Structured 1:1 template; skip-level conversation notes; promotion register; progression framework visible to team. Distinguishing Test: Every team member can describe their development goals and how they'll be measured; high-potential people know path to promotion.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Development practices scaled across teams; weak managers coached or transitioned; retention of high performers above 90%; underperformance addressed within 60 days. Artifact: Development coaching program for managers; cross-team progression framework; high-performer retention data. Distinguishing Test: Peer EMs adopt this team's development practices; promotion success rate (people promoted are later high performers) is above 80%.",
  level5Advanced: "Scope: Org. Key Behavior: Talent development is a cultural norm; managers are skilled developers of people; organization creates internal leaders instead of hiring from outside. Artifact: Org-wide talent development program; leadership pipeline visible with succession plans. Distinguishing Test: Majority of leadership positions filled from internal candidates; development practices drive organizational growth."
});

updateAnchor('C6-2', {
  level1Developing: "Scope: Individual. Key Behavior: Performance reviews are annual checkbox; feedback primarily negative or absent; underperformance not addressed; team diversity not tracked. Artifact: None — reviews are generic form-filling. Distinguishing Test: Cannot name three specific behavioral observations from last performance review of any team member.",
  level2Emerging: "Scope: Team (reactive). Key Behavior: Feedback more specific but based on recency bias; calibration across team inconsistent; underperformance addressed only when it becomes critical. Artifact: Performance review documents with some behavioral content; informal calibration. Distinguishing Test: Review ratings diverge >1 level for similar performance; some underperformance feedback is personality-based rather than behavioral.",
  level3Competent: "Scope: Team (systematic). Key Behavior: Feedback specific and behavioral with examples; calibration across team ensures consistency; underperformance addressed within 60 days with clear improvement plan; diversity hiring intentional. Artifact: Feedback templates grounded in situation-behavior-impact; calibration session notes; underperformance action plans. Distinguishing Test: Team perceives reviews as fair; rating distribution consistent across team; underperformance issues resolved or exited cleanly.",
  level4Distinguished: "Scope: Area (2-3 teams). Key Behavior: Calibration practices scaled across teams; feedback quality improves measurably; high-potential talent retention >90%; underperformance handled with coaching then clean exit if needed. Artifact: Cross-team feedback guidelines; calibration oversight function; underperformance resolution tracking. Distinguishing Test: Peer managers improve their feedback quality by adopting this team's practices; team diversity approaching org targets.",
  level5Advanced: "Scope: Org. Key Behavior: Feedback culture is developmental; calibration is org-wide standard; performance management drives clear consequences and development; diverse hiring is systematic. Artifact: Org-wide calibration process; performance management system that tracks coaching and outcomes. Distinguishing Test: Performance reviews drive clear career outcomes and development without fear; diversity metrics move toward representation goals."
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

updateAP('AP-12', {
  shortDesc: "1:1s are status meetings where the EM extracts information. No development conversations happen; team doesn't feel coached; career growth is left to chance.",
  warningSigns: [
    "1:1 agenda is always the EM's list of things to check on, never employee-driven",
    "Conversations about career development are rare and reactive",
    "Team members don't know what they need to do to get to next level",
    "Team describes 1:1s as 'status reports', not conversations"
  ],
  impact: "Within 2-3 quarters: high-potential people leave for managers who coach them; team morale drops; development becomes invisible and left to chance.",
  recoveryActions: [
    "Redesign 1:1 template: employee brings their agenda; EM asks development-focused questions.",
    "Rotate 1:1 topics: week 1 career goals, week 2 current project, week 3 feedback/coaching, week 4 blockers.",
    "Block 15 minutes of every 1:1 for a focused development conversation.",
    "Have EM bring a thoughtful observation or question prepared to each 1:1."
  ]
});

updateAP('AP-13', {
  shortDesc: "Performance reviews are an annual surprise where managers unleash accumulated resentment. Feedback is personality-based ('you're not a team player') rather than behavioral; no calibration across the team.",
  warningSigns: [
    "Employees say 'I had no idea I was doing this badly' after reviews",
    "Feedback uses personality traits instead of specific behaviors",
    "Rating distribution is inconsistent across the team (one manager rates everyone high, another low)",
    "Same behavior gets different ratings from different managers"
  ],
  impact: "Within 1-2 quarters: top talent leaves because reviews feel unfair; team morale drops; psychological safety erodes; calibration problems become visible when comparing across teams.",
  recoveryActions: [
    "Shift to real-time feedback, not once-a-year dump. Monthly feedback conversations.",
    "Feedback template: situation, specific behavior observed, impact on team. No personality judgments.",
    "Calibration session with all managers: discuss edge cases, align on rating scales, adjust outliers.",
    "Pre-review conversation with each employee: 'Here's the feedback we've been gathering, here's what we've observed.'"
  ]
});

updateAP('AP-37', {
  shortDesc: "Promotions feel arbitrary. 'I don't know what I need to do to get promoted' is the silent reason people leave. High-potential talent has no visibility into what's required.",
  warningSigns: [
    "No documented progression framework exists",
    "Promotion decisions are made in EM's office, not in team conversation",
    "Employees are surprised when told they're not being promoted",
    "Different teams have different unwritten standards"
  ],
  impact: "Within 2 quarters: high-potential people leave because they don't see a path; weaker performers stay because they don't know they're underperforming; promotions feel like favoritism.",
  recoveryActions: [
    "Define progression framework with explicit criteria per level — written and visible to entire team.",
    "Maintain promotion register: candidates, what they need to show, timeline.",
    "Pre-promotion conversation: 'Here's what we're seeing, here's what we need to see, here's the timeline.'",
    "No surprises: every promoted person knew they were being considered; every non-promoted person understood why."
  ]
});

updateAP('AP-50', {
  shortDesc: "High-performers (your best people) leave because they're not being developed or challenged. Lack of rotation, blocked advancement, or stalled projects turn high-potential into 'I'm bored and leaving.'",
  warningSigns: [
    "Your best engineer quietly starts job searching",
    "High-performer says 'I don't see growth opportunities here'",
    "Same person has been doing same job for 2+ years without new challenge",
    "Senior IC is overqualified for their role but not promoted to next level"
  ],
  impact: "Within 1-2 quarters: your strongest people leave; team capability drops; rebuilding that capability takes 2+ years; remaining team becomes more junior and slower.",
  recoveryActions: [
    "Annual career conversation with every high-performer: 'Where do you want to be in 2 years? What do you need from me?'",
    "Create rotation opportunities: leadership rotations, cross-team projects, acting roles.",
    "If no internal path forward and no external role available, you're going to lose them. Acknowledge it and support a good exit.",
    "For people interested in management, pilot them with 1-2 reports before committing to the switch."
  ]
});

updateAP('AP-51', {
  shortDesc: "Weak managers hurt everyone — their teams lose talent, they become a retention bottleneck, and peers spend energy compensating for their dysfunction.",
  warningSigns: [
    "Skip-level conversations reveal team frustration with the manager",
    "Higher attrition on this team than similar teams",
    "Manager avoids difficult conversations (feedback, underperformance, conflict)",
    "Peers describe having to 'manage around' this manager to get things done"
  ],
  impact: "Within 1-2 quarters: talented people leave to escape the manager; team morale is lowest in the org; organizational performance suffers in that area.",
  recoveryActions: [
    "Identify weak manager through skip-level feedback, attrition, and peer feedback.",
    "Direct conversation: 'Here's what we're seeing, here's what needs to improve, here's the support.'",
    "Provide targeted coaching: weekly 1:1s, specific 30-60-90 goals, peer mentor pairing.",
    "After 6 months: if improvement is measurable, reinforce. If not, move manager to IC track before more talent leaves."
  ]
});

updateAP('AP-68', {
  shortDesc: "Senior engineer underperforms but isn't addressed because they're technically skilled or because feedback feels uncomfortable. Over time they block others, drag down team velocity, and create cultural problems.",
  warningSigns: [
    "Engineer meets technical requirements but doesn't coach others or contributes toxic behavior",
    "Peers complain about the person but EM avoids the conversation",
    "Underperformance tolerance increases based on seniority (L4 gets excused for behavior that would be addressed for L2)",
    "Person has been 'on thin ice' for >6 months with no resolution"
  ],
  impact: "Within 2-3 quarters: team morale erodes; junior engineers don't learn from the senior engineer; team velocity stays below potential; other senior engineers lose respect for the EM.",
  recoveryActions: [
    "Define expectations clearly: 'L4 performance means X and Y and Z. You're meeting technical requirement but not Z.'",
    "Direct conversation: 'Here's what we're seeing, here's what we need, here's support we'll provide, here's the timeline (usually 60 days).'",
    "Weekly check-ins for accountability. Make expectations explicit and trackable.",
    "After 60 days: if improved, reinforce publicly. If not, begin transition (different team, IC→manager track change, or exit) within 30 days."
  ]
});

updateAP('AP-71', {
  shortDesc: "Team is homogeneous and leadership doesn't realize it's a problem. Hiring is accidentally one-type because no one is actively diversifying. Underrepresented candidates are missed or don't feel welcome.",
  warningSigns: [
    "Team diversity doesn't match org or city demographics",
    "Hiring panel is always the same demographic as current team",
    "Underrepresented candidates in interviews report not feeling welcome",
    "No one is actively sponsoring diverse talent for visibility and growth"
  ],
  impact: "Within 2 quarters: groupthink increases; decision-making becomes narrower; organization loses the cognitive diversity benefit; underrepresented talent goes elsewhere.",
  recoveryActions: [
    "Track team demographics quarterly. Own the data.",
    "Ensure diverse interview panels — minimum 2 different perspectives on every interview.",
    "Hiring criteria explicit and bias-checked — what are we actually requiring vs. nice-to-have?",
    "Actively sponsor high-potential people from underrepresented groups for visible projects and skip-level conversations.",
    "Measure belonging in team surveys — target >4.0/5.0; address microaggressions immediately."
  ]
});

updateAP('AP-72', {
  shortDesc: "Manager hasn't written code in years and has no technical credibility. Can't evaluate engineering quality, doesn't understand technical constraints, and team sees them as out of touch.",
  warningSigns: [
    "EM can't participate meaningfully in architecture discussions",
    "EM grades code quality but team disagrees with the assessment",
    "EM doesn't understand why a project takes as long as it does",
    "Technical team members make decisions around the EM, not with them"
  ],
  impact: "Within 1-2 quarters: EM credibility with technical team erodes; poor technical decisions are made because EM can't evaluate trade-offs; coaching becomes ineffective because EM is seen as not understanding the work.",
  recoveryActions: [
    "Maintain 5-10% hands-on technical work: read design docs, code review some PRs, pair program occasionally, do a small feature.",
    "Not to code-review everything (that's insecurity), but enough to understand the technical constraints.",
    "Stay current on team's tech debt, system limitations, and architectural decisions.",
    "Model learning by coding alongside the team and asking questions.",
    "Periodically pair with a senior IC to deepen technical understanding."
  ]
});

updateAP('AP-73', {
  shortDesc: "Junior engineers are left to figure out how to grow, without clear milestones or mentorship. Some stagnate, some leave, and potential is wasted.",
  warningSigns: [
    "No explicit progression framework exists for junior engineers",
    "New hires aren't paired with mentors or mentorship is ad hoc",
    "Junior engineers can't articulate what L3 (or next level) looks like",
    "Some junior engineers hit a ceiling at 2-3 years and leave because they see no growth path"
  ],
  impact: "Within 1-2 years: junior engineers leave before reaching potential; internal talent pipeline dries up; team has to continuously hire junior and re-teach.",
  recoveryActions: [
    "Define progression framework from L1→L4 with explicit behavioral milestones per level.",
    "Pair every junior engineer with a mentor (peer mentor, senior IC, or TL) for first year.",
    "Monthly progress check-ins: 'Here's what we're seeing you improve on, here's what to focus on next.'",
    "Create visible path: if you hit these milestones by month 18, you're promoted to L3.",
    "Celebrate progress publicly — make growth visible and rewarded."
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

updatePlaybook('P-C6-1', {
  whatGoodLooksLike: "Within 2 weeks: all skip-level conversations scheduled. Within 1 month: first cycle of skip-level conversations completed; themes documented (not names). Within 1 quarter: manager has received coaching based on themes; team reports feeling heard. Outcome: hidden problems surface before they become attrition; manager improves based on data. Measured by: skip-level participation rate >90%, theme documentation quality, manager follow-up actions."
});

updatePlaybook('P-C6-2', {
  whatGoodLooksLike: "Within 2 weeks: 1:1 template redesigned with development focus; team educated on new template. Within 1 month: every 1:1 includes at least 15 min of development conversation. Within 1 quarter: team survey shows >80% satisfaction with 1:1 quality. Outcome: employees feel coached; development conversations are normal, not exceptional. Measured by: team survey on 1:1 quality, employee development goal articulation, coaching moments per 1:1."
});

updatePlaybook('P-C6-3', {
  whatGoodLooksLike: "Within 1 month: progression framework documented and visible to team; promotion register created. Within 2 months: pre-promotion conversations held with candidates. Within 1 quarter: first promotions announced with zero surprises. Outcome: team understands path to promotion; high-potential people feel validated; promotional process is transparent. Measured by: employee understanding of next-level criteria (survey), zero surprised rejections, promotion rate trend."
});

updatePlaybook('P-C6-4', {
  whatGoodLooksLike: "Within 2 weeks: high-performers identified and initial career conversations scheduled. Within 1 month: career conversations completed and development plans created. Within 1 quarter: first rotation opportunity created for at least one person. Outcome: high-performers feel invested in; retention improves; organization develops multiple potential successors. Measured by: retention of high performers, engagement survey scores, rotation success."
});

updatePlaybook('P-C6-5', {
  whatGoodLooksLike: "Within 2 weeks: junior engineer mentors assigned; progression framework shared. Within 1 month: first mentorship check-in completed. Within 1 quarter: junior engineers report clear understanding of next level. Within 18 months: cohort of junior engineers promoted to mid-level at elevated rate. Outcome: junior engineers grow faster; internal talent pipeline strengthens; fewer departures due to lack of growth. Measured by: junior engineer retention rate, L2→L3 promotion rate, mentorship quality (survey)."
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
    "Can describe specific development goals for at least 3 direct reports",
    "Names individuals they're developing toward promotion — knows exactly what those people need to demonstrate",
    "Describes a person they coached through a difficult situation, with specific behavioral changes",
    "Talks about people's growth trajectory, not just current performance"
  ],
  redFlags: [
    "Cannot name development goals for their team",
    "Views development as 'nice to have' when people ask for it, not proactive",
    "Describes people only by current performance, not potential",
    "High performers on their team leave — especially to other teams"
  ]
});

updateIQ('IQ-60', {
  lookFor: [
    "Describes performance reviews as a conversation about growth, not a report card",
    "Calibrates feedback across the team — can give specific examples of consistency",
    "Feedback is behavioral with examples, not personality-based",
    "Explains how they handled someone who received critical feedback"
  ],
  redFlags: [
    "Performance reviews are annual, not ongoing",
    "Feedback is vague: 'You're not being a team player' rather than specific situations",
    "Cannot describe how they ensure consistent feedback across the team",
    "Reviews are surprising to employees because they haven't heard feedback before"
  ]
});

updateIQ('IQ-61', {
  lookFor: [
    "Explains promotion criteria clearly with written examples",
    "Describes a pre-promotion conversation: 'Here's what we're seeing, here's what we need to see'",
    "Can name high-performers and their promotion timeline",
    "Low regret rate: promoted people continue to high-perform"
  ],
  redFlags: [
    "No documented promotion criteria beyond 'we'll know it when we see it'",
    "Surprised people when told they were (or weren't) being promoted",
    "Can't describe a clear threshold for promotion",
    "High-performer retention is lower than peer teams"
  ]
});

updateIQ('IQ-62', {
  lookFor: [
    "Identifies high-performers early, not waiting for promotion cycle",
    "Creates stretch opportunities: rotations, leadership opportunities, new projects",
    "Invests in senior ICs' career paths even if not management track",
    "Describes zero or near-zero regrettable attrition of high performers"
  ],
  redFlags: [
    "High-performers leave the team because they don't see growth",
    "No rotation opportunities — people stay in the same role for years",
    "Only pathway visible is management; high-performing ICs have nowhere to go",
    "Doesn't have development conversations with high-performers until they start job searching"
  ]
});

writeJSON('interview-questions.json', iqs);

// ─── 8. SELF-ASSESSMENT.JSON ────────────────────────────────────────────────
console.log('Processing self-assessment.json...');
let sa = readJSON('self-assessment.json');
let c6sa = sa.find(s => s.capabilityId === 'C6');
if (c6sa) {
  c6sa.behavioralAnchors[0].description = "1:1s are status meetings focused on what needs to get done; no development conversations; team members cannot describe their career goals or growth path";
  c6sa.behavioralAnchors[1].description = "Some development conversations happen; promotion criteria exist informally; performance reviews are annual with limited coaching; high-performers occasionally leave";
  console.log('  ✓ C6 self-assessment L1-L2 anchors sharpened');
}
writeJSON('self-assessment.json', sa);

// ─── 9. MEASUREMENT-GUIDANCE.JSON ───────────────────────────────────────────
console.log('Processing measurement-guidance.json...');
let mg = readJSON('measurement-guidance.json');
let c6mg = mg.find(m => m.capabilityId === 'C6');
if (c6mg) {
  c6mg.leadingIndicators = [
    "Skip-level conversations conducted quarterly with >90% participation",
    "Performance review calibration sessions held before finalizing ratings",
    "Progression framework documented and visible to team",
    "Promotion register maintained with pre-promotion conversations",
    "Structured 1:1 agenda with development focus implemented",
    "High-performer career conversations completed annually",
    "Mentor assignments for junior and new engineers tracked",
    "Underperformance issues addressed within 30 days of identification"
  ];
  c6mg.laggingIndicators = [
    "Retention of high performers >90% (vs. regrettable attrition <5%/year)",
    "Internal promotion rate >30% of promotion opportunities",
    "Employee confidence in career path (survey): >80% can describe next-level criteria",
    "Junior engineer L2→L3 promotion rate increased 20%+ year-over-year",
    "Zero surprised rejections in promotion process",
    "Team satisfaction with growth opportunities >4.0/5.0",
    "Skip-level feedback themes addressed with manager coaching",
    "Underperformance resolution rate: 70% improvement, 30% transition or exit within 60-90 days"
  ];
  console.log('  ✓ C6 measurement guidance indicators cleaned');
}
writeJSON('measurement-guidance.json', mg);

// ─── 10. LEARNING-PATHWAYS.JSON ─────────────────────────────────────────────
console.log('Processing learning-pathways.json...');
let lp = readJSON('learning-pathways.json');
let c6lp = lp.find(l => l.capabilityId === 'C6');
if (c6lp) {
  // Clean foundational resource descriptions (strip marketing copy)
  if (c6lp.foundational[0]) c6lp.foundational[0].description = "Fundamentals of effective management including building strong relationships, giving feedback, developing people, and creating psychological safety. Essential foundation for talent development.";
  if (c6lp.foundational[1]) c6lp.foundational[1].description = "Covers progressive discipline, difficult conversations, handling underperformance, and managing people out. Necessary for addressing problems directly and fairly.";
  if (c6lp.foundational[2]) c6lp.foundational[2].description = "Coaching methodology: asking powerful questions, listening actively, and helping people discover solutions. Core skill for developing talent.";
  if (c6lp.foundational[3]) c6lp.foundational[3].description = "How to recognize potential in people, develop high-performers, and create career paths. Directly applicable to retention and growth.";

  // Clean practical resource descriptions
  if (c6lp.practical[0]) c6lp.practical[0].description = "Structured 1:1 template with development focus: weekly conversations that include career growth, feedback, and coaching.";
  if (c6lp.practical[1]) c6lp.practical[1].description = "How to conduct skip-level conversations quarterly to surface hidden problems and understand team health from employee perspective.";
  if (c6lp.practical[2]) c6lp.practical[2].description = "Progression framework design with explicit behavioral milestones per level, enabling clear career path visibility.";

  // Clean advanced resource descriptions
  if (c6lp.advanced[0]) c6lp.advanced[0].description = "How to identify and develop future leaders within the organization, creating a sustainable pipeline of internal talent.";
  if (c6lp.advanced[1]) c6lp.advanced[1].description = "Building high-performance teams through selection, development, and culture. How team composition affects outcomes.";
  if (c6lp.advanced[2]) c6lp.advanced[2].description = "Diversity and inclusion practices: hiring, sponsorship, and belonging. How diverse teams make better decisions.";
  if (c6lp.advanced[3]) c6lp.advanced[3].description = "Scaling development practices across multiple teams while maintaining quality and personalization.";

  console.log('  ✓ C6 learning pathways descriptions cleaned');
}
writeJSON('learning-pathways.json', lp);

console.log('\n✅ C6 deep cycle complete. All files updated.');

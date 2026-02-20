# EM Data Content Quality Audit Prompt

Use this prompt with Claude to perform a comprehensive content quality audit of the EM data layer. Run this periodically after any enrichment session, new content addition, or schema change.

---

## Prompt

You are a senior Engineering Manager content quality auditor. Your job is to perform an exhaustive, line-by-line audit of the EM framework data files. You are opinionated, meticulous, and allergic to vagueness. Your standard is: every sentence should be something a Staff+ EM at Amazon, Google, or Netflix would nod at — not something from an HR handbook.

### Files to Audit

**Primary content files** (audit every entry):
- `src/data/observables.json` — 147 behavioral observables (with nested calibration signals)
- `src/data/calibration-signals.json` — 328 calibration signals
- `src/data/anti-patterns.json` — 70 anti-patterns
- `src/data/playbooks.json` — 74 situational playbooks
- `src/data/rubric-anchors.json` — 28 rubric anchors (2 per capability)
- `src/data/measurement-guidance.json` — 14 measurement guidance entries
- `src/data/metrics.json` — 78 metrics
- `src/data/search-index.json` — 412+ search index entries

**Metrics ecosystem files** (audit structure and references):
- `src/data/metric-pairs.json` — 7 mandatory metric pairings
- `src/data/diagnostic-chains.json` — 15 diagnostic decision trees
- `src/data/dashboard-blueprints.json` — 2 dashboard templates (EM + Director)
- `src/data/priority-stacks.json` — 2 ranked metric priority stacks (EM + Director)
- `src/data/calibration-language.json` — 38 calibration language templates
- `src/data/metrics-roadmap.json` — 4-phase implementation roadmap
- `src/data/archetypes.json` — 10 team archetypes

**Supporting/reference files** (check for consistency):
- `src/data/capabilities.json` — 14 capabilities (master reference)
- `src/data/interview-questions.json` — 112 interview questions
- `src/data/learning-pathways.json` — 14 learning pathways
- `src/data/coverage.json` — 14 coverage matrix entries
- `src/data/crosswalk.json` — 151 framework crosswalk entries
- `src/data/self-assessment.json` — 14 self-assessment entries
- `src/data/tech-debt-economics.json` — 5 tech debt economics entries
- `src/data/career-progression.json` — 5-level career ladder
- `src/data/org-maturity.json` — 5-level org maturity model
- `src/data/evidence-types.json` — 24 evidence type definitions

---

## PART 1: STRUCTURAL INTEGRITY

### 1A. JSON Validity & Schema Consistency

For each file, verify:
- [ ] Valid JSON (no trailing commas, no syntax errors)
- [ ] Every entry has all required fields for its type (no missing keys)
- [ ] No entries have extra/unexpected fields
- [ ] Field types are consistent (strings are strings, arrays are arrays, numbers are numbers)
- [ ] No `null` values where a string is expected (unless explicitly allowed)
- [ ] No empty strings `""` where meaningful content is expected
- [ ] IDs are unique within each file
- [ ] IDs follow the naming convention: `C{n}-O{n}` for observables, `AP-{nn}` for anti-patterns, `P-C{n}-{n}` for playbooks, `SIG-{nnn}` for signals, `{n.n}` for metrics

### 1B. Referential Integrity

Cross-file references must resolve:

**Core content references:**
- [ ] Every `capabilityId` in observables/signals/anti-patterns/playbooks exists in `capabilities.json`
- [ ] Every `observableId` in calibration signals exists in `observables.json`
- [ ] Every `observableIds[]` array in playbooks contains valid observable IDs
- [ ] Every `capabilityIds[]` array in playbooks contains valid capability IDs
- [ ] Every `suggestedMetricIds[]` in playbooks contains valid metric IDs from `metrics.json`
- [ ] Every `mandatoryPairIds[]` in metrics contains valid metric IDs
- [ ] Every `capabilityIds[]` in metrics contains valid capability IDs
- [ ] Every `observableIds[]` in metrics contains valid observable IDs
- [ ] **STRICT**: Every `replaces` field in metrics references a valid metric ID (e.g., `I5`) — **NEVER** descriptive text (e.g., "Velocity...").
- [ ] Anti-pattern `relatedCapabilities[]` all exist in capabilities.json
- [ ] Anti-pattern `relatedAntiPatterns[]` all exist in anti-patterns.json (no self-references)
- [ ] Rubric anchor `capabilityId` exists in capabilities.json
- [ ] Search index entries have valid URLs that correspond to actual built pages
- [ ] Search index entry IDs match their source data (observable IDs, metric IDs, AP slugs)

**Metrics ecosystem references:**
- [ ] Every `triggerMetricId` and `steps[].checkMetricId` in diagnostic-chains.json exists in metrics.json
- [ ] Every `steps[].alsoCheckMetricIds[]` in diagnostic-chains.json exists in metrics.json
- [ ] Every `metricA.id`, `metricB.id`, `metricA.alsoIds[]`, `metricB.alsoIds[]` in metric-pairs.json exists in metrics.json
- [ ] Every widget `metricId` in dashboard-blueprints.json exists in metrics.json
- [ ] Every `metricId` in calibration-language.json exists in metrics.json
- [ ] Every `metricsActivated[]` in metrics-roadmap.json exists in metrics.json
- [ ] Every `metricId` in priority-stacks.json exists in metrics.json
- [ ] Every `diagnosticMetricIds[]` and `recommendedMetricIds[]` in archetypes.json exists in metrics.json

**Capability references in supporting files:**
- [ ] Every `capabilityId` in interview-questions.json exists in capabilities.json
- [ ] Every `capabilityId` in learning-pathways.json exists in capabilities.json
- [ ] Every `capabilityId` in measurement-guidance.json exists in capabilities.json
- [ ] Every `capabilityId` in self-assessment.json exists in capabilities.json
- [ ] Every `capabilityExpectations` key in career-progression.json exists in capabilities.json
- [ ] Every `capabilityFocus[]` in org-maturity.json exists in capabilities.json
- [ ] Every `primaryCapability` and `secondaryCapability` in crosswalk.json exists in capabilities.json

**Evidence and observable cross-references:**
- [ ] Every `evidenceTypes[]` key in observables.json exists in evidence-types.json
- [ ] Every `observableId` in crosswalk.json exists in observables.json
- [ ] Every nested `calibrationSignals[].observableId` in observables.json matches the parent observable's `id`

### 1C. ID Hygiene & Sequences

- [ ] **ID Collision Check**: Ensure no IDs are reused across different content (e.g., check for `SIG-141` appearing twice).
- [ ] **Sequence Gaps**: Identify and flag non-sequential gaps in IDs (e.g., `AP-34`, `36`, `39` missing) unless intentional for future-proofing.
- [ ] **Referential Symmetry**: If an Anti-Pattern links to a Playbook, the Playbook's `observableIds` should map back to the same capability.

### 1D. Rubric Anchor Coverage

- [ ] Every capability has exactly 2 rubric anchors
- [ ] Every observable ID appears within at least one rubric anchor's `rationale` range
- [ ] Rubric anchor level descriptions (level1Developing through level5Advanced) form a clear, monotonically increasing progression
- [ ] New observables added since last audit are included in appropriate anchor ranges

### 1E. Duplicate Detection

- [ ] No duplicate observable IDs
- [ ] No duplicate anti-pattern slugs
- [ ] No duplicate signal IDs
- [ ] No semantically duplicate content (different IDs, same concept) — check for:
  - Anti-patterns with >70% similar `shortDesc` text
  - Observables with >70% similar `shortText` text
  - Signals with >80% similar `signalText` text
  - Playbooks with >70% similar `title` text

### 1F. Slug & URL Contract Validation

Astro generates routes from slugs — a broken slug means a broken page.

- [ ] All `slug` fields are URL-safe (lowercase, hyphens only, no special characters)
- [ ] `capability.slug` is unique across all capabilities
- [ ] `metric.slug` is unique across all metrics
- [ ] `antiPattern.slug` is unique across all anti-patterns
- [ ] `playbook.slug` is unique across all playbooks
- [ ] `observable.slug` is unique across all observables
- [ ] Search index `url` fields match the actual route pattern:
  - Capabilities: `/capabilities/{slug}/`
  - Metrics: `/metrics/{slug}/`
  - Anti-patterns: `/anti-patterns/{slug}/`
  - Playbooks: `/playbooks/{slug}/`
  - Career levels: `/career-progression/{slug}/`
- [ ] Observable anchor IDs (used as `#{id.toLowerCase()}`) contain no characters that break fragment navigation

### 1G. Enum & Domain Value Validation

- [ ] Every capability `domain` is one of: Strategy, Execution, Stakeholder, People, Reliability, Data
- [ ] Every metric `category` is one of: DORA, Flow, Reliability, Quality, DevEx, Activity, People, Strategy, Security, Cost, AI-Era
- [ ] Every metric `tier` is one of: primary, secondary, tertiary, activity, inferior, diagnostic
- [ ] Every metric `cadence` is one of: weekly, monthly, quarterly, never-as-kpi
- [ ] Every observable `requiredFrequency` is one of: episodic, monthly, quarterly, weekly, daily
- [ ] Every observable `emRelevance` and `directorRelevance` is one of: Low, Medium, High
- [ ] Every metric `implementationEffort` is one of: low, medium, high
- [ ] Every metric `type` is one of: causal, lagging, leading
- [ ] Every interview question `level` is one of: junior, mid, senior, staff
- [ ] Every interview question `questionType` is one of: behavioral, situational, technical
- [ ] Every calibration signal `signalType` is one of the defined signal types

### 1H. Numeric Invariants

- [ ] Observable `defaultWeight` values per capability sum to ≈1.0 (tolerance ±0.05)
- [ ] Capability `observableCount` matches the actual count of observables with that `capabilityId`
- [ ] Self-assessment `behavioralAnchors` has exactly 5 entries (levels 1-5) per capability
- [ ] Learning pathways have exactly 3 sections (foundational, practical, advanced) per capability
- [ ] Career progression has exactly 5 levels
- [ ] Org maturity has exactly 5 levels
- [ ] Metric `maturityPhase` values correspond to phases defined in metrics-roadmap.json

---

## PART 2: CONTENT QUALITY — WORD-LEVEL AUDIT

### 2A. Vague Language Detection (ZERO TOLERANCE)

Scan ALL text fields in ALL files for these vague patterns. Each match is a defect:

**HR-Speak / Corporate Platitudes:**
- "communicate better" / "improve communication"
- "foster collaboration" / "improve collaboration"
- "ensure quality" / "maintain quality"
- "drive alignment" / "create alignment"
- "build trust" / "establish trust"
- "enhance productivity" / "improve productivity"
- "maintain standards" / "uphold standards"
- "foster innovation" / "drive innovation"
- "empower the team" / "empower engineers"
- "create a culture of" / "build a culture of"
- "champion best practices"
- "facilitate growth"
- "leverage synergies"
- "optimize processes"
- "promote transparency"
- "encourage ownership"
- "support team members"
- "provide guidance"
- "ensure compliance"
- "consult affected parties" (replace with specific roles like "consult product triad")
- "genuine career support" (replace with specific actions like "reference advocacy")

**Weasel Verbs (vague when used without a specific mechanism):**
- "improve" (without specifying what, by how much, measured how)
- "enhance" (without concrete outcome)
- "ensure" (without specifying the mechanism that ensures it)
- "maintain" (without specifying the practice or cadence)
- "drive" (without specifying the specific action)
- "support" (without specifying the tangible action taken)
- "facilitate" (without specifying the concrete facilitation mechanism)
- "promote" (without specifying the specific promotional action)
- "enable" (without specifying the enabling mechanism)
- "leverage" (almost always replaceable with a specific verb)
- "align" (without specifying the alignment mechanism — OKR? Meeting? Document?)
- "communicate" (without specifying the format, cadence, and audience)

**For each match, suggest a specific mechanism replacement.** Example:
- BAD: "Communicate status updates regularly"
- GOOD: "Publish weekly 3-bullet status in Slack channel: what shipped, what's blocked, what's next"

### 2B. Internal Redundancy & Specificity Audit

For every `how` field in observables, every `recoveryActions` in anti-patterns, and every `decisionFramework` in playbooks, verify:

- [ ] **Internal Duplication**: Scan for repeated sentences or identical Big Tech examples within a single field (e.g., check `SIG-066` for double-appended Bar Raiser text).
- [ ] Contains at least one **specific mechanism** (not just an abstract concept)
- [ ] Mechanisms are **actionable** — a new EM could follow them without interpretation
- [ ] Includes **cadence** where applicable (weekly, quarterly, per-sprint, per-incident)
- [ ] Includes **format** where applicable (1-pager, 6-pager, Slack, design doc, RFC)
- [ ] Includes **threshold/target** where applicable (>85%, <5%, within 48 hours)
- [ ] Names **specific roles** where applicable (EM, TL, PM, Staff engineer, skip-level)

**Specificity scoring rubric:**
- **A**: Contains 3+ specific mechanisms with cadence/format/threshold. Example: "Run weekly team health pulse (3 questions, anonymous, results shared same day). If any dimension drops below 3.5/5.0 for 2 consecutive weeks, schedule a 1:1 with the team member most affected and a retrospective within 5 business days."
- **B**: Contains 1-2 specific mechanisms with some context. Example: "Run quarterly retrospectives with specific action items tracked to completion."
- **C**: Names a concept but lacks mechanism detail. Example: "Run retrospectives and track action items."
- **D**: Vague/abstract with no mechanism. Example: "Improve team processes and communication."
- **F**: Empty, trivially short (<20 chars), or pure platitude.

**Target: Zero C/D/F entries.** Flag every entry below B-grade.

### 2C. Big Tech Grounding Audit

For each file, count and report:

**Observables (`why` and `how` fields):**
- [ ] Total observables: ___
- [ ] Observables with Big Tech references: ___ (target: >50%)
- [ ] Observables with NO Big Tech reference: ___ (list IDs)
- [ ] Distribution by company (Amazon, Google, Netflix, Meta, Spotify, Stripe, other)
- [ ] Any forced/incorrect Big Tech references? (reference doesn't match the practice described)

**Calibration Signals (`signalText` field):**
- [ ] Total signals: ___
- [ ] Signals with Big Tech references: ___ (target: >25%)
- [ ] Distribution by company
- [ ] Any duplicate enrichments (same Big Tech sentence appended twice)?

**Anti-Patterns (`shortDesc`, `longDesc`, `recoveryActions`):**
- [ ] Total anti-patterns: ___
- [ ] Anti-patterns with Big Tech references: ___ (target: >20%)
- [ ] Any anti-patterns that SHOULD reference a Big Tech failure pattern but don't?

**Playbooks (`whatGoodLooksLike`, `decisionFramework`):**
- [ ] Total playbooks: ___
- [ ] Playbooks with "Industry reference:" sections: ___ (target: >80%)
- [ ] Playbooks with calibration signal cross-links: ___ (target: >90%)

**Verify Big Tech references are accurate:**
- Amazon: Working Backwards, PR/FAQ, 6-pager, Bar Raiser, Leadership Principles (list all 16), two-pizza teams, single-threaded ownership, COE (Correction of Error), OP1/OP2, weekly business review, STAR format, FinOps, disagree-and-commit, Type 1/Type 2 decisions
- Google: DORA research, SRE (error budgets, SLO/SLI/SLA, toil budgets, incident command), Project Aristotle, Project Oxygen, OKR framework, design doc culture, calibration committees, PRR (Production Readiness Review), DiRT exercises, structured interviewing research, SPACE framework
- Netflix: Keeper Test, Freedom and Responsibility culture doc, context-over-control, Chaos Engineering, full-cycle developer model, highly aligned loosely coupled, no vacation policy philosophy
- Meta: Bootcamp onboarding, triad model (EM/PM/Design), SEV process, DRI model, performance review cross-functional feedback
- Spotify: Squad Health Check, squad/chapter/tribe/guild model, trio model (TPM/PD/Design), hack weeks
- Stripe: Writing culture (written-first decision making), developer productivity research

Flag any reference that attributes a practice to the wrong company or describes a practice inaccurately.

### 2D. Thin Content Detection

For every text field, flag entries that are suspiciously short:

| File | Field | Minimum Length | Action |
|---|---|---|---|
| observables.json | `shortText` | 30 chars | Flag if shorter |
| observables.json | `fullExample` | 50 chars | Flag if shorter |
| observables.json | `why` | 60 chars | Flag if shorter — should explain the principle |
| observables.json | `how` | 60 chars | Flag if shorter — should contain mechanism |
| observables.json | `expectedResult` | 50 chars | Flag if shorter — should be measurable |
| anti-patterns.json | `shortDesc` | 80 chars | Expand to 2 sentences: pattern + systemic consequence |
| anti-patterns.json | `longDesc` | 150 chars | Flag if shorter |
| anti-patterns.json | `warningSigns` | 3 items | Flag if fewer |
| anti-patterns.json | `recoveryActions` | 3 items | Flag if fewer |
| playbooks.json | `whatGoodLooksLike` | 100 chars | Flag if shorter |
| playbooks.json | `decisionFramework` | 100 chars | Flag if shorter |
| playbooks.json | `commonMistakes` | 3 items | Flag if fewer |
| calibration-signals.json | `signalText` | 40 chars | Flag if shorter |
| rubric-anchors.json | level descriptions | 80 chars each | Flag if shorter |
| metrics.json | `description` | 80 chars | Flag if shorter |

### 2E. Voice & Tone Consistency

The target voice is: **Senior EM speaking to peers — direct, opinionated, mechanistic, zero corporate polish.**

Flag any entry that sounds like:
- **HR handbook**: "We believe in creating an inclusive environment where all team members can thrive"
- **Consultant deck**: "Leverage cross-functional synergies to drive holistic transformation"
- **Textbook**: "Communication is an important aspect of engineering management"
- **Motivational poster**: "Great leaders inspire their teams to achieve greatness"
- **Generic advice**: "Be a good listener and provide constructive feedback"

The tone should feel like advice from a battle-scarred EM who has seen things fail. Examples of the right voice:
- "Your IC's rating lives or dies in calibration — you're their advocate in a room of competing advocates"
- "Poorly run re-orgs destroy trust and productivity for months — people leave because of how it was handled, not what was decided"
- "Without clear roles, incidents devolve into chaos with everyone talking and nobody deciding"

### 2F. Nested Calibration Signal Validation

Observables contain inline `calibrationSignals[]` arrays. For each:
- [ ] `calibrationSignals[].observableId` matches the parent observable's `id`
- [ ] `calibrationSignals[].capabilityId` matches the parent observable's `capabilityId`
- [ ] `calibrationSignals[].id` format follows `SIG-{nnn}` convention
- [ ] `calibrationSignals[].signalText` meets the same quality bar as top-level signals
- [ ] No duplicate signal IDs between nested signals and `calibration-signals.json`
- [ ] Nested signals are consistent with their counterparts in `calibration-signals.json` (if present in both)

---

## PART 3: ECOSYSTEM COUPLING AUDIT

### 3A. Cross-Link Completeness

The data layer has tight ecosystem coupling: Anti-Pattern <-> Metric <-> Observable <-> Playbook <-> Rubric. Verify these cross-links exist IN THE CONTENT TEXT (not just JSON references):

**Observable `how` -> Metric:**
- [ ] Every observable with `observableIds` entries in `metrics.json` should have "Validate with metric X.X (Metric Name)" in its `how` field
- [ ] Count: ___ observables have metric cross-links / ___ should have them

**Anti-Pattern `recoveryActions` -> Playbook:**
- [ ] Recovery actions should name the relevant playbook: "See playbook P-CX-Y for detailed guidance"
- [ ] Count: ___ anti-patterns have playbook cross-links / ___ have relevant playbooks

**Playbook `whatGoodLooksLike` -> Calibration Signal:**
- [ ] Each playbook should reference at least one calibration signal: 'Calibration signal: "..." (SIG-XXX)'
- [ ] Count: ___ playbooks have signal cross-links / ___ should have them

**Anti-Pattern -> Observable (bidirectional):**
- [ ] Anti-pattern `relatedCapabilities` should map to specific observables that detect/prevent the pattern
- [ ] Observables in related capabilities should mention the anti-pattern risk in their `why` field where natural

### 3B. Search Index Completeness

- [ ] Every observable has a search index entry
- [ ] Every anti-pattern has a search index entry
- [ ] Every metric has a search index entry
- [ ] Every playbook has a search index entry
- [ ] Search index descriptions include Big Tech tags `[Amazon, Google, ...]` for enriched observables
- [ ] Search index anti-pattern descriptions use the full expanded `shortDesc`
- [ ] No search index entries with empty or placeholder descriptions
- [ ] No search index entries with empty/broken URLs
- [ ] Search for these terms and verify results: "Amazon bar raiser", "Google SRE", "Netflix Keeper Test", "DORA metrics", "psychological safety", "tech debt", "incident response"

### 3C. Metrics Ecosystem Coherence

- [ ] Every metric referenced in `metric-pairs.json` has a corresponding `mandatoryPairIds` entry
- [ ] Dashboard blueprint widgets only reference metrics with matching `dashboardPlacement` values
- [ ] Priority stack metrics match the correct `emTier`/`directorTier` for their stack
- [ ] Diagnostic chain `triggerMetricId` references metrics with `tier: "diagnostic"` or appropriate trigger tier
- [ ] Calibration language entries cover all primary and secondary tier metrics
- [ ] Metrics roadmap `metricsActivated` per phase matches metrics' `maturityPhase` field
- [ ] Archetype `diagnosticMetricIds` reference metrics that can actually diagnose the archetype's pattern

---

## PART 4: PUNCTUATION & FORMATTING

### 4A. Text Artifacts

Scan all text fields for:
- [ ] Double periods `..` (often found at the end of signals or enriched text)
- [ ] Period before conjunction+company: `and. Google`, `or. Amazon`, `the. Netflix`
- [ ] Orphaned periods: `'. '.` or `". ".`
- [ ] Missing space after period: `.The`, `.At`, `.In`
- [ ] Double spaces (except after period in some style guides)
- [ ] Trailing whitespace
- [ ] Leading whitespace in field values
- [ ] Unmatched quotes or parentheses
- [ ] Unicode issues: mojibake characters, unexpected control characters
- [ ] Em-dash variants: ensure consistent use of `—` (not `--` or `-` or mixed)
- [ ] Inconsistent semicolon usage (within a single entry, pick one style: semicolons as list separators OR periods as sentence endings)

### 4B. Capitalization & Role Consistency

- [ ] **Role Casing**: Ensure professional roles are cased consistently (e.g., "Manager's Manager" vs "manager's manager"). Prefer Title Case for specific role names.
- [ ] Company names always capitalized: Amazon, Google, Netflix, Meta, Spotify, Stripe (not amazon, google, etc.)
- [ ] Acronyms always uppercase: DORA, SRE, OKR, SLO, SLI, SLA, CI/CD, DRI, DACI, RFC, PR, IC, EM, TL, PM
- [ ] Framework names: Keeper Test, Bar Raiser, Working Backwards (not keeper test, bar raiser)
- [ ] Level descriptions in rubric anchors start with consistent pattern

### 4C. Array Formatting

For array fields (`warningSigns`, `recoveryActions`, `evidenceTypes`, `commonMistakes`):
- [ ] All entries are strings (not nested objects or numbers)
- [ ] No empty string entries `""`
- [ ] No entries that are just whitespace
- [ ] Each entry is a complete thought (not a fragment)
- [ ] Consistent formatting within arrays (all start with verb, or all start with noun)

---

## PART 5: SEMANTIC QUALITY

### 5A. Level Description Progression

For each rubric anchor in `rubric-anchors.json`, verify the 5-level progression is:
- [ ] **Monotonically increasing** in sophistication (level 1 < level 2 < level 3 < level 4 < level 5)
- [ ] **Non-overlapping** (each level describes behaviors clearly distinct from adjacent levels)
- [ ] **Observable** (describes what you can SEE, not what you infer)
- [ ] **Level 3 = competent EM baseline** (not exceptional, not struggling)
- [ ] **Level 5 = Director-level / industry-recognized excellence** (aspirational but achievable)

### 5B. Anti-Pattern Severity & Coherence

For each anti-pattern:
- [ ] `severity` is appropriate (critical/high/medium) given the `systemicConsequence`
- [ ] `warningSigns` are observable (you can actually detect them, not just feel them)
- [ ] `recoveryActions` are in priority order (highest-impact first)
- [ ] `recoveryActions` are specific enough to act on (not "improve communication")
- [ ] `relatedAntiPatterns` form coherent clusters (not random associations)
- [ ] `shortDesc` conveys BOTH the pattern AND its consequence in 2 sentences

### 5C. Observable Completeness per Capability

For each of the 14 capabilities:
- [ ] Minimum 8 observables per capability
- [ ] Mix of `emRelevance` and `directorRelevance` levels (not all High or all Low)
- [ ] Mix of `requiredFrequency` values (not all "continuous")
- [ ] At least 2 `evidenceTypes` per observable
- [ ] `defaultWeight` values sum to approximately 1.0 within each capability
- [ ] No orphan observables (every observable contributes to at least one rubric anchor)

### 5D. Metric Coherence

For each metric:
- [ ] `goodRange`, `warningRange`, `dangerRange` form non-overlapping, complete coverage
- [ ] `tier` is appropriate (primary metrics are truly leading indicators)
- [ ] `mandatoryPairIds` create meaningful guardrails (speed metric paired with quality metric)
- [ ] `decisionRule` is actionable (tells you what to do at each range)
- [ ] `aiEraImpact` field is present and meaningful for all metrics
- [ ] Inferior metrics (`I{n}`) have clear `replaces` mapping to the better metric

---

## PART 6: SUPPORTING FILE QUALITY

### 6A. Interview Questions

- [ ] Every capability has at least 6 interview questions
- [ ] Mix of levels (junior through staff) per capability
- [ ] Mix of question types (behavioral, situational, technical)
- [ ] `followUps` has at least 2 entries per question
- [ ] `lookFor` and `redFlags` are specific and observable (not vague)

### 6B. Learning Pathways

- [ ] Every capability has a learning pathway
- [ ] Each pathway has foundational, practical, and advanced sections
- [ ] URLs in learning resources are not broken (404 check)
- [ ] Resource types are diverse (books, courses, workshops, articles)

### 6C. Career Progression

- [ ] All 14 capabilities have expectations at all 5 levels
- [ ] Expectations form a monotonically increasing progression
- [ ] `promotionBlockers` are specific and actionable
- [ ] `transitionSignals` describe observable behaviors

### 6D. Evidence Types

- [ ] Every evidence type referenced in observables.json exists in evidence-types.json
- [ ] No orphan evidence types (every type is used by at least one observable)
- [ ] `evidenceStrength` ratings are consistent (objective data = High, self-report = Low)

### 6E. Calibration Language

- [ ] Templates contain valid `{variable}` placeholders
- [ ] `variables[]` array matches all placeholders in `template`
- [ ] `antiPattern` field describes what NOT to say (specificity check)
- [ ] Coverage: every primary/secondary metric has at least one calibration language entry

### 6F. Org Maturity & Tech Debt

- [ ] Org maturity levels form a clear progression (1 through 5)
- [ ] Each level has distinct `capabilityFocus[]` that reflect increasing sophistication
- [ ] Tech debt economics entries have quantified cost models (not vague "it's expensive")
- [ ] Tech debt categories map to real engineering concerns (not management abstractions)

---

## PART 7: SEMANTIC COHERENCE & HOLISTIC VALUE

### 7A. Logical Thread Audit

Pick 5 random paths and trace the logical connection. A "broken thread" is a defect:
- [ ] **Thread**: Anti-Pattern (`AP-01`) -> Observable (`C3-O1`) -> Metric (`1.2`) -> Playbook (`P-C3-1`).
- [ ] Does the Metric actually measure the success of the Playbook's advice?
- [ ] Does the Observable's `how` field provide the mechanism to recover from the Anti-Pattern?
- [ ] Is the Calibration Signal's `signalText` a realistic verbalization of the Observable?

### 7B. Wisdom & Nuance Check (Senior EM Bar)

Audit for "managerial wisdom" — the difference between a textbook and a practitioner:
- [ ] **The "Messy Middle"**: Does the content acknowledge that some problems have no perfect solution? (e.g., "accepting temporary tech debt to hit a regulatory deadline").
- [ ] **Hard Truths**: Does it avoid toxic positivity? (e.g., admitting that "managed exits" are sometimes necessary for team health).
- [ ] **Leverage vs. Activity**: Does Level 5 in Rubric Anchors consistently describe *influence* and *multiplying impact* rather than just "doing more" of Level 3?
- [ ] **Incentive Alignment**: Do the Metrics paired in `mandatoryPairIds` genuinely prevent common gaming patterns? (e.g., pairing velocity with defect escape rate).

### 7C. Business Impact & ROI

- [ ] **Outcome over Output**: Are the `expectedResult` fields in `observables.json` focused on business/customer outcomes (e.g., "reduced latency") or just process outputs (e.g., "held meeting")?
- [ ] **Cost Awareness**: Does the framework consistently treat engineering time as a finite, expensive resource that must be allocated with ROI in mind?
- [ ] **Strategic Alignment**: Could a CTO use this data to explain engineering's value to a CEO?

---

## PART 8: EXECUTION CHECKLIST

### Automated Checks

Run these scripts first — they catch structural issues faster than manual review:

```bash
# 1. Referential integrity (comprehensive — checks all cross-file references)
node scripts/audit-referential-integrity.js

# 2. CSV export validation (ensures all data is parseable and exportable)
node scripts/export-csv.js --out-dir /tmp/em-csv-check

# 3. Full site build (catches broken pages, missing slugs, template errors)
npm run build
```

### Manual Python Validation

```python
# JSON validity check for all 25 data files
import json
for fname in [
    # Primary content
    'observables', 'calibration-signals', 'anti-patterns', 'playbooks',
    'rubric-anchors', 'measurement-guidance', 'metrics', 'search-index',
    # Metrics ecosystem
    'metric-pairs', 'diagnostic-chains', 'dashboard-blueprints',
    'priority-stacks', 'calibration-language', 'metrics-roadmap', 'archetypes',
    # Supporting/reference
    'capabilities', 'interview-questions', 'learning-pathways', 'coverage',
    'crosswalk', 'self-assessment', 'tech-debt-economics',
    'career-progression', 'org-maturity', 'evidence-types'
]:
    with open(f'src/data/{fname}.json') as f:
        json.load(f)  # Will throw if invalid

# Vague language scan
vague_patterns = [
    "communicate better", "improve communication", "foster collaboration",
    "ensure quality", "drive alignment", "build trust", "enhance productivity",
    "maintain standards", "foster innovation", "empower the team",
    "champion best practices", "facilitate growth", "leverage synergies",
    "optimize processes", "promote transparency", "encourage ownership"
]

# Slug uniqueness check
import json
for fname, slug_field in [
    ('capabilities', 'slug'), ('metrics', 'slug'), ('anti-patterns', 'slug'),
    ('playbooks', 'slug'), ('observables', 'slug')
]:
    with open(f'src/data/{fname}.json') as f:
        data = json.load(f)
    slugs = [entry[slug_field] for entry in data if slug_field in entry]
    dupes = [s for s in slugs if slugs.count(s) > 1]
    if dupes:
        print(f"DUPLICATE SLUGS in {fname}: {set(dupes)}")

# Enum validation
VALID_DOMAINS = {'Strategy', 'Execution', 'Stakeholder', 'People', 'Reliability', 'Data'}
VALID_TIERS = {'primary', 'secondary', 'tertiary', 'activity', 'inferior', 'diagnostic'}
VALID_FREQUENCIES = {'episodic', 'monthly', 'quarterly', 'weekly', 'daily'}
VALID_RELEVANCE = {'Low', 'Medium', 'High'}

# Numeric invariant: observable weights sum ≈ 1.0 per capability
# Numeric invariant: observableCount matches actual
# Thin content detection
# Big Tech coverage counting
# Cross-link verification
# Duplicate detection
# Punctuation artifact scan
# Rubric anchor coverage
```

### Also Run

- `node scripts/audit-referential-integrity.js` — comprehensive cross-file reference validation (388 LOC, checks capabilities, observables, metrics, anti-patterns, search index)
- `python3 scripts/audit_data_integrity.py` — legacy structural integrity checks (if still present)
- `node scripts/export-csv.js` — secondary validation that all data is exportable
- `npm run build` — no broken pages/links
- Search for key terms in running site to verify searchability

---

## OUTPUT FORMAT

Produce a report with:

1. **Summary Dashboard** — counts and percentages for each audit category
2. **Critical Issues** — anything that breaks functionality (broken refs, invalid JSON, missing required fields, broken slugs)
3. **Content Quality Issues** — vague language, thin content, missing Big Tech refs, voice violations
4. **Cross-Link Gaps** — missing ecosystem coupling
5. **Metrics Ecosystem Issues** — broken diagnostic chains, dashboard references, calibration language gaps
6. **Supporting File Issues** — interview questions, learning pathways, career progression, evidence types
7. **Formatting Issues** — punctuation, capitalization, text artifacts
8. **Recommendations** — prioritized list of fixes with estimated entry counts

For each issue, provide:
- File and entry ID
- Field name
- Current value (truncated to 100 chars)
- Issue description
- Suggested fix (specific, not "improve this")

---

## QUALITY BAR

The gold standard is `src/data/playbooks.json` — every entry should match its level of:
- Mechanistic specificity (names the practice, not the concept)
- Industry grounding (references real Big Tech practices accurately)
- Opinionated voice (says what works and what doesn't, directly)
- Actionability (a new EM can follow the guidance without interpretation)
- Measurability (includes thresholds, cadences, or observable outcomes)

If an entry doesn't meet this bar, it's a defect.

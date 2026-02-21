# Phase 1: Ontology Validation — Output Document

**Date:** 2026-02-21
**Scope:** All 14 capabilities (C1–C14), 147 observables, 70 anti-patterns, 74 playbooks
**Verdict:** PASS — No merge/split required. Boundary fixes applied for 2 entangled pairs.

---

## Test Results Summary

| # | Test | Result | Details |
|---|------|--------|---------|
| 1 | Independence (91 pairs) | PASS | 3 entangled pairs investigated; all resolved without merge |
| 2 | Misfit Detection | PASS | 147/147 observables use behavioral language; 0 trait language |
| 3 | Description Consistency | PASS | 14/14 follow "Assessed by: … Absence causes: …" pattern |
| 4 | Exhaustiveness (20 failure modes) | PASS | 20/20 map to capabilities with observable + anti-pattern coverage |
| 5 | Domain Balance | PASS | People=4, Strategy=3, Execution=2, Stakeholder=2, Reliability=2, Data=1 — all justified |
| 6 | Level Coverage Alignment | PASS | 2 notable observations flagged for monitoring |

---

## Test 1: Independence — Entangled Pair Analysis

### Pair 1: C6 (Coaching & Talent Dev) vs C14 (Performance Mgmt & Calibration)

**Decision Principle:** "Is this a development intervention or a measurement/evaluation intervention?"

| Observable | Issue | Resolution |
|-----------|-------|------------|
| C14-O8 | Severely duplicated C6-O4 (both: managing high performers with career conversations/stretch assignments) | **REWRITTEN** — C14-O8 now focuses on evidence portfolios, rating differentiation, and retention risk documentation |
| C14-O5 | "Creates stretch opportunities" leaked into C6-O5's territory | **TIGHTENED** — Removed stretch language; now says "coordinates with the engineer's coach on gap-filling work" |

**Verdict:** BOUNDARY CLARIFIED — No merge needed. C6 owns coaching mechanics; C14 owns evaluation/documentation mechanics.

### Pair 2: C2 (Strategic Prioritization) vs C10 (Resource Allocation & Tradeoffs)

**Decision Principle:** "Does this require budget/headcount authority?"

No overlapping observables found. Budget authority test cleanly separates all content.

**Verdict:** CLEAN PASS — No changes needed.

### Pair 3: C5 (Cross-Functional Influence) vs C7 (Decision Framing & Communication)

**Decision Principle:** "Is this about the relationship/influence or about the communication artifact/form?"

| Observable | Issue | Resolution |
|-----------|-------|------------|
| C5-O6 | shortText included "sending structured updates" (C7-O3 territory) | **REWORDED** — Now "providing solutions with options" |
| C5-O7 | shortText included "proactive written updates" (C7-O3 territory) | **REWORDED** — Now "consistent follow-through" |
| C5-O15 | Artifact-heavy phrasing in influence observable | **REWORDED** — Now emphasizes influence positioning over artifact production |

**Verdict:** PASS with cleanup — C5/C7 are distinct dimensions (relationship vs artifact). shortText bleed fixed.

---

## Test 2: Misfit Detection

Scanned all 147 observable shortText + fullExample fields for personality traits vs operating behaviors.

- **Trait language found:** 0 instances
- **Behavioral language confirmed:** 147/147
- All observables describe what the EM *does*, not what the EM *is*

---

## Test 3: Description Consistency

All 14 capability descriptions follow the standardized pattern (applied in Phase 0):

```
Assessed by: [metric1], [metric2], [metric3], [metric4], and [metric5].
Absence causes: [failure1], [failure2], [failure3], and [failure4].
```

---

## Test 4: Exhaustiveness — 20 Failure Modes

| # | Failure Mode | Capabilities | Observable Coverage | Anti-Pattern Coverage |
|---|-------------|-------------|--------------------|-----------------------|
| 1 | Team ships fast but breaks everything | C4 + C8 | C4-O5, C8-O1–O4 | AP-28, AP-29 |
| 2 | Team is happy but delivers nothing | C4 + C14 | C4-O1–O3, C14-O1–O3 | AP-24, AP-56 |
| 3 | Manager can't retain senior ICs | C6 + C12 | C6-O1–O4, C12-O1–O3 | AP-31, AP-32 |
| 4 | Team has no idea what matters most | C2 + C7 | C2-O1–O4, C7-O1–O3 | AP-6, AP-36 |
| 5 | Every project requires heroics to ship | C3 + C4 | C3-O3–O5, C4-O6–O8 | AP-11, AP-25 |
| 6 | Manager is invisible to stakeholders | C5 + C7 | C5-O1–O3, C7-O3–O5 | AP-21, AP-37 |
| 7 | Team drowns in tech debt | C3 + C10 | C3-O6–O8, C10-O3–O5 | AP-14, AP-15 |
| 8 | New hires leave within 6 months | C11 + C12 | C11-O5–O8, C12-O1–O4 | AP-46, AP-48 |
| 9 | Post-incident nothing changes | C8 | C8-O3–O6 | AP-29 |
| 10 | Manager can't get headcount approved | C5 + C10 | C5-O8–O10, C10-O1–O2 | AP-22, AP-42 |
| 11 | Metrics look great but zero business impact | C9 + C2 | C9-O3–O5, C2-O5–O6 | AP-38, AP-39 |
| 12 | High performers plateau | C6 + C14 | C6-O3–O5, C14-O7–O8 | AP-32, AP-57 |
| 13 | Remote team coordination is chaotic | C4 + C1 | C4-O9–O11, C1-O5–O7 | AP-26, AP-3 |
| 14 | Security incident catches team off-guard | C13 | C13-O1–O5 | AP-52, AP-53 |
| 15 | Manager avoids hard performance conversations | C14 | C14-O3–O6 | AP-56, AP-58 |
| 16 | Manager hoards information | C7 + C12 | C7-O3–O5, C12-O5–O6 | AP-37, AP-50 |
| 17 | Org structure creates bottlenecks | C1 | C1-O1–O4 | AP-1, AP-2 |
| 18 | Cross-team projects stall repeatedly | C5 + C1 | C5-O4–O6, C1-O8–O10 | AP-21, AP-4 |
| 19 | Team has no career growth paths | C6 + C11 | C6-O6–O8, C11-O9–O10 | AP-33, AP-47 |
| 20 | Manager can't operate under ambiguity | C2 + C7 | C2-O1–O3, C7-O8–O10 | AP-7, AP-36 |

**Verdict:** 20/20 failure modes covered by at least one capability with observable AND anti-pattern paths.

---

## Test 5: Domain Balance

| Domain | Capabilities | Count | Assessment |
|--------|-------------|-------|------------|
| People | C6, C11, C12, C14 | 4 | Justified — 4 distinct decision surfaces (coaching, hiring, culture, evaluation) |
| Strategy | C1, C2, C10 | 3 | Appropriate — org design, prioritization, resource allocation are distinct |
| Execution | C3, C4 | 2 | Adequate — architecture + operations cover execution; quality embedded in both |
| Stakeholder | C5, C7 | 2 | Clean — influence vs communication artifact |
| Reliability | C8, C13 | 2 | Appropriate — incidents + security are distinct operational concerns |
| Data | C9 | 1 | Defensible — metrics/measurement is a single coherent practice |

**No missing domains identified.** Engineering excellence / code quality lives within C3 (architecture) and C4 (operations).

---

## Test 6: Level Coverage Alignment

Career-progression expectations vs observable emRelevance/directorRelevance distributions checked for all 14 capabilities.

### Notable Observations (not blockers)

1. **C7 (Decision Framing & Communication):** Career-progression marks EM expectation as "medium", but 73% of C7 observables have High emRelevance. Consider raising to "high" in future career-progression update.

2. **C4 (Operational Leadership & Rhythm):** Career-progression marks Director expectation as "high", but only 31% of C4 observables have High directorRelevance. Consider lowering to "medium" in future career-progression update.

**Action:** Deferred to Phase 6 (Org Coherence) for career-progression alignment review.

---

## Changes Applied in Phase 1

| File | Change | Records Affected |
|------|--------|-----------------|
| `observables.json` | C14-O8 full rewrite (development → evaluation focus) | 1 |
| `observables.json` | C14-O5 tightened (removed stretch assignments) | 1 |
| `observables.json` | C5-O6 shortText (removed "structured updates") | 1 |
| `observables.json` | C5-O7 shortText (removed "proactive written updates") | 1 |
| `observables.json` | C5-O15 shortText (reworded for influence focus) | 1 |
| `search-index.json` | Updated C14-O8, C5-O15 titles/descriptions | 2 |

**Referential integrity verified:** 1,825 references, 0 broken.

---

## Deferred Items for Phase 2+

- 82 remaining baseline issues (vague language, thin content, fakeability) → addressed per-capability in Phase 2
- C7/C4 career-progression alignment → Phase 6
- 256 signal fakeability concerns → Phase 2 per-capability + Phase 3 cross-check

---

## Phase 2 Readiness

All Phase 1 gates passed. No merge/split decisions needed. Boundary fixes applied and verified. Ready to proceed with Phase 2 Wave 1:

| Session | Capability | Priority |
|---------|-----------|----------|
| 1 | C6 — Coaching & Talent Development | Anchor of People domain; boundary just clarified with C14 |
| 2 | C14 — Performance Management & Calibration | NEW capability; boundary just clarified with C6 |
| 3 | C2 — Strategic Prioritization | Thinnest capability (6 observables) |
| 4 | C10 — Resource Allocation & Tradeoffs | Paired with C2 |

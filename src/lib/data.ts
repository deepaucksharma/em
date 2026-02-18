import capabilitiesData from '../data/capabilities.json';
import observablesData from '../data/observables.json';
import antiPatternsData from '../data/anti-patterns.json';
import playbooksData from '../data/playbooks.json';
import calibrationSignalsData from '../data/calibration-signals.json';
import rubricAnchorsData from '../data/rubric-anchors.json';
import evidenceTypesData from '../data/evidence-types.json';
import crosswalkData from '../data/crosswalk.json';
import coverageData from '../data/coverage.json';
import searchIndexData from '../data/search-index.json';
import learningPathwaysData from '../data/learning-pathways.json';
import selfAssessmentData from '../data/self-assessment.json';
import interviewQuestionsData from '../data/interview-questions.json';
import orgMaturityData from '../data/org-maturity.json';
import careerProgressionData from '../data/career-progression.json';
import measurementGuidanceData from '../data/measurement-guidance.json';

// ── Types ──────────────────────────────────────────────

export interface Capability {
  id: string;
  name: string;
  slug: string;
  domain: string;
  description: string;
  primarySubTopics: string[];
  observableCount: number;
  v5Status: string;
}

export interface CalibrationSignal {
  id: string;
  observableId: string;
  capabilityId: string;
  signalText: string;
  signalType: string;
  sourceSubTopic: string;
}

export interface Observable {
  id: string;
  capabilityId: string;
  shortText: string;
  slug: string;
  fullExample: string;
  evidenceTypes: string[];
  defaultWeight: number;
  requiredFrequency: string;
  emRelevance: string;
  directorRelevance: string;
  levelNotes: string;
  why: string;
  how: string;
  expectedResult: string;
  status: string;
  calibrationSignals: CalibrationSignal[];
}

export interface AntiPattern {
  id: string;
  name: string;
  slug: string;
  observableIds: string[];
  capabilityId: string;
  shortDesc: string;
  warningSigns: string;
  impact: string;
  recoveryActions: string;
  sourceTopic: string;
  mappingNotes: string;
}

export interface Playbook {
  id: string;
  slug: string;
  observableIds: string[];
  capabilityIds: string[];
  title: string;
  context: string;
  topicsActivated: string[];
  decisionFramework: string;
  commonMistakes: string;
  whatGoodLooksLike: string;
  mappingNotes: string;
}

export interface RubricAnchor {
  capabilityId: string;
  sourceTopic: string;
  level1Developing: string;
  level3Competent: string;
  level5Advanced: string;
  rationale: string;
}

export interface EvidenceType {
  typeKey: string;
  slug: string;
  displayName: string;
  description: string;
  evidenceStrength: string;
  usageCount: number;
}

export interface CrosswalkEntry {
  origTopic: string;
  origPrinciple: string;
  origSubTopic: string;
  primaryCapability: string;
  secondaryCapability: string;
  mappingNotes: string;
  observableId: string;
}

export interface CoverageEntry {
  capabilityId: string;
  name: string;
  domain: string;
  primarySubTopics: number;
  observables: number;
  coveragePercent: number;
}

export interface SearchEntry {
  title: string;
  description: string;
  type: string;
  url: string;
  domain: string;
  capabilityName: string;
  id: string;
}

export interface LearningPathwayItem {
  title: string;
  type: string;
  description: string;
  url: string;
}

export interface LearningPathway {
  capabilityId: string;
  foundational: LearningPathwayItem[];
  practical: LearningPathwayItem[];
  advanced: LearningPathwayItem[];
}

export interface BehavioralAnchor {
  level: number;
  description: string;
}

export interface FeedbackQuestion {
  audience: string;
  question: string;
}

export interface SelfAssessment {
  capabilityId: string;
  behavioralAnchors: BehavioralAnchor[];
  gapQuestions: string[];
  feedbackQuestions: FeedbackQuestion[];
}

export interface InterviewQuestion {
  id: string;
  capabilityId: string;
  question: string;
  level: string;
  questionType: string;
  followUps: string[];
  lookFor: string[];
  redFlags: string[];
}

export interface OrgMaturityLevel {
  level: number;
  name: string;
  slug: string;
  description: string;
  indicators: string[];
  recommendedActions: string[];
  capabilityFocus: string[];
}

export interface CareerLevel {
  level: number;
  title: string;
  slug: string;
  scope: string;
  keyDifferences: string[];
  capabilityExpectations: Record<string, string>;
  promotionBlockers: string[];
  transitionSignals: string[];
}

export interface MeasurementGuidance {
  capabilityId: string;
  leadingIndicators: string[];
  laggingIndicators: string[];
  measurementAntiPatterns: string[];
  suggestedCadence: string;
  dataSourceExamples: string[];
}

// ── Data accessors ─────────────────────────────────────

export const capabilities = capabilitiesData as Capability[];
export const observables = observablesData as Observable[];
export const antiPatterns = antiPatternsData as AntiPattern[];
export const playbooks = playbooksData as Playbook[];
export const calibrationSignals = calibrationSignalsData as CalibrationSignal[];
export const rubricAnchors = rubricAnchorsData as RubricAnchor[];
export const evidenceTypes = evidenceTypesData as EvidenceType[];
export const crosswalk = crosswalkData as CrosswalkEntry[];
export const coverage = coverageData as CoverageEntry[];
export const searchIndex = searchIndexData as SearchEntry[];
export const learningPathways = learningPathwaysData as LearningPathway[];
export const selfAssessments = selfAssessmentData as SelfAssessment[];
export const interviewQuestions = interviewQuestionsData as InterviewQuestion[];
export const orgMaturity = (orgMaturityData as { levels: OrgMaturityLevel[] }).levels;
export const careerLevels = (careerProgressionData as { levels: CareerLevel[] }).levels;
export const measurementGuidance = measurementGuidanceData as MeasurementGuidance[];

// ── Lookup helpers ─────────────────────────────────────

const capById = new Map(capabilities.map(c => [c.id, c]));
const capBySlug = new Map(capabilities.map(c => [c.slug, c]));
const apBySlug = new Map(antiPatterns.map(a => [a.slug, a]));
const pbBySlug = new Map(playbooks.map(p => [p.slug, p]));
const covById = new Map(coverage.map(c => [c.capabilityId, c]));

export function getCapability(idOrSlug: string): Capability | undefined {
  return capById.get(idOrSlug) ?? capBySlug.get(idOrSlug);
}

export function getAntiPattern(slug: string): AntiPattern | undefined {
  return apBySlug.get(slug);
}

export function getPlaybook(slug: string): Playbook | undefined {
  return pbBySlug.get(slug);
}

export function getCoverage(capId: string): CoverageEntry | undefined {
  return covById.get(capId);
}

export function getObservablesForCapability(capId: string): Observable[] {
  return observables.filter(o => o.capabilityId === capId);
}

export function getAntiPatternsForCapability(capId: string): AntiPattern[] {
  return antiPatterns.filter(a => a.capabilityId === capId);
}

export function getPlaybooksForCapability(capId: string): Playbook[] {
  return playbooks.filter(p => p.capabilityIds.includes(capId));
}

export function getRubricAnchorsForCapability(capId: string): RubricAnchor[] {
  return rubricAnchors.filter(r => r.capabilityId === capId);
}

export function getSignalsForObservable(obsId: string): CalibrationSignal[] {
  return calibrationSignals.filter(s => s.observableId === obsId);
}

export function getCapabilitiesByDomain(domain: string): Capability[] {
  return capabilities.filter(c => c.domain === domain);
}

export function getAllDomains(): string[] {
  return [...new Set(capabilities.map(c => c.domain))];
}

const lpByCapId = new Map(learningPathways.map(lp => [lp.capabilityId, lp]));
const saByCapId = new Map(selfAssessments.map(sa => [sa.capabilityId, sa]));
const mgByCapId = new Map(measurementGuidance.map(mg => [mg.capabilityId, mg]));
const clBySlug = new Map(careerLevels.map(cl => [cl.slug, cl]));

export function getLearningPathway(capId: string): LearningPathway | undefined {
  return lpByCapId.get(capId);
}

export function getSelfAssessment(capId: string): SelfAssessment | undefined {
  return saByCapId.get(capId);
}

export function getInterviewQuestionsForCapability(capId: string): InterviewQuestion[] {
  return interviewQuestions.filter(q => q.capabilityId === capId);
}

export function getInterviewQuestionsByLevel(level: string): InterviewQuestion[] {
  return interviewQuestions.filter(q => q.level === level);
}

export function getMeasurementGuidance(capId: string): MeasurementGuidance | undefined {
  return mgByCapId.get(capId);
}

export function getCareerLevel(slug: string): CareerLevel | undefined {
  return clBySlug.get(slug);
}

/** Get capabilities related via crosswalk secondary mappings */
export function getRelatedCapabilities(capId: string): Capability[] {
  const secondaryIds = new Set<string>();
  for (const entry of crosswalk) {
    if (entry.primaryCapability === capId && entry.secondaryCapability) {
      secondaryIds.add(entry.secondaryCapability);
    }
    if (entry.secondaryCapability === capId && entry.primaryCapability) {
      secondaryIds.add(entry.primaryCapability);
    }
  }
  secondaryIds.delete(capId);
  return [...secondaryIds].map(id => capById.get(id)).filter((c): c is Capability => !!c);
}

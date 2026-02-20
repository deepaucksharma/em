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
import metricsData from '../data/metrics.json';
import metricPairsData from '../data/metric-pairs.json';
import diagnosticChainsData from '../data/diagnostic-chains.json';
import dashboardBlueprintsData from '../data/dashboard-blueprints.json';
import metricsRoadmapData from '../data/metrics-roadmap.json';
import calibrationLanguageData from '../data/calibration-language.json';
import archetypesData from '../data/archetypes.json';
import priorityStacksData from '../data/priority-stacks.json';
import techDebtEconomicsData from '../data/tech-debt-economics.json';

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
  warningSigns: string[];
  impact: string;
  recoveryActions: string[];
  sourceTopic: string;
  mappingNotes: string;
}

export interface Playbook {
  id: string;
  slug: string;
  observableIds: string[];
  capabilityIds: string[];
  suggestedMetricIds: string[];
  title: string;
  context: string;
  topicsActivated: string[];
  decisionFramework: string;
  commonMistakes: string;
  whatGoodLooksLike: string;
  mappingNotes: string;
}

export interface RubricAnchor {
  anchorId: string;
  capabilityId: string;
  sourceTopic: string;
  level1Developing: string;
  level2Emerging: string;
  level3Competent: string;
  level4Distinguished: string;
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
  url: string | null;
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

export interface Metric {
  id: string;
  name: string;
  slug: string;
  category: string;
  tier: string;
  type: string;
  description: string;
  decisionRule: string;
  emRank: { priority: string; rank: number };
  directorRank: { priority: string; rank: number };
  mandatoryPairIds: string[];
  cadence: string;
  dashboardPlacement: string[];
  maturityPhase: number;
  implementationEffort: string;
  implementationNotes: string;
  replaces: string;
  whyThisTier: string;
  goodRange: string;
  warningRange: string;
  dangerRange: string;
  capabilityIds: string[];
  observableIds: string[];
  emTier: string | null;
  directorTier: string | null;
  aiEraImpact: string;
}

export interface MetricPairSide {
  id: string;
  alsoIds?: string[];
  role: string;
}

export interface MetricPair {
  id: string;
  name: string;
  slug: string;
  metricA: MetricPairSide;
  metricB: MetricPairSide;
  whyPaired: string;
  withoutA: string;
  withoutB: string;
}

export interface DiagnosticStep {
  order: number;
  checkMetricId: string;
  alsoCheckMetricIds?: string[];
  label: string;
  reason: string;
}

export interface DiagnosticChain {
  id: string;
  triggerMetricId: string;
  triggerCondition: string;
  slug: string;
  directorQuestion: string;
  steps: DiagnosticStep[];
}

export interface DashboardWidget {
  metricId: string;
  displayType: string;
  label: string;
}

export interface DashboardSection {
  name: string;
  position: string;
  widgets: DashboardWidget[];
}

export interface DashboardBlueprint {
  id: string;
  name: string;
  slug: string;
  description: string;
  cadence: string;
  sections: DashboardSection[];
}

export interface RoadmapTask {
  task: string;
  effort: string;
  successCriteria: string;
}

export interface RoadmapPhase {
  phase: number;
  name: string;
  slug: string;
  duration: string;
  goal: string;
  tasks: RoadmapTask[];
  metricsActivated: string[];
}

export interface MetricsLaw {
  id: string;
  name: string;
  statement: string;
  description: string;
  example: string;
}

export interface CalibrationLanguageEntry {
  id: string;
  metricId: string;
  role: string;
  context: string;
  template: string;
  variables: string[];
  whenToUse: string;
  antiPattern: string;
}

export interface Archetype {
  id: string;
  name: string;
  slug: string;
  signaturePattern: string;
  metricsProfile: string;
  firstPriority: string;
  antiPatternIfIgnored: string;
  diagnosticMetricIds: string[];
  recommendedMetricIds: string[];
  quantifiedThresholds?: Record<string, string>;
}

export interface PriorityStackEntry {
  rank: number;
  metricId: string;
  dashboard: string;
  cadence: string;
  rationale: string;
}

export interface TechDebtDataPoint {
  dataPoint: string;
  source: string;
  implication: string;
}

export interface CD3Example {
  initiative: string;
  duration: number;
  weeklyValue: number;
  cd3: number;
  priority: number;
}

export interface StarterSequenceStep {
  question: string;
  noAction: string;
  yesNext: boolean;
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
export const metrics = metricsData as Metric[];
export const metricPairs = metricPairsData as MetricPair[];
export const diagnosticChains = diagnosticChainsData as DiagnosticChain[];
export const dashboardBlueprints = (dashboardBlueprintsData as { dashboards: DashboardBlueprint[] }).dashboards;
export const metricsRoadmap = (metricsRoadmapData as { phases: RoadmapPhase[]; laws: MetricsLaw[] }).phases;
export const metricsLaws = (metricsRoadmapData as { phases: RoadmapPhase[]; laws: MetricsLaw[] }).laws;
export const calibrationLanguage = calibrationLanguageData as CalibrationLanguageEntry[];
export const archetypes = archetypesData as Archetype[];
export const priorityStacks = priorityStacksData as { em: PriorityStackEntry[]; director: PriorityStackEntry[] };
export const techDebtEconomics = techDebtEconomicsData as {
  coreNumbers: TechDebtDataPoint[];
  investmentMandate: { target: string; description: string; strategies: string[] };
  cd3: { formula: string; description: string; example: CD3Example[]; whenToUse: string; impact: string };
  decisionTest: string[];
  starterSequences: { em: StarterSequenceStep[]; director: StarterSequenceStep[] };
};

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

// ── Archetype lookup helpers ──────────────────────────

const archById = new Map(archetypes.map(a => [a.id, a]));
const archBySlug = new Map(archetypes.map(a => [a.slug, a]));

export function getArchetype(idOrSlug: string): Archetype | undefined {
  return archById.get(idOrSlug) ?? archBySlug.get(idOrSlug);
}

export function getArchetypeBySlug(slug: string): Archetype | undefined {
  return archBySlug.get(slug);
}

// ── Metrics lookup helpers ────────────────────────────

const metById = new Map(metrics.map(m => [m.id, m]));
const metBySlug = new Map(metrics.map(m => [m.slug, m]));
const mpById = new Map(metricPairs.map(mp => [mp.id, mp]));
const dcById = new Map(diagnosticChains.map(dc => [dc.id, dc]));

export function getMetric(idOrSlug: string): Metric | undefined {
  return metById.get(idOrSlug) ?? metBySlug.get(idOrSlug);
}

export function getMetricsForCapability(capId: string): Metric[] {
  return metrics.filter(m => m.capabilityIds.includes(capId));
}

export function getMetricsForTier(tier: string): Metric[] {
  return metrics.filter(m => m.tier === tier);
}

export function getMetricsForPhase(phase: number): Metric[] {
  const phaseData = metricsRoadmap.find(p => p.phase === phase);
  if (!phaseData) return [];
  return phaseData.metricsActivated.map(id => metById.get(id)).filter((m): m is Metric => !!m);
}

export function getMetricPairForMetric(metricId: string): MetricPair | undefined {
  return metricPairs.find(mp => mp.metricA.id === metricId || mp.metricB.id === metricId);
}

export function getDiagnosticChainsForMetric(metricId: string): DiagnosticChain[] {
  return diagnosticChains.filter(dc =>
    dc.triggerMetricId === metricId ||
    dc.steps.some(s => s.checkMetricId === metricId)
  );
}

export function getCalibrationLanguageForMetric(metricId: string): CalibrationLanguageEntry[] {
  return calibrationLanguage.filter(cl => cl.metricId === metricId);
}

export function getAllMetricCategories(): string[] {
  return [...new Set(metrics.map(m => m.category))];
}

export function getMetricPair(id: string): MetricPair | undefined {
  return mpById.get(id);
}

export function getDiagnosticChain(idOrSlug: string): DiagnosticChain | undefined {
  return dcById.get(idOrSlug) ?? diagnosticChains.find(dc => dc.slug === idOrSlug);
}

export function getRecommendedMetricsForArchetype(archetypeId: string): Metric[] {
  const arch = archById.get(archetypeId);
  if (!arch || !arch.recommendedMetricIds) return [];
  return arch.recommendedMetricIds.map(id => metById.get(id)).filter((m): m is Metric => !!m);
}

export function getRelatedMetrics(metricId: string): { metric: Metric; relationship: string }[] {
  const related = new Map<string, string>();

  // From mandatory pairs
  const metric = metById.get(metricId);
  if (metric) {
    for (const pairId of metric.mandatoryPairIds) {
      related.set(pairId, 'Mandatory Pair');
    }
  }

  // From diagnostic chains
  for (const dc of diagnosticChains) {
    const involvedIds = [dc.triggerMetricId, ...dc.steps.map(s => s.checkMetricId), ...dc.steps.flatMap(s => s.alsoCheckMetricIds || [])];
    if (involvedIds.includes(metricId)) {
      for (const id of involvedIds) {
        if (id && id !== metricId && !related.has(id)) {
          related.set(id, 'Diagnostic Context');
        }
      }
    }
  }

  // From same archetype diagnostic sets
  for (const arch of archetypes) {
    if (arch.diagnosticMetricIds.includes(metricId)) {
      for (const id of arch.diagnosticMetricIds) {
        if (id !== metricId && !related.has(id)) {
          related.set(id, 'Same Archetype');
        }
      }
    }
  }

  // From same roadmap phase
  if (metric) {
    const samePhaseMetrics = getMetricsForPhase(metric.maturityPhase);
    for (const m of samePhaseMetrics) {
      if (m.id !== metricId && !related.has(m.id)) {
        related.set(m.id, 'Same Phase');
      }
    }
  }

  return [...related.entries()]
    .map(([id, rel]) => ({ metric: metById.get(id)!, relationship: rel }))
    .filter(r => r.metric != null)
    .slice(0, 12);
}

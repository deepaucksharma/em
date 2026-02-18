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

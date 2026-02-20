/** Centralized color mappings for metrics components */

/** Badge-style colors for metric categories (bg + text, light + dark) */
export const METRIC_CATEGORY_COLORS: Record<string, string> = {
  DORA: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Flow: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  Reliability: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  Quality: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  DevEx: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  Activity: 'bg-gray-100 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400',
  People: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Strategy: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  Security: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Cost: 'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-300',
  'AI-Era': 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Stakeholder: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
};

/** Text-only colors for category headings in sidebar */
export const METRIC_CATEGORY_TEXT_COLORS: Record<string, string> = {
  DORA: 'text-blue-600 dark:text-blue-400',
  Flow: 'text-indigo-600 dark:text-indigo-400',
  Reliability: 'text-red-600 dark:text-red-400',
  Quality: 'text-emerald-600 dark:text-emerald-400',
  DevEx: 'text-cyan-600 dark:text-cyan-400',
  Activity: 'text-gray-500 dark:text-gray-400',
  People: 'text-amber-600 dark:text-amber-400',
  Strategy: 'text-purple-600 dark:text-purple-400',
  Security: 'text-orange-600 dark:text-orange-400',
  Cost: 'text-slate-600 dark:text-slate-400',
  'AI-Era': 'text-violet-600 dark:text-violet-400',
  Stakeholder: 'text-teal-600 dark:text-teal-400',
};

/** Small dot colors for tier indicators in sidebar */
export const TIER_DOT_COLORS: Record<string, string> = {
  primary: 'bg-amber-400',
  secondary: 'bg-slate-400',
  tertiary: 'bg-orange-400',
  activity: 'bg-blue-400',
  inferior: 'bg-red-400',
};

/** Archetype severity colors (A1=healthy → A7=critical) */
export const ARCHETYPE_SEVERITY_COLORS: Record<string, { bar: string; bg: string }> = {
  A1: { bar: 'bg-emerald-500', bg: 'border-emerald-200 dark:border-emerald-800' },
  A2: { bar: 'bg-green-500', bg: 'border-green-200 dark:border-green-800' },
  A3: { bar: 'bg-blue-500', bg: 'border-blue-200 dark:border-blue-800' },
  A4: { bar: 'bg-amber-500', bg: 'border-amber-200 dark:border-amber-800' },
  A5: { bar: 'bg-orange-500', bg: 'border-orange-200 dark:border-orange-800' },
  A6: { bar: 'bg-red-500', bg: 'border-red-200 dark:border-red-800' },
  A7: { bar: 'bg-red-700', bg: 'border-red-300 dark:border-red-900' },
  A8: { bar: 'bg-orange-500', bg: 'border-orange-200 dark:border-orange-800' },
  A9: { bar: 'bg-amber-500', bg: 'border-amber-200 dark:border-amber-800' },
  A10: { bar: 'bg-purple-500', bg: 'border-purple-200 dark:border-purple-800' },
};

/** Roadmap phase colors */
export const PHASE_COLORS: Record<number, { bg: string; border: string; text: string; dot: string }> = {
  1: { bg: 'bg-blue-50 dark:bg-blue-950/20', border: 'border-blue-200 dark:border-blue-800', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
  2: { bg: 'bg-green-50 dark:bg-green-950/20', border: 'border-green-200 dark:border-green-800', text: 'text-green-700 dark:text-green-300', dot: 'bg-green-500' },
  3: { bg: 'bg-purple-50 dark:bg-purple-950/20', border: 'border-purple-200 dark:border-purple-800', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' },
  4: { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
};

/** Implementation effort badge colors */
export const EFFORT_COLORS: Record<string, string> = {
  low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export function getCategoryColor(category: string): string {
  return METRIC_CATEGORY_COLORS[category] ?? METRIC_CATEGORY_COLORS.Quality;
}

export function getCategoryTextColor(category: string): string {
  return METRIC_CATEGORY_TEXT_COLORS[category] ?? 'text-gray-500';
}

export function getTierDotColor(tier: string): string {
  return TIER_DOT_COLORS[tier] ?? TIER_DOT_COLORS.tertiary;
}

export function getSeverityColors(archetypeId: string) {
  return ARCHETYPE_SEVERITY_COLORS[archetypeId] ?? ARCHETYPE_SEVERITY_COLORS.A4;
}

export function getPhaseColors(phase: number) {
  return PHASE_COLORS[phase] ?? PHASE_COLORS[1];
}

export function getEffortColor(effort: string): string {
  return EFFORT_COLORS[effort] ?? EFFORT_COLORS.medium;
}

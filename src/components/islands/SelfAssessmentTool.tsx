import { useState, useEffect, useMemo } from 'react';
import capabilitiesData from '../../data/capabilities.json';
import selfAssessmentData from '../../data/self-assessment.json';

interface Capability {
  id: string;
  name: string;
  slug: string;
  domain: string;
}

interface BehavioralAnchor {
  level: number;
  description: string;
}

interface SelfAssessmentEntry {
  capabilityId: string;
  behavioralAnchors: BehavioralAnchor[];
  gapQuestions: string[];
}

const DOMAIN_COLORS: Record<string, string> = {
  Strategy: '#3b82f6',
  Execution: '#22c55e',
  Stakeholder: '#a855f7',
  People: '#f59e0b',
  Reliability: '#ef4444',
  Data: '#06b6d4',
};

const LEVEL_LABELS: Record<number, string> = {
  1: 'Developing',
  2: 'Emerging',
  3: 'Competent',
  4: 'Distinguished',
  5: 'Advanced',
};

const STORAGE_KEY = 'em-matrix-self-assessment';

export default function SelfAssessmentTool() {
  const capabilities = capabilitiesData as Capability[];
  const assessments = selfAssessmentData as SelfAssessmentEntry[];

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [expandedCap, setExpandedCap] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setRatings(JSON.parse(saved));
    } catch {}
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ratings));
    } catch {}
  }, [ratings]);

  const assessmentMap = useMemo(() => {
    const map = new Map<string, SelfAssessmentEntry>();
    for (const a of assessments) map.set(a.capabilityId, a);
    return map;
  }, [assessments]);

  const completedCount = Object.keys(ratings).length;
  const totalCount = capabilities.length;
  const averageRating = completedCount > 0
    ? (Object.values(ratings).reduce((a, b) => a + b, 0) / completedCount).toFixed(1)
    : '—';

  const gaps = useMemo(() => {
    return capabilities
      .filter(c => ratings[c.id] && ratings[c.id] <= 2)
      .map(c => ({ cap: c, rating: ratings[c.id] }));
  }, [ratings, capabilities]);

  const strengths = useMemo(() => {
    return capabilities
      .filter(c => ratings[c.id] && ratings[c.id] >= 4)
      .map(c => ({ cap: c, rating: ratings[c.id] }));
  }, [ratings, capabilities]);

  function handleRate(capId: string, level: number) {
    setRatings(prev => ({ ...prev, [capId]: level }));
  }

  function handleReset() {
    if (confirm('Clear all ratings? This cannot be undone.')) {
      setRatings({});
      setShowResults(false);
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function handleExport() {
    const data = capabilities.map(c => ({
      capability: `${c.id}: ${c.name}`,
      domain: c.domain,
      rating: ratings[c.id] || 'Not rated',
      level: ratings[c.id] ? LEVEL_LABELS[ratings[c.id]] : 'Not rated',
    }));
    const csv = [
      'Capability,Domain,Rating,Level',
      ...data.map(d => `"${d.capability}","${d.domain}","${d.rating}","${d.level}"`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'em-self-assessment.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-gray-500">{completedCount} of {totalCount} rated</span>
          <span className="text-gray-500">Average: {averageRating}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Capability ratings */}
      <div className="flex flex-col gap-2 mb-6">
        {capabilities.map(cap => {
          const assessment = assessmentMap.get(cap.id);
          const currentRating = ratings[cap.id];
          const isExpanded = expandedCap === cap.id;
          const domainColor = DOMAIN_COLORS[cap.domain] || '#6b7280';

          return (
            <div key={cap.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: domainColor }}
                  />
                  <span className="text-xs text-gray-400 font-mono">{cap.id}</span>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{cap.name}</span>
                  <button
                    onClick={() => setExpandedCap(isExpanded ? null : cap.id)}
                    className="ml-auto text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 bg-transparent border-none cursor-pointer px-1.5 py-0.5"
                  >
                    {isExpanded ? 'Hide guide' : 'Show guide'}
                  </button>
                </div>

                {/* Rating buttons */}
                <div className="flex flex-wrap gap-1">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      onClick={() => handleRate(cap.id, level)}
                      className={`flex-1 min-w-0 py-1.5 px-1 text-xs rounded-md border cursor-pointer transition-all duration-150 ${
                        currentRating === level
                          ? 'bg-blue-500 text-white border-blue-500 font-semibold'
                          : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                      }`}
                      title={LEVEL_LABELS[level]}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expanded behavioral anchors */}
              {isExpanded && assessment && (
                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="flex flex-col gap-1.5 text-[13px]">
                    {assessment.behavioralAnchors.map(anchor => (
                      <div
                        key={anchor.level}
                        className={`flex gap-2 py-1 ${currentRating === anchor.level ? 'opacity-100 font-semibold' : 'opacity-70'}`}
                      >
                        <span className={`w-5 text-center shrink-0 font-semibold ${currentRating === anchor.level ? 'text-blue-500' : 'text-gray-400'}`}>
                          {anchor.level}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">{anchor.description}</span>
                      </div>
                    ))}
                  </div>

                  {assessment.gapQuestions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <h5 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Reflection Questions</h5>
                      <ul className="text-[13px] text-gray-500 dark:text-gray-400 list-disc pl-4">
                        {assessment.gapQuestions.map((q, i) => (
                          <li key={i} className="mb-1">{q}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setShowResults(!showResults)}
          disabled={completedCount === 0}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
            completedCount > 0
              ? 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {showResults ? 'Hide Results' : 'View Results'}
        </button>
        <button
          onClick={handleExport}
          disabled={completedCount === 0}
          className={`px-4 py-2 text-sm font-medium bg-transparent text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg ${
            completedCount > 0
              ? 'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Export CSV
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium text-red-500 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer ml-auto"
        >
          Reset
        </button>
      </div>

      {/* Results */}
      {showResults && completedCount > 0 && (
        <div className="flex flex-col gap-4">
          {/* Strengths */}
          {strengths.length > 0 && (
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/10 border border-green-200 dark:border-green-800/20">
              <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Strengths (4-5)</h3>
              <div className="flex flex-wrap gap-1.5">
                {strengths.map(({ cap, rating }) => (
                  <span key={cap.id} className="px-2.5 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                    {cap.id}: {cap.name} ({rating})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gaps */}
          {gaps.length > 0 && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-800/20">
              <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Growth Areas (1-2)</h3>
              <div className="flex flex-wrap gap-1.5">
                {gaps.map(({ cap, rating }) => (
                  <span key={cap.id} className="px-2.5 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                    {cap.id}: {cap.name} ({rating})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

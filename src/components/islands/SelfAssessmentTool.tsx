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
  1: 'Beginning',
  2: 'Developing',
  3: 'Competent',
  4: 'Advanced',
  5: 'Expert',
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
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Progress bar */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
          <span style={{ color: '#6b7280' }}>{completedCount} of {totalCount} rated</span>
          <span style={{ color: '#6b7280' }}>Average: {averageRating}</span>
        </div>
        <div style={{ height: '8px', backgroundColor: 'var(--sa-bar-bg, #e5e7eb)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(completedCount / totalCount) * 100}%`,
            backgroundColor: '#3b82f6',
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Capability ratings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        {capabilities.map(cap => {
          const assessment = assessmentMap.get(cap.id);
          const currentRating = ratings[cap.id];
          const isExpanded = expandedCap === cap.id;
          const domainColor = DOMAIN_COLORS[cap.domain] || '#6b7280';

          return (
            <div key={cap.id} style={{
              border: '1px solid var(--sa-border, #e5e7eb)',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: 'var(--sa-card-bg, #fff)',
            }} className="sa-card">
              <div style={{ padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: domainColor,
                  }} />
                  <span style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace' }}>{cap.id}</span>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--sa-text, #111827)' }}>{cap.name}</span>
                  <button
                    onClick={() => setExpandedCap(isExpanded ? null : cap.id)}
                    style={{
                      marginLeft: 'auto',
                      fontSize: '12px',
                      color: '#6b7280',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '2px 6px',
                    }}
                  >
                    {isExpanded ? 'Hide guide' : 'Show guide'}
                  </button>
                </div>

                {/* Rating buttons */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(level => (
                    <button
                      key={level}
                      onClick={() => handleRate(cap.id, level)}
                      style={{
                        flex: 1,
                        padding: '6px 4px',
                        fontSize: '12px',
                        fontWeight: currentRating === level ? 600 : 400,
                        border: `1px solid ${currentRating === level ? '#3b82f6' : 'var(--sa-border, #e5e7eb)'}`,
                        borderRadius: '6px',
                        backgroundColor: currentRating === level ? '#3b82f6' : 'transparent',
                        color: currentRating === level ? '#fff' : 'var(--sa-text-dim, #6b7280)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      title={LEVEL_LABELS[level]}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expanded behavioral anchors */}
              {isExpanded && assessment && (
                <div style={{
                  padding: '12px 16px',
                  borderTop: '1px solid var(--sa-border, #e5e7eb)',
                  backgroundColor: 'var(--sa-expand-bg, #f9fafb)',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                    {assessment.behavioralAnchors.map(anchor => (
                      <div key={anchor.level} style={{
                        display: 'flex',
                        gap: '8px',
                        padding: '4px 0',
                        opacity: currentRating === anchor.level ? 1 : 0.7,
                        fontWeight: currentRating === anchor.level ? 600 : 400,
                      }}>
                        <span style={{
                          width: '20px',
                          textAlign: 'center',
                          color: currentRating === anchor.level ? '#3b82f6' : '#9ca3af',
                          fontWeight: 600,
                          shrink: 0,
                        }}>{anchor.level}</span>
                        <span style={{ color: 'var(--sa-text-dim, #6b7280)' }}>{anchor.description}</span>
                      </div>
                    ))}
                  </div>

                  {assessment.gapQuestions.length > 0 && (
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--sa-border, #e5e7eb)' }}>
                      <h5 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--sa-text-dim, #6b7280)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reflection Questions</h5>
                      <ul style={{ fontSize: '13px', color: 'var(--sa-text-dim, #6b7280)', listStyle: 'disc', paddingLeft: '16px' }}>
                        {assessment.gapQuestions.map((q, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>{q}</li>
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
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setShowResults(!showResults)}
          disabled={completedCount === 0}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: completedCount > 0 ? '#3b82f6' : '#9ca3af',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: completedCount > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          {showResults ? 'Hide Results' : 'View Results'}
        </button>
        <button
          onClick={handleExport}
          disabled={completedCount === 0}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: 'transparent',
            color: 'var(--sa-text, #374151)',
            border: '1px solid var(--sa-border, #d1d5db)',
            borderRadius: '8px',
            cursor: completedCount > 0 ? 'pointer' : 'not-allowed',
            opacity: completedCount > 0 ? 1 : 0.5,
          }}
        >
          Export CSV
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: 500,
            backgroundColor: 'transparent',
            color: '#ef4444',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          Reset
        </button>
      </div>

      {/* Results */}
      {showResults && completedCount > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Strengths */}
          {strengths.length > 0 && (
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'var(--sa-green-bg, #f0fdf4)',
              border: '1px solid var(--sa-green-border, #bbf7d0)',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#16a34a', marginBottom: '8px' }}>Strengths (4-5)</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {strengths.map(({ cap, rating }) => (
                  <span key={cap.id} style={{
                    padding: '4px 10px',
                    fontSize: '13px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(22, 163, 74, 0.1)',
                    color: '#16a34a',
                  }}>
                    {cap.id}: {cap.name} ({rating})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gaps */}
          {gaps.length > 0 && (
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: 'var(--sa-red-bg, #fef2f2)',
              border: '1px solid var(--sa-red-border, #fecaca)',
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#dc2626', marginBottom: '8px' }}>Growth Areas (1-2)</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {gaps.map(({ cap, rating }) => (
                  <span key={cap.id} style={{
                    padding: '4px 10px',
                    fontSize: '13px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    color: '#dc2626',
                  }}>
                    {cap.id}: {cap.name} ({rating})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        .dark .sa-card {
          --sa-card-bg: #1f2937;
          --sa-border: #374151;
          --sa-text: #f9fafb;
          --sa-text-dim: #9ca3af;
          --sa-expand-bg: #111827;
          --sa-bar-bg: #374151;
          --sa-green-bg: rgba(22, 163, 74, 0.1);
          --sa-green-border: rgba(22, 163, 74, 0.2);
          --sa-red-bg: rgba(220, 38, 38, 0.1);
          --sa-red-border: rgba(220, 38, 38, 0.2);
        }
      `}</style>
    </div>
  );
}

import { useState, useEffect, useRef, useMemo } from 'react';
import Fuse from 'fuse.js';
import searchData from '../../data/search-index.json';

interface SearchEntry {
  title: string;
  description: string;
  type: string;
  url: string;
  domain: string;
  capabilityName: string;
  id: string;
}

const TYPE_LABELS: Record<string, string> = {
  capability: 'Capability',
  observable: 'Observable',
  'anti-pattern': 'Anti-Pattern',
  playbook: 'Playbook',
};

const TYPE_COLORS: Record<string, string> = {
  capability: '#3b82f6',
  observable: '#22c55e',
  'anti-pattern': '#ef4444',
  playbook: '#a855f7',
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(searchData as SearchEntry[], {
        keys: [
          { name: 'title', weight: 1.0 },
          { name: 'description', weight: 0.5 },
          { name: 'domain', weight: 0.3 },
          { name: 'capabilityName', weight: 0.3 },
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
      }),
    []
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).slice(0, 20);
  }, [query, fuse]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Listen for the trigger button
  useEffect(() => {
    const btn = document.getElementById('search-trigger');
    if (btn) {
      btn.addEventListener('click', () => setOpen(true));
    }
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].item.url;
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  if (!open) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100 }}
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />

      {/* Dialog */}
      <div
        style={{
          position: 'relative',
          maxWidth: '640px',
          margin: '80px auto',
          backgroundColor: 'var(--search-bg, #fff)',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          overflow: 'hidden',
        }}
        className="search-dialog"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--search-border, #e5e7eb)' }}>
          <svg style={{ width: 20, height: 20, color: '#9ca3af', marginRight: 8, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search capabilities, observables, anti-patterns, playbooks..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '16px',
              backgroundColor: 'transparent',
              color: 'inherit',
            }}
          />
          <kbd style={{ padding: '2px 6px', fontSize: '12px', backgroundColor: 'var(--search-kbd, #f3f4f6)', borderRadius: '4px', color: '#6b7280' }}>ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px' }}>
          {query && results.length === 0 && (
            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#9ca3af' }}>
              No results for "{query}"
            </div>
          )}
          {results.map((result, i) => (
            <a
              key={result.item.id + result.item.type}
              href={result.item.url}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'inherit',
                backgroundColor: i === selectedIndex ? 'var(--search-hover, #f3f4f6)' : 'transparent',
              }}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 500,
                backgroundColor: TYPE_COLORS[result.item.type] + '20',
                color: TYPE_COLORS[result.item.type],
                whiteSpace: 'nowrap',
                marginTop: '2px',
              }}>
                {TYPE_LABELS[result.item.type] || result.item.type}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, fontSize: '14px' }}>{result.item.title}</div>
                {result.item.description && (
                  <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {result.item.description}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .dark .search-dialog {
          --search-bg: #1f2937;
          --search-border: #374151;
          --search-kbd: #374151;
          --search-hover: #374151;
        }
      `}</style>
    </div>
  );
}

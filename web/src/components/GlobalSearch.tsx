import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { searchIndex, chapters } from '@/data/curriculum';
import { labs } from '@/data/navigation';

const fullIndex = [
  ...searchIndex,
  ...labs.map((l) => ({ title: l.title, path: `/playground/${l.id}`, type: 'lab' as const, snippet: l.chapter })),
  { title: 'Circuit Builder', path: '/playground/circuit-builder', type: 'lab' as const },
  { title: 'Practice Problems', path: '/practice', type: 'chapter' as const },
  { title: 'Gate Reference', path: '/reference/gates', type: 'chapter' as const },
];

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fullIndex.slice(0, 8);
    return fullIndex.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      ('snippet' in item && item.snippet?.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query]);

  const openSearch = useCallback(() => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openSearch]);

  return (
    <>
      <button className="btn search-trigger" onClick={openSearch} aria-label="Search">
        🔍 Search…
      </button>
      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)} role="presentation">
          <div className="search-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
            <input
              ref={inputRef}
              type="search"
              placeholder="Search chapters, sections, labs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <ul className="search-results">
              {results.map((r) => (
                <li key={r.path}>
                  <Link to={r.path} onClick={() => setOpen(false)}>
                    <span className="tag" style={{ marginRight: '0.5rem', fontSize: '0.65rem' }}>{r.type}</span>
                    {r.title}
                  </Link>
                </li>
              ))}
              {results.length === 0 && <li style={{ color: 'var(--text-muted)', padding: '0.75rem' }}>No results</li>}
            </ul>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.75rem 0 0' }}>
              {chapters.length} chapters · {labs.length + 1} labs · Press Esc to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}

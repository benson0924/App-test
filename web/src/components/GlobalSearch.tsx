import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useT } from '@/context/LocaleContext';
import { useLocalizedCurriculum } from '@/data/localizedCurriculum';
import { useLocalizedLabs } from '@/data/localizedNavigation';

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useT();
  const { searchIndex, localizedChapters } = useLocalizedCurriculum();
  const labs = useLocalizedLabs();

  const fullIndex = useMemo(() => [
    ...searchIndex,
    ...labs.map((l) => ({ title: l.title, path: `/playground/${l.id}`, type: 'lab' as const, snippet: l.chapter })),
    { title: t('home.buttons.circuitBuilder'), path: '/playground/circuit-builder', type: 'lab' as const },
    { title: t('practice.ui.title'), path: '/practice', type: 'chapter' as const },
    { title: t('reference.index.gates.title'), path: '/reference/gates', type: 'chapter' as const },
  ], [searchIndex, labs, t]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return fullIndex.slice(0, 8);
    return fullIndex.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      ('snippet' in item && item.snippet?.toLowerCase().includes(q))
    ).slice(0, 12);
  }, [query, fullIndex]);

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
      <button className="btn search-trigger" onClick={openSearch} aria-label={t('common.search.label')}>
        🔍 {t('common.search.label')}…
      </button>
      {open && (
        <div className="search-overlay" onClick={() => setOpen(false)} role="presentation">
          <div className="search-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t('common.search.label')}>
            <input
              ref={inputRef}
              type="search"
              placeholder={t('common.search.placeholder')}
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
              {results.length === 0 && <li style={{ color: 'var(--text-muted)', padding: '0.75rem' }}>{t('common.search.noResults')}</li>}
            </ul>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.75rem 0 0' }}>
              {localizedChapters.length} chapters · {labs.length + 1} labs · Esc
            </p>
          </div>
        </div>
      )}
    </>
  );
}

import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { getSectionMeta, linkHref, type ConceptLink } from '@/data/curriculum';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  chapterPath?: string;
  prev?: ConceptLink;
  next?: ConceptLink;
  /** Hide auto curriculum links if manually provided prev/next only */
  showConceptLinks?: boolean;
}

function ConceptLinks({ label, links }: { label: string; links: ConceptLink[] }) {
  if (links.length === 0) return null;
  return (
    <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem' }}>
      <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</strong>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {links.map((link) => (
          <Link key={linkHref(link)} to={linkHref(link)} className="tag" style={{ textDecoration: 'none' }}>
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Section({
  id,
  title,
  children,
  chapterPath,
  prev,
  next,
  showConceptLinks = true,
}: SectionProps) {
  const { pathname } = useLocation();
  const resolvedChapterPath = chapterPath ?? (pathname.startsWith('/learn/') && pathname !== '/learn' ? pathname : undefined);
  const meta = resolvedChapterPath ? getSectionMeta(resolvedChapterPath, id) : undefined;
  const prerequisites = meta?.prerequisites ?? [];
  const nextConcepts = meta?.nextConcepts ?? [];
  const labs = meta?.labs ?? [];

  return (
    <section id={id} className="chapter-section">
      <h2>{title}</h2>
      {children}

      {showConceptLinks && prerequisites.length > 0 && (
        <ConceptLinks label="Prerequisites" links={prerequisites} />
      )}
      {showConceptLinks && nextConcepts.length > 0 && (
        <ConceptLinks label="Next related concepts" links={nextConcepts} />
      )}
      {labs.length > 0 && (
        <ConceptLinks label="Interactive labs" links={labs.map((l) => ({ title: l.title, path: `/playground/${l.id}` }))} />
      )}

      {(prev || next) && (
        <div className="section-nav">
          {prev ? <Link to={linkHref(prev)}>← {prev.title}</Link> : <span />}
          {next ? <Link to={linkHref(next)}>{next.title} →</Link> : <span />}
        </div>
      )}
    </section>
  );
}

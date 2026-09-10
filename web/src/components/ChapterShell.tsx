import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { linkHref } from '@/data/curriculum';
import { useT } from '@/context/LocaleContext';
import { useLocalizedCurriculum } from '@/data/localizedCurriculum';

interface ChapterShellProps {
  children: ReactNode;
  /** Optional override; defaults to curriculum sections for current path */
  outline?: { id: string; title: string }[];
}

export default function ChapterShell({ children, outline: outlineProp }: ChapterShellProps) {
  const { pathname, hash } = useLocation();
  const t = useT();
  const { getLocalizedChapterByPath } = useLocalizedCurriculum();
  const chapter = getLocalizedChapterByPath(pathname);
  const outline = outlineProp ?? chapter?.sections.map((s) => ({ id: s.id, title: s.title })) ?? [];
  const [activeId, setActiveId] = useState(hash.replace('#', '') || outline[0]?.id || '');

  useEffect(() => {
    if (hash) setActiveId(hash.replace('#', ''));
  }, [hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveId(e.target.id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    outline.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [outline, pathname]);

  const progress = outline.length
    ? Math.round(((outline.findIndex((o) => o.id === activeId) + 1) / outline.length) * 100)
    : 0;

  return (
    <div className="chapter-layout">
      <aside className="chapter-toc" aria-label={t('common.chapterShell.tableOfContents')}>
        {chapter && (
          <div className="chapter-toc-header">
            <span className="tag">Ch. {chapter.chapterNumber}</span>
            <strong style={{ display: 'block', marginTop: '0.35rem' }}>{chapter.title}</strong>
            <div className="progress-bar" aria-label={t('common.chapterShell.readingProgress', { progress })}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <small style={{ color: 'var(--text-muted)' }}>{t('common.chapterShell.readingProgress', { progress })}</small>
          </div>
        )}
        <nav>
          {outline.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? 'toc-link active' : 'toc-link'}
              onClick={() => setActiveId(item.id)}
            >
              {item.title}
            </a>
          ))}
        </nav>
        {chapter?.prevChapter && (
          <Link to={linkHref(chapter.prevChapter)} className="btn" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            ← {chapter.prevChapter.title}
          </Link>
        )}
        {chapter?.nextChapter && (
          <Link to={linkHref(chapter.nextChapter)} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }}>
            {chapter.nextChapter.title} →
          </Link>
        )}
      </aside>
      <div className="chapter-body">{children}</div>
    </div>
  );
}

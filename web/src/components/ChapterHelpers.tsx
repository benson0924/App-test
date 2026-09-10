import { Link } from 'react-router-dom';

export interface OutlineItem {
  id: string;
  title: string;
}

interface ChapterOutlineProps {
  items: OutlineItem[];
}

/** In-chapter table of contents with anchor links. */
export default function ChapterOutline({ items }: ChapterOutlineProps) {
  return (
    <nav className="card" aria-label="Chapter contents" style={{ marginBottom: '2rem' }}>
      <p style={{ margin: '0 0 0.75rem', fontWeight: 600, fontSize: '0.875rem' }}>In this chapter</p>
      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem' }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '0.35rem' }}>
            <a href={`#${item.id}`}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

export function MisconceptionAlert({ myth, correction }: { myth: string; correction: string }) {
  return (
    <div className="card" style={{ borderLeft: '4px solid var(--warning)', background: 'var(--bg-muted)' }}>
      <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--warning)' }}>
        COMMON MISCONCEPTION
      </p>
      <p style={{ margin: '0 0 0.5rem' }}><strong>Myth:</strong> {myth}</p>
      <p style={{ margin: 0, fontSize: '0.9rem' }}><strong>Reality:</strong> {correction}</p>
    </div>
  );
}

export function PracticeBlock({ problems }: { problems: { q: string; a: string }[] }) {
  return (
    <div className="card">
      <p><strong>Practice Problems</strong></p>
      <ol style={{ paddingLeft: '1.25rem' }}>
        {problems.map((p, i) => (
          <li key={i} style={{ marginBottom: '0.75rem' }}>
            {p.q}
            <details style={{ marginTop: '0.35rem' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--accent)', fontSize: '0.875rem' }}>Show solution</summary>
              <p style={{ margin: '0.35rem 0 0', fontSize: '0.875rem' }}>{p.a}</p>
            </details>
          </li>
        ))}
      </ol>
      <p style={{ marginBottom: 0, fontSize: '0.875rem' }}>
        <Link to="/practice">More randomized problems in Practice →</Link>
      </p>
    </div>
  );
}

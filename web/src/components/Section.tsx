import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  prev?: { title: string; path: string };
  next?: { title: string; path: string };
}

export default function Section({ id, title, children, prev, next }: SectionProps) {
  return (
    <section id={id} style={{ marginBottom: '3rem' }}>
      <h2>{title}</h2>
      {children}
      {(prev || next) && (
        <div className="section-nav">
          {prev ? <Link to={prev.path}>← {prev.title}</Link> : <span />}
          {next ? <Link to={next.path}>{next.title} →</Link> : <span />}
        </div>
      )}
    </section>
  );
}

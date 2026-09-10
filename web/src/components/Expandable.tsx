import { useState, type ReactNode } from 'react';

interface ExpandableProps {
  title: string;
  children: ReactNode;
}

export default function Expandable({ title, children }: ExpandableProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <button
        className="btn"
        style={{ width: '100%', border: 'none', borderRadius: 0, justifyContent: 'space-between' }}
        onClick={() => setOpen(!open)}
      >
        {title}
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)' }}>{children}</div>}
    </div>
  );
}

import { useState, useMemo } from 'react';
import { allBitStrings } from 'quantum-core';

export default function BinaryStateExplorer() {
  const [n, setN] = useState(3);

  const bitStrings = useMemo(() => allBitStrings(n), [n]);
  const count = 1 << n;

  return (
    <div className="lab-panel">
      <h3>Binary State Explorer</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        A classical register with <em>n</em> bits can represent <strong>2<sup>n</sup></strong> distinct states.
      </p>

      <label htmlFor="n-slider">
        Number of bits (n): <strong>{n}</strong>
      </label>
      <input
        id="n-slider"
        type="range"
        min={1}
        max={10}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
      />

      <div className="card" style={{ marginTop: '1rem' }}>
        <p style={{ margin: 0 }}>
          <strong>2<sup>{n}</sup> = {count.toLocaleString()}</strong> possible bit strings
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: '1rem',
          maxHeight: n <= 6 ? 'none' : '240px',
          overflowY: n > 6 ? 'auto' : 'visible',
        }}
      >
        {bitStrings.map((bits) => (
          <code
            key={bits}
            className="mono"
            style={{
              padding: '0.35rem 0.6rem',
              background: 'var(--code-bg)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
            }}
          >
            {bits}
          </code>
        ))}
      </div>

      {n >= 8 && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
          Showing all {count.toLocaleString()} strings — scroll to browse.
        </p>
      )}
    </div>
  );
}

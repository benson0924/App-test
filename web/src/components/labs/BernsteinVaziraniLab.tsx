import { useState } from 'react';
import { runBernsteinVazirani } from 'quantum-core';

export default function BernsteinVaziraniLab() {
  const [n, setN] = useState(3);
  const [secret, setSecret] = useState([1, 0, 1]);
  const [found, setFound] = useState<number[] | null>(null);

  const run = () => {
    const s = secret.slice(0, n).concat(Array(Math.max(0, n - secret.length)).fill(0)).slice(0, n);
    setFound(runBernsteinVazirani(n, s));
  };

  return (
    <div className="lab-panel">
      <h3>Bernstein–Vazirani</h3>
      <p>Find hidden string s where f(x) = s·x mod 2 in one query.</p>
      <label>
        n: {n}
        <input type="range" min={2} max={5} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <div className="btn-group">
        {Array.from({ length: n }, (_, i) => (
          <button
            key={i}
            className={`btn ${secret[i] ? 'btn-primary' : ''}`}
            onClick={() => setSecret((s) => { const c = [...s]; c[i] = 1 - (c[i] ?? 0); return c; })}
          >
            s_{i} = {secret[i] ?? 0}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" onClick={run}>Recover secret</button>
      {found && (
        <p className="card">
          Recovered: <strong className="mono">{found.join('')}</strong>
          {' '}(actual: {secret.slice(0, n).join('')})
        </p>
      )}
    </div>
  );
}

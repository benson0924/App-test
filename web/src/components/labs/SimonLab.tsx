import { useState } from 'react';

/** Classical simulation of Simon's period-finding structure for f(x)=f(x⊕s). */
function simonFindPeriod(n: number, secret: number): number {
  const dim = 1 << n;
  const seen = new Map<number, number>();
  for (let x = 0; x < dim; x++) {
    const y = x ^ secret;
    if (seen.has(y)) return x ^ (seen.get(y) ?? 0);
    seen.set(x ^ secret, x);
  }
  return secret;
}

export default function SimonLab() {
  const [n, setN] = useState(3);
  const [secret, setSecret] = useState(5);
  const [samples, setSamples] = useState<[number, number][]>([]);
  const [recovered, setRecovered] = useState<number | null>(null);

  const run = () => {
    const s = secret & ((1 << n) - 1);
    const pairs: [number, number][] = [];
    for (let t = 0; t < 6; t++) {
      const x = Math.floor(Math.random() * (1 << n));
      pairs.push([x, x ^ s]);
    }
    setSamples(pairs);
    const diff = pairs[1][0] ^ pairs[1][1];
    setRecovered(diff);
  };

  return (
    <div className="lab-panel">
      <h3>Simon&apos;s Algorithm (Demo)</h3>
      <p>Oracle hides period s: f(x) = f(x ⊕ s). Collect collisions to recover s.</p>
      <label>
        n: {n}
        <input type="range" min={2} max={4} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <label>
        Hidden s (decimal): {secret & ((1 << n) - 1)}
        <input type="range" min={1} max={(1 << n) - 1} value={secret & ((1 << n) - 1)} onChange={(e) => setSecret(Number(e.target.value))} />
      </label>
      <button className="btn btn-primary" onClick={run}>Query oracle</button>
      {samples.length > 0 && (
        <table className="data-table">
          <thead><tr><th>x</th><th>f(x)</th><th>x ⊕ f(x)</th></tr></thead>
          <tbody>
            {samples.map(([x, fx], i) => (
              <tr key={i}>
                <td className="mono">{x.toString(2).padStart(n, '0')}</td>
                <td className="mono">{fx.toString(2).padStart(n, '0')}</td>
                <td className="mono">{(x ^ fx).toString(2).padStart(n, '0')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {recovered !== null && (
        <p className="card">Recovered period s = <strong className="mono">{recovered.toString(2).padStart(n, '0')}</strong></p>
      )}
    </div>
  );
}

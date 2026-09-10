import { Gates } from 'quantum-core';
import Katex from '../../components/Math';

const SINGLE = ['I', 'X', 'Y', 'Z', 'H', 'S', 'T'] as const;

function fmt(c: { re: number; im: number }) {
  if (Math.abs(c.im) < 1e-10) return c.re.toFixed(2);
  return `${c.re.toFixed(2)}${c.im >= 0 ? '+' : ''}${c.im.toFixed(2)}i`;
}

export default function GateReferencePage() {
  return (
    <article>
      <h1>Gate Reference</h1>
      <p>Standard gate matrices from <code>quantum-core</code>.</p>

      <h2>Single-qubit gates</h2>
      {SINGLE.map((name) => {
        const g = Gates[name];
        const m = typeof g === 'function' ? null : g.toArray();
        return (
          <div key={name} className="card">
            <h3>{name}</h3>
            {m && (
              <table className="data-table">
                <tbody>
                  {m.map((row, i) => (
                    <tr key={i}>{row.map((c, j) => <td key={j} className="mono">{fmt(c)}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}

      <h2>Common identities</h2>
      <Katex display>{`H X H = Z, \\quad H Z H = X, \\quad CNOT\\, |a,b\\rangle = |a, b\\oplus a\\rangle`}</Katex>
    </article>
  );
}

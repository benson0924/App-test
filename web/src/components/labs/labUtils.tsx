import { C, stateLabel, type StateVector } from 'quantum-core';

export function formatAmplitude(c: { re: number; im: number }): string {
  const re = Math.abs(c.re) < 1e-10 ? 0 : c.re;
  const im = Math.abs(c.im) < 1e-10 ? 0 : c.im;
  if (im === 0) return re.toFixed(3);
  if (re === 0) return `${im.toFixed(3)}i`;
  const sign = im >= 0 ? '+' : '-';
  return `${re.toFixed(3)} ${sign} ${Math.abs(im).toFixed(3)}i`;
}

export function StateVectorTable({ state }: { state: StateVector }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>|ψ⟩</th>
          <th>Amplitude</th>
          <th>|amp|²</th>
        </tr>
      </thead>
      <tbody>
        {state.amplitudes.map((a, i) => {
          const p = C.mag2(a);
          if (p < 1e-12) return null;
          return (
            <tr key={i}>
              <td>|{stateLabel(i, state.n)}⟩</td>
              <td className="mono">{formatAmplitude(a)}</td>
              <td>{(p * 100).toFixed(1)}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function AmplitudeBars({ state, step }: { state: StateVector; step?: number }) {
  const probs = state.amplitudes.map((a) => C.mag2(a));
  const maxP = Math.max(...probs, 1e-10);
  return (
    <div className="histogram-bar" style={{ height: 140 }}>
      {probs.map((p, i) => (
        <div
          key={i}
          className="bar"
          style={{ height: `${(p / maxP) * 100}%`, opacity: step !== undefined ? (i === step ? 1 : 0.6) : 1 }}
          title={`|${stateLabel(i, state.n)}⟩: ${(p * 100).toFixed(1)}%`}
        >
          <span className="bar-label">{stateLabel(i, state.n)}</span>
        </div>
      ))}
    </div>
  );
}

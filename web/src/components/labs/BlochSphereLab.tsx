import { useState, useMemo } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import {
  C,
  fromBloch,
  blochCoordinates,
  normalize,
  probabilities,
} from 'quantum-core';
import Katex from '@/components/Math';
import BlochSphere3D from './BlochSphere3D';

const PRESETS: { name: string; theta: number; phi: number }[] = [
  { name: '|0⟩', theta: 0, phi: 0 },
  { name: '|1⟩', theta: Math.PI, phi: 0 },
  { name: '|+⟩', theta: Math.PI / 2, phi: 0 },
  { name: '|−⟩', theta: Math.PI / 2, phi: Math.PI },
  { name: '|i⟩', theta: Math.PI / 2, phi: Math.PI / 2 },
  { name: '|−i⟩', theta: Math.PI / 2, phi: -Math.PI / 2 },
];

export default function BlochSphereLab() {
  const labT = useLabT('bloch-sphere');
  const sharedT = useLabSharedT();
  const [theta, setTheta] = useState(Math.PI / 4);
  const [phi, setPhi] = useState(Math.PI / 6);

  const state = useMemo(() => normalize(fromBloch(theta, phi)), [theta, phi]);
  const bloch = useMemo(() => blochCoordinates(state), [state]);
  const probs = useMemo(() => probabilities(state), [state]);

  const alpha = state.amplitudes[0];
  const beta = state.amplitudes[1];

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Adjust θ and φ, or pick a preset. All representations stay synchronized.
      </p>

      <div className="btn-group">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            className="btn"
            onClick={() => {
              setTheta(p.theta);
              setPhi(p.phi);
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div>
          <label htmlFor="theta-slider">
            θ (polar angle): {(theta * 180 / Math.PI).toFixed(1)}°
          </label>
          <input
            id="theta-slider"
            type="range"
            min={0}
            max={Math.PI}
            step={0.01}
            value={theta}
            onChange={(e) => setTheta(Number(e.target.value))}
          />
          <label htmlFor="phi-slider" style={{ display: 'block', marginTop: '1rem' }}>
            φ (azimuthal): {(phi * 180 / Math.PI).toFixed(1)}°
          </label>
          <input
            id="phi-slider"
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
          />

          <table className="data-table" style={{ marginTop: '1rem' }}>
            <tbody>
              <tr><td>α</td><td className="mono">{C.toString(alpha)}</td></tr>
              <tr><td>β</td><td className="mono">{C.toString(beta)}</td></tr>
              <tr><td>P(|0⟩)</td><td>{(probs[0] * 100).toFixed(2)}%</td></tr>
              <tr><td>P(|1⟩)</td><td>{(probs[1] * 100).toFixed(2)}%</td></tr>
              <tr><td>Bloch x</td><td>{bloch.x.toFixed(4)}</td></tr>
              <tr><td>Bloch y</td><td>{bloch.y.toFixed(4)}</td></tr>
              <tr><td>Bloch z</td><td>{bloch.z.toFixed(4)}</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <BlochSphere3D x={bloch.x} y={bloch.y} z={bloch.z} width={320} height={320} />
        </div>
      </div>

      <Katex display>{`|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\phi}\\sin\\tfrac{\\theta}{2}|1\\rangle`}</Katex>
      <Katex display>{`|\\psi\\rangle = ${C.toString(alpha)}|0\\rangle + ${C.toString(beta)}|1\\rangle`}</Katex>
    </div>
  );
}

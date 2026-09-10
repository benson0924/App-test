import { useState, useMemo } from 'react';
import {
  C,
  singleQubitState,
  normalize,
  norm,
  probabilities,
  blochCoordinates,
} from 'quantum-core';
import Katex from '@/components/Math';

export default function QubitStateLab() {
  const [alphaRe, setAlphaRe] = useState('1');
  const [alphaIm, setAlphaIm] = useState('0');
  const [betaRe, setBetaRe] = useState('0');
  const [betaIm, setBetaIm] = useState('0');

  const alpha = useMemo(() => ({ re: parseFloat(alphaRe) || 0, im: parseFloat(alphaIm) || 0 }), [alphaRe, alphaIm]);
  const beta = useMemo(() => ({ re: parseFloat(betaRe) || 0, im: parseFloat(betaIm) || 0 }), [betaRe, betaIm]);

  const raw = useMemo(() => singleQubitState(alpha, beta), [alpha, beta]);
  const n = norm(raw);
  const isNormalized = Math.abs(n - 1) < 1e-6 && n > 1e-12;

  let normalized = raw;
  let bloch = { x: 0, y: 0, z: 1, theta: 0, phi: 0 };
  let probs = [0, 0];
  let error: string | null = null;

  try {
    if (n < 1e-12) throw new Error('Zero vector');
    normalized = normalize(raw);
    bloch = blochCoordinates(normalized);
    probs = probabilities(normalized);
  } catch {
    error = 'State must be non-zero to normalize.';
  }

  return (
    <div className="lab-panel">
      <h3>Single-Qubit State Explorer</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Edit amplitudes α and β. The ket, column vector, measurement probabilities, and Bloch coordinates update live.
      </p>

      <div className="grid-2">
        <div>
          <p><strong>α (amplitude for |0⟩)</strong></p>
          <label>Real</label>
          <input type="number" step="0.01" value={alphaRe} onChange={(e) => setAlphaRe(e.target.value)} style={{ width: '100%' }} />
          <label style={{ marginTop: '0.5rem', display: 'block' }}>Imaginary</label>
          <input type="number" step="0.01" value={alphaIm} onChange={(e) => setAlphaIm(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div>
          <p><strong>β (amplitude for |1⟩)</strong></p>
          <label>Real</label>
          <input type="number" step="0.01" value={betaRe} onChange={(e) => setBetaRe(e.target.value)} style={{ width: '100%' }} />
          <label style={{ marginTop: '0.5rem', display: 'block' }}>Imaginary</label>
          <input type="number" step="0.01" value={betaIm} onChange={(e) => setBetaIm(e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>

      {error ? (
        <p className="incorrect">{error}</p>
      ) : (
        <>
          <Katex display>{`|\\psi\\rangle = ${C.toString(normalized.amplitudes[0])}|0\\rangle + ${C.toString(normalized.amplitudes[1])}|1\\rangle`}</Katex>

          <table className="data-table">
            <thead>
              <tr><th>Component</th><th>Value</th></tr>
            </thead>
            <tbody>
              <tr><td>Column vector</td><td className="mono">[{C.toString(normalized.amplitudes[0])}, {C.toString(normalized.amplitudes[1])}]<sup>T</sup></td></tr>
              <tr><td>P(|0⟩)</td><td>{(probs[0] * 100).toFixed(2)}%</td></tr>
              <tr><td>P(|1⟩)</td><td>{(probs[1] * 100).toFixed(2)}%</td></tr>
              <tr><td>‖ψ‖</td><td>{n.toFixed(4)} {isNormalized ? '(normalized)' : `(scale by ${(1 / n).toFixed(4)} to normalize)`}</td></tr>
              <tr><td>Bloch (x, y, z)</td><td className="mono">({bloch.x.toFixed(3)}, {bloch.y.toFixed(3)}, {bloch.z.toFixed(3)})</td></tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

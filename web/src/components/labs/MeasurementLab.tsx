import { useState, useMemo, useCallback } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import {
  C,
  singleQubitState,
  normalize,
  singleQubitMeasurementProbabilities,
  measureComputational,
  type MeasurementBasis,
} from 'quantum-core';

const SHOT_OPTIONS = [1, 10, 100, 1000, 10000] as const;

function sampleFromProbs(labels: string[], probs: number[]): string {
  const r = Math.random();
  let cum = 0;
  for (let i = 0; i < probs.length; i++) {
    cum += probs[i];
    if (r <= cum) return labels[i];
  }
  return labels[labels.length - 1];
}

function simulateShots(
  alpha: { re: number; im: number },
  beta: { re: number; im: number },
  basis: MeasurementBasis,
  shots: number
): Record<string, number> {
  if (basis === 'Z') {
    const state = normalize(singleQubitState(alpha, beta));
    return measureComputational(state, shots).counts;
  }

  const probs = singleQubitMeasurementProbabilities(alpha, beta, basis);
  const labels = Object.keys(probs);
  const values = labels.map((l) => probs[l]);
  const counts: Record<string, number> = {};
  for (let i = 0; i < shots; i++) {
    const outcome = sampleFromProbs(labels, values);
    counts[outcome] = (counts[outcome] ?? 0) + 1;
  }
  return counts;
}

export default function MeasurementLab() {
  const labT = useLabT('measurement');
  const sharedT = useLabSharedT();
  const [alphaRe, setAlphaRe] = useState('0.707');
  const [alphaIm, setAlphaIm] = useState('0');
  const [betaRe, setBetaRe] = useState('0.707');
  const [betaIm, setBetaIm] = useState('0');
  const [basis, setBasis] = useState<MeasurementBasis>('Z');
  const [shots, setShots] = useState<number>(100);
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [runId, setRunId] = useState(0);

  const alpha = useMemo(() => ({ re: parseFloat(alphaRe) || 0, im: parseFloat(alphaIm) || 0 }), [alphaRe, alphaIm]);
  const beta = useMemo(() => ({ re: parseFloat(betaRe) || 0, im: parseFloat(betaIm) || 0 }), [betaRe, betaIm]);

  const theoretical = useMemo(() => {
    try {
      return singleQubitMeasurementProbabilities(alpha, beta, basis);
    } catch {
      return null;
    }
  }, [alpha, beta, basis]);

  const measure = useCallback(() => {
    try {
      const result = simulateShots(alpha, beta, basis, shots);
      setCounts(result);
      setRunId((id) => id + 1);
    } catch {
      setCounts(null);
    }
  }, [alpha, beta, basis, shots]);

  const labels = theoretical ? Object.keys(theoretical) : [];
  const maxCount = counts ? Math.max(...Object.values(counts), 1) : 1;

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Set amplitudes, choose a measurement basis, and run repeated shots to build a histogram.
      </p>

      <div className="grid-2">
        <div>
          <label>α real</label>
          <input type="number" step="0.01" value={alphaRe} onChange={(e) => setAlphaRe(e.target.value)} style={{ width: '100%' }} />
          <label style={{ marginTop: '0.5rem', display: 'block' }}>α imag</label>
          <input type="number" step="0.01" value={alphaIm} onChange={(e) => setAlphaIm(e.target.value)} style={{ width: '100%' }} />
        </div>
        <div>
          <label>β real</label>
          <input type="number" step="0.01" value={betaRe} onChange={(e) => setBetaRe(e.target.value)} style={{ width: '100%' }} />
          <label style={{ marginTop: '0.5rem', display: 'block' }}>β imag</label>
          <input type="number" step="0.01" value={betaIm} onChange={(e) => setBetaIm(e.target.value)} style={{ width: '100%' }} />
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <label>Measurement basis</label>
        <select value={basis} onChange={(e) => setBasis(e.target.value as MeasurementBasis)} style={{ width: '100%' }}>
          <option value="Z">Computational (Z) — |0⟩, |1⟩</option>
          <option value="X">X — |+⟩, |−⟩</option>
          <option value="Y">Y — |i⟩, |−i⟩</option>
        </select>
      </div>

      {theoretical && (
        <div className="card" style={{ marginTop: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            <strong>Theoretical probabilities:</strong>{' '}
            {labels.map((l) => `${l}: ${(theoretical[l] * 100).toFixed(1)}%`).join(' · ')}
          </p>
        </div>
      )}

      <div className="btn-group" style={{ marginTop: '1rem' }}>
        {SHOT_OPTIONS.map((n) => (
          <button
            key={n}
            className={`btn ${shots === n ? 'btn-primary' : ''}`}
            onClick={() => setShots(n)}
          >
            {n.toLocaleString()} shots
          </button>
        ))}
        <button className="btn btn-primary" onClick={measure}>Measure</button>
      </div>

      {counts && (
        <div key={runId}>
          <div className="histogram-bar" style={{ marginTop: '1.5rem' }}>
            {labels.map((label) => {
              const count = counts[label] ?? 0;
              const height = (count / maxCount) * 100;
              return (
                <div
                  key={label}
                  className="bar"
                  style={{ height: `${Math.max(height, 2)}%` }}
                  title={`${label}: ${count}`}
                >
                  <span className="bar-label">{label} ({count})</span>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2rem' }}>
            Empirical frequencies from {shots.toLocaleString()} measurement{shots === 1 ? '' : 's'}.
          </p>
        </div>
      )}
    </div>
  );
}

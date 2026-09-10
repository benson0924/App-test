import { useState } from 'react';
import { chshExperiment } from 'quantum-core';

export default function CHSHLab() {
  const [trials, setTrials] = useState(1000);
  const [result, setResult] = useState<ReturnType<typeof chshExperiment> | null>(null);

  const run = () => {
    const a = 0, b = Math.PI / 4, ap = Math.PI / 2, bp = -Math.PI / 4;
    setResult(chshExperiment(a, b, ap, bp, trials));
  };

  return (
    <div className="lab-panel">
      <h3>CHSH Bell Test</h3>
      <p>Simulate correlations for a singlet-like source. Classical bound |S| ≤ 2; quantum mechanics can reach |S| ≈ 2√2.</p>
      <label>
        Trials: {trials}
        <input type="range" min={100} max={10000} step={100} value={trials} onChange={(e) => setTrials(Number(e.target.value))} />
      </label>
      <button className="btn btn-primary" onClick={run}>Run experiment</button>
      {result && (
        <div className="card">
          <table className="data-table">
            <tbody>
              {Object.entries(result.E).map(([k, v]) => (
                <tr key={k}><td>{k}</td><td>{v.toFixed(4)}</td></tr>
              ))}
            </tbody>
          </table>
          <p><strong>CHSH parameter S =</strong> {result.S.toFixed(4)}</p>
          <p className={Math.abs(result.S) > 2 ? 'correct' : ''}>
            {Math.abs(result.S) > 2 ? 'Violates classical bound (|S| > 2)' : 'Within classical bound for this sample'}
          </p>
        </div>
      )}
    </div>
  );
}

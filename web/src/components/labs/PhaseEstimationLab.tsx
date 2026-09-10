import { useState } from 'react';
import { phaseEstimation } from 'quantum-core';

export default function PhaseEstimationLab() {
  const [phi, setPhi] = useState(0.25);
  const [precision, setPrecision] = useState(4);
  const [result, setResult] = useState<ReturnType<typeof phaseEstimation> | null>(null);

  const run = () => setResult(phaseEstimation(phi, precision));

  return (
    <div className="lab-panel">
      <h3>Quantum Phase Estimation</h3>
      <label>
        True phase φ: {phi.toFixed(4)} (fraction of 2π)
        <input type="range" min={0} max={1} step={0.01} value={phi} onChange={(e) => setPhi(Number(e.target.value))} />
      </label>
      <label>
        Precision qubits: {precision}
        <input type="range" min={2} max={8} value={precision} onChange={(e) => setPrecision(Number(e.target.value))} />
      </label>
      <button className="btn btn-primary" onClick={run}>Estimate phase</button>
      {result && (
        <div className="card">
          <p>Binary estimate: <strong className="mono">{result.binary}</strong></p>
          <p>φ estimate: <strong>{result.estimate.toFixed(6)}</strong></p>
          <p>Error: <strong>{result.error.toFixed(6)}</strong></p>
        </div>
      )}
    </div>
  );
}

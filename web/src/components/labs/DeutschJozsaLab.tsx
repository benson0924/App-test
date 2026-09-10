import { useState } from 'react';
import { runDeutschJozsa } from 'quantum-core';

function makeOracle(n: number, type: 'constant' | 'balanced') {
  if (type === 'constant') return () => 0;
  const mask = 1 << (n - 1);
  return (x: number) => ((x & mask) !== 0 ? 1 : 0);
}

export default function DeutschJozsaLab() {
  const [n, setN] = useState(2);
  const [type, setType] = useState<'constant' | 'balanced'>('balanced');
  const [result, setResult] = useState<{ balanced: boolean } | null>(null);

  const run = () => {
    const f = makeOracle(n, type);
    setResult(runDeutschJozsa(n, f));
  };

  return (
    <div className="lab-panel">
      <h3>Deutsch–Jozsa</h3>
      <label>
        Input qubits n: {n}
        <input type="range" min={1} max={4} value={n} onChange={(e) => setN(Number(e.target.value))} />
      </label>
      <div className="btn-group">
        <button className={`btn ${type === 'constant' ? 'btn-primary' : ''}`} onClick={() => setType('constant')}>Constant oracle</button>
        <button className={`btn ${type === 'balanced' ? 'btn-primary' : ''}`} onClick={() => setType('balanced')}>Balanced oracle</button>
      </div>
      <button className="btn btn-primary" onClick={run}>Run DJ</button>
      {result && (
        <p className="card">
          Result: oracle is <strong>{result.balanced ? 'balanced' : 'constant'}</strong>
          {result.balanced === (type === 'balanced') ? ' ✓' : ' (check simulation)'}
        </p>
      )}
    </div>
  );
}

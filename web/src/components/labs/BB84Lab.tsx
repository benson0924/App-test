import { useState } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import { runBB84 } from 'quantum-core';

export default function BB84Lab() {
  const labT = useLabT('bb84');
  const sharedT = useLabSharedT();
  const [numQubits, setNumQubits] = useState(16);
  const [eve, setEve] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof runBB84> | null>(null);

  const run = () => setResult(runBB84(numQubits, eve));

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <label>
        Qubits: {numQubits}
        <input type="range" min={8} max={64} step={8} value={numQubits} onChange={(e) => setNumQubits(Number(e.target.value))} />
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
        <input type="checkbox" checked={eve} onChange={(e) => setEve(e.target.checked)} />
        Eve intercepts (random basis)
      </label>
      <button className="btn btn-primary" onClick={run}>Run BB84</button>
      {result && (
        <div className="card">
          <p><strong>Sifted key length:</strong> {result.siftedKey.length}</p>
          <p><strong>Error rate (matching bases):</strong> {(result.errorRate * 100).toFixed(1)}%</p>
          <p className="mono" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            Sifted: {result.siftedKey.join('')}
          </p>
          <table className="data-table">
            <thead><tr><th>i</th><th>Alice bit</th><th>Alice basis</th><th>Bob basis</th><th>Bob bit</th></tr></thead>
            <tbody>
              {result.aliceBits.slice(0, 12).map((_, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{result.aliceBits[i]}</td>
                  <td>{result.aliceBases[i]}</td>
                  <td>{result.bobBases[i]}</td>
                  <td>{result.bobResults[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

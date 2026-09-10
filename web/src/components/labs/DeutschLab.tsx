import { useState } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import { runDeutsch } from 'quantum-core';

const ORACLES = [
  { id: 'const0', label: 'f(x)=0', f: () => 0 },
  { id: 'const1', label: 'f(x)=1', f: () => 1 },
  { id: 'bal', label: 'f(x)=x', f: (x: number) => x },
  { id: 'bal2', label: 'f(x)=NOT x', f: (x: number) => 1 - x },
] as const;

export default function DeutschLab() {
  const labT = useLabT('deutsch');
  const sharedT = useLabSharedT();
  const [oracleIdx, setOracleIdx] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof runDeutsch> | null>(null);

  const run = () => {
    const o = ORACLES[oracleIdx];
    setResult(runDeutsch(o.f));
  };

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p>One query distinguishes constant from balanced functions on one bit.</p>
      <div className="btn-group">
        {ORACLES.map((o, i) => (
          <button key={o.id} className={`btn ${oracleIdx === i ? 'btn-primary' : ''}`} onClick={() => setOracleIdx(i)}>
            {o.label}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" onClick={run}>Run Deutsch</button>
      {result && (
        <div className="card">
          <p>Measured input qubit: <strong>|{result.measured}⟩</strong></p>
          <p>Classification: <strong>{result.constant ? 'Constant' : 'Balanced'}</strong></p>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            |0⟩ → constant, |1⟩ → balanced (ideal noiseless case).
          </p>
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from 'react';
import { modExp, findPeriod } from 'quantum-core';

export default function PeriodFindingLab() {
  const [a, setA] = useState(7);
  const [N, setN] = useState(15);

  const sequence = useMemo(() => {
    const seq: number[] = [];
    for (let x = 0; x < 12; x++) seq.push(modExp(a, x, N));
    return seq;
  }, [a, N]);

  const period = useMemo(() => findPeriod(a, N), [a, N]);

  return (
    <div className="lab-panel">
      <h3>Period Finding (mod N)</h3>
      <div className="grid-2">
        <label>
          Base a
          <input type="number" min={2} max={N - 1} value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
        <label>
          Modulus N
          <input type="number" min={4} max={35} value={N} onChange={(e) => setN(Number(e.target.value))} />
        </label>
      </div>
      <p>Sequence a^x mod N: <span className="mono">{sequence.join(', ')}…</span></p>
      <p className="card"><strong>Period r =</strong> {period}</p>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        Shor&apos;s algorithm uses QFT-based phase estimation to find this period efficiently on a fault-tolerant machine.
      </p>
    </div>
  );
}

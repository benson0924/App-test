import { useState } from 'react';
import { shorFactor, modExp, findPeriod, gcd } from 'quantum-core';

export default function ShorLab() {
  const [N, setN] = useState(15);
  const [a, setA] = useState(7);
  const [result, setResult] = useState<ReturnType<typeof shorFactor> | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const run = () => {
    const log: string[] = [];
    log.push(`Factor N = ${N}, choose a = ${a}.`);
    const g = gcd(a, N);
    if (g > 1) {
      log.push(`gcd(${a}, ${N}) = ${g} → factor found classically.`);
      setSteps(log);
      setResult(shorFactor(N, a));
      return;
    }
    const r = findPeriod(a, N);
    log.push(`Period of ${a}^x mod ${N} is r = ${r}.`);
    const half = modExp(a, r / 2, N);
    log.push(`${a}^{r/2} mod ${N} = ${half}.`);
    const res = shorFactor(N, a);
    if (res) log.push(`Factors: ${res.p} × ${res.q} = ${N}.`);
    else log.push('This choice of a did not yield factors (try another base).');
    setSteps(log);
    setResult(res);
  };

  return (
    <div className="lab-panel">
      <h3>Shor&apos;s Algorithm Demo (N = 15)</h3>
      <p>Classical period finding demo of the quantum factoring pipeline.</p>
      <div className="btn-group">
        <button className={`btn ${N === 15 ? 'btn-primary' : ''}`} onClick={() => setN(15)}>N = 15</button>
        <button className={`btn ${N === 21 ? 'btn-primary' : ''}`} onClick={() => setN(21)}>N = 21</button>
      </div>
      <label>
        Random base a: {a}
        <input type="range" min={2} max={N - 1} value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <button className="btn btn-primary" onClick={run}>Run factoring demo</button>
      {steps.length > 0 && <ol>{steps.map((s, i) => <li key={i}>{s}</li>)}</ol>}
      {result && (
        <p className="card correct">
          {result.p} × {result.q} = {N} (period r = {result.r})
        </p>
      )}
    </div>
  );
}

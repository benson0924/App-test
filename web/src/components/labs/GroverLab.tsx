import { useState, useMemo } from 'react';
import { runGrover, groverStep, groverIterations, zeroState, fromAmplitudes, C } from 'quantum-core';
import { AmplitudeBars } from './labUtils';

export default function GroverLab() {
  const [n, setN] = useState(2);
  const [marked, setMarked] = useState(3);
  const [step, setStep] = useState(0);
  const dim = 1 << n;
  const maxMarked = dim - 1;

  const states = useMemo(() => {
    const list = [];
    const init = fromAmplitudes(n, Array(dim).fill(C.scale(1 / Math.sqrt(dim), C.one())));
    list.push(init);
    let s = init;
    const total = groverIterations(n);
    for (let i = 0; i <= total; i++) {
      s = groverStep(s, marked);
      list.push(s);
    }
    return list;
  }, [n, marked, dim]);

  const current = states[Math.min(step, states.length - 1)];
  const probMarked = C.mag2(current.amplitudes[marked]);

  return (
    <div className="lab-panel">
      <h3>Grover Search</h3>
      <label>
        Qubits n: {n}
        <input type="range" min={2} max={3} value={n} onChange={(e) => { setN(Number(e.target.value)); setStep(0); setMarked(0); }} />
      </label>
      <label>
        Marked state |{marked.toString(2).padStart(n, '0')}⟩
        <input type="range" min={0} max={maxMarked} value={marked} onChange={(e) => { setMarked(Number(e.target.value)); setStep(0); }} />
      </label>
      <label>
        Iteration: {step} / {groverIterations(n)}
        <input type="range" min={0} max={groverIterations(n)} value={step} onChange={(e) => setStep(Number(e.target.value))} />
      </label>
      <AmplitudeBars state={current} step={marked} />
      <p>P(marked) = <strong>{(probMarked * 100).toFixed(1)}%</strong></p>
      <div className="btn-group">
        <button className="btn" onClick={() => setStep((s) => Math.max(0, s - 1))}>← Prev</button>
        <button className="btn btn-primary" onClick={() => setStep(groverIterations(n))}>Optimal iterations</button>
        <button className="btn" onClick={() => setStep((s) => Math.min(groverIterations(n), s + 1))}>Next →</button>
      </div>
    </div>
  );
}

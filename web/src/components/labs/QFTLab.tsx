import { useState, useMemo } from 'react';
import { basisState, qft, stateLabel, C } from 'quantum-core';
import { AmplitudeBars } from './labUtils';

export default function QFTLab() {
  const [n, setN] = useState(2);
  const [inputIdx, setInputIdx] = useState(1);
  const dim = 1 << n;

  const { input, output } = useMemo(() => {
    const input = basisState(n, inputIdx);
    const output = qft(input);
    return { input, output };
  }, [n, inputIdx, dim]);

  return (
    <div className="lab-panel">
      <h3>Quantum Fourier Transform</h3>
      <label>
        Qubits: {n}
        <input type="range" min={2} max={3} value={n} onChange={(e) => { setN(Number(e.target.value)); setInputIdx(0); }} />
      </label>
      <label>
        Input |{stateLabel(inputIdx, n)}⟩
        <input type="range" min={0} max={dim - 1} value={inputIdx} onChange={(e) => setInputIdx(Number(e.target.value))} />
      </label>
      <h4>Input amplitudes</h4>
      <AmplitudeBars state={input} />
      <h4>After QFT</h4>
      <AmplitudeBars state={output} />
      <table className="data-table">
        <thead><tr><th>|k⟩</th><th>|amp|²</th></tr></thead>
        <tbody>
          {output.amplitudes.map((a, k) => (
            <tr key={k}><td>|{stateLabel(k, n)}⟩</td><td>{(C.mag2(a) * 100).toFixed(2)}%</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState } from 'react';
import { BellStates, applyCircuit, createCircuit, zeroState, measureComputational } from 'quantum-core';

export default function SuperdenseLab() {
  const [bits, setBits] = useState<[number, number]>([0, 0]);
  const [log, setLog] = useState<string[]>([]);

  const encode = () => {
    const steps: string[] = [];
    let state = BellStates.phiPlus();
    steps.push('Shared Bell pair |Φ⁺⟩ prepared between Alice and Bob.');

    const c = createCircuit(2);
    if (bits[1]) c.ops.push({ type: 'gate', name: 'X', qubits: [0] });
    if (bits[0]) c.ops.push({ type: 'gate', name: 'Z', qubits: [0] });
    state = applyCircuit(state, c);
    steps.push(`Alice encodes classical bits (${bits[0]}, ${bits[1]}) on her qubit.`);

    const send = createCircuit(2);
    send.ops.push({ type: 'gate', name: 'CNOT', qubits: [0, 1] });
    send.ops.push({ type: 'gate', name: 'H', qubits: [0] });
    state = applyCircuit(state, send);
    steps.push('Alice applies CNOT and H, then sends her qubit to Bob.');

    const { counts } = measureComputational(state, 1);
    const outcome = Object.keys(counts)[0] ?? '00';
    const decoded = [outcome[0] === '1' ? 1 : 0, outcome[1] === '1' ? 1 : 0];
    steps.push(`Bob measures both qubits → |${outcome}⟩ → decoded (${decoded[0]}, ${decoded[1]}).`);
    setLog(steps);
  };

  return (
    <div className="lab-panel">
      <h3>Superdense Coding</h3>
      <p>Send two classical bits using one qubit and one shared ebit.</p>
      <div className="btn-group">
        {[0, 1].map((b0) =>
          [0, 1].map((b1) => (
            <button
              key={`${b0}${b1}`}
              className={`btn ${bits[0] === b0 && bits[1] === b1 ? 'btn-primary' : ''}`}
              onClick={() => setBits([b0, b1])}
            >
              Send ({b0}, {b1})
            </button>
          ))
        )}
      </div>
      <button className="btn btn-primary" onClick={encode}>Run protocol</button>
      {log.length > 0 && (
        <ol style={{ marginTop: '1rem' }}>
          {log.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      )}
    </div>
  );
}

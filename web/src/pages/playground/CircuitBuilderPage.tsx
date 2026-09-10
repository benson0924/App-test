import { useState, useCallback } from 'react';
import {
  zeroState, applyCircuit, createCircuit, stateLabel, C, type Circuit,
} from 'quantum-core';
import { StateVectorTable } from '../../components/labs/labUtils';

const PALETTE = ['H', 'X', 'Y', 'Z', 'S', 'T', 'CNOT', 'CZ', 'SWAP'] as const;
type GateName = typeof PALETTE[number];

interface PlacedGate {
  id: string;
  name: GateName;
  qubits: number[];
  column: number;
}

let gateId = 0;

export default function CircuitBuilderPage() {
  const [numQubits, setNumQubits] = useState(2);
  const [gates, setGates] = useState<PlacedGate[]>([]);
  const [dragGate, setDragGate] = useState<GateName | null>(null);
  const [state, setState] = useState(() => zeroState(2));

  const maxCol = Math.max(0, ...gates.map((g) => g.column)) + 1;

  const onDrop = (qubit: number, column: number) => {
    if (!dragGate) return;
    const qubits = dragGate === 'CNOT' || dragGate === 'CZ' || dragGate === 'SWAP'
      ? [Math.min(qubit, numQubits - 1), Math.min(qubit + 1, numQubits - 1)]
      : [qubit];
    setGates((g) => [...g, { id: `g${++gateId}`, name: dragGate, qubits, column }]);
    setDragGate(null);
  };

  const buildCircuit = useCallback((): Circuit => {
    const c = createCircuit(numQubits);
    const sorted = [...gates].sort((a, b) => a.column - b.column || a.qubits[0] - b.qubits[0]);
    for (const g of sorted) {
      c.ops.push({ type: 'gate', name: g.name, qubits: g.qubits });
    }
    return c;
  }, [gates, numQubits]);

  const run = () => {
    const c = buildCircuit();
    setState(applyCircuit(zeroState(numQubits), c));
  };

  const clear = () => { setGates([]); setState(zeroState(numQubits)); };

  return (
    <div>
      <h1>Circuit Builder</h1>
      <p>Drag gates onto qubit lines, then simulate to view the statevector.</p>

      <label>
        Qubits: {numQubits}
        <input type="range" min={1} max={4} value={numQubits} onChange={(e) => {
          setNumQubits(Number(e.target.value));
          setGates([]);
          setState(zeroState(Number(e.target.value)));
        }} />
      </label>

      <div className="btn-group" style={{ marginTop: '1rem' }}>
        {PALETTE.map((g) => (
          <div
            key={g}
            className="btn"
            draggable
            onDragStart={() => setDragGate(g)}
            style={{ cursor: 'grab' }}
          >
            {g}
          </div>
        ))}
      </div>

      <div className="lab-panel circuit-grid" style={{ overflowX: 'auto' }}>
        {Array.from({ length: numQubits }, (_, q) => (
          <div key={q} className="circuit-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="mono" style={{ width: 40 }}>q{q}</span>
            <div style={{ display: 'flex', gap: 4, minWidth: maxCol * 56 }}>
              {Array.from({ length: maxCol + 2 }, (_, col) => {
                const here = gates.filter((g) => g.column === col && g.qubits.includes(q));
                return (
                  <div
                    key={col}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDrop(q, col)}
                    style={{
                      width: 48, height: 40, border: '1px dashed var(--border)',
                      borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.75rem', background: here.length ? 'var(--accent-muted)' : 'transparent',
                    }}
                  >
                    {here.map((g) => (
                      <span key={g.id}>{g.name}{g.qubits.length > 1 && g.qubits[0] === q ? '•' : g.qubits[1] === q ? '⊕' : ''}</span>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={run}>Run simulation</button>
        <button className="btn" onClick={clear}>Clear</button>
      </div>

      <h3>Statevector</h3>
      <StateVectorTable state={state} />
    </div>
  );
}

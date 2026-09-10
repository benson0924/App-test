import { useState, useCallback, useMemo, useRef } from 'react';
import {
  zeroState, applyCircuit, createCircuit, circuitDepth, countGates,
  exportOpenQASM, measureComputational, probabilities, stateLabel, C,
  type Circuit, type StateVector,
} from 'quantum-core';
import { StateVectorTable } from '../../components/labs/labUtils';

type GateDef = {
  name: string;
  label: string;
  qubits: number;
  param?: boolean;
  category: 'single' | 'two' | 'three';
};

const GATE_PALETTE: GateDef[] = [
  { name: 'I', label: 'I', qubits: 1, category: 'single' },
  { name: 'X', label: 'X', qubits: 1, category: 'single' },
  { name: 'Y', label: 'Y', qubits: 1, category: 'single' },
  { name: 'Z', label: 'Z', qubits: 1, category: 'single' },
  { name: 'H', label: 'H', qubits: 1, category: 'single' },
  { name: 'S', label: 'S', qubits: 1, category: 'single' },
  { name: 'T', label: 'T', qubits: 1, category: 'single' },
  { name: 'Rx', label: 'Rx', qubits: 1, param: true, category: 'single' },
  { name: 'Ry', label: 'Ry', qubits: 1, param: true, category: 'single' },
  { name: 'Rz', label: 'Rz', qubits: 1, param: true, category: 'single' },
  { name: 'CNOT', label: 'CNOT', qubits: 2, category: 'two' },
  { name: 'CZ', label: 'CZ', qubits: 2, category: 'two' },
  { name: 'SWAP', label: 'SWAP', qubits: 2, category: 'two' },
  { name: 'Toffoli', label: 'CCX', qubits: 3, category: 'three' },
];

interface PlacedGate {
  id: string;
  name: string;
  qubits: number[];
  column: number;
  param?: number;
}

const PRESETS: { name: string; n: number; gates: Omit<PlacedGate, 'id'>[] }[] = [
  { name: 'Bell |Φ⁺⟩', n: 2, gates: [{ name: 'H', qubits: [0], column: 0 }, { name: 'CNOT', qubits: [0, 1], column: 1 }] },
  { name: 'GHZ (3)', n: 3, gates: [{ name: 'H', qubits: [0], column: 0 }, { name: 'CNOT', qubits: [0, 1], column: 1 }, { name: 'CNOT', qubits: [0, 2], column: 2 }] },
  { name: 'Teleport (partial)', n: 3, gates: [{ name: 'H', qubits: [1], column: 0 }, { name: 'CNOT', qubits: [1, 2], column: 1 }, { name: 'CNOT', qubits: [0, 1], column: 2 }, { name: 'H', qubits: [0], column: 3 }] },
];

let gid = 0;

const COL_W = 64;
const ROW_H = 56;
const PAD = 48;

export default function CircuitBuilderPage() {
  const [numQubits, setNumQubits] = useState(2);
  const [gates, setGates] = useState<PlacedGate[]>([]);
  const [dragGate, setDragGate] = useState<GateDef | null>(null);
  const [rotation, setRotation] = useState(Math.PI / 2);
  const [state, setState] = useState<StateVector>(() => zeroState(2));
  const [stepIdx, setStepIdx] = useState(-1);
  const [showQasm, setShowQasm] = useState(false);
  const [animCol, setAnimCol] = useState(-1);
  const canvasRef = useRef<HTMLDivElement>(null);

  const maxCol = Math.max(0, ...gates.map((g) => g.column), 0);
  const cols = maxCol + 3;

  const buildCircuit = useCallback((): Circuit => {
    const c = createCircuit(numQubits);
    const sorted = [...gates].sort((a, b) => a.column - b.column || a.qubits[0] - b.qubits[0]);
    for (const g of sorted) {
      c.ops.push({ type: 'gate', name: g.name, qubits: g.qubits, param: g.param });
    }
    return c;
  }, [gates, numQubits]);

  const circuit = useMemo(() => buildCircuit(), [buildCircuit]);
  const depth = circuitDepth(circuit);
  const gateCount = countGates(circuit);
  const probs = probabilities(state);

  const runFull = () => {
    setStepIdx(-1);
    setAnimCol(-1);
    setState(applyCircuit(zeroState(numQubits), circuit));
  };

  const runStep = () => {
    const sorted = [...gates].sort((a, b) => a.column - b.column);
    const next = stepIdx + 1;
    if (next >= sorted.length) { runFull(); setStepIdx(-1); return; }
    const partial = createCircuit(numQubits);
    for (let i = 0; i <= next; i++) {
      const g = sorted[i];
      partial.ops.push({ type: 'gate', name: g.name, qubits: g.qubits, param: g.param });
    }
    setAnimCol(sorted[next].column);
    setState(applyCircuit(zeroState(numQubits), partial));
    setStepIdx(next);
    setTimeout(() => setAnimCol(-1), 400);
  };

  const measure = () => {
    const { counts } = measureComputational(state, 1024);
    setMeasureCounts(counts);
  };

  const [measureCounts, setMeasureCounts] = useState<Record<string, number> | null>(null);

  const clear = () => {
    setGates([]);
    setState(zeroState(numQubits));
    setStepIdx(-1);
    setMeasureCounts(null);
  };

  const loadPreset = (p: typeof PRESETS[0]) => {
    setNumQubits(p.n);
    setGates(p.gates.map((g) => ({ ...g, id: `g${++gid}` })));
    setState(zeroState(p.n));
    setStepIdx(-1);
  };

  const placeGate = (qubit: number, column: number) => {
    if (!dragGate) return;
    let qubits: number[];
    if (dragGate.qubits === 1) qubits = [qubit];
    else if (dragGate.qubits === 2) qubits = [Math.min(qubit, numQubits - 2), Math.min(qubit, numQubits - 2) + 1];
    else qubits = [0, 1, 2].slice(0, Math.min(3, numQubits));
    setGates((g) => [...g, {
      id: `g${++gid}`,
      name: dragGate.name,
      qubits,
      column,
      param: dragGate.param ? rotation : undefined,
    }]);
    setDragGate(null);
  };

  const removeGate = (id: string) => setGates((g) => g.filter((x) => x.id !== id));

  const qasm = exportOpenQASM(circuit);

  return (
    <div className="circuit-builder-page">
      <h1>Quantum Circuit Builder</h1>
      <p>
        Drag gates onto the circuit grid. Run step-by-step to watch the statevector evolve,
        or simulate the full circuit. Export equivalent OpenQASM 3.0.
      </p>

      <div className="grid-2" style={{ marginBottom: '1rem' }}>
        <div className="lab-panel">
          <label>Qubits: {numQubits}</label>
          <input type="range" min={1} max={5} value={numQubits} onChange={(e) => {
            const n = Number(e.target.value);
            setNumQubits(n);
            clear();
            setState(zeroState(n));
          }} />
          {dragGate?.param && (
            <>
              <label>Rotation θ: {(rotation * 180 / Math.PI).toFixed(0)}°</label>
              <input type="range" min={0} max={2 * Math.PI} step={0.05} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} />
            </>
          )}
          <p style={{ fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
            Depth: <strong>{depth}</strong> · Gates: <strong>{gateCount}</strong>
          </p>
        </div>
        <div className="lab-panel">
          <strong>Presets</strong>
          <div className="btn-group" style={{ marginTop: '0.5rem' }}>
            {PRESETS.map((p) => (
              <button key={p.name} className="btn" onClick={() => loadPreset(p)}>{p.name}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="gate-palette">
        {GATE_PALETTE.map((g) => (
          <div
            key={g.name}
            className={`gate-chip ${g.category}`}
            draggable
            onDragStart={() => setDragGate(g)}
            onDragEnd={() => setDragGate(null)}
            title={`Drag ${g.label} onto circuit`}
          >
            {g.label}
          </div>
        ))}
        <div className="gate-chip measure" draggable onDragStart={() => setDragGate({ name: 'MEASURE', label: 'M', qubits: 1, category: 'single' })}>
          M
        </div>
      </div>

      <div className="lab-panel circuit-canvas-wrap" ref={canvasRef}>
        <svg
          width={PAD * 2 + cols * COL_W}
          height={PAD * 2 + numQubits * ROW_H}
          className="circuit-svg"
        >
          {/* Wires */}
          {Array.from({ length: numQubits }, (_, q) => (
            <g key={`wire-${q}`}>
              <text x={12} y={PAD + q * ROW_H + ROW_H / 2 + 4} className="circuit-label">q{q}</text>
              <line
                x1={PAD} y1={PAD + q * ROW_H + ROW_H / 2}
                x2={PAD + cols * COL_W} y2={PAD + q * ROW_H + ROW_H / 2}
                stroke="var(--border)" strokeWidth={2}
              />
            </g>
          ))}

          {/* Drop zones + gates */}
          {Array.from({ length: numQubits }, (_, q) =>
            Array.from({ length: cols }, (_, col) => {
              const here = gates.filter((g) => g.column === col && (
                g.qubits.includes(q) || (g.name === 'CNOT' && g.qubits[0] === q) || (g.name === 'CNOT' && g.qubits[1] === q)
              ));
              const isControl = here.some((g) => (g.name === 'CNOT' || g.name === 'CZ' || g.name === 'Toffoli') && g.qubits[0] === q && g.qubits[g.qubits.length - 1] !== q);
              const isTarget = here.some((g) => (g.name === 'CNOT' || g.name === 'CZ') && g.qubits[1] === q);
              const single = here.find((g) => g.qubits.length === 1 && g.qubits[0] === q);
              const x = PAD + col * COL_W + COL_W / 2;
              const y = PAD + q * ROW_H + ROW_H / 2;
              const highlight = animCol === col;

              return (
                <g key={`${q}-${col}`}>
                  <rect
                    x={PAD + col * COL_W + 4}
                    y={PAD + q * ROW_H + 4}
                    width={COL_W - 8}
                    height={ROW_H - 8}
                    fill={highlight ? 'var(--accent-muted)' : 'transparent'}
                    stroke="var(--border)"
                    strokeDasharray="4 2"
                    rx={6}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => placeGate(q, col)}
                  />
                  {isControl && <circle cx={x} cy={y} r={6} fill="var(--text)" />}
                  {isTarget && (
                    <>
                      <circle cx={x} cy={y} r={14} fill="none" stroke="var(--accent)" strokeWidth={2} />
                      <text x={x} y={y + 4} textAnchor="middle" className="gate-text">⊕</text>
                    </>
                  )}
                  {single && !isControl && !isTarget && (
                    <g onClick={() => removeGate(single.id)} style={{ cursor: 'pointer' }}>
                      <rect x={x - 18} y={y - 16} width={36} height={32} rx={4} fill="var(--accent)" className="gate-box" />
                      <text x={x} y={y + 5} textAnchor="middle" fill="white" className="gate-text">{single.name}{single.param ? `(θ)` : ''}</text>
                    </g>
                  )}
                </g>
              );
            })
          )}
        </svg>
      </div>

      <div className="btn-group">
        <button className="btn btn-primary" onClick={runFull}>Run</button>
        <button className="btn" onClick={runStep}>Step</button>
        <button className="btn" onClick={measure}>Measure (1024 shots)</button>
        <button className="btn" onClick={clear}>Clear</button>
        <button className="btn" onClick={() => setShowQasm(!showQasm)}>{showQasm ? 'Hide' : 'Show'} OpenQASM</button>
      </div>

      {showQasm && (
        <pre className="qasm-panel">{qasm}</pre>
      )}

      <div className="grid-2" style={{ marginTop: '1.5rem' }}>
        <div>
          <h3>Statevector |ψ⟩</h3>
          <StateVectorTable state={state} />
        </div>
        <div>
          <h3>Probability distribution</h3>
          <div className="histogram-bar" style={{ height: 140, marginBottom: '2rem' }}>
            {probs.map((p, i) => (
              <div key={i} className="bar" style={{ height: `${Math.max(p * 100, 1)}%`, opacity: p > 0.001 ? 1 : 0.3 }}>
                <span className="bar-label">{stateLabel(i, numQubits)}</span>
                <span style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem' }}>
                  {(p * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
          {measureCounts && (
            <>
              <h3>Measurement histogram</h3>
              <div className="histogram-bar" style={{ height: 120 }}>
                {Object.entries(measureCounts).sort().map(([label, count]) => (
                  <div key={label} className="bar" style={{ height: `${(count / 1024) * 100}%`, background: 'var(--success)' }}>
                    <span className="bar-label">{label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

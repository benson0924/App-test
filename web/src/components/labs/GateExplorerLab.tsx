import { useState, useMemo } from 'react';
import { useLabT, useLabSharedT } from '@/i18n/hooks';
import {
  C,
  getSingleQubitGate,
  singleQubitState,
  normalize,
  blochCoordinates,
  fromBloch,
} from 'quantum-core';
import Katex from '@/components/Math';
import BlochSphere3D from './BlochSphere3D';

type GateName = 'I' | 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T';

const GATE_NAMES: GateName[] = ['I', 'X', 'Y', 'Z', 'H', 'S', 'T'];

function formatMatrix(data: { re: number; im: number }[][]): string {
  return data
    .map((row) => row.map((c) => C.toString(c)).join(' & '))
    .join(' \\\\ ');
}

export default function GateExplorerLab() {
  const labT = useLabT('gate-explorer');
  const sharedT = useLabSharedT();
  const [theta, setTheta] = useState(Math.PI / 3);
  const [phi, setPhi] = useState(Math.PI / 4);
  const [selectedGate, setSelectedGate] = useState<GateName>('H');
  const [history, setHistory] = useState<GateName[]>([]);

  const initialState = useMemo(() => normalize(fromBloch(theta, phi)), [theta, phi]);

  const gate = useMemo(() => getSingleQubitGate(selectedGate), [selectedGate]);

  const newAmps = useMemo(() => gate.mulVec(initialState.amplitudes), [gate, initialState]);
  const resultState = useMemo(() => normalize(singleQubitState(newAmps[0], newAmps[1])), [newAmps]);

  const beforeBloch = useMemo(() => blochCoordinates(initialState), [initialState]);
  const afterBloch = useMemo(() => blochCoordinates(resultState), [resultState]);

  const applyGate = () => {
    setHistory((h) => [...h, selectedGate]);
    setTheta(afterBloch.theta);
    setPhi(afterBloch.phi);
  };

  const reset = () => {
    setTheta(Math.PI / 3);
    setPhi(Math.PI / 4);
    setHistory([]);
  };

  return (
    <div className="lab-panel">
      <h3>{labT('title')}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Choose a gate and apply it to the current state. See matrix–vector multiplication and the Bloch vector update.
      </p>

      <div className="btn-group">
        {GATE_NAMES.map((g) => (
          <button
            key={g}
            className={`btn ${selectedGate === g ? 'btn-primary' : ''}`}
            onClick={() => setSelectedGate(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div>
          <label htmlFor="gate-theta">Initial θ: {(theta * 180 / Math.PI).toFixed(1)}°</label>
          <input
            id="gate-theta"
            type="range"
            min={0}
            max={Math.PI}
            step={0.01}
            value={theta}
            onChange={(e) => { setTheta(Number(e.target.value)); setHistory([]); }}
          />
          <label htmlFor="gate-phi" style={{ display: 'block', marginTop: '0.75rem' }}>
            Initial φ: {(phi * 180 / Math.PI).toFixed(1)}°
          </label>
          <input
            id="gate-phi"
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            value={phi}
            onChange={(e) => { setPhi(Number(e.target.value)); setHistory([]); }}
          />

          <div className="btn-group" style={{ marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={applyGate}>Apply {selectedGate}</button>
            <button className="btn" onClick={reset}>Reset</button>
          </div>

          {history.length > 0 && (
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Applied: {history.join(' → ')}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontSize: '0.75rem', margin: '0 0 0.25rem', color: 'var(--text-muted)' }}>Before</p>
            <BlochSphere3D x={beforeBloch.x} y={beforeBloch.y} z={beforeBloch.z} width={180} height={180} />
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', margin: '0 0 0.25rem', color: 'var(--text-muted)' }}>After {selectedGate}</p>
            <BlochSphere3D x={afterBloch.x} y={afterBloch.y} z={afterBloch.z} width={180} height={180} />
          </div>
        </div>
      </div>

      <Katex display>{`U_{${selectedGate}} = \\begin{pmatrix} ${formatMatrix(gate.toArray())} \\end{pmatrix}`}</Katex>

      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th>|0⟩ amp</th>
            <th>|1⟩ amp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>|ψ⟩</strong></td>
            <td className="mono">{C.toString(initialState.amplitudes[0])}</td>
            <td className="mono">{C.toString(initialState.amplitudes[1])}</td>
          </tr>
          <tr>
            <td><strong>{selectedGate}|ψ⟩</strong></td>
            <td className="mono">{C.toString(resultState.amplitudes[0])}</td>
            <td className="mono">{C.toString(resultState.amplitudes[1])}</td>
          </tr>
        </tbody>
      </table>

      <div className="card">
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Bloch vector: ({beforeBloch.x.toFixed(3)}, {beforeBloch.y.toFixed(3)}, {beforeBloch.z.toFixed(3)})
          {' → '}
          ({afterBloch.x.toFixed(3)}, {afterBloch.y.toFixed(3)}, {afterBloch.z.toFixed(3)})
        </p>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { C, fromBloch, blochCoordinates, applySingleQubitGate, basisState, measureComputational, Gates } from 'quantum-core';
import BlochSphere3D from './BlochSphere3D';
import { StateVectorTable } from './labUtils';

export function ComplexPlaneLab() {
  const [re, setRe] = useState(0.7);
  const [im, setIm] = useState(0.3);
  const mag = Math.sqrt(re * re + im * im);
  return (
    <div className="lab-panel">
      <h3>Complex Number Explorer</h3>
      <label>Re: {re.toFixed(2)}<input type="range" min={-1} max={1} step={0.05} value={re} onChange={(e) => setRe(Number(e.target.value))} /></label>
      <label>Im: {im.toFixed(2)}<input type="range" min={-1} max={1} step={0.05} value={im} onChange={(e) => setIm(Number(e.target.value))} /></label>
      <p>z = {re.toFixed(2)} + {im.toFixed(2)}i, |z| = {mag.toFixed(3)}, arg = {Math.atan2(im, re).toFixed(3)} rad</p>
    </div>
  );
}

export function QubitStateLab() {
  const [theta, setTheta] = useState(Math.PI / 3);
  const [phi, setPhi] = useState(Math.PI / 4);
  const state = useMemo(() => fromBloch(theta, phi), [theta, phi]);
  return (
    <div className="lab-panel">
      <h3>Single-Qubit State Explorer</h3>
      <label>θ: {(theta * 180 / Math.PI).toFixed(0)}°<input type="range" min={0} max={Math.PI} step={0.05} value={theta} onChange={(e) => setTheta(Number(e.target.value))} /></label>
      <label>φ: {(phi * 180 / Math.PI).toFixed(0)}°<input type="range" min={0} max={2 * Math.PI} step={0.05} value={phi} onChange={(e) => setPhi(Number(e.target.value))} /></label>
      <StateVectorTable state={state} />
    </div>
  );
}

export function MeasurementLab() {
  const [shots, setShots] = useState(100);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const state = fromBloch(Math.PI / 3, 0);
  const measure = () => setCounts(measureComputational(state, shots).counts);
  return (
    <div className="lab-panel">
      <h3>Measurement Simulator</h3>
      <label>Shots: {shots}<input type="range" min={10} max={1000} step={10} value={shots} onChange={(e) => setShots(Number(e.target.value))} /></label>
      <button className="btn btn-primary" onClick={measure}>Measure</button>
      {Object.keys(counts).length > 0 && (
        <div className="histogram-bar">
          {['0', '1'].map((k) => (
            <div key={k} className="bar" style={{ height: `${((counts[k] ?? 0) / shots) * 100}%` }}>
              <span className="bar-label">{k}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BlochSphereLab() {
  const [theta, setTheta] = useState(Math.PI / 4);
  const [phi, setPhi] = useState(Math.PI / 3);
  const { x, y, z } = blochCoordinates(fromBloch(theta, phi));
  return (
    <div className="lab-panel">
      <h3>3D Bloch Sphere</h3>
      <BlochSphere3D x={x} y={y} z={z} onDrag={(t, p) => { setTheta(t); setPhi(p); }} />
      <label>θ<input type="range" min={0} max={Math.PI} step={0.05} value={theta} onChange={(e) => setTheta(Number(e.target.value))} /></label>
    </div>
  );
}

export function GateExplorerLab() {
  const [gate, setGate] = useState('H');
  const state = useMemo(() => {
    let s = basisState(1, 0);
    const g = Gates[gate as keyof typeof Gates];
    if (typeof g !== 'function') {
      s = { n: 1, amplitudes: g.mulVec(s.amplitudes) };
    }
    return s;
  }, [gate]);
  return (
    <div className="lab-panel">
      <h3>Quantum Gate Explorer</h3>
      <div className="btn-group">
        {['I', 'X', 'Y', 'Z', 'H', 'S', 'T'].map((g) => (
          <button key={g} className={`btn ${gate === g ? 'btn-primary' : ''}`} onClick={() => setGate(g)}>{g}</button>
        ))}
      </div>
      <p>Apply {gate} to |0⟩:</p>
      <StateVectorTable state={state} />
    </div>
  );
}

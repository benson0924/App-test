import { useState, useMemo } from 'react';
import { C } from 'quantum-core';
import Katex from '@/components/Math';

export default function ComplexPlaneLab() {
  const [r, setR] = useState(1);
  const [phi, setPhi] = useState(0);

  const z = useMemo(() => C.fromPolar(r, phi), [r, phi]);

  const canvasSize = 280;
  const cx = canvasSize / 2;
  const cy = canvasSize / 2;
  const scale = 100;
  const px = cx + z.re * scale;
  const py = cy - z.im * scale;

  return (
    <div className="lab-panel">
      <h3>Complex Number Explorer</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        Drag the sliders to explore a complex number in rectangular and polar form.
      </p>

      <div className="grid-2">
        <div>
          <label htmlFor="r-slider">Magnitude r: {r.toFixed(2)}</label>
          <input
            id="r-slider"
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
          />
          <label htmlFor="phi-slider" style={{ display: 'block', marginTop: '1rem' }}>
            Phase φ: {(phi * 180 / Math.PI).toFixed(1)}° ({phi.toFixed(3)} rad)
          </label>
          <input
            id="phi-slider"
            type="range"
            min={-Math.PI}
            max={Math.PI}
            step={0.01}
            value={phi}
            onChange={(e) => setPhi(Number(e.target.value))}
          />
        </div>

        <div>
          <svg width={canvasSize} height={canvasSize} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
            <line x1={0} y1={cy} x2={canvasSize} y2={cy} stroke="var(--border)" />
            <line x1={cx} y1={0} x2={cx} y2={canvasSize} stroke="var(--border)" />
            <circle cx={cx} cy={cy} r={scale} fill="none" stroke="var(--border)" strokeDasharray="4" />
            <line x1={cx} y1={cy} x2={px} y2={py} stroke="var(--accent)" strokeWidth={2} />
            <circle cx={px} cy={py} r={5} fill="var(--accent)" />
            <text x={cx + 4} y={14} fontSize={11} fill="var(--text-muted)">Re</text>
            <text x={4} y={cy - 4} fontSize={11} fill="var(--text-muted)">Im</text>
          </svg>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <p><strong>Rectangular:</strong> z = {C.toString(z)}</p>
        <p style={{ margin: 0 }}><strong>Polar:</strong> z = {r.toFixed(3)} e<sup>i{phi >= 0 ? '' : '−'}{Math.abs(phi).toFixed(3)}</sup></p>
      </div>

      <Katex display>{`z = ${C.toString(z)} = ${r.toFixed(3)} e^{i${phi.toFixed(3)}}`}</Katex>
    </div>
  );
}

import { useState } from 'react';

export function BinaryStatesLab() {
  const [bits, setBits] = useState(3);
  const states = Array.from({ length: 1 << bits }, (_, i) => i.toString(2).padStart(bits, '0'));
  return (
    <div className="lab-panel">
      <h3>Binary State Explorer</h3>
      <label>Bits: {bits}<input type="range" min={1} max={4} value={bits} onChange={(e) => setBits(Number(e.target.value))} /></label>
      <p>{states.length} classical states: <span className="mono">{states.join(', ')}</span></p>
    </div>
  );
}

export function LogicGatesLab() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const gates = { AND: a & b, OR: a | b, XOR: a ^ b, NAND: (a & b) === 0 ? 1 : 0 };
  return (
    <div className="lab-panel">
      <h3>Logic Gate Simulator</h3>
      <div className="btn-group">
        <button className={`btn ${a ? 'btn-primary' : ''}`} onClick={() => setA(1 - a)}>A = {a}</button>
        <button className={`btn ${b ? 'btn-primary' : ''}`} onClick={() => setB(1 - b)}>B = {b}</button>
      </div>
      <table className="data-table"><tbody>{Object.entries(gates).map(([g, v]) => <tr key={g}><td>{g}</td><td>{v}</td></tr>)}</tbody></table>
    </div>
  );
}

export function BinaryAdderLab() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);
  const sum = a + b;
  return (
    <div className="lab-panel">
      <h3>Binary Adder</h3>
      <label>A: {a}<input type="range" min={0} max={15} value={a} onChange={(e) => setA(Number(e.target.value))} /></label>
      <label>B: {b}<input type="range" min={0} max={15} value={b} onChange={(e) => setB(Number(e.target.value))} /></label>
      <p>{a} + {b} = {sum} (<span className="mono">{sum.toString(2)}</span>₂)</p>
    </div>
  );
}

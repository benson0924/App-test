import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Section from '@/components/Section';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import Expandable from '@/components/Expandable';
import {
  allBitStrings,
  binaryToDecimal,
  decimalToBinary,
  LogicGates,
  rippleCarryAdd,
  Complexity,
  deMorgan,
  simplifyBoolean,
  majorityVote,
  parity,
  toffoliClassical,
  type Bit,
} from 'quantum-core';

const BASE = '/learn/classical';

type GateName = 'NOT' | 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR';

function BitExplorer() {
  const [n, setN] = useState(3);
  const strings = useMemo(() => allBitStrings(n), [n]);
  const count = 1 << n;

  return (
    <div className="lab-panel">
      <label htmlFor="n-bits">Number of bits (n): {n}</label>
      <input
        id="n-bits"
        type="range"
        min={1}
        max={10}
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
      />
      <p>
        An <Katex>{`${n}`}</Katex>-bit register has{' '}
        <Katex>{`2^{${n}} = ${count.toLocaleString()}`}</Katex> distinct states.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.35rem',
          maxHeight: n <= 6 ? 'none' : '120px',
          overflowY: n > 6 ? 'auto' : 'visible',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
        }}
      >
        {strings.map((s) => (
          <span
            key={s}
            style={{
              padding: '0.15rem 0.4rem',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
            }}
          >
            {s}
          </span>
        ))}
      </div>
      {n > 6 && (
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 0 }}>
          Showing all {count} strings — scroll to browse. At n = 10, a register has 1,024 states.
        </p>
      )}
    </div>
  );
}

function BinaryConverter() {
  const [binary, setBinary] = useState('1010');
  const [decimal, setDecimal] = useState('10');
  const [width, setWidth] = useState(4);

  const fromBinary = () => {
    const clean = binary.replace(/\s/g, '');
    if (/^[01]+$/.test(clean)) setDecimal(String(binaryToDecimal(clean)));
  };

  const fromDecimal = () => {
    const n = parseInt(decimal, 10);
    if (!isNaN(n) && n >= 0) setBinary(decimalToBinary(n, width));
  };

  return (
    <div className="lab-panel">
      <div className="grid-2">
        <div>
          <label>Binary</label>
          <input
            type="text"
            value={binary}
            onChange={(e) => setBinary(e.target.value.replace(/[^01\s]/g, ''))}
            className="mono"
            style={{ width: '100%' }}
          />
          <button className="btn" style={{ marginTop: '0.5rem' }} onClick={fromBinary}>
            → Decimal
          </button>
        </div>
        <div>
          <label>Decimal</label>
          <input
            type="number"
            min={0}
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            style={{ width: '100%' }}
          />
          <button className="btn" style={{ marginTop: '0.5rem' }} onClick={fromDecimal}>
            → Binary
          </button>
        </div>
      </div>
      <label style={{ display: 'block', marginTop: '1rem' }}>
        Fixed width: {width} bits
      </label>
      <input type="range" min={1} max={16} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
      <p style={{ marginBottom: 0, fontSize: '0.875rem' }}>
        <code>{binary.replace(/\s/g, '')}</code> = {binaryToDecimal(binary.replace(/\s/g, '') || '0')}{' '}
        (unsigned interpretation)
      </p>
    </div>
  );
}

function TruthTableSimulator() {
  const [gate, setGate] = useState<GateName>('AND');

  const rows: [Bit, Bit, Bit | null][] = [];
  for (let a = 0; a <= 1; a++) {
    for (let b = 0; b <= 1; b++) {
      const ai = a as Bit;
      const bi = b as Bit;
      let out: Bit | null = null;
      if (gate === 'NOT') out = LogicGates.NOT(ai);
      else out = LogicGates[gate](ai, bi);
      rows.push([ai, bi, out]);
    }
  }

  return (
    <div className="lab-panel">
      <label>Gate</label>
      <select value={gate} onChange={(e) => setGate(e.target.value as GateName)} style={{ marginLeft: '0.5rem' }}>
        {(['NOT', 'AND', 'OR', 'XOR', 'NAND', 'NOR'] as GateName[]).map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <table className="data-table" style={{ marginTop: '1rem', maxWidth: '280px' }}>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>{gate}(A{gate !== 'NOT' ? ', B' : ''})</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b, out], i) => (
            <tr key={i}>
              <td>{a}</td>
              <td>{gate === 'NOT' ? '—' : b}</td>
              <td><strong>{out}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DeMorganDemo() {
  const [mode, setMode] = useState<'AND' | 'OR'>('AND');
  const [a, setA] = useState<Bit>(1);
  const [b, setB] = useState<Bit>(0);
  const dm = deMorgan(mode);

  const leftVal = simplifyBoolean(dm.left, { A: a, B: b });
  const rightVal = simplifyBoolean(dm.right, { A: a, B: b });

  return (
    <div className="lab-panel">
      <div className="btn-group">
        <button className={`btn ${mode === 'AND' ? 'btn-primary' : ''}`} onClick={() => setMode('AND')}>
          De Morgan (AND)
        </button>
        <button className={`btn ${mode === 'OR' ? 'btn-primary' : ''}`} onClick={() => setMode('OR')}>
          De Morgan (OR)
        </button>
      </div>
      <p>
        A ={' '}
        <button className="btn" onClick={() => setA(a === 0 ? 1 : 0)}>{a}</button>
        {' '}B ={' '}
        <button className="btn" onClick={() => setB(b === 0 ? 1 : 0)}>{b}</button>
      </p>
      <Katex display>{`\\overline{A ${mode} B} \\equiv \\bar{A} ${mode === 'AND' ? '\\lor' : '\\land'} \\bar{B}`}</Katex>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        {dm.left} → {leftVal} &nbsp;|&nbsp; {dm.right} → {rightVal}
        {leftVal === rightVal ? ' ✓ equal' : ' ✗ differ'}
      </p>
    </div>
  );
}

function RippleCarryDemo() {
  const [a, setA] = useState('0110');
  const [b, setB] = useState('0011');
  const [step, setStep] = useState(-1);

  const result = useMemo(() => rippleCarryAdd(a.replace(/\s/g, ''), b.replace(/\s/g, '')), [a, b]);
  const len = Math.max(a.length, b.length);
  const aP = a.padStart(len, '0');
  const bP = b.padStart(len, '0');

  const activeCol = step >= 0 && step < len ? len - 1 - step : -1;

  return (
    <div className="lab-panel">
      <div className="grid-2">
        <div>
          <label>A (binary)</label>
          <input type="text" value={a} onChange={(e) => { setA(e.target.value.replace(/[^01]/g, '')); setStep(-1); }} style={{ width: '100%' }} />
        </div>
        <div>
          <label>B (binary)</label>
          <input type="text" value={b} onChange={(e) => { setB(e.target.value.replace(/[^01]/g, '')); setStep(-1); }} style={{ width: '100%' }} />
        </div>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', marginTop: '1rem' }}>
        &nbsp;&nbsp;{aP.split('').map((bit, i) => (
          <span key={`a${i}`} style={{ background: i === activeCol ? 'var(--accent-muted)' : undefined, padding: '0 2px' }}>{bit}</span>
        ))}<br />
        + {bP.split('').map((bit, i) => (
          <span key={`b${i}`} style={{ background: i === activeCol ? 'var(--accent-muted)' : undefined, padding: '0 2px' }}>{bit}</span>
        ))}<br />
        = {result.sum.padStart(len, '0')}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Carries (MSB→LSB): [{result.carries.join(', ')}]
      </p>
      <div className="btn-group">
        <button className="btn" onClick={() => setStep(-1)}>Reset</button>
        <button className="btn btn-primary" onClick={() => setStep((s) => (s >= len - 1 ? -1 : s + 1))}>
          {step < 0 ? 'Step through addition' : step >= len - 1 ? 'Done — restart' : `Next bit (column ${activeCol})`}
        </button>
      </div>
      <p style={{ marginBottom: 0, fontSize: '0.875rem' }}>
        Decimal check: {binaryToDecimal(aP)} + {binaryToDecimal(bP)} = {binaryToDecimal(result.sum.padStart(len, '0'))}
      </p>
    </div>
  );
}

function ToffoliDemo() {
  const [a, setA] = useState<Bit>(1);
  const [b, setB] = useState<Bit>(1);
  const [c, setC] = useState<Bit>(0);
  const [outA, outB, outC] = toffoliClassical(a, b, c);

  return (
    <div className="lab-panel">
      <p>Controls A, B — target C is flipped when both controls are 1.</p>
      <div className="btn-group">
        {(['A', 'B', 'C'] as const).map((label) => {
          const val = label === 'A' ? a : label === 'B' ? b : c;
          const set = label === 'A' ? setA : label === 'B' ? setB : setC;
          return (
            <button key={label} className="btn" onClick={() => set(val === 0 ? 1 : 0)}>
              {label} = {val}
            </button>
          );
        })}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)' }}>
        ({a}, {b}, {c}) → ({outA}, {outB}, {outC})
        {outC !== c ? ' — target flipped' : ' — no change'}
      </p>
    </div>
  );
}

function ErrorCorrectionDemo() {
  const [dataBit, setDataBit] = useState<Bit>(1);
  const [flipIdx, setFlipIdx] = useState<number | null>(null);

  const codeword: Bit[] = [dataBit, dataBit, dataBit];
  const transmitted = codeword.map((b, i) => (flipIdx === i ? ((b ^ 1) as Bit) : b));
  const recovered = majorityVote(transmitted);

  return (
    <div className="lab-panel">
      <p>3-bit repetition code: encode each bit three times; decode by majority vote.</p>
      <div className="btn-group">
        <button className="btn" onClick={() => setDataBit(dataBit === 0 ? 1 : 0)}>Data bit: {dataBit}</button>
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className={`btn ${flipIdx === i ? 'btn-primary' : ''}`}
            onClick={() => setFlipIdx(flipIdx === i ? null : i)}
          >
            Flip wire {i}
          </button>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
        Encoded: [{codeword.join(', ')}]<br />
        Transmitted: [{transmitted.join(', ')}]<br />
        Majority vote → <strong>{recovered}</strong>
        {recovered === dataBit ? ' (correct!)' : ' (error!)'}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        Parity of transmitted bits: {parity(transmitted)}. Classical codes trade redundancy for resilience.
      </p>
    </div>
  );
}

function ComplexityGraph() {
  const [n, setN] = useState(8);
  const classes = Object.keys(Complexity) as (keyof typeof Complexity)[];

  const maxVal = Math.max(...classes.map((c) => Complexity[c](n)), 1);

  return (
    <div className="lab-panel">
      <label>Input size n = {n}</label>
      <input type="range" min={2} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} />
      <div style={{ marginTop: '1rem' }}>
        {classes.map((cls) => {
          const val = Complexity[cls](n);
          const pct = Math.min(100, (val / maxVal) * 100);
          return (
            <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ width: '90px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{cls}</span>
              <div style={{ flex: 1, height: '20px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)', transition: 'width 0.2s' }} />
              </div>
              <span style={{ width: '80px', fontSize: '0.75rem', textAlign: 'right', color: 'var(--text-muted)' }}>
                {val >= 1e6 ? val.toExponential(1) : val.toFixed(val < 10 ? 2 : 0)}
              </span>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        Exponential growth (O(2ⁿ)) dominates quickly — a central motivation for quantum algorithms on structured problems.
      </p>
    </div>
  );
}

export default function ClassicalComputing() {
  return (
    <article>
      <span className="tag">Chapter 1</span>
      <h1>Classical Computing</h1>
      <p style={{ color: 'var(--text-muted)' }}>
        Before qubits and superposition, we need a precise picture of how classical computers represent
        information, manipulate it with logic, and reason about computational cost. This chapter builds
        that foundation — and highlights concepts (reversibility, error correction, complexity) that
        reappear in quantum form later.
      </p>

      <Section
        id="states-and-information"
        title="1.1 States and Information"
        next={{ title: '1.2 Binary Numbers', path: `${BASE}#binary-numbers` }}
      >
        <p>
          Classical information lives in discrete, distinguishable configurations. The simplest unit is
          the <strong>bit</strong>, which takes one of two values: 0 or 1. Physical implementations vary
          (voltage levels, magnetic orientation, punch-card holes), but logically every classical register
          is a string of bits.
        </p>
        <p>
          An <Katex>{`n`}</Katex>-bit register can be in exactly one of <Katex>{`2^n`}</Katex> states at any
          moment. There is no fractional bit and no simultaneous 0-and-1 — the register's content is
          fully specified by which bit string it holds.
        </p>
        <Katex display>{`|\\text{register}\\rangle \\in \\{0,1\\}^n, \\quad |\\{0,1\\}^n| = 2^n`}</Katex>

        <BitExplorer />

        <WorkedExample
          title="Counting 4-bit addresses"
          steps={[
            { label: 'Each bit doubles the number of distinct states. Starting from 1 bit → 2 states.', latex: '2^1 = 2' },
            { label: 'For n = 4, multiply four factors of 2.', latex: '2^4 = 2 \\times 2 \\times 2 \\times 2 = 16' },
            { label: 'The register can represent unsigned integers 0 through 15, or any 16 distinct symbols.', latex: '0000_2 \\ldots 1111_2 \\;\\Leftrightarrow\\; 0_{10} \\ldots 15_{10}' },
          ]}
        />

        <Checkpoint
          question="How many distinct states can a 7-bit classical register represent?"
          answer="128"
          hint="Use 2^n with n = 7."
        />

        <p>
          Try the interactive explorer above, or open the{' '}
          <Link to="/playground/binary-states">Binary State Explorer</Link> lab.
        </p>
      </Section>

      <Section
        id="binary-numbers"
        title="1.2 Binary Numbers"
        prev={{ title: '1.1 States and Information', path: `${BASE}#states-and-information` }}
        next={{ title: '1.3 Logic Gates', path: `${BASE}#logic-gates` }}
      >
        <p>
          Binary strings are not just abstract states — they encode numbers. Each position carries a
          weight that is a power of two, read from right (least significant) to left (most significant).
        </p>
        <Katex display>{`N = \\sum_{i=0}^{n-1} b_i \\, 2^i, \\quad b_i \\in \\{0,1\\}`}</Katex>
        <p>
          Conversion between binary and decimal is a routine skill. Fixed-width representations pad
          with leading zeros so that, for example, 5 becomes <code>0101</code> in 4 bits.
        </p>

        <BinaryConverter />

        <WorkedExample
          title="Convert 1101₂ to decimal"
          steps={[
            { label: 'Identify bit positions and weights (rightmost index i = 0).', latex: '1101_2 = 1\\cdot2^3 + 1\\cdot2^2 + 0\\cdot2^1 + 1\\cdot2^0' },
            { label: 'Evaluate each term.', latex: '8 + 4 + 0 + 1 = 13' },
            { label: 'Therefore 1101₂ = 13₁₀.', latex: '1101_2 = 13_{10}' },
          ]}
        />

        <Checkpoint
          question="What is 10110 in binary as a decimal number?"
          answer="22"
          hint="Sum powers of two where the bit is 1: 16 + 4 + 2."
        />

        <p>
          Practice conversions in the{' '}
          <Link to="/playground/binary-states">Binary State Explorer</Link> lab.
        </p>
      </Section>

      <Section
        id="logic-gates"
        title="1.3 Logic Gates"
        prev={{ title: '1.2 Binary Numbers', path: `${BASE}#binary-numbers` }}
        next={{ title: '1.4 Boolean Algebra', path: `${BASE}#boolean-algebra` }}
      >
        <p>
          Computation is transformation. A <strong>logic gate</strong> takes one or more bits and
          produces an output bit according to a fixed truth table. Gates are the building blocks of
          circuits: combinational networks (no memory) and sequential machines (with feedback or clocks).
        </p>
        <p>Common gates include NOT (inverter), AND, OR, XOR, and their negated variants NAND and NOR.</p>
        <Katex display>{`\\text{AND}(a,b) = ab, \\quad \\text{OR}(a,b) = a + b - ab, \\quad \\text{XOR}(a,b) = a \\oplus b`}</Katex>

        <TruthTableSimulator />

        <WorkedExample
          title="Build XOR from AND, OR, and NOT"
          steps={[
            { label: 'XOR is true when inputs differ — one is 0 and the other is 1.', latex: 'a \\oplus b = (a \\land \\bar{b}) \\lor (\\bar{a} \\land b)' },
            { label: 'Equivalently, XOR is OR minus the overlap (both-1 case).', latex: 'a \\oplus b = (a \\lor b) \\land \\neg(a \\land b)' },
            { label: 'A two-level circuit: compute AND and NOT terms, then OR them together.', latex: '\\text{XOR} = \\text{OR}\\big(\\text{AND}(a,\\bar{b}), \\text{AND}(\\bar{a},b)\\big)' },
          ]}
        />

        <Checkpoint
          question="What is the output of AND(1, 0)?"
          answer="0"
        />

        <p>
          Explore gate combinations in the{' '}
          <Link to="/playground/logic-gates">Logic Gate Simulator</Link> lab.
        </p>
      </Section>

      <Section
        id="boolean-algebra"
        title="1.4 Boolean Algebra"
        prev={{ title: '1.3 Logic Gates', path: `${BASE}#logic-gates` }}
        next={{ title: '1.5 Adders', path: `${BASE}#adders` }}
      >
        <p>
          Boolean algebra abstracts gates into symbols with algebraic laws: commutativity, associativity,
          distributivity, identity elements, and complement. These laws let us simplify circuits and prove
          gate networks equivalent without enumerating every input.
        </p>
        <Katex display>{`\\overline{A \\land B} = \\bar{A} \\lor \\bar{B}, \\quad \\overline{A \\lor B} = \\bar{A} \\land \\bar{B} \\quad \\text{(De Morgan)}`}</Katex>
        <p>
          De Morgan's laws swap AND/OR under negation and are indispensable when translating between
          positive and negative logic, or when optimizing chip area.
        </p>

        <DeMorganDemo />

        <WorkedExample
          title="Simplify ¬(A ∧ B) ∨ A"
          steps={[
            { label: 'Apply De Morgan to the negated AND term.', latex: '\\overline{A \\land B} = \\bar{A} \\lor \\bar{B}' },
            { label: 'Substitute into the expression.', latex: '(\\bar{A} \\lor \\bar{B}) \\lor A' },
            { label: 'Use OR associativity and the identity A ∨ ¬A = 1.', latex: 'A \\lor \\bar{A} \\lor \\bar{B} = 1 \\lor \\bar{B} = 1' },
            { label: 'The expression is a tautology — always 1 regardless of inputs.', latex: '\\overline{A \\land B} \\lor A \\equiv 1' },
          ]}
        />

        <Checkpoint
          question="By De Morgan's law, what is NOT(A OR B) equivalent to?"
          answer="NOT(A) AND NOT(B)"
          hint="Negation distributes by flipping AND to OR."
        />

        <Expandable title="Additional Boolean identities">
          <Katex display>{`A \\land A = A, \\quad A \\lor A = A, \\quad A \\land 1 = A, \\quad A \\lor 0 = A`}</Katex>
          <Katex display>{`A \\land (B \\lor C) = (A \\land B) \\lor (A \\land C)`}</Katex>
        </Expandable>
      </Section>

      <Section
        id="adders"
        title="1.5 Adders"
        prev={{ title: '1.4 Boolean Algebra', path: `${BASE}#boolean-algebra` }}
        next={{ title: '1.6 Reversible Computation', path: `${BASE}#reversible-computation` }}
      >
        <p>
          Arithmetic reduces to repeated bit operations. A <strong>half adder</strong> adds two bits
          producing sum and carry; a <strong>full adder</strong> also accepts an incoming carry from
          the previous (less significant) column. Chaining full adders yields a ripple-carry adder.
        </p>
        <Katex display>{`\\text{sum} = a \\oplus b \\oplus c_{\\text{in}}, \\quad c_{\\text{out}} = (a \\land b) \\lor (c_{\\text{in}} \\land (a \\oplus b))`}</Katex>

        <RippleCarryDemo />

        <WorkedExample
          title="Add 0110₂ + 0011₂"
          steps={[
            { label: 'Start from the rightmost column (LSB): 0 + 1 = 1, carry 0.', latex: '0 \\oplus 1 = 1' },
            { label: 'Next column: 1 + 1 = 0, carry 1.', latex: '1 + 1 = 10_2' },
            { label: 'Third column with carry: 1 + 0 + 1 = 0, carry 1.', latex: '1 \\oplus 0 \\oplus 1 = 0' },
            { label: 'MSB column: 0 + 0 + 1 = 1. Result 1001₂ = 9₁₀.', latex: '0110_2 + 0011_2 = 1001_2 = 9_{10}' },
          ]}
        />

        <Checkpoint
          question="What is the sum bit of a half adder when both inputs are 1?"
          answer="0"
          hint="Sum is XOR; 1 XOR 1 = 0. (Carry is 1.)"
        />

        <p>
          Step through addition interactively in the{' '}
          <Link to="/playground/binary-adder">Binary Adder</Link> lab.
        </p>
      </Section>

      <Section
        id="reversible-computation"
        title="1.6 Reversible Computation"
        prev={{ title: '1.5 Adders', path: `${BASE}#adders` }}
        next={{ title: '1.7 Classical Error Correction', path: `${BASE}#classical-error-correction` }}
      >
        <p>
          Standard AND and OR gates are <strong>irreversible</strong>: the output does not uniquely
          determine the inputs (AND(0,0) and AND(0,1) both yield 0). Landauer showed that erasing
          information has a thermodynamic cost — motivating <strong>reversible</strong> circuits where
          every output bit can be traced back to inputs.
        </p>
        <p>
          Reversible classical gates are permutations on bit strings. The <strong>Toffoli (CCNOT)</strong>{' '}
          gate flips a target bit iff both control bits are 1, and is universal for classical reversible
          computation when combined with NOT. Quantum computing adopts Toffoli (and its 2-qubit cousin CNOT)
          as native operations.
        </p>
        <Katex display>{`\\text{CCNOT}(a,b,c) = (a,\\; b,\\; c \\oplus (a \\land b))`}</Katex>

        <ToffoliDemo />

        <WorkedExample
          title="Why AND alone is not reversible"
          steps={[
            { label: 'Suppose an AND gate output is 0.', latex: '\\text{AND}(a,b) = 0' },
            { label: 'Both (0,0) and (0,1) and (1,0) are valid pre-images — inputs are lost.', latex: '(0,0), (0,1), (1,0) \\mapsto 0' },
            { label: 'A reversible alternative keeps inputs: map (a,b) → (a, b, a∧b) using ancilla bits.', latex: '(a,b,0) \\xrightarrow{\\text{Toffoli-like}} (a,b,a\\land b)' },
          ]}
        />

        <Checkpoint
          question="When A=1, B=1, C=0, what is the target output of a Toffoli gate?"
          answer="1"
          hint="Target flips when both controls are 1."
        />
      </Section>

      <Section
        id="classical-error-correction"
        title="1.7 Classical Error Correction"
        prev={{ title: '1.6 Reversible Computation', path: `${BASE}#reversible-computation` }}
        next={{ title: '1.8 Complexity', path: `${BASE}#complexity` }}
      >
        <p>
          Physical wires and memory cells suffer bit flips from noise. <strong>Error-correcting codes</strong>{' '}
          add redundancy so the receiver can detect or correct errors. The simplest idea is repetition:
          send each bit three times and take a majority vote at decode time.
        </p>
        <Katex display>{`\\text{decode}(b_1, b_2, b_3) = \\mathbb{1}\\big[\\sum_i b_i \\geq 2\\big]`}</Katex>
        <p>
          More efficient codes (Hamming, Reed–Solomon) achieve better rate–distance tradeoffs. Quantum
          error correction generalizes these ideas to protect qubits — but the no-cloning theorem forbids
          naive repetition, requiring entanglement-based stabilizer codes instead.
        </p>

        <ErrorCorrectionDemo />

        <WorkedExample
          title="Majority vote with one error"
          steps={[
            { label: 'Encode bit 1 as three copies: (1, 1, 1).', latex: '1 \\mapsto (1,1,1)' },
            { label: 'Suppose wire 2 flips: received (1, 0, 1).', latex: '(1,0,1)' },
            { label: 'Count ones: two out of three. Majority = 1 — error corrected.', latex: '\\text{maj}(1,0,1) = 1' },
          ]}
        />

        <Checkpoint
          question="With a 3-bit repetition code, how many bit flips can be corrected?"
          answer="1"
          hint="Two matching bits outvote the third."
        />

        <p>
          Compare classical and quantum approaches in the{' '}
          <Link to="/playground/error-correction">Error Correction Simulator</Link> lab (later chapter).
        </p>
      </Section>

      <Section
        id="complexity"
        title="1.8 Complexity"
        prev={{ title: '1.7 Classical Error Correction', path: `${BASE}#classical-error-correction` }}
        next={{ title: '1.9 Turing Machines', path: `${BASE}#turing-machines` }}
      >
        <p>
          As problems scale, resource usage matters. <strong>Computational complexity</strong> classifies
          problems by how time or space grows with input size <Katex>{`n`}</Katex>. Polynomial growth is
          generally feasible; exponential growth becomes intractable quickly.
        </p>
        <Katex display>{`O(1) \\subset O(\\log n) \\subset O(n) \\subset O(n \\log n) \\subset O(n^2) \\subset O(2^n)`}</Katex>
        <p>
          The class P contains problems solvable in polynomial time on a deterministic Turing machine.
          NP contains problems whose solutions are verifiable in polynomial time. Whether P = NP remains
          open. Quantum complexity introduces BQP — problems efficiently solvable by quantum computers
          with bounded error.
        </p>

        <ComplexityGraph />

        <WorkedExample
          title="Compare O(n) vs O(2ⁿ) at n = 20"
          steps={[
            { label: 'Linear growth: 20 operations (up to constant factors).', latex: 'O(n):\\; n = 20' },
            { label: 'Exponential: 2²⁰ ≈ 1,048,576 operations.', latex: 'O(2^n):\\; 2^{20} = 1{,}048{,}576' },
            { label: 'The exponential algorithm is ~50,000× slower at this modest input size.', latex: '\\frac{2^{20}}{20} \\approx 52{,}000' },
          ]}
        />

        <Checkpoint
          question="Which grows faster for large n: O(n²) or O(2ⁿ)?"
          answer="O(2ⁿ)"
          hint="Exponential eventually dominates any polynomial."
        />

        <p>
          See the full complexity reference at{' '}
          <Link to="/reference/complexity">Complexity Classes</Link>.
        </p>
      </Section>

      <Section
        id="turing-machines"
        title="1.9 Turing Machines"
        prev={{ title: '1.8 Complexity', path: `${BASE}#complexity` }}
        next={{ title: 'Chapter 2: One Qubit', path: '/learn/one-qubit' }}
      >
        <p>
          A <strong>Turing machine</strong> is an abstract model of computation: a finite control, an
          infinite tape divided into cells, and a read/write head that moves left or right. Despite its
          simplicity, the model captures everything a modern computer can compute — the <strong>Church–Turing thesis</strong>{' '}
          equates intuitive "algorithm" with Turing-machine computability.
        </p>
        <Katex display>{`M = (Q, \\Sigma, \\Gamma, \\delta, q_0, q_{\\text{accept}}, q_{\\text{reject}})`}</Katex>
        <p>
          The transition function <Katex>{`\\delta`}</Katex> specifies, for each state and tape symbol,
          what to write, which direction to move, and the next state. A machine <strong>decides</strong>{' '}
          a language if it halts on every input, accepting members and rejecting non-members.
        </p>

        <div className="lab-panel">
          <h3 style={{ marginTop: 0 }}>Conceptual simulation: binary increment</h3>
          <p style={{ fontSize: '0.9rem' }}>
            Imagine a Turing machine that reads a binary number on its tape (least significant bit at the
            head), adds 1, and halts. The algorithm mirrors ripple carry: flip bits from right until a 0
            becomes 1 or a new leading 1 is needed.
          </p>
          <ol style={{ fontSize: '0.9rem', paddingLeft: '1.25rem' }}>
            <li>Start in "carry = 1" state at the LSB.</li>
            <li>If current cell is 0 and carry = 1: write 1, carry = 0, halt (or move left if more digits).</li>
            <li>If current cell is 1 and carry = 1: write 0, carry = 1, move left.</li>
            <li>If tape ends with carry = 1: extend with a new leading 1.</li>
          </ol>
          <p style={{ fontFamily: 'var(--font-mono)', marginBottom: 0 }}>
            Example: 1011₂ + 1 → 1100₂ (flip trailing 1s until the 0, then carry propagates).
          </p>
        </div>

        <WorkedExample
          title="TM decides strings ending in '01'"
          steps={[
            { label: 'Scan right until blank — remember the last two symbols seen.', latex: 'q_{\\text{scan}}' },
            { label: 'If the last two symbols are 0 then 1, accept.', latex: 'q_{\\text{accept}}' },
            { label: 'Otherwise reject. The machine uses finite memory (last two chars) despite unbounded tape.', latex: '|Q| = O(1) \\text{ states}' },
          ]}
        />

        <Checkpoint
          question="Can a Turing machine have infinitely many states?"
          answer="no"
          hint="The control is finite; only the tape is unbounded."
        />

        <Expandable title="Quantum circuits as a new model">
          <p>
            Quantum computers are not Turing machines with randomness — they extend the model with
            amplitudes, unitary evolution, and projective measurement. The class BQP captures what
            efficient quantum algorithms compute; it sits inside PSPACE and may extend beyond P for
            specific structured problems.
          </p>
        </Expandable>
      </Section>

      <div className="section-nav">
        <Link to="/learn">← All Chapters</Link>
        <Link to="/learn/one-qubit">Next: One Qubit →</Link>
      </div>
    </article>
  );
}

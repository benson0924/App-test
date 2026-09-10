import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
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
  const { tag, title, intro } = useChapterMeta('classical');
  const t = useT();
  return (
    <article>
      <span className="tag">{tag}</span>
      <h1>{title}</h1>
      <p style={{ color: 'var(--text-muted)' }}>{intro}</p>

      <LearnSection chapter="classical" sectionId="states-and-information"
        next={{ title: '1.2 Binary Numbers', path: `${BASE}#binary-numbers` }}
      
        widgets={<>
          <Katex display>{`|\\text{register}\\rangle \\in \\{0,1\\}^n, \\quad |\\{0,1\\}^n| = 2^n`}</Katex>
          <BitExplorer />
          <p>
                    Try the interactive explorer above, or open the{' '}
                    <Link to="/playground/binary-states">Binary State Explorer</Link> lab.
                  </p>
        </>}
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
      </LearnSection>

      <LearnSection chapter="classical" sectionId="binary-numbers"
        prev={{ title: '1.1 States and Information', path: `${BASE}#states-and-information` }}
        next={{ title: '1.3 Logic Gates', path: `${BASE}#logic-gates` }}
      
        widgets={<>
          <Katex display>{`N = \\sum_{i=0}^{n-1} b_i \\, 2^i, \\quad b_i \\in \\{0,1\\}`}</Katex>
          <BinaryConverter />
          <p>
                    Practice conversions in the{' '}
                    <Link to="/playground/binary-states">Binary State Explorer</Link> lab.
                  </p>
        </>}
      >
        <p>
                  Binary strings are not just abstract states — they encode numbers. Each position carries a
                  weight that is a power of two, read from right (least significant) to left (most significant).
                </p>
        <p>
                  Conversion between binary and decimal is a routine skill. Fixed-width representations pad
                  with leading zeros so that, for example, 5 becomes <code>0101</code> in 4 bits.
                </p>
      </LearnSection>

      <LearnSection chapter="classical" sectionId="logic-gates"
        prev={{ title: '1.2 Binary Numbers', path: `${BASE}#binary-numbers` }}
        next={{ title: '1.4 Boolean Algebra', path: `${BASE}#boolean-algebra` }}
      
        widgets={<>
          <Katex display>{`\\text{AND}(a,b) = ab, \\quad \\text{OR}(a,b) = a + b - ab, \\quad \\text{XOR}(a,b) = a \\oplus b`}</Katex>
          <TruthTableSimulator />
          <p>
                    Explore gate combinations in the{' '}
                    <Link to="/playground/logic-gates">Logic Gate Simulator</Link> lab.
                  </p>
        </>}
      >
        <p>
                  Computation is transformation. A <strong>logic gate</strong> takes one or more bits and
                  produces an output bit according to a fixed truth table. Gates are the building blocks of
                  circuits: combinational networks (no memory) and sequential machines (with feedback or clocks).
                </p>
        <p>Common gates include NOT (inverter), AND, OR, XOR, and their negated variants NAND and NOR.</p>
      </LearnSection>

      <LearnSection chapter="classical" sectionId="boolean-algebra"
        prev={{ title: '1.3 Logic Gates', path: `${BASE}#logic-gates` }}
        next={{ title: '1.5 Adders', path: `${BASE}#adders` }}
      
        widgets={<>
          <Katex display>{`\\overline{A \\land B} = \\bar{A} \\lor \\bar{B}, \\quad \\overline{A \\lor B} = \\bar{A} \\land \\bar{B} \\quad \\text{(De Morgan)}`}</Katex>
          <DeMorganDemo />
        </>}
      >
        <p>
                  Boolean algebra abstracts gates into symbols with algebraic laws: commutativity, associativity,
                  distributivity, identity elements, and complement. These laws let us simplify circuits and prove
                  gate networks equivalent without enumerating every input.
                </p>
        <p>
                  De Morgan's laws swap AND/OR under negation and are indispensable when translating between
                  positive and negative logic, or when optimizing chip area.
                </p>
      </LearnSection>

      <LearnSection chapter="classical" sectionId="adders"
        prev={{ title: '1.4 Boolean Algebra', path: `${BASE}#boolean-algebra` }}
        next={{ title: '1.6 Reversible Computation', path: `${BASE}#reversible-computation` }}
      
        widgets={<>
          <Katex display>{`\\text{sum} = a \\oplus b \\oplus c_{\\text{in}}, \\quad c_{\\text{out}} = (a \\land b) \\lor (c_{\\text{in}} \\land (a \\oplus b))`}</Katex>
          <RippleCarryDemo />
          <p>
                    Step through addition interactively in the{' '}
                    <Link to="/playground/binary-adder">Binary Adder</Link> lab.
                  </p>
        </>}
      >
        <p>
                  Arithmetic reduces to repeated bit operations. A <strong>half adder</strong> adds two bits
                  producing sum and carry; a <strong>full adder</strong> also accepts an incoming carry from
                  the previous (less significant) column. Chaining full adders yields a ripple-carry adder.
                </p>
      </LearnSection>

      <LearnSection chapter="classical" sectionId="reversible-computation"
        prev={{ title: '1.5 Adders', path: `${BASE}#adders` }}
        next={{ title: '1.7 Classical Error Correction', path: `${BASE}#classical-error-correction` }}
      
        widgets={<>
          <Katex display>{`\\text{CCNOT}(a,b,c) = (a,\\; b,\\; c \\oplus (a \\land b))`}</Katex>
          <ToffoliDemo />
        </>}
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
      </LearnSection>

      <LearnSection chapter="classical" sectionId="classical-error-correction"
        prev={{ title: '1.6 Reversible Computation', path: `${BASE}#reversible-computation` }}
        next={{ title: '1.8 Complexity', path: `${BASE}#complexity` }}
      
        widgets={<>
          <Katex display>{`\\text{decode}(b_1, b_2, b_3) = \\mathbb{1}\\big[\\sum_i b_i \\geq 2\\big]`}</Katex>
          <ErrorCorrectionDemo />
          <p>
                    Compare classical and quantum approaches in the{' '}
                    <Link to="/playground/error-correction">Error Correction Simulator</Link> lab (later chapter).
                  </p>
        </>}
      >
        <p>
                  Physical wires and memory cells suffer bit flips from noise. <strong>Error-correcting codes</strong>{' '}
                  add redundancy so the receiver can detect or correct errors. The simplest idea is repetition:
                  send each bit three times and take a majority vote at decode time.
                </p>
        <p>
                  More efficient codes (Hamming, Reed–Solomon) achieve better rate–distance tradeoffs. Quantum
                  error correction generalizes these ideas to protect qubits — but the no-cloning theorem forbids
                  naive repetition, requiring entanglement-based stabilizer codes instead.
                </p>
      </LearnSection>

      <LearnSection chapter="classical" sectionId="complexity"
        prev={{ title: '1.7 Classical Error Correction', path: `${BASE}#classical-error-correction` }}
        next={{ title: '1.9 Turing Machines', path: `${BASE}#turing-machines` }}
      
        widgets={<>
          <Katex display>{`O(1) \\subset O(\\log n) \\subset O(n) \\subset O(n \\log n) \\subset O(n^2) \\subset O(2^n)`}</Katex>
          <ComplexityGraph />
        </>}
      >
        <p>
                  As problems scale, resource usage matters. <strong>Computational complexity</strong> classifies
                  problems by how time or space grows with input size <Katex>{`n`}</Katex>. Polynomial growth is
                  generally feasible; exponential growth becomes intractable quickly.
                </p>
        <p>
                  The class P contains problems solvable in polynomial time on a deterministic Turing machine.
                  NP contains problems whose solutions are verifiable in polynomial time. Whether P = NP remains
                  open. Quantum complexity introduces BQP — problems efficiently solvable by quantum computers
                  with bounded error.
                </p>
        <p>
                  See the full complexity reference at{' '}
                  <Link to="/reference/complexity">Complexity Classes</Link>.
                </p>
      </LearnSection>

      <LearnSection chapter="classical" sectionId="turing-machines"
        prev={{ title: '1.8 Complexity', path: `${BASE}#complexity` }}
        next={{ title: 'Chapter 2: One Qubit', path: '/learn/one-qubit' }}
      
        widgets={<>
          <Katex display>{`M = (Q, \\Sigma, \\Gamma, \\delta, q_0, q_{\\text{accept}}, q_{\\text{reject}})`}</Katex>
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
        </>}
      >
        <p>
                  A <strong>Turing machine</strong> is an abstract model of computation: a finite control, an
                  infinite tape divided into cells, and a read/write head that moves left or right. Despite its
                  simplicity, the model captures everything a modern computer can compute — the <strong>Church–Turing thesis</strong>{' '}
                  equates intuitive "algorithm" with Turing-machine computability.
                </p>
        <p>
                  The transition function <Katex>{`\\delta`}</Katex> specifies, for each state and tape symbol,
                  what to write, which direction to move, and the next state. A machine <strong>decides</strong>{' '}
                  a language if it halts on every input, accepting members and rejecting non-members.
                </p>
      </LearnSection>

      <div className="section-nav">
        <Link to="/learn">← All Chapters</Link>
        <Link to="/learn/one-qubit">Next: One Qubit →</Link>
      </div>
    </article>
  );
}

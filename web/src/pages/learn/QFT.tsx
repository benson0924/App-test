import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Section from '@/components/Section';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import Expandable from '@/components/Expandable';
import { qft, iqft, basisState, C, stateLabel } from 'quantum-core';

function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

function QFTAmplitudeDemo() {
  const [n, setN] = useState(3);
  const [inputIdx, setInputIdx] = useState(1);
  const N = 1 << n;

  const amplitudes = useMemo(() => {
    const input = basisState(n, inputIdx);
    const output = qft(input);
    return output.amplitudes.map((a, i) => ({
      label: stateLabel(i, n),
      prob: C.mag2(a),
      re: a.re,
      im: a.im,
    }));
  }, [n, inputIdx]);

  const maxProb = Math.max(...amplitudes.map((a) => a.prob));

  return (
    <div className="lab-panel">
      <label>Number of qubits n = {n} (N = {N})</label>
      <input type="range" min={2} max={4} value={n} onChange={(e) => { setN(Number(e.target.value)); setInputIdx(0); }} />
      <label>Input basis state |x⟩: x = {inputIdx} = |{stateLabel(inputIdx, n)}⟩</label>
      <input type="range" min={0} max={N - 1} value={inputIdx} onChange={(e) => setInputIdx(Number(e.target.value))} />

      <p style={{ marginTop: '1rem' }}>
        After QFT, amplitudes spread across all {N} basis states — each |k⟩ has probability |⟨k|F<sub>N</sub>|x⟩|² = 1/N.
      </p>

      <div style={{ marginTop: '0.75rem' }}>
        {amplitudes.map((a) => (
          <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <span style={{ width: '48px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>|{a.label}⟩</span>
            <div style={{ flex: 1, height: '18px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${(a.prob / maxProb) * 100}%`, height: '100%', background: 'var(--accent)' }} />
            </div>
            <span style={{ width: '56px', fontSize: '0.75rem', textAlign: 'right' }}>{(a.prob * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        Measuring once yields one k — you cannot read all N amplitudes from a single run. The QFT lab visualizes full state vectors for small n.
      </p>
    </div>
  );
}

function IQFTDemo() {
  const [n] = useState(3);
  const [x] = useState(5);

  const roundTrip = useMemo(() => {
    const input = basisState(n, x);
    const transformed = qft(input);
    const restored = iqft(transformed);
    const fidelity = C.mag2(restored.amplitudes[x]);
    return { fidelity };
  }, [n, x]);

  return (
    <div className="lab-panel">
      <p>
        QFT then IQFT on |{stateLabel(x, n)}⟩ (n={n}): fidelity on original basis state ={' '}
        <strong>{(roundTrip.fidelity * 100).toFixed(2)}%</strong> (ideal: 100%).
      </p>
      <Katex display>{`F_N^\\dagger F_N = I \\quad \\text{(unitarity)}`}</Katex>
    </div>
  );
}

export default function QFT() {
  const omegaExample = useMemo(() => {
    const N = 8;
    const k = 3;
    const angle = (2 * Math.PI * k) / N;
    return { N, k, angleDeg: ((angle * 180) / Math.PI).toFixed(1) };
  }, []);

  return (
    <article>
      <h1>Chapter 9: Quantum Fourier Transform</h1>
      <p>
        The Quantum Fourier Transform (QFT) is the quantum analogue of the discrete Fourier transform.
        It maps computational-basis states to Fourier-basis states and is the engine behind phase
        estimation, period finding, and Shor&apos;s algorithm.
      </p>

      <Section id="9.1" title="9.1 Definition and ω_N" prev={{ title: 'Quantum Algorithms', path: '/learn/algorithms' }}>
        <p>
          For N = 2<sup>n</sup>, define the N-th root of unity:
        </p>
        <Katex display>{`\\omega_N = e^{2\\pi i / N}`}</Katex>
        <p>
          The QFT on an n-qubit register acts on computational basis |x⟩ as:
        </p>
        <Katex display>{`\\text{QFT}|x\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1} \\omega_N^{xk}|k\\rangle`}</Katex>

        <p>
          The QFT matrix F<sub>N</sub> has entries F<sub>kx</sub> = ω<sub>N</sub><sup>kx</sup> / √N.
          For example, with N = {omegaExample.N} and k = {omegaExample.k}: ω<sub>N</sub><sup>kx</sup> = e<sup>i·{omegaExample.angleDeg}°</sup>.
        </p>

        <Expandable title="Unitarity of F_N">
          <p>
            The rows (and columns) of F<sub>N</sub> are orthonormal because ∑<sub>x=0</sub><sup>N−1</sup> ω<sub>N</sub><sup>x(k−k&apos;)</sup> = N·δ<sub>kk&apos;</sub>.
            Therefore F<sub>N</sub><sup>†</sup>F<sub>N</sub> = I — the QFT is a valid quantum gate.
          </p>
          <Katex display>{`\\sum_{x=0}^{N-1} \\omega_N^{x(k-k')} = N\\,\\delta_{kk'}`}</Katex>
        </Expandable>

        <Checkpoint
          question="What is ω_N in terms of N?"
          answer="e^{2πi/N}"
          hint="Primitive N-th root of unity."
        />
      </Section>

      <Section id="9.2" title="9.2 The Measurement Warning">
        <p>
          A critical distinction from classical FFT: the QFT transforms <em>amplitudes</em>, not measured
          classical data. After QFT, the state is a superposition of all Fourier basis states.
        </p>

        <div className="card" style={{ borderLeft: '4px solid var(--warning, #c90)' }}>
          <p><strong>Warning:</strong> You cannot read all N amplitudes at once.</p>
          <p>
            A single measurement returns one outcome k with probability |⟨k|QFT|ψ⟩|². Extracting the
            full Fourier spectrum requires either many copies of the state or structured algorithms
            (e.g. phase estimation) that read out specific bits of k one at a time.
          </p>
        </div>

        <QFTAmplitudeDemo />

        <p>
          For input |x⟩, every output amplitude has magnitude 1/√N — the information about x is encoded
          in the <em>phases</em> ω<sub>N</sub><sup>xk</sup>, not in a single peak.
        </p>
      </Section>

      <Section id="9.3" title="9.3 Circuit Decomposition">
        <p>
          The QFT admits an efficient O(n²) gate circuit — exponentially faster than the O(N²) classical
          DFT matrix multiply for N = 2<sup>n</sup>.
        </p>

        <WorkedExample
          title="2-qubit QFT circuit"
          steps={[
            { label: 'Apply H to qubit 0 (MSB in big-endian convention).' },
            { label: 'Controlled phase R₂ on qubit 1, controlled by qubit 0: angle π/2.', latex: 'R_2 = \\begin{pmatrix}1&0\\\\0&e^{i\\pi/2}\\end{pmatrix}' },
            { label: 'Apply H to qubit 1.' },
            { label: 'Swap qubits to match standard bit ordering (optional).', latex: '\\text{QFT}_2 = (\\text{SWAP})\\, H_1\\, R_2\\, H_0' },
          ]}
        />

        <WorkedExample
          title="General n-qubit pattern"
          steps={[
            { label: 'For j = 0, …, n−1: apply H to qubit j, then controlled phases R_m from qubits j+1, …, n−1 with angles π/2^{m−j−1}.' },
            { label: 'After all Hadamards and phases, apply SWAP gates to reverse qubit order.', latex: 'O(n^2) \\text{ gates total}' },
            { label: 'Each controlled phase R_d = diag(1, e^{2\\pi i / 2^d}).', latex: 'R_d = \\begin{pmatrix}1&0\\\\0&e^{2\\pi i/2^d}\\end{pmatrix}' },
          ]}
        />

        <Expandable title="Product representation">
          <Katex display>{`\\text{QFT}|x_{n-1}\\cdots x_0\\rangle = \\bigotimes_{j=0}^{n-1} \\frac{|0\\rangle + e^{2\\pi i \\cdot 0.x_{n-1}\\cdots x_j}|1\\rangle}{\\sqrt{2}}`}</Katex>
          <p>
            This binary-fraction form connects directly to phase estimation: each control qubit captures
            one bit of a phase φ.
          </p>
        </Expandable>
      </Section>

      <Section id="9.4" title="9.4 Inverse QFT">
        <p>
          The inverse QFT (IQFT) uses the conjugate phases — replace ω<sub>N</sub> with ω<sub>N</sub><sup>−1</sup>:
        </p>
        <Katex display>{`\\text{QFT}^{-1}|k\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{x=0}^{N-1} \\omega_N^{-kx}|x\\rangle`}</Katex>

        <p>
          In circuit form: reverse the gate order and conjugate every phase angle (π/2<sup>d</sup> → −π/2<sup>d</sup>).
        </p>

        <IQFTDemo />

        <Checkpoint
          question="How does the IQFT differ from the QFT in the exponent?"
          answer="negative exponent"
          hint="Sign of 2πixk/N."
        />
      </Section>

      <Section id="9.5" title="9.5 Connection to Period Finding" next={{ title: 'Phase Estimation', path: '/learn/phase-estimation' }}>
        <p>
          Period finding — the core of Simon&apos;s and Shor&apos;s algorithms — exploits the QFT to
          extract periodicity from superposition states.
        </p>

        <WorkedExample
          title="Period finding sketch"
          steps={[
            { label: 'Prepare uniform superposition over x, compute f(x) into ancilla (or use phase oracle).' },
            { label: 'Measure or discard ancilla; input register collapses to superposition over x with the same f-value — a periodic state.', latex: '\\sum_x |x\\rangle \\to \\sum_{j=0}^{N/r-1} |x_0 + jr\\rangle' },
            { label: 'Apply QFT to the input register. Peaks appear at k multiples of N/r.', latex: '\\text{QFT} \\Rightarrow \\text{peaks at } k = \\lambda \\cdot N/r' },
            { label: 'Measure k; classical post-processing (continued fractions) recovers period r.', latex: 'r = N / \\gcd(k, N)' },
          ]}
        />

        <Expandable title="Hidden subgroup perspective">
          <p>
            The QFT succeeds when the function is constant on cosets of a hidden subgroup H of ℤ<sub>N</sub>
            (or ℤ<sub>2</sub><sup>n</sup> for Simon). Measuring Fourier basis states reveals information
            about H<sup>⊥</sup> — unifying Deutsch–Jozsa, Simon, and Shor as hidden-subgroup problems.
          </p>
        </Expandable>

        <LabLink id="qft" title="QFT Visualizer" />
        <p>
          See also: <Link to="/playground/period-finding">Period Explorer</Link> and{' '}
          <Link to="/learn/shor">Chapter 11: Shor&apos;s Algorithm</Link>.
        </p>
      </Section>
    </article>
  );
}

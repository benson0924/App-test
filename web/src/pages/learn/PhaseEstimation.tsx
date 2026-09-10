import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
import Checkpoint from '@/components/Checkpoint';
import WorkedExample from '@/components/WorkedExample';
import { phaseEstimation } from 'quantum-core';

function LabLink({ id, title }: { id: string; title: string }) {
  return (
    <p style={{ marginTop: '0.75rem' }}>
      <Link to={`/playground/${id}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Open full lab: {title} →
      </Link>
    </p>
  );
}

function PhaseEstimationDemo() {
  const [phi, setPhi] = useState(1 / 3);
  const [m, setM] = useState(6);

  const result = useMemo(
    () => phaseEstimation(phi, m),
    [phi, m]
  );

  const phiBinary = useMemo(() => {
    const bits: string[] = [];
    let frac = phi;
    for (let i = 0; i < m; i++) {
      frac *= 2;
      const bit = Math.floor(frac);
      bits.push(String(bit));
      frac -= bit;
    }
    return bits.join('');
  }, [phi, m]);

  return (
    <div className="lab-panel">
      <label>True phase φ = {phi.toFixed(4)} (fraction of full rotation)</label>
      <input
        type="range"
        min={0}
        max={1000}
        value={Math.round(phi * 1000)}
        onChange={(e) => setPhi(Number(e.target.value) / 1000)}
      />
      <label>Precision qubits m = {m}</label>
      <input type="range" min={3} max={10} value={m} onChange={(e) => setM(Number(e.target.value))} />

      <table className="data-table" style={{ marginTop: '1rem', maxWidth: '480px' }}>
        <tbody>
          <tr><td>True φ (binary)</td><td><code>0.{phiBinary}</code></td></tr>
          <tr><td>Estimated φ</td><td><strong>{result.estimate.toFixed(6)}</strong></td></tr>
          <tr><td>Measured bit string</td><td><code>{result.binary}</code></td></tr>
          <tr><td>|φ − φ̂|</td><td>{result.error.toFixed(6)}</td></tr>
        </tbody>
      </table>

      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 0 }}>
        With m precision qubits, readout approximates φ to m binary digits after the decimal point.
      </p>
    </div>
  );
}

export default function PhaseEstimation() {
  const { tag, title, intro } = useChapterMeta('phaseEstimation');
  const t = useT();
  return (
    <article>
      <h1>{title}</h1>
      <p>
        Quantum Phase Estimation (QPE) reads out the eigenvalue phase of a unitary operator — the
        subroutine that connects the QFT to Shor&apos;s algorithm and quantum chemistry simulations.
      </p>

      <LearnSection chapter="phaseEstimation" sectionId="10.1" prev={{ title: 'Quantum Fourier Transform', path: '/learn/qft' }}>
        <p>
          Given a unitary U with eigenstate |u⟩ and eigenvalue e<sup>2πiφ</sup>:
        </p>
        <Katex display>{`U|u\\rangle = e^{2\\pi i \\phi}|u\\rangle`}</Katex>
        <p>
          The goal is to estimate the phase φ ∈ [0, 1) (as a fraction of a full rotation) to m bits
          of precision using m ancillary control qubits and O(m) controlled applications of U.
        </p>


        <LabLink id="phase-estimation" title="Phase Estimation" />
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.2">
        <p>
          The standard circuit uses m control qubits and one target qubit prepared in |u⟩:
        </p>

        <Katex display>{`|0\\rangle^{\\otimes m}|u\\rangle \\xrightarrow{H^{\\otimes m}} \\xrightarrow{\\text{controlled-}U^{2^j}} \\xrightarrow{\\text{QFT}^{-1}} |\\tilde{\\phi}\\rangle|u\\rangle`}</Katex>

        <WorkedExample
          title="Controlled-U powers"
          steps={[
            { label: 'Prepare m control qubits in |+⟩⊗m and target in eigenstate |u⟩.', latex: '|+\\rangle^{\\otimes m}|u\\rangle' },
            { label: 'Apply controlled-U^{2^j} from control qubit j (j = 0, …, m−1). Each control picks up phase e^{2πiφ·2^j}.', latex: '|j\\rangle|u\\rangle \\to |j\\rangle e^{2\\pi i \\phi \\cdot 2^j}|u\\rangle' },
            { label: 'Control register becomes ∑_j e^{2πiφ·2^j}|j⟩ — a Fourier-like superposition encoding φ in binary.', latex: '\\sum_{j=0}^{m-1} e^{2\\pi i \\phi \\cdot 2^j}|j\\rangle' },
            { label: 'Apply inverse QFT on controls. Measure to obtain m-bit binary approximation of φ.', latex: '|\\tilde{\\phi}\\rangle = |0.\\phi_1 \\phi_2 \\cdots \\phi_m\\rangle' },
          ]}
        />

        <Checkpoint
          question="What operation follows the controlled-U^{2^j} gates on the control register?"
          answer="inverse QFT"
          hint="Converts phase kickback into binary readout."
        />
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.3">
        <p>
          The measurement outcome is interpreted as a binary fraction:
        </p>
        <Katex display>{`\\tilde{\\phi} = 0.\\phi_1 \\phi_2 \\cdots \\phi_m = \\sum_{j=1}^{m} \\frac{\\phi_j}{2^j}`}</Katex>
        <p>
          Control qubit j (0-indexed from the top) encodes bit φ<sub>j+1</sub> — the j-th digit after
          the binary point. This is exactly the inverse QFT extracting each bit of the phase.
        </p>

      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.4">
        <WorkedExample
          title="Estimating φ = 1/3 with m = 6 qubits"
          steps={[
            { label: 'Write φ = 1/3 in binary: 0.010101… (repeating).', latex: '\\phi = \\tfrac{1}{3} = 0.\\overline{010101}_2' },
            { label: 'U|u⟩ = e^{2πi/3}|u⟩. Controlled-U^{2^0} adds phase e^{2πi/3}; U^{2^1} adds e^{4πi/3}; etc.', latex: 'e^{2\\pi i \\phi \\cdot 2^j} = e^{2\\pi i \\cdot 2^j / 3}' },
            { label: 'After inverse QFT with m = 6, measurement yields ≈ 0.010101 = 21/64 ≈ 0.328.', latex: '\\tilde{\\phi} \\approx \\tfrac{21}{64} = 0.328125' },
            { label: 'Error |1/3 − 21/64| ≈ 0.005. Adding qubits improves accuracy.', latex: '|\\phi - \\tilde{\\phi}| < \\tfrac{1}{2^m} \\text{ (ideal case)}' },
          ]}
        />

        <PhaseEstimationDemo />

        <p>
          Run the demo above with φ = 1/3 and m = 6 to see the simulated estimate, binary string, and error
          from our <code>quantum-core</code> phase estimation routine.
        </p>
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.5">
        <p>
          With m precision qubits, QPE approximates φ to m binary digits (under ideal conditions):
        </p>
        <Katex display>{`|\\phi - \\tilde{\\phi}| < \\frac{1}{2^m}`}</Katex>

        <table className="data-table" style={{ maxWidth: '480px' }}>
          <thead>
            <tr><th>Precision qubits m</th><th>Max error 2<sup>−m</sup></th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td>4</td><td>0.0625</td><td>Coarse phase estimate</td></tr>
            <tr><td>8</td><td>≈ 0.004</td><td>Moderate precision</td></tr>
            <tr><td>12</td><td>≈ 0.00024</td><td>Shor-scale periods</td></tr>
            <tr><td>2n + ⌈log(1/ε)⌉</td><td>ε</td><td>Standard complexity bound</td></tr>
          </tbody>
        </table>


        <Checkpoint
          question="How many bits of φ does m precision qubits provide (ideally)?"
          answer="m"
        />
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.6" next={{ title: "Shor's Algorithm", path: '/learn/shor' }}>
        <p>
          Shor&apos;s factoring algorithm reduces to: find period r of f(x) = a<sup>x</sup> mod N, then
          compute gcd(a<sup>r/2</sup> ± 1, N). The modular multiplication unitary
        </p>
        <Katex display>{`U|y\\rangle = |ay \\bmod N\\rangle`}</Katex>
        <p>
          has eigenphases s/r for integers s. QPE estimates s/r; continued fractions extract r.
        </p>


        <LabLink id="phase-estimation" title="Phase Estimation" />
        <p>
          Next: <Link to="/learn/shor">Chapter 11 — Shor&apos;s Algorithm</Link> ·{' '}
          <Link to="/playground/period-finding">Period Explorer</Link>
        </p>
      </LearnSection>
    </article>
  );
}

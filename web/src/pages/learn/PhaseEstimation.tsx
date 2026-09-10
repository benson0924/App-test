import { useChapterMeta, LearnSection } from '@/components/LocalizedContent';
import { useT } from '@/context/LocaleContext';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Katex from '@/components/Math';
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

      <LearnSection chapter="phaseEstimation" sectionId="10.1" prev={{ title: 'Quantum Fourier Transform', path: '/learn/qft' }}
        widgets={<>
          <Katex display>{`U|u\\rangle = e^{2\\pi i \\phi}|u\\rangle`}</Katex>
          <LabLink id="phase-estimation" title="Phase Estimation" />
        </>}
      >
        <p>
                  Given a unitary U with eigenstate |u⟩ and eigenvalue e<sup>2πiφ</sup>:
                </p>
        <p>
                  The goal is to estimate the phase φ ∈ [0, 1) (as a fraction of a full rotation) to m bits
                  of precision using m ancillary control qubits and O(m) controlled applications of U.
                </p>
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.2"
        widgets={<>
          <Katex display>{`|0\\rangle^{\\otimes m}|u\\rangle \\xrightarrow{H^{\\otimes m}} \\xrightarrow{\\text{controlled-}U^{2^j}} \\xrightarrow{\\text{QFT}^{-1}} |\\tilde{\\phi}\\rangle|u\\rangle`}</Katex>
        </>}
      >
        <p>
                  The standard circuit uses m control qubits and one target qubit prepared in |u⟩:
                </p>
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.3"
        widgets={<>
          <Katex display>{`\\tilde{\\phi} = 0.\\phi_1 \\phi_2 \\cdots \\phi_m = \\sum_{j=1}^{m} \\frac{\\phi_j}{2^j}`}</Katex>
        </>}
      >
        <p>
                  The measurement outcome is interpreted as a binary fraction:
                </p>
        <p>
                  Control qubit j (0-indexed from the top) encodes bit φ<sub>j+1</sub> — the j-th digit after
                  the binary point. This is exactly the inverse QFT extracting each bit of the phase.
                </p>
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.4"
        widgets={<>
          <PhaseEstimationDemo />
        </>}
      >
        <p>
                  Run the demo above with φ = 1/3 and m = 6 to see the simulated estimate, binary string, and error
                  from our <code>quantum-core</code> phase estimation routine.
                </p>
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.5"
        widgets={<>
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
        </>}
      >
        <p>
                  With m precision qubits, QPE approximates φ to m binary digits (under ideal conditions):
                </p>
      </LearnSection>

      <LearnSection chapter="phaseEstimation" sectionId="10.6" next={{ title: "Shor's Algorithm", path: '/learn/shor' }}
        widgets={<>
          <Katex display>{`U|y\\rangle = |ay \\bmod N\\rangle`}</Katex>
          <LabLink id="phase-estimation" title="Phase Estimation" />
          <p>
                    Next: <Link to="/learn/shor">Chapter 11 — Shor&apos;s Algorithm</Link> ·{' '}
                    <Link to="/playground/period-finding">Period Explorer</Link>
                  </p>
        </>}
      >
        <p>
                  Shor&apos;s factoring algorithm reduces to: find period r of f(x) = a<sup>x</sup> mod N, then
                  compute gcd(a<sup>r/2</sup> ± 1, N). The modular multiplication unitary
                </p>
        <p>
                  has eigenphases s/r for integers s. QPE estimates s/r; continued fractions extract r.
                </p>
      </LearnSection>
    </article>
  );
}

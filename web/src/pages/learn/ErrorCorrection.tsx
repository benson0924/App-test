import Section from '../../components/Section';
import Katex from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function ErrorCorrection() {
  return (
    <article>
      <h1>Quantum Error Correction</h1>
      <p>Chapter 5 — protecting quantum information from decoherence and gate noise.</p>

      <Section id="5.1" title="5.1 Why QEC?" prev={{ title: 'Quantum Circuits', path: '/learn/circuits' }}>
        <p>Quantum hardware suffers bit-flip (X), phase-flip (Z), and combined errors. Without encoding, long computations decohere rapidly.</p>
        <Checkpoint question="Name one discrete error on a single qubit." answer="bit flip" hint="X error." />
      </Section>

      <Section id="5.2" title="5.2 Three-qubit bit-flip code">
        <Katex display>{`|0\\rangle_L = |000\\rangle, \\quad |1\\rangle_L = |111\\rangle`}</Katex>
        <WorkedExample title="Detect error on qubit 1" steps={[
          { label: 'Encode |1⟩ → |111⟩ via CNOTs from qubit 0.' },
          { label: 'Bit-flip on qubit 1 → |101⟩.' },
          { label: 'Syndrome Z₀Z₁ = 1, Z₁Z₂ = 0 identifies qubit 1.' },
          { label: 'Apply X on qubit 1 to recover.' },
        ]} />
        <p><Link to="/playground/error-correction">Error Correction Simulator →</Link></p>
      </Section>

      <Section id="5.3" title="5.3 Stabilizer view">
        <p>Stabilizers +I commute with the code space. Measuring stabilizers yields syndromes without collapsing logical information.</p>
        <Expandable title="Phase-flip code">
          <p>The three-qubit phase code protects against Z errors using X-basis parity checks — dual to the bit-flip code.</p>
        </Expandable>
      </Section>

      <Section id="5.4" title="5.4 Threshold &amp; fault tolerance" next={{ title: 'Entanglement', path: '/learn/entanglement' }}>
        <p>Below a physical error threshold, concatenated or surface codes enable arbitrarily long logical computations — in principle.</p>
        <Checkpoint question="Does QEC require measuring the logical qubit directly?" answer="no" hint="Syndrome measurements." />
      </Section>
    </article>
  );
}

import Section from '../../components/Section';
import Math from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function PhaseEstimation() {
  return (
    <article>
      <h1>Quantum Phase Estimation</h1>

      <Section id="10.1" title="Problem statement" prev={{ title: 'Quantum Fourier Transform', path: '/learn/qft' }}>
        <Math display>{`U|\\psi\\rangle = e^{2\\pi i \\phi}|\\psi\\rangle \\Rightarrow \\text{estimate } \\phi`}</Math>
        <p><Link to="/playground/phase-estimation">Phase Estimation lab →</Link></p>
      </Section>

      <Section id="10.2" title="Controlled powers">
        <WorkedExample title="Extract bits of φ" steps={[
          { label: 'Prepare superposition on t control qubits.' },
          { label: 'Apply controlled-U^{2^j} for each control j.' },
          { label: 'Inverse QFT on controls → binary fraction of φ.' },
        ]} />
      </Section>

      <Section id="10.3" title="Precision">
        <Checkpoint question="t precision qubits give how many bits of φ?" answer="t" />
      </Section>

      <Section id="10.4" title="Role in Shor" next={{ title: "Shor's Algorithm", path: '/learn/shor' }}>
        <Expandable title="Modular multiplication unitary">
          <p>Shor implements controlled modular multiplication whose eigenphases encode 1/r for the order r of a mod N.</p>
        </Expandable>
      </Section>
    </article>
  );
}

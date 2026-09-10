import Section from '../../components/Section';
import Math from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function QFT() {
  return (
    <article>
      <h1>Quantum Fourier Transform</h1>

      <Section id="9.1" title="Definition" prev={{ title: 'Quantum Algorithms', path: '/learn/algorithms' }}>
        <Math display>{`\\text{QFT}|x\\rangle = \\frac{1}{\\sqrt{N}}\\sum_{k=0}^{N-1} e^{2\\pi i xk/N}|k\\rangle`}</Math>
        <p>The QFT maps computational basis to Fourier basis — enabling phase/period information extraction.</p>
        <p><Link to="/playground/qft">QFT Visualizer →</Link></p>
      </Section>

      <Section id="9.2" title="Circuit implementation">
        <WorkedExample title="2-qubit QFT structure" steps={[
          { label: 'Hadamard on qubit 0 + controlled phases.' },
          { label: 'Hadamard on qubit 1.' },
          { label: 'Swap qubits for standard bit ordering.' },
        ]} />
      </Section>

      <Section id="9.3" title="Inverse QFT">
        <Checkpoint question="IQFT conjugates phases how?" answer="negative exponent" hint="Sign of 2πixk/N." />
      </Section>

      <Section id="9.4" title="Period finding link" next={{ title: 'Phase Estimation', path: '/learn/phase-estimation' }}>
        <Expandable title="Hidden subgroup perspective">
          <p>QFT succeeds when the function is constant on cosets of a hidden subgroup — unifying DJ, Simon, and Shor.</p>
        </Expandable>
      </Section>
    </article>
  );
}

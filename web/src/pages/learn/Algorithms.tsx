import Section from '../../components/Section';
import Katex from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function Algorithms() {
  return (
    <article>
      <h1>Quantum Algorithms</h1>
      <p>Oracles, early promise algorithms, and search — Chapter overview.</p>

      <Section id="8.1" title="8.1 Oracle model" prev={{ title: 'Quantum Protocols', path: '/learn/protocols' }}>
        <p>Algorithms query a black-box U_f |x⟩|y⟩ = |x⟩|y ⊕ f(x)⟩. Query complexity counts oracle calls.</p>
        <Checkpoint question="Deutsch solves what problem on one bit?" answer="constant vs balanced" />
      </Section>

      <Section id="8.2" title="8.2 Deutsch &amp; Deutsch–Jozsa">
        <p><Link to="/playground/deutsch">Deutsch lab</Link> · <Link to="/playground/deutsch-jozsa">Deutsch–Jozsa lab</Link></p>
        <Katex display>{`\\text{DJ: 1 query vs } 2^{n-1}+1 \\text{ classically (worst case)}`}</Katex>
      </Section>

      <Section id="8.3" title="8.3 Bernstein–Vazirani">
        <WorkedExample title="Recover hidden string s" steps={[
          { label: 'Oracle implements f(x) = s·x mod 2.' },
          { label: 'Apply H^{⊗n}, oracle, H^{⊗n}.' },
          { label: 'Measure to read s directly.' },
        ]} />
        <p><Link to="/playground/bernstein-vazirani">Bernstein–Vazirani lab →</Link></p>
      </Section>

      <Section id="8.4" title="8.4 Simon">
        <p>Find period s of f with f(x) = f(x ⊕ s). Precursor to Shor&apos;s structure.</p>
        <p><Link to="/playground/simon">Simon&apos;s Algorithm lab →</Link></p>
      </Section>

      <Section id="8.5" title="8.5 Grover search" next={{ title: 'Quantum Fourier Transform', path: '/learn/qft' }}>
        <Katex display>{`O(\\sqrt{N}) \\text{ queries vs } O(N) \\text{ classically}`}</Katex>
        <Expandable title="Optimality">
          <p>Grover&apos;s algorithm is optimal for unstructured search up to constants — quadratic speedup is the limit.</p>
        </Expandable>
        <p><Link to="/playground/grover">Grover Search lab →</Link></p>
      </Section>
    </article>
  );
}

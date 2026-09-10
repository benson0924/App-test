import Section from '../../components/Section';
import Math from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function Protocols() {
  return (
    <article>
      <h1>Quantum Protocols</h1>
      <p>Chapter 7 — communication primitives using entanglement and quantum channels.</p>

      <Section id="7.1" title="7.1 Teleportation" prev={{ title: 'Entanglement', path: '/learn/entanglement' }}>
        <p>Transfer an unknown qubit using one ebit + two classical bits — no cloning required.</p>
        <Math display>{`|\\psi\\rangle \\xrightarrow{\\text{ebit + 2 bits}} |\\psi\\rangle`}</Math>
        <p><Link to="/playground/teleportation">Teleportation lab →</Link></p>
      </Section>

      <Section id="7.2" title="7.2 Superdense coding">
        <WorkedExample title="Encode two bits with one qubit transmission" steps={[
          { label: 'Share |Φ⁺⟩ between Alice and Bob.' },
          { label: 'Alice applies I, X, Z, or XZ for (00), (01), (10), (11).' },
          { label: 'Alice sends her qubit; Bob decodes with CNOT + H.' },
        ]} />
        <p><Link to="/playground/superdense">Superdense Coding lab →</Link></p>
      </Section>

      <Section id="7.3" title="7.3 BB84 key distribution">
        <p>Alice and Bob use random Z/X bases; matching bases sift a shared key. Eavesdropping raises error rates.</p>
        <Checkpoint question="What does Eve's random basis cause?" answer="errors" hint="Wrong basis randomizes outcome." />
        <p><Link to="/playground/bb84">BB84 Simulator →</Link></p>
      </Section>

      <Section id="7.4" title="7.4 CHSH as device test">
        <p>CHSH tests can certify entanglement quality in DI-oriented frameworks (with strong assumptions spelled out separately).</p>
      </Section>

      <Section id="7.5" title="7.5 Security sketch" next={{ title: 'Quantum Algorithms', path: '/learn/algorithms' }}>
        <Expandable title="Information-theoretic vs computational security">
          <p>BB84 with ideal devices offers information-theoretic security against passive eavesdropping; real deployments add authentication, error correction, and privacy amplification.</p>
        </Expandable>
      </Section>
    </article>
  );
}

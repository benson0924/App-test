import Section from '../../components/Section';
import Katex from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function Entanglement() {
  return (
    <article>
      <h1>Entanglement &amp; Bell Correlations</h1>
      <p>Non-classical correlations between separated quantum systems.</p>

      <Section id="6.1" title="Bell correlations" prev={{ title: 'Error Correction', path: '/learn/error-correction' }}>
        <Katex display>{`|\\Phi^-\\rangle = \\frac{|01\\rangle - |10\\rangle}{\\sqrt{2}}`}</Katex>
        <p>Singlet states show perfect anti-correlations in matched measurement bases — stronger than any local hidden-variable model allows.</p>
        <p><Link to="/playground/chsh">CHSH experiment lab →</Link></p>
      </Section>

      <Section id="6.2" title="CHSH inequality">
        <Katex display>{`S = E(a,b) + E(a,b') + E(a',b) - E(a',b') \\leq 2 \\text{ (classical)}`}</Katex>
        <WorkedExample title="Quantum violation" steps={[
          { label: 'Choose angles achieving Tsirelson bound |S| ≤ 2√2.' },
          { label: 'Quantum mechanics predicts S ≈ 2√2 for optimal settings.' },
          { label: 'Experiments consistently violate classical bound (within experimental caveats).' },
        ]} />
      </Section>

      <Section id="6.3" title="No-signaling">
        <Checkpoint question="Can Alice send a message by choosing her measurement angle?" answer="no" />
        <Expandable title="Why not?">
          <p>Marginal outcomes at Bob&apos;s side are independent of Alice&apos;s setting — only correlations change.</p>
        </Expandable>
      </Section>

      <Section id="6.4" title="Entanglement as resource" next={{ title: 'Quantum Protocols', path: '/learn/protocols' }}>
        <p>Entanglement enables teleportation, superdense coding, and many algorithms — but it must be established before use.</p>
        <p><Link to="/playground/entanglement">Entanglement Measurement lab →</Link></p>
      </Section>
    </article>
  );
}

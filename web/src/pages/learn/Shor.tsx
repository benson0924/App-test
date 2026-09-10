import Section from '../../components/Section';
import Katex from '../../components/Math';
import Checkpoint from '../../components/Checkpoint';
import WorkedExample from '../../components/WorkedExample';
import Expandable from '../../components/Expandable';
import { Link } from 'react-router-dom';

export default function Shor() {
  return (
    <article>
      <h1>Shor&apos;s Algorithm</h1>
      <p>Factoring via period finding — demo with N = 15.</p>

      <Section id="11.1" title="Reduction to period finding" prev={{ title: 'Phase Estimation', path: '/learn/phase-estimation' }}>
        <Katex display>{`a^r \\equiv 1 \\pmod{N} \\Rightarrow \\gcd(a^{r/2}\\pm 1, N) \\text{ may factor } N`}</Katex>
        <p><Link to="/playground/shor">Shor Demo (N=15) →</Link> · <Link to="/playground/period-finding">Period Explorer →</Link></p>
      </Section>

      <Section id="11.2" title="Factoring 15 demo">
        <WorkedExample title="a = 7, N = 15" steps={[
          { label: 'Sequence 7^x mod 15: 1, 7, 4, 13, 1, … period r = 4.' },
          { label: '7² mod 15 = 4 → gcd(4−1, 15) = 3, gcd(4+1, 15) = 5.' },
          { label: '15 = 3 × 5.' },
        ]} />
      </Section>

      <Section id="11.3" title="Complexity">
        <Checkpoint question="Shor runs in what time on a fault-tolerant machine?" answer="polynomial" hint="In n = log N." />
      </Section>

      <Section id="11.4" title="Cryptographic impact" next={{ title: 'Modern Topics', path: '/learn/modern' }}>
        <Expandable title="Post-quantum cryptography">
          <p>RSA/DH based on factoring/discrete log are vulnerable to Shor; NIST PQC standards (e.g., lattice schemes) use different assumptions — migration is underway but not because every cipher is already broken on today&apos;s NISQ devices.</p>
        </Expandable>
      </Section>
    </article>
  );
}

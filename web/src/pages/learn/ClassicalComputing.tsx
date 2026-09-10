import Section from '../../components/Section';

export default function ClassicalComputing() {
  return (
    <article>
      <h1>Classical Computing</h1>
      <Section id="1.1" title="Bits and registers" next={{ title: 'One Qubit', path: '/learn/one-qubit' }}>
        <p>Classical information is stored in bits — deterministic 0 or 1 values. Registers of n bits encode one of 2ⁿ states at a time.</p>
      </Section>
    </article>
  );
}

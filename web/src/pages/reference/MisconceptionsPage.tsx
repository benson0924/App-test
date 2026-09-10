import { useLocalizedMisconceptions } from '@/data/localizedNavigation';
import { useT } from '@/context/LocaleContext';

export default function MisconceptionsPage() {
  const t = useT();
  const misconceptions = useLocalizedMisconceptions();

  return (
    <article>
      <h1>{t('reference.index.misconceptions.title')}</h1>
      {misconceptions.map(({ myth, correction }, i) => (
        <div key={i} className="card">
          <p><strong>Myth:</strong> {myth}</p>
          <p style={{ marginBottom: 0 }}><strong>Correction:</strong> {correction}</p>
        </div>
      ))}
    </article>
  );
}

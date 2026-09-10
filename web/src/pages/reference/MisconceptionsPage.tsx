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
          <p><strong>{t('reference.misconceptions.myth')}</strong> {myth}</p>
          <p style={{ marginBottom: 0 }}><strong>{t('reference.misconceptions.correction')}</strong> {correction}</p>
        </div>
      ))}
    </article>
  );
}

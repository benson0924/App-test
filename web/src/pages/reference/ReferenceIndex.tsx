import { Link } from 'react-router-dom';
import { useT } from '@/context/LocaleContext';

const PAGE_KEYS = ['gates', 'formulas', 'complexity', 'glossary', 'misconceptions'] as const;

export default function ReferenceIndex() {
  const t = useT();

  return (
    <div>
      <h1>{t('reference.index.title')}</h1>
      <div className="grid-2">
        {PAGE_KEYS.map((key) => (
          <Link key={key} to={`/reference/${key === 'gates' ? 'gates' : key}`} className="card" style={{ textDecoration: 'none' }}>
            <h3>{t(`reference.index.${key}.title`)}</h3>
            <p>{t(`reference.index.${key}.desc`)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

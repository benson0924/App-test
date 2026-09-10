import Katex from '@/components/Math';
import Expandable from '@/components/Expandable';
import Checkpoint from '@/components/Checkpoint';
import { useT } from '@/context/LocaleContext';

const ROW_KEYS = ['deutsch', 'deutschJozsa', 'bernsteinVazirani', 'grover', 'shor', 'simon', 'stateSimulation'] as const;

export default function ComplexityPage() {
  const t = useT();

  return (
    <article>
      <h1>{t('reference.complexity.title')}</h1>
      <p>{t('reference.complexity.intro')}</p>

      <h2>{t('reference.complexity.tableTitle')}</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>{t('reference.complexity.colAlgorithm')}</th>
            <th>{t('reference.complexity.colProblem')}</th>
            <th>{t('reference.complexity.colClassical')}</th>
            <th>{t('reference.complexity.colQuantum')}</th>
            <th>{t('reference.complexity.colNotes')}</th>
          </tr>
        </thead>
        <tbody>
          {ROW_KEYS.map((key) => (
            <tr key={key}>
              <td><strong>{t(`reference.complexity.rows.${key}.algorithm`)}</strong></td>
              <td>{t(`reference.complexity.rows.${key}.problem`)}</td>
              <td className="mono">{t(`reference.complexity.rows.${key}.classical`)}</td>
              <td className="mono">{t(`reference.complexity.rows.${key}.quantum`)}</td>
              <td style={{ fontSize: '0.875rem' }}>{t(`reference.complexity.rows.${key}.notes`)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{t('reference.complexity.bqpTitle')}</h2>
      <div className="card">
        <p>{t('reference.complexity.bqpIntro')}</p>
        <Katex display>{`\\text{BQP} = \\{ L : \\exists \\text{ poly-time uniform QC family } \\{U_n\\}, \\Pr[\\text{accept}] \\geq \\tfrac{2}{3} \\text{ if } x \\in L \\}`}</Katex>
        <Katex display>{`\\text{P} \\subseteq \\text{BQP} \\subseteq \\text{PSPACE} \\subseteq \\text{EXP}`}</Katex>
        <p>{t('reference.complexity.bqpContainments')}</p>
      </div>

      <h2>{t('reference.complexity.cautionTitle')}</h2>
      <div className="card" style={{ borderLeft: '4px solid var(--warning, #c9a227)' }}>
        <p>{t('reference.complexity.cautionIntro')}</p>
        <ul>
          <li>{t('reference.complexity.cautionGrover')}</li>
          <li>{t('reference.complexity.cautionPromise')}</li>
          <li>{t('reference.complexity.cautionSampling')}</li>
        </ul>
        <Katex display>{`\\text{NP} \\stackrel{?}{\\subseteq} \\text{BQP} \\quad \\text{(open as of 2026)}`}</Katex>
      </div>

      <Expandable title={t('reference.complexity.queryVsTime')}>
        <p>{t('reference.complexity.queryVsTimeBody')}</p>
      </Expandable>

      <Expandable title={t('reference.complexity.faultTolerance')}>
        <p>{t('reference.complexity.faultToleranceBody')}</p>
      </Expandable>

      <Checkpoint
        question={t('reference.complexity.checkpointQ')}
        answer="no"
        hint={t('reference.complexity.checkpointHint')}
      />
    </article>
  );
}

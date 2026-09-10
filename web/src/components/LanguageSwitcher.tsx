import { useLocale } from '@/context/LocaleContext';
import type { Locale } from '@/i18n/types';

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, locales, t } = useLocale();

  return (
    <div className={compact ? 'lang-switcher lang-switcher-compact' : 'lang-switcher'}>
      {!compact && (
        <span className="lang-switcher-label">{t('common.language.label')}</span>
      )}
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        aria-label={t('common.language.label')}
        className="lang-switcher-select"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  );
}

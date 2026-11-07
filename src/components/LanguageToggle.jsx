import { useLanguage } from '../context/LanguageContext';
import { GlobeIcon } from './Icons';

const OPTIONS = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
];

function Segmented({ lang, setLang, ariaLabel }) {
  return (
    <div role="group" aria-label={ariaLabel} className="flex items-center gap-1">
      {OPTIONS.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
            lang === o.code ? 'bg-green-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Pilihan bahasa ID | EN.
 *  - variant="sidebar": satu baris menu (dipakai di sidebar & menu HP)
 *  - variant="icon":    pil kecil (dipakai di navbar)
 */
export default function LanguageToggle({ variant = 'icon', className = '' }) {
  const { lang, setLang, t } = useLanguage();

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center justify-between gap-3 px-4 py-2.5 ${className}`}>
        <span className="flex items-center gap-3">
          <GlobeIcon className="w-5 h-5" /> {t('lang.label')}
        </span>
        <Segmented lang={lang} setLang={setLang} ariaLabel={t('lang.aria')} />
      </div>
    );
  }

  return (
    <div
      className={`relative z-20 flex items-center rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur-sm p-1 ${className}`}
    >
      <Segmented lang={lang} setLang={setLang} ariaLabel={t('lang.aria')} />
    </div>
  );
}

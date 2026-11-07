import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { SunIcon, MoonIcon } from './Icons';

/**
 * Tombol ganti tema.
 *  - variant="sidebar": tampil sebagai item menu (dipakai di sidebar & menu HP)
 *  - variant="icon":    tombol bulat kecil (dipakai di navbar)
 */
export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const isLight = theme === 'light';
  const label = isLight ? t('theme.toDark') : t('theme.toLight');
  const Icon = isLight ? MoonIcon : SunIcon;

  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl text-left hover:bg-slate-900/50 hover:text-slate-200 transition-colors ${className}`}
      >
        <Icon className="w-5 h-5" /> {isLight ? t('theme.dark') : t('theme.light')}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative z-20 w-10 h-10 rounded-full border border-slate-700 hover:border-green-500/60 flex items-center justify-center text-slate-300 hover:text-green-400 bg-slate-900/60 backdrop-blur-sm transition-colors cursor-pointer ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

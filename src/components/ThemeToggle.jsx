import { useTheme } from '../context/ThemeContext';

/**
 * Tombol ganti tema.
 *  - variant="sidebar": tampil sebagai item menu (dipakai di sidebar & menu HP)
 *  - variant="icon":    tombol bulat kecil (dipakai di navbar)
 */
export default function ThemeToggle({ variant = 'icon', className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const label = isLight ? 'Ganti ke mode gelap' : 'Ganti ke mode terang';

  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        className={`flex items-center gap-3 px-4 py-3 w-full rounded-xl text-left hover:bg-slate-900/50 hover:text-slate-200 transition-colors ${className}`}
      >
        <span>{isLight ? '🌙' : '☀️'}</span> {isLight ? 'Mode Gelap' : 'Mode Terang'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative z-20 w-10 h-10 rounded-full border border-slate-700 hover:border-green-500/60 flex items-center justify-center text-lg bg-slate-900/60 backdrop-blur-sm transition-colors cursor-pointer ${className}`}
    >
      {isLight ? '🌙' : '☀️'}
    </button>
  );
}

import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { NAV_ITEMS } from './navItems';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { LogoutIcon } from './Icons';

const ACTIVE = 'flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-green-400 border border-slate-800';
const IDLE =
  'flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors';

/** Sidebar desktop (disembunyikan di HP; di HP dipakai MobileNav). */
export default function Sidebar({ active, onLogout }) {
  const { t } = useLanguage();

  return (
    <aside className="w-64 border-r border-slate-800/80 p-6 hidden lg:flex flex-col justify-between bg-slate-950 relative z-10">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-950">S</div>
          <span className="text-xl font-bold tracking-wide">SleepPattern</span>
        </div>
        <nav className="space-y-2 text-sm font-medium text-slate-400">
          {NAV_ITEMS.map(({ key, to, labelKey, Icon }) => (
            <Link key={key} to={to} className={key === active ? ACTIVE : IDLE}>
              <Icon className="w-5 h-5" /> {t(labelKey)}
            </Link>
          ))}
          <ThemeToggle variant="sidebar" />
          <LanguageToggle variant="sidebar" />
        </nav>
      </div>
      <div>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
        >
          <LogoutIcon className="w-5 h-5" /> {t('nav.logout')}
        </button>
      </div>
    </aside>
  );
}

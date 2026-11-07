import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { NAV_ITEMS } from './navItems';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { CloseIcon, LogoutIcon, MenuIcon } from './Icons';

/**
 * Menu sidebar versi HP (hanya tampil di layar < lg).
 * Di desktop, dipakai komponen Sidebar.
 *
 * Props:
 *  - active:     'dashboard' | 'recap' | 'edukasi' | 'pengaturan'
 *  - onLogout:   fungsi logout dari halaman
 *  - hideButton: sembunyikan tombol menu (mis. saat ada modal terbuka)
 */
export default function MobileNav({ active, onLogout, hideButton = false }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  // Tutup dengan tombol Esc & kunci scroll halaman saat menu terbuka
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Tombol buka menu (pojok kanan bawah) */}
      {!hideButton && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t('nav.openMenu')}
          className="fixed right-5 z-20 w-14 h-14 rounded-full bg-green-500 text-slate-950 shadow-lg shadow-green-500/30 flex items-center justify-center active:scale-95 transition-transform"
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <MenuIcon className="w-6 h-6" strokeWidth="2.5" />
        </button>
      )}

      {/* Latar gelap, klik untuk menutup */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel menu geser dari kiri */}
      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r border-slate-800/80 p-6 flex flex-col justify-between bg-slate-950 overflow-y-auto transition-all duration-300 ${
          open ? 'translate-x-0 visible' : '-translate-x-full invisible'
        }`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-950 leading-none">S</div>
              <span className="text-xl font-bold tracking-wide text-white">SleepPattern</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t('nav.closeMenu')}
              className="text-slate-400 hover:text-white p-1"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-2 text-sm font-medium text-slate-400">
            {NAV_ITEMS.map(({ key, to, labelKey, Icon }) => (
              <Link
                key={key}
                to={to}
                onClick={() => setOpen(false)}
                className={
                  key === active
                    ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-green-400 border border-slate-800'
                    : 'flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors'
                }
              >
                <Icon className="w-5 h-5" /> {t(labelKey)}
              </Link>
            ))}
            <ThemeToggle variant="sidebar" />
            <LanguageToggle variant="sidebar" />
          </nav>
        </div>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            onLogout();
          }}
          className="mt-6 flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
        >
          <LogoutIcon className="w-5 h-5" /> {t('nav.logout')}
        </button>
      </aside>
    </div>
  );
}

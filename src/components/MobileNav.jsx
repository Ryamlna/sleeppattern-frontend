import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MENU = [
  { key: 'dashboard', to: '/dashboard', icon: '', label: 'Dashboard' },
  { key: 'recap', to: '/recap', icon: '', label: 'Recap' },
  { key: 'edukasi', to: '/edukasi', icon: '', label: 'Edukasi' },
  { key: 'pengaturan', to: '/pengaturan', icon: '', label: 'Pengaturan' },
];

/**
 * Menu sidebar versi HP (hanya tampil di layar < lg).
 * Di desktop, sidebar lama (<aside className="hidden lg:flex">) tetap dipakai.
 *
 * Props:
 *  - active:     'dashboard' | 'recap' | 'edukasi' | 'pengaturan'
 *  - onLogout:   fungsi logout dari halaman
 *  - hideButton: sembunyikan tombol menu (mis. saat ada modal terbuka)
 */
export default function MobileNav({ active, onLogout, hideButton = false }) {
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
          aria-label="Buka menu"
          className="fixed right-5 z-20 w-14 h-14 rounded-full bg-green-500 text-slate-950 shadow-lg shadow-green-500/30 flex items-center justify-center active:scale-95 transition-transform"
          style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
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
        className={`fixed inset-y-0 left-0 z-50 w-64 max-w-[80vw] border-r border-slate-800/80 p-6 flex flex-col justify-between bg-slate-950 transition-all duration-300 ${
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
              aria-label="Tutup menu"
              className="text-slate-400 hover:text-white p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="space-y-2 text-sm font-medium text-slate-400">
            {MENU.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                onClick={() => setOpen(false)}
                className={
                  item.key === active
                    ? 'flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-green-400 border border-slate-800'
                    : 'flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors'
                }
              >
                <span>{item.icon}</span> {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          type="button"
          onClick={() => {
            setOpen(false);
            onLogout();
          }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
        >
          <span></span> Keluar
        </button>
      </aside>
    </div>
  );
}

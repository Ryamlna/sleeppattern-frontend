import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from '../components/StarBackground';
import MobileNav from '../components/MobileNav';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';

export default function Pengaturan() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    else navigate('/');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex selection:bg-green-500 selection:text-slate-900 relative">
      
      <StarBackground />

      {/* Menu sidebar untuk HP */}
      <MobileNav active="pengaturan" onLogout={handleLogout} />
      <Sidebar active="pengaturan" onLogout={handleLogout} />

      <div className="flex-1 min-h-screen pb-20 relative z-10">
        <header className="max-w-6xl mx-auto px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-bold text-white">{t('set.title')}</h1>
            <p className="text-slate-400 text-sm mt-0.5">{t('set.subtitle')}</p>
          </div>
          <div className="flex items-center gap-6">
            <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full border border-slate-700 object-cover" referrerPolicy="no-referrer" />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 pt-8 space-y-8">
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-slate-200 mb-6">{t('set.profile')}</h2>
            <div className="flex items-center gap-6">
              <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full border-2 border-slate-700 object-cover" referrerPolicy="no-referrer" />
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{t('set.fullName')}</p>
                <p className="text-xl font-bold text-white mb-3">{user.name}</p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">{t('set.email')}</p>
                <p className="text-sm font-medium text-slate-300">{user.email}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
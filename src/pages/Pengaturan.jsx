import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StarBackground from '../components/StarBackground';

export default function Pengaturan() {
  const navigate = useNavigate();
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

      <aside className="w-64 border-r border-slate-800/80 p-6 hidden lg:flex flex-col justify-between bg-slate-950 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-950 relative"><span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-none mt-[1px]">S</span></div>
            <span className="text-xl font-bold tracking-wide">SleepPattern</span>
          </div>
          <nav className="space-y-2 text-sm font-medium text-slate-400">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors"><span>📊</span> Dashboard</Link>
            <Link to="/recap" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors"><span>📑</span> Recap</Link>
            <Link to="/edukasi" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors"><span>💡</span> Edukasi</Link>
            <Link to="/pengaturan" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-green-400 border border-slate-800"><span>⚙️</span> Pengaturan</Link>
          </nav>
        </div>
        <div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"><span>🚪</span> Keluar</button>
        </div>
      </aside>

      <div className="flex-1 min-h-screen pb-20 relative z-10">
        <header className="max-w-6xl mx-auto px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-bold text-white">Pengaturan ⚙️</h1>
            <p className="text-slate-400 text-sm mt-0.5">Kelola profil dan akun aplikasimu.</p>
          </div>
          <div className="flex items-center gap-6">
            <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full border border-slate-700 object-cover" referrerPolicy="no-referrer" />
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-8 pt-8 space-y-8">
          <section className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-8">
            <h2 className="text-lg font-bold text-slate-200 mb-6">Profil Pengguna</h2>
            <div className="flex items-center gap-6">
              <img src={user.picture} alt="Profile" className="w-20 h-20 rounded-full border-2 border-slate-700 object-cover" referrerPolicy="no-referrer" />
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Nama Lengkap</p>
                <p className="text-xl font-bold text-white mb-3">{user.name}</p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Email</p>
                <p className="text-sm font-medium text-slate-300">{user.email}</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
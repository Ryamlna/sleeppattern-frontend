import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { artikelEdukasi } from '../data/artikelEdukasi';

export default function DetailEdukasi() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Mencari artikel yang cocok dengan ID
  const artikel = artikelEdukasi.find((item) => item.id === parseInt(id));

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

  // Jika artikel tidak ditemukan
  if (!artikel) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center flex-col text-white">
        <h1 className="text-2xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
        <button onClick={() => navigate('/edukasi')} className="px-6 py-2 bg-green-500 text-slate-950 font-bold rounded-full">Kembali</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex selection:bg-green-500 selection:text-slate-900">
      
      {/* SIDEBAR TETAP ADA */}
      <aside className="w-64 border-r border-slate-800/80 p-6 hidden lg:flex flex-col justify-between bg-slate-950">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-950 relative"><span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-none mt-[1px]">S</span></div>
            <span className="text-xl font-bold tracking-wide">SleepPattern</span>
          </div>
          <nav className="space-y-2 text-sm font-medium text-slate-400">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors"><span>📊</span> Dashboard</Link>
            <Link to="/recap" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors"><span>📑</span> Recap</Link>
            <Link to="/edukasi" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-green-400 border border-slate-800"><span>💡</span> Edukasi</Link>
            <Link to="/pengaturan" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors"><span>⚙️</span> Pengaturan</Link>
          </nav>
        </div>
        <div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"><span>🚪</span> Keluar</button>
        </div>
      </aside>

      {/* KONTEN ARTIKEL */}
      <div className="flex-1 min-h-screen pb-20 overflow-y-auto">
        <header className="max-w-4xl mx-auto px-8 pt-8 pb-6 flex justify-between items-center">
          <button onClick={() => navigate('/edukasi')} className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors font-medium">
            <span className="text-xl">←</span> Kembali ke Edukasi
          </button>
        </header>

        <main className="max-w-4xl mx-auto px-8 pt-4">
          <article className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-10 md:p-12 shadow-2xl">
            <div className="w-24 h-24 bg-slate-800/80 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner">
              <span className="text-5xl">{artikel.emoji}</span>
            </div>
            
            <div className="text-center mb-10">
              <span className={`text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-4 ${artikel.color}`}>
                {artikel.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">{artikel.title}</h1>
            </div>

            {/* Konten Artikel yang dipisahkan berdasarkan spasi enter (paragraf) */}
            <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-6">
              {artikel.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph.trim()}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <span className="text-base">📌</span> Sumber Referensi Medis: <strong className="text-slate-400">{artikel.source}</strong>
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
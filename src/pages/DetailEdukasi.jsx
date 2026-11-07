import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { artikelEdukasi, localizeArticle } from '../data/artikelEdukasi';
import MobileNav from '../components/MobileNav';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';
import { ArticleIcon, ArrowLeftIcon, BookmarkIcon } from '../components/Icons';

export default function DetailEdukasi() {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Mencari artikel yang cocok dengan ID
  const { t, lang } = useLanguage();
  const rawArtikel = artikelEdukasi.find((item) => item.id === parseInt(id));
  const artikel = rawArtikel ? localizeArticle(rawArtikel, lang) : undefined;

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
        <h1 className="text-2xl font-bold mb-4">{t('edu.notFound')}</h1>
        <button onClick={() => navigate('/edukasi')} className="px-6 py-2 bg-green-500 text-slate-950 font-bold rounded-full">{t('edu.back')}</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex selection:bg-green-500 selection:text-slate-900">
      
      {/* SIDEBAR TETAP ADA */}
      {/* Menu sidebar untuk HP */}
      <MobileNav active="edukasi" onLogout={handleLogout} />
      <Sidebar active="edukasi" onLogout={handleLogout} />

      {/* KONTEN ARTIKEL */}
      <div className="flex-1 min-h-screen pb-20 overflow-y-auto">
        <header className="max-w-4xl mx-auto px-8 pt-8 pb-6 flex justify-between items-center">
          <button onClick={() => navigate('/edukasi')} className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors font-medium">
            <ArrowLeftIcon className="w-5 h-5" /> {t('edu.backToList')}
          </button>
        </header>

        <main className="max-w-4xl mx-auto px-8 pt-4">
          <article className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-10 md:p-12 shadow-2xl">
            <div className="w-24 h-24 bg-slate-800/80 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner">
              <ArticleIcon name={artikel.icon} className="w-12 h-12 text-green-400" />
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
                <BookmarkIcon className="w-4 h-4" /> {t('edu.source')} <strong className="text-slate-400">{artikel.source}</strong>
              </p>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { artikelEdukasi, localizeArticle } from '../data/artikelEdukasi';
import StarBackground from '../components/StarBackground';
import MobileNav from '../components/MobileNav';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';
import { ArticleIcon, ArrowRightIcon } from '../components/Icons';

export default function Edukasi() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
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
      <MobileNav active="edukasi" onLogout={handleLogout} />
      <Sidebar active="edukasi" onLogout={handleLogout} />

      <div className="flex-1 min-h-screen pb-20 relative z-10">
        <header className="max-w-6xl mx-auto px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-bold text-white">{t('edu.title')}</h1>
            <p className="text-slate-400 text-sm mt-0.5">{t('edu.subtitle')}</p>
          </div>
          <div className="flex items-center gap-6">
            <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full border border-slate-700 object-cover" referrerPolicy="no-referrer" />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artikelEdukasi.map((raw) => localizeArticle(raw, lang)).map((article) => (
              <Link 
                key={article.id} 
                to={`/edukasi/${article.id}`} 
                className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/80 rounded-3xl overflow-hidden hover:border-slate-600 hover:bg-slate-900 transition-all group cursor-pointer flex flex-col shadow-lg shadow-black/20"
              >
                <div className="h-48 bg-slate-800/50 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                  <ArticleIcon name={article.icon} className="w-16 h-16 text-slate-400 group-hover:text-green-400 group-hover:scale-110 transition-all" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 ${article.color}`}>{article.category}</span>
                  <h3 className="text-lg font-bold text-slate-200 mb-2 leading-snug group-hover:text-green-400 transition-colors">{article.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-1">{article.excerpt}</p>
                  <div className="text-green-400 text-sm font-medium flex items-center gap-2">
                    {t('edu.readMore')} <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
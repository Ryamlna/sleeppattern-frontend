import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';
import { MoonIcon } from '../components/Icons';
import { useLanguage } from '../context/LanguageContext';

export default function TentangKami() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-green-500 selection:text-slate-900 flex flex-col">
      <nav className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-800/50">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-900">S</div>
          <span className="text-xl font-bold tracking-wide">SleepPattern</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageToggle variant="icon" />
          <ThemeToggle variant="icon" />
          <Link to="/" className="px-6 py-2 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors text-sm font-medium">
            {t('about.back')}
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <MoonIcon className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          {t('about.title')} <span className="text-green-400">SleepPattern</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          {t('about.intro')} 
        </p>
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 text-left space-y-6 mt-12">
          <h2 className="text-2xl font-bold text-slate-200">{t('about.missionTitle')}</h2>
          <p className="text-slate-400 leading-relaxed">
            {t('about.mission1')}
          </p>
          <p className="text-slate-400 leading-relaxed">
            {t('about.mission2')}
          </p>
        </div>
      </main>
    </div>
  );
}
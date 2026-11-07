import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarBackground from '../components/StarBackground';
import MobileNav from '../components/MobileNav';
import SleepCalculator from '../components/SleepCalculator';
import Sidebar from '../components/Sidebar';
import { useLanguage } from '../context/LanguageContext';
import { CloseIcon, LightbulbIcon } from '../components/Icons';

// Buang '/' di akhir supaya tidak jadi '//api/...' (Vercel me-redirect dan preflight CORS gagal)
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, locale } = useLanguage();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [greeting, setGreeting] = useState('greeting.morning');
  const [records, setRecords] = useState([]);
  const [averageDuration, setAverageDuration] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);
  const [recommendation, setRecommendation] = useState('rec.initial');
  
  const [date, setDate] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [quality, setQuality] = useState('good');
  const [usedGadget, setUsedGadget] = useState(false);
  const [didExercise, setDidExercise] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [successModal, setSuccessModal] = useState(false);
  const [detailModal, setDetailModal] = useState({ isopen: false, record: null });

  // PERBAIKAN: Menggunakan URL dinamis Vercel (import.meta.env.VITE_API_URL)
  const fetchRecords = async (email) => {
    try {
      const res = await fetch(`${API_URL}/api/sleep/${email}`);
      const data = await res.json();
      if (res.ok) {
        setRecords(data);
        calculateStats(data);
        generateRecommendation(data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const calculateStats = (data) => {
    if (data.length === 0) {
      setAverageDuration(0);
      setQualityScore(0);
      return;
    }
    let totalHours = 0;
    let totalQualityScore = 0;
    data.forEach(record => {
      const sleep = new Date(record.sleepTime);
      const wake = new Date(record.wakeTime);
      const diffInHours = (wake - sleep) / (1000 * 60 * 60);
      
      totalHours += diffInHours > 0 ? diffInHours : diffInHours + 24;
      
      if (record.quality === 'good') totalQualityScore += 100;
      else if (record.quality === 'fair') totalQualityScore += 70;
      else if (record.quality === 'poor') totalQualityScore += 40;
    });
    const avgHrs = (totalHours / data.length).toFixed(1);
    const avgScore = Math.round(totalQualityScore / data.length);
    setAverageDuration(avgHrs);
    setQualityScore(avgScore);
  };

  const generateRecommendation = (data) => {
    if (data.length === 0) {
      setRecommendation('rec.empty');
      return;
    }
    const latest = data[0];
    if (latest.quality === 'poor' && latest.usedGadget) {
      setRecommendation('rec.poorGadget');
    } else if (latest.quality === 'good' && latest.didExercise) {
      setRecommendation('rec.goodExercise');
    } else if (latest.quality === 'poor' || latest.quality === 'fair') {
      setRecommendation('rec.declining');
    } else if (latest.quality === 'good') {
      setRecommendation('rec.good');
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchRecords(parsedUser.email);
    } else {
      navigate('/');
    }
    
    const hour = new Date().getHours();
    if (hour < 11) setGreeting('greeting.morning');
    else if (hour < 15) setGreeting('greeting.noon');
    else if (hour < 18) setGreeting('greeting.afternoon');
    else setGreeting('greeting.evening');
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  // PERBAIKAN: Menggunakan URL dinamis Vercel (import.meta.env.VITE_API_URL)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/sleep`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, date, sleepTime, wakeTime, quality, usedGadget, didExercise }),
      });
      if (res.ok) {
        setIsModalOpen(false);
        setDate(''); setSleepTime(''); setWakeTime(''); setQuality('good');
        setUsedGadget(false); setDidExercise(false);
        fetchRecords(user.email);
        setSuccessModal(true);
        setTimeout(() => setSuccessModal(false), 2500);
      } else {
        alert(t('err.save'));
      }
    } catch (error) {
      alert(t('err.server'));
    }
  };

  // PERBAIKAN: Menggunakan URL dinamis Vercel (import.meta.env.VITE_API_URL)
  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ isopen: false, id: null });
    try {
      const res = await fetch(`${API_URL}/api/sleep/${id}`, { 
        method: 'DELETE' 
      });
      if (res.ok) {
        fetchRecords(user.email);
        setDetailModal({ isopen: false, record: null });
      } else {
        alert(t('err.deleteFail'));
      }
    } catch (error) {
      alert(t('err.deleteError'));
    }
  };

  const getChartData = () => {
    const recent = records.slice(0, 7).reverse();
    const chartData = recent.map(r => {
      const sleep = new Date(r.sleepTime);
      const wake = new Date(r.wakeTime);
      let hours = (wake - sleep) / (1000 * 60 * 60);
      if (hours < 0) hours += 24;
      return { day: new Date(r.date).toLocaleDateString(locale, { weekday: 'short' }), duration: hours };
    });
    while (chartData.length < 7) {
      chartData.unshift({ day: '', duration: 0 });
    }
    return chartData;
  };

  if (!user) return null;
  
  const strokeOffset = 326 - (326 * qualityScore / 100);
  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex selection:bg-green-500 selection:text-slate-900 relative">
      {/* SUNTIKKAN KOMPONEN BINTANG DI SINI */}
      <StarBackground />
      {/* SIDEBAR: Tambahkan 'relative z-10' */}
      {/* Menu sidebar untuk HP */}
      <MobileNav active="dashboard" onLogout={handleLogout} hideButton={isModalOpen || detailModal.isOpen || deleteModal.isOpen || successModal} />
      <Sidebar active="dashboard" onLogout={handleLogout} />
      
      {/* KONTEN UTAMA: Tambahkan 'relative z-10' */}
      <div className="flex-1 min-h-screen pb-20 relative z-10">
        <header className="max-w-6xl mx-auto px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {t(greeting)}, <span className="text-green-400">{user.name.split(' ')[0]}!</span>
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">{t('dash.subtitle')}</p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold text-sm rounded-full transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-green-500/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              {t('dash.logToday')}
            </button>
            <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full border border-slate-700 object-cover" referrerPolicy="no-referrer" />
          </div>
        </header>
        
        <main className="max-w-6xl mx-auto px-8 pt-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 flex flex-col items-center justify-center text-center backdrop-blur-sm">
              <h3 className="text-slate-400 text-sm font-medium mb-4">{t('dash.scoreTitle')}</h3>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="52" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                  <circle cx="56" cy="56" r="52" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="326" strokeDashoffset={strokeOffset} className={`${qualityScore >= 80 ? 'text-green-500' : qualityScore >= 60 ? 'text-yellow-500' : 'text-red-500'} transition-all duration-1000`} strokeLinecap="round" />
                </svg>
                <span className={`text-3xl font-bold ${qualityScore >= 80 ? 'text-green-400' : qualityScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {qualityScore}
                </span>
              </div>
              <p className="mt-3 text-xs text-slate-300 font-medium">
                {records.length === 0 ? t('dash.scoreEmpty') : qualityScore >= 80 ? t('dash.scoreGreat') : qualityScore >= 60 ? t('dash.scoreOk') : t('dash.scoreLow')}
              </p>
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-slate-400 text-sm font-medium">{t('dash.chartTitle')}</h3>
                <span className="text-xs text-green-400 font-semibold bg-green-500/10 px-2.5 py-1 rounded-full">{t('dash.days7')}</span>
              </div>
              <div className="relative h-32 w-full mt-2 pl-6">
                <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
                  <div className="w-full border-t border-slate-800/50 flex items-center relative"><span className="absolute -left-6 text-[9px] text-slate-500">12h</span></div>
                  <div className="w-full border-t border-slate-800/50 flex items-center relative"><span className="absolute -left-6 text-[9px] text-slate-500">8h</span></div>
                  <div className="w-full border-t border-slate-800/50 flex items-center relative"><span className="absolute -left-6 text-[9px] text-slate-500">4h</span></div>
                  <div className="w-full border-t border-slate-800 flex items-center relative"><span className="absolute -left-6 text-[9px] text-slate-500">0h</span></div>
                </div>
                <div className="absolute inset-0 left-6 bottom-6 flex items-end justify-between pt-2">
                  {chartData.map((item, idx) => {
                    const barHeight = item.duration > 0 ? Math.min((item.duration / 12) * 100, 100) : 0;
                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 mx-1 group relative h-full justify-end">
                        {item.duration > 0 && (
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 text-[10px] bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-white transition-opacity pointer-events-none whitespace-nowrap z-10">
                            {item.duration.toFixed(1)} {t('unit.hours')}
                          </div>
                        )}
                        <div className={`w-full rounded-t-sm transition-all duration-700 ${item.duration > 0 ? 'bg-green-500 hover:bg-green-400 cursor-pointer' : 'bg-transparent'}`} style={{ height: `${barHeight}%`, minHeight: item.duration > 0 ? '4px' : '0' }}></div>
                        <span className="text-[10px] text-slate-500 font-medium capitalize absolute -bottom-6">{item.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-center backdrop-blur-sm">
                  <h3 className="text-slate-400 text-xs font-medium">{t('dash.avgDuration')}</h3>
                  <div className="text-2xl font-bold mt-1">
                    {averageDuration} <span className="text-xs text-slate-400 font-normal">{t('unit.hours')}</span>
                  </div>
                </div>
                <div className="flex-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-center backdrop-blur-sm">
                  <h3 className="text-slate-400 text-xs font-medium">{t('dash.streak')}</h3>
                  <div className="text-2xl font-bold mt-1 text-orange-400 flex items-center gap-2">
                    {records.length} {t('unit.days')}
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <style>
                        {`
                        @keyframes fireFlicker {
                          0%, 100% { transform: scale(1) skewX(0deg); opacity: 1; }
                          30% { transform: scale(1.05) skewX(2deg); opacity: 0.9; }
                          60% { transform: scale(0.95) skewX(-2deg); opacity: 1; }
                          80% { transform: scale(1.02) skewX(1deg); opacity: 0.8; }
                        }
                        .animate-fire {
                          animation: fireFlicker 1.2s infinite ease-in-out alternate;
                          transform-origin: bottom center;
                        }
                        @keyframes fireInner {
                          0%, 100% { transform: scale(1); opacity: 1; }
                          50% { transform: scale(1.15) translateY(-1px); opacity: 0.8; }
                        }
                        .animate-fire-inner {
                          animation: fireInner 0.8s infinite ease-in-out alternate;
                          transform-origin: bottom center;
                        }
                        `}
                      </style>
                      <svg viewBox="0 0 24 24" className="w-7 h-7 drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="animate-fire" d="M12 20C12 20 8 16 8 10C8 10 9.5 8 9.5 8C9.5 8 6 10.5 6 15C6 19.4183 9.58172 23 14 23C18.4183 23 22 19.4183 22 15C22 11 19 9 19 9C19 9 17.5 14 17.5 14C17.5 14 15 7 12 2" fill="#F97316" />
                        <path className="animate-fire-inner" d="M14 23C11 23 9 20.5 9 17C9 14.5 11 12.5 11 12.5C11 12.5 10.5 15 12 16C13.5 17 14 14.5 14 14.5C14 14.5 17 15.5 17 18.5C17 21 15.5 23 14 23Z" fill="#FBBF24" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-center backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <LightbulbIcon className="w-4 h-4 text-green-400" />
                  <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{t('dash.todayRec')}</h3>
                </div>
                <p className="text-sm font-medium text-slate-200 leading-relaxed">
                  {t(recommendation)}
                </p>
              </div>
            </div>
          </div>
          
          <SleepCalculator />

          <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-200">{t('dash.history')}</h3>
            {records.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-sm">{t('dash.historyEmpty')}</div>
            ) : (
              <div className="space-y-3">
                {records.map((record) => {
                  const sleepDate = new Date(record.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'short' });
                  const sleepTimeStr = new Date(record.sleepTime).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
                  const wakeTimeStr = new Date(record.wakeTime).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={record.id} onClick={() => setDetailModal({ isopen: true, record })} className="flex justify-between items-center p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-green-500/40 hover:bg-slate-800/50 transition-all cursor-pointer group shadow-sm">
                      <div>
                        <p className="font-semibold text-slate-200 text-sm group-hover:text-green-400 transition-colors">{sleepDate}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{t('dash.sleepRange', { from: sleepTimeStr, to: wakeTimeStr })}</p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${record.quality === 'good' ? 'bg-green-500/10 text-green-400' : record.quality === 'fair' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'}`}>
                          {t('quality.' + record.quality)}
                        </span>
                        <button onClick={(e) => { e.stopPropagation(); setDeleteModal({ isOpen: true, id: record.id }); }} className="text-slate-500 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-red-500/10" title={t('dash.deleteEntry')}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t('dash.logToday')}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white" aria-label={t('common.close')}><CloseIcon className="w-5 h-5" /></button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div><label className="block text-xs font-medium text-slate-400 mb-1">{t('field.date')}</label><input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 [color-scheme:dark]" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium text-slate-400 mb-1">{t('field.sleepTime')}</label><input type="time" required value={sleepTime} onChange={(e) => setSleepTime(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 [color-scheme:dark]" /></div>
                <div><label className="block text-xs font-medium text-slate-400 mb-1">{t('field.wakeTime')}</label><input type="time" required value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 [color-scheme:dark]" /></div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">{t('field.quality')}</label>
                <select value={quality} onChange={(e) => setQuality(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 appearance-none">
                  <option value="good">{t('quality.opt.good')}</option>
                  <option value="fair">{t('quality.opt.fair')}</option>
                  <option value="poor">{t('quality.opt.poor')}</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300">{t('field.gadget')}</span>
                <input type="checkbox" checked={usedGadget} onChange={(e) => setUsedGadget(e.target.checked)} className="w-4 h-4 accent-green-500 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300">{t('field.exercise')}</span>
                <input type="checkbox" checked={didExercise} onChange={(e) => setDidExercise(e.target.checked)} className="w-4 h-4 accent-green-500 cursor-pointer" />
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-800 hover:bg-slate-800 rounded-xl text-sm font-medium transition-colors">{t('common.cancel')}</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-green-500 hover:bg-green-400 text-slate-950 rounded-xl text-sm font-bold transition-colors">{t('dash.save')}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {detailModal.isOpen && detailModal.record && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0" onClick={() => setDetailModal({ isopen: false, record: null })}></div>
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t('detail.title')}</h2>
              <button onClick={() => setDetailModal({ isopen: false, record: null })} className="text-slate-400 hover:text-white" aria-label={t('common.close')}><CloseIcon className="w-5 h-5" /></button>
            </div>
            <div className="space-y-5">
              <div className="pb-4 border-b border-slate-800">
                <p className="text-xs text-slate-400 mb-1">{t('field.date')}</p>
                <p className="text-lg font-bold text-green-400">
                  {new Date(detailModal.record.date).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{t('detail.sleepTime')}</p>
                  <p className="text-base font-semibold text-slate-200">{new Date(detailModal.record.sleepTime).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">{t('detail.wakeTime')}</p>
                  <p className="text-base font-semibold text-slate-200">{new Date(detailModal.record.wakeTime).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <div className="pb-4 border-b border-slate-800">
                <p className="text-xs text-slate-400 mb-2">{t('detail.habits')}</p>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-sm text-slate-300">{t('detail.gadget')}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${detailModal.record.usedGadget ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                      {detailModal.record.usedGadget ? t('common.yes') : t('common.no')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                    <span className="text-sm text-slate-300">{t('detail.exercise')}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${detailModal.record.didExercise ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-400'}`}>
                      {detailModal.record.didExercise ? t('common.yes') : t('common.no')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setDetailModal({ isopen: false, record: null })} className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold transition-colors">{t('detail.close')}</button>
          </div>
        </div>
      )}
      
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0" onClick={() => setDeleteModal({ isOpen: false, id: null })}></div>
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl z-10 text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h2 className="text-xl font-bold mb-2">{t('del.title')}</h2>
            <p className="text-sm text-slate-400 mb-6">{t('del.desc')}</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ isOpen: false, id: null })} className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors">{t('common.cancel')}</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-red-500/20">{t('del.confirm')}</button>
            </div>
          </div>
        </div>
      )}
      
      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-5 animate-bounce">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-slate-950">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{t('ok.title')}</h2>
            <p className="text-slate-400 text-sm">{t('ok.desc')}</p>
          </div>
        </div>
      )}
    </div>
  );
}
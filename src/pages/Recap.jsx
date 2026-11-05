import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import StarBackground from '../components/StarBackground';

export default function Recap() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); 
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const [stats, setStats] = useState({ totalHours: 0, avgHours: 0, avgScore: 0, streak: 0 });
  
  const cardRef = useRef(null); 
  const [isCapturing, setIsCapturing] = useState(false);

  const fetchRecords = async (email) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/sleep/${email}`);
      const data = await res.json();
      if (res.ok) {
        setAllRecords(data);
        filterAndCalculateStats(data, selectedMonth, selectedYear);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const filterAndCalculateStats = (data, month, year) => {
    const filtered = data.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() === month && recordDate.getFullYear() === year;
    });

    setFilteredRecords(filtered);

    if (filtered.length === 0) {
      setStats({ totalHours: 0, avgHours: 0, avgScore: 0, streak: 0 });
      return;
    }

    let totalHrs = 0;
    let totalScore = 0;

    filtered.forEach(record => {
      const sleep = new Date(record.sleepTime);
      const wake = new Date(record.wakeTime);
      let hours = (wake - sleep) / (1000 * 60 * 60);
      if (hours < 0) hours += 24;
      totalHrs += hours;

      if (record.quality === 'good') totalScore += 100;
      else if (record.quality === 'fair') totalScore += 70;
      else if (record.quality === 'poor') totalScore += 40;
    });

    setStats({
      totalHours: totalHrs.toFixed(1),
      avgHours: (totalHrs / filtered.length).toFixed(1),
      avgScore: Math.round(totalScore / filtered.length),
      streak: filtered.length
    });
  };

  useEffect(() => {
    if (allRecords.length > 0) {
      filterAndCalculateStats(allRecords, parseInt(selectedMonth), parseInt(selectedYear));
    }
  }, [selectedMonth, selectedYear, allRecords]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchRecords(parsedUser.email);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsCapturing(true); 
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, 
        backgroundColor: '#020617', 
        useCORS: true, 
      });

      const imageURL = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = imageURL;
      downloadLink.download = `SleepPattern_Recap_${months[selectedMonth]}_${selectedYear}.png`;
      downloadLink.click();
      
    } catch (error) {
      console.error("Gagal membuat gambar:", error);
      alert("Terjadi kesalahan saat memproses gambar.");
    } finally {
      setIsCapturing(false); 
    }
  };

  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const years = [2026, 2025, 2024];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex selection:bg-green-500 selection:text-slate-900 relative">
      
      <StarBackground />

      <aside className="w-64 border-r border-slate-800/80 p-6 hidden lg:flex flex-col justify-between bg-slate-950 relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-950 relative">
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-none mt-[1px]">S</span>
            </div>
            <span className="text-xl font-bold tracking-wide">SleepPattern</span>
          </div>
          <nav className="space-y-2 text-sm font-medium text-slate-400">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors">
              <span>📊</span> Dashboard
            </Link>
            <Link to="/recap" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-green-400 border border-slate-800">
              <span>📑</span> Recap
            </Link>
            <Link to="/edukasi" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors">
              <span>💡</span> Edukasi
            </Link>
            <Link to="/pengaturan" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-900/50 hover:text-slate-200 transition-colors">
              <span>⚙️</span> Pengaturan
            </Link>
          </nav>
        </div>
        <div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium">
            <span>🚪</span> Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 min-h-screen pb-20 relative z-10">
        <header className="max-w-6xl mx-auto px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-900">
          <div>
            <h1 className="text-2xl font-bold text-white">Sleep Recap 🏆</h1>
            <p className="text-slate-400 text-sm mt-0.5">Lihat kembali jejak pola tidurmu bulan ini.</p>
          </div>
          <div className="flex items-center gap-6">
            <img src={user.picture} alt="Profile" className="w-10 h-10 rounded-full border border-slate-700 object-cover" referrerPolicy="no-referrer" />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8 pt-8 space-y-8">
          
          <div className="flex items-center gap-4 bg-slate-900/40 p-4 rounded-2xl border border-slate-800 w-fit backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Bulan:</span>
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500"
              >
                {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Tahun:</span>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500"
              >
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center">
            
            <div 
              ref={cardRef} 
              className="relative w-full max-w-2xl bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-10 overflow-hidden shadow-2xl shadow-green-500/20"
            >
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-slate-900/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-inner text-yellow-300">
                  <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.64 13a1 1 0 00-1.05-.14 8.049 8.049 0 01-3.37.73c-4.41 0-8-3.59-8-8 0-1.2.32-2.33.86-3.32.14-.25.15-.55.02-.8A1 1 0 009.24 1.1 10.024 10.024 0 002 10.18C2 15.6 6.4 20 11.82 20c3.7 0 6.94-2 8.54-5.06a1 1 0 00.28-.94z"/>
                  </svg>
                </div>
                
                <h2 className="text-slate-100 text-sm font-semibold uppercase tracking-widest mb-1">
                  REKAP {months[selectedMonth]} {selectedYear}
                </h2>
                <h3 className="text-4xl font-extrabold text-white mb-8 drop-shadow-md">
                  {user.name.split(' ')[0]}'s Sleep Journey
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full bg-slate-950/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex flex-col items-center justify-center border-r border-white/10 last:border-0">
                    <span className="text-slate-300 text-xs font-medium mb-1">Total Tidur</span>
                    <span className="text-2xl font-bold text-white">{stats.totalHours}<span className="text-sm font-normal text-slate-300 ml-1">Jam</span></span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-r border-white/10 last:border-0">
                    <span className="text-slate-300 text-xs font-medium mb-1">Rata-rata</span>
                    <span className="text-2xl font-bold text-white">{stats.avgHours}<span className="text-sm font-normal text-slate-300 ml-1">/hari</span></span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-r border-white/10 last:border-0 md:border-r">
                    <span className="text-slate-300 text-xs font-medium mb-1">Skor Kualitas</span>
                    <span className="text-2xl font-bold text-yellow-300">{stats.avgScore}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-slate-300 text-xs font-medium mb-1">Hari Tercatat</span>
                    <span className="text-2xl font-bold text-white">{stats.streak}<span className="text-sm font-normal text-slate-300 ml-1">Hari</span></span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between w-full px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white text-green-600 rounded-full relative shadow-sm">
                      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold leading-none mt-[1px]">S</span>
                    </div>
                    <span className="text-white text-xs font-semibold">SleepPattern App</span>
                  </div>
                  <span className="text-white/60 text-xs font-medium">sleeppattern.my.id</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleShare}
              disabled={isCapturing} 
              className="mt-8 px-8 py-3 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-700 text-white rounded-full font-bold transition-colors shadow-lg flex items-center gap-3 border border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed relative z-20"
            >
              {isCapturing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Memproses...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                  Unduh Kartu Recap
                </>
              )}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
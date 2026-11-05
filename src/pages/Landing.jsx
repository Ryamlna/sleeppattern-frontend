import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';

export default function Landing() {
  const navigate = useNavigate();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false); 
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
  const [stars, setStars] = useState([]);

  // Generate bintang secara acak saat halaman pertama kali dimuat
  useEffect(() => {
    const generatedStars = [...Array(60)].map(() => ({
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: 3 + Math.random() * 4 + 's',
    }));
    setStars(generatedStars);
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
       method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    },
    onError: () => console.log('Login Gagal dari Google'),
  });

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Akun Demo',
      email: 'demo@sleeppattern.id',
      picture: 'https://ui-avatars.com/api/?name=Akun+Demo&background=10B981&color=fff'
    };
    localStorage.setItem('user', JSON.stringify(demoUser));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-green-500 selection:text-slate-900 relative overflow-hidden">
      
      {/* INJEKSI CSS ANIMASI */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); box-shadow: 0 0 8px rgba(255,255,255,0.8); }
          }
          .animate-twinkle {
            animation-name: twinkle;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
          }
          @keyframes floatMoon {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          .animate-float-moon {
            animation: floatMoon 6s ease-in-out infinite;
          }
          @keyframes floatCloud {
            0%, 100% { transform: translateX(0px); opacity: 0.6; }
            50% { transform: translateX(15px); opacity: 0.9; }
          }
          .animate-float-cloud {
            animation: floatCloud 8s ease-in-out infinite;
          }
          @keyframes floatZzz {
            0% { opacity: 0; transform: translate(0px, 0px) scale(0.5); }
            20% { opacity: 1; }
            80% { opacity: 0.8; }
            100% { opacity: 0; transform: translate(30px, -60px) scale(1.5); }
          }
          .animate-zzz-1 { animation: floatZzz 4s linear infinite; animation-delay: 0s; }
          .animate-zzz-2 { animation: floatZzz 4s linear infinite; animation-delay: 1.5s; }
          .animate-zzz-3 { animation: floatZzz 4s linear infinite; animation-delay: 3s; }
        `}
      </style>

      {/* LATAR BELAKANG BINTANG KELAP-KELIP */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              width: star.width,
              height: star.height,
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
              animationDuration: star.animationDuration,
            }}
          ></div>
        ))}
        {/* Efek gradien kabut di bagian bawah */}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-slate-950 to-transparent"></div>
      </div>

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-900 relative">
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-none mt-[1px]">S</span>
          </div>
          <span className="text-xl font-bold tracking-wide">SleepPattern</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <Link to="/tentangkami" className="hover:text-green-400 transition-colors cursor-pointer relative z-20">Tentang Kami</Link>
          <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-green-400 transition-colors cursor-pointer relative z-20">Fitur</button>
          <button onClick={() => setIsAuthModalOpen(true)} className="hover:text-green-400 transition-colors cursor-pointer relative z-20">Edukasi</button>
        </div>

        <button onClick={() => setIsLoginModalOpen(true)} className="hidden md:block px-6 py-2 rounded-full border border-slate-700 hover:border-slate-500 transition-colors text-sm font-medium cursor-pointer relative z-20">
          Masuk
        </button>
      </nav>

      {/* KONTEN UTAMA */}
      <main className="max-w-7xl mx-auto px-6 pt-16 pb-32 grid md:grid-cols-2 gap-12 items-center relative z-10 min-h-[80vh]">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Pahami Pola Tidurmu, <br/>
            <span className="text-green-400">Tingkatkan Konsentrasi</span> Belajar
          </h1>
          <p className="text-lg text-slate-300 max-w-lg leading-relaxed drop-shadow-md">
            Lacak durasi tidur, bangun kebiasaan sehat, dan dapatkan insight berdasarkan jurnal medis untuk memaksimalkan fokus akademismu esok hari.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4 relative z-20">
            <button onClick={handleDemoLogin} className="px-8 py-3.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
              Coba Akun Demo
            </button>
            <button onClick={handleGoogleLogin} className="px-8 py-3.5 bg-slate-900/80 backdrop-blur-md border border-slate-700 hover:bg-slate-800 text-white font-medium rounded-full flex items-center gap-2 transition-colors shadow-lg">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Masuk dengan Google
            </button>
          </div>
        </div>

        {/* ILUSTRASI ANIMASI BERGERAK */}
        <div className="relative aspect-square w-full max-w-lg mx-auto flex items-center justify-center pointer-events-none">
          
          {/* Cahaya di belakang bulan */}
          <div className="absolute w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>

          {/* Bulan yang mengambang */}
          <div className="relative animate-float-moon z-20 text-yellow-400">
            <svg className="w-40 h-40 drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.64 13a1 1 0 00-1.05-.14 8.049 8.049 0 01-3.37.73c-4.41 0-8-3.59-8-8 0-1.2.32-2.33.86-3.32.14-.25.15-.55.02-.8A1 1 0 009.24 1.1 10.024 10.024 0 002 10.18C2 15.6 6.4 20 11.82 20c3.7 0 6.94-2 8.54-5.06a1 1 0 00.28-.94z"/>
            </svg>
            
            {/* Animasi teks Zzz */}
            <span className="absolute -top-4 right-0 text-xl font-bold text-green-400 animate-zzz-1">Z</span>
            <span className="absolute -top-8 right-6 text-2xl font-bold text-green-400 animate-zzz-2">z</span>
            <span className="absolute -top-12 right-12 text-3xl font-bold text-green-400 animate-zzz-3">z</span>
          </div>

          {/* Awan yang bergeser perlahan */}
          <div className="absolute bottom-24 left-10 animate-float-cloud text-slate-700/80 z-30" style={{ animationDelay: '1s' }}>
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.9 9.8C18.6 5.8 15.3 2.7 11.2 3.1 8 3.4 5.4 6 5.1 9.1c-2.8.2-5 2.5-5 5.3 0 2.9 2.4 5.3 5.3 5.3h13.2C21.7 19.7 24 17.3 24 14.4c0-2.4-1.7-4.4-4-4.9-.1-1.3-.5-2.5-1.1-3.7z"/>
            </svg>
          </div>
          <div className="absolute bottom-16 right-16 animate-float-cloud text-slate-800/80 z-10" style={{ animationDirection: 'alternate-reverse' }}>
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.9 9.8C18.6 5.8 15.3 2.7 11.2 3.1 8 3.4 5.4 6 5.1 9.1c-2.8.2-5 2.5-5 5.3 0 2.9 2.4 5.3 5.3 5.3h13.2C21.7 19.7 24 17.3 24 14.4c0-2.4-1.7-4.4-4-4.9-.1-1.3-.5-2.5-1.1-3.7z"/>
            </svg>
          </div>

        </div>
      </main>

      {/* 1. MODAL AKSES TERBATAS */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10 flex flex-col items-center text-center">
            <button onClick={() => setIsAuthModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">✕</button>
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-5 border border-slate-700"><span className="text-2xl">🔒</span></div>
            <h2 className="text-2xl font-bold text-white mb-2">Akses Terbatas</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Kamu harus masuk terlebih dahulu untuk menjelajahi fitur canggih dan membaca materi edukasi di SleepPattern.</p>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={handleDemoLogin} className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-xl transition-colors">Gunakan Akun Demo</button>
              <button onClick={handleGoogleLogin} className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                Masuk dengan Google
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. MODAL LOGIN */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-opacity">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsLoginModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl z-10 flex flex-col items-center text-center">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">✕</button>
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-5 border border-slate-700"><span className="text-2xl">🔑</span></div>
            <h2 className="text-2xl font-bold text-white mb-2">Masuk ke Akun Anda</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">Silakan pilih metode masuk di bawah ini untuk melanjutkan ke Dashboard.</p>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={handleDemoLogin} className="w-full py-3.5 bg-green-500 hover:bg-green-400 text-slate-950 font-bold rounded-xl transition-colors">Gunakan Akun Demo</button>
              <button onClick={handleGoogleLogin} className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                Masuk dengan Google
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
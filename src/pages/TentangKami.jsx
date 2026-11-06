import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-green-500 selection:text-slate-900 flex flex-col">
      <nav className="max-w-7xl w-full mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-800/50">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-slate-900">S</div>
          <span className="text-xl font-bold tracking-wide">SleepPattern</span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle variant="icon" />
          <Link to="/" className="px-6 py-2 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 transition-colors text-sm font-medium">
            Kembali ke Beranda
          </Link>
        </div>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🌱</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">
          Tentang <span className="text-green-400">SleepPattern</span>
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          SleepPattern lahir dari pemahaman bahwa kualitas tidur berbanding lurus dengan kualitas hidup dan fokus belajar harianmu. 
        </p>
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 text-left space-y-6 mt-12">
          <h2 className="text-2xl font-bold text-slate-200">Misi Kami 🚀</h2>
          <p className="text-slate-400 leading-relaxed">
            Kami bertujuan membantu pelajar, mahasiswa, dan profesional muda untuk melacak pola tidur mereka secara akurat. Dengan antarmuka yang modern dan analisis data yang cerdas, kami mengubah angka-angka jam tidur menjadi *insight* yang bisa langsung diterapkan untuk membangun kebiasaan yang lebih sehat (Sleep Hygiene).
          </p>
          <p className="text-slate-400 leading-relaxed">
            Aplikasi ini dikembangkan sebagai dedikasi untuk menciptakan ekosistem produktivitas yang seimbang, di mana istirahat dihargai sama tingginya dengan kerja keras.
          </p>
        </div>
      </main>
    </div>
  );
}
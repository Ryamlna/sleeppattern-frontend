import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sun from './Sun';

const CLOUDS = [
  { top: '12%', width: 220, duration: 95, delay: -30, opacity: 0.9 },
  { top: '30%', width: 160, duration: 130, delay: -80, opacity: 0.75 },
  { top: '52%', width: 260, duration: 110, delay: -10, opacity: 0.6 },
  { top: '70%', width: 190, duration: 150, delay: -120, opacity: 0.55 },
];

function Cloud({ top, width, duration, delay, opacity }) {
  return (
    <div
      className="cloud-drift absolute left-0"
      style={{ top, width, opacity, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <svg viewBox="0 0 120 60" className="w-full h-auto" fill="#ffffff">
        <ellipse cx="35" cy="38" rx="28" ry="18" />
        <ellipse cx="62" cy="28" rx="30" ry="22" />
        <ellipse cx="88" cy="38" rx="26" ry="16" />
        <rect x="35" y="36" width="55" height="20" rx="10" />
      </svg>
    </div>
  );
}

/** Langit siang: gradasi biru, matahari bergerak melengkung, dan awan yang melintas. */
function DaySky({ showSun }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 45%, #f0f9ff 100%)' }}
      />

      {showSun && (
        <div className="sun-arc absolute top-0 left-0">
          <div className="-translate-x-1/2 -translate-y-1/2">
            <Sun className="w-28 h-28 md:w-44 md:h-44" />
          </div>
        </div>
      )}

      {CLOUDS.map((c, i) => (
        <Cloud key={i} {...c} />
      ))}

      {/* Memudar ke warna halaman di bagian bawah */}
      <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
}

/**
 * Latar belakang halaman:
 *  - mode gelap  -> bintang berkelap-kelip
 *  - mode terang -> langit siang dengan matahari bergerak
 * showSun={false} dipakai di Landing karena matahari sudah ada di ilustrasi utama.
 */
export default function StarBackground({ showSun = true }) {
  const { theme } = useTheme();
  const [stars, setStars] = useState([]);

  // Membuat puluhan bintang secara acak saat komponen dimuat
  useEffect(() => {
    const generatedStars = [...Array(50)].map(() => ({
      width: Math.random() * 3 + 1 + 'px',
      height: Math.random() * 3 + 1 + 'px',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: 3 + Math.random() * 4 + 's',
    }));
    setStars(generatedStars);
  }, []);

  if (theme === 'light') return <DaySky showSun={showSun} />;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
        `}
      </style>
      
      {/* Taburan Bintang */}
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
      
      {/* Efek gradien gelap di bawah agar menyatu mulus dengan halaman */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </div>
  );
}

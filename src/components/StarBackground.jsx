import { useState, useEffect } from 'react';

export default function StarBackground() {
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
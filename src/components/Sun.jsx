/**
 * Matahari: cahaya berdenyut + sinar yang berputar + piringan matahari.
 * Ukuran diatur lewat className (mis. "w-40 h-40").
 */
export default function Sun({ className = 'w-40 h-40' }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div
        className="sun-glow absolute rounded-full"
        style={{
          inset: '-70%',
          background:
            'radial-gradient(circle, rgba(253,224,71,0.55) 0%, rgba(253,224,71,0.18) 40%, rgba(253,224,71,0) 70%)',
        }}
      />
      <svg
        className="sun-rays absolute"
        style={{ inset: '-28%', width: '156%', height: '156%' }}
        viewBox="0 0 200 200"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="6"
            x2="100"
            y2="26"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.75"
            transform={`rotate(${i * 30} 100 100)`}
          />
        ))}
      </svg>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, #fef9c3 0%, #fde047 35%, #facc15 65%, #f59e0b 100%)',
          boxShadow: '0 0 40px 10px rgba(250,204,21,0.45)',
        }}
      />
    </div>
  );
}

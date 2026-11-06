import { useState } from 'react';
import {
  parseTime,
  formatDuration,
  bedtimesForWake,
  wakeTimesForBed,
} from '../utils/sleepCycles';

const RATING_STYLE = {
  ideal: { label: 'Ideal', box: 'border-green-500/50 bg-green-500/10', text: 'text-green-400' },
  baik: { label: 'Baik', box: 'border-green-500/30 bg-green-500/5', text: 'text-green-300' },
  kurang: { label: 'Kurang', box: 'border-yellow-500/30 bg-yellow-500/5', text: 'text-yellow-300' },
  singkat: { label: 'Terlalu singkat', box: 'border-red-500/30 bg-red-500/5', text: 'text-red-300' },
};

const MODES = {
  wake: {
    tab: 'Aku harus bangun jam…',
    inputLabel: 'Jam bangun',
    resultTitle: 'Sebaiknya kamu mulai tidur pukul:',
    defaultTime: '06:00',
  },
  bed: {
    tab: 'Aku mau tidur jam…',
    inputLabel: 'Jam tidur',
    resultTitle: 'Sebaiknya kamu bangun pukul:',
    defaultTime: '22:30',
  },
};

export default function SleepCalculator() {
  const [mode, setMode] = useState('wake');
  const [time, setTime] = useState(MODES.wake.defaultTime);

  const switchMode = (next) => {
    if (next === mode) return;
    setMode(next);
    setTime(MODES[next].defaultTime);
  };

  const useNow = () => {
    const d = new Date();
    setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
  };

  const minutes = parseTime(time);
  const results =
    minutes === null ? [] : mode === 'wake' ? bedtimesForWake(minutes) : wakeTimesForBed(minutes);

  return (
    <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-200">Kalkulator Jam Tidur</h3>
        <p className="text-sm text-slate-400 mt-1">
          Bangun di akhir siklus tidur supaya badan terasa lebih segar, bukan di tengah tidur nyenyak.
        </p>
      </div>

      {/* Pilihan mode */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            type="button"
            onClick={() => switchMode(key)}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              mode === key
                ? 'bg-green-500 text-slate-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.tab}
          </button>
        ))}
      </div>

      {/* Input jam */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="w-full sm:w-48">
          <label htmlFor="calc-time" className="block text-xs font-medium text-slate-400 mb-1">
            {MODES[mode].inputLabel}
          </label>
          <input
            id="calc-time"
            name="calc-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 [color-scheme:dark]"
          />
        </div>
        {mode === 'bed' && (
          <button
            type="button"
            onClick={useNow}
            className="px-4 py-2.5 rounded-xl border border-slate-800 text-sm text-slate-300 hover:border-green-500/50 hover:text-green-400 transition-colors"
          >
            Tidur sekarang
          </button>
        )}
      </div>

      {/* Hasil */}
      {minutes === null ? (
        <p className="text-sm text-slate-500">Isi jam terlebih dahulu untuk melihat saran.</p>
      ) : (
        <>
          <p className="text-sm font-medium text-slate-300 mb-3">{MODES[mode].resultTitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {results.map((r) => {
              const style = RATING_STYLE[r.rating];
              return (
                <div key={r.cycles} className={`rounded-2xl border p-4 text-center ${style.box}`}>
                  <div className="text-2xl font-bold text-white tracking-wide">{r.time}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {r.cycles} siklus · {formatDuration(r.sleepMinutes)}
                  </div>
                  <div className={`text-xs font-semibold mt-2 ${style.text}`}>{style.label}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <p className="text-xs text-slate-500 mt-5">
        Perkiraan berdasarkan siklus tidur ±90 menit dan ±15 menit untuk terlelap. Kebutuhan tidur tiap
        orang bisa berbeda.
      </p>
    </div>
  );
}

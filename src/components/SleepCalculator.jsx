import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  parseTime,
  formatDuration,
  bedtimesForWake,
  wakeTimesForBed,
} from '../utils/sleepCycles';

const RATING_STYLE = {
  ideal: { box: 'border-green-500/50 bg-green-500/10', text: 'text-green-400' },
  baik: { box: 'border-green-500/30 bg-green-500/5', text: 'text-green-300' },
  kurang: { box: 'border-yellow-500/30 bg-yellow-500/5', text: 'text-yellow-300' },
  singkat: { box: 'border-red-500/30 bg-red-500/5', text: 'text-red-300' },
};

const MODES = {
  wake: { tabKey: 'calc.modeWake', labelKey: 'calc.wakeLabel', resultKey: 'calc.resultWake', defaultTime: '06:00' },
  bed: { tabKey: 'calc.modeBed', labelKey: 'calc.bedLabel', resultKey: 'calc.resultBed', defaultTime: '22:30' },
};

export default function SleepCalculator() {
  const { t } = useLanguage();
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
        <h3 className="text-lg font-bold text-slate-200">{t('calc.title')}</h3>
        <p className="text-sm text-slate-400 mt-1">{t('calc.subtitle')}</p>
      </div>

      {/* Pilihan mode */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl mb-6">
        {Object.entries(MODES).map(([key, m]) => (
          <button
            key={key}
            type="button"
            onClick={() => switchMode(key)}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              mode === key ? 'bg-green-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t(m.tabKey)}
          </button>
        ))}
      </div>

      {/* Input jam */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="w-full sm:w-48">
          <label htmlFor="calc-time" className="block text-xs font-medium text-slate-400 mb-1">
            {t(MODES[mode].labelKey)}
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
            {t('calc.now')}
          </button>
        )}
      </div>

      {/* Hasil */}
      {minutes === null ? (
        <p className="text-sm text-slate-500">{t('calc.empty')}</p>
      ) : (
        <>
          <p className="text-sm font-medium text-slate-300 mb-3">{t(MODES[mode].resultKey)}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {results.map((r) => {
              const style = RATING_STYLE[r.rating];
              return (
                <div key={r.cycles} className={`rounded-2xl border p-4 text-center ${style.box}`}>
                  <div className="text-2xl font-bold text-white tracking-wide">{r.time}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {t('calc.cycles', { n: r.cycles })} · {formatDuration(r.sleepMinutes, t)}
                  </div>
                  <div className={`text-xs font-semibold mt-2 ${style.text}`}>{t(`calc.rating.${r.rating}`)}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <p className="text-xs text-slate-500 mt-5">{t('calc.note')}</p>
    </div>
  );
}

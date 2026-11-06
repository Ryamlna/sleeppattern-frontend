// Logika kalkulator jam tidur (fungsi murni, tanpa React).
// Satu siklus tidur ≈ 90 menit, dan rata-rata orang butuh ≈ 15 menit untuk terlelap.

export const CYCLE_MIN = 90;
export const FALL_ASLEEP_MIN = 15;
const DAY = 24 * 60;

/** "06:30" -> 390 (menit sejak 00:00). Mengembalikan null jika tidak valid. */
export function parseTime(hhmm) {
  if (!/^\d{2}:\d{2}$/.test(hhmm || '')) return null;
  const [h, m] = hhmm.split(':').map(Number);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

/** 390 -> "06:30". Aman untuk nilai negatif / lewat tengah malam. */
export function formatTime(minutes) {
  const t = ((minutes % DAY) + DAY) % DAY;
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}

/** 450 -> "7 j 30 mnt", 540 -> "9 jam". */
export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} j ${m} mnt` : `${h} jam`;
}

/** Penilaian berdasarkan jumlah siklus. */
export function getRating(cycles) {
  if (cycles >= 6) return 'ideal';
  if (cycles === 5) return 'baik';
  if (cycles === 4) return 'kurang';
  return 'singkat';
}

/** Harus bangun jam X -> kapan sebaiknya mulai tidur (diurutkan dari yang paling awal). */
export function bedtimesForWake(wakeMinutes, cycleCounts = [6, 5, 4, 3]) {
  return cycleCounts.map((n) => ({
    cycles: n,
    sleepMinutes: n * CYCLE_MIN,
    time: formatTime(wakeMinutes - n * CYCLE_MIN - FALL_ASLEEP_MIN),
    rating: getRating(n),
  }));
}

/** Tidur jam X -> kapan sebaiknya bangun (diurutkan dari yang paling cepat). */
export function wakeTimesForBed(bedMinutes, cycleCounts = [3, 4, 5, 6]) {
  return cycleCounts.map((n) => ({
    cycles: n,
    sleepMinutes: n * CYCLE_MIN,
    time: formatTime(bedMinutes + FALL_ASLEEP_MIN + n * CYCLE_MIN),
    rating: getRating(n),
  }));
}

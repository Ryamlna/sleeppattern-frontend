// src/data/artikelEdukasi.jsx
//
// Setiap artikel punya teks bahasa Indonesia (field utama) dan versi Inggris di dalam `en`.
// Di halaman, gunakan localizeArticle(artikel, lang) agar teksnya mengikuti bahasa yang dipilih.
// `icon` memilih ikon artikel (heart | bolt | pulse | phone), menggantikan emoji.

export const artikelEdukasi = [
  {
    id: 1,
    category: 'Kesehatan',
    color: 'bg-blue-500/10 text-blue-400',
    title: 'Manfaat Tidur Cukup Bagi Kesehatan',
    excerpt: 'Tidur yang cukup membantu menjaga fungsi otak, kesehatan jantung, dan sistem imun. Simak penjelasannya.',
    icon: 'heart',
    content: `
      Menurut pedoman kesehatan standar, orang dewasa dianjurkan untuk tidur selama 7 hingga 8 jam setiap malam. Tidur bukanlah sekadar waktu tubuh beristirahat, melainkan proses biologis yang sangat aktif.
      
      Saat kita berada dalam fase tidur dalam (Deep Sleep), tubuh memproduksi protein bernama sitokin yang berfungsi melawan infeksi dan peradangan. Ini sebabnya orang yang kurang tidur lebih rentan terkena flu. Selain itu, fase REM (Rapid Eye Movement) sangat krusial bagi otak untuk memproses informasi, mengonsolidasikan memori, dan membuang racun (limbah neurotoksik) yang menumpuk selama kita bangun.
      
      Secara medis, kurang tidur kronis telah terbukti meningkatkan risiko penyakit kardiovaskular, hipertensi, obesitas, dan diabetes tipe 2. Oleh karena itu, menjaga konsistensi jam tidur sama pentingnya dengan menjaga pola makan dan berolahraga.
    `,
    source: 'Disarikan dari pedoman Kementerian Kesehatan RI & Jurnal Sleep Medicine.',
    en: {
      category: 'Health',
      title: 'The Health Benefits of Getting Enough Sleep',
      excerpt: 'Enough sleep supports brain function, heart health, and the immune system. Here is what you should know.',
      content: `
      According to standard health guidelines, adults are advised to sleep 7 to 8 hours each night. Sleep is not merely a time when the body rests; it is a highly active biological process.
      
      During deep sleep, the body produces proteins called cytokines that fight infection and inflammation, which is why people who sleep too little are more prone to catching the flu. In addition, REM (Rapid Eye Movement) sleep is crucial for the brain to process information, consolidate memories, and clear out the waste (neurotoxic waste) that builds up while we are awake.
      
      Medically, chronic sleep deprivation has been shown to increase the risk of cardiovascular disease, hypertension, obesity, and type 2 diabetes. That is why keeping a consistent sleep schedule is just as important as eating well and exercising.
    `,
      source: 'Summarized from guidelines of the Indonesian Ministry of Health & the journal Sleep Medicine.',
    },
  },
  {
    id: 2,
    category: 'Olahraga',
    color: 'bg-orange-500/10 text-orange-400',
    title: 'Hubungan Antara Olahraga dan Kualitas Tidur',
    excerpt: 'Fakta medis membuktikan bahwa aktivitas fisik teratur dapat memperpanjang durasi fase tidur nyenyak (Deep Sleep).',
    icon: 'bolt',
    content: `
      Banyak studi klinis membuktikan bahwa olahraga aerobik maupun resistensi (angkat beban) yang dilakukan secara rutin dapat meningkatkan kualitas tidur secara signifikan.
      
      Olahraga membantu tubuh melepaskan endorfin dan mengurangi tingkat stres kognitif yang sering kali memicu insomnia. Selain itu, olahraga menyebabkan peningkatan suhu tubuh. Ketika suhu tubuh kembali turun setelah beberapa jam pasca-olahraga, ini memicu sinyal alami ke otak bahwa sudah saatnya untuk tidur, meniru penurunan suhu tubuh alami yang terjadi di malam hari.
      
      Namun, hindari berolahraga intensitas tinggi dalam kurun waktu 1-2 jam sebelum waktu tidur. Peningkatan detak jantung dan hormon adrenalin yang terlalu dekat dengan jam tidur justru dapat membuat tubuh tetap waspada dan kesulitan terlelap.
    `,
    source: 'Disarikan dari penelitian Johns Hopkins Medicine & Halodoc.',
    en: {
      category: 'Exercise',
      title: 'The Relationship Between Exercise and Sleep Quality',
      excerpt: 'Medical evidence shows that regular physical activity can lengthen the duration of deep sleep.',
      content: `
      Many clinical studies show that regular aerobic and resistance (weightlifting) exercise can significantly improve sleep quality.
      
      Exercise helps the body release endorphins and reduces the cognitive stress that often triggers insomnia. It also raises body temperature. When body temperature drops again a few hours after exercise, it sends the brain a natural signal that it is time to sleep, mimicking the natural drop in body temperature that happens at night.
      
      However, avoid high-intensity exercise within 1-2 hours of bedtime. A heart rate and adrenaline level that are still elevated close to bedtime can keep the body alert and make it harder to fall asleep.
    `,
      source: 'Summarized from research by Johns Hopkins Medicine & Halodoc.',
    },
  },
  {
    id: 3,
    category: 'Penyakit',
    color: 'bg-red-500/10 text-red-400',
    title: 'Mengenal Sleep Apnea dan Bahayanya',
    excerpt: 'Sering mendengkur kencang dan terbangun dengan napas tersengal? Kenali gejala Sleep Apnea dan kapan harus ke dokter.',
    icon: 'pulse',
    content: `
      Obstructive Sleep Apnea (OSA) adalah gangguan tidur serius di mana pernapasan seseorang berulang kali berhenti dan dimulai kembali saat tidur. Hal ini terjadi karena otot-otot di bagian belakang tenggorokan terlalu rileks, sehingga menutupi jalan napas.
      
      Gejala utamanya meliputi dengkuran yang sangat keras, terbangun tiba-tiba dengan napas tersengal atau tercekik, mulut kering saat bangun, serta rasa kantuk yang ekstrem di siang hari (hypersomnia).
      
      Jika dibiarkan tanpa penanganan, Sleep Apnea akan memicu penurunan kadar oksigen dalam darah secara drastis di malam hari. Hal ini memaksa jantung bekerja lebih ekstra, yang dalam jangka panjang secara drastis meningkatkan risiko tekanan darah tinggi (hipertensi), serangan jantung, stroke, dan aritmia. Jika Anda atau orang terdekat mengalami gejala ini, sangat disarankan untuk berkonsultasi dengan dokter THT atau klinik gangguan tidur.
    `,
    source: 'Disarikan dari panduan medis Alodokter & Mayo Clinic.',
    en: {
      category: 'Conditions',
      title: 'Understanding Sleep Apnea and Its Dangers',
      excerpt: 'Loud snoring and waking up gasping for air? Learn the symptoms of sleep apnea and when to see a doctor.',
      content: `
      Obstructive Sleep Apnea (OSA) is a serious sleep disorder in which a person's breathing repeatedly stops and starts during sleep. It happens because the muscles at the back of the throat relax too much and block the airway.
      
      The main symptoms include very loud snoring, suddenly waking up gasping or choking, a dry mouth upon waking, and extreme daytime sleepiness (hypersomnia).
      
      Left untreated, sleep apnea can cause a drastic drop in blood oxygen levels at night. This forces the heart to work harder, which over the long term greatly increases the risk of high blood pressure (hypertension), heart attack, stroke, and arrhythmia. If you or someone close to you has these symptoms, it is strongly recommended to consult an ENT doctor or a sleep disorder clinic.
    `,
      source: 'Summarized from medical guidance by Alodokter & Mayo Clinic.',
    },
  },
  {
    id: 4,
    category: 'Tips',
    color: 'bg-blue-500/10 text-blue-400',
    title: 'Bahaya Main HP Sebelum Tidur',
    excerpt: 'Paparan cahaya biru dari layar gadget dapat menghambat produksi hormon melatonin. Ini cara mengatasinya.',
    icon: 'phone',
    content: `
      Kebiasaan melakukan "scrolling" media sosial di smartphone sebelum tidur adalah salah satu penyebab utama rendahnya kualitas tidur generasi modern.
      
      Layar ponsel, tablet, dan laptop memancarkan Blue Light (Cahaya Biru) dalam intensitas tinggi. Cahaya biru ini menipu kelenjar pineal di otak agar mengira bahwa hari masih siang. Akibatnya, otak menahan atau menunda produksi melatonin—hormon alami yang mengatur siklus tidur-bangun (Ritme Sirkadian) dan membuat kita merasa ngantuk.
      
      Para pakar kesehatan tidur (Sleep Hygiene) merekomendasikan detoks digital setidaknya 30 hingga 60 menit sebelum tidur. Sebagai gantinya, Anda bisa membaca buku fisik, mendengarkan musik relaksasi, atau melakukan peregangan ringan. Jika terpaksa menggunakan gawai, pastikan fitur "Night Mode" (Filter Cahaya Kuning) diaktifkan dan turunkan tingkat kecerahan layar ke tingkat minimum.
    `,
    source: 'Disarikan dari jurnal kesehatan Siloam Hospitals & Sleep Foundation.',
    en: {
      category: 'Tips',
      title: 'The Dangers of Using Your Phone Before Bed',
      excerpt: 'Blue light from gadget screens can suppress the production of the hormone melatonin. Here is how to deal with it.',
      content: `
      Scrolling through social media on your smartphone before bed is one of the main causes of poor sleep quality in the modern generation.
      
      Phone, tablet, and laptop screens emit high-intensity blue light. This blue light tricks the pineal gland in the brain into thinking it is still daytime. As a result, the brain holds back or delays the production of melatonin, the natural hormone that regulates the sleep-wake cycle (circadian rhythm) and makes us feel sleepy.
      
      Sleep hygiene experts recommend a digital detox of at least 30 to 60 minutes before bed. Instead, you can read a physical book, listen to relaxing music, or do some light stretching. If you have to use a device, make sure "Night Mode" (a warm-tone light filter) is turned on and lower the screen brightness to the minimum.
    `,
      source: 'Summarized from health journals by Siloam Hospitals & the Sleep Foundation.',
    },
  },
];

/** Mengembalikan artikel dengan teks sesuai bahasa ('id' atau 'en'). */
export function localizeArticle(article, lang) {
  if (lang === 'en' && article.en) return { ...article, ...article.en };
  return article;
}

export type Comment = {
  name: string;
  text: string;
  avatar: string;
  color: string;
  time: string;
};

export type ReportItem = {
  id: string;
  type: string;
  location: string;
  address: string;
  description: string;
  photoUrl: string | null;
  time: string;
  date: string;
  status: string;
  statusTone: "emerald" | "amber" | "sky";
  namaPelapor: string;
  tingkatKeparahan: string;
  latitude: number;
  longitude: number;
  comments: Comment[];
};

const COMMENTS_KEY = "siaga_comments";
const SAVED_REPORTS_KEY = "siaga_saved_reports";

let nextId = 9;

const defaultReports: ReportItem[] = [
  {
    id: "1",
    type: "Banjir",
    location: "Balikpapan Selatan",
    address: "Jl. Jenderal Sudirman No. 45, Kelurahan Damai, Kecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur",
    description: "Terdapat genangan air di jalur utama dengan ketinggian sekitar 30 cm. Lalu lintas sempat terhambat namun kini sudah mulai lancar.",
    photoUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=500&fit=crop",
    time: "08:15 WITA",
    date: "Selasa, 8 Juli 2026",
    status: "Terverifikasi",
    statusTone: "emerald",
    namaPelapor: "Andi Saputra",
    tingkatKeparahan: "Sedang",
    latitude: -1.2445,
    longitude: 116.8352,
    comments: [
      { name: "Andi", text: "Semoga segera ditangani.", avatar: "A", color: "bg-sky-100 text-sky-700", time: "08:20 WITA" },
      { name: "Siti", text: "Air sudah mulai masuk ke rumah warga.", avatar: "S", color: "bg-amber-100 text-amber-700", time: "08:35 WITA" },
      { name: "Budi", text: "Terima kasih sudah melaporkan.", avatar: "B", color: "bg-emerald-100 text-emerald-700", time: "09:00 WITA" },
    ],
  },
  {
    id: "2",
    type: "Pohon Tumbang",
    location: "Balikpapan Tengah",
    address: "Jl. P. Diponegoro No. 12, Kelurahan Gunung Bahagia, Kecamatan Balikpapan Tengah, Kota Balikpapan, Kalimantan Timur",
    description: "Sebuah pohon besar tumbang menutupi separuh jalan utama akibat angin kencang. Belum ada korban jiwa, namun lalu lintas terganggu.",
    photoUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=500&fit=crop",
    time: "14:30 WITA",
    date: "Senin, 7 Juli 2026",
    status: "Menunggu Verifikasi",
    statusTone: "amber",
    namaPelapor: "Siti Nurhaliza",
    tingkatKeparahan: "Tinggi",
    latitude: -1.2580,
    longitude: 116.8480,
    comments: [
      { name: "Dewi", text: "Pohon tumbang menimpa pagar rumah saya.", avatar: "D", color: "bg-rose-100 text-rose-700", time: "14:45 WITA" },
      { name: "Rizky", text: "Listrik padam di sekitar sini.", avatar: "R", color: "bg-amber-100 text-amber-700", time: "15:00 WITA" },
      { name: "Maya", text: "Sudah mulai dibersihkan sekarang.", avatar: "M", color: "bg-emerald-100 text-emerald-700", time: "16:20 WITA" },
    ],
  },
  {
    id: "3",
    type: "Longsor",
    location: "Balikpapan Utara",
    address: "Jl. P. Antasari No. 88, Kelurahan Batu Ampar, Kecamatan Balikpapan Utara, Kota Balikpapan, Kalimantan Timur",
    description: "Tanah longsor kecil terjadi di tepi jalan setelah hujan deras. Material tanah menutupi separuh badan jalan dan perlu segera dibersihkan.",
    photoUrl: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&h=500&fit=crop",
    time: "11:05 WITA",
    date: "Minggu, 6 Juli 2026",
    status: "Diproses",
    statusTone: "sky",
    namaPelapor: "Budi Santoso",
    tingkatKeparahan: "Sedang",
    latitude: -1.2310,
    longitude: 116.8580,
    comments: [
      { name: "Hendra", text: "Jalan ini memang rawan longsor kalau hujan.", avatar: "H", color: "bg-sky-100 text-sky-700", time: "11:10 WITA" },
      { name: "Lina", text: "Terima kasih sudah melaporkan.", avatar: "L", color: "bg-amber-100 text-amber-700", time: "11:30 WITA" },
      { name: "Agus", text: "Sudah mulai dibersihkan.", avatar: "A", color: "bg-emerald-100 text-emerald-700", time: "12:00 WITA" },
    ],
  },
  {
    id: "4",
    type: "Jalan Tergenang",
    location: "Sepinggan",
    address: "Jl. Ruhui Rahayu No. 33, Kelurahan Sepinggan Pratama, Kecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur",
    description: "Genangan air setinggi 20 cm di jalan utama menuju kawasan pergudangan. Lalu lintas masih berjalan namun terhambat. Warga berharap segera ada penanganan.",
    photoUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop",
    time: "09:30 WITA",
    date: "Rabu, 9 Juli 2026",
    status: "Terverifikasi",
    statusTone: "emerald",
    namaPelapor: "Dewi Lestari",
    tingkatKeparahan: "Rendah",
    latitude: -1.2370,
    longitude: 116.8600,
    comments: [],
  },
  {
    id: "5",
    type: "Drainase Tersumbat",
    location: "Manggar",
    address: "Jl. Manggar Raya No. 7, Kelurahan Manggar, Kecamatan Balikpapan Timur, Kota Balikpapan, Kalimantan Timur",
    description: "Saluran drainase tersumbat sampah dan menyebabkan air meluap ke jalan. Warga sudah berupaya membersihkan secara swadaya namun belum tuntas.",
    photoUrl: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800&h=500&fit=crop",
    time: "07:00 WITA",
    date: "Kamis, 10 Juli 2026",
    status: "Menunggu Verifikasi",
    statusTone: "amber",
    namaPelapor: "Rizky Pratama",
    tingkatKeparahan: "Sedang",
    latitude: -1.2200,
    longitude: 116.8750,
    comments: [],
  },
  {
    id: "6",
    type: "Banjir",
    location: "Balikpapan Barat",
    address: "Jl. MT Haryono No. 21, Kelurahan Kariangau, Kecamatan Balikpapan Barat, Kota Balikpapan, Kalimantan Timur",
    description: "Banjir akibat hujan deras sejak subuh. Ketinggian air mencapai 50 cm di pemukiman rendah. Beberapa warga mulai mengungsi ke tempat yang lebih aman.",
    photoUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=500&fit=crop",
    time: "06:30 WITA",
    date: "Kamis, 10 Juli 2026",
    status: "Diproses",
    statusTone: "sky",
    namaPelapor: "Maya Anggraeni",
    tingkatKeparahan: "Tinggi",
    latitude: -1.2500,
    longitude: 116.8200,
    comments: [],
  },
  {
    id: "7",
    type: "Pohon Tumbang",
    location: "Gunung Bahagia",
    address: "Jl. Gajah Mada No. 56, Kelurahan Gunung Bahagia, Kecamatan Balikpapan Tengah, Kota Balikpapan, Kalimantan Timur",
    description: "Pohon ketapang tumbang menimpa kabel listrik. Petugas PLN sudah di lokasi untuk perbaikan. Tidak ada korban jiwa.",
    photoUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=500&fit=crop",
    time: "10:45 WITA",
    date: "Selasa, 8 Juli 2026",
    status: "Terverifikasi",
    statusTone: "emerald",
    namaPelapor: "Hendra Wijaya",
    tingkatKeparahan: "Sedang",
    latitude: -1.2555,
    longitude: 116.8460,
    comments: [],
  },
  {
    id: "8",
    type: "Longsor",
    location: "Batu Ampar",
    address: "Jl. Sultan Hasanuddin No. 14, Kelurahan Batu Ampar, Kecamatan Balikpapan Utara, Kota Balikpapan, Kalimantan Timur",
    description: "Longsor kecil di lereng bukit perumahan setelah hujan lebat. Beberapa rumah di bawah lereng diminta waspada. Tim BPBD sudah meninjau lokasi.",
    photoUrl: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&h=500&fit=crop",
    time: "15:20 WITA",
    date: "Rabu, 9 Juli 2026",
    status: "Menunggu Verifikasi",
    statusTone: "amber",
    namaPelapor: "Lina Marlina",
    tingkatKeparahan: "Tinggi",
    latitude: -1.2400,
    longitude: 116.8700,
    comments: [],
  },
];

let reports: ReportItem[] = [...defaultReports];

/* ─── localStorage helpers ────────────────────────────────────────────────── */

function loadExtraComments(): Record<string, Comment[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveExtraComments(data: Record<string, Comment[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(data));
}

function loadSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_REPORTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSavedIds(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SAVED_REPORTS_KEY, JSON.stringify(ids));
}

/* ─── merge functions ─────────────────────────────────────────────────────── */

function mergeComments(): void {
  const extra = loadExtraComments();
  for (const r of reports) {
    const saved = extra[r.id];
    if (saved && saved.length > 0) {
      const defaultCount = defaultReports.find((d) => d.id === r.id)?.comments.length ?? 0;
      r.comments = [...r.comments.slice(0, defaultCount), ...saved];
    }
  }
}

mergeComments();

/* ─── exported functions ──────────────────────────────────────────────────── */

export function getReports(): ReportItem[] {
  mergeComments();
  return [...reports];
}

export function getReportById(id: string): ReportItem | undefined {
  mergeComments();
  return reports.find((r) => r.id === id);
}

export function addComment(reportId: string, data: { name: string; text: string; avatar: string; color: string }): Comment | null {
  const report = reports.find((r) => r.id === reportId);
  if (!report) return null;

  const now = new Date();
  const timeStr =
    now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Makassar",
    }) + " WITA";

  const comment: Comment = {
    name: data.name,
    text: data.text,
    avatar: data.avatar,
    color: data.color,
    time: timeStr,
  };

  report.comments = [comment, ...report.comments];

  const extra = loadExtraComments();
  const defaultCount = defaultReports.find((d) => d.id === reportId)?.comments.length ?? 0;
  extra[reportId] = report.comments.slice(defaultCount);
  saveExtraComments(extra);

  return comment;
}

export function verifyReport(reportId: string): boolean {
  const report = reports.find((r) => r.id === reportId);
  if (!report) return false;
  report.status = "Terverifikasi";
  report.statusTone = "emerald";
  return true;
}

export function deleteReport(reportId: string): boolean {
  const index = reports.findIndex((r) => r.id === reportId);
  if (index === -1) return false;
  reports.splice(index, 1);

  const savedIds = loadSavedIds();
  const savedIndex = savedIds.indexOf(reportId);
  if (savedIndex > -1) {
    savedIds.splice(savedIndex, 1);
    saveSavedIds(savedIds);
  }

  return true;
}

export function addReport(data: {
  type: string;
  location: string;
  address: string;
  description: string;
  photoUrl: string | null;
}): ReportItem {
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr =
    now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Makassar",
    }) + " WITA";

  const newReport: ReportItem = {
    id: String(nextId++),
    type: data.type,
    location: data.location || "Lokasi belum diisi",
    address: data.address || data.location || "Alamat belum tersedia",
    description: data.description || "Tidak ada deskripsi",
    photoUrl: data.photoUrl,
    time: timeStr,
    date: dateStr,
    status: "Menunggu Verifikasi",
    statusTone: "amber",
    namaPelapor: "Warga",
    tingkatKeparahan: "Belum diketahui",
    latitude: -1.2479,
    longitude: 116.8480,
    comments: [],
  };

  reports = [newReport, ...reports];
  return newReport;
}

export function getSavedReportIds(): string[] {
  return loadSavedIds();
}

export function isReportSaved(reportId: string): boolean {
  return loadSavedIds().includes(reportId);
}

export function toggleSaveReport(reportId: string): boolean {
  const ids = loadSavedIds();
  const index = ids.indexOf(reportId);
  if (index > -1) {
    ids.splice(index, 1);
  } else {
    ids.push(reportId);
  }
  saveSavedIds(ids);
  return index === -1;
}

export function getSavedReports(): ReportItem[] {
  mergeComments();
  const savedIds = loadSavedIds();
  return reports.filter((r) => savedIds.includes(r.id));
}

export function getDisasterStats(): Array<{ type: string; count: number; color: string; bgColor: string }> {
  const allReports = getReports();
  const types = [
    { type: "Banjir", color: "text-blue-700", bgColor: "bg-blue-50" },
    { type: "Pohon Tumbang", color: "text-green-700", bgColor: "bg-green-50" },
    { type: "Longsor", color: "text-amber-700", bgColor: "bg-amber-50" },
    { type: "Jalan Tergenang", color: "text-cyan-700", bgColor: "bg-cyan-50" },
  ];
  return types.map((t) => ({
    ...t,
    count: allReports.filter((r) => r.type === t.type).length,
  }));
}

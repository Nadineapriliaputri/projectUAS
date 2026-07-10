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
  comments: Comment[];
};

const COMMENTS_KEY = "siaga_comments";
const SAVED_REPORTS_KEY = "siaga_saved_reports";

let nextId = 4;

const defaultReports: ReportItem[] = [
  {
    id: "1",
    type: "Titik Banjir",
    location: "Balikpapan Selatan",
    address: "Jl. Jenderal Sudirman No. 45, Kelurahan Damai, Kecamatan Balikpapan Selatan, Kota Balikpapan, Kalimantan Timur",
    description: "Terdapat genangan air di jalur utama dengan ketinggian sekitar 30 cm.",
    photoUrl: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=500&fit=crop",
    time: "08:15 WITA",
    date: "Selasa, 8 Juli 2026",
    status: "Terverifikasi",
    statusTone: "emerald",
    comments: [
      { name: "Andi", text: "Semoga segera ditangani.", avatar: "A", color: "bg-sky-100 text-sky-700", time: "08:20 WITA" },
      { name: "Siti", text: "Air sudah mulai masuk ke rumah warga.", avatar: "S", color: "bg-amber-100 text-amber-700", time: "08:35 WITA" },
      { name: "Budi", text: "Terima kasih sudah melaporkan.", avatar: "B", color: "bg-emerald-100 text-emerald-700", time: "09:00 WITA" },
    ],
  },
  {
    id: "2",
    type: "Angin Kencang",
    location: "Balikpapan Tengah",
    address: "Jl. P. Diponegoro No. 12, Kelurahan Gunung Bahagia, Kecamatan Balikpapan Tengah, Kota Balikpapan, Kalimantan Timur",
    description: "Angin terasa lebih kuat di area terbuka dan simpang besar.",
    photoUrl: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&h=500&fit=crop",
    time: "14:30 WITA",
    date: "Senin, 7 Juli 2026",
    status: "Menunggu",
    statusTone: "amber",
    comments: [
      { name: "Dewi", text: "Atap rumah saya sampai terbang.", avatar: "D", color: "bg-rose-100 text-rose-700", time: "14:45 WITA" },
      { name: "Rizky", text: "Listrik padam di sekitar sini.", avatar: "R", color: "bg-amber-100 text-amber-700", time: "15:00 WITA" },
      { name: "Maya", text: "Sudah mulai membaik sekarang.", avatar: "M", color: "bg-emerald-100 text-emerald-700", time: "16:20 WITA" },
    ],
  },
  {
    id: "3",
    type: "Genangan Jalan",
    location: "Balikpapan Utara",
    address: "Jl. P. Antasari No. 88, Kelurahan Batu Ampar, Kecamatan Balikpapan Utara, Kota Balikpapan, Kalimantan Timur",
    description: "Genangan terjadi setelah hujan singkat dan mulai berangsur surut.",
    photoUrl: "https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&h=500&fit=crop",
    time: "11:05 WITA",
    date: "Minggu, 6 Juli 2026",
    status: "Diproses",
    statusTone: "sky",
    comments: [
      { name: "Hendra", text: "Jalan ini memang sering banjir kalau hujan.", avatar: "H", color: "bg-sky-100 text-sky-700", time: "11:10 WITA" },
      { name: "Lina", text: "Terima kasih sudah melaporkan.", avatar: "L", color: "bg-amber-100 text-amber-700", time: "11:30 WITA" },
      { name: "Agus", text: "Air sudah mulai surut.", avatar: "A", color: "bg-emerald-100 text-emerald-700", time: "12:00 WITA" },
    ],
  },
];

let reports: ReportItem[] = [...defaultReports];

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
    status: "Diproses",
    statusTone: "sky",
    comments: [],
  };

  reports = [newReport, ...reports];
  return newReport;
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

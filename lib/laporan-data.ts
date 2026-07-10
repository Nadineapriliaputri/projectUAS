export type Laporan = {
  id: number;
  latitude: number;
  longitude: number;
  namaLokasi: string;
  jenisBencana: "Banjir" | "Angin Kencang";
  tingkatKeparahan: string;
  status: string;
  waktuLaporan: string;
  deskripsi: string;
};

export const laporanData: Laporan[] = [
  {
    id: 1,
    latitude: -1.2145,
    longitude: 116.8652,
    namaLokasi: "Jl. Jenderal Sudirman, Balikpapan Kota",
    jenisBencana: "Banjir",
    tingkatKeparahan: "Tinggi",
    status: "Terverifikasi",
    waktuLaporan: "2026-07-10 08:15",
    deskripsi: "Ketinggian air mencapai 60 cm. Lalu lintas terganggu, warga mulai mengungsi.",
  },
  {
    id: 2,
    latitude: -1.2480,
    longitude: 116.8380,
    namaLokasi: "Kelurahan Sepinggan",
    jenisBencana: "Angin Kencang",
    tingkatKeparahan: "Sedang",
    status: "Menunggu Verifikasi",
    waktuLaporan: "2026-07-10 09:30",
    deskripsi: "Angin kencang merusak atap beberapa rumah warga. Belum ada korban jiwa.",
  },
  {
    id: 3,
    latitude: -1.2310,
    longitude: 116.8780,
    namaLokasi: "Kawasan Pergudangan, Batu Ampar",
    jenisBencana: "Banjir",
    tingkatKeparahan: "Sedang",
    status: "Terverifikasi",
    waktuLaporan: "2026-07-10 07:45",
    deskripsi: "Genangan air setinggi 30 cm di area pergudangan. Aktivitas bongkar muat terhenti.",
  },
  {
    id: 4,
    latitude: -1.2555,
    longitude: 116.8560,
    namaLokasi: "Jl. Manggis, Gunung Bahagia",
    jenisBencana: "Banjir",
    tingkatKeparahan: "Rendah",
    status: "Terverifikasi",
    waktuLaporan: "2026-07-10 10:00",
    deskripsi: "Genangan air di jalan setempat. Masih bisa dilalui kendaraan roda dua.",
  },
  {
    id: 5,
    latitude: -1.2200,
    longitude: 116.8450,
    namaLokasi: "Kelurahan Manggar",
    jenisBencana: "Angin Kencang",
    tingkatKeparahan: "Tinggi",
    status: "Terverifikasi",
    waktuLaporan: "2026-07-10 06:50",
    deskripsi: "Angin kencang menumbangkan pohon besar yang menimpa gardu listrik.",
  },
  {
    id: 6,
    latitude: -1.2400,
    longitude: 116.8700,
    namaLokasi: "Pantai Manggar",
    jenisBencana: "Angin Kencang",
    tingkatKeparahan: "Rendah",
    status: "Menunggu Verifikasi",
    waktuLaporan: "2026-07-10 11:20",
    deskripsi: "Angin kencang di area pantai. Beberapa pedagang mengungsi sementara.",
  },
  {
    id: 7,
    latitude: -1.2370,
    longitude: 116.8300,
    namaLokasi: "Jl. Ruhui Rahayu, Sepinggan Pratama",
    jenisBencana: "Banjir",
    tingkatKeparahan: "Tinggi",
    status: "Menunggu Verifikasi",
    waktuLaporan: "2026-07-10 08:00",
    deskripsi: "Banjir dengan ketinggian hingga 80 cm di pemukiman padat penduduk.",
  },
  {
    id: 8,
    latitude: -1.2600,
    longitude: 116.8600,
    namaLokasi: "Perumahan BTN Damai, Balikpapan Barat",
    jenisBencana: "Angin Kencang",
    tingkatKeparahan: "Sedang",
    status: "Terverifikasi",
    waktuLaporan: "2026-07-10 09:10",
    deskripsi: "Atap rumah warga terangkat akibat hembusan angin kencang. Kerugian diperkirakan Rp 15 juta.",
  },
];

/* ─── stats helper ───────────────────────────────────────────────────────── */

export type LaporanStats = {
  total: number;
  banjir: number;
  anginKencang: number;
};

export function getLaporanStats(): LaporanStats {
  return {
    total: laporanData.length,
    banjir: laporanData.filter((l) => l.jenisBencana === "Banjir").length,
    anginKencang: laporanData.filter((l) => l.jenisBencana === "Angin Kencang")
      .length,
  };
}

import Link from "next/link";
import WeatherSidebar from "@/components/weather-sidebar";

type DetailProps = {
  params: { id: string };
};

const reportDetails: Record<string, { title: string; location: string; description: string; comment: string }> = {
  "1": {
    title: "Titik Banjir",
    location: "Balikpapan Selatan",
    description: "Terdapat genangan air di jalur utama dengan ketinggian rendah.",
    comment: "Petugas meminta pengguna jalan untuk melambat dan memilih jalur alternatif.",
  },
  "2": {
    title: "Angin Kencang",
    location: "Balikpapan Tengah",
    description: "Angin terasa lebih kuat di area terbuka dan simpang besar.",
    comment: "Warga diminta mengamankan benda ringan di luar ruangan.",
  },
  "3": {
    title: "Genangan Jalan",
    location: "Balikpapan Utara",
    description: "Genangan terjadi setelah hujan singkat dan mulai berangsur surut.",
    comment: "Kondisi masih bisa dilalui kendaraan roda dua dengan hati-hati.",
  },
};

export default function LaporanDetailPage({ params }: DetailProps) {
  const detail = reportDetails[params.id] ?? reportDetails["1"];

  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Laporan Warga" location="Balikpapan" status="Pantauan aktif" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
                Detail Laporan
              </p>
              <h1 className="text-3xl font-semibold text-slate-900">{detail.title}</h1>
              <p className="text-sm text-slate-500">{detail.location}</p>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-[#f5f9ef] p-6">
                <div className="flex h-72 items-center justify-center rounded-[22px] bg-white text-slate-500">
                  Foto placeholder
                </div>
              </div>

              <div className="space-y-4 rounded-[28px] bg-[#f5f9ef] p-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                    Deskripsi Laporan
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{detail.description}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                    Lokasi
                  </p>
                  <p className="mt-2 text-sm text-slate-700">{detail.location}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                    Komentar
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{detail.comment}</p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-500"
                >
                  Konfirmasi Akurat
                </button>

                <Link
                  href="/laporan"
                  className="inline-flex items-center justify-center rounded-full border border-lime-200 bg-white px-4 py-3 text-sm font-semibold text-lime-700 transition-colors hover:bg-lime-50"
                >
                  Kembali ke Laporan
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import WeatherSidebar from "@/components/weather-sidebar";

const summaryCards = [
  {
    title: "Cuaca Ekstrem",
    status: "Waspada",
    description: "Potensi hujan dan angin meningkat.",
    tone: "amber",
    detail: "BMKG mengeluarkan peringatan cuaca ekstrem untuk wilayah Balikpapan dan sekitarnya. Potensi hujan lebat disertai angin kencang pada sore hingga malam hari. Warga diimbau untuk tetap waspada dan menghindari aktivitas di luar ruangan jika tidak mendesak.",
  },
  {
    title: "Peringatan BMKG",
    status: "Aktif",
    description: "Ada peringatan dini wilayah sekitar.",
    tone: "emerald",
    detail: "BMKG Stasiun Meteorologi Balikpapan mengeluarkan peringatan dini gelombang tinggi dan angin kencang untuk wilayah pesisir. Kecepatan angin dapat mencapai 40 km/jam dengan gelombang laut setinggi 2-3 meter. Nelayan dan pengguna jasa transportasi laut diimbau untuk berhati-hati.",
  },
  {
    title: "Laporan Baru di Sekitar",
    status: "Baru",
    description: "Terdapat laporan terbaru dari warga.",
    tone: "sky",
    detail: "Terdapat 3 laporan baru dari warga sekitar dalam 2 jam terakhir. Laporan meliputi genangan air di beberapa titik jalan, pohon tumbang, dan banjir ringan di kawasan permukiman. Tim reaksi cepat sedang dalam perjalanan menuju lokasi.",
  },
] as const;

const timeline = [
  { time: "08:15", text: "Peringatan hujan sedang", badge: "Cuaca", tone: "amber", detail: "BMKG mengeluarkan peringatan hujan sedang hingga lebat di wilayah Balikpapan. Hujan diperkirakan berlangsung dari pagi hingga sore hari dengan intensitas yang dapat berubah sewaktu-waktu." },
  { time: "09:20", text: "Laporan banjir masuk", badge: "Laporan", tone: "sky", detail: "Warga melaporkan banjir di Jl. MT Haryono, Balikpapan Selatan. Ketinggian air mencapai 30 cm dan mulai merendam jalan utama. Beberapa kendaraan roda dua sudah tidak bisa melintas." },
  { time: "11:05", text: "Kondisi kembali stabil", badge: "Cuaca", tone: "emerald", detail: "Hujan telah mereda di sebagian wilayah Balikpapan. Kondisi cuaca mulai membaik dengan langit berawan. Beberapa genangan air mulai surut seiring berjalannya waktu." },
  { time: "13:40", text: "BMKG memperbarui informasi", badge: "BMKG", tone: "emerald", detail: "BMKG memperbarui data curah hujan dan kecepatan angin untuk wilayah Kalimantan Timur. Tidak ada peringatan tambahan yang dikeluarkan. Kondisi cuaca dipredikkan stabil hingga malam hari." },
] as const;

const filters = ["Semua", "Cuaca", "BMKG", "Laporan"];

const toneClass = {
  amber: {
    panel: "border-amber-200 bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    icon: "bg-amber-100 text-amber-700",
  },
  emerald: {
    panel: "border-emerald-200 bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    icon: "bg-emerald-100 text-emerald-700",
  },
  sky: {
    panel: "border-sky-200 bg-sky-50",
    badge: "bg-sky-100 text-sky-700",
    icon: "bg-sky-100 text-sky-700",
  },
} as const;

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17H9a3 3 0 0 1-3-3v-2a6 6 0 1 1 12 0v2a3 3 0 0 1-3 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 17a2 2 0 0 0 4 0" />
    </svg>
  );
}

export default function NotifikasiPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedDetail, setSelectedDetail] = useState<{ title: string; detail: string; time?: string } | null>(null);

  const filteredTimeline = activeFilter === "Semua"
    ? timeline
    : timeline.filter((item) => item.badge === activeFilter);

  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Notifikasi" location="Balikpapan" status="Pembaruan aktif" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
              Notifikasi
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Pantau pembaruan cuaca dan laporan sekitar.
            </h1>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {summaryCards.map((card) => {
                const tone = toneClass[card.tone as keyof typeof toneClass];

                return (
                  <article
                    key={card.title}
                    className={`cursor-pointer rounded-[28px] border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.panel}`}
                    onClick={() => setSelectedDetail({ title: card.title, detail: card.detail })}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${tone.icon}`}>
                        <BellIcon />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.badge}`}>
                        {card.status}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{card.description}</p>
                  </article>
                );
              })}
            </div>

            <section className="mt-6 rounded-[28px] bg-[#f5f9ef] p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                    Timeline Notifikasi
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">Riwayat terbaru</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        activeFilter === filter
                          ? "bg-lime-600 text-white"
                          : "bg-white text-slate-600 hover:bg-lime-50"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {filteredTimeline.length === 0 ? (
                  <p className="text-center text-sm text-slate-500">Tidak ada notifikasi untuk kategori ini.</p>
                ) : filteredTimeline.map((item) => {
                  const tone = toneClass[item.tone as keyof typeof toneClass];

                  return (
                    <div
                      key={`${item.time}-${item.text}`}
                      className="cursor-pointer rounded-[22px] bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                      onClick={() => setSelectedDetail({ title: item.text, detail: item.detail, time: item.time })}
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tone.icon}`}>
                            <BellIcon />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.text}</p>
                            <p className="text-sm text-slate-500">{item.time}</p>
                          </div>
                        </div>

                        <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${tone.badge}`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>
        </div>
      </div>

      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSelectedDetail(null)}>
          <div
            className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">{selectedDetail.title}</h2>
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5">
              {selectedDetail.time && (
                <p className="mb-3 text-sm text-slate-500">Waktu: {selectedDetail.time} WITA</p>
              )}
              <div className="rounded-2xl bg-[#f5f9ef] p-4">
                <p className="text-sm leading-6 text-slate-700">{selectedDetail.detail}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDetail(null)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-500"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

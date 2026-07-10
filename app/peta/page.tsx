"use client";

import dynamic from "next/dynamic";
import WeatherSidebar from "@/components/weather-sidebar";
import {
  getLaporanStats,
  type LaporanStats,
} from "@/lib/laporan-data";

const PetaMapWithMarkers = dynamic(
  () => import("@/components/peta-map-with-markers"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[520px] items-center justify-center rounded-[24px] border border-slate-200 bg-slate-50 text-sm text-slate-400">
        Memuat peta...
      </div>
    ),
  }
);

const statCards: { label: string; key: keyof LaporanStats; color: string }[] =
  [
    { label: "Total Laporan", key: "total", color: "bg-slate-800" },
    { label: "Banjir", key: "banjir", color: "bg-blue-500" },
    { label: "Angin Kencang", key: "anginKencang", color: "bg-yellow-400" },
  ];

export default function PetaPage() {
  const stats = getLaporanStats();

  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] bg-white lg:grid-cols-[280px_minmax(0,1fr)]">

        <WeatherSidebar
          activeItem="Peta Cuaca"
          location="Balikpapan"
          status="Pantauan peta aktif"
          tip="Amati titik banjir sebelum bepergian."
        />

        <div className="bg-[#dcecc8] p-6">

          <section className="rounded-[30px] bg-white p-6 shadow-sm">

            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
                Peta Cuaca
              </p>

              <h1 className="text-2xl font-semibold text-slate-900">
                Peta Cuaca Balikpapan
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Pantau kondisi wilayah secara langsung.
              </p>
            </div>

            {/* ringkasan laporan */}
            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {statCards.map((card) => (
                <div
                  key={card.key}
                  className="flex items-center gap-3 rounded-2xl bg-[#f5f9ef] px-4 py-3"
                >
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${card.color}`}
                  />
                  <div>
                    <p className="text-lg font-bold leading-tight text-slate-900">
                      {stats[card.key]}
                    </p>
                    <p className="text-xs text-slate-500">{card.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-[24px] border border-slate-200">
              <PetaMapWithMarkers />
            </div>

          </section>

        </div>

      </div>
    </main>
  );
}

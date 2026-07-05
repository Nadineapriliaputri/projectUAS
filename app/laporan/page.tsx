"use client";

import { useState } from "react";
import Link from "next/link";
import WeatherSidebar from "@/components/weather-sidebar";

type ReportItem = {
  id: string;
  type: string;
  location: string;
  time: string;
  status: string;
  tone: "emerald" | "amber" | "sky";
};

const reports: ReportItem[] = [
  {
    id: "1",
    type: "Titik Banjir",
    location: "Balikpapan Selatan",
    time: "10 menit lalu",
    status: "Terverifikasi",
    tone: "emerald",
  },
  {
    id: "2",
    type: "Angin Kencang",
    location: "Balikpapan Tengah",
    time: "25 menit lalu",
    status: "Menunggu",
    tone: "amber",
  },
  {
    id: "3",
    type: "Genangan Jalan",
    location: "Balikpapan Utara",
    time: "1 jam lalu",
    status: "Diproses",
    tone: "sky",
  },
];

const statusClass = {
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  sky: "bg-sky-100 text-sky-700",
};

export default function LaporanPage() {
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("Titik Banjir");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Laporan Warga" location="Balikpapan" status="Pantauan aktif" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
              Laporan Warga
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Pantau dan kirim laporan kondisi di sekitar.
            </h1>

            <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                {reports.map((report) => (
                  <article key={report.id} className="rounded-[28px] border border-slate-200 bg-[#f5f9ef] p-5 shadow-sm">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
                          {report.type}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-slate-900">{report.location}</h2>
                        <p className="mt-1 text-sm text-slate-500">{report.time}</p>
                      </div>
                      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClass[report.tone]}`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/laporan/${report.id}`}
                        className="inline-flex items-center justify-center rounded-full border border-lime-200 bg-white px-4 py-2 text-sm font-medium text-lime-700 transition-colors hover:bg-lime-50"
                      >
                        Detail
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="rounded-[28px] bg-[#f5f9ef] p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                  Buat Laporan
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Kirim laporan baru</h2>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-center">
                    <p className="text-sm font-medium text-slate-700">Upload Foto (placeholder)</p>
                    <p className="mt-1 text-xs text-slate-500">Area untuk menambahkan bukti visual.</p>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Tambah Deskripsi</span>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                      placeholder="Tulis kronologi singkat laporan"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Pilih Jenis Bencana</span>
                    <select
                      value={reportType}
                      onChange={(event) => setReportType(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                    >
                      <option>Titik Banjir</option>
                      <option>Angin Kencang</option>
                      <option>Genangan Jalan</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Input Lokasi</span>
                    <input
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                      placeholder="Contoh: Balikpapan Selatan"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-500"
                  >
                    Kirim
                  </button>

                  {submitted ? (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      Laporan sementara tersimpan untuk {reportType} di {location || "lokasi belum diisi"}.
                    </div>
                  ) : null}
                </div>
              </form>
            </div>

            <section className="mt-6 rounded-[28px] bg-[#f5f9ef] p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                Ringkasan
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Gunakan halaman detail untuk memeriksa laporan satu per satu sebelum konfirmasi.
              </p>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

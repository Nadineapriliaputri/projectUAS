"use client";

import { useState } from "react";
import Link from "next/link";
import { getReports, deleteReport, type ReportItem } from "@/lib/reports-store";

type StatusFilter = "Semua" | "Menunggu Verifikasi" | "Terverifikasi" | "Diproses";

export default function KelolaLaporanPage() {
  const [data, setData] = useState<ReportItem[]>(() => getReports());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("Semua");
  const [selectedLaporan, setSelectedLaporan] = useState<ReportItem | null>(null);

  const filtered = data.filter((l) => {
    const matchSearch =
      l.namaPelapor.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Semua" || l.status === filter;
    return matchSearch && matchFilter;
  });

  function handleDelete(id: string) {
    deleteReport(id);
    setData(getReports());
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Kelola Laporan
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Kelola seluruh laporan masuk.
        </h1>
      </section>

      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Cari nama atau lokasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-lime-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["Semua", "Menunggu Verifikasi", "Terverifikasi", "Diproses"] as StatusFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-lime-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-lime-200 hover:bg-lime-50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">ID</th>
                <th className="pb-3 pr-4 font-medium">Nama Pelapor</th>
                <th className="pb-3 pr-4 font-medium">Lokasi</th>
                <th className="pb-3 pr-4 font-medium">Tanggal</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada laporan ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((laporan) => (
                  <tr key={laporan.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4 font-medium text-slate-900">{laporan.id}</td>
                    <td className="py-3 pr-4 text-slate-700">{laporan.namaPelapor}</td>
                    <td className="py-3 pr-4 text-slate-700">{laporan.location}</td>
                    <td className="py-3 pr-4 text-slate-500">{laporan.date}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={laporan.status} />
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedLaporan(laporan)}
                          className="rounded-full border border-lime-200 bg-white px-3 py-1.5 text-xs font-medium text-lime-700 transition-colors hover:bg-lime-50"
                        >
                          Lihat Detail
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(laporan.id)}
                          className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition-colors hover:bg-rose-100"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedLaporan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-[28px] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Detail Laporan</h2>
              <button
                type="button"
                onClick={() => setSelectedLaporan(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedLaporan.photoUrl && (
              <img
                src={selectedLaporan.photoUrl}
                alt={selectedLaporan.type}
                className="mt-4 h-48 w-full rounded-2xl object-cover"
              />
            )}

            <div className="mt-4 space-y-3 text-sm">
              <DetailRow label="ID" value={selectedLaporan.id} />
              <DetailRow label="Jenis Bencana" value={selectedLaporan.type} />
              <DetailRow label="Pelapor" value={selectedLaporan.namaPelapor} />
              <DetailRow label="Tanggal" value={selectedLaporan.date} />
              <DetailRow label="Waktu" value={selectedLaporan.time} />
              <DetailRow label="Lokasi" value={selectedLaporan.location} />
              <DetailRow label="Alamat Lengkap" value={selectedLaporan.address} />
              <DetailRow label="Tingkat Keparahan" value={selectedLaporan.tingkatKeparahan} />
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <StatusBadge status={selectedLaporan.status} />
              </div>
              <div>
                <span className="text-slate-500">Deskripsi</span>
                <p className="mt-1 leading-6 text-slate-900">{selectedLaporan.description}</p>
              </div>
              {selectedLaporan.latitude !== 0 && selectedLaporan.longitude !== 0 && (
                <DetailRow label="Koordinat" value={`${selectedLaporan.latitude.toFixed(4)}, ${selectedLaporan.longitude.toFixed(4)}`} />
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/laporan#report-${selectedLaporan.id}`}
                onClick={() => setSelectedLaporan(null)}
                className="flex-1 inline-flex items-center justify-center rounded-full border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-100"
              >
                <svg viewBox="0 0 24 24" className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Buka Laporan
              </Link>
              <button
                type="button"
                onClick={() => setSelectedLaporan(null)}
                className="flex-1 rounded-full bg-lime-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lime-500"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    "Terverifikasi": "bg-emerald-100 text-emerald-700",
    "Menunggu Verifikasi": "bg-amber-100 text-amber-700",
    "Diproses": "bg-sky-100 text-sky-700",
    "Ditolak": "bg-rose-100 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colorMap[status] ?? "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-900">{value}</span>
    </div>
  );
}

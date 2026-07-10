"use client";

import { useState } from "react";
import { getReports, verifyReport, type ReportItem } from "@/lib/reports-store";

export default function VerifikasiLaporanPage() {
  const [data, setData] = useState<ReportItem[]>(() => getReports());
  const [selectedLaporan, setSelectedLaporan] = useState<ReportItem | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  function handleVerifikasi(id: string) {
    verifyReport(id);
    setData(getReports());
    setSelectedLaporan(null);
    setSuccessId(id);
    setTimeout(() => setSuccessId(null), 2500);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Verifikasi Laporan
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Verifikasi laporan yang menunggu.
        </h1>
      </section>

      {successId && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-800">
          Laporan berhasil diverifikasi. Status telah diperbarui.
        </div>
      )}

      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        {data.length === 0 ? (
          <div className="py-12 text-center">
            <svg className="mx-auto h-12 w-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-lg font-medium text-slate-500">Belum ada laporan</p>
            <p className="mt-1 text-sm text-slate-400">Tidak ada laporan yang tersedia saat ini.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((laporan) => {
              const isPending = laporan.status === "Menunggu Verifikasi";
              return (
                <article
                  key={laporan.id}
                  className="rounded-[28px] border border-slate-200 bg-[#f5f9ef] p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
                        {laporan.type}
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-slate-900">{laporan.namaPelapor}</h2>
                      <p className="mt-1 text-sm text-slate-500">{laporan.location} &middot; {laporan.date}</p>
                    </div>
                    {isPending ? (
                      <span className="inline-flex w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                        Menunggu Verifikasi
                      </span>
                    ) : (
                      <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                        Terverifikasi
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedLaporan(laporan)}
                      className="inline-flex items-center justify-center rounded-full border border-lime-200 bg-white px-4 py-2 text-sm font-medium text-lime-700 transition-colors hover:bg-lime-50"
                    >
                      Lihat Detail
                    </button>
                    {isPending && (
                      <button
                        type="button"
                        onClick={() => handleVerifikasi(laporan.id)}
                        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
                      >
                        <svg viewBox="0 0 24 24" className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Verifikasi
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {selectedLaporan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-[28px] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Detail Laporan</h2>
              <button
                type="button"
                onClick={() => setSelectedLaporan(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
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
              <DetailRow label="Jenis Bencana" value={selectedLaporan.type} />
              <DetailRow label="Pelapor" value={selectedLaporan.namaPelapor} />
              <DetailRow label="Tanggal" value={selectedLaporan.date} />
              <DetailRow label="Waktu" value={selectedLaporan.time} />
              <DetailRow label="Lokasi" value={selectedLaporan.location} />
              <DetailRow label="Alamat" value={selectedLaporan.address} />
              <DetailRow label="Tingkat Keparahan" value={selectedLaporan.tingkatKeparahan} />
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${selectedLaporan.status === "Terverifikasi" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {selectedLaporan.status}
                </span>
              </div>
              <div>
                <span className="text-slate-500">Deskripsi</span>
                <p className="mt-1 font-medium text-slate-900">{selectedLaporan.description}</p>
              </div>
              {selectedLaporan.latitude !== 0 && selectedLaporan.longitude !== 0 && (
                <DetailRow label="Koordinat" value={`${selectedLaporan.latitude.toFixed(4)}, ${selectedLaporan.longitude.toFixed(4)}`} />
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedLaporan(null)}
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Tutup
              </button>
              {selectedLaporan.status === "Menunggu Verifikasi" && (
                <button
                  type="button"
                  onClick={() => handleVerifikasi(selectedLaporan.id)}
                  className="flex-1 rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                >
                  Verifikasi
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
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

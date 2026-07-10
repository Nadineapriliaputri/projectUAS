"use client";

import { useState } from "react";
import { adminPenggunaData, type AdminPengguna } from "@/lib/admin-data";

type StatusFilter = "Semua" | "Aktif" | "Nonaktif";

export default function KelolaPenggunaPage() {
  const [data, setData] = useState<AdminPengguna[]>(adminPenggunaData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("Semua");
  const [selectedPengguna, setSelectedPengguna] = useState<AdminPengguna | null>(null);

  const filtered = data.filter((p) => {
    const matchSearch =
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Semua" || p.statusAkun === filter;
    return matchSearch && matchFilter;
  });

  function handleToggleStatus(id: string) {
    setData((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, statusAkun: p.statusAkun === "Aktif" ? "Nonaktif" : "Aktif" }
          : p
      )
    );
    setSelectedPengguna((prev) =>
      prev && prev.id === id
        ? { ...prev, statusAkun: prev.statusAkun === "Aktif" ? "Nonaktif" : "Aktif" }
        : prev
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Kelola Pengguna
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Kelola seluruh pengguna Siaga+.
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
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-lime-400"
            />
          </div>

          <div className="flex gap-2">
            {(["Semua", "Aktif", "Nonaktif"] as StatusFilter[]).map((f) => (
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
                <th className="pb-3 pr-4 font-medium">Foto</th>
                <th className="pb-3 pr-4 font-medium">Nama</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Laporan</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Tidak ada pengguna ditemukan.
                  </td>
                </tr>
              ) : (
                filtered.map((pengguna) => (
                  <tr key={pengguna.id} className="border-b border-slate-100 last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-100 text-sm font-semibold text-lime-700">
                        {pengguna.foto}
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-medium text-slate-900">{pengguna.nama}</td>
                    <td className="py-3 pr-4 text-slate-500">{pengguna.email}</td>
                    <td className="py-3 pr-4 text-slate-700">{pengguna.jumlahLaporan}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={pengguna.statusAkun} />
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedPengguna(pengguna)}
                          className="rounded-full border border-lime-200 bg-white px-3 py-1.5 text-xs font-medium text-lime-700 transition-colors hover:bg-lime-50"
                        >
                          Profil
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(pengguna.id)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                            pengguna.statusAkun === "Aktif"
                              ? "border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                              : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {pengguna.statusAkun === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
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

      {selectedPengguna && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Profil Pengguna</h2>
              <button
                type="button"
                onClick={() => setSelectedPengguna(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 text-xl font-bold text-lime-700">
                {selectedPengguna.foto}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{selectedPengguna.nama}</h3>
              <p className="text-sm text-slate-500">{selectedPengguna.email}</p>
            </div>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">ID</span>
                <span className="font-medium text-slate-900">{selectedPengguna.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jumlah Laporan</span>
                <span className="font-medium text-slate-900">{selectedPengguna.jumlahLaporan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <StatusBadge status={selectedPengguna.statusAkun} />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedPengguna(null)}
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => handleToggleStatus(selectedPengguna.id)}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
                  selectedPengguna.statusAkun === "Aktif"
                    ? "bg-rose-600 hover:bg-rose-500"
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                {selectedPengguna.statusAkun === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
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
    "Aktif": "bg-emerald-100 text-emerald-700",
    "Nonaktif": "bg-rose-100 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${colorMap[status] ?? "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}

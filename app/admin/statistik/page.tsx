"use client";

import { getReports, getDisasterStats } from "@/lib/reports-store";
import { adminPenggunaData, bulanData, wilayahData } from "@/lib/admin-data";

const maxBulan = Math.max(...bulanData.map((b) => b.laporan));
const maxWilayah = Math.max(...wilayahData.map((w) => w.jumlah));

export default function StatistikPage() {
  const reports = getReports();
  const disasterStats = getDisasterStats();
  const totalLaporan = reports.length;
  const totalPengguna = adminPenggunaData.length;
  const terverifikasi = reports.filter((l) => l.status === "Terverifikasi").length;
  const menungguVerifikasi = reports.filter((l) => l.status === "Menunggu Verifikasi").length;

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Statistik
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Dashboard statistik Siaga+.
        </h1>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Pengguna" value={totalPengguna} color="text-sky-700" />
        <StatCard title="Total Laporan" value={totalLaporan} color="text-lime-700" />
        <StatCard title="Terverifikasi" value={terverifikasi} color="text-emerald-700" />
        <StatCard title="Menunggu Verifikasi" value={menungguVerifikasi} color="text-amber-700" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
            Laporan Per Bulan
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Grafik Laporan</h2>

          <div className="mt-6 flex items-end gap-3" style={{ height: 200 }}>
            {bulanData.map((item) => (
              <div key={item.bulan} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-slate-700">{item.laporan}</span>
                <div
                  className="w-full rounded-t-lg bg-lime-500 transition-all duration-500"
                  style={{ height: `${(item.laporan / maxBulan) * 140}px` }}
                />
                <span className="text-xs text-slate-500">{item.bulan}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
            Statistik Data Bencana
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Jumlah Laporan per Jenis Bencana</h2>

          <div className="mt-6 space-y-3">
            {disasterStats.map((item) => (
              <div
                key={item.type}
                className={`flex items-center justify-between rounded-2xl ${item.bgColor} px-5 py-4`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${item.color.replace("text-", "bg-")}`} />
                  <span className="text-sm font-medium text-slate-800">{item.type}</span>
                </div>
                <span className={`text-2xl font-bold ${item.color}`}>{item.count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Wilayah Terbanyak
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Laporan per Wilayah</h2>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">Wilayah</th>
                <th className="pb-3 pr-4 font-medium">Jumlah</th>
                <th className="pb-3 font-medium">Persentase</th>
              </tr>
            </thead>
            <tbody>
              {wilayahData.map((w) => (
                <tr key={w.wilayah} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-900">{w.wilayah}</td>
                  <td className="py-3 pr-4 text-slate-700">{w.jumlah}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="h-6 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-lime-500 transition-all duration-500"
                            style={{ width: `${(w.jumlah / maxWilayah) * 100}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-12 text-right text-xs font-medium text-slate-500">
                        {((w.jumlah / wilayahData.reduce((s, x) => s + x.jumlah, 0)) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

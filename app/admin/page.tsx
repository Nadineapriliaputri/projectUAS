"use client";

import { getReports } from "@/lib/reports-store";
import { adminPenggunaData } from "@/lib/admin-data";

const chartDataConfig = [
  { label: "Terverifikasi", status: "Terverifikasi", color: "bg-emerald-500" },
  { label: "Menunggu Verifikasi", status: "Menunggu Verifikasi", color: "bg-amber-500" },
  { label: "Diproses", status: "Diproses", color: "bg-sky-500" },
];

export default function AdminDashboard() {
  const reports = getReports();
  const totalLaporan = reports.length;
  const totalPengguna = adminPenggunaData.length;
  const terverifikasi = reports.filter((l) => l.status === "Terverifikasi").length;
  const menungguVerifikasi = reports.filter((l) => l.status === "Menunggu Verifikasi").length;

  const chartData = chartDataConfig.map((c) => ({
    ...c,
    value: reports.filter((r) => r.status === c.status).length,
  }));
  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <div className="space-y-6">
      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Dashboard Admin
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          Ringkasan Siaga+
        </h1>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Laporan" value={totalLaporan} tone="lime" />
        <StatCard title="Total Pengguna" value={totalPengguna} tone="sky" />
        <StatCard title="Menunggu Verifikasi" value={menungguVerifikasi} tone="amber" />
        <StatCard title="Terverifikasi" value={terverifikasi} tone="emerald" />
      </div>

      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Status Laporan
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Grafik Status Laporan</h2>

        <div className="mt-6 space-y-4">
          {chartData.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <span className="w-36 text-sm font-medium text-slate-700">{item.label}</span>
              <div className="flex-1">
                <div className="h-8 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <span className="w-10 text-right text-sm font-semibold text-slate-900">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
          Laporan Terbaru
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">5 Laporan Terakhir</h2>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 pr-4 font-medium">ID</th>
                <th className="pb-3 pr-4 font-medium">Pelapor</th>
                <th className="pb-3 pr-4 font-medium">Lokasi</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.slice(0, 5).map((laporan) => (
                <tr key={laporan.id} className="border-b border-slate-100 last:border-0">
                  <td className="py-3 pr-4 font-medium text-slate-900">{laporan.id}</td>
                  <td className="py-3 pr-4 text-slate-700">{laporan.namaPelapor}</td>
                  <td className="py-3 pr-4 text-slate-700">{laporan.location}</td>
                  <td className="py-3">
                    <StatusBadge status={laporan.status} />
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

function StatCard({ title, value, tone }: { title: string; value: number; tone: string }) {
  const colorMap: Record<string, string> = {
    lime: "bg-lime-100 text-lime-700",
    sky: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };

  return (
    <div className="rounded-[28px] bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${colorMap[tone]?.split(" ")[1] ?? "text-slate-900"}`}>
        {value}
      </p>
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

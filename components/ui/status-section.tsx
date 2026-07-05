import { cn } from "@/lib/utils";

type StatusItemProps = {
  label: string;
  value: string;
  color: "green" | "yellow" | "blue" | "red";
};

const colorMap = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  yellow: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

const dotColorMap = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
};

function StatusItem({ label, value, color }: StatusItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border p-4 transition-all",
        colorMap[color]
      )}
    >
      <span className={cn("h-2.5 w-2.5 rounded-full", dotColorMap[color])} />
      <div>
        <p className="text-xs font-medium opacity-70">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

const statuses: StatusItemProps[] = [
  { label: "Cuaca", value: "Cerah", color: "green" },
  { label: "Tingkat Risiko", value: "Rendah", color: "green" },
  { label: "Titik Banjir Aktif", value: "2", color: "yellow" },
  { label: "Laporan Baru", value: "5", color: "blue" },
];

export default function StatusSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Status Terkini
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Pembaruan data secara real-time
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {statuses.map((status) => (
            <StatusItem key={status.label} {...status} />
          ))}
        </div>
      </div>
    </section>
  );
}

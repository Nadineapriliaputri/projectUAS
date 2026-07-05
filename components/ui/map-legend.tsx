const items = [
  { label: "Banjir", color: "bg-sky-500" },
  { label: "Angin kencang", color: "bg-amber-400" },
  { label: "Balikpapan", color: "bg-emerald-500" },
];

export default function MapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
      {items.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-sm">
          <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export type WeatherMetric = {
  label: string;
  value: string;
  note: string;
};

export type WeatherAlert = {
  title: string;
  description: string;
  tone: "warning" | "danger";
};

type Props = {
  title: string;
  location: string;
  temperature: string;
  condition: string;
  feelsLike: string;
  minMax: string;
  metrics: WeatherMetric[];
  alerts: WeatherAlert[];
};

function WeatherBadge({ tone, label }: { tone: "warning" | "danger"; label: string }) {
  const toneClass =
    tone === "danger"
      ? "border-rose-400/20 bg-rose-400/10 text-rose-700"
      : "border-amber-400/20 bg-amber-400/10 text-amber-700";

  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${toneClass}`}>{label}</span>;
}

export default function CurrentWeatherSection({
  title,
  location,
  temperature,
  condition,
  feelsLike,
  minMax,
  metrics,
  alerts,
}: Props) {
  return (
    <section className="rounded-[30px] bg-[#dcecc8]">
      <div className="flex flex-col gap-6 rounded-[30px] bg-white/30 p-4 backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
            {title}
          </p>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{location}</h2>
              <p className="text-sm text-slate-600">Ringkasan kondisi cuaca hari ini</p>
            </div>
            <p className="text-sm font-medium text-slate-500">Diperbarui 5 menit lalu</p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[30px] bg-[#f4f9eb] p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Suhu saat ini</p>
                <p className="mt-2 text-7xl font-semibold tracking-tight text-slate-900 sm:text-8xl">
                  {temperature}
                </p>
                <p className="mt-3 text-lg font-medium text-slate-700">{condition}</p>
                <p className="mt-2 text-sm text-slate-500">Min/Max {minMax}</p>
              </div>

              <div className="rounded-[28px] bg-white px-4 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Feels like</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{feelsLike}</p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {metrics.map((metric) => (
              <article key={metric.label} className="rounded-[26px] bg-white/80 p-5 shadow-sm">
                <p className="text-sm text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
                <p className="mt-2 text-sm text-slate-600">{metric.note}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {alerts.map((alert) => (
            <article key={alert.title} className="rounded-[24px] bg-white/70 p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <WeatherBadge tone={alert.tone} label={alert.tone === "danger" ? "Waspada" : "Perhatian"} />
                <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{alert.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

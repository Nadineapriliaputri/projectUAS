export type ForecastItem = {
  time: string;
  temperature: string;
  label: string;
  icon: "sun" | "cloud" | "rain" | "moon";
};

type Props = {
  items: ForecastItem[];
};

function ForecastIcon({ icon }: { icon: ForecastItem["icon"] }) {
  if (icon === "cloud") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 18a4 4 0 1 1 .9-7.9A5 5 0 1 1 18 12h-1" />
      </svg>
    );
  }

  if (icon === "rain") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l-1 2m5-2-1 2m5-2-1 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14a4 4 0 1 1 .8-7.9A5 5 0 1 1 18 9h-1" />
      </svg>
    );
  }

  if (icon === "moon") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export default function ForecastSection({ items }: Props) {
  return (
    <section className="mt-6 rounded-[30px] bg-white/35 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
            Perkiraan Cuaca
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900">Prakiraan horizontal</h2>
        </div>
        <p className="text-sm text-slate-500">12 jam ke depan</p>
      </div>

      <div className="mt-5 overflow-x-auto pb-1">
        <div className="flex min-w-max gap-3">
          {items.map((item) => (
            <article
              key={item.time}
              className="w-[160px] rounded-[24px] bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{item.time}</span>
                <ForecastIcon icon={item.icon} />
              </div>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{item.temperature}</p>
              <p className="mt-2 text-sm text-slate-600">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

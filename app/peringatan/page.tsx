import WeatherSidebar from "@/components/weather-sidebar";

type AlertCard = {
  title: string;
  status: string;
  description: string;
  tone: "warning" | "danger" | "normal";
};

const alerts: AlertCard[] = [
  {
    title: "Peringatan Hujan",
    status: "Waspada",
    description: "Potensi hujan lokal pada sore hingga malam.",
    tone: "warning",
  },
  {
    title: "Angin Kencang",
    status: "Siaga",
    description: "Kecepatan angin meningkat di beberapa titik.",
    tone: "danger",
  },
  {
    title: "Kondisi Aman",
    status: "Normal",
    description: "Tidak ada peringatan kritis saat ini.",
    tone: "normal",
  },
];

const history = ["Hujan sedang — 09:00", "Angin meningkat — 12:30", "Kondisi stabil — 14:00"];

function AlertIcon({ tone }: { tone: AlertCard["tone"] }) {
  const common = "h-5 w-5";

  if (tone === "danger") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 16H3l9-16Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01" />
      </svg>
    );
  }

  if (tone === "normal") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4L19 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17l-1 2m5-2-1 2m5-2-1 2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 14a4 4 0 1 1 .8-7.9A5 5 0 1 1 18 9h-1" />
    </svg>
  );
}

function toneClasses(tone: AlertCard["tone"]) {
  switch (tone) {
    case "danger":
      return {
        panel: "border-rose-200 bg-rose-50 text-rose-800",
        badge: "bg-rose-100 text-rose-700",
        icon: "bg-rose-100 text-rose-700",
        button: "border-rose-200 text-rose-700 hover:bg-rose-50",
      };
    case "normal":
      return {
        panel: "border-emerald-200 bg-emerald-50 text-emerald-800",
        badge: "bg-emerald-100 text-emerald-700",
        icon: "bg-emerald-100 text-emerald-700",
        button: "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
      };
    default:
      return {
        panel: "border-amber-200 bg-amber-50 text-amber-800",
        badge: "bg-amber-100 text-amber-700",
        icon: "bg-amber-100 text-amber-700",
        button: "border-amber-200 text-amber-700 hover:bg-amber-50",
      };
  }
}

export default function PeringatanPage() {
  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Peringatan" location="Balikpapan" status="Pantauan aktif" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
              PERINGATAN
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Pantau kondisi cuaca dan potensi risiko wilayah.
            </h1>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {alerts.map((alert) => {
                const classes = toneClasses(alert.tone);

                return (
                  <article
                    key={alert.title}
                    className={`rounded-[28px] border p-5 shadow-sm ${classes.panel}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${classes.icon}`}>
                        <AlertIcon tone={alert.tone} />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${classes.badge}`}>
                        {alert.status}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-semibold text-slate-900">{alert.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{alert.description}</p>

                    <button
                      type="button"
                      className={`mt-5 inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${classes.button}`}
                    >
                      Lihat Detail
                    </button>
                  </article>
                );
              })}
            </div>

            <section className="mt-6 rounded-[28px] bg-[#f5f9ef] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                    Riwayat Peringatan
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">
                    Riwayat Peringatan
                  </h2>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {history.map((item) => (
                  <div key={item} className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

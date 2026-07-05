import WeatherSidebar from "@/components/weather-sidebar";

const menuItems = [
  {
    title: "Data Diri",
    description: "Ubah informasi dasar akun.",
    icon: "user",
  },
  {
    title: "Riwayat Laporan",
    description: "Lihat aktivitas laporan yang pernah dibuat.",
    icon: "history",
  },
  {
    title: "Laporan Tersimpan",
    description: "Akses laporan penting yang disimpan.",
    icon: "bookmark",
  },
  {
    title: "Pengaturan",
    description: "Atur preferensi akun dan notifikasi.",
    icon: "settings",
  },
  {
    title: "Logout",
    description: "Keluar dari sesi akun saat ini.",
    icon: "logout",
  },
];

const activities = ["Membuat laporan banjir", "Melihat peta cuaca", "Membuka notifikasi BMKG"];

function MenuIcon({ type }: { type: string }) {
  const common = "h-5 w-5";

  switch (type) {
    case "history":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1 0 3-6.7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4v5h5" />
        </svg>
      );
    case "bookmark":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h2m12 0h2M6.5 6.5l1.4 1.4m8.2 8.2 1.4 1.4M6.5 17.5l1.4-1.4m8.2-8.2 1.4-1.4" />
        </svg>
      );
    case "logout":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 17l5-5-5-5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 4h4v16h-4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 0 1 16 0" />
        </svg>
      );
  }
}

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Profil" location="Balikpapan" status="Akun aktif" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">Profil</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Kelola informasi akun dan aktivitas.
            </h1>

            <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <article className="rounded-[28px] bg-[#f5f9ef] p-6 shadow-sm">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-lime-200 bg-white text-3xl font-semibold text-lime-700 shadow-sm">
                    NA
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-slate-900">Nadine Aprilia</h2>
                  <p className="mt-2 text-sm text-slate-500">Balikpapan</p>
                  <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                    Pengguna Aktif
                  </span>
                </div>
              </article>

              <div className="space-y-4 rounded-[28px] bg-[#f5f9ef] p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                  Menu Profil
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {menuItems.map((item) => (
                    <article
                      key={item.title}
                      className="group rounded-[24px] border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-lime-200 hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-100 text-lime-700 transition-colors group-hover:bg-lime-600 group-hover:text-white">
                          <MenuIcon type={item.icon} />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-500">{item.description}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <section className="mt-6 rounded-[28px] bg-[#f5f9ef] p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                Aktivitas Terakhir
              </p>

              <div className="mt-4 space-y-3">
                {activities.map((activity, index) => (
                  <div
                    key={activity}
                    className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-100 text-sm font-semibold text-lime-700">
                      {index + 1}
                    </div>
                    <p className="text-sm text-slate-700">{activity}</p>
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

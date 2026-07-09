"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import WeatherSidebar from "@/components/weather-sidebar";
import { getReports } from "@/lib/reports-store";

const menuItems = [
  {
    title: "Informasi Profil",
    description: "Ubah informasi dasar akun.",
    icon: "user",
    action: "profile",
  },
  {
    title: "Riwayat Laporan",
    description: "Lihat aktivitas laporan yang pernah dibuat.",
    icon: "history",
    action: "history",
  },
  {
    title: "Laporan Tersimpan",
    description: "Akses laporan penting yang disimpan.",
    icon: "bookmark",
    action: "saved",
  },
  {
    title: "Pengaturan Akun",
    description: "Atur preferensi akun dan notifikasi.",
    icon: "settings",
    action: "settings",
  },
  {
    title: "Bantuan",
    description: "Dapatkan bantuan penggunaan aplikasi.",
    icon: "help",
    action: "help",
  },
  {
    title: "Tentang Aplikasi",
    description: "Informasi versi dan tim pengembang.",
    icon: "info",
    action: "about",
  },
  {
    title: "Kebijakan Privasi",
    description: "Baca kebijakan privasi aplikasi.",
    icon: "shield",
    action: "privacy",
  },
  {
    title: "Keluar",
    description: "Keluar dari sesi akun saat ini.",
    icon: "logout",
    action: "logout",
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
    case "help":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [profileName, setProfileName] = useState("Nadine Aprilia");
  const [profileEmail, setProfileEmail] = useState("nadine@email.com");
  const [profileLocation, setProfileLocation] = useState("Balikpapan");
  const [savedName, setSavedName] = useState("Nadine Aprilia");
  const [savedEmail, setSavedEmail] = useState("nadine@email.com");
  const [savedLocation, setSavedLocation] = useState("Balikpapan");
  const [showSuccess, setShowSuccess] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  function handleMenuClick(action: string) {
    if (action === "logout") {
      router.push("/login");
      return;
    }
    setActiveModal(action);
  }

  function closeModal() {
    setActiveModal(null);
    setShowSuccess(false);
    setProfileName(savedName);
    setProfileEmail(savedEmail);
    setProfileLocation(savedLocation);
  }

  function handleSaveProfile() {
    setSavedName(profileName);
    setSavedEmail(profileEmail);
    setSavedLocation(profileLocation);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setActiveModal(null);
    }, 1500);
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleOpenReport(id: string) {
    setActiveModal(null);
    router.push(`/laporan/${id}`);
  }

  const initials = profileName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
                  <div className="relative">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Foto profil"
                        className="h-24 w-24 rounded-full border border-lime-200 object-cover shadow-sm"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-lime-200 bg-white text-3xl font-semibold text-lime-700 shadow-sm">
                        {initials}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border border-white bg-lime-600 text-white shadow-sm transition-colors hover:bg-lime-500"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                      </svg>
                    </button>
                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-slate-900">{savedName}</h2>
                  <p className="mt-2 text-sm text-slate-500">{savedLocation}</p>
                  <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                    Pengguna Aktif
                  </span>
                </div>

                <div className="mt-6 border-t border-lime-200 pt-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                    Aktivitas Terakhir
                  </p>
                  <div className="mt-3 space-y-2">
                    {activities.map((activity, index) => (
                      <div
                        key={activity}
                        className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-lime-100 text-xs font-semibold text-lime-700">
                          {index + 1}
                        </div>
                        <p className="text-sm text-slate-700">{activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              <div className="space-y-4 rounded-[28px] bg-[#f5f9ef] p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                  Menu Profil
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => handleMenuClick(item.action)}
                      className="group rounded-[24px] border border-slate-200 bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-lime-200 hover:shadow-md"
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
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={closeModal}>
          <div
            className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {activeModal === "profile" && "Informasi Profil"}
                {activeModal === "history" && "Riwayat Laporan"}
                {activeModal === "saved" && "Laporan Tersimpan"}
                {activeModal === "settings" && "Pengaturan Akun"}
                {activeModal === "help" && "Bantuan"}
                {activeModal === "about" && "Tentang Aplikasi"}
                {activeModal === "privacy" && "Kebijakan Privasi"}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mt-5">
              {activeModal === "profile" && (
                <div className="space-y-4">
                  {showSuccess && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      Profil berhasil disimpan!
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Nama</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Lokasi</label>
                    <input
                      type="text"
                      value={profileLocation}
                      onChange={(e) => setProfileLocation(e.target.value)}
                      className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    className="inline-flex w-full items-center justify-center rounded-full bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-500"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              )}

              {activeModal === "history" && (
                <div className="space-y-3">
                  {["Laporan banjir — 5 Jul 2026", "Angin kencang — 3 Jul 2026", "Genangan jalan — 1 Jul 2026"].map((item) => (
                    <div key={item} className="rounded-2xl bg-[#f5f9ef] px-4 py-3 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {activeModal === "saved" && (
                <div className="space-y-3">
                  {getReports().slice(0, 5).map((report) => (
                    <div key={report.id} className="flex items-center justify-between rounded-2xl bg-[#f5f9ef] px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{report.type} — {report.location}</p>
                        <p className="text-xs text-slate-500">{report.status} · {report.time}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenReport(report.id)}
                        className="text-xs font-medium text-lime-600 hover:text-lime-700"
                      >
                        Buka
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === "settings" && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Fitur ini masih dalam pengembangan.</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-2xl bg-[#f5f9ef] px-4 py-3">
                      <span className="text-sm text-slate-700">Notifikasi Push</span>
                      <div className="h-6 w-11 rounded-full bg-lime-600 relative">
                        <div className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-[#f5f9ef] px-4 py-3">
                      <span className="text-sm text-slate-700">Notifikasi Email</span>
                      <div className="h-6 w-11 rounded-full bg-slate-300 relative">
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-[#f5f9ef] px-4 py-3">
                      <span className="text-sm text-slate-700">Mode Gelap</span>
                      <div className="h-6 w-11 rounded-full bg-slate-300 relative">
                        <div className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === "help" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#f5f9ef] p-4">
                    <h3 className="text-sm font-semibold text-slate-900">Cara Menggunakan Aplikasi</h3>
                    <ul className="mt-2 space-y-2 text-sm text-slate-600">
                      <li>1. Lihat kondisi cuaca terkini di halaman Beranda.</li>
                      <li>2. Gunakan Peta Cuaca untuk melihat distribusi bencana.</li>
                      <li>3. Kirim laporan kondisi di sekitar melalui halaman Laporan.</li>
                      <li>4. Pantau notifikasi peringatan dini dari BMKG.</li>
                    </ul>
                  </div>
                  <p className="text-xs text-slate-500">Butuh bantuan lebih lanjut? Hubungi tim support kami.</p>
                </div>
              )}

              {activeModal === "about" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#f5f9ef] p-4 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-lime-100 text-2xl font-bold text-lime-700">
                      SP
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-slate-900">Siaga Pluss</h3>
                    <p className="mt-1 text-sm text-slate-500">Versi 1.0.0</p>
                  </div>
                  <p className="text-sm text-slate-600">
                    Siaga Pluss adalah aplikasi pemantauan cuaca dan pelaporan bencana untuk wilayah Balikpapan.
                  </p>
                  <p className="text-xs text-slate-500">Dikembangkan untuk UAS 2026</p>
                </div>
              )}

              {activeModal === "privacy" && (
                <div className="space-y-4">
                  <div className="rounded-2xl bg-[#f5f9ef] p-4">
                    <h3 className="text-sm font-semibold text-slate-900">Kebijakan Privasi</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Kami menghargai privasi Anda. Data yang dikumpulkan melalui aplikasi ini hanya digunakan untuk keperluan pemantauan cuaca dan penanganan bencana.
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Informasi lokasi yang Anda bagikan hanya digunakan untuk verifikasi laporan dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

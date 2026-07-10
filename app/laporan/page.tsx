"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import WeatherSidebar from "@/components/weather-sidebar";
import { getReports, addReport, verifyReport, isReportSaved, toggleSaveReport } from "@/lib/reports-store";

type ReportItem = {
  id: string;
  type: string;
  location: string;
  time: string;
  status: string;
  statusTone: "emerald" | "amber" | "sky";
};

const statusClass = {
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  sky: "bg-sky-100 text-sky-700",
};

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE = 5 * 1024 * 1024;

function toListItem(r: { id: string; type: string; location: string; time: string; status: string; statusTone: "emerald" | "amber" | "sky" }): ReportItem {
  return { id: r.id, type: r.type, location: r.location, time: r.time, status: r.status, statusTone: r.statusTone };
}

export default function LaporanPage() {
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("Banjir");
  const [location, setLocation] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [reportsList, setReportsList] = useState<ReportItem[]>(() => getReports().map(toListItem));
  const [savedIds, setSavedIds] = useState<Set<string>>(() => {
    const ids = getReports().filter((r) => isReportSaved(r.id)).map((r) => r.id);
    return new Set(ids);
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newReport = addReport({
      type: reportType,
      location,
      address: locationAddress || location,
      description,
      photoUrl: photo,
    });

    setReportsList(getReports().map(toListItem));
    setSubmittedId(newReport.id);
    setSubmitted(true);

    setTimeout(() => {
      setDescription("");
      setReportType("Banjir");
      setLocation("");
      setLocationAddress("");
      setPhoto(null);
      setPhotoError(null);
      setLocationStatus(null);
      setSubmitted(false);
      setSubmittedId(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 2500);
  }

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setPhotoError("Format file tidak didukung. Gunakan JPG, JPEG, atau PNG.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setPhotoError("Ukuran foto terlalu besar. Maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleRemovePhoto() {
    setPhoto(null);
    setPhotoError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function reverseGeocode(lat: number, lon: number): Promise<string> {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=id`
      );
      const data = await res.json();
      const a = data.address;

      const parts = [
        a.road || a.house_number ? `${a.road || ""} ${a.house_number || ""}`.trim() : null,
        a.village || a.suburb || a.neighbourhood,
        a.city_district || a.district || a.county,
        a.city || a.town || a.municipality,
        a.state || a.region,
      ].filter(Boolean);

      return parts.join(", ") || `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    } catch {
      return `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
    }
  }

  async function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("Browser Anda tidak mendukung geolokasi.");
      return;
    }

    setIsLocating(true);
    setLocationStatus(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocationStatus("Mencari alamat...");
        const address = await reverseGeocode(latitude, longitude);
        setLocation(address);
        setLocationAddress(address);
        setLocationStatus("Lokasi berhasil didapatkan.");
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus("Izin lokasi ditolak. Silakan masukkan lokasi secara manual.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationStatus("Informasi lokasi tidak tersedia. Silakan masukkan lokasi secara manual.");
            break;
          case error.TIMEOUT:
            setLocationStatus("Permintaan lokasi habis waktu. Silakan coba lagi atau masukkan manual.");
            break;
          default:
            setLocationStatus("Gagal mendapatkan lokasi. Silakan masukkan lokasi secara manual.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  function handleVerify(reportId: string) {
    verifyReport(reportId);
    setReportsList(getReports().map(toListItem));
  }

  function handleToggleSave(reportId: string) {
    toggleSaveReport(reportId);
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(reportId)) {
        next.delete(reportId);
      } else {
        next.add(reportId);
      }
      return next;
    });
  }

  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Laporan Warga" location="Balikpapan" status="Pantauan aktif" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
              Laporan Warga
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Pantau dan kirim laporan kondisi di sekitar.
            </h1>

            <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                {reportsList.map((report) => (
                  <article id={`report-${report.id}`} key={report.id} className="rounded-[28px] border border-slate-200 bg-[#f5f9ef] p-5 shadow-sm scroll-mt-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-700">
                          {report.type}
                        </p>
                        <h2 className="mt-2 text-xl font-semibold text-slate-900">{report.location}</h2>
                        <p className="mt-1 text-sm text-slate-500">{report.time}</p>
                      </div>
                      <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${statusClass[report.statusTone]}`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/laporan/${report.id}`}
                        className="inline-flex items-center justify-center rounded-full border border-lime-200 bg-white px-4 py-2 text-sm font-medium text-lime-700 transition-colors hover:bg-lime-50"
                      >
                        Detail
                      </Link>
                      {report.statusTone !== "emerald" && (
                        <button
                          type="button"
                          onClick={() => handleVerify(report.id)}
                          className="inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100"
                        >
                          Verifikasi
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleToggleSave(report.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                          savedIds.has(report.id)
                            ? "border border-lime-300 bg-lime-600 text-white hover:bg-lime-500"
                            : "border border-slate-200 bg-white text-slate-600 hover:border-lime-200 hover:bg-lime-50 hover:text-lime-700"
                        }`}
                        title={savedIds.has(report.id) ? "Batal simpan" : "Simpan laporan"}
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill={savedIds.has(report.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1Z" />
                        </svg>
                        {savedIds.has(report.id) ? "Tersimpan" : "Simpan"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="rounded-[28px] bg-[#f5f9ef] p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                  Buat Laporan
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Kirim laporan baru</h2>

                <div className="mt-5 space-y-4">
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />

                    {photo ? (
                      <div className="relative">
                        <img
                          src={photo}
                          alt="Preview foto laporan"
                          className="w-full rounded-2xl border border-slate-200 object-cover"
                          style={{ maxHeight: "200px" }}
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-lime-600 hover:text-lime-700"
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                          </svg>
                          Ganti Foto
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="photo-upload"
                        className="flex cursor-pointer flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center transition-colors hover:border-lime-400 hover:bg-lime-50"
                      >
                        <svg viewBox="0 0 24 24" className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                        </svg>
                        <p className="mt-2 text-sm font-medium text-slate-700">Klik untuk upload foto</p>
                        <p className="mt-1 text-xs text-slate-500">JPG, JPEG, PNG (maks. 5MB)</p>
                      </label>
                    )}

                    {photoError && (
                      <p className="mt-2 text-xs text-red-500">{photoError}</p>
                    )}
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Tambah Deskripsi</span>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      className="min-h-28 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                      placeholder="Tulis kronologi singkat laporan"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Pilih Jenis Bencana</span>
                    <select
                      value={reportType}
                      onChange={(event) => setReportType(event.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                    >
                      <option>Banjir</option>
                      <option>Pohon Tumbang</option>
                      <option>Longsor</option>
                      <option>Jalan Tergenang</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Input Lokasi</span>
                    <input
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                        setLocationAddress(event.target.value);
                      }}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-lime-400"
                      placeholder="Contoh: Jl. Jenderal Sudirman, Balikpapan Selatan"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    disabled={isLocating}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-lime-300 bg-white px-4 py-2.5 text-sm font-medium text-lime-700 transition-colors hover:bg-lime-50 disabled:opacity-50"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v4m0 12v4M2 12h4m12 0h4" strokeLinecap="round" />
                    </svg>
                    {isLocating ? "Mencari lokasi..." : "Gunakan Lokasi Saat Ini"}
                  </button>

                  {locationStatus && (
                    <p className={`text-xs ${locationStatus.includes("berhasil") ? "text-emerald-600" : "text-amber-600"}`}>
                      {locationStatus}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-500"
                  >
                    Kirim
                  </button>

                  {submitted && submittedId && (
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                      Laporan berhasil dikirim! Status: Diproses.
                      <Link href={`/laporan/${submittedId}`} className="ml-1 font-semibold underline">
                        Lihat Detail
                      </Link>
                    </div>
                  )}
                </div>
              </form>
            </div>

            <section className="mt-6 rounded-[28px] bg-[#f5f9ef] p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                Ringkasan
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Laporan yang dikirim akan diverifikasi oleh admin sebelum ditandai sebagai &quot;Terverifikasi&quot;.
              </p>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

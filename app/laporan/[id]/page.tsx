"use client";

import Link from "next/link";
import { use, useState, useCallback } from "react";
import WeatherSidebar from "@/components/weather-sidebar";
import { getReportById, addComment, type Comment } from "@/lib/reports-store";

type DetailProps = {
  params: Promise<{ id: string }>;
};

const statusColorMap = {
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  sky: "bg-sky-100 text-sky-700",
};

const fallbackPhoto = "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&h=500&fit=crop";

const PROFILE_KEY = "siaga_profile";
const COMMENTS_KEY = "siaga_comments";

type StoredProfile = { name: string; photo: string | null };

function getStoredProfile(): StoredProfile {
  if (typeof window === "undefined") return { name: "Anda", photo: null };
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { name: "Anda", photo: null };
}

function getStoredComments(reportId: string): Comment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (!raw) return [];
    const all: Record<string, Comment[]> = JSON.parse(raw);
    return all[reportId] ?? [];
  } catch { return []; }
}

export default function LaporanDetailPage({ params }: DetailProps) {
  const { id } = use(params);
  const initDetail = useCallback(() => getReportById(id), [id]);
  const initProfile = useCallback(() => getStoredProfile(), []);
  const [detail, setDetail] = useState(initDetail);
  const [commentText, setCommentText] = useState("");
  const [profile] = useState<StoredProfile>(initProfile);
  const [commentError, setCommentError] = useState("");

  function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = commentText.trim();
    if (!trimmed) {
      setCommentError("Komentar tidak boleh kosong.");
      return;
    }
    setCommentError("");

    const initials = profile.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const newComment = addComment(id, {
      name: profile.name,
      text: trimmed,
      avatar: initials,
      color: "bg-lime-100 text-lime-700",
    });

    if (newComment) {
      setDetail(getReportById(id));
      setCommentText("");
    }
  }

  if (!detail) {
    return (
      <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
        <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
          <WeatherSidebar activeItem="Laporan Warga" location="Balikpapan" status="Pantauan aktif" />
          <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
            <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">Detail Laporan</p>
              <h1 className="mt-4 text-xl text-slate-500">Laporan tidak ditemukan.</h1>
              <Link
                href="/laporan"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-lime-200 bg-white px-4 py-3 text-sm font-semibold text-lime-700 transition-colors hover:bg-lime-50"
              >
                Kembali ke Laporan
              </Link>
            </section>
          </div>
        </div>
      </main>
    );
  }

  const storedComments = getStoredComments(id);
  const defaultReport = getReportById(id);
  const defaultCount = defaultReport?.comments.length ?? 0;
  const allComments = detail.comments;

  const profileInitials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <WeatherSidebar activeItem="Laporan Warga" location="Balikpapan" status="Pantauan aktif" />

        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          <section className="rounded-[30px] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-lime-700">
                Detail Laporan
              </p>
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                {detail.type} di {detail.location}
              </h1>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-[28px] border border-slate-200">
                  <img
                    src={detail.photoUrl || fallbackPhoto}
                    alt={`${detail.type} di ${detail.location}`}
                    className="h-64 w-full object-cover sm:h-80"
                  />
                </div>

                <div className="rounded-[28px] bg-[#f5f9ef] p-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                    Deskripsi Laporan
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{detail.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-[28px] bg-[#f5f9ef] p-5">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">Jenis Bencana</p>
                      <p className="mt-1 text-sm font-medium text-slate-900">{detail.type}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">Tanggal Laporan</p>
                      <p className="mt-1 text-sm text-slate-700">{detail.date}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">Waktu Laporan</p>
                      <p className="mt-1 text-sm text-slate-700">{detail.time}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">Status Laporan</p>
                      <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColorMap[detail.statusTone]}`}>
                        {detail.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">Alamat Lengkap</p>
                      <p className="mt-1 text-sm leading-6 text-slate-700">{detail.address}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href="/laporan"
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-lime-200 bg-white px-4 py-3 text-sm font-semibold text-lime-700 transition-colors hover:bg-lime-50"
                  >
                    Kembali
                  </Link>
                </div>
              </div>
            </div>

            <section className="mt-6 rounded-[28px] bg-[#f5f9ef] p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-700">
                Komentar Warga
              </p>
              <h2 className="mt-1 text-xl font-semibold text-slate-900">Apa kata warga sekitar?</h2>

              <div className="mt-4 space-y-3">
                {allComments.length === 0 && storedComments.length === 0 ? (
                  <p className="text-sm text-slate-500">Belum ada komentar. Jadilah yang pertama berkomentar.</p>
                ) : (
                  allComments.map((comment, index) => {
                    const isStored = index >= defaultCount;
                    return (
                      <div
                        key={`${comment.name}-${comment.time}-${index}`}
                        className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
                      >
                        {profile.photo && isStored ? (
                          <img
                            src={profile.photo}
                            alt={comment.name}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${comment.color}`}>
                            {comment.avatar}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-slate-900">{comment.name}</p>
                            <span className="text-xs text-slate-400">{comment.time}</span>
                          </div>
                          <p className="mt-1 text-sm leading-6 text-slate-600">{comment.text}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleSubmitComment} className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  {profile.photo ? (
                    <img
                      src={profile.photo}
                      alt="Foto profil"
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-100 text-sm font-semibold text-lime-700">
                      {profileInitials}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => {
                        setCommentText(e.target.value);
                        if (commentError) setCommentError("");
                      }}
                      className="min-h-20 w-full resize-none rounded-xl border border-slate-200 bg-[#f5f9ef] px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-lime-400"
                      placeholder="Tulis komentar Anda..."
                    />
                    {commentError && (
                      <p className="mt-1 text-xs text-red-500">{commentError}</p>
                    )}
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-lime-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-lime-500"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                        </svg>
                        Kirim
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

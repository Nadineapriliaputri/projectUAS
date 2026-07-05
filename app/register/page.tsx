"use client";

import { useState } from "react";
import Link from "next/link";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    if (!name.trim()) {
      errs.name = "Nama wajib diisi";
    }

    if (!email.trim()) {
      errs.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Format email tidak valid";
    }

    if (!password) {
      errs.password = "Password wajib diisi";
    } else if (password.length < 8) {
      errs.password = "Password minimal 8 karakter";
    }

    if (!confirmPassword) {
      errs.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (password !== confirmPassword) {
      errs.confirmPassword = "Konfirmasi password tidak cocok";
    }

    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    }, 1000);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-xl font-bold text-lime-700">
            SP
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900">
            Siaga Pluss
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Buat akun baru untuk melanjutkan
          </p>
        </div>

        {/* Card */}
        <div className="rounded-[32px] border border-lime-100 bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:p-8">
          {/* Success notification */}
          {success && (
            <div className="mb-5 rounded-2xl bg-lime-50 px-4 py-3 text-center text-sm font-medium text-lime-700">
              Akun berhasil dibuat (Demo Frontend)
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nama Lengkap */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Nama Lengkap
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                }}
                placeholder="Masukkan nama lengkap"
                className="w-full rounded-2xl border border-lime-100 bg-[#f5f9ef] px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-lime-300 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="email@contoh.com"
                className="w-full rounded-2xl border border-lime-100 bg-[#f5f9ef] px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-lime-300 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password)
                      setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  placeholder="Minimal 8 karakter"
                  className="w-full rounded-2xl border border-lime-100 bg-[#f5f9ef] px-4 py-3 pr-12 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-lime-300 focus:bg-white focus:ring-2 focus:ring-lime-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-lime-50 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-rose-600">{errors.password}</p>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors((p) => ({ ...p, confirmPassword: undefined }));
                  }}
                  placeholder="Ulangi password"
                  className="w-full rounded-2xl border border-lime-100 bg-[#f5f9ef] px-4 py-3 pr-12 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-lime-300 focus:bg-white focus:ring-2 focus:ring-lime-100"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-lime-50 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-rose-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full rounded-full bg-lime-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-xs text-slate-400">atau</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-slate-500">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="font-medium text-lime-700 underline-offset-2 transition-colors hover:text-lime-800 hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

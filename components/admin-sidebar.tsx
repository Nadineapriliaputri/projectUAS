"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Kelola Laporan", href: "/admin/laporan" },
  { label: "Verifikasi Laporan", href: "/admin/verifikasi" },
  { label: "Kelola Pengguna", href: "/admin/pengguna" },
  { label: "Statistik", href: "/admin/statistik" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <aside className="border-b border-lime-100 bg-white px-5 py-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <div className="flex h-full flex-col">
        <div>
          <Image src="/logosiaga.jpeg" alt="Logo Siaga+" width={55} height={55} className="rounded-xl object-cover" />
          <h1 className="mt-4 text-xl font-semibold text-slate-900">Siaga Pluss</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Panel administrator Siaga+.
          </p>
        </div>

        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-lime-100 text-lime-800"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-[28px] bg-[#f5f9ef] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-700">
            Status Admin
          </p>
          <div className="mt-3 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <p className="font-medium text-slate-900">admin@siaga.com</p>
              <p className="mt-1 text-emerald-600">Online</p>
            </div>
          </div>
        </div>

        <div className="mt-auto hidden rounded-[28px] bg-slate-900 p-5 text-white lg:block">
          <p className="text-sm text-slate-300">Panel Admin</p>
          <p className="mt-2 text-lg font-semibold">Kelola Siaga+ dengan mudah</p>
        </div>

        <div className="mt-4 rounded-2xl border border-lime-200 bg-white p-4 lg:hidden">
          <Link href="/beranda" className="text-sm font-medium text-lime-700 hover:text-lime-800">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </aside>
  );
}

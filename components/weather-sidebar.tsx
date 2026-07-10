import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { label: "Beranda", href: "/beranda" },
  { label: "Peta Cuaca", href: "/peta" },
  { label: "Peringatan", href: "/peringatan" },
  { label: "Laporan Warga", href: "/laporan" },
   { label: "Notifikasi", href: "/notifikasi" },
  { label: "Profil", href: "/profil" },
];

type WeatherSidebarProps = {
  activeItem?: string;
  location?: string;
  status?: string;
  tip?: string;
};

export default function WeatherSidebar({
  activeItem = "Beranda",
  location = "Balikpapan",
  status = "Aman dan terkendali",
  tip = "Jangan cuma siap ditinggal, siapin juga jas hujan..",
}: WeatherSidebarProps) {
  return (
    <aside className="border-b border-lime-100 bg-white px-5 py-6 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
      <div className="flex h-full flex-col">
        <div>
          <Image src="/logosiaga.jpeg" alt="Logo Siaga+"width={55} height={55} className="rounded-xl object-cover"/>
          <h1 className="mt-4 text-xl font-semibold text-slate-900">Siaga Pluss</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Dashboard cuaca untuk pemantauan cepat kondisi wilayah.
          </p>
        </div>

        <nav className="mt-8 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                activeItem === item.label
                  ? "bg-lime-100 text-lime-800"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs text-slate-400">01</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-[28px] bg-[#f5f9ef] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-700">
            Lokasi Pantau
          </p>
          <div className="mt-3 space-y-3 text-sm text-slate-600">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <p className="font-medium text-slate-900">{location}</p>
              <p className="mt-1">Update 5 menit lalu</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <p className="font-medium text-slate-900">Wilayah Terpantau</p>
              <p className="mt-1 text-lime-700">{status}</p>
            </div>
          </div>
        </div>

        <div className="mt-auto hidden rounded-[28px] bg-slate-900 p-5 text-white lg:block">
          <p className="text-sm text-slate-300">Tip singkat</p>
          <p className="mt-2 text-lg font-semibold">{tip}</p>
        </div>
      </div>
    </aside>
  );
}

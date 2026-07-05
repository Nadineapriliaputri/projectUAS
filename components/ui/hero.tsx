import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-1.5 text-sm font-medium text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Sistem Peringatan Dini
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Pantau Kondisi Sekitar
            <span className="block text-blue-400">Secara Real-Time</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-300 sm:text-xl">
            Siaga Pluss membantu Anda memantau kondisi cuaca, potensi banjir, dan
            situasi darurat di sekitar Anda. Dengan data real-time dari BMKG dan
            laporan warga, Anda dapat mengambil keputusan cepat untuk keselamatan
            keluarga dan komunitas.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/beranda"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-400 hover:shadow-blue-500/40 active:scale-[0.98]"
            >
              Lihat Peringatan Cuaca
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/beranda"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

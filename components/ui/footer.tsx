export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-xs font-bold text-white">
              SP
            </div>
            <span className="text-sm font-semibold text-white">
              SIAGA PLUSS
            </span>
          </div>

          <p className="text-sm text-slate-400">
            Siaga Pluss &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}

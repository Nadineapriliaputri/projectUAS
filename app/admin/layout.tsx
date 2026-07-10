import AdminSidebar from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#edf4e3] p-3 text-slate-900 sm:p-4 lg:p-6">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-lime-100 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)] lg:grid-cols-[280px_minmax(0,1fr)]">
        <AdminSidebar />
        <div className="flex flex-col bg-[#dcecc8] p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}

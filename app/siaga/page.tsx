export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-300">

      <div className="bg-white p-8 rounded-3xl shadow-lg w-[350px]">

        <div className="flex items-center justify-center gap-2">
          <img
            src="/logo_siaga_pluss.png"
            alt="Logo"
            className="w-8 h-8"
          />

          <h1 className="text-3xl font-bold">
            SIAGA PLUSS
          </h1>
        </div>

        <p className="text-center text-gray-700 mt-8 mb-8">
          Selamat Datang
        </p>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="border rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-xl p-3"
          />

          <button
            className="bg-blue-500 text-white rounded-xl p-3"
          >
            Login
          </button>

          <p className="text-center text-gray-400">
            atau
          </p>

          <button
            className="border rounded-xl p-3"
          >
            Masuk sebagai Tamu
          </button>

          <p className="text-center text-sm text-gray-500">
            Belum punya akun?
            <span className="ml-1 text-blue-500">
              Daftar
            </span>
          </p>

        </div>

      </div>

    </main>
  );
}
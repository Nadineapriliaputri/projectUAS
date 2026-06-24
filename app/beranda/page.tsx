import Image from "next/image";

export default function Beranda() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">

      {/* Hero */}
      <section className="max-w-5xl mx-auto">

            <h1 className="text-5xl font-bold">
            Pantau Cuaca,
            <br />
            Tetap Siaga.
            </h1>

            <p className="text-gray-500 mt-4">
            Dapatkan informasi cuaca dan laporan terkini.
            </p>

            {/* Button */}
            <div className="mt-8 flex gap-4">

                <button className="bg-blue-500 text-white px-6 py-3 rounded-xl">
                    Lihat Cuaca
                </button>

                <button className="border px-6 py-3 rounded-xl">
                    Lihat Peta
                </button>

            </div>

      </section>

      {/* Cuaca */}
      <section className="max-w-5xl mx-auto mt-12">

            <h2 className="text-2xl font-semibold mb-4">Cuaca Saat Ini</h2>

            <div className="bg-white rounded-3xl p-6 shadow">

                <div className="flex items-center gap-4">            
                <Image src="/cloud-fog.svg" alt="Cuaca" width={35} height={35}/>
                    <div>
                        <p className="text-2xl font-semibold">Cerah</p>
                        <p className="text-gray-500">29°C</p>
                    </div>
                </div>

            </div>

      </section>

      {/* Menu Cepat */}
      <section className="max-w-5xl mx-auto mt-12">

            <h2 className="text-2xl font-semibold mb-5">
            Menu Cepat
            </h2>

            <div className="grid grid-cols-3 gap-5">

                {/* PETA */}
                <div className="bg-white rounded-3xl p-6 shadow flex flex-col items-center">
                    <Image src="/map-2.svg" alt="Peta" width={35} height={35}/>
                    <p className="mt-4 font-medium">Peta</p>
                </div>

             
                <div className="bg-white rounded-3xl p-6 shadow flex flex-col items-center">
                    <Image src="/report-search.svg" alt="Laporan"width={35} height={35}/>
                    <p className="mt-4 font-medium">Laporan</p>
                </div>

                
                <div className="bg-white rounded-3xl p-6 shadow flex flex-col items-center">
                    <Image src="/bell-ringing.svg" alt="Notifikasi"width={35} height={35}/>
                    <p className="mt-4 font-medium">Notifikasi</p>
                </div>

            </div>

      </section>

    </main>
  );
}
export type AdminPengguna = {
  id: string;
  foto: string;
  nama: string;
  email: string;
  jumlahLaporan: number;
  statusAkun: "Aktif" | "Nonaktif";
};

export const adminPenggunaData: AdminPengguna[] = [
  { id: "U-001", foto: "AS", nama: "Andi Saputra", email: "andi@email.com", jumlahLaporan: 5, statusAkun: "Aktif" },
  { id: "U-002", foto: "SN", nama: "Siti Nurhaliza", email: "siti@email.com", jumlahLaporan: 3, statusAkun: "Aktif" },
  { id: "U-003", foto: "BS", nama: "Budi Santoso", email: "budi@email.com", jumlahLaporan: 2, statusAkun: "Aktif" },
  { id: "U-004", foto: "DL", nama: "Dewi Lestari", email: "dewi@email.com", jumlahLaporan: 7, statusAkun: "Aktif" },
  { id: "U-005", foto: "RP", nama: "Rizky Pratama", email: "rizky@email.com", jumlahLaporan: 1, statusAkun: "Nonaktif" },
  { id: "U-006", foto: "MA", nama: "Maya Anggraeni", email: "maya@email.com", jumlahLaporan: 4, statusAkun: "Aktif" },
  { id: "U-007", foto: "HW", nama: "Hendra Wijaya", email: "hendra@email.com", jumlahLaporan: 6, statusAkun: "Aktif" },
  { id: "U-008", foto: "LM", nama: "Lina Marlina", email: "lina@email.com", jumlahLaporan: 2, statusAkun: "Nonaktif" },
];

export const bulanData = [
  { bulan: "Jan", laporan: 12 },
  { bulan: "Feb", laporan: 18 },
  { bulan: "Mar", laporan: 25 },
  { bulan: "Apr", laporan: 15 },
  { bulan: "Mei", laporan: 30 },
  { bulan: "Jun", laporan: 22 },
  { bulan: "Jul", laporan: 10 },
];

export const wilayahData = [
  { wilayah: "Balikpapan Selatan", jumlah: 15 },
  { wilayah: "Balikpapan Tengah", jumlah: 12 },
  { wilayah: "Balikpapan Utara", jumlah: 10 },
  { wilayah: "Balikpapan Barat", jumlah: 8 },
  { wilayah: "Sepinggan", jumlah: 7 },
  { wilayah: "Manggar", jumlah: 5 },
];

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-Adaptive-8B5CF6?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Filament-3-F59E0B?style=for-the-badge&logo=filament&logoColor=white" alt="Filament">
</p>

# 🧠 MahasigMind

**MahasigMind** adalah platform kesehatan mental komprehensif berbasis web yang dirancang khusus untuk mahasiswa Indonesia. Aplikasi ini memfasilitasi pemantauan kesehatan emosional melalui pencatatan *mood* harian, penulisan jurnal reflektif, forum diskusi anonim/terbuka, serta penyediaan akses bimbingan & konsultasi langsung bersama psikolog profesional.

Aplikasi ini juga dilengkapi **Dashboard Psikolog** untuk pengurusan slot jadwal & bimbingan klien, serta **Filament Admin Panel** untuk pengolahan pengguna dan moderasi artikel edukasi.

---

## ✨ Fitur Utama Berdasarkan Role

### 👨‍🎓 Role Mahasiswa
- **Autentikasi & Role Redirect**: Sesi login terpisah yang otomatis mengarahkan mahasiswa ke dashboard khusus.
- **Beranda (Home)**: Kartu sapaan ramah, *MoodPicker* harian, menu akses cepat, dan pembacaan artikel edukasi via overlay.
- **Chat Psikolog**: Pengajuan konsultasi, pemilihan psikolog profesional (*PsychologistPickerSheet*), dan ruang obrolan langsung dengan *auto-reload / polling*.
- **Forum Diskusi**: Kategori diskusi (*Kuliah, Keluarga, Relasi, Keuangan*), pembuatan postingan baru, dan fitur balasan postingan.
- **Jurnal Harian**: Galeri catatan refleksi harian, form penulisan jurnal, dan tampilan detail refleksi.
- **Notifikasi**: Bottom sheet notifikasi sistem dengan fitur "Tandai semua sudah dibaca".
- **Pengaturan Profil**: Pengelolaan informasi akun, ubah kata sandi, dan hapus akun.

### 🧑‍⚕️ Role Psikolog
- **Dashboard Konselor**: Metriks analitik (*Klien Aktif, Sesi Hari Ini, Jurnal Masuk, Artikel Saya*), jadwal sesi harian, dan preview permintaan bimbingan.
- **Kelola Sesi Chat**: Daftar klien aktif dan ruang chat bimbingan terintegrasi.
- **Kelola Jadwal Operasional**: Pemilihan tanggal dan *TimeSlotPicker* interaktif untuk menghidupkan/mematikan slot jam ketersediaan (`09:00` s/d `16:00`).
- **Permintaan Konsultasi**: Filter status pengajuan (*Semua, Menunggu, Disetujui, Ditolak*) dengan aksi *Setujui* / *Tolak* ber-modal konfirmasi.
- **Profil Mahasiswa & Peringatan Risiko**: Pratinjau data mahasiswa, galeri jurnal refleksi mahasiswa, dan *Warning Card* otomatis berwarna kuning bila ada indikasi kecemasan berturut-turut.
- **Ekspor Data (CSV)**: Fitur pencarian kueri dan pengunduhan laporan rekapitulasi konsultasi dalam format CSV.
- **Kelola Artikel Edukasi**: Pembuatan, pengubahan, dan penghapusan artikel dengan badge status (*Terbit, Menunggu Review, Draf, Ditolak*).

### 🛡️ Role Admin Panel (Filament v3)
- **Dashboard Widgets**: *StatsOverviewWidget* untuk statistik *Total Pengguna*, *Total Psikolog*, dan *Artikel Menunggu Verifikasi*.
- **Kelola User (`UserResource`)**: Manajemen data pengguna, penapis role, dan pencarian nama/email.
- **Kelola Psikolog (`PsychologistResource`)**: Manajemen data psikolog terdaftar beserta aksi verifikasi akun.
- **Kelola & Verifikasi Artikel (`ArticleResource`)**: Pengelolaan moderasi artikel dengan aksi **Terima** (*Terbit*) & **Tolak** (*Ditolak*). Artikel yang disetujui otomatis terpublikasi langsung ke mahasiswa.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan arsitektur **Monolith Modern** (*Laravel 11 + Inertia.js + React 19 + TypeScript + Tailwind CSS v3*).

| Kategori | Teknologi |
| :--- | :--- |
| **Backend Framework** | Laravel 11 (PHP 8.2+) |
| **Frontend Framework** | React 19 + TypeScript |
| **Glue (Bridge)** | Inertia.js |
| **Styling** | Tailwind CSS v3 |
| **Database** | PostgreSQL |
| **Admin Panel** | Filament PHP v3 |
| **Authentication** | Laravel Breeze + Google OAuth |
| **Bundler** | Vite |

---

## 📋 Prasyarat Sistem

Sebelum menjalankan project di lokal, pastikan perangkat Anda terpasang:

1. **PHP** >= `8.2` (dengan ekstensi `pdo_pgsql`, `pgsql`, `mbstring`, `xml`, `curl`, `zip`)
2. **Composer** (PHP Dependency Manager)
3. **Node.js** >= `18.x` & **NPM**
4. **PostgreSQL Database** (Lokal via Docker, Laragon PostgreSQL, DBngin, atau PostgreSQL Server)

---

## 🚀 Langkah Instalasi & Cara Menjalankan Project

### 1. Clone & Masuk ke Folder Project
```bash
git clone https://github.com/RusdiEneri/MahasigMind.git
cd MahasigMind
```

### 2. Install Dependencies (Backend & Frontend)
```bash
# Install PHP dependencies
composer install

# Install Node.js packages
npm install
```

### 3. Konfigurasi File Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
php artisan key:generate
```

Pastikan konfigurasi PostgreSQL di file `.env` sudah sesuai dengan PostgreSQL Docker/Laragon Anda:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=db_mahasigmind
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### 4. Jalankan Migrasi & Database Seeder
Jalankan perintah berikut untuk membuat tabel-tabel dan mengisi akun uji awal:
```bash
php artisan migrate:fresh --seed
```

### 5. Jalankan Server Aplikasi & Asset Bundler

Buka **2 jendela terminal** di folder project:

**Terminal 1 (Vite Dev Server - Asset Compiler):**
```bash
npm run dev
```

**Terminal 2 (Laravel Backend Server):**
```bash
php artisan serve
```

🎉 **Aplikasi MahasigMind sekarang siap diakses di:** [http://localhost:8000](http://localhost:8000) (atau [http://127.0.0.1:8000](http://127.0.0.1:8000)).

---

## 🔑 Akun Pengujian Dummy Default (Seeded)

Kata sandi (password) untuk seluruh akun pengujian bawaan di bawah ini adalah: `password`

| Role | Alamat Email | Password | URL Tujuan Setelah Login |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@mahasigmind.id` | `password` | [http://localhost:8000/admin](http://localhost:8000/admin) |
| **Psikolog 1** | `sarah.wijaya@mahasigmind.id` | `password` | [http://localhost:8000/psikolog/dashboard](http://localhost:8000/psikolog/dashboard) |
| **Psikolog 2** | `budi.santoso@mahasigmind.id` | `password` | [http://localhost:8000/psikolog/dashboard](http://localhost:8000/psikolog/dashboard) |
| **Mahasiswa 1** | `mahasiswa@mahasigmind.id` | `password` | [http://localhost:8000/mahasiswa/dashboard](http://localhost:8000/mahasiswa/dashboard) |
| **Mahasiswa 2** | `siti@mahasigmind.id` | `password` | [http://localhost:8000/mahasiswa/dashboard](http://localhost:8000/mahasiswa/dashboard) |
| **Mahasiswa 3** | `rizky@mahasigmind.id` | `password` | [http://localhost:8000/mahasiswa/dashboard](http://localhost:8000/mahasiswa/dashboard) |

---

## 🧪 Cara Menjalankan Automated Testing & TypeScript Check

### Menjalankan Test Suite (PHPUnit / Pest)
```bash
php artisan test
```

### Menjalankan TypeScript Compiler Check
```bash
npx tsc --noEmit
```

### Menjalankan Production Build Verification
```bash
npm run build
```

---

## 📄 Lisensi

MahasigMind dilesensikan di bawah [MIT License](https://opensource.org/licenses/MIT).

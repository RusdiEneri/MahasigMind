<p align="center">
  <img src="https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-Adaptive-8B5CF6?style=for-the-badge&logo=inertia&logoColor=white" alt="Inertia">
  <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Filament-3-F59E0B?style=for-the-badge&logo=filament&logoColor=white" alt="Filament">
</p>

# 🧠 MahasigMind

**MahasigMind** adalah platform kesehatan mental komprehensif yang dirancang khusus untuk mahasiswa. Aplikasi ini memfasilitasi pemantauan kesehatan emosional melalui pencatatan *mood* harian, penulisan jurnal reflektif, serta penyediaan akses konsultasi dengan psikolog profesional. 

Platform ini juga dilengkapi dengan **Dashboard Psikolog** untuk mengelola antrian konsultasi dan **Admin Panel** untuk manajemen sistem secara menyeluruh.

## ✨ Fitur Utama (MVP)

### 👨‍🎓 Untuk Mahasiswa
- **Autentikasi Aman**: Login/Register via Email atau Google OAuth.
- **Mood Tracker**: Pencatatan mood harian dengan visualisasi dan animasi interaktif.
- **Journaling**: Ruang privat untuk menulis jurnal harian dengan sistem kategorisasi.
- **Konsultasi**: Pengajuan permintaan sesi konsultasi dengan psikolog.

### 🧑‍⚕️ Untuk Psikolog
- **Dashboard Analitik**: Melihat tren dan agregat mood mahasiswa (global).
- **Manajemen Konsultasi**: Menerima, memproses, dan menyelesaikan permintaan konsultasi dari mahasiswa.

### 🛡️ Untuk Admin
- **Filament Admin Panel**: Antarmuka admin modern untuk mengelola *users*, artikel, dan data sistem lainnya secara *real-time*.

---

## 🛠️ Tech Stack

Aplikasi ini dibangun menggunakan arsitektur **Monolith Modern** dengan *Inertia.js* sebagai jembatan antara Backend dan Frontend (SPA feel tanpa kompleksitas API).

| Kategori | Teknologi |
| :--- | :--- |
| **Backend Framework** | Laravel 11 (PHP 8.2+) |
| **Frontend Framework** | React 19 + TypeScript |
| **Glue (Bridge)** | Inertia.js |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL |
| **Admin Panel** | Filament PHP v3 |
| **Authentication** | Laravel Breeze |
| **Bundler** | Vite |

---

## 📋 Prasyarat Instalasi

Sebelum memulai proses instalasi, pastikan sistem Anda telah memenuhi persyaratan berikut:

- **PHP** >= `8.2` 
  - *Ekstensi wajib: `pgsql`, `pdo_pgsql`, `mbstring`, `xml`, `curl`, `zip`, `bcmath`*
- **Composer** (PHP Dependency Manager)
- **Node.js** >= `18.x` & **NPM** (Node Package Manager)
- **PostgreSQL** >= `14` (Lokal via Postgres App / DBngin / XAMPP, atau Cloud)
- **Git**

---

## 🚀 Cara Instalasi & Menjalankan Aplikasi

Ikuti langkah-langkah berikut untuk menjalankan project di lingkungan lokal (Local Development Environment):

### 1. Clone Repository
```bash
git clone https://github.com/RusdiEneri/MahasigMind.git
cd MahasigMind
```

### 2. Install Dependencies
Install package untuk Backend (PHP) dan Frontend (Node.js):
```bash
# Install Composer dependencies
composer install

# Install NPM dependencies
npm install
```

### 3. Setup Environment Variables
Salin file konfigurasi environment dan generate App Key:
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Konfigurasi Database
Buka file `.env` dan sesuaikan kredensial database PostgreSQL Anda:
```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=db_mahasigmind
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### 5. Migrasi Database
Jalankan migrasi untuk membuat tabel-tabel yang dibutuhkan:
```bash
php artisan migrate
```
*(Opsional: Jika sudah tersedia seeder, gunakan `php artisan migrate --seed` untuk mengisi data dummy).*

### 6. Jalankan Aplikasi
Anda membutuhkan **2 terminal** yang berjalan secara bersamaan:

**Terminal 1 (Vite / Frontend Hot-Reload):**
```bash
npm run dev
```

**Terminal 2 (Laravel Server):**
```bash
php artisan serve
```

🎉 **Aplikasi sekarang dapat diakses di:** [http://localhost:8000](http://localhost:8000)

---

## 🛡️ Akses Admin Panel (Filament)

MahasigMind menggunakan **Filament PHP** untuk panel administrasi yang powerful dan elegan.

- **URL Admin Panel:** [http://localhost:8000/admin](http://localhost:8000/admin)
- **Membuat Akun Admin Pertama:**
  Jika Anda belum memiliki akun dengan akses admin, jalankan perintah berikut di terminal:
  ```bash
  php artisan make:filament-user
  ```
  Ikuti instruksi (Name, Email, Password) yang muncul di terminal untuk membuat akun Super Admin.

---

## 📂 Struktur Folder Penting

- `app/Models/` - Model Eloquent (User, Mood, Journal, Consultation)
- `app/Http/Controllers/` - Logic controller untuk routing web
- `resources/js/Pages/` - Komponen halaman Frontend (React + Inertia)
- `app/Filament/` - Resource, Pages, dan Widgets untuk Admin Panel
- `routes/web.php` - Definisi routing aplikasi

---

## 🤝 Kontribusi

Kontribusi, isu, dan *pull request* sangat diterima untuk pengembangan MahasigMind ke depannya. Jika Anda menemukan *bug* atau memiliki ide fitur baru, silakan buka *Issue* di repository ini.

## 📄 Lisensi

Aplikasi MahasigMind adalah perangkat lunak *open-source* yang dilisensikan di bawah [MIT license](https://opensource.org/licenses/MIT).
Framework Laravel yang digunakan juga merupakan perangkat lunak *open-source* berlisensi MIT.

---
<p align="center">
  <i>Developed with ❤️ for Indonesian Students' Mental Health.</i>
</p>

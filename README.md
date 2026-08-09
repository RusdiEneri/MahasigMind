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
# Project — MahasigMind

## Identitas
- Nama: MahasigMind
- Jenis: WebApp (mobile-first design)
- Repo: https://github.com/RusdiEneri/MahasigMind (branch utama: `staging`)
- Deskripsi: Platform kesehatan mental mahasiswa — mood tracker, journaling, konsultasi psikolog, forum, artikel edukasi.

## Stack (Monolith Modern)
| Kategori | Teknologi |
|---|---|
| Backend | Laravel 11 (PHP 8.2+) |
| Frontend | React 19 + TypeScript |
| Bridge | Inertia.js |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL |
| Admin Panel | Filament PHP v3 (URL: `/admin`) |
| Auth | Laravel Breeze + Google OAuth (Socialite) |
| Bundler | Vite |
| Package manager | npm |

## Role pengguna
1. `mahasiswa` — mood tracker, jurnal, chat konsultasi, forum, artikel.
2. `psikolog` — dashboard analitik, manajemen konsultasi, chat, ekspor data, artikel terjadwal.
3. `admin` — kelola user, kelola psikolog, verifikasi artikel, kelola artikel (via Filament).

## Command penting
- `composer install` / `npm install`
- `cp .env.example .env && php artisan key:generate`
- `php artisan migrate --seed`
- Terminal 1: `npm run dev`
- Terminal 2: `php artisan serve`
- Admin pertama: `php artisan make:filament-user`
- Build: `npm run build`

## Environment variables (nama saja, TANPA nilai secret)
- DB_CONNECTION=pgsql, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI
- APP_URL, FILESYSTEM_DISK

## Model yang SUDAH ada
`User`, `Mood`, `Journal`, `Consultation` (lihat `app/Models/`).

## Model yang BELUM ada (perlu dibuat, lihat memory.md)
`Article`, `ForumCategory`, `ForumPost`, `ForumReply`, `ChatMessage`, availability/slot psikolog, notifications (pakai database notifications Laravel).

## Controller yang SUDAH ada
`Auth/*`, `ProfileController`, `SocialiteController`, `MoodController`, `JournalController`, `ConsultationController`.

## Route yang SUDAH ada (routes/web.php)
- `/` → Welcome
- `/auth/google/redirect`, `/auth/google/callback`
- `/dashboard` (auth, verified)
- `profile.edit/update/destroy`, `moods.store`, `journals.index/store/update/destroy`
- Route Breeze di `routes/auth.php`
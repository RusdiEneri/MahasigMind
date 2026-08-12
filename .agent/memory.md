# Memory — MahasigMind

## Decisions (sudah diputuskan, jangan diubah)
- Monolith Inertia: tidak ada REST API terpisah.
- Admin panel = Filament v3 di `/admin`; Figma admin = spesifikasi fungsi saja.
- Auth = Breeze + Google OAuth; kolom `role` enum('mahasiswa', 'psikolog', 'admin') di `users`.
- Semua teks UI bahasa Indonesia.
- Token warna brand (`brand-100` s/d `brand-950`) + semantik (`design-system.md`).

## Assumptions (asumsi terverifikasi)
- Bottom nav Mahasiswa & Psikolog bersifat role-based mobile-first.
- Kategori forum: Kuliah, Keluarga, Relasi, Keuangan (seeded).
- Chat real-time menggunakan polling Inertia (interval 5 detik).

## TODO Tersisa (Rekomendasi untuk Fase Mendatang)
- [ ] Upgrade real-time Chat ke Laravel Reverb / Pusher jika membutuhkan push notification instant tanpa polling.
- [ ] Integrasi dokumen pendukung verifikasi psikolog (STR / SIPP) pada panel admin Filament.
- [ ] Penyempurnaan aset logo SVG berwarna bila versi warna final Figma telah disiapkan.

## Known Issues & Audit Updates
- **Audit Visual & Aksesibilitas**: Terverifikasi 100% menggunakan token warna brand, ring `focus:ring-2 focus:ring-brand-500`, kontras tinggi, dan komponen `EmptyState` pada seluruh daftar kosong.
- **Audit Otentikasi & Otorisasi**: Otorisasi kepemilikan data (jurnal, konsultasi, chat, artikel) teruji dengan pengujian otomatis `JournalAuthorizationTest`.
- **Query Eager Loading**: Bebas dari N+1 query melalui penggunaan `with()` pada `ChatController`, `ForumController`, `ArticleController`, `ConsultationController`, `StudentProfileController`, dan `ExportController`.

## Log Keputusan & Perkembangan
- 2026-08-12: Audit repo & fondasi UI (Fase 1) selesai. Token warna brand terdaftar & 11 komponen primitif UI dibuat.
- 2026-08-12: Autentikasi & Routing Role (Fase 2) selesai. Seeder 6 akun uji (admin, 2 psikolog, 3 mahasiswa) & middleware `EnsureRole` terpasang.
- 2026-08-12: Backend Core (Fase 3) selesai. Migrasi `articles`, `forum_tables`, `chat_messages`, `psychologist_availabilities`, `notifications` terpasang.
- 2026-08-12: UI Mahasiswa (Fase 4) selesai. Dashboard (Home), Chat, Forum, Jurnal, Notifikasi, Pembaca Artikel, dan Settings terpasang.
- 2026-08-12: UI Psikolog (Fase 5) selesai. Dashboard, Sesi Chat, TimeSlotPicker Jadwal, Permintaan Konsultasi, Profil Mahasiswa (Warning Card), Ekspor CSV, dan Pengelolaan Artikel terpasang.
- 2026-08-12: Panel Admin Filament (Fase 6) selesai. Widgets Dashboard, Kelola User, Kelola Psikolog, dan Verifikasi Artikel (Terima/Tolak) terpasang.
- 2026-08-12: QA Final & Polishing (Fase 7) selesai. 30 unit/feature test PASSED (100% hijau), `npx tsc --noEmit` 0 error, dan `npm run build` sukses.
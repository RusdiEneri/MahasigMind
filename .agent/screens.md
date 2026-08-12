# Screens & Flow — MahasigMind

## Alur autentikasi (semua role, dari diagram user)
Mulai → Splash → "Masuk Sebagai" (pilih role) → Form Masuk →
Apakah autentikasi berhasil?
- TIDAK → kembali ke Form Masuk (tampilkan error inline).
- YA → redirect ke Halaman Utama sesuai role.
Login juga tersedia via Google (tombol Google, route `google.redirect`).

## ROLE: MAHASISWA
1. **Splash** (`/`) — logo centered; redirect: guest → login, auth → dashboard role.
2. **Login** (`/login`) — logo, "Masuk Sebagai" (Mahasiswa/Psikolog/Admin), email+password, tombol Masuk, tombol Google. State: error kredensial.
3. **Home** (`mahasiswa.dashboard`) — kartu gradient biru: sapaan "Halo, {nama} 👋"; MoodPicker (mood tracker existing); menu cards: Chat dengan Psikolog, Forum Diskusi, Jurnal; section artikel edukasi (tap → ArticleSheet). Nav bawah: Home, Chat, Forum, Jurnal, Profil.
4. **Chat** (`mahasiswa.chat.index`) — buka PsychologistPickerSheet; setelah pilih → `mahasiswa.chat.show`.
5. **Chat detail** (`mahasiswa.chat.show`) — TopBar nama psikolog, bubble chat, ChatInput. State: empty chat.
6. **Forum** (`mahasiswa.forum.index`) — list ForumPostCard, kategori: Kuliah, Keluarga, Relasi, Keuangan (Frame 7); FAB/tombol "Buat Postingan" → `mahasiswa.forum.create` (judul, kategori, isi, gambar opsional).
7. **Jurnal** (`mahasiswa.journal.index`) — galeri JournalCard; `create` (form: tanggal, mood, kegiatan, syukur/refleksi); `show` (detail + refleksi). Sesuai frame JournalMenu.
8. **Settings** (`profile.edit`) — profil, ganti password, hapus akun (existing Breeze, redesign).
9. **Notifikasi** — NotificationSheet dari ikon bell: item contoh "Permintaan konsultasi baru", "Reminder sesi", "Artikel disetujui" + "Tandai semua sudah dibaca".

## ROLE: PSIKOLOG
1. **Dashboard** (`psikolog.dashboard`) — kartu gradient: sapaan; StatCard (klien aktif, sesi hari ini, jurnal masuk, artikel); "Jadwal hari ini" (list slot); "Permintaan konsultasi" (preview + link).
2. **Chat** (`psikolog.chat.*`) — list klien aktif → chat detail (bubble sama).
3. **Jadwal Konsultasi** (`psikolog.schedule`) — date picker horizontal (Sen 22 dst), grid slot jam; kelola ketersediaan.
4. **Permintaan Konsultasi** (`psikolog.consultations`) — list ConsultationRow: terima/tolak (badge status), detail mahasiswa.
5. **Profil Mahasiswa** (`psikolog.students.show`) — data mahasiswa, list jurnal, kartu warning kuning (catatan risiko bila ada).
6. **Ekspor Data** (`psikolog.export`) — SearchInput, list mahasiswa + tombol "Ekspor" per baris (download). TODO: format CSV/PDF.
7. **Artikel Edukasi** (`psikolog.articles`) — list artikel terjadwal dengan badge status (Disetujui/Ditolak/Draf), aksi edit/hapus.

## ROLE: ADMIN (Filament, `/admin`) — mengikuti alur diagram user
Halaman Utama (dashboard widgets) lalu 4 menu:
1. **Kelola User** — resource User: tabel total user, badge role/status, pencarian.
2. **Kelola Psikolog** — resource psikolog (user role psikolog): total psikolog, verifikasi akun psikolog (setujui/tolak).
3. **Verifikasi Artikel** — resource Article + action "Terima"/"Tolak"; halaman detail memuat judul, penulis, tanggal, kategori, isi, kartu warning, tombol Tolak/Terima (Frame 11).
4. **Kelola Artikel** — CRUD artikel edukasi (buat, edit, hapus, status draf/terjadwal/terbit).
Widgets dashboard: StatOverview (total user, total psikolog, artikel menunggu), RecentActivity, kartu warning kuning bila ada antrean verifikasi.

## Prioritas build
1. Auth + role redirect  2. Mahasiswa (home, jurnal, chat)  3. Psikolog  4. Forum  5. Admin Filament.
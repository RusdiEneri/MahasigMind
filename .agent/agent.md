# Agent — MahasigMind

Kamu adalah coding agent untuk project **MahasigMind** (platform kesehatan mental mahasiswa).
Project ini **Monolith Modern**: Laravel 11 + Inertia.js + React 19 + TypeScript + Tailwind CSS v4.
Admin panel menggunakan **Filament v3** (BUKAN React/Inertia).

## Peran kamu
- Membangun/mengubah UI sesuai desain Figma yang didokumentasikan di `design-system.md`, `components.md`, `screens.md`.
- Menulis backend (migration → model → FormRequest → controller → route) sesuai konvensi Laravel 11.
- Membangun admin panel lewat Filament resource/widget, mengikuti alur admin di `screens.md`.
- Menjaga arsitektur monolith: JANGAN membuat REST API terpisah; semua data lewat Inertia props.

## Cara membaca konteks (WAJIB, urut)
1. `.agent/project.md` — stack, command, env, role.
2. `.agent/structure.md` — struktur repo & lokasi file.
3. `.agent/rules.md` — aturan & larangan.
4. `.agent/design-system.md` — token warna, state, styling.
5. `.agent/components.md` — katalog component React + props.
6. `.agent/screens.md` — daftar screen, route, flow (termasuk alur admin).
7. `.agent/examples.md` — pola kode yang harus ditiru.
8. `.agent/memory.md` — keputusan, asumsi, TODO.

Untuk tugas UI, baca juga `.agent/prompts/build-ui.md` sebelum menulis kode.

## Urutan kerja fitur baru
1. Cek screen target di `screens.md` dan route-nya.
2. Cek `components.md`; REUSE component yang sudah ada sebelum membuat baru.
3. Backend dulu: migration → model → FormRequest → controller → route (named route).
4. Frontend: types (`resources/js/types`) → component → page (`resources/js/Pages`) → wire route.
5. Verifikasi: `npm run dev` + `php artisan serve`, pastikan tanpa error TypeScript & PHP.

## Larangan keras
- Jangan install dependency baru tanpa konfirmasi user.
- Jangan menulis secret/API key di kode atau di file `.agent`.
- Jangan membuat axios/fetch manual untuk data utama (pakai Inertia), kecuali download/export file.
- Jangan mengubah struktur folder `resources/js` (Components / Layouts / Pages / types).
- Jangan mengubah halaman React untuk fitur admin; admin = Filament.
- Jika informasi kurang: cek `memory.md`; jika tetap tidak ada, tulis `TODO:` dan tanya user.
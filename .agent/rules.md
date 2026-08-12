# Rules — MahasigMind

## Struktur & penamaan
- Halaman React: `resources/js/Pages/<Area>/<Name>.tsx` (Area: `Auth`, `Mahasiswa`, `Psikolog`, `Profile`).
- Page Inertia WAJIB `export default` (kebutuhan Inertia). Component lain named export.
- Component reusable: `resources/js/Components/ui/*` (primitif) dan `resources/js/Components/app/*` (khusus domain).
- Layout: gunakan/extend file yang sudah ada di `resources/js/Layouts/` (GuestLayout, AuthenticatedLayout).
- Types shared: `resources/js/types/index.d.ts` (extend, jangan buat file types liar).
- Controller: `app/Http/Controllers/<Name>Controller.php`, satu controller per domain.
- Named route wajib, format: `mahasiswa.*`, `psikolog.*`, route Breeze existing jangan diubah namanya.
- Filament: resource di `app/Filament/Resources`, widget di `app/Filament/Widgets`.

## Backend
- Laravel 11 conventions; validasi WAJIB via FormRequest, jangan `Request $request` + validate inline untuk fitur baru.
- Relasi Eloquent didefinisikan di model; gunakan eager loading (`with()`) untuk menghindari N+1.
- Response ke frontend WAJIB `Inertia::render(...)` dengan props typed.
- Role check via middleware (buat `EnsureRole` jika belum ada), jangan cek role di view.
- Semua teks UI berbahasa Indonesia.

## Frontend
- TypeScript strict; semua props page & component punya interface.
- Styling HANYA Tailwind class dengan token brand (`brand-100..950`, lihat design-system.md). Jangan pakai hex inline di JSX kecuali token belum ada.
- Jangan bawa state global baru; pakai props Inertia + `usePage()` untuk data auth/user.
- Form pakai `useForm` dari `@inertiajs/react`.
- Mobile-first: semua screen mahasiswa/psikolog dirancang lebar ±390px, tetap responsif ke desktop (max-w-md centered).
- Overlay/bottom-sheet untuk: pilih psikolog, notifikasi, lihat artikel (sesuai Figma).

## Desain
- Ikuti token di `design-system.md`; jangan memperkenalkan warna baru tanpa konfirmasi.
- Reuse component dari `components.md`; component baru hanya jika benar-benar tidak ada padanannya.
- State wajib ditangani: loading, empty, error, disabled, success (lihat design-system.md §State).

## Admin (Filament)
- Fitur admin (kelola user, kelola psikolog, verifikasi artikel, kelola artikel) WAJIB di Filament, bukan React.
- Figma "Admin page" berfungsi sebagai spesifikasi FUNGSI (field, status, aksi), bukan spesifikasi visual Filament.

## Keamanan
- Jangan commit `.env`; jangan tulis secret di file mana pun.
- Input user selalu di-escape oleh React; jangan pakai `dangerouslySetInnerHTML` untuk konten artikel tanpa sanitasi.
- Export data psikolog hanya untuk role psikolog/admin.

## Git
- Branch kerja: `staging` / feature branch dari `staging`.
- Commit message format: `feat:`, `fix:`, `refactor:` (ikuti riwayat repo).
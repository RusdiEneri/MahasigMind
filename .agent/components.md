# Components — MahasigMind

Katalog component yang dibutuhkan untuk membangun semua screen Figma.
Cek `resources/js/Components` sebelum membuat; reuse dulu.

## ui/ (primitif) — `resources/js/Components/ui/`
| Component | Props utama | Catatan Figma |
|---|---|---|
| `Button.tsx` | `variant: primary/outline/ghost/danger`, `fullWidth`, `disabled`, `loading` | Primer cyan; outline untuk "Batal"/"Tolak" |
| `Badge.tsx` | `tone: info/success/warning/danger/neutral` | Tag spesialisasi, status artikel/konsultasi |
| `Card.tsx` | `header?: ReactNode`, `className` | Card putih rounded-2xl, header brand-100 |
| `Input.tsx`, `Textarea.tsx`, `Select.tsx` | `label`, `error`, `hint` | Form login, jurnal, posting forum, artikel |
| `BottomSheet.tsx` | `open`, `onClose`, `title` | Dasar semua overlay Figma |
| `Modal.tsx` | `open`, `onClose` | Konfirmasi kecil (hapus/tolak) |
| `SearchInput.tsx` | `value`, `onChange` | Ekspor data, kelola user/psikolog (Filament pakai bawaan) |
| `EmptyState.tsx` | `icon`, `title`, `description` | Jurnal kosong, chat kosong |
| `StatCard.tsx` | `label`, `value`, `icon` | Dashboard psikolog & admin |

## app/ (domain) — `resources/js/Components/app/`
| Component | Fungsi | Dipakai di |
|---|---|---|
| `Logo.tsx` | Logo otak+topi wisuda; varian `light/dark`, `withText` | Splash, login, header |
| `RolePicker.tsx` | Opsi "Masuk Sebagai": Mahasiswa/Psikolog/Admin | Login |
| `BottomNavigation.tsx` | Nav bawah berbasis role (Home, Chat, Forum/Jurnal, Profil) | Semua screen auth |
| `TopBar.tsx` | Back + judul + aksi (bell, settings) | Screen detail |
| `NotificationSheet.tsx` | Overlay notif: ikon, judul, deskripsi, waktu, "Tandai semua sudah dibaca" | Global |
| `ArticleSheet.tsx` | Overlay "lihat artikel" + tombol "Lihat artikel nya" | Mahasiswa home/forum |
| `PsychologistPickerSheet.tsx` | Overlay "Pilih psikolog": list PsychologistCard + tombol Batal | Mahasiswa chat |
| `PsychologistCard.tsx` | Avatar, nama, role, chip spesialisasi, estimasi waktu (ikon jam "1–3 jam") | Picker & dashboard psikolog |
| `TimeSlotPicker.tsx` | Grid slot jam (09.00 dst) dengan state selected/disabled | Frame 8 Figma, jadwal psikolog |
| `MoodPicker.tsx` | Bar emoji mood (mood tracker existing) | Home mahasiswa |
| `ChatBubble.tsx` | `mine: boolean`, teks, waktu | Chat kedua role |
| `ChatInput.tsx` | Input + kirim (+ lampiran opsional) | Chat |
| `JournalCard.tsx` | Tanggal, judul, kutipan isi, kategori | Galeri jurnal |
| `ForumPostCard.tsx` | Avatar, nama, kategori, isi, aksi | Forum |
| `ConsultationRow.tsx` | Nama mahasiswa, waktu, status, aksi terima/tolak | Psikolog |
| `UserRow.tsx` | Avatar, nama, email, badge status | List user (referensi Filament) |

## Layouts — `resources/js/Layouts/`
- `GuestLayout.tsx` — background gradient brand-100→white, centered, untuk Login/Register/Splash.
- `AuthenticatedLayout.tsx` — TopBar + BottomNavigation + mount `NotificationSheet`; props `role` untuk variasi nav.

## Aturan component
- Named export, nama file = nama component (PascalCase).
- Props WAJIB typed; jangan terima `any`.
- Teks UI bahasa Indonesia; teks dinamis lewat props, jangan hard-code di ui/.
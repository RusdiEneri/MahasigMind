# Prompt: Build UI dari Figma (untuk agent di Antigravity)

Gunakan prompt ini saat diminta membangun/mengubah UI:

1. Baca `.agent/agent.md`, `structure.md`, `rules.md`, `design-system.md`, `components.md`, `screens.md`, `memory.md`.
2. Pastikan token brand sudah terdaftar di `resources/css/app.css` (@theme). Jika belum, tambahkan dulu.
3. Bangun lapis demi lapis, urut:
   a. `Components/ui/*` (Button, Badge, Card, Input, BottomSheet, EmptyState).
   b. `Components/app/*` (Logo, BottomNavigation, TopBar, sheet overlay, chat, card domain).
   c. `Layouts` (GuestLayout, AuthenticatedLayout).
   d. `Pages` per role sesuai prioritas di `screens.md`.
4. Untuk setiap screen:
   - Cocokkan dengan frame Figma terkait di `screens.md`.
   - Gunakan HANYA token brand; background gradient `from-brand-100 to-white`.
   - Sediakan state empty/loading/disabled.
   - Wire ke named route yang sudah ada di backend; jika route belum ada, buat backend dulu (migration → model → FormRequest → controller → route) baru page.
5. Jangan sentuh fitur admin di React; admin dikerjakan via Filament sesuai `screens.md` §ADMIN.
6. Setelah selesai: jalankan `npm run dev`, periksa tiap page yang diubah, pastikan tanpa error TS, lalu ringkas perubahan (file dibuat/diubah + route terkait).
7. Jika ada detail desain yang tidak ada di dokumen: tulis `TODO:` di `.agent/memory.md` dan tanya user. JANGAN mengarang warna/flow baru.
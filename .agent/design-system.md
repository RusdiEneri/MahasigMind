# Design System — MahasigMind

Sumber: Figma "MahaSigMind". Semua nilai warna WAJIB dari token ini.

## Palet brand
| Token | Hex | Pemakaian |
|---|---|---|
| `brand-950` | `#03045e` | Judul/heading, teks emphasis, logo text |
| `brand-700` | `#0077b6` | Link, teks chip/tag, tombol sekunder, active text |
| `brand-500` | `#00b4d8` | Tombol primer, bubble chat terkirim, nav active, CTA |
| `brand-300` | `#90e0ef` | Surface sekunder, background ikon, header card ringan |
| `brand-100` | `#caf0f8` | Background aplikasi, header card, background sheet/notif |

## Definisi token (Tailwind v4, CSS-first)
Tambahkan di `resources/css/app.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand-950: #03045e;
  --color-brand-700: #0077b6;
  --color-brand-500: #00b4d8;
  --color-brand-300: #90e0ef;
  --color-brand-100: #caf0f8;
}

## Gradient
- Background screen: `bg-gradient-to-b from-brand-100 via-brand-100 to-white`.
- Header card dashboard (kartu biru): `bg-gradient-to-br from-brand-700 to-brand-500`.

## Tipografi
- TODO: konfirmasi font family dari Figma (terlihat geometris-rounded, kandidat: Poppins/Plus Jakarta Sans).
- Fallback sementara: `font-sans` default.
- Heading screen: `text-brand-950 font-semibold`.
- Teks body: `text-slate-600`; teks kecil/meta: `text-xs text-slate-500`.

## Radius & shadow
- Card: `rounded-2xl shadow-sm` (shadow lembut, hampir flat).
- Button: `rounded-lg`.
- Chip/tag & time-slot: `rounded-md` / chip `rounded-full`.
- Bottom sheet: `rounded-t-2xl`.

## Komponen visual inti (dari Figma)
- **Tombol primer**: `bg-brand-500 text-white` full-width, hover `bg-brand-700`, disabled `bg-slate-300 text-slate-500`.
- **Tombol outline**: `border border-slate-300 text-slate-600 bg-white` (contoh: "Batal").
- **Card list** (psikolog/notif/jurnal): `bg-white rounded-2xl`, header optional `bg-brand-100 rounded-t-2xl`.
- **Chip kategori/tag**: `bg-brand-100 text-brand-700 text-xs rounded-full px-2 py-0.5`.
- **Time slot**: kotak `border border-slate-200 rounded-md px-2 py-1 text-xs`; selected `bg-brand-500 text-white border-brand-500`; disabled `bg-slate-200 text-slate-400`.
- **Bubble chat terkirim**: `bg-brand-500 text-white rounded-2xl rounded-br-sm` (kanan).
- **Bubble chat diterima**: `bg-white text-slate-700 rounded-2xl rounded-bl-sm` (kiri).
- **Bottom navigation**: `bg-white` 4–5 ikon; active `text-brand-500`, inactive `text-slate-400`.
- **Overlay**: scrim `bg-black/40`, sheet putih `rounded-t-2xl`, tombol close `X` di kanan atas.

## Warna semantik
- Success: `emerald-500` (badge "Disetujui", checklist).
- Warning: `yellow-100` background + `yellow-800` teks (kartu peringatan admin/psikolog).
- Danger: `red-500` (tolak/hapus).
- Neutral/disabled: `slate-200/400`.

## State wajib
Setiap component interaktif minimal punya: default, hover, active/selected, disabled, focus-visible (`focus-visible:ring-2 ring-brand-500`).
Screen data: loading (skeleton sederhana), empty (EmptyState), error (pesan inline).
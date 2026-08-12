# Structure — MahasigMind

Struktur aktual repo (branch `staging`). Tanda (baru) = boleh ditambahkan jika fitur membutuhkan.

```txt
MahasigMind/
├── app/
│   ├── Filament/                  # Admin panel (Resources, Widgets, Pages)
│   │   ├── Resources/             # UserResource, ArticleResource, PsychologistResource (baru)
│   │   └── Widgets/               # StatOverview, RecentActivity (baru)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/              # Breeze
│   │   │   ├── ConsultationController.php
│   │   │   ├── JournalController.php
│   │   │   ├── MoodController.php
│   │   │   ├── ProfileController.php
│   │   │   ├── SocialiteController.php
│   │   │   ├── ChatController.php          (baru)
│   │   │   ├── ForumController.php         (baru)
│   │   │   └── ArticleController.php       (baru, sisi mahasiswa/psikolog)
│   │   └── Middleware/
│   │       └── EnsureRole.php              (baru)
│   ├── Http/Requests/             # FormRequest (baru per fitur)
│   └── Models/
│       ├── User.php  ├── Mood.php  ├── Journal.php  ├── Consultation.php
│       ├── Article.php (baru) ├── ForumPost.php (baru) ├── ChatMessage.php (baru)
├── database/migrations/           # migration baru sesuai fitur
├── resources/
│   ├── css/app.css                # token Tailwind v4 (@theme)
│   └── js/
│       ├── Components/
│       │   ├── ui/                # Button, Badge, Card, Input, BottomSheet, dll (baru)
│       │   └── app/               # BottomNavigation, ChatBubble, PsychologistCard, dll (baru)
│       ├── Layouts/               # GuestLayout, AuthenticatedLayout (extend)
│       ├── Pages/
│       │   ├── Auth/              # Login/Register (redesign sesuai Figma)
│       │   ├── Mahasiswa/         # Dashboard, Chat, Forum, Journal, Articles (baru)
│       │   ├── Psikolog/          # Dashboard, Schedule, Consultations, Export, Articles (baru)
│       │   ├── Profile/           # Edit (redesign = Settings)
│       │   ├── Dashboard.tsx      # existing (mood tracker) → arahkan per role
│       │   └── Welcome.tsx        # existing → splash/redirect
│       └── types/                 # index.d.ts (extend)
├── routes/
│   ├── web.php                    # route utama + role group
│   └── auth.php                   # Breeze
└── .agent/                        # dokumen ini

## Tanggung jawab folder frontend
- `Pages/Mahasiswa/*` — hanya screen role mahasiswa.
- `Pages/Psikolog/*` — hanya screen role psikolog.
- `Components/ui/*` — primitif netral (tanpa teks bisnis hard-coded).
- `Components/app/*` — component domain (chat, jurnal, psikolog, forum).
- `Layouts/*` — kerangka: background gradient, TopBar, BottomNavigation, sheet global (notifikasi).

## Mapping screen Figma → file page
| Figma | File page |
|---|---|
| Splash Screen | `Pages/Welcome.tsx` (redirect per auth/role) |
| Login Page + "Masuk Sebagai" | `Pages/Auth/Login.tsx` |
| HomePage mahasiswa | `Pages/Mahasiswa/Dashboard.tsx` |
| ChatPsikolog (mahasiswa) | `Pages/Mahasiswa/Chat/Index.tsx` + `Show.tsx` |
| Forum Diskusi | `Pages/Mahasiswa/Forum/Index.tsx` + `Create.tsx` |
| JournalMenu | `Pages/Mahasiswa/Journal/Index.tsx` + `Create.tsx` + `Show.tsx` |
| Settings | `Pages/Profile/Edit.tsx` |
| Dashboard psikolog | `Pages/Psikolog/Dashboard.tsx` |
| Jadwal Konsultasi | `Pages/Psikolog/Schedule.tsx` |
| Permintaan Konsultasi | `Pages/Psikolog/Consultations.tsx` |
| Profil Mahasiswa (psikolog) | `Pages/Psikolog/StudentProfile.tsx` |
| Ekspor Data | `Pages/Psikolog/Export.tsx` |
| Artikel Edukasi (psikolog) | `Pages/Psikolog/Articles.tsx` |
| Admin (semua) | Filament: `app/Filament/**` |
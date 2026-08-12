<x-filament-widgets::widget>
    <x-filament::section class="border-0 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white rounded-2xl shadow-md p-2">
        <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#caf0f8]">
                Panel Kendali Utama
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
                Halo, {{ auth()->user()->name }} 👋
            </h2>
            <p className="text-xs text-[#caf0f8] leading-relaxed max-w-2xl pt-1">
                Selamat datang di Admin Panel <strong>MahasigMind</strong>. Kelola data pengguna, verifikasi psikolog terdaftar, dan moderasi artikel edukasi untuk menjaga kualitas platform.
            </p>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>

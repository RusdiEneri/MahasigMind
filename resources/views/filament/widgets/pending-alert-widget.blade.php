<x-filament-widgets::widget>
    @if($pendingArticlesCount > 0)
        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-950 shadow-xs mb-4">
            <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-900 font-bold text-sm">
                    ⚠️
                </div>
                <div className="space-y-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                        Antrean Moderasi Perlu Tindakan
                    </h4>
                    <p className="text-xs text-amber-800 leading-relaxed">
                        Terdapat <strong>{{ $pendingArticlesCount }} artikel</strong> menunggu persetujuan verifikasi sebelum dapat dipublikasikan kepada mahasiswa.
                    </p>
                    <div className="pt-1">
                        <a href="{{ route('filament.admin.resources.articles.index') }}" className="text-xs font-bold text-amber-900 underline hover:text-amber-950">
                            Buka Halaman Moderasi Artikel →
                        </a>
                    </div>
                </div>
            </div>
        </div>
    @endif
</x-filament-widgets::widget>

<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected function getStats(): array
    {
        $totalUsers = User::count();
        $totalPsychologists = User::where('role', 'psikolog')->orWhere('role', 'psychologist')->count();
        $pendingArticles = Article::where('status', 'pending')->count();

        return [
            Stat::make('Total Pengguna', $totalUsers)
                ->description('Mahasiswa, Psikolog & Admin')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary'),

            Stat::make('Total Psikolog', $totalPsychologists)
                ->description('Psikolog terdaftar')
                ->descriptionIcon('heroicon-m-academic-cap')
                ->color('success'),

            Stat::make('Artikel Menunggu Verifikasi', $pendingArticles)
                ->description($pendingArticles > 0 ? 'Perlu ditinjau' : 'Semua artikel sudah diverifikasi')
                ->descriptionIcon('heroicon-m-document-text')
                ->color($pendingArticles > 0 ? 'warning' : 'gray'),
        ];
    }
}

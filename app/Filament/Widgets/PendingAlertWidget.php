<?php

namespace App\Filament\Widgets;

use App\Models\Article;
use App\Models\User;
use Filament\Widgets\Widget;

class PendingAlertWidget extends Widget
{
    protected static string $view = 'filament.widgets.pending-alert-widget';

    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 'full';

    public function getViewData(): array
    {
        $pendingArticlesCount = Article::where('status', 'pending')->count();
        $unverifiedPsychologistsCount = User::where('role', 'psikolog')->count(); // or unverified status

        return [
            'pendingArticlesCount' => $pendingArticlesCount,
            'unverifiedPsychologistsCount' => $unverifiedPsychologistsCount,
            'hasAlert' => $pendingArticlesCount > 0,
        ];
    }
}

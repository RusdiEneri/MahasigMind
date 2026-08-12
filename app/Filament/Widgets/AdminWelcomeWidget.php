<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class AdminWelcomeWidget extends Widget
{
    protected static string $view = 'filament.widgets.admin-welcome-widget';

    protected static ?int $sort = 1;

    protected int | string | array $columnSpan = 'full';
}

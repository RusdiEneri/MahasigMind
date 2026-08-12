<?php

namespace App\Providers\Filament;

use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->brandName('MahasigMind Admin')
            ->font('Plus Jakarta Sans')
            ->colors([
                'primary' => Color::hex('#0077b6'),
                'info' => Color::hex('#00b4d8'),
                'success' => Color::Emerald,
                'warning' => Color::Amber,
                'danger' => Color::Rose,
                'gray' => Color::Slate,
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->widgets([
                \App\Filament\Widgets\AdminWelcomeWidget::class,
                \App\Filament\Widgets\PendingAlertWidget::class,
                \App\Filament\Widgets\StatsOverviewWidget::class,
            ])
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn (): string => Blade::render('
                    <style>
                        :root {
                            --font-family: "Plus Jakarta Sans", sans-serif;
                        }
                        .fi-logo {
                            font-weight: 800 !important;
                            color: #03045e !important;
                            letter-spacing: -0.02em !important;
                        }
                        .dark .fi-logo {
                            color: #caf0f8 !important;
                        }
                        .fi-section, .fi-wi-stats-overview-stat, .fi-ta-content {
                            border-radius: 1rem !important;
                        }
                        .fi-sidebar-header {
                            border-bottom: 1px solid rgba(226, 232, 240, 0.6) !important;
                        }
                        .fi-sidebar-item-active .fi-sidebar-item-button {
                            background-color: rgba(202, 240, 248, 0.6) !important;
                            color: #0077b6 !important;
                            font-weight: 700 !important;
                        }
                    </style>
                ')
            )
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}

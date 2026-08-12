<?php

namespace App\Filament\Resources\ArticleResource\Pages;

use App\Filament\Resources\ArticleResource;
use App\Models\Article;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewArticle extends ViewRecord
{
    protected static string $resource = ArticleResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('accept')
                ->label('Terima Artikel')
                ->color('success')
                ->icon('heroicon-m-check-circle')
                ->requiresConfirmation()
                ->action(function (Article $record) {
                    $record->update(['status' => 'published']);
                })
                ->visible(fn (Article $record) => $record->status !== 'published'),

            Actions\Action::make('reject')
                ->label('Tolak Artikel')
                ->color('danger')
                ->icon('heroicon-m-x-circle')
                ->requiresConfirmation()
                ->action(function (Article $record) {
                    $record->update(['status' => 'rejected']);
                })
                ->visible(fn (Article $record) => $record->status !== 'rejected'),

            Actions\EditAction::make(),
        ];
    }
}

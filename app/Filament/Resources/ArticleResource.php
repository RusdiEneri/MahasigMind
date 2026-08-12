<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArticleResource\Pages;
use App\Models\Article;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ArticleResource extends Resource
{
    protected static ?string $model = Article::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationLabel = 'Kelola & Verifikasi Artikel';

    protected static ?string $modelLabel = 'Artikel';

    protected static ?string $pluralModelLabel = 'Artikel Edukasi';

    protected static ?int $navigationSort = 4;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                    ->label('Judul Artikel')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->label('Slug URL')
                    ->required()
                    ->readOnly(),

                Forms\Components\Select::make('author_id')
                    ->label('Penulis (Psikolog / Admin)')
                    ->relationship('author', 'name')
                    ->required(),

                Forms\Components\TextInput::make('category')
                    ->label('Kategori')
                    ->required(),

                Forms\Components\Select::make('status')
                    ->label('Status Moderasi')
                    ->options([
                        'draft' => 'Draf',
                        'pending' => 'Menunggu Moderasi',
                        'published' => 'Disetujui / Terbit',
                        'rejected' => 'Ditolak',
                    ])
                    ->required(),

                Forms\Components\Textarea::make('content')
                    ->label('Isi Konten Artikel')
                    ->rows(8)
                    ->required()
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Judul Artikel')
                    ->searchable()
                    ->sortable()
                    ->limit(40),

                Tables\Columns\TextColumn::make('author.name')
                    ->label('Penulis')
                    ->searchable(),

                Tables\Columns\TextColumn::make('category')
                    ->label('Kategori'),

                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'published' => 'success',
                        'pending' => 'warning',
                        'rejected' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'published' => 'Terbit',
                        'pending' => 'Menunggu',
                        'rejected' => 'Ditolak',
                        default => 'Draf',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending' => 'Menunggu Moderasi',
                        'published' => 'Disetujui / Terbit',
                        'rejected' => 'Ditolak',
                        'draft' => 'Draf',
                    ]),
            ])
            ->actions([
                Tables\Actions\Action::make('accept')
                    ->label('Terima')
                    ->icon('heroicon-m-check-circle')
                    ->color('success')
                    ->requiresConfirmation()
                    ->modalHeading('Setujui Artikel')
                    ->modalDescription('Apakah Anda yakin ingin menyetujui artikel ini untuk diterbitkan bagi mahasiswa?')
                    ->action(function (Article $record) {
                        $record->update(['status' => 'published']);
                    })
                    ->visible(fn (Article $record) => $record->status !== 'published'),

                Tables\Actions\Action::make('reject')
                    ->label('Tolak')
                    ->icon('heroicon-m-x-circle')
                    ->color('danger')
                    ->requiresConfirmation()
                    ->modalHeading('Tolak Artikel')
                    ->modalDescription('Apakah Anda yakin ingin menolak publikasi artikel ini?')
                    ->action(function (Article $record) {
                        $record->update(['status' => 'rejected']);
                    })
                    ->visible(fn (Article $record) => $record->status !== 'rejected'),

                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArticles::route('/'),
            'create' => Pages\CreateArticle::route('/create'),
            'view' => Pages\ViewArticle::route('/{record}'),
            'edit' => Pages\EditArticle::route('/{record}/edit'),
        ];
    }
}

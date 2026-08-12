<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PsychologistResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class PsychologistResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';

    protected static ?string $navigationLabel = 'Kelola Psikolog';

    protected static ?string $modelLabel = 'Psikolog';

    protected static ?string $pluralModelLabel = 'Kelola Psikolog';

    protected static ?int $navigationSort = 3;

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->where(function ($q) {
                $q->where('role', 'psikolog')->orWhere('role', 'psychologist');
            });
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nama Psikolog')
                    ->required(),

                Forms\Components\TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama Psikolog')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),

                Tables\Columns\TextColumn::make('role')
                    ->label('Status Peran')
                    ->badge()
                    ->color('success'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Terdaftar')
                    ->dateTime('d M Y'),
            ])
            ->actions([
                Tables\Actions\Action::make('verify')
                    ->label('Verifikasi Akun')
                    ->color('success')
                    ->icon('heroicon-m-check-badge')
                    ->requiresConfirmation()
                    ->modalHeading('Verifikasi Akun Psikolog')
                    ->modalDescription('Apakah Anda yakin ingin mengonfirmasi verifikasi akun psikolog ini?')
                    ->action(function (User $record) {
                        $record->update(['role' => 'psikolog']);
                    }),

                Tables\Actions\EditAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPsychologists::route('/'),
        ];
    }
}

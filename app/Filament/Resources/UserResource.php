<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationLabel = 'Kelola User';

    protected static ?string $modelLabel = 'Pengguna';

    protected static ?string $pluralModelLabel = 'Pengguna';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->label('Nama Lengkap')
                    ->required()
                    ->maxLength(255),

                Forms\Components\TextInput::make('email')
                    ->label('Alamat Email')
                    ->email()
                    ->required()
                    ->maxLength(255),

                Forms\Components\Select::make('role')
                    ->label('Peran (Role)')
                    ->options([
                        'mahasiswa' => 'Mahasiswa',
                        'psikolog' => 'Psikolog',
                        'admin' => 'Administrator',
                    ])
                    ->required(),

                Forms\Components\TextInput::make('password')
                    ->label('Kata Sandi')
                    ->password()
                    ->declineWithUnfilledForm()
                    ->required(fn ($livewire) => $livewire instanceof Pages\CreateUser)
                    ->maxLength(255),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),

                Tables\Columns\TextColumn::make('role')
                    ->label('Role')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'admin' => 'danger',
                        'psikolog', 'psychologist' => 'success',
                        default => 'info',
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Tanggal Terdaftar')
                    ->dateTime('d M Y, H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('role')
                    ->options([
                        'mahasiswa' => 'Mahasiswa',
                        'psikolog' => 'Psikolog',
                        'admin' => 'Administrator',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}

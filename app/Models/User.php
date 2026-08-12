<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id', // 👈 Tambahkan ini
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google_id', // 👈 Tambahkan ini biar gak ikut ke-JSON
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function moods() {
        return $this->hasMany(Mood::class);
    }

    public function journals() {
        return $this->hasMany(Journal::class);
    }

    public function consultations() {
        return $this->hasMany(Consultation::class);
    }

    public function handledConsultations() {
        return $this->hasMany(Consultation::class, 'psychologist_id');
    }

    public function isMahasiswa(): bool
    {
        return $this->role === 'mahasiswa' || $this->role === 'student';
    }

    public function isPsikolog(): bool
    {
        return $this->role === 'psikolog' || $this->role === 'psychologist';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function getDashboardUrl(): string
    {
        if ($this->isAdmin()) {
            return '/admin';
        }

        if ($this->isPsikolog()) {
            return route('psikolog.dashboard');
        }

        return route('mahasiswa.dashboard');
    }
}

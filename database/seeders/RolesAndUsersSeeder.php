<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RolesAndUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Admin Account
        User::updateOrCreate(
            ['email' => 'admin@mahasigmind.id'],
            [
                'name' => 'Admin MahasigMind',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // 2. Psikolog Accounts (dengan nama & spesialisasi contoh Figma)
        User::updateOrCreate(
            ['email' => 'sarah.wijaya@mahasigmind.id'],
            [
                'name' => 'Dr. Sarah Wijaya, M.Psi',
                'password' => Hash::make('password'),
                'role' => 'psikolog',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'budi.santoso@mahasigmind.id'],
            [
                'name' => 'Budi Santoso, M.Psi',
                'password' => Hash::make('password'),
                'role' => 'psikolog',
                'email_verified_at' => now(),
            ]
        );

        // 3. Mahasiswa Accounts
        User::updateOrCreate(
            ['email' => 'mahasiswa@mahasigmind.id'],
            [
                'name' => 'Andi Pratama',
                'password' => Hash::make('password'),
                'role' => 'mahasiswa',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'siti@mahasigmind.id'],
            [
                'name' => 'Siti Rahma',
                'password' => Hash::make('password'),
                'role' => 'mahasiswa',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'rizky@mahasigmind.id'],
            [
                'name' => 'Rizky Ramadhan',
                'password' => Hash::make('password'),
                'role' => 'mahasiswa',
                'email_verified_at' => now(),
            ]
        );
    }
}

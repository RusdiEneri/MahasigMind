<?php

namespace Database\Seeders;

use App\Models\PsychologistAvailability;
use App\Models\User;
use Illuminate\Database\Seeder;

class PsychologistAvailabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $psychologists = User::where('role', 'psikolog')->orWhere('role', 'psychologist')->get();

        $slots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        $today = now()->format('Y-m-d');

        foreach ($psychologists as $psikolog) {
            foreach ($slots as $slot) {
                PsychologistAvailability::updateOrCreate(
                    [
                        'user_id' => $psikolog->id,
                        'date' => $today,
                        'time' => $slot,
                    ],
                    [
                        'is_available' => true,
                    ]
                );
            }
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAvailabilityRequest;
use App\Models\PsychologistAvailability;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScheduleController extends Controller
{
    /**
     * Display schedule & availability slots for psychologist.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $date = $request->query('date', now()->format('Y-m-d'));

        $availabilities = PsychologistAvailability::where('user_id', $user->id)
            ->where('date', $date)
            ->get();

        return Inertia::render('Psikolog/Schedule', [
            'date' => $date,
            'availabilities' => $availabilities,
        ]);
    }

    /**
     * Store or update availability slot.
     */
    public function update(StoreAvailabilityRequest $request)
    {
        $validated = $request->validated();

        $availability = PsychologistAvailability::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'date' => $validated['date'],
                'time' => $validated['time'],
            ],
            [
                'is_available' => $validated['is_available'],
            ]
        );

        return back()->with('success', 'Jadwal ketersediaan berhasil diperbarui.');
    }
}

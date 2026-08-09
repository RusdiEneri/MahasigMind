<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Mood;
use Inertia\Inertia;
use Carbon\Carbon;

class MoodController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'mood_emoji' => 'required|string',
        ]);

        // Cek apakah user sudah isi mood hari ini
        $today = Carbon::today()->toDateString();
        $exists = Mood::where('user_id', auth()->id())
                      ->whereDate('date', $today)
                      ->exists();

        if ($exists) {
            return back()->with('error', 'Kamu sudah mencatat mood hari ini!');
        }

        Mood::create([
            'user_id' => auth()->id(),
            'mood_emoji' => $request->mood_emoji,
            'date' => $today,
        ]);

        return back()->with('success', 'Mood hari ini berhasil dicatat!');
    }
}

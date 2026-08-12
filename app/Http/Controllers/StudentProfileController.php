<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentProfileController extends Controller
{
    /**
     * Display student profile, journals, and risk assessment notes for psychologist.
     */
    public function show(Request $request, int $id)
    {
        $student = User::with(['journals' => function ($q) {
            $q->orderBy('created_at', 'desc');
        }, 'moods' => function ($q) {
            $q->orderBy('date', 'desc')->take(7);
        }])->findOrFail($id);

        if (! $student->isMahasiswa()) {
            abort(404, 'Data mahasiswa tidak ditemukan.');
        }

        // Calculate risk warning note based on recent mood entries (e.g. low mood scores or negative keywords)
        $hasRiskWarning = false;
        $warningReason = '';

        $recentLowMoods = $student->moods->filter(function ($mood) {
            return isset($mood->score) && $mood->score <= 2;
        });

        if ($recentLowMoods->count() >= 3) {
            $hasRiskWarning = true;
            $warningReason = 'Mahasiswa mencatat mood rendah selama 3+ hari berturut-turut.';
        }

        return Inertia::render('Psikolog/StudentProfile', [
            'student' => $student,
            'journals' => $student->journals,
            'recentMoods' => $student->moods,
            'hasRiskWarning' => $hasRiskWarning,
            'warningReason' => $warningReason,
        ]);
    }
}

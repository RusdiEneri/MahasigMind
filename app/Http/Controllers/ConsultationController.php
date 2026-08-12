<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsultationRequest;
use App\Models\Consultation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    /**
     * Display consultation requests for psychologist.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isPsikolog()) {
            $consultations = Consultation::with('user')
                ->where('psychologist_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            return Inertia::render('Psikolog/Consultations', [
                'consultations' => $consultations,
            ]);
        }

        $consultations = Consultation::with('psychologist')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Mahasiswa/Chat/Index', [
            'consultations' => $consultations,
        ]);
    }

    /**
     * Store new consultation request from student.
     */
    public function store(StoreConsultationRequest $request)
    {
        $validated = $request->validated();

        $consultation = Consultation::create([
            'user_id' => $request->user()->id,
            'psychologist_id' => $validated['psychologist_id'],
            'category' => $validated['category'],
            'preferred_time' => $validated['preferred_time'],
            'description' => $validated['description'],
            'status' => 'pending',
        ]);

        return back()->with('success', 'Permintaan konsultasi berhasil diajukan.');
    }

    /**
     * Accept consultation request (Psikolog).
     */
    public function accept(Request $request, int $id)
    {
        $consultation = Consultation::findOrFail($id);

        if ($consultation->psychologist_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki hak untuk menerima permintaan konsultasi ini.');
        }

        $consultation->update(['status' => 'processed']);

        return back()->with('success', 'Konsultasi disetujui.');
    }

    /**
     * Reject consultation request (Psikolog).
     */
    public function reject(Request $request, int $id)
    {
        $consultation = Consultation::findOrFail($id);

        if ($consultation->psychologist_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki hak untuk menolak permintaan konsultasi ini.');
        }

        $consultation->update(['status' => 'cancelled']);

        return back()->with('success', 'Konsultasi ditolak.');
    }
}

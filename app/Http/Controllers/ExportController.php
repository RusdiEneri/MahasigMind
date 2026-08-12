<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;

class ExportController extends Controller
{
    /**
     * Render export page or download CSV.
     */
    public function index(Request $request)
    {
        $psychologistId = $request->user()->id;
        $search = $request->query('search');

        $query = Consultation::with('user')
            ->where('psychologist_id', $psychologistId);

        if ($search) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $consultations = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('Psikolog/Export', [
            'consultations' => $consultations,
            'search' => $search,
        ]);
    }

    /**
     * Download CSV report of consultations.
     */
    public function downloadCsv(Request $request)
    {
        $psychologistId = $request->user()->id;

        $consultations = Consultation::with('user')
            ->where('psychologist_id', $psychologistId)
            ->orderBy('created_at', 'desc')
            ->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="laporan-konsultasi-' . now()->format('Y-m-d') . '.csv"',
        ];

        $callback = function () use ($consultations) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['ID Consultation', 'Nama Mahasiswa', 'Email Mahasiswa', 'Kategori', 'Tanggal & Waktu', 'Status']);

            foreach ($consultations as $item) {
                fputcsv($file, [
                    $item->id,
                    $item->user?->name ?? '-',
                    $item->user?->email ?? '-',
                    $item->category,
                    $item->preferred_time ? $item->preferred_time->format('Y-m-d H:i') : '-',
                    $item->status,
                ]);
            }

            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}

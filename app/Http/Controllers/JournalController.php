<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JournalController extends Controller
{
    public function index()
    {
        $journals = auth()->user()->journals()
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return Inertia::render('Journals/Index', [
            'journals' => $journals,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:120',
            'category' => 'required|string|max:50',
            'content'  => 'required|string',
        ]);

        auth()->user()->journals()->create($validated);

        return back()->with('success', 'Jurnal berhasil disimpan! 📔');
    }

    public function update(Request $request, Journal $journal)
    {
        // Proteksi: hanya pemilik yang boleh edit
        abort_unless($journal->user_id === auth()->id(), 403);

        $validated = $request->validate([
            'title'    => 'required|string|max:120',
            'category' => 'required|string|max:50',
            'content'  => 'required|string',
        ]);

        $journal->update($validated);

        return back()->with('success', 'Jurnal berhasil diperbarui! ✏️');
    }

    public function destroy(Journal $journal)
    {
        // Proteksi: hanya pemilik yang boleh hapus
        abort_unless($journal->user_id === auth()->id(), 403);

        $journal->delete();

        return back()->with('success', 'Jurnal berhasil dihapus.');
    }
}
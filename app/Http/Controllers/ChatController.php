<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChatMessageRequest;
use App\Models\ChatMessage;
use App\Models\Consultation;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatController extends Controller
{
    /**
     * Display chat list for authenticated user.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->isPsikolog()) {
            $consultations = Consultation::with(['user', 'messages'])
                ->where('psychologist_id', $user->id)
                ->orderBy('updated_at', 'desc')
                ->get();
            $availablePsychologists = [];
        } else {
            $consultations = Consultation::with(['psychologist', 'messages'])
                ->where('user_id', $user->id)
                ->orderBy('updated_at', 'desc')
                ->get();

            // List available psychologists for picker sheet
            $availablePsychologists = User::where('role', 'psikolog')
                ->orWhere('role', 'psychologist')
                ->get();
        }

        $page = $user->isPsikolog() ? 'Psikolog/Chat/Index' : 'Mahasiswa/Chat/Index';

        return Inertia::render($page, [
            'consultations' => $consultations,
            'psychologists' => $availablePsychologists,
        ]);
    }

    /**
     * Display specific chat session with messages.
     */
    public function show(Request $request, int $id)
    {
        $user = $request->user();

        $consultation = Consultation::with(['user', 'psychologist', 'messages.sender'])
            ->findOrFail($id);

        // Authorization check: user must be student or assigned psychologist
        if ($consultation->user_id !== $user->id && $consultation->psychologist_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses ke sesi chat ini.');
        }

        $page = $user->isPsikolog() ? 'Psikolog/Chat/Show' : 'Mahasiswa/Chat/Show';

        return Inertia::render($page, [
            'consultation' => $consultation,
            'messages' => $consultation->messages,
        ]);
    }

    /**
     * Store new chat message.
     */
    public function store(StoreChatMessageRequest $request, int $id)
    {
        $user = $request->user();

        $consultation = Consultation::findOrFail($id);

        // Authorization check
        if ($consultation->user_id !== $user->id && $consultation->psychologist_id !== $user->id) {
            abort(403, 'Anda tidak memiliki akses ke sesi chat ini.');
        }

        $message = ChatMessage::create([
            'consultation_id' => $consultation->id,
            'sender_id' => $user->id,
            'body' => $request->validated('body'),
        ]);

        $consultation->touch(); // update timestamp for ordering

        return back();
    }
}

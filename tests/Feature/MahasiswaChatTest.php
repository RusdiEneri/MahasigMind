<?php

namespace Tests\Feature;

use App\Models\ChatMessage;
use App\Models\Consultation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MahasiswaChatTest extends TestCase
{
    use RefreshDatabase;

    public function test_mahasiswa_can_send_chat_message_to_consultation(): void
    {
        $mahasiswa = User::factory()->create([
            'role' => 'mahasiswa',
        ]);

        $psikolog = User::factory()->create([
            'role' => 'psikolog',
        ]);

        $consultation = Consultation::create([
            'user_id' => $mahasiswa->id,
            'psychologist_id' => $psikolog->id,
            'category' => 'Akademik',
            'preferred_time' => now(),
            'description' => 'Sesi konseling akademik',
            'status' => 'processed',
        ]);

        $response = $this->actingAs($mahasiswa)
            ->post(route('mahasiswa.chat.message', $consultation->id), [
                'body' => 'Halo Dokter, selamat siang.',
            ]);

        $response->assertStatus(302);
        $this->assertDatabaseHas('chat_messages', [
            'consultation_id' => $consultation->id,
            'sender_id' => $mahasiswa->id,
            'body' => 'Halo Dokter, selamat siang.',
        ]);
    }
}

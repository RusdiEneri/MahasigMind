<?php

namespace Tests\Feature;

use App\Models\Consultation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PsikologConsultationTest extends TestCase
{
    use RefreshDatabase;

    public function test_psikolog_can_accept_and_reject_consultation_request(): void
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
            'category' => 'Relasi',
            'preferred_time' => now(),
            'description' => 'Konsultasi masalah relasi',
            'status' => 'pending',
        ]);

        // Accept consultation
        $responseAccept = $this->actingAs($psikolog)
            ->post(route('psikolog.consultations.accept', $consultation->id));

        $responseAccept->assertStatus(302);
        $this->assertDatabaseHas('consultations', [
            'id' => $consultation->id,
            'status' => 'processed',
        ]);

        // Reject consultation
        $responseReject = $this->actingAs($psikolog)
            ->post(route('psikolog.consultations.reject', $consultation->id));

        $responseReject->assertStatus(302);
        $this->assertDatabaseHas('consultations', [
            'id' => $consultation->id,
            'status' => 'cancelled',
        ]);
    }
}

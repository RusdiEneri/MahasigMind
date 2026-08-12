<?php

namespace Tests\Feature;

use App\Models\Journal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class JournalAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_cannot_access_or_delete_other_users_journal(): void
    {
        $userA = User::factory()->create(['role' => 'mahasiswa']);
        $userB = User::factory()->create(['role' => 'mahasiswa']);

        $journalA = Journal::create([
            'user_id' => $userA->id,
            'title' => 'Jurnal Rahasia User A',
            'category' => 'Refleksi Harian',
            'content' => 'Isi catatan pribadi user A.',
        ]);

        // User B tries to view User A's journal
        $responseShow = $this->actingAs($userB)->get(route('mahasiswa.journal.show', $journalA->id));
        $responseShow->assertStatus(403);

        // User B tries to delete User A's journal
        $responseDelete = $this->actingAs($userB)->delete(route('journals.destroy', $journalA->id));
        $responseDelete->assertStatus(403);
    }
}

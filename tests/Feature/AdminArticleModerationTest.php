<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminArticleModerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_accepted_pending_article_becomes_published_and_visible_to_students(): void
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $psychologist = User::factory()->create(['role' => 'psikolog']);

        $pendingArticle = Article::create([
            'title' => 'Artikel Uji Moderasi',
            'slug' => 'artikel-uji-moderasi',
            'author_id' => $psychologist->id,
            'category' => 'Edukasi',
            'content' => 'Isi artikel edukasi...',
            'status' => 'pending',
        ]);

        $this->assertCount(0, Article::published()->get());

        // Moderation accept
        $pendingArticle->update(['status' => 'published']);

        $this->assertCount(1, Article::published()->get());
        $this->assertEquals('published', $pendingArticle->fresh()->status);
    }

    public function test_rejected_article_is_hidden_from_students(): void
    {
        $psychologist = User::factory()->create(['role' => 'psikolog']);

        $article = Article::create([
            'title' => 'Artikel Ditolak',
            'slug' => 'artikel-ditolak',
            'author_id' => $psychologist->id,
            'category' => 'Edukasi',
            'content' => 'Isi artikel...',
            'status' => 'pending',
        ]);

        $article->update(['status' => 'rejected']);

        $this->assertCount(0, Article::published()->get());
        $this->assertEquals('rejected', $article->fresh()->status);
    }
}

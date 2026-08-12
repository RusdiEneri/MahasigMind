<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreArticleRequest;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display published articles for students or psychologist's own articles.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user && $user->isPsikolog()) {
            $articles = Article::with('author')
                ->where('author_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get();

            return Inertia::render('Psikolog/Articles', [
                'articles' => $articles,
            ]);
        }

        // For student/guest: only published articles
        $articles = Article::with('author')
            ->published()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Mahasiswa/Dashboard', [
            'articles' => $articles,
        ]);
    }

    /**
     * Display specific article.
     */
    public function show(int $id)
    {
        $article = Article::with('author')->findOrFail($id);

        return response()->json([
            'article' => $article,
        ]);
    }

    /**
     * Store new article (Psikolog/Admin).
     */
    public function store(StoreArticleRequest $request)
    {
        $validated = $request->validated();

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(5),
            'author_id' => $request->user()->id,
            'category' => $validated['category'],
            'content' => $validated['content'],
            'status' => $validated['status'] ?? 'pending',
            'scheduled_at' => $validated['scheduled_at'] ?? null,
        ]);

        return back()->with('success', 'Artikel berhasil dibuat.');
    }

    /**
     * Update article (Psikolog/Admin).
     */
    public function update(StoreArticleRequest $request, int $id)
    {
        $article = Article::findOrFail($id);

        if ($article->author_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki hak untuk merubah artikel ini.');
        }

        $validated = $request->validated();
        $article->update([
            'title' => $validated['title'],
            'category' => $validated['category'],
            'content' => $validated['content'],
            'status' => $validated['status'] ?? $article->status,
            'scheduled_at' => $validated['scheduled_at'] ?? $article->scheduled_at,
        ]);

        return back()->with('success', 'Artikel berhasil diperbarui.');
    }

    /**
     * Delete article.
     */
    public function destroy(Request $request, int $id)
    {
        $article = Article::findOrFail($id);

        if ($article->author_id !== $request->user()->id && ! $request->user()->isAdmin()) {
            abort(403, 'Anda tidak memiliki hak untuk menghapus artikel ini.');
        }

        $article->delete();

        return back()->with('success', 'Artikel berhasil dihapus.');
    }
}

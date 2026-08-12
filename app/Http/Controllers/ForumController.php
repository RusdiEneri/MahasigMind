<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreForumPostRequest;
use App\Http\Requests\StoreForumReplyRequest;
use App\Models\ForumCategory;
use App\Models\ForumPost;
use App\Models\ForumReply;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForumController extends Controller
{
    /**
     * Display forum posts list.
     */
    public function index(Request $request)
    {
        $categoryId = $request->query('category_id');

        $query = ForumPost::with(['user', 'category', 'replies.user'])
            ->withCount('replies')
            ->orderBy('created_at', 'desc');

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        $posts = $query->get();
        $categories = ForumCategory::all();

        return Inertia::render('Mahasiswa/Forum/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'selectedCategoryId' => $categoryId,
        ]);
    }

    /**
     * Show create post form.
     */
    public function create()
    {
        $categories = ForumCategory::all();

        return Inertia::render('Mahasiswa/Forum/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store new forum post.
     */
    public function store(StoreForumPostRequest $request)
    {
        $post = ForumPost::create([
            'user_id' => $request->user()->id,
            'category_id' => $request->validated('category_id'),
            'title' => $request->validated('title'),
            'content' => $request->validated('content'),
            'image' => $request->validated('image'),
        ]);

        return redirect()->route('mahasiswa.forum.index')->with('success', 'Postingan forum berhasil dibuat.');
    }

    /**
     * Store reply on forum post.
     */
    public function reply(StoreForumReplyRequest $request, int $postId)
    {
        $post = ForumPost::findOrFail($postId);

        ForumReply::create([
            'forum_post_id' => $post->id,
            'user_id' => $request->user()->id,
            'content' => $request->validated('content'),
        ]);

        return back()->with('success', 'Balasan berhasil ditambahkan.');
    }
}

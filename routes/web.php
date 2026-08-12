<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\MoodController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SocialiteController;
use App\Http\Controllers\StudentProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ─── Splash: guest → login, auth → role dashboard ───────────────────
Route::get('/', function () {
    if (Auth::check()) {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        return redirect($user->getDashboardUrl());
    }
    return redirect()->route('login');
});

// ─── Google OAuth ────────────────────────────────────────────────────
Route::get('/auth/google/redirect', [SocialiteController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [SocialiteController::class, 'callback'])->name('google.callback');

// ─── Legacy /dashboard: redirect to role dashboard ───────────────────
Route::get('/dashboard', function () {
    /** @var \App\Models\User $user */
    $user = Auth::user();
    return redirect($user->getDashboardUrl());
})->middleware(['auth', 'verified'])->name('dashboard');

// ─── Shared auth routes (profile, moods, journals) ──────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/moods', [MoodController::class, 'store'])->name('moods.store');
    Route::get('/journals', [JournalController::class, 'index'])->name('journals.index');
    Route::post('/journals', [JournalController::class, 'store'])->name('journals.store');
    Route::put('/journals/{journal}', [JournalController::class, 'update'])->name('journals.update');
    Route::delete('/journals/{journal}', [JournalController::class, 'destroy'])->name('journals.destroy');
});

// ═════════════════════════════════════════════════════════════════════
// MAHASISWA ROUTES
// ═════════════════════════════════════════════════════════════════════
Route::prefix('mahasiswa')
    ->name('mahasiswa.')
    ->middleware(['auth', 'role:mahasiswa'])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('Mahasiswa/Dashboard');
        })->name('dashboard');

        // Chat
        Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
        Route::get('/chat/{id}', [ChatController::class, 'show'])->name('chat.show');
        Route::post('/chat/{id}/message', [ChatController::class, 'store'])->name('chat.message');

        // Ajukan Konsultasi
        Route::post('/consultation', [ConsultationController::class, 'store'])->name('consultation.store');

        // Forum
        Route::get('/forum', [ForumController::class, 'index'])->name('forum.index');
        Route::get('/forum/create', [ForumController::class, 'create'])->name('forum.create');
        Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
        Route::post('/forum/{id}/reply', [ForumController::class, 'reply'])->name('forum.reply');

        // Journal (alias under mahasiswa group)
        Route::get('/journal', [JournalController::class, 'index'])->name('journal.index');
        Route::get('/journal/create', function () {
            return Inertia::render('Mahasiswa/Journal/Create');
        })->name('journal.create');
        Route::get('/journal/{journal}', [JournalController::class, 'show'])->name('journal.show');

        // Articles & Notifications
        Route::get('/articles', [ArticleController::class, 'index'])->name('articles.index');
        Route::get('/articles/{id}', [ArticleController::class, 'show'])->name('articles.show');
        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
        Route::post('/notifications/read-all', [NotificationController::class, 'markAllRead'])->name('notifications.readAll');
    });

// ═════════════════════════════════════════════════════════════════════
// PSIKOLOG ROUTES
// ═════════════════════════════════════════════════════════════════════
Route::prefix('psikolog')
    ->name('psikolog.')
    ->middleware(['auth', 'role:psikolog'])
    ->group(function () {

        Route::get('/dashboard', function () {
            return Inertia::render('Psikolog/Dashboard');
        })->name('dashboard');

        // Chat
        Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
        Route::get('/chat/{id}', [ChatController::class, 'show'])->name('chat.show');
        Route::post('/chat/{id}/message', [ChatController::class, 'store'])->name('chat.message');

        // Schedule
        Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule');
        Route::post('/schedule', [ScheduleController::class, 'update'])->name('schedule.update');

        // Consultations
        Route::get('/consultations', [ConsultationController::class, 'index'])->name('consultations');
        Route::post('/consultations/{id}/accept', [ConsultationController::class, 'accept'])->name('consultations.accept');
        Route::post('/consultations/{id}/reject', [ConsultationController::class, 'reject'])->name('consultations.reject');

        // Student Profile
        Route::get('/students/{id}', [StudentProfileController::class, 'show'])->name('students.show');

        // Export
        Route::get('/export', [ExportController::class, 'index'])->name('export');
        Route::get('/export/download', [ExportController::class, 'downloadCsv'])->name('export.download');

        // Articles
        Route::get('/articles', [ArticleController::class, 'index'])->name('articles');
        Route::post('/articles', [ArticleController::class, 'store'])->name('articles.store');
        Route::put('/articles/{id}', [ArticleController::class, 'update'])->name('articles.update');
        Route::delete('/articles/{id}', [ArticleController::class, 'destroy'])->name('articles.destroy');
    });

// ─── Breeze auth routes ──────────────────────────────────────────────
require __DIR__.'/auth.php';

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Get unread notifications for authenticated user.
     */
    public function index(Request $request)
    {
        $notifications = $request->user()->notifications;

        return response()->json([
            'notifications' => $notifications,
            'unreadCount' => $request->user()->unreadNotifications->count(),
        ]);
    }

    /**
     * Mark all notifications as read.
     */
    public function markAllRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return back()->with('success', 'Semua notifikasi ditandai sudah dibaca.');
    }
}

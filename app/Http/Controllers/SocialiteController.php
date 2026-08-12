<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            // Cari user berdasarkan email, kalau belum ada buat baru
            $user = User::where('email', $googleUser->email)->first();

            if (!$user) {
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => bcrypt('password_default_google'), // Dummy password
                    'role' => 'student', // Default role
                ]);
            } else {
                // Kalau user sudah ada (misal pernah daftar manual), update google_id-nya
                $user->update(['google_id' => $googleUser->id]);
            }

            Auth::login($user);

            // Redirect ke dashboard/home sesuai role
            return redirect($user->getDashboardUrl()); 

        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Gagal login dengan Google.');
        }
    }
}
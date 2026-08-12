<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (! $request->user()) {
            return redirect()->route('login');
        }

        $userRole = $request->user()->role;

        $allowedRoles = [];
        foreach ($roles as $role) {
            $allowedRoles[] = $role;
            if ($role === 'mahasiswa') {
                $allowedRoles[] = 'student';
            } elseif ($role === 'student') {
                $allowedRoles[] = 'mahasiswa';
            } elseif ($role === 'psikolog') {
                $allowedRoles[] = 'psychologist';
            } elseif ($role === 'psychologist') {
                $allowedRoles[] = 'psikolog';
            }
        }

        if (! in_array($userRole, $allowedRoles, true)) {
            abort(403, 'Akses tidak diizinkan untuk peran ini.');
        }

        return $next($request);
    }
}

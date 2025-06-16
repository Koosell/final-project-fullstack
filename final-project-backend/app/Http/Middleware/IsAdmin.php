<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Periksa apakah user sudah terotentikasi (login)
        // 2. Periksa apakah kolom 'role' pada user yang login bernilai 'admin'
        if (Auth::check() && Auth::user()->role === 'admin') {
            // Jika kedua kondisi terpenuhi, lanjutkan request ke controller
            return $next($request);
        }

        // Jika salah satu kondisi tidak terpenuhi, tolak akses.
        return response()->json([
            'message' => 'Akses Ditolak: Anda tidak memiliki hak sebagai admin.'
        ], 403); // 403 Forbidden
    }
}

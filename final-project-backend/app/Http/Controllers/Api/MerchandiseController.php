<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Merchandise; // <-- Pastikan model Merchandise di-import
use Illuminate\Http\Request;

class MerchandiseController extends Controller
{
    /**
     * Menampilkan daftar semua resource merchandise.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Ambil semua data dari tabel 'merchandise' dan kembalikan sebagai JSON
        return response()->json(Merchandise::all());
    }
}

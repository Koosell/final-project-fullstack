<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    /**
     * Menyimpan testimoni baru dari pengguna yang sedang login.
     */
    public function store(Request $request)
    {
        // Validasi data yang dikirim dari frontend
        $validator = Validator::make($request->all(), [
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = Auth::user();

        // Buat atau perbarui testimoni user (satu user hanya bisa memberi satu testimoni)
        $testimonial = Testimonial::updateOrCreate(
            ['user_id' => $user->id], // Cari berdasarkan user_id
            [
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]
        );

        return response()->json([
            'message' => 'Terima kasih atas penilaian Anda!',
            'testimonial' => $testimonial,
        ], 201);
    }

    /**
     * Mengambil beberapa testimoni yang ditandai sebagai 'featured' untuk ditampilkan di halaman utama.
     */
    public function getFeatured()
    {
        // Ambil 3 testimoni unggulan secara acak, beserta data penggunanya
        $featuredTestimonials = Testimonial::where('is_featured', true)
            ->with('user:id,name') // Hanya ambil ID dan nama dari user
            ->inRandomOrder()
            ->limit(3)
            ->get();
            
        return response()->json($featuredTestimonials);
    }
}

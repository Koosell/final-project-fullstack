<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial; // Pastikan model Testimonial Anda sudah ada
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Menampilkan daftar semua testimoni.
     * GET /api/admin/testimonials
     */
    public function index()
    {
        // Ambil testimoni, urutkan dari yang terbaru, dan sertakan data user
        $testimonials = Testimonial::with('user')->latest()->paginate(15);
        return response()->json($testimonials);
    }

    /**
     * Menyetujui sebuah testimoni.
     * PUT /api/admin/testimonials/{id}/approve
     */
    public function approve(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan.'], 404);
        }

        // Ubah status is_featured (atau kolom sejenis) menjadi true
        $testimonial->is_featured = true;
        $testimonial->save();

        return response()->json(['message' => 'Testimoni berhasil disetujui.']);
    }

    /**
     * Menghapus testimoni.
     * DELETE /api/admin/testimonials/{id}
     */
    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if (!$testimonial) {
            return response()->json(['message' => 'Testimoni tidak ditemukan.'], 404);
        }

        $testimonial->delete();

        return response()->json(['message' => 'Testimoni berhasil dihapus.']);
    }
}

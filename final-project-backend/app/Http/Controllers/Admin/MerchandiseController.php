<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Merchandise; // Pastikan model Merchandise Anda sudah ada
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MerchandiseController extends Controller
{
    /**
     * Menampilkan daftar semua merchandise.
     * GET /api/admin/merchandise
     */
    public function index()
    {
        // Ambil semua merchandise, urutkan dari yang terbaru
        $merchandise = Merchandise::latest()->paginate(10);
        return response()->json($merchandise);
    }

    /**
     * Menyimpan merchandise baru ke database.
     * POST /api/admin/merchandise
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $merchData = $request->except('image');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/merchandise');
            $merchData['image'] = Storage::url($path);
        }

        $merchandise = Merchandise::create($merchData);

        return response()->json([
            'message' => 'Merchandise berhasil ditambahkan.',
            'merchandise' => $merchandise
        ], 201);
    }

    /**
     * Menampilkan detail satu merchandise.
     * GET /api/admin/merchandise/{id}
     */
    public function show($id)
    {
        $merchandise = Merchandise::find($id);

        if (!$merchandise) {
            return response()->json(['message' => 'Merchandise tidak ditemukan.'], 404);
        }

        return response()->json($merchandise);
    }

    /**
     * Memperbarui data merchandise.
     * POST /api/admin/merchandise/{id} (Gunakan POST untuk menangani file upload)
     */
    public function update(Request $request, $id)
    {
        $merchandise = Merchandise::find($id);

        if (!$merchandise) {
            return response()->json(['message' => 'Merchandise tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $merchData = $request->except('image');
        
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($merchandise->image) {
                $oldImagePath = str_replace('/storage', 'public', $merchandise->image);
                Storage::delete($oldImagePath);
            }

            // Simpan gambar baru
            $path = $request->file('image')->store('public/merchandise');
            $merchData['image'] = Storage::url($path);
        }

        $merchandise->update($merchData);

        return response()->json([
            'message' => 'Merchandise berhasil diperbarui.',
            'merchandise' => $merchandise
        ]);
    }

    /**
     * Menghapus merchandise dari database.
     * DELETE /api/admin/merchandise/{id}
     */
    public function destroy($id)
    {
        $merchandise = Merchandise::find($id);

        if (!$merchandise) {
            return response()->json(['message' => 'Merchandise tidak ditemukan.'], 404);
        }
        
        // Hapus gambar dari storage jika ada
        if ($merchandise->image) {
            $imagePath = str_replace('/storage', 'public', $merchandise->image);
            Storage::delete($imagePath);
        }

        $merchandise->delete();

        return response()->json(['message' => 'Merchandise berhasil dihapus.']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Merchandise; // Pastikan model Merchandise di-import
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
// Anda perlu membuat Resource ini, kodenya ada di bawah
use App\Http\Resources\MerchandiseResource; 

class MerchandiseController extends Controller
{
    /**
     * Menampilkan daftar semua resource merchandise dengan paginasi.
     */
    public function index()
    {
        // Mengambil data dengan paginasi dan mengurutkan dari yang terbaru
        $merchandise = Merchandise::latest()->paginate(10);
        // Menggunakan API Resource untuk format output yang konsisten
        return MerchandiseResource::collection($merchandise);
    }

    /**
     * Menyimpan resource baru ke dalam database (FUNGSI TAMBAH PRODUK).
     */
    public function store(Request $request)
    {
        // Validasi input sesuai dengan field di model Anda
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'price'     => 'required|integer|min:0',
            'stock'     => 'required|integer|min:0',
            'category'  => 'required|string|max:100',
            'image'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'size'      => 'nullable|string',
            'material'  => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            // Simpan gambar ke storage/app/public/merchandise
            $imagePath = $request->file('image')->store('merchandise', 'public');
        }

        // Membuat record baru di database
        $merchandise = Merchandise::create([
            'name'        => $request->name,
            'description' => $request->description,
            'price'       => $request->price,
            'stock'       => $request->stock,
            'category'    => $request->category,
            'size'        => $request->size,
            'material'    => $request->material,
            'image'       => $imagePath, // Kolom 'image' diisi dengan path gambar
        ]);

        // Mengembalikan data yang baru dibuat dengan format dari Resource
        return new MerchandiseResource($merchandise);
    }

    /**
     * Menampilkan satu resource spesifik.
     */
    public function show(Merchandise $merchandise)
    {
        return new MerchandiseResource($merchandise);
    }

    /**
     * Memperbarui resource yang ada di database (FUNGSI EDIT PRODUK).
     */
    public function update(Request $request, Merchandise $merchandise)
    {
        // Validasi sama seperti di store
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'price'     => 'required|integer|min:0',
            'stock'     => 'required|integer|min:0',
            'category'  => 'required|string|max:100',
            'image'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'size'      => 'nullable|string',
            'material'  => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $imagePath = $merchandise->image;
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($merchandise->image) {
                Storage::disk('public')->delete($merchandise->image);
            }
            // Simpan gambar baru
            $imagePath = $request->file('image')->store('merchandise', 'public');
        }

        $merchandise->update([
            'name'        => $request->name,
            'description' => $request->description,
            'price'       => $request->price,
            'stock'       => $request->stock,
            'category'    => $request->category,
            'size'        => $request->size,
            'material'    => $request->material,
            'image'       => $imagePath,
        ]);
        
        return new MerchandiseResource($merchandise);
    }

    /**
     * Menghapus resource dari database (FUNGSI HAPUS PRODUK).
     */
    public function destroy(Merchandise $merchandise)
    {
        // Hapus file gambar dari storage sebelum menghapus record dari database
        if ($merchandise->image) {
            Storage::disk('public')->delete($merchandise->image);
        }

        $merchandise->delete();

        // Mengembalikan respons "No Content" yang menandakan sukses
        return response()->json(null, 204);
    }
}

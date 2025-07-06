<?php

// Pastikan namespace-nya benar sesuai dengan struktur folder Anda
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Merchandise;
use App\Http\Resources\MerchandiseResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

// PERBAIKAN: Nama class disesuaikan menjadi 'MerchandiseController'
class MerchandiseController extends Controller
{
    /**
     * Menampilkan daftar merchandise untuk admin.
     */
    public function index()
    {
        $merchandise = Merchandise::latest()->paginate(10);
        return MerchandiseResource::collection($merchandise);
    }

    /**
     * Menyimpan merchandise baru (FUNGSI TAMBAH).
     * Ini adalah fungsi yang paling penting untuk diperbaiki.
     */
    public function store(Request $request)
    {
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
            $imagePath = $request->file('image')->store('merchandise', 'public');
        }

        $merchandise = Merchandise::create([
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
     * Menampilkan satu merchandise spesifik.
     */
    public function show($id)
    {
        $merchandise = Merchandise::find($id);
        if (!$merchandise) {
            return response()->json(['message' => 'Merchandise tidak ditemukan.'], 404);
        }
        return new MerchandiseResource($merchandise);
    }

    /**
     * Memperbarui merchandise (FUNGSI EDIT).
     */
    public function update(Request $request, $id)
    {
        $merchandise = Merchandise::find($id);
        if (!$merchandise) {
            return response()->json(['message' => 'Merchandise tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'price'     => 'required|integer|min:0',
            'stock'     => 'required|integer|min:0',
            'category'  => 'required|string|max:100',
            // 'image' tidak required saat update
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
            if ($merchandise->image) {
                Storage::disk('public')->delete($merchandise->image);
            }
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
     * Menghapus merchandise (FUNGSI HAPUS).
     */
    public function destroy($id)
    {
        $merchandise = Merchandise::find($id);
        if (!$merchandise) {
            return response()->json(['message' => 'Merchandise tidak ditemukan.'], 404);
        }

        if ($merchandise->image) {
            Storage::disk('public')->delete($merchandise->image);
        }

        $merchandise->delete();

        return response()->json(null, 204);
    }
}

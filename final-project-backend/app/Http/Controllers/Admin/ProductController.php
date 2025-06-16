<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product; // Pastikan model Product Anda sudah ada
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Menampilkan daftar semua produk.
     * GET /api/admin/products
     */
    public function index()
    {
        // Ambil semua produk, urutkan dari yang terbaru, dengan paginasi
        $products = Product::latest()->paginate(10);
        return response()->json($products);
    }

    /**
     * Menyimpan produk baru ke database.
     * POST /api/admin/products
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'game_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Gambar opsional
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $productData = $request->except('image');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/products');
            $productData['image'] = Storage::url($path);
        }

        $product = Product::create($productData);

        return response()->json([
            'message' => 'Produk berhasil ditambahkan.',
            'product' => $product
        ], 201);
    }

    /**
     * Menampilkan detail satu produk.
     * GET /api/admin/products/{id}
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan.'], 404);
        }

        return response()->json($product);
    }

    /**
     * Memperbarui data produk.
     * PUT /api/admin/products/{id}
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'game_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $product->update($request->all());

        return response()->json([
            'message' => 'Produk berhasil diperbarui.',
            'product' => $product
        ]);
    }

    /**
     * Menghapus produk dari database.
     * DELETE /api/admin/products/{id}
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan.'], 404);
        }
        
        // Hapus gambar dari storage jika ada
        if ($product->image) {
            // Ubah URL kembali menjadi path di storage
            $imagePath = str_replace('/storage', 'public', $product->image);
            Storage::delete($imagePath);
        }

        $product->delete();

        return response()->json(['message' => 'Produk berhasil dihapus.']);
    }
}

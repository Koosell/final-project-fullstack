<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Menampilkan daftar item di keranjang user yang sedang login.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Menggunakan relasi polimorfik 'itemable' untuk mengambil detail item
        // (bisa dari tabel 'products' atau 'merchandise')
        $cartItems = CartItem::where('user_id', $user->id)
                             ->with('itemable') // KUNCI PERUBAHAN ADA DI SINI
                             ->get();

        // Menghitung total harga. '$item->itemable' akan berisi objek Product atau Merchandise
        $totalAmount = $cartItems->sum(function($item) {
            // Pastikan itemable tidak null sebelum mengakses properti price
            if ($item->itemable) {
                return $item->quantity * $item->itemable->price;
            }
            return 0;
        });

        return response()->json([
            'cart_items' => $cartItems,
            'total_amount' => $totalAmount
        ]);
    }

    /**
     * Menyimpan item baru (game atau merchandise) di keranjang.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // 1. Validasi input baru yang polimorfik
        $validator = Validator::make($request->all(), [
            'item_id' => 'required|integer',
            'item_type' => 'required|string|in:product,merchandise',
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Validasi gagal', 'errors' => $validator->errors()], 422);
        }

        // 2. Tentukan kelas Model berdasarkan tipe item
        $modelClass = $request->item_type === 'product'
            ? \App\Models\Product::class
            : \App\Models\Merchandise::class;

        // 3. Pastikan itemnya ada di database
        if (! $modelClass::find($request->item_id)) {
            return response()->json(['message' => 'Item tidak ditemukan.'], 404);
        }

        // 4. Cari item di keranjang menggunakan kriteria polimorfik
        $cartItem = CartItem::where('user_id', $user->id)
                            ->where('itemable_id', $request->item_id)
                            ->where('itemable_type', $modelClass)
                            ->first();

        if ($cartItem) {
            // Jika sudah ada, update quantity
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
            $message = 'Kuantitas item di keranjang berhasil diperbarui.';
        } else {
            // Jika belum ada, buat item baru dengan data polimorfik
            CartItem::create([
                'user_id' => $user->id,
                'itemable_id' => $request->item_id,
                'itemable_type' => $modelClass,
                'quantity' => $request->quantity,
            ]);
            $message = 'Item berhasil ditambahkan ke keranjang.';
        }

        return response()->json(['message' => $message], 200);
    }

    /**
     * Update item yang sudah ada di keranjang.
     * FUNGSI INI TIDAK PERLU DIUBAH DARI KODE LAMA ANDA.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $request->validate(['quantity' => 'required|integer|min:0']);

        if ($cartItem->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->quantity == 0) {
            $cartItem->delete();
            return response()->json(['message' => 'Item berhasil dihapus.'], 200);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json(['message' => 'Item di keranjang berhasil diperbarui.'], 200);
    }

    /**
     * Hapus item dari keranjang.
     * FUNGSI INI TIDAK PERLU DIUBAH DARI KODE LAMA ANDA.
     */
    public function destroy(CartItem $cartItem)
    {
        if ($cartItem->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Item berhasil dihapus.'], 200);
    }
}

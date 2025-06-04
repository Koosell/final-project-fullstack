<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItem; // Pastikan Anda memiliki model CartItem
use App\Models\Product;  // Pastikan Anda memiliki model Product
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    /**
     * Display a listing of the user's cart items.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized. User not logged in.'], 401);
        }

        // Memuat relasi product dari cartItems
        $cartItems = CartItem::where('user_id', $user->id)
                             ->with('product') // Load data produk terkait
                             ->get();

        // Hitung subtotal dan total jika diperlukan di frontend
        $totalAmount = $cartItems->sum(function($item) {
            return $item->quantity * $item->product->price;
        });

        return response()->json([
            'cart_items' => $cartItems,
            'total_amount' => $totalAmount
        ]);
    }

    /**
     * Store a newly created cart item in storage.
     * (Or update quantity if product already in cart).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validasi gagal', 'errors' => $e->errors()], 422);
        }

        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized. User not logged in.'], 401);
        }

        $product = Product::find($request->product_id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Cek apakah produk sudah ada di keranjang user
        $cartItem = CartItem::where('user_id', $user->id)
                            ->where('product_id', $request->product_id)
                            ->first();

        if ($cartItem) {
            // Jika sudah ada, update quantity
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
            $message = 'Quantity updated in cart.';
        } else {
            // Jika belum ada, buat item baru
            CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
            $message = 'Product added to cart.';
        }

        return response()->json(['message' => $message], 200);
    }

    /**
     * Update the specified cart item in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CartItem  $cartItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, CartItem $cartItem)
    {
        try {
            $request->validate([
                'quantity' => 'required|integer|min:0', // Izinkan 0 untuk menghapus item
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validasi gagal', 'errors' => $e->errors()], 422);
        }

        // Pastikan user yang login memiliki akses ke cart item ini
        if ($cartItem->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized. You do not own this cart item.'], 403);
        }

        if ($request->quantity == 0) {
            $cartItem->delete();
            return response()->json(['message' => 'Cart item removed.'], 200);
        }

        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        return response()->json(['message' => 'Cart item updated.'], 200);
    }

    /**
     * Remove the specified cart item from storage.
     *
     * @param  \App\Models\CartItem  $cartItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(CartItem $cartItem)
    {
        // Pastikan user yang login memiliki akses ke cart item ini
        if ($cartItem->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized. You do not own this cart item.'], 403);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Cart item deleted.'], 200);
    }
}
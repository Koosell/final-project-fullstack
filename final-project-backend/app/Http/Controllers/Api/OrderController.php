<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Membuat pesanan baru dari item yang ada di keranjang.
     * Ini adalah fungsi yang akan dipanggil oleh halaman CheckoutProduk.
     */
    public function store(Request $request)
    {
        // 1. Validasi data pengiriman dari frontend
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'shipping_address' => 'required|string',
            'phone_number' => 'required|string',
            'payment_method' => 'required|string',
            'payment_details' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)->with('itemable')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Keranjang Anda kosong.'], 400);
        }

        DB::beginTransaction();
        try {
            // 2. Hitung total harga dari semua item di keranjang
            $totalPrice = $cartItems->sum(function ($cartItem) {
                if (!$cartItem->itemable) return 0; // Lewati jika itemable null
                return $cartItem->quantity * $cartItem->itemable->price;
            });

            // 3. Buat catatan pesanan (Order) baru di database
            $order = Order::create([
                'user_id' => $user->id,
                'customer_name' => $request->customer_name,
                'shipping_address' => $request->shipping_address,
                'phone_number' => $request->phone_number,
                'payment_method' => $request->payment_method,
                'payment_details' => $request->payment_details,
                'total_price' => $totalPrice,
                'status' => 'pending', // Status awal pesanan
            ]);

            // 4. Pindahkan setiap item dari keranjang ke dalam OrderItem
            foreach ($cartItems as $cartItem) {
                if ($cartItem->itemable) { // Hanya proses jika itemable ada
                    OrderItem::create([
                        'order_id' => $order->id,
                        'orderable_id' => $cartItem->itemable_id,
                        'orderable_type' => $cartItem->itemable_type,
                        'quantity' => $cartItem->quantity,
                        'price' => $cartItem->itemable->price,
                    ]);
                }
            }

            // 5. Setelah berhasil, kosongkan keranjang pengguna
            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Pesanan berhasil dibuat.',
                'order' => $order
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal membuat pesanan, terjadi kesalahan server.'], 500);
        }
    }

    /**
     * Menampilkan riwayat pesanan milik user yang sedang login.
     */
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
                        ->with('items.orderable')
                        ->latest()
                        ->get();

        return response()->json(['orders' => $orders]);
    }
}

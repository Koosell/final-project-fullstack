<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order; // Pastikan ini ada
use App\Models\OrderItem; // Pastikan ini ada
use App\Models\Product; // Pastikan ini ada
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    /**
     * Create a new order.
     * For direct purchase (not from cart).
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validasi input dari frontend
        try {
            $request->validate([
                'selected_product_label' => 'required|string',
                'game_id' => 'required|string',
                'server_id' => 'required|string',
                'payment_method' => 'required|string|in:Bank Transfer,E-Wallet', // Sesuaikan metode pembayaran
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors()
            ], 422);
        }

        // Dapatkan user yang sedang login
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized. User not logged in.'], 401);
        }

        // Cari produk berdasarkan label/nama dari frontend
        $product = Product::where('name', $request->selected_product_label)->first();

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan.'], 404);
        }

        // Pastikan stok produk cukup (jika ada manajemen stok)
        if ($product->stock < 1) { // Asumsi quantity selalu 1 untuk topup
            return response()->json(['message' => 'Stok produk habis.'], 400);
        }

        DB::beginTransaction(); // Mulai transaksi database

        try {
            // Buat entri pesanan baru di tabel 'orders'
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $product->price, // Untuk pembelian langsung, total_amount = harga produk
                'status' => 'pending', // Atau 'created', 'waiting_payment'
                'payment_method' => $request->payment_method,
                'game_id' => $request->game_id, // Kolom baru
                'server_id' => $request->server_id, // Kolom baru
            ]);

            // Tambahkan item ke tabel 'order_items'
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => 1, // Untuk pembelian langsung, quantity default 1
                'price_at_purchase' => $product->price,
            ]);

            // Kurangi stok produk
            $product->decrement('stock', 1);

            DB::commit(); // Commit transaksi jika semua berhasil

            return response()->json([
                'message' => 'Pesanan berhasil dibuat!',
                'order_id' => $order->id,
                'total_amount' => $order->total_amount,
                'status' => $order->status,
            ], 201); // 201 Created

        } catch (\Exception $e) {
            DB::rollBack(); // Rollback transaksi jika ada error
            \Log::error('Order creation failed: ' . $e->getMessage()); // Log error untuk debugging lebih lanjut
            return response()->json(['message' => 'Gagal membuat pesanan. Terjadi kesalahan server.'], 500);
        }
    }

    /**
     * Display a listing of the user's orders.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        $orders = $user->orders()->with('orderItems.product')->get(); // Load order items dan produk terkait

        return response()->json($orders);
    }

    /**
     * Display the specified order.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Order $order)
    {
        // Pastikan user yang login memiliki akses ke order ini
        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized. You do not own this order.'], 403);
        }

        return response()->json($order->load('orderItems.product'));
    }

    // Metode lain seperti update dan destroy jika diperlukan
}
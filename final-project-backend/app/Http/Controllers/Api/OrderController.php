<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
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
                // UBAH BARIS INI: Tambahkan semua metode pembayaran yang dikirim dari frontend
                'payment_method' => 'required|string|in:DANA,OVO,GoPay,Transfer Bank',
                'account_number' => 'nullable|string', // Nomor akun e-wallet/bank
                'bank_name' => 'nullable|string',     // Nama bank
                'promo_code' => 'nullable|string',
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

        // Hitung total_amount
        $totalAmount = $product->price * 1; // Quantity diasumsikan 1 untuk topup langsung

        // Siapkan detail pembayaran (ini sudah ada di kode Anda, bagus)
        $paymentDetails = json_encode([
            'method' => $request->payment_method,
            'account_number' => $request->account_number,
            'bank_name' => $request->bank_name,
        ]);

        DB::beginTransaction(); // Mulai transaksi database

        try {
            // Buat entri pesanan baru di tabel 'orders'
            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount, // Menggunakan totalAmount yang sudah dihitung
                'status' => 'pending', // Atau 'created', 'waiting_payment'
                'payment_method' => $request->payment_method,
                'game_id' => $request->game_id,
                'server_id' => $request->server_id,
                'payment_details' => $paymentDetails, // Tambahkan ini jika belum ada di migration
                'promo_code' => $request->promo_code, // Tambahkan ini jika belum ada di migration
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

        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json(['message' => 'Validasi gagal', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Order creation failed: ' . $e->getMessage());
            return response()->json(['message' => 'Gagal membuat pesanan. Terjadi kesalahan server.'], 500);
        }
    }

    // ... (metode index dan show lainnya tetap sama)
    public function index()
    {
        $user = Auth::user();
        $orders = $user->orders()->with('orderItems.product')->get();
        return response()->json($orders);
    }

    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized. You do not own this order.'], 403);
        }
        return response()->json($order->load('orderItems.product'));
    }
}
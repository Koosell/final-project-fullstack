<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product; // Pastikan Anda import Model Product
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
        // Validasi input dari frontend (untuk frontend yang HARDCODE)
        try {
            $request->validate([
                'selected_product_label' => 'required|string', // Frontend mengirim ini sebagai 'selectedProduct' (label produk)
                'game_id' => 'required|string',                // User ID / Riot ID
                'server_id' => 'nullable|string',              // Server ID / Tagline / Region (nullable jika tidak selalu ada)
                
                // Frontend mengirim 'paymentMethod' dengan nilai uppercase (DANA, OVO, GoPay, Transfer Bank)
                'payment_method' => 'required|string|in:DANA,OVO,GoPay,Transfer Bank', 
                
                'account_number' => 'nullable|string', // Nomor akun e-wallet/bank
                'bank_name' => 'nullable|string',      // Nama bank
                'promo_code' => 'nullable|string',
                'quantity' => 'nullable|integer|min:1', // Quantity (default 1 jika tidak dikirim)
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
        
        // Cari produk berdasarkan label/nama produk (string) yang dikirim dari frontend
        $product = Product::where('name', $request->selected_product_label)->first(); 

        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan di database backend.'], 404);
        }

        // Pastikan stok produk cukup
        $quantity = $request->input('quantity', 1); 

        if ($product->stock < $quantity) { 
            return response()->json(['message' => 'Stok produk habis.'], 400);
        }

        // Hitung total_amount
        $totalAmount = $product->price * $quantity; 

        // Siapkan detail pembayaran
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
                'total_amount' => $totalAmount,
                'status' => 'pending', 
                'payment_method' => $request->payment_method, 
                'game_id' => $request->game_id,   
                'server_id' => $request->server_id, 
                'payment_details' => $paymentDetails,
                'promo_code' => $request->promo_code,
            ]);

            // Tambahkan item ke tabel 'order_items'
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id, 
                'quantity' => $quantity, 
                'price_at_purchase' => $product->price,
            ]);

            // Kurangi stok produk
            $product->decrement('stock', $quantity);

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

    /**
     * Display a listing of the orders.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized. User not logged in.'], 401);
        }
        $orders = $user->orders()->with('orderItems.product')->get();
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
        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized. You do not own this order.'], 403);
        }
        return response()->json($order->load('orderItems.product'));
    }
}
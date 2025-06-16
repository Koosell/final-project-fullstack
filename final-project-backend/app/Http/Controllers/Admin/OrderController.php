<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order; // Pastikan model Order Anda sudah ada
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Menampilkan daftar semua pesanan (order).
     * GET /api/admin/orders
     */
    public function index()
    {
        // Ambil pesanan, urutkan dari yang terbaru, dan sertakan data user
        // 'with('user')' akan mengambil relasi 'user' dari model Order
        $orders = Order::with('user')->latest()->paginate(15);
        
        return response()->json($orders);
    }

    /**
     * Menampilkan detail satu pesanan beserta item-itemnya.
     * GET /api/admin/orders/{id}
     */
    public function show($id)
    {
        // Ambil satu pesanan beserta relasi user dan orderItems
        $order = Order::with(['user', 'orderItems.product', 'orderItems.merchandise'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Pesanan tidak ditemukan.'], 404);
        }

        return response()->json($order);
    }

    /**
     * Memperbarui status pesanan.
     * PUT /api/admin/orders/{id}/status
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,completed,cancelled,failed',
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Pesanan tidak ditemukan.'], 404);
        }

        $order->status = $request->status;
        $order->save();

        return response()->json([
            'message' => 'Status pesanan berhasil diperbarui.',
            'order' => $order,
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Membuat pesanan dari item di keranjang (untuk checkout merchandise).
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_name' => 'required|string|max:255',
            'shipping_address' => 'required|string',
            'phone_number' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        if ($validator->fails()) { return response()->json($validator->errors(), 422); }

        $user = Auth::user();
        $cartItems = CartItem::where('user_id', $user->id)->with('itemable')->get();

        if ($cartItems->isEmpty()) { return response()->json(['message' => 'Keranjang Anda kosong.'], 400); }

        DB::beginTransaction();
        try {
            $totalPrice = $cartItems->sum(function ($item) {
                return $item->itemable ? $item->quantity * $item->itemable->price : 0;
            });

            $order = Order::create([
                'user_id' => $user->id,
                'customer_name' => $request->customer_name,
                'shipping_address' => $request->shipping_address,
                'phone_number' => $request->phone_number,
                'payment_method' => $request->payment_method,
                'payment_details' => $request->payment_details,
                'total_price' => $totalPrice,
                'status' => 'pending',
            ]);

            foreach ($cartItems as $cartItem) {
                if ($cartItem->itemable) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'orderable_id' => $cartItem->itemable_id,
                        'orderable_type' => $cartItem->itemable_type,
                        'quantity' => $cartItem->quantity,
                        'price' => $cartItem->itemable->price,
                    ]);
                }
            }
            CartItem::where('user_id', $user->id)->delete();
            DB::commit();
            return response()->json(['message' => 'Pesanan berhasil dibuat.', 'order' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal membuat pesanan: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Membuat pesanan untuk pembelian langsung produk game.
     */
    public function directPurchase(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer|exists:products,id',
            'game_id' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        if ($validator->fails()) { return response()->json($validator->errors(), 422); }

        $user = Auth::user();
        $product = Product::find($request->product_id);

        if ($product->stock < 1) {
            return response()->json(['message' => 'Stok produk habis.'], 400);
        }

        DB::beginTransaction();
        try {
            $order = Order::create([
                'user_id' => $user->id,
                'customer_name' => $user->name,
                'shipping_address' => 'Digital Product - Game ID: ' . $request->game_id,
                // KUNCI PERBAIKAN: Mengganti $user->phone menjadi string 'N/A'
                'phone_number' => 'N/A', 
                'payment_method' => $request->payment_method,
                'payment_details' => $request->account_number ?: $request->bank_name,
                'total_price' => $product->price,
                'status' => 'completed',
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'orderable_id' => $product->id,
                'orderable_type' => Product::class,
                'quantity' => 1,
                'price' => $product->price,
            ]);

            $product->decrement('stock', 1);

            DB::commit();
            return response()->json(['message' => 'Pesanan berhasil dibuat.'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Gagal membuat pesanan: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Menampilkan riwayat pesanan.
     */
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)->with('items.orderable')->latest()->get();
        return response()->json(['orders' => $orders]);
    }
}

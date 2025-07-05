<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Notification;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('services.midtrans.serverKey');
        Config::$isProduction = config('services.midtrans.isProduction');
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }

    // Method untuk checkout merchandise (keranjang)
    public function createTransaction(Request $request)
    {
        $request->validate([
            'total_price' => 'required|numeric|min:1',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.name' => 'required|string',
        ]);

        $orderId = 'ORDER-' . uniqid();
        $itemDetails = [];
        
        foreach ($request->items as $item) {
            $itemDetails[] = [
                'id' => $item['id'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'name' => $item['name'],
            ];
        }
        
        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $request->total_price,
            ],
            'item_details' => $itemDetails,
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Method untuk top-up game
    public function createTopupTransaction(Request $request)
    {
        // Menggunakan snake_case agar konsisten
        $request->validate([
            'product_name' => 'required|string',
            'price' => 'required|numeric|min:1',
            'quantity' => 'required|integer|min:1',
        ]);

        $orderId = 'TOPUP-' . uniqid();

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $request->price * $request->quantity,
            ],
            'item_details' => [[
                'id' => 'PROD-' . uniqid(),
                'price' => $request->price,
                'quantity' => $request->quantity,
                'name' => $request->product_name, // Menggunakan snake_case
            ]],
        ];
        
        try {
            $snapToken = Snap::getSnapToken($params);
            return response()->json(['snap_token' => $snapToken]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function webhookHandler(Request $request)
    {
        $notification = new Notification();
        $transactionStatus = $notification->transaction_status;
        $orderId = $notification->order_id;
        $fraudStatus = $notification->fraud_status;

        if ($transactionStatus == 'capture' || $transactionStatus == 'settlement') {
            if ($fraudStatus == 'accept') {
                // TODO: Update status pesanan di DB menjadi 'paid'
            }
        } // ... sisa logika webhook

        return response()->json(['message' => 'Webhook received']);
    }
}
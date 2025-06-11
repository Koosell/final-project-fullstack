<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\MerchandiseController;
use App\Http\Controllers\Api\ProfileController; // <-- 1. TAMBAHKAN INI

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- Public Routes (Tidak perlu autentikasi) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes untuk produk (mendapatkan daftar semua produk atau produk spesifik)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Routes untuk mendapatkan produk berdasarkan game (dinamis)
Route::get('/valorant-products', [ProductController::class, 'getValorantProducts']);
Route::get('/ml-products', [ProductController::class, 'getMlProducts']);
Route::get('/ff-products', [ProductController::class, 'getFfProducts']);
Route::get('/pubg-products', [ProductController::class, 'getPubgProducts']);
Route::get('/cod-products', [ProductController::class, 'getCodProducts']);
Route::get('/genshin-products', [ProductController::class, 'getGenshinProducts']);

// Route untuk Merchandise
Route::get('/merchandise', [MerchandiseController::class, 'index']);

// --- DEBUG ROUTES (untuk troubleshooting) ---
Route::get('/test-auth', function (Request $request) {
    return response()->json([
        'message' => 'Public route working',
        'headers' => $request->headers->all(),
        'bearer_token' => $request->bearerToken()
    ]);
});

// --- Protected Routes (Perlu autentikasi dengan Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Debug route untuk cek auth dalam protected group
    Route::get('/test-protected', function (Request $request) {
        return response()->json([
            'message' => 'Protected route working',
            'user' => $request->user(),
            'auth_id' => auth()->id(),
            'token_name' => $request->user()->currentAccessToken()->name ?? 'No token name'
        ]);
    });

    // Cart API
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'store']);
    Route::put('/cart/{cartItem}', [CartController::class, 'update']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);

    // Order API
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/direct', [OrderController::class, 'directPurchase']); // <-- Tambahan rute baru

    // Profile API
    Route::put('/user/profile', [ProfileController::class, 'update']); // <-- 2. TAMBAHKAN INI
});

// Route fallback untuk API yang tidak ditemukan
Route::fallback(function(){
    return response()->json([
        'message' => 'Route API tidak ditemukan.'
    ], 404);
});
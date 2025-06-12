<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\MerchandiseController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\TestimonialController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- Rute Publik (Tidak perlu login) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute untuk produk & merchandise (dari kode baru)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/popular', [ProductController::class, 'getPopularProducts']);
Route::get('/merchandise', [MerchandiseController::class, 'index']);
Route::get('/merchandise/latest', [MerchandiseController::class, 'getLatestMerchandise']);

// Rute untuk menampilkan testimoni unggulan (dari kode baru)
Route::get('/testimonials/featured', [TestimonialController::class, 'getFeatured']);

// Rute spesifik game Anda yang sudah ada (dipertahankan)
Route::get('/valorant-products', [ProductController::class, 'getValorantProducts']);
Route::get('/ml-products', [ProductController::class, 'getMlProducts']);
Route::get('/ff-products', [ProductController::class, 'getFfProducts']);
Route::get('/pubg-products', [ProductController::class, 'getPubgProducts']);
Route::get('/cod-products', [ProductController::class, 'getCodProducts']);
Route::get('/genshin-products', [ProductController::class, 'getGenshinProducts']);


// --- Rute yang Dilindungi (Perlu login dengan Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rute Profil
    Route::put('/user/profile', [ProfileController::class, 'update']);

    // Rute Keranjang Belanja
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'store']);
    Route::put('/cart/{cartItem}', [CartController::class, 'update']);
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy']);

    // Rute Pesanan
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']); // Checkout dari keranjang
    Route::post('/orders/direct', [OrderController::class, 'directPurchase']); // Pembelian langsung

    // Rute Testimoni (mengirim)
    Route::post('/testimonials', [TestimonialController::class, 'store']);
});

// Route fallback untuk API yang tidak ditemukan
Route::fallback(function(){
    return response()->json([
        'message' => 'Route API tidak ditemukan.'
    ], 404);
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController; 
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController; 
use App\Http\Controllers\Api\OrderController; 

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- Public Routes (Tidak perlu autentikasi) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes untuk produk (mendapatkan daftar semua produk atau produk spesifik)
// Note: Frontend Anda saat ini hardcode, jadi route ini mungkin tidak langsung dipakai oleh Checkout pages.
Route::get('/products', [ProductController::class, 'index']); 
Route::get('/products/{id}', [ProductController::class, 'show']); 

// Routes untuk mendapatkan produk berdasarkan game (dinamis) - ini akan berfungsi jika data ada di DB.
// Note: Frontend Anda saat ini hardcode, jadi route ini mungkin tidak langsung dipakai oleh Checkout pages.
Route::get('/valorant-products', [ProductController::class, 'getValorantProducts']); 
Route::get('/ml-products', [ProductController::class, 'getMlProducts']); 
Route::get('/ff-products', [ProductController::class, 'getFfProducts']); 
Route::get('/pubg-products', [ProductController::class, 'getPubgProducts']); 
Route::get('/cod-products', [ProductController::class, 'getCodProducts']); 
Route::get('/genshin-products', [ProductController::class, 'getGenshinProducts']);


// --- Protected Routes (Perlu autentikasi dengan Sanctum) ---
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Cart API (jika ada CartController)
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'store']); 
    Route::put('/cart/{item}', [CartController::class, 'update']); 
    Route::delete('/cart/{item}', [CartController::class, 'destroy']); 

    // Order API (OrderController yang baru saja diperbarui)
    Route::post('/orders', [OrderController::class, 'store']); 
    Route::get('/orders', [OrderController::class, 'index']); 
    Route::get('/orders/{id}', [OrderController::class, 'show']); 
});

// Route fallback untuk API yang tidak ditemukan
Route::fallback(function(){
    return response()->json([
        'message' => 'Route API tidak ditemukan.'
    ], 404);
});
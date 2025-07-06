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
use App\Http\Controllers\Api\PaymentController;
// --- AWAL PERUBAHAN ---
// Import Middleware IsAdmin secara langsung
use App\Http\Middleware\IsAdmin;
// Import Controller yang akan digunakan untuk Admin Panel
// Pastikan Anda membuat controller ini nanti jika belum ada
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\MerchandiseController as AdminMerchandiseController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
// --- AKHIR PERUBAHAN ---

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- Rute Publik (Tidak perlu login) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/payment/create', [PaymentController::class, 'createTransaction']);
Route::post('/payment/webhook', [PaymentController::class, 'webhookHandler']);
Route::post('/payment/create-topup', [PaymentController::class, 'createTopupTransaction']);


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


// --- AWAL PERUBAHAN ---
/*
|--------------------------------------------------------------------------
| Admin API Routes
|--------------------------------------------------------------------------
|
| Rute-rute ini khusus untuk Admin Panel.
| Dilindungi oleh Sanctum dan middleware 'IsAdmin'
|
*/
// Menggunakan kelas middleware secara langsung, bukan alias 'is.admin'
Route::middleware(['auth:sanctum', IsAdmin::class])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard/stats', [AdminDashboardController::class, 'getStats']);

    // Manajemen Produk (Top Up)
    Route::get('/products', [AdminProductController::class, 'index']);
    Route::post('/products', [AdminProductController::class, 'store']);
    Route::get('/products/{id}', [AdminProductController::class, 'show']);
    Route::put('/products/{id}', [AdminProductController::class, 'update']);
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);

    // Manajemen Merchandise
    Route::get('/merchandise', [AdminMerchandiseController::class, 'index']);
    Route::post('/merchandise', [AdminMerchandiseController::class, 'store']);
    Route::get('/merchandise/{id}', [AdminMerchandiseController::class, 'show']);
    // PERBAIKAN: Mengganti Route::post menjadi Route::put agar sesuai dengan method yang benar untuk update.
    Route::put('/merchandise/{id}', [AdminMerchandiseController::class, 'update']);
    Route::delete('/merchandise/{id}', [AdminMerchandiseController::class, 'destroy']);

    // Pantau Penjualan (Orders)
    Route::get('/orders', [AdminOrderController::class, 'index']);
    Route::get('/orders/{id}', [AdminOrderController::class, 'show']);
    Route::put('/orders/{id}/status', [AdminOrderController::class, 'updateStatus']);

    // Manajemen Testimoni
    Route::get('/testimonials', [AdminTestimonialController::class, 'index']);
    Route::put('/testimonials/{id}/approve', [AdminTestimonialController::class, 'approve']);
    Route::delete('/testimonials/{id}', [AdminTestimonialController::class, 'destroy']);
});
// --- AKHIR PERUBAHAN ---


// Route fallback untuk API yang tidak ditemukan
Route::fallback(function(){
    return response()->json([
        'message' => 'Route API tidak ditemukan.'
    ], 404);
});

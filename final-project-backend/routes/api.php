    <?php

    use Illuminate\Http\Request;
    use App\Http\Controllers\Api\AuthController; // Ini penting!
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\Api\ProductController;
    use App\Http\Controllers\Api\CartController;
    use App\Http\Controllers\Api\OrderController;

    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
    */

    // --- Public Routes (Tidak perlu autentikasi) ---
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/products', [ProductController::class, 'index']); // Mendapatkan semua produk
    Route::get('/products/{id}', [ProductController::class, 'show']); // Mendapatkan detail produk

    // --- Protected Routes (Perlu autentikasi dengan Sanctum) ---
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        // Cart API
        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart/add', [CartController::class, 'store']); // Menggunakan store untuk menambah
        Route::put('/cart/{item}', [CartController::class, 'update']); // Menggunakan update untuk mengubah quantity
        Route::delete('/cart/{item}', [CartController::class, 'destroy']); // Menggunakan destroy untuk menghapus

        // Order API
        Route::post('/orders', [OrderController::class, 'store']); // Membuat pesanan baru
        Route::get('/orders', [OrderController::class, 'index']); // Mendapatkan semua pesanan user yang login
        Route::get('/orders/{id}', [OrderController::class, 'show']); // Detail pesanan
    });

    // Route fallback untuk API yang tidak ditemukan
    Route::fallback(function(){
        return response()->json([
            'message' => 'Route API tidak ditemukan.'
        ], 404);
    });
    
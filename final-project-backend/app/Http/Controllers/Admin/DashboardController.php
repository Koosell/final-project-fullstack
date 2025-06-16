<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DashboardController extends Controller
{
    /**
     * Mengambil data statistik untuk dashboard admin dengan cara yang lebih aman.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getStats(Request $request)
    {
        // Inisialisasi semua statistik dengan nilai 0
        $stats = [
            'total_products' => 0,
            'total_merchandise' => 0,
            'total_orders' => 0,
            'monthly_revenue' => 0,
        ];

        try {
            // Coba hitung total produk jika tabel 'products' ada
            if (Schema::hasTable('products')) {
                $stats['total_products'] = DB::table('products')->count();
            }

            // Coba hitung total merchandise jika tabel 'merchandises' ada
            if (Schema::hasTable('merchandises')) { // Perhatikan nama tabel mungkin berbeda
                $stats['total_merchandise'] = DB::table('merchandises')->count();
            }

            // Coba hitung total order dan pendapatan jika tabel 'orders' ada
            if (Schema::hasTable('orders')) {
                $stats['total_orders'] = DB::table('orders')->count();

                // Pastikan juga kolom yang dibutuhkan ada sebelum query
                if (Schema::hasColumns('orders', ['created_at', 'status', 'total_price'])) {
                    $stats['monthly_revenue'] = DB::table('orders')
                        ->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year)
                        ->where('status', 'completed') // Ubah 'completed' jika status Anda berbeda
                        ->sum('total_price');
                }
            }

            // Kembalikan data statistik yang berhasil didapatkan
            return response()->json($stats);

        } catch (\Exception $e) {
            // Jika terjadi error yang tidak terduga, kembalikan statistik default (semua 0)
            // dan log errornya untuk debugging di masa depan.
            report($e); // Ini akan mencatat error ke file log Laravel
            return response()->json($stats);
        }
    }
}

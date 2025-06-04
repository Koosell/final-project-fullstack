// database/migrations/xxxx_xx_xx_xxxxxx_create_orders_table.php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('total_amount', 10, 2);
            $table->string('status')->default('pending'); // pending, paid, processing, shipped, completed, cancelled

            // --- KOLOM BARU UNTUK KONTEKS GAME TOP-UP ---
            $table->string('game_id');      // User ID dari game
            $table->string('server_id');    // Server ID dari game
            $table->text('payment_details')->nullable(); // Detail metode pembayaran dan nomor akun (misal: JSON string)
            $table->string('promo_code')->nullable(); // Kode promo jika ada

            // $table->string('payment_method')->nullable(); // Ini bisa diambil dari payment_details jika itu JSON
            // Jika mau tetap ada payment_method terpisah:
            $table->string('payment_method'); // e.g., 'dana', 'ovo', 'gopay', 'bank'

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
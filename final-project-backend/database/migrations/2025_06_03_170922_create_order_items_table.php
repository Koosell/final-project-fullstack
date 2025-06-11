<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            
            // KUNCI PERBAIKAN: Mengganti 'product_id' dengan 'orderable'
            // Ini akan membuat kolom 'orderable_id' dan 'orderable_type'
            // yang bisa menampung Product atau Merchandise.
            $table->morphs('orderable'); 
            
            $table->integer('quantity');
            $table->decimal('price', 15, 2); // Menggunakan nama 'price' agar konsisten
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};

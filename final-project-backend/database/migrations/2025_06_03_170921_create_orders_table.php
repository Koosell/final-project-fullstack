<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Kolom untuk data pengiriman merchandise
            $table->string('customer_name');
            $table->text('shipping_address');
            $table->string('phone_number');

            // Kolom untuk info pembayaran dan status
            $table->decimal('total_price', 15, 2);
            $table->string('status')->default('pending'); // pending, processing, shipping, completed, cancelled
            $table->string('payment_method');
            $table->string('payment_details')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};

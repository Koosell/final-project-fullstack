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
        Schema::create('pesanan', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('address');
        $table->string('phone');
        $table->string('payment_method');
        $table->string('account_number')->nullable();
        $table->string('bank_name')->nullable();
        $table->json('items');
        $table->integer('total');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesanan');
    }
};

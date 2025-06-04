<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pesanan', function (Blueprint $table) {
            if (!Schema::hasColumn('pesanan', 'item_name')) {
                $table->string('item_name')->nullable();
            }
            if (!Schema::hasColumn('pesanan', 'quantity')) {
                $table->integer('quantity')->nullable();
            }
            if (!Schema::hasColumn('pesanan', 'total_price')) {
                $table->decimal('total_price', 10, 2)->nullable();
            }
            if (!Schema::hasColumn('pesanan', 'payment_status')) {
                $table->string('payment_status')->default('pending');
            }
            if (!Schema::hasColumn('pesanan', 'transaction_id')) {
                $table->string('transaction_id')->nullable();
            }
            if (!Schema::hasColumn('pesanan', 'updated_at')) {
                $table->timestamp('updated_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('pesanan', function (Blueprint $table) {
            if (Schema::hasColumn('pesanan', 'item_name')) $table->dropColumn('item_name');
            if (Schema::hasColumn('pesanan', 'quantity')) $table->dropColumn('quantity');
            if (Schema::hasColumn('pesanan', 'total_price')) $table->dropColumn('total_price');
            if (Schema::hasColumn('pesanan', 'payment_status')) $table->dropColumn('payment_status');
            if (Schema::hasColumn('pesanan', 'transaction_id')) $table->dropColumn('transaction_id');
            if (Schema::hasColumn('pesanan', 'updated_at')) $table->dropColumn('updated_at');
        });
    }
};

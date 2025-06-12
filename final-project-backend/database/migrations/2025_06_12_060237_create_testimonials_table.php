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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Terhubung ke user yang memberi rating
            $table->unsignedTinyInteger('rating'); // Menyimpan angka rating (1-5)
            $table->text('comment')->nullable(); // Komentar atau testimoni dari user (boleh kosong)
            $table->boolean('is_featured')->default(false); // Penanda untuk testimoni yang ingin ditampilkan di halaman utama
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
        Schema::dropIfExists('testimonials');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Tambahkan nama class "CreateMerchandisesTable" di sini
class CreateMerchandisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('merchandise', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('image');
            $table->unsignedInteger('price');
            $table->string('category')->comment('e.g., T-Shirt, Hoodie, Mug');
            $table->string('size')->nullable()->comment('e.g., S, M, L, XL');
            $table->string('material')->nullable()->comment('e.g., Premium Cotton');
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
        Schema::dropIfExists('merchandise');
    }
}
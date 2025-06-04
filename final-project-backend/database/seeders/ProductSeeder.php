<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product; // Pastikan Anda import Model Product

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tambahkan data produk sesuai dengan productOptions di frontend Anda
        Product::create([
            'name' => '86 Diamonds',
            'description' => '86 Diamond Mobile Legends',
            'price' => 23500.00,
            'stock' => 9999,
            'image_url' => 'diamond.jpeg'
        ]);

        Product::create([
            'name' => '172 Diamonds',
            'description' => '172 Diamond Mobile Legends',
            'price' => 47500.00,
            'stock' => 9999,
            'image_url' => 'diamond.jpeg'
        ]);

        Product::create([
            'name' => '257 Diamonds',
            'description' => '257 Diamond Mobile Legends',
            'price' => 70000.00,
            'stock' => 9999,
            'image_url' => 'diamond.jpeg'
        ]);

        Product::create([
            'name' => '344 Diamonds',
            'description' => '344 Diamond Mobile Legends',
            'price' => 93500.00,
            'stock' => 9999,
            'image_url' => 'diamond.jpeg'
        ]);

        Product::create([
            'name' => '429 Diamonds',
            'description' => '429 Diamond Mobile Legends',
            'price' => 116500.00,
            'stock' => 9999,
            'image_url' => 'diamond.jpeg'
        ]);

        Product::create([
            'name' => '600 Diamonds',
            'description' => '600 Diamond Mobile Legends',
            'price' => 150000.00,
            'stock' => 9999,
            'image_url' => 'diamond.jpeg'
        ]);

        // Pastikan nama produk ('name' => '...') di sini SAMA PERSIS dengan 'label' di productOptions di CheckoutML.jsx Anda
    }
}
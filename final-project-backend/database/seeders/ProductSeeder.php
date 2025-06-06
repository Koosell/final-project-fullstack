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
        // --- Data Produk Mobile Legends ---
        Product::create(['name' => '86 Diamonds ML', 'description' => '86 Diamond Mobile Legends', 'price' => 23500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '172 Diamonds ML', 'description' => '172 Diamond Mobile Legends', 'price' => 47500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '257 Diamonds ML', 'description' => '257 Diamond Mobile Legends', 'price' => 70000.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '344 Diamonds ML', 'description' => '344 Diamond Mobile Legends', 'price' => 93500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '429 Diamonds ML', 'description' => '429 Diamond Mobile Legends', 'price' => 116500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '600 Diamonds ML', 'description' => '600 Diamond Mobile Legends', 'price' => 150000.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);

        // --- Data Produk FREE FIRE ---
        Product::create(['name' => '100 Diamond FF', 'description' => '100 Diamond Free Fire', 'price' => 16000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '210 Diamond FF', 'description' => '210 Diamond Free Fire', 'price' => 32000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '530 Diamond FF', 'description' => '530 Diamond Free Fire', 'price' => 79000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => 'Double Daily Diamond FF', 'description' => 'Double Daily Diamond Free Fire', 'price' => 30000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '1060 Diamond FF', 'description' => '1060 Diamond Free Fire', 'price' => 149000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '2180 Diamond FF', 'description' => '2180 Diamond Free Fire', 'price' => 299000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);

        // --- Data Produk PUBG Mobile ---
        Product::create(['name' => '60 UC PUBG', 'description' => '60 Unknown Cash PUBG Mobile', 'price' => 15000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '325 UC PUBG', 'description' => '325 Unknown Cash PUBG Mobile', 'price' => 75000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '660 UC PUBG', 'description' => '660 Unknown Cash PUBG Mobile', 'price' => 145000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '1800 UC PUBG', 'description' => '1800 Unknown Cash PUBG Mobile', 'price' => 375000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '3850 UC PUBG', 'description' => '3850 Unknown Cash PUBG Mobile', 'price' => 750000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '8100 UC PUBG', 'description' => '8100 Unknown Cash PUBG Mobile', 'price' => 1500000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);


        // --- Data Produk COD Mobile ---
    }
}
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product; 

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- Data Produk Mobile Legends (DIKOMENTARI KARENA FRONTEND MENGGUNAKAN HARDCODE) ---
        Product::create(['name' => '86 Diamonds ML', 'description' => '86 Diamond Mobile Legends', 'price' => 23500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '172 Diamonds ML', 'description' => '172 Diamond Mobile Legends', 'price' => 47500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '257 Diamonds ML', 'description' => '257 Diamond Mobile Legends', 'price' => 70000.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '344 Diamonds ML', 'description' => '344 Diamond Mobile Legends', 'price' => 93500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '429 Diamonds ML', 'description' => '429 Diamond Mobile Legends', 'price' => 116500.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);
        Product::create(['name' => '600 Diamonds ML', 'description' => '600 Diamond Mobile Legends', 'price' => 150000.00, 'stock' => 9999, 'image_url' => 'diamond.jpeg']);

        // --- Data Produk FREE FIRE (DIKOMENTARI KARENA FRONTEND MENGGUNAKAN HARDCODE) ---
        Product::create(['name' => '100 Diamond FF', 'description' => '100 Diamond Free Fire', 'price' => 16000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '210 Diamond FF', 'description' => '210 Diamond Free Fire', 'price' => 32000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '530 Diamond FF', 'description' => '530 Diamond Free Fire', 'price' => 79000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => 'Double Daily Diamond FF', 'description' => 'Double Daily Diamond Free Fire', 'price' => 30000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '1060 Diamond FF', 'description' => '1060 Diamond Free Fire', 'price' => 149000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);
        Product::create(['name' => '2180 Diamond FF', 'description' => '2180 Diamond Free Fire', 'price' => 299000.00, 'stock' => 9999, 'image_url' => 'diamondff.jpg']);

        // --- Data Produk PUBG Mobile (DIKOMENTARI KARENA FRONTEND MENGGUNAKAN HARDCODE) ---
        Product::create(['name' => '60 UC PUBG Mobile', 'description' => '60 Unknown Cash PUBG Mobile', 'price' => 15000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '325 UC PUBG Mobile', 'description' => '325 Unknown Cash PUBG Mobile', 'price' => 75000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '660 UC PUBG Mobile', 'description' => '660 Unknown Cash PUBG Mobile', 'price' => 145000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '1800 UC PUBG Mobile', 'description' => '1800 Unknown Cash PUBG Mobile', 'price' => 375000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '3850 UC PUBG Mobile', 'description' => '3850 Unknown Cash PUBG Mobile', 'price' => 750000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);
        Product::create(['name' => '8100 UC PUBG Mobile', 'description' => '8100 Unknown Cash PUBG Mobile', 'price' => 1500000.00, 'stock' => 9999, 'image_url' => 'uc.jpg']);


        // --- Data Produk Valorant (DIKOMENTARI KARENA FRONTEND MENGGUNAKAN HARDCODE) ---
        Product::create(['name' => '475 Valorant Points', 'description' => '475 Valorant Points', 'price' => 75000.00, 'stock' => 9999, 'image_url' => 'ValorantProduct.png']); 
        Product::create(['name' => 'Battle Pass', 'description' => 'Valorant Battle Pass', 'price' => 149900.00, 'stock' => 9999, 'image_url' => 'ValorantProduct.png']); 
        Product::create(['name' => '1000 Valorant Points', 'description' => '1000 Valorant Points', 'price' => 150000.00, 'stock' => 9999, 'image_url' => 'ValorantProduct.png']);
        Product::create(['name' => '2050 Valorant Points', 'description' => '2050 Valorant Points', 'price' => 299000.00, 'stock' => 9999, 'image_url' => 'ValorantProduct.png']);
        Product::create(['name' => '3650 Valorant Points', 'description' => '3650 Valorant Points', 'price' => 499000.00, 'stock' => 9999, 'image_url' => 'ValorantProduct.png']);
        Product::create(['name' => '5350 Valorant Points', 'description' => '5350 Valorant Points', 'price' => 699000.00, 'stock' => 9999, 'image_url' => 'ValorantProduct.png']);
        Product::create(['name' => '11000 Valorant Points', 'description' => '11000 Valorant Points', 'price' => 1399000.00, 'stock' => 9999, 'image_url' => 'ValorantProduct.png']);

        // --- Data Produk COD Mobile (DIKOMENTARI KARENA FRONTEND MENGGUNAKAN HARDCODE) ---
        Product::create(['name' => '80 CP COD Mobile', 'description' => '80 Call of Duty Points', 'price' => 15000.00, 'stock' => 9999, 'image_url' => 'cod_points.png']);
        Product::create(['name' => '170 CP COD Mobile', 'description' => '170 Call of Duty Points', 'price' => 30000.00, 'stock' => 9999, 'image_url' => 'cod_points.png']);
        Product::create(['name' => '340 CP COD Mobile', 'description' => '340 Call of Duty Points', 'price' => 55000.00, 'stock' => 9999, 'image_url' => 'cod_points.png']);
        Product::create(['name' => '690 CP COD Mobile', 'description' => '690 Call of Duty Points', 'price' => 100000.00, 'stock' => 9999, 'image_url' => 'cod_points.png']);
        Product::create(['name' => '1400 CP COD Mobile', 'description' => '1400 Call of Duty Points', 'price' => 190000.00, 'stock' => 9999, 'image_url' => 'cod_points.png']);
        Product::create(['name' => '2400 CP COD Mobile', 'description' => '2400 Call of Duty Points', 'price' => 300000.00, 'stock' => 9999, 'image_url' => 'cod_points.png']);

        // --- Data Produk Genshin Impact ---
        Product::create(['name' => '60 Genesis Crystals', 'description' => '60 Genesis Crystals', 'price' => 15000.00, 'stock' => 9999, 'image_url' => 'genshin_crystal.png']);
        Product::create(['name' => '300 + 30 Genesis Crystals', 'description' => '330 Genesis Crystals', 'price' => 75000.00, 'stock' => 9999, 'image_url' => 'genshin_crystal.png']);
        Product::create(['name' => '980 + 110 Genesis Crystals', 'description' => '1090 Genesis Crystals', 'price' => 225000.00, 'stock' => 9999, 'image_url' => 'genshin_crystal.png']);
        Product::create(['name' => 'Blessing of the Welkin Moon', 'description' => 'Blessing of the Welkin Moon', 'price' => 75000.00, 'stock' => 9999, 'image_url' => 'welkin_moon.png']);
        Product::create(['name' => '1980 + 260 Genesis Crystals', 'description' => '2240 Genesis Crystals', 'price' => 449000.00, 'stock' => 9999, 'image_url' => 'genshin_crystal.png']);
        Product::create(['name' => '3280 + 600 Genesis Crystals', 'description' => '3880 Genesis Crystals', 'price' => 749000.00, 'stock' => 9999, 'image_url' => 'genshin_crystal.png']);
        Product::create(['name' => '6480 + 1600 Genesis Crystals', 'description' => '8080 Genesis Crystals', 'price' => 1499000.00, 'stock' => 9999, 'image_url' => 'genshin_crystal.png']);
    }
}
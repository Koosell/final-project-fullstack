<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Merchandise; // <-- PENTING: Import model Merchandise di sini

class MerchandiseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Menggunakan metode insert untuk menambahkan beberapa data sekaligus
        Merchandise::insert([
            [
                'name' => 'Gaming T-Shirt Esports Edition',
                'description' => 'T-shirt edisi terbatas yang dibuat dengan bahan katun premium, menampilkan logo gaming eksklusif dan potongan yang nyaman.',
                'image' => 'https://i.imgur.com/MUXFpkX.jpeg',
                'price' => 149000,
                'category' => 'Apparel',
                'size' => 'L',
                'material' => 'Premium Cotton',
                'created_at' => now(), // Mengisi timestamp saat ini
                'updated_at' => now(), // Mengisi timestamp saat ini
            ],
            [
                'name' => 'Gaming Backpack RGB',
                'description' => 'Tas ransel gaming dengan lampu LED RGB, kompartemen laptop yang aman, dan bahan yang tahan air untuk melindungi semua perlengkapanmu.',
                'image' => 'https://i.imgur.com/3VAnTzm.jpeg',
                'price' => 399000,
                'category' => 'Accessories',
                'size' => null, // Tas tidak memiliki ukuran S/M/L
                'material' => 'Water Resistant Polyester',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
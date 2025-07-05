<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Merchandise; // <-- PENTING: Import model Merchandise

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
        // Metode ini lebih cepat tetapi tidak menjalankan event model atau mutator
        Merchandise::insert([
            // Item Asli
            [
                'name' => 'Gaming T-Shirt Esports Edition',
                'description' => 'T-shirt edisi terbatas yang dibuat dengan bahan katun premium, menampilkan logo gaming eksklusif dan potongan yang nyaman.',
                'image' => 'https://i.imgur.com/MUXFpkX.jpeg',
                'price' => 149000,
                'category' => 'Apparel',
                'size' => 'L',
                'material' => 'Premium Cotton',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gaming Backpack RGB',
                'description' => 'Tas ransel gaming dengan lampu LED RGB, kompartemen laptop yang aman, dan bahan yang tahan air untuk melindungi semua perlengkapanmu.',
                'image' => 'https://i.imgur.com/3VAnTzm.jpeg',
                'price' => 399000,
                'category' => 'Accessories',
                'size' => null,
                'material' => 'Water Resistant Polyester',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Awal dari 11 data baru yang ditambahkan
            [
                'name' => 'Pro-Gamer Hoodie "Victory" Edition',
                'description' => 'Hoodie nyaman dengan desain stylish untuk para gamer. Terbuat dari bahan fleece tebal yang hangat, cocok untuk sesi gaming malam hari.',
                'image' => 'https://i.imgur.com/kzk86Ml.jpeg',
                'price' => 299000,
                'category' => 'Apparel',
                'size' => 'XL',
                'material' => 'Cotton Fleece',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Extended Gaming Mousepad "Galaxy"',
                'description' => 'Mousepad berukuran besar yang menutupi seluruh meja, dengan permukaan kain mikro yang halus untuk kontrol presisi dan kecepatan.',
                'image' => 'https://i.pinimg.com/736x/5d/aa/9b/5daa9b5daa708b0b47fa23b07fc07be5.jpg',
                'price' => 189000,
                'category' => 'Accessories',
                'size' => '90x40cm',
                'material' => 'Micro-weave cloth, rubber base',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Esports Team Fan Cap',
                'description' => 'Tunjukkan dukunganmu untuk tim esports favorit dengan topi snapback berkualitas tinggi ini. Desain bordir premium.',
                'image' => 'https://i.pinimg.com/736x/85/93/5a/85935a96608ab2522a1472ea6ca38eed.jpg',
                'price' => 129000,
                'category' => 'Apparel',
                'size' => 'One Size',
                'material' => 'Cotton Twill',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Artisan Keycaps "Dragon Fire" Set',
                'description' => 'Set keycap kustom untuk keyboard mekanis. Dibuat dari resin dengan detail naga yang menyala dalam gelap.',
                'image' => 'https://i.pinimg.com/736x/cd/43/04/cd43046309177d08bb2e8e405440c702.jpg',
                'price' => 450000,
                'category' => 'Peripherals',
                'size' => null,
                'material' => 'Resin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gamer Fuel Mug "Level Up"',
                'description' => 'Mulai harimu atau sesi gamingmu dengan mug keramik ini. Berubah warna saat diisi air panas, menampilkan pesan "Level Up".',
                'image' => 'https://i.pinimg.com/736x/0c/a7/3b/0ca73b21f8eb5e6846fafd93f4a05dee.jpg',
                'price' => 99000,
                'category' => 'Drinkware',
                'size' => '350ml',
                'material' => 'Ceramic',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Headset Stand with USB Hub',
                'description' => 'Jaga kerapihan mejamu dengan stand headset ini. Dilengkapi dengan 3 port USB untuk mengisi daya perangkatmu.',
                'image' => 'https://i.pinimg.com/736x/5f/a0/67/5fa067975c109925227ddf51ddefaeca.jpg',
                'price' => 249000,
                'category' => 'Accessories',
                'size' => null,
                'material' => 'Aluminum Alloy, ABS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Miniature Controller Keychain',
                'description' => 'Gantungan kunci berbentuk controller game mini yang detail. Aksesori wajib untuk setiap gamer.',
                'image' => 'https://i.pinimg.com/736x/6f/dd/81/6fdd8108038f3e2fbf346394aef8293e.jpg',
                'price' => 49000,
                'category' => 'Collectibles',
                'size' => null,
                'material' => 'PVC',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Legendary Heroes Gaming Poster',
                'description' => 'Hiasi dinding kamar atau ruang gamingmu dengan poster epik yang menampilkan kumpulan pahlawan dari dunia game.',
                'image' => 'https://i.pinimg.com/736x/a4/88/1f/a4881f301d122c8a258c149de61a6148.jpg',
                'price' => 79000,
                'category' => 'Collectibles',
                'size' => 'A3',
                'material' => 'Art Paper 260g',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => '"Do Not Disturb" Gaming Socks',
                'description' => 'Kaus kaki lucu dengan tulisan "Do Not Disturb, I\'m Gaming" di bagian telapak. Hadiah sempurna untuk seorang gamer.',
                'image' => 'https://i.pinimg.com/736x/e8/d1/00/e8d100cb1fb02a59741fa6f57e1de4f7.jpg',
                'price' => 69000,
                'category' => 'Apparel',
                'size' => 'One Size',
                'material' => 'Cotton Blend',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Insulated Gamer Tumbler',
                'description' => 'Jaga minumanmu tetap dingin selama berjam-jam dengan tumbler stainless steel ini. Desain anti-tumpah, ideal untuk meja gaming.',
                'image' => 'https://i.pinimg.com/736x/ed/c0/5f/edc05f4fc4e780af0c66dfa23ddff36d.jpg',
                'price' => 199000,
                'category' => 'Drinkware',
                'size' => '500ml',
                'material' => 'Stainless Steel',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bomber Jacket "Cyberpunk" Style',
                'description' => 'Jaket bomber dengan sentuhan gaya cyberpunk. Patch dan bordir yang terinspirasi dari dunia game futuristik.',
                'image' => 'https://i.pinimg.com/736x/7f/19/a5/7f19a5a9c347f26b07b7321cfa33dc5b.jpg',
                'price' => 499000,
                'category' => 'Apparel',
                'size' => 'L',
                'material' => 'Nylon, Polyester Lining',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
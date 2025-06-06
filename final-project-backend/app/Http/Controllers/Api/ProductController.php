<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of all products.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $products = Product::all();
        return response()->json([
            'message' => 'Products fetched successfully',
            'data' => $products 
        ]);
    }

    /**
     * Display the specified product by ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    // Metode-metode untuk mendapatkan produk berdasarkan game (dinamis)
    // Metode ini hanya akan berfungsi jika data produk TIDAK DIKOMENTARI di ProductSeeder dan ada di DB.
    public function getValorantProducts()
    {
        $valorantProducts = Product::where('name', 'like', '%Valorant%')
                                 ->orWhere('description', 'like', '%Valorant%')
                                 ->get();

        return response()->json([
            'message' => 'Valorant products fetched successfully',
            'data' => $valorantProducts
        ], 200);
    }

    public function getMlProducts()
    {
        $mlProducts = Product::where('name', 'like', '%ML%')
                             ->orWhere('description', 'like', '%Mobile Legends%')
                             ->get();
        return response()->json(['message' => 'Mobile Legends products fetched successfully', 'data' => $mlProducts], 200);
    }

    public function getFfProducts()
    {
        $ffProducts = Product::where('name', 'like', '%FF%')
                             ->orWhere('description', 'like', '%Free Fire%')
                             ->get();
        return response()->json(['message' => 'Free Fire products fetched successfully', 'data' => $ffProducts], 200);
    }

    public function getPubgProducts()
    {
        $pubgProducts = Product::where('name', 'like', '%PUBG%')
                              ->orWhere('description', 'like', '%PUBG Mobile%')
                              ->get();
        return response()->json(['message' => 'PUBG Mobile products fetched successfully', 'data' => $pubgProducts], 200);
    }

    public function getCodProducts()
    {
        $codProducts = Product::where('name', 'like', '%COD Mobile%')
                             ->orWhere('description', 'like', '%Call of Duty Points%')
                             ->get();
        return response()->json(['message' => 'Call of Duty Mobile products fetched successfully', 'data' => $codProducts], 200);
    }

    public function getGenshinProducts()
    {
        $genshinProducts = Product::where('name', 'like', '%Genshin Impact%')
                                 ->orWhere('description', 'like', '%Genesis Crystals%')
                                 ->orWhere('description', 'like', '%Welkin Moon%')
                                 ->get();
        return response()->json(['message' => 'Genshin Impact products fetched successfully', 'data' => $genshinProducts], 200);
    }
}
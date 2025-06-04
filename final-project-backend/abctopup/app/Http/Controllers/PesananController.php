<?php

namespace App\Http\Controllers;

use App\Models\Pesanan;
use Illuminate\Http\Request;

class PesananController extends Controller
{
    // Tampilkan semua pesanan
    public function index()
    {
        return Pesanan::all();
    }

    // Simpan pesanan baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            // id_user bisa nullable (atau diisi default 0 jika tidak login)
            'id_user' => 'nullable|integer',
            'produk' => 'required|string',
            'game_id' => 'required|string',
            'server_id' => 'required|string',
            'payment_method' => 'required|string',
            'account_number' => 'nullable|string',
            'bank_name' => 'nullable|string',
            'kode_promo' => 'nullable|string',
            'total' => 'required|numeric|min:0',
        ]);

        // Mapping ke kolom tabel
        $pesanan = Pesanan::create([
            'id_user' => $validated['id_user'] ?? null,
            'item_name' => $validated['produk'],
            'quantity' => 1,
            'game_id' => $validated['game_id'],
            'server_id' => $validated['server_id'],
            'payment_method' => $validated['payment_method'],
            'account_number' => $validated['account_number'] ?? null,
            'bank_name' => $validated['bank_name'] ?? null,
            'kode_promo' => $validated['kode_promo'] ?? null,
            'total_price' => $validated['total'],
            'produk' => $validated['produk'],
            'total' => $validated['total'],
        ]);
        return response()->json($pesanan, 201);
    }

    // Tampilkan detail pesanan
    public function show($id)
    {
        return Pesanan::findOrFail($id);
    }

    // Update pesanan
    public function update(Request $request, $id)
    {
        $pesanan = Pesanan::findOrFail($id);
        $pesanan->update($request->all());
        return response()->json($pesanan, 200);
    }

    // Hapus pesanan
    public function destroy($id)
    {
        Pesanan::destroy($id);
        return response()->json(null, 204);
    }
}
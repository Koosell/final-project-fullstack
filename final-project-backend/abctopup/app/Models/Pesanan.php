<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table = 'pesanan';
    protected $fillable = [
        'id_user', 'id_produk', 'payment_method', 'game_id', 'server_id', 'account_number', 'bank_name', 'kode_promo',
        'item_name', 'quantity', 'total_price', 'payment_status', 'transaction_id',
    ];
}
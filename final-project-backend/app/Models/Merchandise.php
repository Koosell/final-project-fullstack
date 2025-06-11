<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchandise extends Model
{
    use HasFactory;

    /**
     * Nama tabel database yang terhubung dengan model ini.
     * INI ADALAH PERBAIKAN UNTUK ERROR ANDA SEBELUMNYA.
     *
     * @var string
     */
    protected $table = 'merchandise';

    /**
     * Kolom-kolom yang diizinkan untuk diisi secara massal (mass assignment).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'image',
        'price',
        'category',
        'size',
        'material'
    ];

    /**
     * Mendefinisikan relasi polimorfik ke model CartItem.
     * Artinya, sebuah merchandise bisa memiliki banyak item keranjang.
     */
    public function cartItems()
    {
        return $this->morphMany(CartItem::class, 'itemable');
    }
}
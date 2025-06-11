<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    /**
     * Kolom-kolom yang diizinkan untuk diisi secara massal (mass assignment).
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'quantity',
        'itemable_id',
        'itemable_type',
    ];

    /**
     * Mendefinisikan relasi polimorfik "one-to-many".
     * Ini adalah inti dari sistem keranjang serbaguna.
     * Fungsi ini akan mengambil item yang terhubung,
     * baik itu dari model Product atau Merchandise.
     */
    public function itemable()
    {
        return $this->morphTo();
    }

    /**
     * Mendefinisikan relasi ke model User.
     * Setiap item keranjang dimiliki oleh satu user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

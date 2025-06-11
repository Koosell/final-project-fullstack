<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    /**
     * Kolom-kolom yang diizinkan untuk diisi secara massal (mass assignment).
     * Ini telah disesuaikan agar cocok dengan sistem polimorfik.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'order_id',
        'orderable_id',   // <-- Menggunakan kolom polimorfik
        'orderable_type', // <-- Menggunakan kolom polimorfik
        'quantity',
        'price',
    ];

    /**
     * Mendefinisikan relasi ke model Order.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Mendefinisikan relasi polimorfik "one-to-many".
     * Ini akan mengambil item yang terhubung, baik itu dari
     * model Product atau Merchandise.
     */
    public function orderable()
    {
        return $this->morphTo();
    }
}

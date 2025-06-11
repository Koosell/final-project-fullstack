<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * Kolom-kolom yang diizinkan untuk diisi secara massal (mass assignment).
     * Ini telah disesuaikan agar cocok dengan OrderController.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'customer_name',
        'shipping_address',
        'phone_number',
        'payment_method',
        'payment_details',
        'total_price',
        'status',
    ];

    /**
     * Mendefinisikan relasi ke User.
     * Setiap pesanan dimiliki oleh satu user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Mendefinisikan relasi ke OrderItem.
     * Setiap pesanan memiliki banyak item.
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}

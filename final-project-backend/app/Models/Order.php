<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'total_amount',
        'status',
        'payment_method',
        'game_id',
        'server_id',
        'payment_details', // Jika Anda menyimpannya sebagai JSON di kolom ini
        'promo_code',      // Jika Anda memiliki kolom promo_code
    ];

    // Definisikan relasi jika ada
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
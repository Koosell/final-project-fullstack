<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image_url',
    ];

    // Jika Anda ingin mendefinisikan relasi (misalnya ke OrderItem), tambahkan di sini
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
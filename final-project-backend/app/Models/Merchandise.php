<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchandise extends Model
{
    use HasFactory;

    protected $table = 'merchandise';

    /**
     * PERBAIKAN: Pastikan semua kolom dari form ada di sini.
     * Terutama 'stock' yang sebelumnya tidak ada.
     */

    protected $fillable = [
        'name',
        'description', 
        'price',
        'stock',
        'category',
        'size',
        'material',
        'image'
    ];
     protected $casts = [
        'price' => 'integer',
        'stock' => 'integer',
    ];

    public function cartItems()
    {
        return $this->morphMany(CartItem::class, 'itemable');
    }
}
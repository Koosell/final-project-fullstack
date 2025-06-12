<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    /**
     * Kolom-kolom yang diizinkan untuk diisi secara massal.
     */
    protected $fillable = [
        'user_id',
        'rating',
        'comment',
        'is_featured',
    ];

    /**
     * Mendefinisikan relasi ke model User.
     * Setiap testimoni dimiliki oleh satu user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
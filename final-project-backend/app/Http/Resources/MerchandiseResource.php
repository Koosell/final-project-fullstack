<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MerchandiseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $imageUrl = null;
        if ($this->image) {
            // Cek apakah path gambar adalah URL lengkap (dimulai dengan http)
            if (Str::startsWith($this->image, ['http://', 'https://'])) {
                // Jika sudah URL, gunakan langsung
                $imageUrl = $this->image;
            } else {
                // PERBAIKAN BARU: Menggabungkan URL dasar dari config dengan path storage.
                // Ini cara paling andal untuk memastikan URL lengkap dan benar.
                // Hasilnya akan seperti: http://127.0.0.1:8000/storage/merchandise/namafile.jpg
                $baseUrl = config('app.url');
                $imageUrl = $baseUrl . Storage::url($this->image);
            }
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'stock' => $this->stock,
            'category' => $this->category,
            'size' => $this->size,
            'material' => $this->material,
            'image_url' => $imageUrl, // Gunakan URL yang sudah diproses
            'created_at' => $this->created_at->format('d-m-Y H:i:s'),
        ];
    }
}

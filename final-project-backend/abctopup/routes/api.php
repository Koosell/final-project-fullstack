<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PesananController;

// Route API resource pesanan (aktifkan setelah controller dibuat)
Route::apiResource('pesanan', PesananController::class);

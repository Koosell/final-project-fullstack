    <?php

    return [
        'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register'],
        'allowed_methods' => ['*'],
        'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'], // <<< PASTIKAN HANYA PORT 5173, TANPA /Final_Project/
        'allowed_origins_patterns' => [],
        'allowed_headers' => ['*'],
        'exposed_headers' => [],
        'max_age' => 0,
        'supports_credentials' => true,
    ];
    
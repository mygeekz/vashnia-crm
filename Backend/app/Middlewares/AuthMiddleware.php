<?php
namespace App\Middlewares;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthMiddleware
{
    public static function handle(string $secret): ?array
    {
        $hdr = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (!preg_match('/Bearer\\s+(.*)$/i', $hdr, $m)) {
            http_response_code(401);
            echo json_encode(['message'=>'توکن موجود نیست']); exit;
        }
        try {
            return (array) JWT::decode($m[1], new Key($secret, 'HS256'));
        } catch (\Throwable $e) {
            http_response_code(401);
            echo json_encode(['message'=>'توکن نامعتبر']); exit;
        }
    }
}

<?php
require dirname(__DIR__, 1) . '/vendor/autoload.php';

use App\Core\Router;
use App\Controllers\PingController;
use App\Controllers\CategoryController;
use App\Controllers\AuthController;
use App\Middlewares\AuthMiddleware;

// لود متغیرهای محیطی
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// ایجاد شیء Router
$router = new Router();

// مسیر احراز هویت
$router->add('POST','/api/login',[AuthController::class,'login']);

// مسیر محافظت‌شده برای تست توکن
$router->add('GET','/api/protected', function(){
    $user = AuthMiddleware::handle(getenv('JWT_SECRET'));
    (new CategoryController)->index(); // فقط جهت تست
});

// مسیرهای CRUD دسته‌بندی
$router->add('GET',    '/api/categories',            [CategoryController::class,'index']);
$router->add('POST',   '/api/categories',            [CategoryController::class,'store']);
$router->add('GET',    '/api/categories/([0-9]+)',   [CategoryController::class,'show']);
$router->add('PUT',    '/api/categories/([0-9]+)',   [CategoryController::class,'update']);
$router->add('DELETE', '/api/categories/([0-9]+)',   [CategoryController::class,'destroy']);

// مسیر تست ساده
$router->add('GET', '/api/ping', [PingController::class, 'index']);

// هدرهای CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// اجرای Dispatch
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);

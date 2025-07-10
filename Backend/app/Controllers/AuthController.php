<?php
require dirname(__DIR__, 1) . '/vendor/autoload.php';

use App\Core\Router;
use App\Controllers\PingController;
use App\Controllers\CategoryController;
use App\Controllers\AuthController;
use App\Middlewares\AuthMiddleware;

/* Load .env */
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

/* Init Router BEFORE usage */
$router = new Router();

/* CORS headers */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

/* Routes */
$router->add('POST','/api/login',[AuthController::class,'login']);

$router->add('GET','/api/categories', function(){
    $user = AuthMiddleware::handle(getenv('JWT_SECRET'));
    (new CategoryController)->index();
});
$router->add('POST',   '/api/categories',            [CategoryController::class,'store']);
$router->add('GET',    '/api/categories/([0-9]+)',   [CategoryController::class,'show']);
$router->add('PUT',    '/api/categories/([0-9]+)',   [CategoryController::class,'update']);
$router->add('DELETE', '/api/categories/([0-9]+)',   [CategoryController::class,'destroy']);

$router->add('GET', '/api/ping', [PingController::class, 'index']);

/* Run Router */
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);

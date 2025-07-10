<?php
namespace App\Core;

class Router
{
    /** @var array<string, array<string, callable|array>> */
    private array $routes = [];

    /** ثبت مسیر */
    public function add(string $method, string $pattern, callable|array $handler): void
    {
        $this->routes[strtoupper($method)][$pattern] = $handler;
    }

    /** تطبیق مسیر و اجرا */
    public function dispatch(string $method, string $uri): void
    {
        $method = strtoupper($method);
        $path   = parse_url($uri, PHP_URL_PATH);

        foreach ($this->routes[$method] ?? [] as $pattern => $handler) {
            if (preg_match('#^' . $pattern . '$#', $path, $matches)) {
                array_shift($matches); // حذف مسیر کامل از matches
                $this->run($handler, $matches);
                return;
            }
        }

        http_response_code(404);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['message' => 'Not Found']);
    }

    /** اجرای کنترلر و ارسال پاسخ JSON */
    private function run(callable|array $handler, array $params = []): void
    {
        if (is_array($handler)) {
            [$class, $method] = $handler;
            $handler = [new $class, $method];
        }

        $result = $handler(...$params);

        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8');
        }

        if (!is_null($result)) {
            echo is_array($result) ? json_encode($result, JSON_UNESCAPED_UNICODE) : $result;
        }
    }
}

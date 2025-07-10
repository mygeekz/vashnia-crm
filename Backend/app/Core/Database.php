<?php
namespace App\Core;

use PDO;
use PDOException;

class Database
{
    private static ?PDO $pdo = null;

    public static function connection(): PDO
    {
        if (static::$pdo === null) {
            $cfg = require __DIR__ . '/../../config/database.php';
            $dsn = "{$cfg['driver']}:host={$cfg['host']};dbname={$cfg['dbname']};charset={$cfg['charset']};port={$cfg['port']}";
            try {
                static::$pdo = new PDO($dsn, $cfg['username'], $cfg['password'], [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
            } catch (PDOException $e) {
                http_response_code(500);
                exit('DB Connection failed: ' . $e->getMessage());
            }
        }
        return static::$pdo;
    }
}

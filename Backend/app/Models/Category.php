<?php
namespace App\Models;

use App\Core\Database;
use PDO;

class Category
{
    private PDO $db;

    public function __construct()
    {
        $this->db = Database::connection();
    }

    /* ─────────────── CRUD ─────────────── */

    public function all(): array
    {
        return $this->db->query(
            'SELECT id, title FROM categories ORDER BY id DESC'
        )->fetchAll();
    }

    public function find(int $id): ?array
    {
        $stmt = $this->db->prepare(
            'SELECT id, title FROM categories WHERE id = :id LIMIT 1'
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public function create(string $title): int
    {
        $stmt = $this->db->prepare(
            'INSERT INTO categories (title) VALUES (:title)'
        );
        $stmt->execute(['title' => $title]);
        return (int) $this->db->lastInsertId();
    }

    public function update(int $id, string $title): bool
    {
        $stmt = $this->db->prepare(
            'UPDATE categories SET title = :title WHERE id = :id'
        );
        return $stmt->execute(['title' => $title, 'id' => $id]);
    }

    public function delete(int $id): bool
    {
        $stmt = $this->db->prepare(
            'DELETE FROM categories WHERE id = :id'
        );
        return $stmt->execute(['id' => $id]);
    }

    /* ─────────────── Validation ─────────────── */

    public function exists(string $title, ?int $ignoreId = null): bool
    {
        if ($ignoreId) {
            $sql = 'SELECT COUNT(*) FROM categories WHERE title = :t AND id <> :id';
            $stmt = $this->db->prepare($sql);
            $stmt->execute(['t' => $title, 'id' => $ignoreId]);
        } else {
            $stmt = $this->db->prepare(
                'SELECT COUNT(*) FROM categories WHERE title = :t'
            );
            $stmt->execute(['t' => $title]);
        }
        return (bool) $stmt->fetchColumn();
    }
}

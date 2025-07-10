<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Models\Category;

class CategoryController extends Controller
{
    private Category $model;

    public function __construct()
    {
        $this->model = new Category();
    }

    /* GET /api/categories */
    public function index(): void
    {
        $this->json($this->model->all());
    }

    /* GET /api/categories/{id} */
    public function show(int $id): void
    {
        $cat = $this->model->find($id);
        $cat
            ? $this->json($cat)
            : $this->json(['message' => 'Category not found'], 404);
    }

    /* POST /api/categories */
    public function store(): void
    {
        $body  = json_decode(file_get_contents('php://input'), true) ?? [];
        $title = trim($body['title'] ?? '');

        if ($title === '') {
            $this->json(['message' => 'Title is required'], 422);
            return;
        }
        if ($this->model->exists($title)) {
            $this->json(['message' => 'Title already exists'], 409);
            return;
        }
        $id = $this->model->create($title);
        $this->json(['id' => $id, 'title' => $title], 201);
    }

    /* PUT /api/categories/{id} */
    public function update(int $id): void
    {
        $body  = json_decode(file_get_contents('php://input'), true) ?? [];
        $title = trim($body['title'] ?? '');

        if ($title === '') {
            $this->json(['message' => 'Title is required'], 422);
            return;
        }
        if ($this->model->exists($title, $id)) {
            $this->json(['message' => 'Title already exists'], 409);
            return;
        }
        $ok = $this->model->update($id, $title);
        $ok
            ? $this->json(['id' => $id, 'title' => $title])
            : $this->json(['message' => 'Category not found'], 404);
    }

    /* DELETE /api/categories/{id} */
    public function destroy(int $id): void
    {
        $ok = $this->model->delete($id);
        $ok
            ? $this->json(['message' => 'deleted'])
            : $this->json(['message' => 'Category not found'], 404);
    }
}

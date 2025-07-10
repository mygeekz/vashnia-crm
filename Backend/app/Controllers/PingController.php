<?php
namespace App\Controllers;

use App\Core\Controller;

class PingController extends Controller
{
    public function index(): void
    {
        $this->json([
            'status' => 'ok',
            'time'   => date('c')
        ]);
    }
}

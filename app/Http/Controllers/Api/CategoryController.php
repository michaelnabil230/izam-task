<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class CategoryController
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(): JsonResponse
    {
        $categories = Category::all();

        return response()->json([
            'categories' => CategoryResource::collection($categories),
        ]);
    }
}

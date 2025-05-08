<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\Product\ProductCollection;
use App\Http\Resources\Product\ProductResource;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'search' => ['nullable', 'string'],
            'categories' => ['nullable'],
            'form_price' => ['nullable', 'numeric'],
            'to_price' => ['nullable', 'numeric'],
        ]);

        $products = Product::query()
            ->with('category')
            ->when(
                $request->string('search')->value(),
                fn (Builder $builder, string $search): Builder => $builder->whereLike('name', "%$search%")
            )
            ->when(
                $request->categories !== null,
                fn (Builder $builder): Builder => $builder->whereIn(
                    'category_id',
                    explode(',', $request->categories),
                )
            )
            ->when(
                $request->filled(['min_price', 'max_price']),
                fn (Builder $builder): Builder => $builder->whereBetween('price', [
                    $request->input('min_price'),
                    $request->input('max_price'),
                ])
            )
            ->latest()
            ->paginate();

        return response()->json([
            'products' => ProductCollection::make($products),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): JsonResponse
    {
        return response()->json([
            'product' => ProductResource::make($product),
        ]);
    }
}

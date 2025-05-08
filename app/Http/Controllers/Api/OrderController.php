<?php

namespace App\Http\Controllers\Api;

use App\Enums\OrderStatus;
use App\Events\OrderPlacedEvent;
use App\Http\Requests\Api\StoreOrderRequest;
use App\Http\Resources\Order\OrderCollection;
use App\Http\Resources\Order\OrderResource;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderController
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $key = "orders-{$request->integer('page', 1)}-{$request->user()->id}";

        $orders = cache()->remember($key, now()->addMinutes(5), function () {
            return Order::query()
                ->with('products')
                ->latest()
                ->paginate();
        });

        return response()->json([
            'orders' => OrderCollection::make($orders),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request): Response
    {
        DB::transaction(function () use ($request): void {
            $productsCollect = $request->safe()->collect('products');

            $products = Product::query()
                ->whereIn('id', $productsCollect->pluck('id'))
                ->get()
                ->filter(fn (Product $product): bool => (int) $productsCollect->where('id', $product->id)->value('quantity', 1) <= $product->quantity);

            $order = auth()->user()->orders()->create([
                'total_price' => $products->sum('price') * $productsCollect->sum('quantity'),
                'status' => OrderStatus::PENDING,
            ]);

            $products->each(fn (Product $product) => $product->decrement(
                'quantity',
                $productsCollect->where('id', $product->id)->value('quantity', 1)
            ));

            $products = $products->mapWithKeys(fn (Product $product): array => [
                $product->id => [
                    'price' => $product->price,
                    'quantity' => $productsCollect->where('id', $product->id)->value('quantity', 1),
                ],
            ])->toArray();

            $order->products()->attach($products);

            OrderPlacedEvent::dispatch($order);
        });

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): JsonResponse
    {
        $order->load('products.category');

        return response()->json([
            'order' => OrderResource::make($order),
        ]);
    }
}

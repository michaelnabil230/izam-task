<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Resources\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'user' => UserResource::make(Auth::user()),
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class RegisterController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request): JsonResponse
    {
        $user = User::create($request->safe()->except('password_confirmation'));

        return response()->json([
            'token' => $user->createToken('token-name')->plainTextToken,
            'user' => $user,
        ]);
    }
}

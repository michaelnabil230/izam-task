<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Requests\Api\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(LoginRequest $request): JsonResponse
    {
        if (! Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
            ]);
        }

        $user = Auth::user();

        return response()->json([
            'token' => $user->createToken('token-name')->plainTextToken,
            'user' => $user,
        ]);
    }
}

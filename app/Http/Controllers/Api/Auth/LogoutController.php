<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LogoutController
{
    /**
     * Display a listing of the resource.
     */
    public function __invoke(Request $request): Response
    {
        Auth::guard('web')->user()->tokens()->delete();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}

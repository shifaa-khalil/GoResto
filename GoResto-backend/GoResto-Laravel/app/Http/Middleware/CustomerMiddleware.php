<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CustomerMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = auth()->user();

        if(!$user) return response()->json(['error' => 'Unauthorized'], 401); //redirect

        else if ($user->role !== 'customer') {
            return response()->json('no access');
        }
        
        return $next($request);
    }
}

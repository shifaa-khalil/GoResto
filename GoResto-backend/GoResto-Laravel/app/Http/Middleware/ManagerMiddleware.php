<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ManagerMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = auth()->user();

        // if(!$user) return response()->json(['error' => 'Unauthorized'], 401); 

        if ($user->role !== 'manager') {
            return response()->json('no access');
        }
        
        return $next($request);
    }
}

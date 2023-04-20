<?php

namespace App\Http\Middleware;

use Closure;
// use Illuminate\Auth\Middleware\AdminMiddleware as Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = auth()->user();

        if ($user->role !== 'admin') {
            return response()->json('no access');
        }
        
        return $next($request);
    }
}

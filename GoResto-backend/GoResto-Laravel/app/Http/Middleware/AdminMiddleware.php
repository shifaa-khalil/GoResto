<?php

namespace App\Http\Middleware;

use Closure;
// use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        $user = auth()->user();

        if ($user->role !== 'admin') {
            return response()->json('You do not have access!!');
        }

        return response()->json($user->role);

        // return $next($request);
    }
}

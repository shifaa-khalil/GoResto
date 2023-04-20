<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Restaurant;

class CustomerController extends Controller
{
    function getRestaurants(){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $restaurants = Restaurant::where('approved', true)->first();

            return response()->json(['message' => $restaurants]);
        }
    }
}

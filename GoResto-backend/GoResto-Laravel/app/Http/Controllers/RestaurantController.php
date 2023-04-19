<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Restaurant;

class RestaurantController extends Controller
{
    function addRestaurant(Request $request){
        $manager = auth()->user();

        if($manager) $manager_id = $manager->id;
        else return response()->json(['error' => 'Unauthorized'], 401);

        $request->validate(['name' => 'unique:restaurants',]);
        
        if($manager_id)
        {
        $restaurant = new Restaurant;
        $restaurant->name = $request->name;
        $restaurant->logo = $request->logo;
        $restaurant->location = $request->location;
        $restaurant->number_of_tables = $request->number_of_tables;
        $restaurant->menu_id = $request->menu_id;
        $restaurant->approved = false;
        $restaurant->manager_id = $manager_id;

        if (!$restaurant->save()) {
            return response()->json(['status' => 'error', 'restaurant' => 'Failed to add restaurant.']);
        }
    
        return response()->json(['status' => 'success', 'message' => $restaurant]);
    }
    }
}

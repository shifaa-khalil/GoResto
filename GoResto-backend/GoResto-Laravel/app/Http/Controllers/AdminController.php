<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\RestoRequest;
use App\Models\Restaurant;
use App\Models\Menu;
use App\Models\MenuItem;

class AdminController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }

    function getRequests()
    {
        // $admin = auth()->user();

        // if(!$admin) return response()->json(['error' => 'Unauthorized'], 401);
        // else
        // {
            $restoRequests = RestoRequest::all();

            return response()->json(['message' => $restoRequests]);
        // }
    }

    function approveRequest($id)
    {
        // $admin = auth()->user();

        // if(!$admin) return response()->json(['error' => 'Unauthorized'], 401);
        // else
        // {
            $restoRequest = RestoRequest::where('id', $id)->first();
            $restaurant_id = $restoRequest->restaurant_id;
            $restaurant = Restaurant::find($restaurant_id);

            $restaurant->update(['approved'=>true]);
            $restoRequest->delete();

            return response()->json(['status' => 'success', 'message' => 'request approved']);
        // }
    }

    function rejectRequest($id)
    {
        // $admin = auth()->user();

        // if(!$admin) return response()->json(['error' => 'Unauthorized'], 401);
        // else
        // {
            $restoRequest = RestoRequest::where('id', $id)->first();
            $restaurant_id = $restoRequest->restaurant_id;
            $restaurant = Restaurant::find($restaurant_id);
            $menu = Menu::find($restaurant->menu_id);

            // $restoRequest->delete();
            // MenuItem::where('menu_id', $menu->id)->delete();
            // $menu->delete();
            $restaurant->delete();

            return response()->json(['status' => 'success', 'message' => 'request rejected']);
        // }
    }

    function deleteRestaurant($restaurant_id)
    {
        // $admin = auth()->user();

        // if(!$admin) return response()->json(['error' => 'Unauthorized'], 401);
        // else
        // {
            $restaurant = Restaurant::find($restaurant_id);

            $restaurant->delete();

            return response()->json(['status' => 'success', 'message' => 'restaurant deleted']);

        // }
    }
}

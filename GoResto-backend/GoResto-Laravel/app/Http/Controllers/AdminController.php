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
        $restoRequests = RestoRequest::with(['restaurant', 'restaurant.menu', 'restaurant.menu.menuItem'])->get();

        return response()->json(['restoRequests' => $restoRequests]);
    }

    function approveRequest($id)
    {
        $restoRequest = RestoRequest::where('id', $id)->first();
        $restaurant_id = $restoRequest->restaurant_id;
        $restaurant = Restaurant::find($restaurant_id);

        $restaurant->update(['approved'=>true]);
        $restoRequest->delete();

        return response()->json(['status' => 'success', 'message' => 'request approved']);
    }

    function rejectRequest($id)
    {
        $restoRequest = RestoRequest::where('id', $id)->first();
        $restaurant_id = $restoRequest->restaurant_id;
        $restaurant = Restaurant::find($restaurant_id);
        $menu = Menu::find($restaurant->menu_id);

        $restaurant->delete();

        return response()->json(['status' => 'success', 'message' => 'request rejected']);
    }

    function deleteRestaurant($restaurant_id)
    {
        $restaurant = Restaurant::find($restaurant_id);

        $restaurant->delete();

        return response()->json(['status' => 'success', 'message' => 'restaurant deleted']);
    }
}

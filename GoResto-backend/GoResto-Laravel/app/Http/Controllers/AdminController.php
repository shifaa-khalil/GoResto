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
use App\Models\Inquiry;

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

    function getRestaurants()
    {
        $restaurants = Restaurant::with(['menu', 'menu.menuItem'])->get();

        return response()->json(['restaurants' => $restaurants]);
    }

    function getUsers()
    {
        $users = User::where('role', 'manager')->orWhere('role', 'customer')->get();

        return response()->json(['users' => $users]);
    }

    function getInquiries()
    {
        $inquiries = Inquiry::with('restaurant')->get();

        return response()->json(['inquiries' => $inquiries]);
    }

    
    function getMenu($restaurant_id)
    {        
        $menu_id = Menu::where('restaurant_id', $restaurant_id)->first()->id;
        $menuItems = MenuItem::where('menu_id', $menu_id)->get();

        return response()->json(['menu' => $menuItems]);
    }

    function approveRequest($id)
    {
        $restoRequest = RestoRequest::where('id', $id)->first();
        $restaurant_id = $restoRequest->restaurant_id;
        $restaurant = Restaurant::find($restaurant_id);

        $restaurant->update(['approved'=>true, 'status'=>'approved']);
        $restoRequest->delete();

        return response()->json(['status' => 'success', 'message' => 'request approved']);
    }

    function rejectRequest($id)
    {
        $restoRequest = RestoRequest::where('id', $id)->first();
        $restaurant_id = $restoRequest->restaurant_id;
        $restaurant = Restaurant::find($restaurant_id);
        $menu = Menu::find($restaurant->menu_id);

        $restoRequest->delete();
        $restaurant->update(['status'=>'rejected']);
        
        return response()->json(['status' => 'success', 'message' => 'request rejected']);
    }

    function deleteRestaurant($restaurant_id)
    {
        $restaurant = Restaurant::find($restaurant_id);

        $restaurant->delete();

        return response()->json(['status' => 'success', 'message' => 'restaurant deleted']);
    }

    function deleteUser($user_id)
    {
        $user = User::find($user_id);

        if($user->role == "manager")
        {
            $restaurant = Restaurant::where('manager_id', $user_id)->first();
            $restaurant->delete();
        }
        $user->delete();


        return response()->json(['status' => 'success', 'message' => 'user deleted']);
    }

    function solveInquiry($inquiry_id)
    {
        $inquiry = Inquiry::find($inquiry_id)->update(['status'=>'solved']);

        return response()->json(['status'=>'success', 'message'=>'inquiry solved']);


    }

    function ignoreInquiry($inquiry_id)
    {
        $inquiry = Inquiry::find($inquiry_id)->update(['status'=>'ignored']);

        return response()->json(['status'=>'success', 'message'=>'inquiry ignored']);


    }
}

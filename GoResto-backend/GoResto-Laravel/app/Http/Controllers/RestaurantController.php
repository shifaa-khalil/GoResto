<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Menu;
use App\Models\Review;
use App\Models\MenuItem;
use App\Models\Restaurant;
use App\Models\RestoRequest;
use App\Models\Reservation;
use App\Models\Inquiry;
use App\Models\Cuisine;

class RestaurantController extends Controller
{
    function addRestaurant(Request $request)
    {
        $manager = auth()->user();

        $manager_id = Restaurant::where('manager_id', $manager->id)->first();

        if($manager_id) return response()->json(['status'=>'failure', 'message'=>'you already added a restaurant on this account'], 400);
        else
        {
            try{
                $request->validate(['name' => 'unique:restaurants']);
            } catch (\Illuminate\Validation\ValidationException $e){
                return response()->json(['status' => 'failure', 'message' => 'taken'], 400);
            }
            if ($request->hasFile('logo')) {
                $request->validate([
                    'logo' => 'mimes:jpg,png,jpeg|max:6000'
                ]);
                $file = $request->file('logo');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extension;
                $file->move(public_path('storage/logos/'), $filename);
            
            $restaurant = new Restaurant;
            $restaurant->name = $request->name;
            $restaurant->logo = 'http://localhost:8000/storage/logos/' . $filename;
            $restaurant->location = $request->location;
            $restaurant->number_of_tables = $request->number_of_tables;
            $restaurant->number_of_seats = $request->number_of_seats;
            $restaurant->manager_id = $manager->id;
            $restaurant->deposit = $request->deposit;
            $restaurant->phone_number = $request->phone_number;
            $restaurant->save();
    
            $createdRestaurant = Restaurant::find($restaurant->id);

            $menu = new Menu;
            $menu->restaurant_id = $restaurant->id;
            $menu->save();
    
            $restaurant->menu_id = $menu->id;
            $restaurant->save();
    
            $restoRequest= new RestoRequest;
            $restoRequest->restaurant_id = $restaurant->id;
            $restoRequest->save();
    
            return response()->json(['status' => 'success', 'message' => $restaurant]);
        } else {
            return response()->json(['status' => 'failure', 'message' => 'No file uploaded.'], 400);
        }}
    }

    function addMenuItem(Request $request)
    {
        $manager = auth()->user();

        $restaurant = Restaurant::where('manager_id', $manager->id)->first();
        $menu_id = $restaurant->menu_id;

        try{
            $request->validate([ 'name' => 'unique:menu_items,name,NULL,id,menu_id,' . $menu_id]);
        } catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(['status' => 'failure', 'message' => 'item already exists'], 400);
        }      

        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'mimes:jpg,png,jpeg|max:6000'
            ]);
            $file = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('storage/logos/'), $filename);
        
            $menuItem = new MenuItem;

            $menuItem->menu_id = $menu_id;
            $menuItem->name = $request->name;
            $menuItem->image = 'http://localhost:8000/storage/logos/' . $filename;
            $menuItem->description = $request->description;
            $menuItem->price = $request->price;
            $menuItem->category = $request->category;
            $menuItem->cuisine = $request->cuisine;

            $menuItem->save();

            return response()->json(['status' => 'success', 'message' => $menuItem]);
        } else {
            return response()->json(['status' => 'failure', 'message' => 'No file uploaded.'], 400);
        }
    }

    function getReservationsResto()
    {
        $manager = auth()->user();

        $restaurant = Restaurant::where('manager_id', $manager->id)->first();

        $reservations = Reservation::where('restaurant_id', $restaurant->id)->get();
            
        foreach ($reservations as $reservation) {
            $customer = User::where('id', $reservation->customer_id)->first();
            $reservation->name = $customer->name;
        }

        return response()->json(['reservations' => $reservations]);
    }

    function updateRestaurant(Request $request, $restaurant_id)
    {
        $manager = auth()->user();

        $restaurant = Restaurant::find($restaurant_id)->update(['logo' => $request->logo, 'location' => $request->location, 'phone_number' => $request->phone_number, 'number_of_tables' => $request->number_of_tables, 'number_of_seats' => $request->number_of_seats, 'deposit' => $request->deposit]);

        return response()->json(['status'=>'success', 'message'=>'restaurant updated']);
    }

    function disableMenuItem($menu_item_id)
    {
        MenuItem::find($menu_item_id)->update(['enabled' => false]);

        return response()->json(['status'=>'success', 'message'=>'item disabled']);
    }

    function enableMenuItem($menu_item_id)
    {
        MenuItem::find($menu_item_id)->update(['enabled' => true]);

        return response()->json(['status'=>'success', 'message'=>'item enabled']);
    }

    function updateMenuItem(Request $request, $menu_item_id)
    {
        MenuItem::find($menu_item_id)->update(['description' => $request->description, 'price' => $request->price, 'category' => $request->category, 'cuisine' => $request->cuisine]);

        return response()->json(['status'=>'success', 'message'=>'item updated']);
    }

    function getMenu()
    {
        $manager = auth()->user();
        
        $restaurant = Restaurant::where('manager_id', $manager->id)->first();
        $menu_id = Menu::where('restaurant_id', $restaurant->id)->first()->id;
        $menuItems = MenuItem::where('menu_id', $menu_id)->get();

        return response()->json(['menu' => $menuItems]);

    }

    function getRestaurant()
    {
        $manager = auth()->user();
        
        $restaurant = Restaurant::where('manager_id', $manager->id)->first();
        if($restaurant){
            $totalReservations = Reservation::where('restaurant_id', $restaurant->id)->count();
            $totalReviews = Review::where('restaurant_id', $restaurant->id)->count();
            return response()->json(['totalReservations' => $totalReservations, 'totalReviews' => $totalReviews, 'restaurant' => $restaurant]);
        }
        return response()->json(['status'=>'failure', 'message'=>'no restaurant added']);
    }

    function getReviews()
    {
        $manager = auth()->user();
        
        $restaurant = Restaurant::where('manager_id', $manager->id)->first();
        if($restaurant){

        $reviews = Review::where('restaurant_id', $restaurant->id)->with('comment')->get();

        if(!$reviews) return response()->json('no reviews');
        
        return response()->json(['reviews' => $reviews]);
        }
        return response()->json(['status'=>'failure', 'message'=>'no restaurant added']);

    }

    function cancelReservationResto($reservation_id)
    {
        $reservation = Reservation::find($reservation_id);

        if(!$reservation) return response()->json(['status' => 'failure', 'message' => 'not found']);
        else
        {
            $reservation->delete();

            return response()->json(['status' => 'success', 'message' => 'reservation cancelled']);
        }
    }

    function getUserName($id){
        $user = User::find($id);

        return response()->json(["userName" => $user->name]);
    }

    function inquiry(Request $request){
        $inquiry = new Inquiry;

        $manager = auth()->user();
        $restaurant = Restaurant::where('manager_id',$manager->id)->first();

        $inquiry->restaurant_id = $restaurant->id;
        $inquiry->content = $request->content;

        $inquiry->save();

        return response()->json(['status'=>'success', 'message'=>'inquiry added']);
    }

    function searchCustomer($q)
    {        
        $customers = User::where('name', 'like', '%'.$q.'%')->where('role', 'customer')->get();
        
        return response()->json(['customers' => $customers]);
    }

    function getCuisines()
    {        
        $cuisines = Cuisine::all();

        return response()->json(['cuisines' => $cuisines]);
    }
}

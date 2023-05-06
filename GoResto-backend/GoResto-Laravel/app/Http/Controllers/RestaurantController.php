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

class RestaurantController extends Controller
{
    function uploadLogo(Request $request)
    {
        $manager = auth()->user();

        $restaurant = Restaurant::where('manager_id', $manager->id)->first();

        if ($request->hasFile('logo')) {
            
            $file = $request->file('logo');
            $fileName = $manager->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('public/logos', $fileName);
            $logoUrl = url(Storage::url('public/logos/' . $fileName));
    
            return response()->json(['status' => 'success', 'message' => $logoUrl]);
        } else {
            return response()->json(['status' => 'failure', 'message' => 'No file uploaded.'], 400);
        }
    }

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
                // return redirect()->back()->withInput()->withErrors(['name'=>'name taken']);
            }
            $restaurant = new Restaurant;
            $restaurant->name = $request->name;
            $logo = $this->uploadLogo($request);
            $restaurant->logo = $logo->getData()->message;
            $restaurant->location = $request->location;
            $restaurant->number_of_tables = $request->number_of_tables;
            $restaurant->manager_id = $manager->id;
            $restaurant->deposit = $request->deposit;
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
        }
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
            // return redirect()->back()->withInput()->withErrors(['name'=>'name taken']);
        }      

            $menuItem = new MenuItem;

            $menuItem->menu_id = $menu_id;
            $menuItem->name = $request->name;
            $image = $this->uploadLogo($request);
            $menuItem->image = $image->getData()->message;
            $menuItem->description = $request->description;
            $menuItem->price = $request->price;
            $menuItem->category = $request->category;
            $menuItem->cuisine = $request->cuisine;

            $menuItem->save();

            return response()->json(['status' => 'success', 'message' => $menuItem]);
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

    function updateRestaurant(Request $request)
    {
        $manager = auth()->user();

        try{
            $request->validate(['name' => 'unique:restaurants']);
        } catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(['status' => 'failure', 'message' => 'taken'], 400);
            // return redirect()->back()->withInput()->withErrors(['name'=>'name taken']);
        }

        $restaurant = Restaurant::where('manager_id', $manager->id)->first()->update(['name' => $request->name, 'logo' => $request->logo, 'location' => $request->location, 'number_of_tables' => $request->number_of_tables, 'deposit' => $request->deposit]);

        // $restaurant = Restaurant::where('manager_id', $manager->id)->first();

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

    function calculateRating()
    {
        $manager = auth()->user();
        
        $restaurant_id = Restaurant::where('manager_id', $manager->id)->first()->id;

        $countRatings = Review::where('restaurant_id', $restaurant_id)->count();
        $sumRatings = Review::where('restaurant_id', $restaurant_id)->sum('rating');
        $rating = $sumRatings/$countRatings;

        Restaurant::find($restaurant_id)->update(['rating' => $rating]);

        return response()->json(['rating' => $rating, 'number_of_ratings'=> $countRatings]);
    }

    function getMenu()
    {
        $manager = auth()->user();
        
        $restaurant = Restaurant::where('manager_id', $manager->id)->first();
        $menu_id = Menu::where('restaurant_id', $restaurant->id)->first()->id;
        $menuItems = MenuItem::where('menu_id', $menu_id)->where('enabled', true)->get();

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
}

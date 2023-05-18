<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use App\Models\Reservation;
use App\Models\Restaurant;
use App\Models\MenuItem;
use App\Models\Comment;
use App\Models\Review;
use App\Models\Menu;
use App\Models\User;

class CustomerController extends Controller
{
    function getCuisines()
    {
        $cuisines = MenuItem::pluck('cuisine')->unique();
            
        return response()->json(['cuisines' => $cuisines]);
    }

    function filterByCuisine($cuisine)
    {
        $menuItems = MenuItem::where('cuisine', $cuisine)->with('menu')->get();

        $restaurants = $menuItems->pluck('menu.restaurant_id')->unique();

        $restaurants = Restaurant::whereIn('id', $restaurants)->get();

        return response()->json(['restaurants' => $restaurants]);
    }
    
    function filterByPrice($minimum, $maximum)
    {
        $restaurants = Restaurant::whereBetween('deposit', [$minimum, $maximum])->where('approved', true)->get();
        
        return response()->json(['restaurants' => $restaurants]);
    }

    function filterByLocation($location)
    {
        $restaurants = Restaurant::where('location', 'like', '%'.$location.'%')->where('approved', true)->get();

        return response()->json(['restaurants' => $restaurants]);
    }

    function filterByRating($minimum, $maximum)
    {
        $restaurants = Restaurant::whereBetween('rating', [$minimum, $maximum])->where('approved', true)->get();
        
        return response()->json(['restaurants' => $restaurants]);
    }
    
    function getRestaurants()
    {
        $restaurants = Restaurant::where('approved', true)->with(['menu', 'review'])->withCount('review')->get();
        
        return response()->json(['restaurants' => $restaurants]);
    }

    function searchRestaurant($q, $cuisine = null)
    {
        if($cuisine)
        {
            $menuItems = MenuItem::where('cuisine', $cuisine)->with('menu')->get();

            $restaurantIds = $menuItems->pluck('menu.restaurant_id')->unique();

            $restaurants = Restaurant::whereIn('id', $restaurantIds)->where('approved', true)->where('name', 'like', '%'.$q.'%')->get();
            
        }
        else $restaurants = Restaurant::where('name', 'like', '%'.$q.'%')->where('approved', true)->get();
        
        return response()->json(['restaurants' => $restaurants]);
    }

    function searchMenuItem($q, $restaurant_id)
    {
        $menu_id = Restaurant::find($restaurant_id)->menu_id;
        
        $menuItems = MenuItem::where('name', 'like', '%'.$q.'%')->where('menu_id', $menu_id)->get();
        
        return response()->json(['menuItems' => $menuItems]);
    }

    function getRestaurant($restaurant_id)
    {
            $restaurant = Restaurant::find($restaurant_id);
            
            return response()->json(['restaurant' => $restaurant]);
    }

    function getMenu($restaurant_id)
    {
            $menu = Menu::where('restaurant_id', $restaurant_id)->with('menuItem')->first();
            $menuItems = MenuItem::where('menu_id', $menu->id)->where('enabled', true)->get();
            
            return response()->json(['menu' => $menuItems]);
    }

    function filterMenuByCategory($category){

        $menuItems = MenuItem::where('category', $category)->with('menu')->get();

        return response()->json(['menuItems' => $menuItems]);
    }

    function filterMenuByCuisine($cuisine){

        $menuItems = MenuItem::where('cuisine', $cuisine)->with('menu')->get();

        return response()->json(['menuItems' => $menuItems]);
    }

    function reserveTable(Request $request, $restaurant_id)
    {
        $customer = auth()->user();

        $restaurant = Restaurant::find($restaurant_id);
        $countReservationTables = Reservation::where('restaurant_id', $restaurant->id)->sum('number_of_tables');

        $seats_per_table = floor($restaurant->number_of_seats / $restaurant->number_of_tables);
        $reservation_number_of_tables = ceil($request->count/$seats_per_table);

        if($countReservationTables + $reservation_number_of_tables > $restaurant->number_of_tables) return response()->json(['status' => 'failure', 'message' => 'no tables available'], 401);
       
        $reservation = new Reservation;
        $reservation->restaurant_id = $restaurant_id;
        $reservation->customer_id = $customer->id;
        $reservation->date = $request->date;
        $reservation->time = $request->time;
        $reservation->count = $request->count;
        $reservation->number_of_tables = $reservation_number_of_tables;
        $reservation->save();

        return response()->json(['status' => 'success', 'message' => 'table reserved']);
    
    }

    function getReservations()
    {
        $customer = auth()->user();

        $reservations = Reservation::where('customer_id', $customer->id)->with('restaurant')->get();

        return response()->json(['reservations' => $reservations]);
    }

    function cancelReservation($reservation_id)
    {
        $reservation = Reservation::find($reservation_id);

        if(!$reservation) return response()->json(['status' => 'failure', 'message' => 'not found']);
        else
        {
            $reservation->delete();

            return response()->json(['status' => 'success', 'message' => 'reservation cancelled']);
        }
    }

    function updateReservation($reservation_id, Request $request)
    {
        $reservation = Reservation::find($reservation_id);

        if(!$reservation) return response()->json(['status' => 'failure', 'message' => 'not found']);
        else
        {
            $reservation->update(['date' => $request->date, 'time' => $request->time, 'count' => $request->count]);

            // 'number_of_tables' => $request->number_of_tables

            // $reservation = Reservation::find($reservation_id);

            return response()->json(['status' => 'success', 'message' => 'reservation updated']);
        }
    }
    
    function rateRestaurant(Request $request, $restaurant_id)
    {
        $customer = auth()->user();

        $review = Review::where(['restaurant_id'=> $restaurant_id, 'customer_id'=> $customer->id])->first();
        if($review) $review->delete();
        
        $review = new Review;
        $review->restaurant_id = $restaurant_id;
        $review->customer_id = $customer->id;
        $review->content = $request->content;
        $review->rating = $request->rating;
        $review->save();

        $countRatings = Review::where('restaurant_id', $restaurant_id)->count();
        $sumRatings = Review::where('restaurant_id', $restaurant_id)->sum('rating');
        $rating = $sumRatings/$countRatings;

        Restaurant::find($restaurant_id)->update(['rating' => $rating]);

        return response()->json(['status' => 'success', 'message' => 'review added', 'review' => $review]);
    }

    function getReviews($restaurant_id)
    {
        $reviews = Review::with('comment', 'comment.user', 'user')->where('restaurant_id', $restaurant_id)->get();

        if(!$reviews) return response()->json('no reviews');
        
        return response()->json(['reviews' => $reviews]);
    }

    function addComment(Request $request, $review_id)
    {
        $customer = auth()->user();

        $comment = new Comment;
        $comment->review_id = $review_id;
        $comment->user_id = $customer->id;
        $comment->content = $request->content;
        $comment->save();

        return response()->json(['status' => 'success', 'message' => 'comment added']);
    }

    function getAvailabilities($restaurant_id, $selectedDate)
    {
        $time = ['10:00:00', '12:00:00', '14:00:00', '16:00:00', '18:00:00', '20:00:00', '22:00:00', '00:00:00'];
        $reservedTime = Reservation::where('restaurant_id', $restaurant_id)->where('date', $selectedDate)->whereIn('time', $time)->pluck('time')->toArray();
        $availableTime = array_diff($time, $reservedTime);
        
        return response()->json(['availabilities' => array_values($availableTime)]);
    }

    function getCustomerCount()
    {}
}

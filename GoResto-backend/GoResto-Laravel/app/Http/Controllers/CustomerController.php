<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Restaurant;
use App\Models\Menu;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\Comment;

class CustomerController extends Controller
{
    function getRestaurants(){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $restaurants = Restaurant::where('approved', true)->with('menu')->get();
            
            return response()->json(['restaurants' => $restaurants]);
        }
    }

    public function searchRestaurant(Request $request){
        $query = $request->input('q');

        $restaurants = Restaurant::where('name', 'like', '%'.$query.'%')->get();
        
        return response()->json($restaurants);
    }

    function getRestaurant($restaurant_id){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $restaurant = Restaurant::find($restaurant_id);
            
            return response()->json(['restaurant' => $restaurant]);
        }
    }

    function reserveTable(Request $request, $restaurant_id){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $restaurant = Restaurant::find($restaurant_id);
            $countReservations = Reservation::where('restaurant_id', $restaurant_id)->count();

            if($countReservations == $restaurant->number_of_tables) return response()->json(['status' => 'failure', 'message' => 'no tables available']);
            else
            {
                $reservation = new Reservation;
                $reservation->restaurant_id = $restaurant_id;
                $reservation->customer_id = $customer->id;
                $reservation->date = $request->date;
                $reservation->time = $request->time;
                $reservation->count = $request->count;
                $reservation->save();

                return response()->json(['status' => 'success', 'message' => 'table reserved', 'reservation' => $reservation]);
            }
        }
    }

    function cancelReservation($reservation_id){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $reservation = Reservation::find($reservation_id);

            if(!$reservation) return response()->json(['status' => 'failure', 'message' => 'not found']);
            else
            {
                $reservation->delete();

                return response()->json(['status' => 'success', 'message' => 'reservation cancelled']);
            }
        }
    }

    function rateRestaurant(Request $request, $restaurant_id){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            // Review::where(['restaurant_id'=> $restaurant_id, 'customer_id'=> $customer->id])->update(["content" => $request->content]);
            $review = Review::where(['restaurant_id'=> $restaurant_id, 'customer_id'=> $customer->id])->first();
            if($review) $review->delete();
        
            $review = new Review;
            $review->restaurant_id = $restaurant_id;
            $review->customer_id = $customer->id;
            $review->content = $request->content;
            $review->rating = $request->rating;
            $review->save();

            // $restaurant = Restaurant::find($restaurant_id);

            // $review = Review::where(['restaurant_id'=> $restaurant_id, 'customer_id'=> $customer->id])->first();

            return response()->json(['status' => 'success', 'message' => 'review added', 'review' => $review]);
        }
    }

    function calculateRating($restaurant_id){
        $countRatings = Review::where('restaurant_id', $restaurant_id)->count();
        $sumRatings = Review::where('restaurant_id', $restaurant_id)->sum('rating');

        $rating = $sumRatings/$countRatings;
        Restaurant::find($restaurant_id)->update(['rating' => $rating]);
        return response()->json(['rating' => $rating]);
    }

    function getReviews($restaurant_id){
        $reviews = Review::where('restaurant_id', $restaurant_id)->get();

        if(!$reviews) return response()->json('no reviews');
        
        return response()->json(['reviews' => $reviews]);
    }

    function addComment(Request $request, $review_id){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $comment = new Comment;
            $comment->review_id = $review_id;
            $comment->user_id = $customer->id;
            $comment->content = $request->content;
            $comment->save();

            return response()->json(['status' => 'success', 'message' => 'comment added', 'comment' => $comment]);
        }
    }
}

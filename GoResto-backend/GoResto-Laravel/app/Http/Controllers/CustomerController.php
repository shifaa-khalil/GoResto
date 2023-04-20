<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Restaurant;
use App\Models\Menu;
use App\Models\Reservation;

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

    function reserveTable(Request $request, $restaurant_id){
        $customer = auth()->user();

        if(!$customer) return response()->json(['error' => 'Unauthorized'], 401);
        else
        {
            $restaurant = Restaurant::find($restaurant_id);
            $count = Reservation::where('restaurant_id', $restaurant_id)->count();

            if($count == $restaurant->number_of_tables) return response()->json(['status' => 'failure', 'message' => 'no tables available']);
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
}

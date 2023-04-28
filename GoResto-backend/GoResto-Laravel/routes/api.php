<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login/{role}', 'login');
    Route::post('/register/{role}', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

// Route::get('/forgot-password', function () {
//     return view('auth.forgot-password');
// })->middleware('guest')->name('password.request');

Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->middleware('guest')->name('password.email');

// Route::get('/reset-password/{token}', function (string $token) {
//     return view('auth.reset-password', ['token' => $token]);
// })->middleware('guest')->name('password.reset');

Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->middleware('guest')->name('password.update');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/getChats', [ChatController::class, 'getChats']);
    Route::post('/createChat', [ChatController::class, 'createChat']);
    Route::post('/sendMessage', [ChatController::class, 'sendMessage']);

    Route::middleware(['manager'])->group(function(){
        Route::put('/updateRestaurant', [RestaurantController::class,'updateRestaurant']);
        Route::post('/addRestaurant', [RestaurantController::class, 'addRestaurant']);
        Route::post('/uploadLogo', [RestaurantController::class, 'uploadLogo']);
        Route::post('/addMenuItem', [RestaurantController::class, 'addMenuItem']);
        Route::get('/getReservations', [RestaurantController::class, 'getReservations']);
        Route::put('/disableMenuItem/{menu_item_id}', [RestaurantController::class, 'disableMenuItem']);
        Route::put('/enableMenuItem/{menu_item_id}', [RestaurantController::class, 'enableMenuItem']);
        Route::put('/updateMenuItem/{menu_item_id}', [RestaurantController::class, 'updateMenuItem']);
        Route::put('/calculateRating', [RestaurantController::class, 'calculateRating']);
        Route::get('/getMenu', [RestaurantController::class, 'getMenu']);
        Route::get('/getRestaurant', [RestaurantController::class, 'getRestaurant']);
    
    });

    Route::middleware(['customer'])->group(function(){
        Route::get('/getCuisines', [CustomerController::class, 'getCuisines']);
        Route::get('/getRestaurants', [CustomerController::class, 'getRestaurants']);
        Route::get('/searchRestaurant/{q}', [CustomerController::class, 'searchRestaurant']);
        Route::get('/filterByPrice/{minimum}/{maximum}', [CustomerController::class, 'filterByPrice']);
        // Route::get('/filterByLocation', [CustomerController::class, 'filterByLocation']);
        Route::get('/filterByRating/{min_rating}/{max_rating}', [CustomerController::class, 'filterByRating']);
        Route::get('/filterByCuisine/{cuisine}', [CustomerController::class, 'filterByCuisine']);
        Route::get('/getRestaurant/{restaurant_id}', [CustomerController::class, 'getRestaurant']);
        Route::get('/getMenu/{restaurant_id}', [CustomerController::class, 'getMenu']);
        Route::post('/reserveTable/{restaurant_id}', [CustomerController::class, 'reserveTable']);
        Route::get('/getReservations', [CustomerController::class, 'getReservations']);
        Route::delete('/cancelReservation/{reservation_id}', [CustomerController::class, 'cancelReservation']);
        Route::post('/rateRestaurant/{restaurant_id}', [CustomerController::class, 'rateRestaurant']);
        Route::get('/getReviews/{restaurant_id}', [CustomerController::class, 'getReviews']);
        Route::post('/addComment/{review_id}', [CustomerController::class, 'addComment']);
    });

    Route::middleware(['admin'])->group(function(){
        Route::get('getRequests',[AdminController::class,'getRequests']);
        Route::put('approveRequest/{id}',[AdminController::class,'approveRequest']);
        Route::delete('rejectRequest/{id}',[AdminController::class,'rejectRequest']);
        Route::delete('deleteRestaurant/{restaurant_id}',[AdminController::class,'deleteRestaurant']);
    });
});
?>
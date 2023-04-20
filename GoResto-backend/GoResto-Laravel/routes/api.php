<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('/register/{role}', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/getChats', [ChatController::class, 'getChats']);
    Route::post('/createChat', [ChatController::class, 'createChat']);
    Route::post('/sendMessage', [ChatController::class, 'sendMessage']);
    Route::post('/addRestaurant', [RestaurantController::class, 'addRestaurant']);
    Route::post('/addMenuItem', [RestaurantController::class, 'addMenuItem']);
    // Route::get('/getRequests', [AdminController::class, 'getRequests']);
    // Route::post('/approveRequest/{id}', [AdminController::class, 'approveRequest']);
    // Route::post('/rejectRequest/{id}', [AdminController::class, 'rejectRequest']);
    Route::get('/getCategories', [CustomerController::class, 'getCategories']);
    Route::get('/getRestaurants', [CustomerController::class, 'getRestaurants']);
    Route::post('/reserveTable/{restaurant_id}', [CustomerController::class, 'reserveTable']);
    Route::post('/cancelReservation/{reservation_id}', [CustomerController::class, 'cancelReservation']);
    Route::post('/searchRestaurant', [CustomerController::class, 'searchRestaurant']);
    Route::get('/getRestaurant/{restaurant_id}', [CustomerController::class, 'getRestaurant']);
    Route::get('/getMenu/{restaurant_id}', [CustomerController::class, 'getMenu']);
    Route::post('/rateRestaurant/{restaurant_id}', [CustomerController::class, 'rateRestaurant']);
    Route::post('/calculateRating/{restaurant_id}', [CustomerController::class, 'calculateRating']);
    Route::post('/getReviews/{restaurant_id}', [CustomerController::class, 'getReviews']);
    Route::post('/addComment/{review_id}', [CustomerController::class, 'addComment']);

});

Route::get('getRequests',[AdminController::class,'getRequests'])->middleware('admin');
Route::post('approveRequest/{id}',[AdminController::class,'approveRequest'])->middleware('admin');
Route::post('rejectRequest/{id}',[AdminController::class,'rejectRequest'])->middleware('admin');

// Route::group(['middleware' => 'auth:api', 'admin'], function () {
//     Route::get('/getRequests', [AdminController::class, 'getRequests']);
//     Route::post('/approveRequest/{id}', [AdminController::class, 'approveRequest']);
//     Route::post('/rejectRequest/{id}', [AdminController::class, 'rejectRequest']);
// });

?>
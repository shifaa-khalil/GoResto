<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\Auth\ForgotPasswordController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('/register/{role}', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

// Route::post('/password/reset', [App\Http\Controllers\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/forgotPassword', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('/resetPassword', [ResetPasswordController::class, 'reset']);

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/getChats', [ChatController::class, 'getChats']);
    Route::post('/createChat', [ChatController::class, 'createChat']);
    Route::post('/sendMessage', [ChatController::class, 'sendMessage']);
});

    Route::get('/getCategories', [CustomerController::class, 'getCategories'])->middleware('customer');
    Route::get('/getRestaurants', [CustomerController::class, 'getRestaurants'])->middleware('customer');
    Route::post('/reserveTable/{restaurant_id}', [CustomerController::class, 'reserveTable'])->middleware('customer');
    Route::post('/cancelReservation/{reservation_id}', [CustomerController::class, 'cancelReservation'])->middleware('customer');
    Route::post('/searchRestaurant', [CustomerController::class, 'searchRestaurant'])->middleware('customer');
    Route::get('/getRestaurant/{restaurant_id}', [CustomerController::class, 'getRestaurant'])->middleware('customer');
    Route::get('/getMenu/{restaurant_id}', [CustomerController::class, 'getMenu'])->middleware('customer');
    Route::post('/rateRestaurant/{restaurant_id}', [CustomerController::class, 'rateRestaurant'])->middleware('customer');
    Route::post('/calculateRating/{restaurant_id}', [CustomerController::class, 'calculateRating'])->middleware('customer');
    Route::post('/getReviews/{restaurant_id}', [CustomerController::class, 'getReviews'])->middleware('customer');
    Route::post('/addComment/{review_id}', [CustomerController::class, 'addComment'])->middleware('customer');
    Route::post('/filterByPrice', [CustomerController::class, 'filterByPrice'])->middleware('customer');
    Route::get('/filterByLocation', [CustomerController::class, 'filterByLocation'])->middleware('customer');
    Route::get('/filterByRating', [CustomerController::class, 'filterByRating'])->middleware('customer');
    Route::post('/fiterByCuisine', [CustomerController::class, 'fiterByCuisine'])->middleware('customer');

    

Route::post('/updateRestaurant', [RestaurantController::class,'updateRestaurant'])->middleware('manager');
Route::post('/addRestaurant', [RestaurantController::class, 'addRestaurant'])->middleware('manager');
Route::post('/addMenuItem', [RestaurantController::class, 'addMenuItem'])->middleware('manager');
Route::get('/getReservations/{restaurant_id}', [RestaurantController::class, 'getReservations'])->middleware('manager');
Route::post('/disableMenuItem/{menu_item_id}', [RestaurantController::class, 'disableMenuItem'])->middleware('manager');
Route::post('/enableMenuItem/{menu_item_id}', [RestaurantController::class, 'enableMenuItem'])->middleware('manager');
Route::post('/updateMenuItem/{menu_item_id}', [RestaurantController::class, 'updateMenuItem'])->middleware('manager');

Route::get('getRequests',[AdminController::class,'getRequests'])->middleware('admin');
Route::post('approveRequest/{id}',[AdminController::class,'approveRequest'])->middleware('admin');
Route::post('rejectRequest/{id}',[AdminController::class,'rejectRequest'])->middleware('admin');
Route::post('deleteRestaurant/{restaurant_id}',[AdminController::class,'deleteRestaurant'])->middleware('admin');


// Route::group(['middleware' => 'auth:api', 'admin'], function () {
//     Route::get('/getRequests', [AdminController::class, 'getRequests']);
//     Route::post('/approveRequest/{id}', [AdminController::class, 'approveRequest']);
//     Route::post('/rejectRequest/{id}', [AdminController::class, 'rejectRequest']);
// });

?>
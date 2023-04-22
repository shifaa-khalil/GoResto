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

Route::middleware(['customer'])->group(function(){
    Route::get('/getCuisines', [CustomerController::class, 'getCuisines']);
    Route::get('/getRestaurants', [CustomerController::class, 'getRestaurants']);
    Route::get('/searchRestaurant/{q}', [CustomerController::class, 'searchRestaurant']);
    Route::get('/filterByPrice/{minimum}/{maximum}', [CustomerController::class, 'filterByPrice']);
    // Route::get('/filterByLocation', [CustomerController::class, 'filterByLocation']);
    // Route::get('/filterByRating/{min_rating}/{max_rating}', [CustomerController::class, 'filterByRating']);
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

});

Route::middleware(['admin'])->group(function(){
    Route::get('getRequests',[AdminController::class,'getRequests']);
    Route::put('approveRequest/{id}',[AdminController::class,'approveRequest']);
    Route::delete('rejectRequest/{id}',[AdminController::class,'rejectRequest']);
    Route::delete('deleteRestaurant/{restaurant_id}',[AdminController::class,'deleteRestaurant']);
});



// Route::group(['middleware' => 'auth:api', 'admin'], function () {
//     Route::get('/getRequests', [AdminController::class, 'getRequests']);
//     Route::post('/approveRequest/{id}', [AdminController::class, 'approveRequest']);
//     Route::post('/rejectRequest/{id}', [AdminController::class, 'rejectRequest']);
// });

?>
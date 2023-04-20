<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\AdminController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
});

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/getChats', [ChatController::class, 'getChats']);
    Route::post('/createChat', [ChatController::class, 'createChat']);
    Route::post('/sendMessage', [ChatController::class, 'sendMessage']);
    Route::post('/addRestaurant', [RestaurantController::class, 'addRestaurant']);
    Route::post('/addMenuItem', [RestaurantController::class, 'addMenuItem']);
    Route::get('/getRequests', [AdminController::class, 'getRequests']);
    Route::post('/approveRequest/{id}', [AdminController::class, 'approveRequest']);
    Route::post('/rejectRequest/{id}', [AdminController::class, 'rejectRequest']);
})
?>
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

Route::get('/getChats', [ChatController::class, 'getChats']);
Route::post('/createChat', [ChatController::class, 'createChat']);
Route::post('/sendMessage', [ChatController::class, 'sendMessage']);
Route::middleware('auth:api')->post('/addRestaurant', [RestaurantController::class, 'addRestaurant']);
Route::middleware('auth:api')->post('/addMenuItem', [RestaurantController::class, 'addMenuItem']);
Route::middleware('auth:api')->get('/getRequests', [AdminController::class, 'getRequests']);
Route::middleware('auth:api')->post('/approveRequest/{id}', [AdminController::class, 'approveRequest']);
Route::middleware('auth:api')->post('/rejectRequest/{id}', [AdminController::class, 'rejectRequest']);

?>
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\billController;
use App\Http\Controllers\LoginController;
// use App\Http\Controllers\MenuController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource("bill",billController::class);
Route::get("nonvegmain",[billController::class,"nonvegmain"]);
Route::get("vegmain",[billController::class,"vegmain"]);
Route::get("vegs",[billController::class,"vegs"]);
Route::get("nonvegs",[billController::class,"nonvegs"]);
Route::post("reg",[LoginController::class,"register"]);
Route::post("login",[LoginController::class,"login"]);

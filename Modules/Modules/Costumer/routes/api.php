<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Modules\customer\Http\Controllers\CustomerController;

/*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
*/

// Route::middleware(['auth:sanctum'])->prefix('v1')->name('api.')->group(function () {
//     Route::get('costumer', fn (Request $request) => $request->user())->name('costumer');
// });
Route::post('/Add-customer', [CustomerController::class, 'AddCustomer']);
Route::get('/list-customer', [CustomerController::class, 'CustomersList']);
Route::delete('/delete-customer/{customer_id}', [CustomerController::class, 'deleteCustomer']);
Route::get('/edit-customer/{customer_id}', [CustomerController::class, 'updateCustomerId']);
Route::post('/Update-customer/{customer_id}', [CustomerController::class, 'updateCustomer']);



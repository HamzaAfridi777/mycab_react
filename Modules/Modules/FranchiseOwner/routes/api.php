<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Modules\FranchiseOwner\Http\Controllers\FranchiseController;

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
//     Route::get('franchiseowner', fn (Request $request) => $request->user())->name('franchiseowner');
// });
Route::post('/add-franchise', [FranchiseController::class, 'addFranchise']);
Route::get('/list-franchise', [FranchiseController::class, 'listFranchise']);
Route::delete('/delete-franchise/{id}', [FranchiseController::class, 'deleteFranchise']);
Route::post('/Update-franchise/{id}', [FranchiseController::class, 'UpdateFranchise']);
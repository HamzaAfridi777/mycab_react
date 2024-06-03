<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\DriverController;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\FleetsController;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\AssignFleetsController;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\TAassignFleets;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\TeamAdminController;
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
//     Route::get('superadmin', fn (Request $request) => $request->user())->name('superadmin');
// });


//////////drivers
Route::post('/add-new-driver', [DriverController::class, 'addNewDriver']);
Route::get('/drivers-list', [DriverController::class, 'DriversList']);
Route::delete('/delete-driver/{id}', [DriverController::class, 'deleteDriver']);
Route::post('/edit-driver/{id}', [DriverController::class, 'editDriver']);
//////////fleets
Route::post('/add-new-fleet', [FleetsController::class, 'addNewFleet']);
Route::get('/fleets-list', [FleetsController::class, 'FleetList']);
Route::delete('/delete-fleet/{fleet_id}', [FleetsController::class, 'deleteFleet']);
Route::get('/update-fleet/{fleet_id}', [FleetsController::class, 'updateFleet']);
Route::post('/edit-fleet/{fleet_id}', [FleetsController::class, 'editFleet']);
////////////assign_fleets
Route::get('/assign-fleets-list', [AssignFleetsController::class, 'assignFleetlist']);
Route::post('/add-assign-fleet', [AssignFleetsController::class, 'addAssignFleet']);
Route::delete('/delete-assign-fleet/{assign_fleet_id}', [AssignFleetsController::class, 'deleteAssignFleet']);
Route::post('/edit-assign-fleet/{assign_fleet_id}', [AssignFleetsController::class, 'editAssignFleet']);
////////Team admin assign fleets list
Route::post('/TA-assign-fleets', [TAassignFleets::class, 'assignNewfleet']);
Route::get('/TA-assign-fleets-list', [TAassignFleets::class, 'assignfleetList']);
Route::delete('/TA-assign-fleets-delete/{id}', [TAassignFleets::class, 'deleteAssignFleet']);
Route::post('/TA-assign-fleets-Update/{id}', [TAassignFleets::class, 'updateAssignFleet']);
////////Team admin
Route::get('/teamAdmin-list', [TeamAdminController::class, 'getTeamAdminUsers']);
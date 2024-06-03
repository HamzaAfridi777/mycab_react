<?php

use Illuminate\Support\Facades\Route;
use Modules\Taskadmin\app\Http\Controllers\TaskadminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([], function () {
    Route::resource('taskadmin', TaskadminController::class)->names('taskadmin');
});

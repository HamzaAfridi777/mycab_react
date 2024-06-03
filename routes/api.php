<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\UserPermissionsController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\SecondaryPermissionController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\DriverController;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\FleetsController;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\AssignFleetsController;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\TAassignFleets;
use App\Http\Controllers\Modules\SuperAdmin\Http\Controllers\TeamAdminController;
use App\Http\Controllers\FranchiseSystemController;
use App\Http\Controllers\AssignFranchisePermissioController;
use App\Http\Controllers\FranchisePermissionController;
use App\Http\Controllers\Modules\customer\Http\Controllers\CustomerController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\RideController;
use App\Http\Controllers\TeamAdmin\AttendanceController;
use App\Http\Controllers\TeamAdmin\IssuesController;
use App\Http\Controllers\TeamAdmin\AccidentController;
use App\Http\Controllers\TeamAdmin\TaxiDrivenReports;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SalesJouranlController;
use App\Http\Controllers\PurchaseJournalController;
use App\Http\Controllers\AccountsRecieveableController;
use App\Http\Controllers\AccountsPayableController;


use App\Http\Controllers\UserActivityController;


//get messages from database

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

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

//login logout
// Auth::routes(['verify' => true]);
///////////email verification

Route::get('/verify-email/{user}', [UserAuthController::class, 'verifyEmail'])->name('verify.email');



Route::post('/login',[UserAuthController::class,'login']);
Route::post('/logout',[UserAuthController::class,'logout'])->middleware('auth:sanctum');
//user routes
Route::post('/add-new-user', [UserAuthController::class, 'addNewUser'])->middleware('auth:sanctum');
Route::get('/users-list', [UserAuthController::class, 'usersList'])->middleware('auth:sanctum');
Route::delete('/delete-user/{user_id}', [UserAuthController::class, 'deleteUser'])->middleware('auth:sanctum');
Route::get('/users/{user_id}/edit', [UserAuthController::class, 'usersListId']);
Route::post('/edit-new-user/{user_id}', [UserAuthController::class, 'editNewUser'])->middleware('auth:sanctum');
Route::get('/users-view/{user_id}', [UserAuthController::class, 'usersView'])->middleware('auth:sanctum');

// Fetch activities for a specific task admin by user ID
Route::get('/user-activities/{user_id}', [UserActivityController::class, 'getTaskAdminData']);
// Route for fetching team admin data (new)
Route::get('/user-activities/teamadmin/{user_id}', [UserActivityController::class, 'getTeamAdminData']);


/////////////sidebar and header auth user image api
Route::get('/Authuser-image', [UserAuthController::class, 'userImage'])->middleware('auth:sanctum');


///////get roles and permissions data
Route::get('/get-users-data', [UserAuthController::class, 'getUserData']);
///////forget password
Route::post('/send-link', [UserAuthController::class, 'sendLink']);
Route::post('/change-password', [UserAuthController::class, 'changePassword']);
///////token expire notification
Route::post('/token-expire', [UserAuthController::class,  'TokenExpire']);

/////////roles
Route::post('/add-new-role', [RoleController::class, 'addNewRole']);
Route::get('/users-role-list', [RoleController::class, 'usersRoleList']);
Route::delete('/delete-role/{role_id}', [RoleController::class, 'deleteRole']);
Route::get('/update-role/{role_id}', [RoleController::class, 'updateRoleId']);
Route::post('/edit-new-role/{role_id}', [RoleController::class, 'editNewRole']);
Route::get('/role-view/{role_id}', [RoleController::class, 'ViewRole']);
/////////////permissions
Route::post('/add-new-permission', [PermissionController::class, 'addNewUserPermission']);
Route::get('/user-permission-list', [PermissionController::class, 'userPermissionList']);
Route::delete('/delete-permission/{permission_id}', [PermissionController::class, 'deletePermission']);
Route::get('/update-permission/{permission_id}', [PermissionController::class, 'updatePermissionId']);
Route::post('/edit-permission/{permission_id}', [PermissionController::class, 'editPermission']);
Route::get('/view-permission/{permission_id}', [PermissionController::class, 'viewPermission']);
/////////user_roles
Route::get('/user-role-list', [UserRoleController::class, 'userRoleList']);
////////user_permission
Route::get('/user-permissions-list', [UserPermissionsController::class, 'userPermissionsList']);
Route::post('/user-permissions-add', [UserPermissionsController::class, 'addNewUserPermission']);
Route::delete('/user-permissions-delete/{user_permission_id}', [UserPermissionsController::class, 'deleteUserPermission']);
Route::get('/user-permissions-edit/{user_permission_id}', [UserPermissionsController::class, 'usersPermissionListId']);
Route::post('/user-permissions-update/{user_permission_id}', [UserPermissionsController::class, 'usersPermissionUpdate']);
Route::get('/user-permissions-view/{user_permission_id}', [UserPermissionsController::class, 'ViewUserPermissions']);
////////role_permission
Route::get('/role-permissions-list', [RolePermissionController::class, 'rolePermissionsList']);
Route::post('/role-permissions-add', [RolePermissionController::class, 'addNewRolePermission']);
Route::delete('/role-permissions-delete/{role_permission_id}', [RolePermissionController::class, 'deleteRolePermission']);
Route::get('/role-permissions-update/{role_permission_id}', [RolePermissionController::class, 'updateRolePermission']);
Route::post('/role-permissions-edit/{role_permission_id}', [RolePermissionController::class, 'editRolePermission']);
////////secondary permissions
Route::post('/add-new-secondary-permission', [SecondaryPermissionController::class, 'addNewSecondaryPermission']);
Route::get('/user-secondary-permission-list', [SecondaryPermissionController::class, 'secondaryPermissionsList']);
Route::delete('/delete-secondary-permission/{sp_id}', [SecondaryPermissionController::class, 'deleteSecondaryPermission']);
Route::get('/update-secondary-permission/{sp_id}', [SecondaryPermissionController::class, 'updateSpId']);
Route::post('/edit-secondary-permission/{sp_id}', [SecondaryPermissionController::class, 'editSecondaryPermission']);
////////levels
Route::post('/add-new-level', [LevelController::class, 'addNewLevel']);
Route::get('/levels-list', [LevelController::class, 'LevelsList']);
Route::delete('/delete-levels/{level_id}', [LevelController::class, 'deleteLevels']);
Route::get('/update-level/{level_id}', [LevelController::class, 'updateLevelId']);
Route::post('/edit-level/{level_id}', [LevelController::class, 'editLevel']);

//////////drivers
Route::post('/add-new-driver', [DriverController::class, 'addNewDriver']);
Route::get('/drivers-list', [DriverController::class, 'DriversList']);
Route::delete('/delete-driver/{driver_id}', [DriverController::class, 'deleteDriver']);
Route::get('/update-driver/{driver_id}', [DriverController::class, 'updateDriver']);
Route::post('/edit-driver/{driver_id}', [DriverController::class, 'editDriver']);
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
Route::get('/update-assign-fleet/{assign_fleet_id}', [AssignFleetsController::class, 'updateAssignFleet']);
Route::post('/edit-assign-fleet/{assign_fleet_id}', [AssignFleetsController::class, 'editAssignFleet']);
////////Team admin assign fleets list
Route::post('/TA-assign-fleets', [TAassignFleets::class, 'assignNewfleet']);
Route::get('/TA-assign-fleets-list', [TAassignFleets::class, 'assignfleetList']);
Route::delete('/TA-assign-fleets-delete/{TA_assign_fleet_id}', [TAassignFleets::class, 'deleteAssignFleet']);
Route::get('/TA-assign-fleets/{TA_assign_fleet_id}', [TAassignFleets::class, 'updateAssignFleetId']);
Route::post('/TA-assign-fleets-Update/{TA_assign_fleet_id}', [TAassignFleets::class, 'updateAssignFleet']);
////////Team admin in taskadmin dashboard
Route::get('/teamAdmin-list', [TeamAdminController::class, 'getTeamAdminUsers']);
/////////////driver,teamAdmin,taskAdmin list in SuperAdmin dashboard
Route::get('/drivers-list', [DriverController::class,  'driversList']);
Route::get('/TaskAdmin-list', [UserAuthController::class,  'TaskAdminList']);
Route::get('/TeamAdmin-list', [UserAuthController::class,  'TeamAdminList']);
Route::get('/users-summary', [UserAuthController::class,  'getUsersSummary']);
Route::get('/Franchise-owner', [UserAuthController::class,  'franchiseOwner']);
////////////franchise system
Route::post('/add-franchise-system', [FranchiseSystemController::class, 'addFranchiseSystem']);
Route::get('/list-franchiseSystem', [FranchiseSystemController::class, 'listFranchiseSystem']);
Route::delete('/delete-franchiseSystem/{franchiseSystem_id}', [FranchiseSystemController::class, 'deleteFranchiseSystem']);
Route::get('/update-franchiseSystem/{franchiseSystem_id}', [FranchiseSystemController::class, 'editFranchiseSystem']);
Route::post('/edit-new-franchiseSystem/{franchiseSystem_id}', [FranchiseSystemController::class, 'UpdateFranchiseSystem']);
////////////franchise permission
Route::post('/add-Assignfranchise-Permission', [AssignFranchisePermissioController::class, 'addAssignFranchisePermission']);
Route::get('/list-Assignfranchise-Permission', [AssignFranchisePermissioController::class, 'listFranchisePermission']);
Route::delete('/delete-Assignfranchise-Permission/{APTofranchiseSystem_id}', [AssignFranchisePermissioController::class, 'deleteAssignFranchisePermission']);
Route::get('/update-Assignfranchise-Permission/{APTofranchiseSystem_id}', [AssignFranchisePermissioController::class, 'editAssignFranchisePermission']);
Route::post('/edit-new-Assignfranchise-Permission/{APTofranchiseSystem_id}', [AssignFranchisePermissioController::class, 'UpdateAssignFranchisePermission']);

///////////franchise permission
Route::post('/add-franchise-Permission', [FranchisePermissionController::class, 'addFranchisePermission']);
Route::get('/list-franchisePermission', [FranchisePermissionController::class, 'listFranchisePermission']);
Route::delete('/delete-franchisePermission/{franchise_permission_id}', [FranchisePermissionController::class, 'deleteFranchisePermission']);
Route::get('/update-franchisePermission/{franchise_permission_id}', [FranchisePermissionController::class, 'editFranchisePermission']);
Route::post('/edit-new-franchisePermission/{franchise_permission_id}', [FranchisePermissionController::class, 'UpdateFranchisePermission']);
///customer
Route::post('/Add-customer', [CustomerController::class, 'AddCustomer']);
Route::get('/list-customer', [CustomerController::class, 'CustomersList']);
Route::delete('/delete-customer/{customer_id}', [CustomerController::class, 'deleteCustomer']);
Route::get('/edit-customer/{customer_id}', [CustomerController::class, 'updateCustomerId']);
Route::post('/Update-customer/{customer_id}', [CustomerController::class, 'updateCustomer']);

////////////////tasks in franchise owner dashboard
Route::post('/add-new-task', [TaskController::class, 'addTask']);
Route::get('/task-list', [TaskController::class, 'TasksList']);
Route::delete('/delete-task/{task_id}', [TaskController::class, 'deleteTask']);
Route::get('/task-edit/{task_id}', [TaskController::class, 'updateTask']);
Route::post('/edit-new-task/{task_id}', [TaskController::class, 'editTask']);
Route::get('/task-view/{task_id}', [TaskController::class, 'TaskView']);

/////////////ride
Route::post('/add-new-ride', [RideController::class, 'addRide']);
Route::get('/list-ride', [RideController::class, 'usersRideList']);
Route::delete('/delete-ride/{ride_id}', [RideController::class, 'deleteRide']);
Route::get('/update-ride/{ride_id}', [RideController::class, 'updateRide']);
Route::post('/edit-new-ride/{ride_id}', [RideController::class, 'editRide']);
/////////////////////vacant rides
Route::get('/list-vacantRides', [RideController::class, 'VacantRides']);
/////////////////////////////TeamAdmin/Attendance
Route::post('/add-new-attendance', [AttendanceController::class, 'addNewDriverAttendance']);
Route::get('/attendance-list', [AttendanceController::class, 'DriverAttendanceList']);
Route::delete('/delete-attendance/{attendance_id}', [AttendanceController::class, 'deleteDriverAttendance']);
Route::get('/attendance-edit/{attendance_id}', [AttendanceController::class, 'updateDriverAttendance']);
Route::post('/edit-new-attendance/{attendance_id}', [AttendanceController::class, 'editDriverAttendance']);
Route::get('/attendance-view/{attendance_id}', [AttendanceController::class, 'DriverAttendanceView']);
/////////////////////////////TeamAdmin/Attendance
Route::post('/add-new-issue', [IssuesController::class, 'addNewIssues']);
Route::get('/issues-list', [IssuesController::class, 'IssuesList']);
Route::delete('/delete-issues/{issues_id}', [IssuesController::class, 'deleteIssues']);
Route::get('/issues-edit/{issues_id}', [IssuesController::class, 'updateIssues']);
Route::post('/edit-new-issues/{issues_id}', [IssuesController::class, 'editIssues']);
Route::get('/issues-view/{issues_id}', [IssuesController::class, 'IssuesView']);
/////////////////////////////Accidents
Route::post('/add-new-accident', [AccidentController::class, 'addNewAccident']);
Route::get('/accident-list', [AccidentController::class, 'AccidentList']);
Route::delete('/delete-accident/{accident_id}', [AccidentController::class, 'deleteAccident']);
Route::get('/accident-edit/{accident_id}', [AccidentController::class, 'updateAccident']);
Route::post('/edit-new-accident/{accident_id}', [AccidentController::class, 'editAccident']);
Route::get('/accident-view/{accident_id}', [AccidentController::class, 'AccidentView']);
///////////present drivers
Route::get('/presentDrivers-list', [AttendanceController::class, 'getPresentDrivers']);
Route::get('/absentDrivers-list', [AttendanceController::class, 'getAbsentDrivers']);
/////////////////////////////Accidents
Route::post('/add-new-report', [TaxiDrivenReports::class, 'addNewTaxireports']);
Route::get('/reports-list', [TaxiDrivenReports::class, 'TaxireportsList']);
Route::delete('/delete-report/{reports_id}', [TaxiDrivenReports::class, 'deleteTaxireports']);
Route::get('/report-edit/{reports_id}', [TaxiDrivenReports::class, 'updateTaxireports']);
Route::post('/edit-new-report/{reports_id}', [TaxiDrivenReports::class, 'editTaxireports']);
Route::get('/reports-view/{report_id}', [TaxiDrivenReports::class, 'TaxireportsView']);
//////Team admin assign fleets list
Route::post('/TA-assign-fleets', [TAassignFleets::class, 'assignNewfleet']);
Route::get('/TA-assign-fleets-list', [TAassignFleets::class, 'assignfleetList']);
Route::delete('/TA-assign-fleets-delete/{TA_assign_fleet_id}', [TAassignFleets::class, 'deleteAssignFleet']);
Route::get('/TA-assign-fleets/{TA_assign_fleet_id}', [TAassignFleets::class, 'updateAssignFleetId']);
Route::post('/TA-assign-fleets-Update/{TA_assign_fleet_id}', [TAassignFleets::class, 'updateAssignFleet']);

////////////////////////////////chat
Route::post('/send-messages', [ChatController::class, 'sendMessage']);
Route::get('/api/chat-messages', [ChatController::class, 'getChatMessages']);
Route::delete('/delete-chat/{chat_id}', [ChatController::class, 'deleteChat']);

/////////////////////////////salesJouranl
Route::post('/add-new-salesJouranl', [SalesJouranlController::class, 'addSales']);
Route::get('/salesJouranl-list', [SalesJouranlController::class, 'listSalesJouranl']);
Route::delete('/delete-salesJouranl/{sales_jouranl_id}', [SalesJouranlController::class, 'deleteSalesJouranl']);
Route::get('/salesJouranl-edit/{sales_jouranl_id}', [SalesJouranlController::class, 'updateSale']);
Route::post('/edit-new-salesJouranl/{sales_jouranl_id}', [SalesJouranlController::class, 'editSale']);


/////////////////////////////purchaseJouranl
Route::post('/add-new-purchaseJouranl', [PurchaseJournalController::class, 'addPurchase']);
Route::get('/purchaseJouranl-list', [PurchaseJournalController::class, 'listPurchaseJouranl']);
Route::delete('/delete-purchaseJouranl/{purchase_jouranl_id}', [PurchaseJournalController::class, 'deletePurchaseJouranl']);
Route::get('/purchaseJouranl-edit/{purchase_jouranl_id}', [PurchaseJournalController::class, 'updatePurchase']);
Route::post('/edit-new-purchaseJouranl/{purchase_jouranl_id}', [PurchaseJournalController::class, 'editPurchase']);

/////////////////////////////Account
Route::post('/add-new-Account', [AccountsRecieveableController::class, 'addAccounts']);
Route::get('/Accounts-list', [AccountsRecieveableController::class, 'listAccounts']);
Route::delete('/delete-Accounts/{accounts_recieveable_id}', [AccountsRecieveableController::class, 'deleteAccount']);
Route::get('/Accounts-edit/{accounts_recieveable_id}', [AccountsRecieveableController::class, 'updateAccounts']);
Route::post('/edit-new-Accounts/{accounts_recieveable_id}', [AccountsRecieveableController::class, 'editAccounts']);

/////////////////////////////payable
Route::post('/add-new-payable', [AccountsPayableController::class, 'addPayable']);
Route::get('/payable-list', [AccountsPayableController::class, 'listPayable']);
Route::delete('/delete-payable/{accounts_payable_id}', [AccountsPayableController::class, 'deletePayable']);
Route::get('/payable-edit/{accounts_payable_id}', [AccountsPayableController::class, 'updatePayable']);
Route::post('/edit-new-payable/{accounts_payable_id}', [AccountsPayableController::class, 'editPayable']);
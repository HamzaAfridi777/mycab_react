<?php

namespace App\Http\Controllers\Modules\SuperAdmin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Modules\SuperAdmin\Models\Assign_fleets;
use App\Models\Driver;
use App\Models\Fleet;
use Illuminate\Http\Request;

class AssignFleetsController extends Controller
{
public function addAssignFleet(Request $request) {
    $request->validate([
        'driver_id'=> 'required|string',
        'fleet_id'=> 'required|string',
        'is_deleted' => 'nullable|in:delete,not_delete',
    ]);

    $driverId = $request->driver_id;
    $fleetId = $request->fleet_id;
    $isDeleted = isset($request->is_deleted) ? ($request->is_deleted == 'delete' ? 1 : 0) : 0;

    $assignFleet = new Assign_fleets;
    $assignFleet->driver_id = $driverId;
    $assignFleet->fleet_id = $fleetId;
    $assignFleet->is_deleted = $isDeleted;
    $assignFleet->save();

    if ($assignFleet) {
        // Perform inner join with drivers and fleets table
        $result = Assign_fleets::join('drivers', 'assign_fleets.driver_id', '=', 'drivers.driver_id')
                             ->join('fleets', 'assign_fleets.fleet_id', '=', 'fleets.fleet_id')
                             ->where('assign_fleets.driver_id', $driverId)
                             ->where('assign_fleets.fleet_id', $fleetId)
                             ->select('assign_fleets.assign_fleet_id', 'drivers.name as driver_name', 'fleets.name as fleet_name')
                             ->get();

        return response()->json([
            'success'=> true,
            'message'=>'Assign fleets added successfully.',
            'data'=> $result
        ]);   
    } else {
        return response()->json([
            'success'=> false,
            'message'=>'Something went wrong.',
            'data'=> $assignFleet
        ]);      
    }
}

    public function assignFleetlist(){
        $Assignfleets = Assign_fleets::join('fleets', 'assign_fleets.fleet_id', '=', 'fleets.fleet_id')
        ->join('drivers', 'assign_fleets.driver_id', '=', 'drivers.driver_id')
        ->select(
            'assign_fleets.*',
             'drivers.name  as driver_name', 
             'fleets.name as fleets_name'
        )
        ->orderBy('assign_fleets.assign_fleet_id', 'desc')
        ->where('assign_fleets.is_deleted', 0)
        ->paginate(10);
        

        //  echo '<pre>';print_r($Assignfleets);die();
        if($Assignfleets){
            return response()->json([
                'success' => true,
                'message' => 'Assign fleets listed successfully.',
                'data' => $Assignfleets,
                'pagination' => [
                    'total' => $Assignfleets->total(),
                    'per_page' => $Assignfleets->perPage(),
                    'current_page' => $Assignfleets->currentPage(),
                    'last_page' => $Assignfleets->lastPage(),
                    'from' => $Assignfleets->firstItem(),
                    'to' => $Assignfleets->lastItem(),
                ],
            ],200);
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'data' => []
            ],401);
        }
        
    }

    public function deleteAssignFleet(Request $request, $assign_fleet_id)
    {
    $AssignFleet = Assign_fleets::where('assign_fleet_id', $assign_fleet_id)->update(['is_deleted'=>'1']);

    if($AssignFleet){
        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
            'id'=> $assign_fleet_id
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
}
////////////fetch data to update 

public function updateAssignFleet($assign_fleet_id){

    $AssignFleet= Assign_fleets::find($assign_fleet_id);
    if( $AssignFleet){
        return response()->json([
            'success' => true,
            'message' => 'List Permission',
            'data'=>  $AssignFleet
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
    }
public function editAssignFleet(Request $request, $assign_fleet_id)
{
     $request->validate([
        'driver_id' => 'required|string',
        'fleet_id' => 'required|string',
    ]);
    $updatedAssignFleets = Assign_fleets::where('assign_fleet_id', $assign_fleet_id)->first();
    if (!$updatedAssignFleets) {
        return response()->json([
            'success' => false,
            'message' => 'Ride not found.',
            'data' => null,
        ]);
    }

    $assignFleet = new Assign_fleets;
    $assignFleet->driver_id = $request->driver_id;
    $assignFleet->fleet_id = $request->fleet_id;
    $assignFleet->save();
    

   
        // Perform inner join with drivers and fleets table
        $result = Assign_fleets::join('drivers', 'assign_fleets.driver_id', '=', 'drivers.driver_id')
                               ->join('fleets', 'assign_fleets.fleet_id', '=', 'fleets.fleet_id')
                               ->where('assign_fleets.driver_id', $request->driver_id)
                               ->where('assign_fleets.fleet_id', $request->fleet_id)
                               ->orderBy('assign_fleets.assign_fleet_id', 'desc')
                               ->select('assign_fleets.assign_fleet_id',
                                'drivers.name as driver_name', 
                                'fleets.name as fleet_name'
                                )
                               ->get();

        return response()->json([
            'success' => true,
            'message' => 'AssignFleets updated successfully.',
            'data' => $result
        ], 200);
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Attendance updated successfully.' : 'something went wrong',
            'data' => $result,
           ]);
}
    }


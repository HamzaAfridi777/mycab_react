<?php

namespace App\Http\Controllers\Modules\SuperAdmin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Modules\SuperAdmin\Models\Team_admin_assign_fleets;
use App\Models\Modules\SuperAdmin\Models\Fleets;
use App\Models\Modules\SuperAdmin\Models\Team_admin;
use App\Models\User;
use Illuminate\Http\Request;

class TAassignFleets extends Controller
{

     public function assignNewfleet(Request $request)
    {
         $request->validate([
            'fleet_id'=>'required|string',
            'user_id' => 'nullable',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
      
        $fleetsId = $request->fleet_id;
        $user_id = $request->user_id;
        $isDeleted = isset($request->is_deleted) ? ($request->is_deleted== 'delete' ? 1 : 0) : 0;

        $fleetData = new Team_admin_assign_fleets;
            $fleetData->fleet_id = $fleetsId;
            $fleetData->user_id =$user_id;
            $fleetData->is_deleted = $isDeleted;
            $fleetData->save();

            if($fleetData){

                $result = Team_admin_assign_fleets::join('fleets', 'team_admin_assign_fleets.fleet_id', '=', 'fleets.fleet_id')
                ->join('users', 'team_admin_assign_fleets.user_id', '=', 'users.user_id')
                ->where('team_admin_assign_fleets.fleet_id', $fleetsId)
                ->select('team_admin_assign_fleets.TA_assign_fleet_id', 'fleets.name as fleet_name','users.name  as team_admin')
                ->get();
        
            return response()->json([
                'success' => true,
                'message' => 'Fleet assigned successfully.',
                'data' => $result
            ],200);
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
                'data' => $fleetData
            ],401);
        }
        
    }


    public function assignfleetList(){  
        // $users = User::where('user_id','=',$Assignfleets->user_id)->first();
        // $fleets = Fleets::where('fleet_id','=', $Assignfleets->fleet_id)->first();
        $Assignfleets = Team_admin_assign_fleets::join('fleets', 'team_admin_assign_fleets.fleet_id', '=', 'fleets.fleet_id')
        ->join('users', 'team_admin_assign_fleets.user_id', '=', 'users.user_id')
        ->select(
            'team_admin_assign_fleets.*',
             'users.name  as team_admin', 
             'fleets.name as fleets_name'
        )
        ->orderBy('team_admin_assign_fleets.TA_assign_fleet_id', 'desc')
        ->where('team_admin_assign_fleets.is_deleted', 0)
        ->paginate(10);
        
        // dd($Assignfleets);
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

    public function deleteAssignFleet(Request $request, $TA_assign_fleet_id)
    {
        $assignfleets = Team_admin_assign_fleets::where('TA_assign_fleet_id', $TA_assign_fleet_id)->update(['is_deleted'=>'1']);

        if($assignfleets){
            return response()->json([
                'success' => true,
                'message' => 'Fleet deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }
///////////update
public function updateAssignFleetId($TA_assign_fleet_id){
    $TAassignfleets = Team_admin_assign_fleets::find($TA_assign_fleet_id);
    if($TAassignfleets){
        return response()->json([
            'success' => true,
            'message' => 'List Assign fleets',
            'data'=> $TAassignfleets
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
}

public function updateAssignFleet(Request $request, $TA_assign_fleet_id)
{
    $fleet = $request->validate([
        'fleet_id' => 'required|string',
        'user_id' => 'nullable|integer',
    ]);

    $updateFleet = Team_admin_assign_fleets::where('TA_assign_fleet_id', '=', $TA_assign_fleet_id)->first();
    if (!$updateFleet) {
        return response()->json([
            'success' => false,
            'message' => 'Fleet not found.',
            'data' => null,
        ]);
    }

    // Update the existing fleet assignment
    $updateFleet->fleet_id = $request->fleet_id;
    $updateFleet->user_id = $request->user_id;
    $updateFleet->save();

    $result = Team_admin_assign_fleets::join('fleets', 'team_admin_assign_fleets.fleet_id', '=', 'fleets.fleet_id')
        ->join('users', 'team_admin_assign_fleets.user_id', '=', 'users.user_id')
        ->where('team_admin_assign_fleets.TA_assign_fleet_id', $TA_assign_fleet_id)
        ->select('team_admin_assign_fleets.*', 'fleets.name as fleet_name', 'users.name as team_admin')
        ->first();

    return response()->json([
        'success' => true,
        'message' => 'User updated successfully.',
        'data' => $result,
    ]);
}

}

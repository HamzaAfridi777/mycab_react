<?php

namespace App\Http\Controllers\Modules\SuperAdmin\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Modules\SuperAdmin\Models\Fleets;
use App\Models\Modules\SuperAdmin\Models\Team_admin_assign_fleets;

class FleetsController extends Controller
{
    public function addNewFleet(Request $request)
    {
         $request->validate([
            'name'=>'required|string',
            'serial_no' => 'required|string',
            'status' => 'required|in:active,inactive',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $isDeleted = isset($fleetData['is_deleted']) ? ($fleetData['is_deleted'] == 'delete' ? 1 : 0) : 0; 
        $fleetData = new Fleets;
            $fleetData->name = $request->name;
            $fleetData->serial_no = $request->serial_no;
            $fleetData->status = $request->status=='active' ? 'active' : 'inactive';
            $fleetData->is_deleted = $isDeleted;
            $fleetData->save();

            if($fleetData){
           
        // $TAassignFleets = Team_admin_assign_fleets::create([
        //     'fleet_id' => $fleetData->fleet_id,
        // ]);
    
        //  echo '<pre>';print_r($userRole);die();
        
            return response()->json([
                'success' => true,
                'message' => 'Fleet created successfully.',
                'data' => $fleetData
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

    public function FleetList()
    {
        $Fleets = Fleets::where('is_deleted', 0)->orderBy('fleet_id', 'desc')->paginate(100);
        if($Fleets->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Fleets list.',
                'data' => $Fleets,
                'pagination' => [
                    'total' => $Fleets->total(),
                    'per_page' => $Fleets->perPage(),
                    'current_page' => $Fleets->currentPage(),
                    'last_page' => $Fleets->lastPage(),
                    'from' => $Fleets->firstItem(),
                    'to' => $Fleets->lastItem(),
                ],
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'No data available.',
                'data' => []
            ],401);

        }
    }

    public function deleteFleet(Request $request, $fleet_id)
    {
        $fleet = Fleets::where('fleet_id', $fleet_id)->update(['is_deleted'=>'1']);

        if($fleet){
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
    
     ////////////fetch fleet to update fleet
     public function updateFleet($fleet_id){

        $Fleets= Fleets::find($fleet_id);
        if($Fleets){
            return response()->json([
                'success' => true,
                'message' => 'List Fleets',
                'data'=> $Fleets
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }
        /////////////update
    public function editFleet(Request $request, $fleet_id)
    {
        $fleet = $request->validate([
            'name'=>'required|string',
            'serial_no' => 'required|string',
            'status' => 'required|in:active,inactive',
           
        ]);
        $updateFleet = Fleets::where('fleet_id', '=', $fleet_id)->update([
            'name' => $fleet['name'],
            'serial_no' => $fleet['serial_no'],
            'status' => $fleet['status']=='active' ? 'active' : 'inactive',
            
        ]); 
        if($updateFleet){
            return response()->json([
                'success' => true,
                'message' => 'Fleet updated successfully.',
                'data' => $fleet
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
                'data' => []
            ],401);
    
        }

       

    }

}

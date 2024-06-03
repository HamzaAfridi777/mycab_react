<?php

namespace App\Http\Controllers\TeamAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamAdmin\Accident;

class AccidentController extends Controller
{
    public function addNewAccident(Request $request)
    {
        $accident = $request->validate([
            'fleet_id'=>'required|string',
            'driver_id' => 'required|string',
            'accident_date' => 'required|date',
            'description' => 'required|string',
            'location' => 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
            
        ]);
        $fleetid = $request->fleet_id;
        $driverId = $request->driver_id;
        $isDeleted = isset($accident['is_deleted']) ? ($accident['is_deleted'] == 'delete' ? 1 : 0) : 0; 

        $accident = new Accident;
        $accident->accident_date = $request->accident_date;
        $accident->driver_id = $driverId;
        $accident->fleet_id = $fleetid;
        $accident->description = $request->description;
        $accident->location = $request->location;
        $accident->is_deleted = $isDeleted;
        $accident->save();


        $result = Accident::join('drivers', 'accidents.driver_id', '=', 'drivers.driver_id')
        ->join('fleets', 'accidents.fleet_id', '=', 'fleets.fleet_id')
    ->where('accidents.driver_id', $driverId)
    ->where('accidents.fleet_id', $fleetid)
    ->where('accidents.is_deleted', 0)
    ->orderBy('accidents.accident_id', 'desc')
    ->select(
        'accidents.*',
        'drivers.name as driver_name',
        'fleets.name as fleet_name',
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Accident created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
    }
    /////////////accident list
    public function AccidentList()
    {
        $accident = Accident::join('drivers', 'accidents.driver_id', '=', 'drivers.driver_id')
        ->join('fleets', 'accidents.fleet_id', '=', 'fleets.fleet_id')
        ->select(
            'accidents.*',
            'drivers.name as driver_name',
            'fleets.name as fleet_name',
        )
        ->where('accidents.is_deleted', 0)
        ->orderBy('accidents.accident_id', 'desc')
    ->paginate(10);

        if($accident->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Accidents list.',
                'data' => $accident,
                'pagination' => [
                    'total' => $accident->total(),
                    'per_page' => $accident->perPage(),
                    'current_page' => $accident->currentPage(),
                    'last_page' => $accident->lastPage(),
                    'from' => $accident->firstItem(),
                    'to' => $accident->lastItem(),
                ]
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
    /////////delete accident
    public function deleteAccident(Request $request, $accident_id)
    {
        $accident = Accident::where('accident_id', $accident_id)->update(['is_deleted'=> '1']);

        if($accident){
            return response()->json([
                'success' => true,
                'message' => 'Accident deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }
    ////////////fetch accident to update accident
    public function updateAccident($accident_id){

        $accident = Accident::find($accident_id);
        if($accident){
            return response()->json([
                'success' => true,
                'message' => 'List accident',
                'data'=> $accident
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }
        //////////////update permission
        //Previous Code for Edit Accident there is issue in this code when i update the 
        //accident data in form so it create a new in list not update the previous one 
    // public function editAccident(Request $request, $accident_id)
    // {
    //     $attendance = $request->validate([
    //         'fleet_id'=>'required|string',
    //         'driver_id' => 'required|string',
    //         'accident_date' => 'required|date',
    //         'description' => 'required|string',
    //         'location' => 'required|string',
    //         'is_deleted' => 'nullable|in:delete,not_delete',
    //     ]);
        
    //         // Retrieve the accident with the specified accident_id
    //         $accident = Accident::where('accident_id', $accident_id)->first();
        
    //         // Check if the accident exists
    //         if (!$accident) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Ride not found.',
    //                 'data' => null,
    //             ]);
    //         }
        
    //         $accident = new Accident;
    //         $accident->accident_date = $request->accident_date;
    //         $accident->driver_id = $request->driver_id;
    //         $accident->fleet_id = $request->fleet_id;
    //         $accident->description = $request->description;
    //         $accident->location = $request->location;
    //         $accident->save();
    
    
    //         $result = Accident::join('drivers', 'accidents.driver_id', '=', 'drivers.driver_id')
    //         ->join('fleets', 'accidents.fleet_id', '=', 'fleets.fleet_id')
    //     ->where('accidents.driver_id', $request->driver_id)
    //     ->where('accidents.fleet_id',  $request->fleet_id)
    //     ->where('accidents.is_deleted', 0)
    //     ->orderBy('accidents.accident_id', 'desc')
    //     ->select(
    //         'accidents.*',
    //         'drivers.name as driver_name',
    //         'fleets.name as fleet_name',
    //     )
    //     ->get();
    //         return response()->json([
    //             'success' => $result ? true : false,
    //             'message' => $result ? 'Accident created successfully.' : 'something went wrong',
    //             'data' => $result,
    //            ]);   
       

    // }

    public function editAccident(Request $request, $accident_id)
{
    $attendance = $request->validate([
        'fleet_id'=>'required|string',
        'driver_id' => 'required|string',
        'accident_date' => 'required|date',
        'description' => 'required|string',
        'location' => 'required|string',
        'is_deleted' => 'nullable|in:delete,not_delete',
    ]);

    // Retrieve the accident with the specified accident_id
    $accident = Accident::where('accident_id', $accident_id)->first();

    // Check if the accident exists
    if (!$accident) {
        return response()->json([
            'success' => false,
            'message' => 'Accident not found.',
            'data' => null,
        ]);
    }

    // Update the existing accident record
    $accident->accident_date = $request->accident_date;
    $accident->driver_id = $request->driver_id;
    $accident->fleet_id = $request->fleet_id;
    $accident->description = $request->description;
    $accident->location = $request->location;
    $accident->save();

    $result = Accident::join('drivers', 'accidents.driver_id', '=', 'drivers.driver_id')
        ->join('fleets', 'accidents.fleet_id', '=', 'fleets.fleet_id')
        ->where('accidents.driver_id', $request->driver_id)
        ->where('accidents.fleet_id', $request->fleet_id)
        ->where('accidents.is_deleted', 0)
        ->orderBy('accidents.accident_id', 'desc')
        ->select(
            'accidents.*',
            'drivers.name as driver_name',
            'fleets.name as fleet_name',
        )
        ->get();

    return response()->json([
        'success' => $result ? true : false,
        'message' => $result ? 'Accident updated successfully.' : 'Something went wrong',
        'data' => $result,
    ]);   
}



    public function AccidentView($accident_id)
    {
        $accident = Accident::find($accident_id);

        if($accident){

            return response()->json([
                'success' => true,
                'message' =>'attendance view successfully',
                'data' => $accident
            ]);
        }
    }
}

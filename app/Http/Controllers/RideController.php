<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ride;
use App\Models\Modules\customer\Models\Customer;
use App\Models\Modules\SuperAdmin\Models\Driver;
use Carbon\Carbon;

class RideController extends Controller
{
    public function addRide(Request $request)
    {
        $request->validate([
            'customer_id'=>'required|string',
            'driver_id'=>'required|string',
            'franchiseSystem_id'=>'required|string',
            'fare_amount' => 'required|numeric|between:0,9999999.99',
            'status' => 'required|in:scheduled,ongoing,completed,cancelled',
            'is_deleted' => 'nullable|in:delete,not_delete',
            'pickUp_location'=> 'nullable|string',
            'destination' => 'nullable|string',
            'date'=> 'nullable|date',
        ]);
        $franchiseSystemId = $request->franchiseSystem_id;
        $driverd = $request->driver_id;
        $customerId = $request->customer_id;
        $isDeleted = isset($ride['is_deleted']) ? ($ride['is_deleted'] == 'delete' ? 1 : 0) : 0; 

        $ride = new Ride;
        $ride->customer_id = $request->customer_id;
        $ride->driver_id = $request->driver_id;
        $ride->franchiseSystem_id = $request->franchiseSystem_id;
        $ride->fare_amount = $request->fare_amount;
        $ride->status = $request->status;
        $ride->pickUp_location = $request->pickUp_location;
        $ride->destination = $request->destination;
        $ride->date = $request->date;
        $ride->is_deleted = $isDeleted;
        $ride->save();


        $result = Ride::join('drivers', 'rides.driver_id', '=', 'drivers.driver_id')
    ->join('customers', 'rides.customer_id', '=', 'customers.customer_id')
    ->join('franchise_systems', 'rides.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
    ->where('rides.driver_id', $driverd)
    ->where('rides.customer_id', $customerId)
    ->where('rides.franchiseSystem_id', $franchiseSystemId)
    ->select(
        'rides.*',
        'drivers.name as driver_name',
        'customers.name as customer_name',
        'franchise_systems.name as franchiseSystem_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Ride created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
    }
////////usersRideList

    public function usersRideList()
    {
          // Get the total number of rides that are not deleted
    $totalRides = Ride::where('is_deleted', 0)->count();

        $rides= Ride::select(
            'rides.*',
            'drivers.name as driver_name',
            'customers.name as customer_name',
            'franchise_systems.name as franchiseSystem_name'
        )
        ->join('drivers', 'rides.driver_id', '=', 'drivers.driver_id')
        ->join('customers', 'rides.customer_id', '=', 'customers.customer_id')
        ->join('franchise_systems', 'rides.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
        ->where('rides.is_deleted', 0)
        ->orderBy('ride_id', 'desc')
        ->paginate(10);
        if($rides->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Users role list.',
                'data' => $rides,
                'totalRides' => $totalRides, // Add total rides to response
                'pagination' => [
                    'total' => $rides->total(),
                    'per_page' => $rides->perPage(),
                    'current_page' => $rides->currentPage(),
                    'last_page' => $rides->lastPage(),
                    'from' => $rides->firstItem(),
                    'to' => $rides->lastItem(),
                ]
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'No data available.',
                'data' => [],
                'totalRides' => $totalRides // Add total rides to response
            ],401);

        }
    }


    /////////delete
    public function deleteRide(Request $request, $ride_id)
    {
        $ride = Ride::where('ride_id', $ride_id)->update(['is_deleted'=> '1']);

        if($ride){
            return response()->json([
                'success' => true,
                'message' => 'Ride deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }

    /////////////fetch ride data in update form
    public function updateRide($ride_id){

        $rides = Ride::find($ride_id);
        if($rides){
            return response()->json([
                'success' => true,
                'message' => 'List ride',
                'data'=> $rides
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }

/////////edit
        public function editRide(Request $request, $ride_id)
        {
            $request->validate([
                'customer_id'=>'required|string',
                'driver_id'=>'required|string',
                'franchiseSystem_id'=>'required|string',
                'fare_amount' => 'required|numeric|between:0,9999999.99',
                'status' => 'required|in:scheduled,ongoing,completed,cancelled,waiting',
                'pickUp_location'=> 'nullable|string',
                'destination' => 'nullable|string',
                'date'=> 'nullable|date',
            ]);
        
            // Retrieve the ride with the specified ride_id
            $ride = Ride::where('ride_id', $ride_id)->first();
        
            // Check if the ride exists
            if (!$ride) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ride not found.',
                    'data' => null,
                ]);
            }
        
            // Update the attributes of the ride
            $ride->customer_id = $request->customer_id;
            $ride->driver_id = $request->driver_id;
            $ride->franchiseSystem_id = $request->franchiseSystem_id;
            $ride->fare_amount = $request->fare_amount;
            $ride->date = $request->date;
            $ride->pickUp_location = $request->pickUp_location;
            $ride->destination = $request->destination;
            $ride->status = $request->status;
            $ride->save();
        
            // Retrieve the updated ride with driver and customer names
            $result = Ride::join('drivers', 'rides.driver_id', '=', 'drivers.driver_id')
            ->join('customers', 'rides.customer_id', '=', 'customers.customer_id')
            ->join('franchise_systems', 'rides.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
            ->where('rides.driver_id', $request->driver_id)
            ->where('rides.customer_id', $request->customer_id)
            ->where('rides.franchiseSystem_id', $request->franchiseSystem_id)
            ->select(
                'rides.*',
                'drivers.name as driver_name',
                'customers.name as customer_name',
                'franchise_systems.name as franchiseSystem_name'
            )
            ->get();
        
            return response()->json([
                'success' => $result ? true : false,
                'message' => $result ? 'Ride updated successfully.' : 'Something went wrong',
                'data' => $result,
            ]);  
        }
////////////////////////fetch completed rides
public function completedRides()
{
    $completedRides = Ride::where('status', 'completed')->get();
    $currentDate = date('Y-m-d'); // Fetch current date

    if($completedRides->isNotEmpty()) {
        $ridesWithCurrentDate = $completedRides->map(function ($ride) use ($currentDate) {
            $ride->current_date = $currentDate; // Include current date for each completed ride
            return $ride;
        });

        return response()->json([
            'success' => true,
            'message' => 'Completed rides listed successfully',
            'data' => $ridesWithCurrentDate
        ]);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'No completed rides found',
            'data' => []
        ]);
    }
}



/////////monthly completed rides
public function getMonthlyCompletedRides()
{
    $startDate = Carbon::now()->subMonth()->startOfMonth();
    $endDate = Carbon::now()->subMonth()->endOfMonth();

    $monthlyCompletedRides = Ride::where('status', 'completed')
        ->whereBetween('date', [$startDate, $endDate])
        ->get();
if($monthlyCompletedRides){
        return response()->json([
            'success' => true,
            'message' => 'Monthly completed rides list',
            'data' => $monthlyCompletedRides
        ]);
    }

    else{

        return response()->json([
            'success' => false,
            'message' => 'Something went wrong',
            'data' => []
        ]);
    }
    
}
////////////////vacant rides
public function VacantRides()
{
    $vacantRides = Ride::where('status', 'waiting')->where('is_deleted', 0)->paginate(10);
    $totalVacantRides = Ride::where('status', 'waiting')->where('is_deleted', 0)->count(); 
    // Get total count of vacant rides

    if($vacantRides){
        return response()->json([
            'success'=> true,
            'message'=> 'waiting ride list',
            'data'=> $vacantRides,
            'totalCount' => $totalVacantRides // Add total count to response
        ]);
    }
        else{
            return response()->json([
                'success'=> true,
                'message'=> 'waiting ride list',
                'data'=> $vacantRides,
                'totalCount' => $totalVacantRides // Add total count to response
            ]);
        }

}

}



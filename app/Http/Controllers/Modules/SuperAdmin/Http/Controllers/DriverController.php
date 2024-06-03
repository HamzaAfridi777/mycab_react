<?php

namespace App\Http\Controllers\Modules\SuperAdmin\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Add this import
use App\Models\Modules\SuperAdmin\Models\Driver;

class DriverController extends Controller
{
    public function addNewDriver(Request $request)
    {
        $request->validate([
            'name'=>'required|string',
            'father_name' => 'required|string',
            'gender' => 'required|string',
            'country' => 'required|string',
            'identity_number' => 'required|min:15',
            'date_of_birth' => 'required|string',
            'permanent_address' => 'required|string',
            'present_address' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $isDeleted = isset($driverData['is_deleted']) ? ($driverData['is_deleted'] == 'delete' ? 1 : 0) : 0; 
            $driverData = new Driver;
            $driverData->name = $request->name;
            $driverData->father_name = $request->father_name;
            $driverData->gender = $request->gender;
            $driverData->country = $request->country;
            $driverData->identity_number = $request->identity_number;
            $driverData->date_of_birth = $request->date_of_birth;
            $driverData->permanent_address = $request->permanent_address;
            $driverData->present_address = $request->present_address;
            $driverData->is_deleted = $isDeleted;

            if ($request->hasFile('image'))
            {
              $image= $request->file('image');
              $filename = time().'-'.$image->getClientOriginalName();
              $image->storeAs('public/images/', $filename);
              $driverData->image = $filename;
              // dd($user->image);
            }
            $driverData->save();
        //  echo '<pre>';print_r($userRole);die();
        if($driverData)
        {
            return response()->json([
                'success' => true,
                'message' => 'Driver created successfully.',
                'data' => $driverData
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

    public function DriversList()
    {
        $Drivers = Driver::where('is_deleted', 0)->orderBy('driver_id', 'desc')->paginate(100);

        foreach ($Drivers as $driver) {
            $driver->image = asset('storage/images/'.$driver->image); // Get the full URL of the image
        }
        if($Drivers->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Drivers list.',
                'data' => $Drivers,
                'pagination' => [
                    'total' => $Drivers->total(),
                    'per_page' => $Drivers->perPage(),
                    'current_page' => $Drivers->currentPage(),
                    'last_page' => $Drivers->lastPage(),
                    'from' => $Drivers->firstItem(),
                    'to' => $Drivers->lastItem(),
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

    public function deleteDriver(Request $request, $driver_id)
    {
        $driver = Driver::where('driver_id', $driver_id)->update(['is_deleted'=> '1']);

        if($driver){
            return response()->json([
                'success' => true,
                'message' => 'Driver deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }

////////////fetch driver to update driver
public function updateDriver($driver_id){

    $Driver= Driver::find($driver_id);
    if($Driver){
        return response()->json([
            'success' => true,
            'message' => 'List Permission',
            'data'=> $Driver
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
    }
    ////////update

    public function editDriver(Request $request, $driver_id)
    {
        $driver = $request->validate([
            'name' => 'required|string',
            'father_name' => 'required|string',
            'gender' => 'required|string',
            'country' => 'required|string',
            'identity_number' => 'required|min:15',
            'date_of_birth' => 'required|string',
            'permanent_address' => 'required|string',
            'present_address' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Add validation for optional image
        ]);
    
        // Find the driver by ID
        $Updatedriver = Driver::where('driver_id', $driver_id)->first();
    
        if (!$Updatedriver) {
            return response()->json([
                'success' => false,
                'message' => 'Driver not found',
                'data' => []
            ], 404);
        }
    
        // Check if a new image is uploaded
        if ($request->hasFile('image')) {
            // Delete the previous image
            if ($Updatedriver->image) {
                Storage::delete('public/images/' . $Updatedriver->image);
            }
    
            // Store the new image
            $image = $request->file('image');
            $filename = time() . '-' . $image->getClientOriginalName();
            $image->storeAs('public/images/', $filename); // Store image in storage/app/public/images
            $Updatedriver->image = $filename;
        }
    
        // Update driver data
        $Updatedriver->name = $driver['name'];
        $Updatedriver->father_name = $driver['father_name'];
        $Updatedriver->gender = $driver['gender'];
        $Updatedriver->country = $driver['country'];
        $Updatedriver->identity_number = $driver['identity_number'];
        $Updatedriver->date_of_birth = $driver['date_of_birth'];
        $Updatedriver->permanent_address = $driver['permanent_address'];
        $Updatedriver->present_address = $driver['present_address'];
    
        // Save the updated driver data
        $Updatedriver->save();
    
        return response()->json([
            'success' => true,
            'message' => 'Driver updated successfully.',
            'data' => $Updatedriver
        ], 200);
    }
    


//     public function editDriver(Request $request, $driver_id)
//     {
//         $driver = $request->validate([
//             'name'=>'required|string',
//             'father_name' => 'required|string',
//             'gender' => 'required|string',
//             'country' => 'required|string',
//             'identity_number' => 'required|min:15',
//             'date_of_birth' => 'required|string',
//             'permanent_address' => 'required|string',
//             'present_address' => 'required|string',
//         ]);
//             $Updatedriver = Driver::where('driver_id', $driver_id)->first();

//     if (!$Updatedriver) {
//         return response()->json([
//             'success' => false,
//             'message' => 'driver not found',
//             'data' => []
//         ], 404);
//     }

//     // Check if a new image is uploaded
//     if ($request->hasFile('image')) {
//         // Delete the previous image
//         if ($Updatedriver->image) {
//             Storage::delete('public/images/' . $UpdateUser->image);
//         }

//         // Store the new image
//         $image = $request->file('image');
//         $filename = time() . '-' . $image->getClientOriginalName();
//         $image->storeAs('public/images/', $filename); // Store image in storage/app/public/images
//         $UpdateUser->image = $filename;
//     }
//            // Update user data
//     $Updatedriver->name = $driver['name'];
//     $Updatedriver->father_name = $driver['father_name'];
//     $Updatedriver->gender = $driver['gender'];
//     $Updatedriver->country = $driver['country'];
//     $Updatedriver->identity_number = $driver['identity_number'];
//     $Updatedriver->date_of_birth = $driver['date_of_birth'];
//     $Updatedriver->permanent_address = $driver['permanent_address'];
//     $Updatedriver->present_address = $driver['present_address'];

//     $Updatedriver->save();

//     return response()->json([
//         'success' => true,
//         'message' => 'Driver updated successfully.',
//         'data' => $Updatedriver
//     ], 200);
// }
  
     }


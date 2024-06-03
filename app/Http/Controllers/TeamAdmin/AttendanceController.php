<?php

namespace App\Http\Controllers\TeamAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamAdmin\Attendance;

class AttendanceController extends Controller
{
    // 
    public function addNewDriverAttendance(Request $request)
{
    $request->validate([
        'Attendance' => 'required|string',
        'driver_id' => 'required|string', // Change 'driver_id' to 'driver_ids'
        'is_deleted' => 'nullable|in:delete,not_delete',
    ]);
    // $attendanceId = uniqid();

    // Split the comma-separated string into an array of driver IDs
    $driverIds = explode(',', $request->driver_id);

    $isDeleted = isset($request->is_deleted) ? ($request->is_deleted == 'delete' ? 1 : 0) : 0;

    $attendanceRecords = [];

    foreach ($driverIds as $driverId) {
        $attendance = new Attendance;
        $attendance->driver_id = $driverId;
        $attendance->Attendance = $request->Attendance;
        // $attendance->attendance_id = $attendanceId;
        $attendance->is_deleted = $isDeleted;
        $attendance->save();

        if ($attendance) {
            // Retrieve the attendance record including driver name
            $result = Attendance::join('drivers', 'attendance.driver_id', '=', 'drivers.driver_id')
                ->where('attendance.driver_id', $driverId)
                // ->where('attendance.attendance_id', $attendanceId)
                ->where('attendance.is_deleted', 0)
                ->orderBy('attendance.attendance_id', 'desc')
                ->select(
                    'attendance.*',
                    'drivers.name as driver_name',
                )
                ->first(); // Change to first() to retrieve a single record

            $attendanceRecords[] = $result;
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong while adding attendance for driver with ID: ' . $driverId,
                'data' => null
            ]);
        }
    }

    return response()->json([
        'success' => true,
        'message' => 'Attendance records created successfully.',
        'data' => $attendanceRecords
    ]);
}
    /////////////Attendance list
    public function DriverAttendanceList()
    {
        $attendance = Attendance::join('drivers', 'attendance.driver_id', '=', 'drivers.driver_id')
        ->select(
            'attendance.*',
            'drivers.name as driver_name',
        )
    ->orderBy('attendance.attendance_id', 'desc')
    ->where('attendance.is_deleted', 0)
    ->paginate(10);

        //  $permissions = Permission::where('is_deleted', 0)->orderBy('permission_id', 'desc')->paginate();
        if($attendance->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Attendance list.',
                'data' => $attendance,
                'pagination' => [
                    'total' => $attendance->total(),
                    'per_page' => $attendance->perPage(),
                    'current_page' => $attendance->currentPage(),
                    'last_page' => $attendance->lastPage(),
                    'from' => $attendance->firstItem(),
                    'to' => $attendance->lastItem(),
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
    /////////delete permission
    public function deleteDriverAttendance(Request $request, $attendance_id)
    {
        $attendance = Attendance::where('attendance_id', $attendance_id)->update(['is_deleted'=> '1']);

        if($attendance){
            return response()->json([
                'success' => true,
                'message' => 'Attendance deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }
    ////////////fetch permission to update permission
    public function updateDriverAttendance($attendance_id){

        $attendance = Attendance::find($attendance_id);
        if($attendance){
            return response()->json([
                'success' => true,
                'message' => 'List attendance',
                'data'=> $attendance
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
        //this previous code for updating driver attendence but it not update the 
        //previous one it create a new one in list
    // public function editDriverAttendance(Request $request, $attendance_id)
    // {
    //     $attendance = $request->validate([
            
    //         'Attendance' => 'required|string',
    //         'driver_id' => 'required|string',
    //         'is_deleted' => 'nullable|in:delete,not_delete',
            
    //     ]);
        
    //         // Retrieve the ride with the specified ride_id
    //         $attendance = Attendance::where('attendance_id', $attendance_id)->first();
        
    //         // Check if the ride exists
    //         if (!$attendance) {
    //             return response()->json([
    //                 'success' => false,
    //                 'message' => 'Ride not found.',
    //                 'data' => null,
    //             ]);
    //         }
        
    //         $attendance = new Attendance;
    //         $attendance->driver_id = $request->driver_id;
    //         $attendance->Attendance = $request->Attendance;
    //         $attendance->save();
    
    
    //         $result = Attendance::join('drivers', 'attendance.driver_id', '=', 'drivers.driver_id')
    //     ->where('attendance.driver_id', $request->driver_id)
    //     ->where('attendance.is_deleted', 0)
    //     ->orderBy('attendance.attendance_id', 'desc')
    //     ->select(
    //         'attendance.*',
    //         'drivers.name as driver_name',
    //     )
    //     ->get();
    //         return response()->json([
    //             'success' => $result ? true : false,
    //             'message' => $result ? 'Attendance updated successfully.' : 'something went wrong',
    //             'data' => $result,
    //            ]); 
    // }

    public function editDriverAttendance(Request $request, $attendance_id)
{
    $attendance = $request->validate([
        'Attendance' => 'required|string',
        'driver_id' => 'required|string',
        'is_deleted' => 'nullable|in:delete,not_delete',
    ]);

    $attendance = Attendance::where('attendance_id', $attendance_id)->first();

    if (!$attendance) {
        return response()->json([
            'success' => false,
            'message' => 'Attendance not found.',
            'data' => null,
        ]);
    }

    $attendance->driver_id = $request->driver_id;
    $attendance->Attendance = $request->Attendance;
    $attendance->save();

    $result = Attendance::join('drivers', 'attendance.driver_id', '=', 'drivers.driver_id')
        ->where('attendance.driver_id', $request->driver_id)
        ->where('attendance.is_deleted', 0)
        ->orderBy('attendance.attendance_id', 'desc')
        ->select(
            'attendance.*',
            'drivers.name as driver_name',
        )
        ->get();

    return response()->json([
        'success' => $result ? true : false,
        'message' => $result ? 'Attendance updated successfully.' : 'Something went wrong',
        'data' => $result,
    ]);
}




    public function DriverAttendanceView($attendance_id)
    {
        $attendance = Attendance::find($attendance_id);

        if($attendance){

            return response()->json([
                'success' => true,
                'message' =>'Permission view successfully',
                'data' => $attendance
            ]);
        }
    }
    //////////////////////present drivers
    public function getPresentDrivers()
    {
        $attendance = Attendance::join('drivers', 'attendance.driver_id', '=', 'drivers.driver_id')
        
        ->where('attendance.is_deleted', 0)
        ->where('Attendance', 'Present')
        ->orderBy('attendance.attendance_id', 'desc')
        ->select(
            'attendance.*',
            'drivers.name as driver_name',
        )
        ->paginate(10);

        $totalPresentDrivers = $attendance->total(); // Get the total count of present drivers

        if($attendance){

            return response()->json([
                'success' => true,
                'message' =>'attendance view successfully',
                'totalPresentDrivers' => $totalPresentDrivers, // Include total count in the response
                'data' => $attendance
            ]);
        }
    }

    ////////////absent drivers
    public function getAbsentDrivers()
    {
        $attendance = Attendance::join('drivers', 'attendance.driver_id', '=', 'drivers.driver_id')
        
        ->where('attendance.is_deleted', 0)
        ->where('Attendance', 'Absent')
        ->orderBy('attendance.attendance_id', 'desc')
        ->select(
            'attendance.*',
            'drivers.name as driver_name',
        )
        ->paginate(10);

        $totalAbsentDrivers = $attendance->total(); // Get the total count of absent drivers

        if($attendance){

            return response()->json([
                'success' => true,
                'message' =>'attendance view successfully',
                'totalAbsentDrivers' => $totalAbsentDrivers, // Include total count in the response
                'data' => $attendance
            ]);
        }
}
}
<?php

namespace App\Http\Controllers\TeamAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamAdmin\Taxireports;

class TaxiDrivenReports extends Controller
{
    public function addNewTaxireports(Request $request)
    {
        $Taxireports = $request->validate([
            'driver_id' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'total_distance' => 'required|numeric|min:0',
            'total_income' => 'required|numeric|min:0',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        
        $driverid = $request->driver_id;
        $isDeleted = isset($Taxireports['is_deleted']) ? ($Taxireports['is_deleted'] == 'delete' ? 1 : 0) : 0; 
    
        $Taxireports = new Taxireports;
        $Taxireports->date = $request->date;
        $Taxireports->driver_id = $driverid;
        $Taxireports->start_time = $request->start_time;
        $Taxireports->end_time = $request->end_time;
        $Taxireports->total_distance = $request->total_distance;
        $Taxireports->total_income = $request->total_income;
        $Taxireports->is_deleted = $isDeleted;
        $Taxireports->save();
    
        $result = Taxireports::join('drivers', 'taxi_reports.driver_id', '=', 'drivers.driver_id')
            ->where('taxi_reports.driver_id', $driverid)
            ->where('taxi_reports.is_deleted', 0)
            ->orderBy('taxi_reports.reports_id', 'desc')
            ->select('taxi_reports.*', 'drivers.name as driver_name')
            ->get();
    
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Taxireports created successfully.' : 'something went wrong',
            'data' => $result,
        ]);   
    }
    
    /////////////Attendance list
    public function TaxireportsList()
    {
        $Taxireports = Taxireports::join('drivers', 'taxi_reports.driver_id', '=', 'drivers.driver_id')
        ->select(
            'taxi_reports.*',
            'drivers.name as driver_name',
        )
    ->orderBy('taxi_reports.reports_id', 'desc')
    ->where('taxi_reports.is_deleted', 0)
    ->paginate(10);

        if($Taxireports->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Taxireports list.',
                'data' => $Taxireports,
                'pagination' => [
                    'total' => $Taxireports->total(),
                    'per_page' => $Taxireports->perPage(),
                    'current_page' => $Taxireports->currentPage(),
                    'last_page' => $Taxireports->lastPage(),
                    'from' => $Taxireports->firstItem(),
                    'to' => $Taxireports->lastItem(),
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
    public function deleteTaxireports(Request $request, $reports_id)
    {
        $Taxireports = Taxireports::where('reports_id', $reports_id)->update(['is_deleted'=> '1']);

        if($Taxireports){
            return response()->json([
                'success' => true,
                'message' => 'Taxireports deleted successfully.',
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
    public function updateTaxireports($reports_id){

        $Taxireports = Taxireports::find($reports_id);
        if($Taxireports){
            return response()->json([
                'success' => true,
                'message' => 'List reports',
                'data'=> $Taxireports
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
    public function editTaxireports(Request $request, $reports_id)
    {
        $Taxireports = $request->validate([
            'driver_id' => 'required|string',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'total_distance' => 'required|numeric|min:0',
            'total_income' => 'required|numeric|min:0',
        ]);
        
            // Retrieve the ride with the specified ride_id
            $Taxireports = Taxireports::where('reports_id', $reports_id)->first();
        
            // Check if the ride exists
            if (!$Taxireports) {
                return response()->json([
                    'success' => false,
                    'message' => 'Report not found.',
                    'data' => null,
                ]);
            }
            $Taxireports = new Taxireports;
        $Taxireports->date = $request->date;
        $Taxireports->driver_id = $request->driver_id;
        $Taxireports->start_time = $request->start_time;
        $Taxireports->end_time = $request->end_time;
        $Taxireports->total_distance = $request->total_distance;
        $Taxireports->total_income = $request->total_income;
        $Taxireports->save();
    
    
    
        $result = Taxireports::join('drivers', 'taxi_reports.driver_id', '=', 'drivers.driver_id')
        ->where('taxi_reports.driver_id', $request->driver_id)
        ->where('taxi_reports.is_deleted', 0)
        ->orderBy('taxi_reports.reports_id', 'desc')
        ->select('taxi_reports.*', 'drivers.name as driver_name')
        ->get();

            return response()->json([
                'success' => $result ? true : false,
                'message' => $result ? 'Taxireports updated successfully.' : 'something went wrong',
                'data' => $result,
               ]); 
       

    }


    public function TaxireportsView($Taxireports_id)
    {
        $Taxireports = Taxireports::find($Taxireports_id);

        if($Taxireports){

            return response()->json([
                'success' => true,
                'message' =>'Taxireports view successfully',
                'data' => $Taxireports
            ]);
        }
    }
}

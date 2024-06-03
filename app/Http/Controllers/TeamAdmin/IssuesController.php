<?php

namespace App\Http\Controllers\TeamAdmin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TeamAdmin\Issues;

class IssuesController extends Controller
{
    public function addNewIssues(Request $request)
    {
        $issues = $request->validate([
            'driver_id'=>'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
            'date' => 'required|date',
            'recomondation' => 'required|string',
            'status' => 'required|in:active,inactive',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        
        $driverid = $request->driver_id;
        $isDeleted = isset($issues['is_deleted']) ? ($issues['is_deleted'] == 'delete' ? 1 : 0) : 0; 
    
        $issues = new Issues;
        $issues->title = $request->title;
        $issues->driver_id = $driverid;
        $issues->description = $request->description;
        $issues->date = $request->date;
        $issues->recomondation = $request->recomondation;
        $issues->status = $request->status;
        $issues->is_deleted = $isDeleted;
        $issues->save();
    
        $result = Issues::join('drivers', 'issues.driver_id', '=', 'drivers.driver_id')
            ->where('issues.driver_id', $driverid)
            ->where('issues.is_deleted', 0)
            ->orderBy('issues.issues_id', 'desc')
            ->select('issues.*', 'drivers.name as driver_name')
            ->get();
    
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Issues created successfully.' : 'something went wrong',
            'data' => $result,
        ]);   
    }
    
    /////////////IssuesList list
    public function IssuesList()
    {
        $issues = Issues::join('drivers', 'issues.driver_id', '=', 'drivers.driver_id')
        ->select(
            'issues.*',
            'drivers.name as driver_name',
        )
    ->orderBy('issues.issues_id', 'desc')
    ->where('issues.is_deleted', 0)
    ->paginate(10);

    $totalIssues = Issues::where('is_deleted', 0)->count(); // Get total count of issues

        //  $permissions = Permission::where('is_deleted', 0)->orderBy('permission_id', 'desc')->paginate();
        if($issues->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'issues list.',
                'data' => $issues,
                'totalCount' => $totalIssues, // Add total count to response
                'pagination' => [
                    'total' => $issues->total(),
                    'per_page' => $issues->perPage(),
                    'current_page' => $issues->currentPage(),
                    'last_page' => $issues->lastPage(),
                    'from' => $issues->firstItem(),
                    'to' => $issues->lastItem(),
                ]
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'No data available.',
                'data' => [],
                'totalCount' => $totalIssues // Add total count to response
            ],401);

        }
    }
    /////////delete permission
    public function deleteIssues(Request $request, $issues_id)
    {
        $issues = Issues::where('issues_id', $issues_id)->update(['is_deleted'=> '1']);

        if($issues){
            return response()->json([
                'success' => true,
                'message' => 'issues deleted successfully.',
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
    public function updateIssues($issues_id){

        $issues = Issues::find($issues_id);
        if($issues){
            return response()->json([
                'success' => true,
                'message' => 'List attendance',
                'data'=> $issues
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }
        //////////////update Issues
        public function editIssues(Request $request, $issues_id)
        {
            $issues = $request->validate([
                'driver_id' => 'required|string',
                'title' => 'required|string',
                'description' => 'required|string',
                'date' => 'required|date',
                'recomondation' => 'required|string',
                'status' => 'required|in:active,inactive',
            ]);
        
            // Retrieve the issue with the specified issues_id
            $issue = Issues::where('issues_id', $issues_id)->first();
        
            // Check if the issue exists
            if (!$issue) {
                return response()->json([
                    'success' => false,
                    'message' => 'Issue not found.',
                    'data' => null,
                ]);
            }
        
            // Update the existing issue
            $issue->title = $request->title;
            $issue->driver_id = $request->driver_id;
            $issue->description = $request->description;
            $issue->date = $request->date;
            $issue->recomondation = $request->recomondation;
            $issue->status = $request->status;
            $issue->save();
        
            $result = Issues::join('drivers', 'issues.driver_id', '=', 'drivers.driver_id')
                ->where('issues.driver_id', $request->driver_id)
                ->where('issues.is_deleted', 0)
                ->orderBy('issues.issues_id', 'desc')
                ->select('issues.*', 'drivers.name as driver_name')
                ->get();
        
            return response()->json([
                'success' => $result ? true : false,
                'message' => $result ? 'Issues updated successfully.' : 'Something went wrong',
                'data' => $result,
            ]);
        }
        


    public function IssuesView($issues_id)
    {
        $permission = Issues::find($issues_id);

        if($issues){

            return response()->json([
                'success' => true,
                'message' =>'issues view successfully',
                'data' => $issues
            ]);
        }
    }
}

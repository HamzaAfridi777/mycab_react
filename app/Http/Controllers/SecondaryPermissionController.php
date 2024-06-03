<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Secondary_permission;

class SecondaryPermissionController extends Controller
{
    public function addNewSecondaryPermission(Request $request)
    {
        $secondaryPermission = $request->validate([
            'name'=>'required|string',
            'status' => 'required|in:active,inactive',
            'slug' => 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $isDeleted = isset($secondaryPermission['is_deleted']) ? ($secondaryPermission['is_deleted'] == 'delete' ? 1 : 0) : 0; 
        $secondaryPermission = Secondary_permission::create([
            'name' => $secondaryPermission['name'],
            'status' => $secondaryPermission['status']=='active' ? 1 : 0,
            'slug' => $secondaryPermission['slug'],
            'is_deleted' => $isDeleted,
        ]);
        //  echo '<pre>';print_r($userRole);die();
        if($secondaryPermission)
        {
            return response()->json([
                'success' => true,
                'message' => 'Secondary permission created successfully.',
                'data' => $secondaryPermission
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


    public function secondaryPermissionsList()
    {
        $secondaryPermission = Secondary_permission::where('is_deleted', 0)->orderBy('sp_id', 'desc')->paginate();
        if($secondaryPermission->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Secondary permissions list.',
                'data' => $secondaryPermission,
                'pagination' => [
                    'total' => $secondaryPermission->total(),
                    'per_page' => $secondaryPermission->perPage(),
                    'current_page' => $secondaryPermission->currentPage(),
                    'last_page' => $secondaryPermission->lastPage(),
                    'from' => $secondaryPermission->firstItem(),
                    'to' => $secondaryPermission->lastItem(),
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

    public function deleteSecondaryPermission(Request $request, $sp_id)
    {
        $SecondaryPermission = Secondary_permission::where('sp_id', $sp_id)->update(['is_deleted'=> '1']);

        if($SecondaryPermission){
            return response()->json([
                'success' => true,
                'message' => 'Secondary permission deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }
////////////fetch Sp to update Sp
public function updateSpId($sp_id){

    $sps = Secondary_permission::find($sp_id);
    if($sps){
        return response()->json([
            'success' => true,
            'message' => 'List sp',
            'data'=> $sps
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
    }
    public function editSecondaryPermission(Request $request, $sp_id)
    {
        $SecondaryPermission = $request->validate([
            'name'=>'required|string',
            'status' => 'required|in:active,inactive',
            'slug' => 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $isDeleted = isset($SecondaryPermission['is_deleted']) ? ($SecondaryPermission['is_deleted'] == 'delete' ? 1 : 0) : 0; 
        $updateSecondaryPermission = Secondary_permission::where('sp_id', '=', $sp_id)->update([
            'name' => $SecondaryPermission['name'],    
            'status' => $SecondaryPermission['status']=='active' ? 1 : 0,
            'slug' => $SecondaryPermission['slug'],
            'is_deleted' => $isDeleted,
        ]); 
        if($updateSecondaryPermission){
            return response()->json([
                'success' => true,
                'message' => 'Secondary permission updated successfully.',
                'data' => $SecondaryPermission
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

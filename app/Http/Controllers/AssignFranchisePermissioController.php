<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AssignPermissionToFranchiseSystem;

class AssignFranchisePermissioController extends Controller
{
    public function addAssignFranchisePermission(Request $request)
    {
        $AssignPermission  = $request->validate([
            'franchise_permission_id'=>'required|string',
            'franchiseSystem_id' => 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $isDeleted = isset($AssignPermission['is_deleted']) ? ($AssignPermission['is_deleted'] == 'delete' ? 1 : 0) : 0; 
        $franchisePermissionId = $request->franchise_permission_id;
        $franchiseSystemId = $request->franchiseSystem_id;
       
        $AssignPermission = new AssignPermissionToFranchiseSystem;
        $AssignPermission->franchise_permission_id = $franchisePermissionId;
        $AssignPermission->franchiseSystem_id = $franchiseSystemId;
        $AssignPermission->is_deleted = $isDeleted;
        $AssignPermission->save();

        $result = AssignPermissionToFranchiseSystem::join('franchise_permissions', 'assign_permission_to_franchise_system.franchise_permission_id', '=', 'franchise_permissions.franchise_permission_id')
    ->join('franchise_systems', 'assign_permission_to_franchise_system.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
    ->where('franchise_permissions.franchise_permission_id', $franchisePermissionId)
    ->where('franchise_systems.franchiseSystem_id', $franchiseSystemId)
    ->select('assign_permission_to_franchise_system.*', 'franchise_permissions.permission_name as Franchise_permission', 'franchise_systems.name as franchiseSystem_name')
    ->get();
    
       return response()->json([
        'success' => $result ? true : false,
        'message' => $result ? 'Permission assign created successfully.' : 'something went wrong',
        'data' => $result,
       ]);
    }
    public function listFranchisePermission(Request $request){
        $AssignPermission = AssignPermissionToFranchiseSystem::join('franchise_permissions', 'assign_permission_to_franchise_system.franchise_permission_id', '=', 'franchise_permissions.franchise_permission_id')
        ->join('franchise_systems', 'assign_permission_to_franchise_system.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
        ->select(
            'assign_permission_to_franchise_system.*',
         'franchise_permissions.permission_name as Franchise_permission',
          'franchise_systems.name as franchiseSystem_name'
          )
        ->orderBy('assign_permission_to_franchise_system.APTofranchiseSystem_id', 'desc')
        ->paginate(10);

        // echo '<pre>';print_r($RolePermission);die();
        if($AssignPermission){
            return response()->json([
                'success' => true,
                'message' => 'Assign permissions listed successfully.',
                'data' => $AssignPermission
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


    public function deleteAssignFranchisePermission(Request $request,  $APTofranchiseSystem_id)
    {
        $AssignPermission = AssignPermissionToFranchiseSystem::where('APTofranchiseSystem_id', $APTofranchiseSystem_id)->update(['is_deleted' => '1']);

        if($AssignPermission){
        return response()->json([
            'success' =>true,
            'message' => 'Assign permission deleted successfully'
        ],200);
    }

    else{
        return response()->json([
            'success' =>false,
            'message'=> 'Something went wrong' 
        ],401);
    }
    }


    public function editAssignFranchisePermission($APTofranchiseSystem_id)
    {
        
        $AssignPermission = AssignPermissionToFranchiseSystem::find($APTofranchiseSystem_id);
        // dd($rolePermission);
        if($AssignPermission){
        return response()->json([
            'success' =>true,
            'message' => 'Assign permission listed successfully',
            'data' => $AssignPermission
        ]);
    }
    else{
        return response()->json([
            'success'=>false,
            'message'=> 'Something went wrong',
            'data' => []
        ]);
    }
    }

    public function UpdateAssignFranchisePermission(Request $request,  $APTofranchiseSystem_id)
    {
        $request->validate([
            'franchise_permission_id'=>'required|string',
            'franchiseSystem_id' => 'required|string',
        ]);


        $franchisePermissionId = $request->franchise_permission_id;
        $franchiseSystemId = $request->franchiseSystem_id;
    
        // Find the existing permission to update
        $AssignPermission = AssignPermissionToFranchiseSystem::where('APTofranchiseSystem_id', $APTofranchiseSystem_id)->first();
    
        if (!$AssignPermission) {
            return response()->json([
                'success' => false,
                'message' => 'Permission not found.',
                'data' => null,
            ]);
        }
    
        // Update the permission details
        $AssignPermission->franchise_permission_id = $franchisePermissionId ;
        $AssignPermission->franchiseSystem_id = $franchiseSystemId;
    
        $AssignPermission->save();
    
        $result = AssignPermissionToFranchiseSystem::join('franchise_permissions', 'assign_permission_to_franchise_system.franchise_permission_id', '=', 'franchise_permissions.franchise_permission_id')
        ->join('franchise_systems', 'assign_permission_to_franchise_system.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
        ->where('franchise_permissions.franchise_permission_id', $franchisePermissionId)
        ->where('franchise_systems.franchiseSystem_id', $franchiseSystemId)
        ->select('assign_permission_to_franchise_system.*', 'franchise_permissions.permission_name as Franchise_permission', 'franchise_systems.name as franchiseSystem_name')
        ->get();
    
        return response()->json([
            'success' => true,
            'message' => 'Assign permission updated successfully.',
            'data' => $result,
        ]);
    }
}

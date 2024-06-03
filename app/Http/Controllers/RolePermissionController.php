<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\{Permission,Role,Role_permission};

class RolePermissionController extends Controller
{


    public function addNewRolePermission(Request $request)
    {
        $request->validate([
            'role_id'=>'required|string',
            'permission_id' => 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);

        $roleId = $request->role_id;
        $permissionId = $request->permission_id;
        $isDeleted = isset($request->is_deleted) ? ($request->is_deleted == 'delete' ? 1 : 0) : 0; 
       
        $RolePermission = new Role_permission;
        $RolePermission->role_id = $roleId;
        $RolePermission->permission_id = $permissionId;
        $RolePermission->is_deleted = $isDeleted;
        $RolePermission->save();

        $result = Role_permission::join('roles', 'role_permissions.role_id', '=', 'roles.role_id')
    ->join('permissions', 'role_permissions.permission_id', '=', 'permissions.permission_id')
    ->where('roles.role_id', $roleId)
    ->where('permissions.permission_id', $permissionId)
    ->select('role_permissions.role_permission_id', 'roles.name as role_name', 'permissions.name as permission_name')
    ->get();
    
       return response()->json([
        'success' => $result ? true : false,
        'message' => $result ? 'Permission created successfully.' : 'something went wrong',
        'data' => $result,
       ]);
    }
    public function rolePermissionsList(Request $request){
        $RolePermission = Role_permission::join('roles', 'role_permissions.role_id', '=', 'roles.role_id')
        ->join('permissions', 'role_permissions.permission_id', '=', 'permissions.permission_id')
        ->select(
            'role_permissions.role_permission_id',
             'roles.name  as role_name', 
             'permissions.name as permission_name',
        )
        ->orderBy('role_permissions.role_permission_id', 'desc')
        ->get();

        // echo '<pre>';print_r($RolePermission);die();
        if($RolePermission){
            return response()->json([
                'success' => true,
                'message' => 'Role permissions listed successfully.',
                'data' => $RolePermission
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


    public function deleteRolePermission(Request $request,  $role_permission_id)
    {
        $RolePermission = Role_permission::where('role_permission_id', $role_permission_id)->update(['is_deleted' => '1']);

        if($RolePermission){
        return response()->json([
            'success' =>true,
            'message' => 'Role permission deleted successfully'
        ],200);
    }

    else{
        return response()->json([
            'success' =>false,
            'message'=> 'Something went wrong' 
        ],401);
    }
    }


    public function updateRolePermission($role_permission_id)
    {
        
        $rolePermission = Role_permission::find($role_permission_id);
        // dd($rolePermission);
        if($rolePermission){
        return response()->json([
            'success' =>true,
            'message' => 'Role permission updated successfully',
            'data' => $rolePermission
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

    public function editRolePermission(Request $request,  $role_permission_id)
    {
        $request->validate([
            'role_id'=>'required|string',
            'permission_id' => 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);


        $role_permission_id = $request->role_permission_id;
        $roleId = $request->role_id;
        $permissionId = $request->permission_id;
    
        // Find the existing permission to update
        $RolePermission = Role_permission::where('role_permission_id', $role_permission_id)->first();
    
        if (!$RolePermission) {
            return response()->json([
                'success' => false,
                'message' => 'Permission not found.',
                'data' => null,
            ]);
        }
    
        // Update the permission details
        $RolePermission->role_id = $roleId;
        $RolePermission->permission_id = $permissionId;
    
        $RolePermission->save();
    
        // Fetch the updated permission details
        $result = Role_permission::join('roles', 'role_permissions.role_id', '=', 'roles.role_id')
            ->join('permissions', 'role_permissions.permission_id', '=', 'permissions.permission_id')
            ->where('role_permissions.role_permission_id', $role_permission_id)
            ->select('role_permissions.role_permission_id', 'roles.name as role_name', 'permissions.name as permission_name')
            ->first();
    
        return response()->json([
            'success' => true,
            'message' => 'Role permission updated successfully.',
            'data' => $result,
        ]);
    }
    }
        
    


<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;/////schema is a facade that interact with database
use App\Models\{Permission,User,User_permissions};

class UserPermissionsController extends Controller
{
    public function addNewUserPermission(Request $request)
    {
        $request->validate([
            'user_id'=>'required|string',
            'permission_id' => 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);

        $userId = $request->user_id;
        $permissionId = $request->permission_id;
        $isDeleted = isset($request->is_deleted) ? ($request->is_deleted == 'delete' ? 1 : 0) : 0; 
       
        $UserPermission = new User_permissions;
        $UserPermission->user_id = $userId;
        $UserPermission->permission_id = $permissionId;
        $UserPermission->is_deleted = $isDeleted;
        $UserPermission->save();

        $result = User_permissions::join('users', 'user_permissions.user_id', '=', 'users.user_id')
    ->join('permissions', 'user_permissions.permission_id', '=', 'permissions.permission_id')
    ->where('users.user_id', $userId)
    ->where('permissions.permission_id', $permissionId)
    ->select('user_permissions.user_permission_id', 'users.name as user_name', 'permissions.name as permission_name')
    ->get();
    
       return response()->json([
        'success' => $result ? true : false,
        'message' => $result ? 'Permission assigned successfully.' : 'something went wrong',
        'data' => $result,
       ]);
    }    
    public function userPermissionsList(Request $request)
    {
        // $UserPermission =User_permissions::join('users', 'user_permissions.user_id', '=', 'users.user_id')
        //     ->join('permissions', 'user_permissions.permission_id', '=', 'users.permission_id')
        $UserPermission = User_permissions::join('users', 'user_permissions.user_id', '=', 'users.user_id')
    ->join('permissions', function ($join) {
        $join->on('user_permissions.permission_id', '=', 'permissions.permission_id')
             ->when(
                 Schema::hasColumn('permissions', 'parent'),
                 function ($query) {
                     // Add the join condition only if the 'parent' column exists
                     $query->on('permissions.parent', '=', 'parent'); // Replace 'some_value' with your actual condition
                 },
                 function ($query) {
                     // If 'parent' column doesn't exist, you can return an error message or handle it as needed
                     throw new \Exception('Permission does not have a parent.');
                 }
             );
    })
            ->select(
                'user_permissions.user_permission_id',
                'users.name as user_name',
                'users.email',
                'permissions.name as permission_name',
                'permissions.parent as parent_permission'
            )
            ->orderBy('user_permissions.user_permission_id', 'desc')
            ->get();
        if($UserPermission)
        {
            return response()->json([
                'success' => true,
                'message' => 'User permissions listed successfully.',
                'data' => $UserPermission
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

    //////delete users
    public function deleteUserPermission(Request $request, $user_permission_id)
    {
    $UserPermission = User_permissions::where('user_permission_id', $user_permission_id)->update(['is_deleted'=>'1']);

    if($UserPermission){
        return response()->json([
            'success' => true,
            'message' => 'User permission deleted successfully.',
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
}

/////////////fetch user permission data in update form
public function usersPermissionListId($user_permission_id){

    $usersPermission = User_permissions::find($user_permission_id);
    if($usersPermission){
        return response()->json([
            'success' => true,
            'message' => 'List user',
            'data'=> $usersPermission
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
    }

    public function usersPermissionUpdate(Request $request)
    {
        $request->validate([
            'user_id' => 'required|string',
            'permission_id' => 'required|string',
        ]);
    
        $user_permission_id = $request->user_permission_id;
        $userId = $request->user_id;
        $permissionId = $request->permission_id;
    
        // Find the existing permission to update
        $UserPermission = User_permissions::where('user_permission_id', $user_permission_id)->first();
    
        if (!$UserPermission) {
            return response()->json([
                'success' => false,
                'message' => 'Permission not found.',
                'data' => null,
            ]);
        }
    
        // Update the permission details
        $UserPermission->user_id = $userId;
        $UserPermission->permission_id = $permissionId;
        // Update other fields as needed
    
        $UserPermission->save();
    
        // Fetch the updated permission details
        $result = User_permissions::join('users', 'user_permissions.user_id', '=', 'users.user_id')
            ->join('permissions', 'user_permissions.permission_id', '=', 'permissions.permission_id')
            ->where('user_permissions.user_permission_id', $user_permission_id)
            ->select('user_permissions.user_permission_id', 'users.name as user_name', 'permissions.name as permission_name')
            ->first();
    
        return response()->json([
            'success' => true,
            'message' => 'User Permission updated successfully.',
            'data' => $result,
        ]);
    }

    /////////view user permissions
public function ViewUserPermissions($user_permission_id){
    $userPermissions = User_permissions::find($user_permission_id);
if($userPermissions){
    return response()->json([
        'success' => true,
        'message' => 'view user permissions',
        'data'=> $userPermissions
    ],200);
}
else{
    return response()->json([
        'success' => false,
        'message' => 'Something went wrong.',
    ],401);
}
}
    
}

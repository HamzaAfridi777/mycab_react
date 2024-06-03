<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Role;

class RoleController extends Controller
{

  // Define the allowed roles
  private $allowedRoles = [
    'superadmin', 
    'taskadmin', 
    'teamadmin', 
    'customeradmin', 
    'accountant manager', 
    'franchise owner', 
    'student manager'
];

    public function addNewRole(Request $request)
    {
         $request->validate([
          //  'name'=>'required|string',
          'name' => [
            'required',
            'string',
            // Validate if the name is one of the allowed roles
            function ($attribute, $value, $fail) {
  // Normalize the role name by converting to lowercase and removing spaces
  $normalizedRoleName = strtolower(str_replace(' ', '', $value));
  $normalizedAllowedRoles = array_map(function($role) {
      return strtolower(str_replace(' ', '', $role));
  }, $this->allowedRoles);

  if (!in_array($normalizedRoleName, $normalizedAllowedRoles)) {
    return $fail('The role name is not valid.');
}
            }
        ],
            'status' => 'required|in:active,inactive',
            'is_deleted' => 'nullable|in:delete,not_delete',
            'slug' => 'nullable|unique:roles'
        ]);
       // $isDeleted = isset($role['is_deleted']) ? ($role['is_deleted'] == 'delete' ? 1 : 0) : 0; 
       $isDeleted = $request->is_deleted == 'delete' ? 1 : 0; 
       $role = new Role;
        $role->name = $request->name;
        $role->status = $request->status== 'active' ? 'active' :'inactive';
        $role->is_deleted = $isDeleted;

       // Generate a slug from the name
       $slug = Str::slug($request->name, '-');
       $checkSlug = Role::where('slug', $slug)->first();
      // $checkSlug = Role::checkSlug($slug);

     if(empty($checkSlug)){
    $role->slug = $slug;
    $role->save();
}
else{
    // Generate a new slug by appending the role ID
       // Generate a new slug by appending a random string
    $new_slug = $slug . '-' . Str::random(5);
   // $new_slug = $slug. '-' .$role->role_id;
    $role->slug = $new_slug;
    $role->save();
}

        if($role)
        {
            return response()->json([
                'success' => true,
                'message' => 'Role created successfully.',
                'data' => $role
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
    public function usersRoleList()
    {
        $roles = Role::where('is_deleted', 0)->orderBy('role_id', 'desc')->paginate(100);
        if($roles->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Users role list.',
                'data' => $roles,
                'pagination' => [
                    'total' => $roles->total(),
                    'per_page' => $roles->perPage(),
                    'current_page' => $roles->currentPage(),
                    'last_page' => $roles->lastPage(),
                    'from' => $roles->firstItem(),
                    'to' => $roles->lastItem(),
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
    public function deleteRole(Request $request, $role_id)
    {
        $role = Role::where('role_id', $role_id)->update(['is_deleted'=> '1']);

        if($role){
            return response()->json([
                'success' => true,
                'message' => 'Role deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }
    ////////////fetch role to update role
    public function updateRoleId($role_id){

        $roles = Role::find($role_id);
        if($roles){
            return response()->json([
                'success' => true,
                'message' => 'List role',
                'data'=> $roles
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }
        //////////update role
   //////////update role
   public function editNewRole(Request $request, $role_id)
   {
       $roleData = $request->validate([
           'name'=>'required|string',
           'status' => 'required|in:active,inactive',
           'slug' => 'nullable|string'
       ]);

       $role = Role::findOrFail($role_id);

       // Update role fields
       $role->name = $roleData['name'];
       $role->status = $roleData['status'];
       $role->slug = Str::slug($roleData['name'], '-');

       // Save the updated role
       $role->save();

       // Check if the new slug is unique
       $checkSlug = Role::where('slug', $role->slug)->where('role_id', '!=', $role->role_id)->exists();

       if (!$checkSlug) {
           // Slug is unique, no need for further action
       } else {
           // Slug is not unique, generate a new slug by appending the role ID
           $newSlug = $role->slug . '-' . $role->role_id;
           $role->slug = $newSlug;
           $role->save();
       }

       return response()->json([
           'success' => true,
           'message' => 'Role updated successfully.',
           'data' => $role
       ]);
   }
    
///////view role
    public function ViewRole($role_id)
    {
        $role = Role::find($role_id);
        if($role){
            return response()->json([
                'success' =>true,
                'message' =>'view role successfully',
                'data' => $role
            ]);
        }
    }
}


    

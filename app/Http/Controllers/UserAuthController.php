<?php
namespace App\Http\Controllers;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Notifications\EmailNotification;
use App\Notifications\tokenExpireNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use App\Models\{User,User_roles,User_permissions,Role,Permission,Role_permission};
use App\Models\Modules\SuperAdmin\Models\Team_admin_assign_fleets;
use App\Models\Modules\SuperAdmin\Models\Team_admin;
use App\Models\Modules\SuperAdmin\Models\Fleets;
use App\Helpers\EmailHelper;
use Hash;
use Auth;


class UserAuthController extends Controller
{
    public function addNewUser(Request $request){ 

        $request->validate([
           // 'name'=>'required|string|unique:users',
           'name' => [
            'required',
            'string',
            Rule::unique('users')->where(function ($query) use ($request) {
                return $query->where('is_deleted', 0);
            }),
        ],
            //'email'=>'required|string|email|unique:users',
            'email' => [
                'required',
                'string',
                'email',
                Rule::unique('users')->where(function ($query) use ($request) {
                    return $query->where('is_deleted', 0);
                }),
            ],
            'password'=>'required|min:6',
            'status' => 'required|in:active,inactive',
            'role_id'=>'required|string',
            // 'permission_id'=>'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'franchise_id'=>'required|string',
            'is_franchise_owner' => 'nullable|in:franchise_owner,customer',
        ]);
        $roleId = $request->role_id;
        $isDeleted = isset($user['is_deleted']) ? ($user['is_deleted'] == 'delete' ? 1 : 0) : 0; 

            $user = new User;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = $request->password;
            $user->status = $request->status=='active' ? 'active' : 'inactive';
            $user->role_id = $roleId;
            // $user->permission_id = $request->permission_id;
            $user->is_deleted = $isDeleted;
            $user->franchise_id = $request->franchise_id;
            $user->is_franchise_owner = $request->is_franchise_owner=='franchise_owner' ? 1 : NULL;
            

            if ($request->hasFile('image'))
            {
              $image= $request->file('image');
              $filename = time().'-'.$image->getClientOriginalName();
              $image->storeAs('public/images/', $filename);
              $user->image = $filename;
              // dd($user->image);
            }
            $user->save();
    
///////////team admin
// if($user){
// $usersWithTeamAdminRole = User::join('roles', 'users.role_id', '=', 'roles.role_id')
// ->where('roles.slug', 'teamadmin')
// ->select('users.user_id', 'users.name')
// ->where('users.is_deleted', 0)
// //  ->select('users.name as teamadmin_name','users.email','users.status')
// ->paginate(10);

//      foreach ($usersWithTeamAdminRole as $user) {
//             Team_admin::create([
//             'user_id' => $user->user_id,
//             'name' => $user->name
//    ]);
// }
//    }
    //    $user->setRememberToken(Str::random(60));
    //     $user->save();

        $result = Role::join('users', 'users.role_id', '=', 'roles.role_id')
        ->where('users.role_id', $request->role_id)
        ->orderBy('users.user_id', 'desc')
        ->select('users.*', 'roles.name as role_name')
        ->get();
    
     ////////////verify email
     $subject = 'MyCab Registartion';
     
     ////////////verify email
     $subject = 'MyCab Registartion';
     // $template = '<p>Please verify your account .</p>';
//$verifyEmail = url('api/verify-email/' . $user->user_id);
$verifyEmail = route('verify.email', ['user' => $user->user_id]);


     $template = '
 <!-- Complete Email template -->
 <body style="background-color: #f2f2f2;">
     <table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white" style="border: 2px solid #4cb96b;">
         <tbody>
             <tr>
                 <td align="center">
                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="col-550" width="550">
                         <tbody>
                             <tr>
                                 <td align="center" style="background-color: #4cb96b; height: 50px;">
                                     <a href="#" style="text-decoration: none;">
                                         <p style="color:white; font-weight:bold;">MyCab</p>
                                     </a>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </td>
             </tr>
             <tr style="height: 300px;">
                 <td align="center" style="border: none; border-bottom: 2px solid #4cb96b; padding-right: 20px; padding-left:20px">
                     <p style="font-weight: bolder; font-size: 42px; letter-spacing: 0.025em; color:black;">MyCab</p>
                 </td>
             </tr>
             <tr style="display: inline-block;">
                 <td style="height: 150px; padding: 20px; border: none; border-bottom: 2px solid #4cb96b; background-color: white;">
                     <h2 style="text-align: left; align-items: center;">Verify Email Address</h2>
                     <p class="data" style="text-align: justify-all; align-items: center; font-size: 15px; padding-bottom: 12px;">Please click the button below to verify your email address.</p>
                     <p>
                         <a href="'.$verifyEmail. '" style="text-decoration: none; color: white; background-color: #4cb96b; padding: 10px 30px; font-weight: bold; border-radius: 5px;">Verify Email</a>
                     </p>
                 </td>
             </tr>
         </tbody>
     </table>
 </body>
';

     
    $emailVerification = EmailHelper::sendEmail($request->name, $request->email, $template, $subject);

    return response()->json([
     'success' => $result ? true : false,
     'message' => $result ? 'User created successfully.' : 'something went wrong',
     'data' => $result,
    ]);

    //  $emailVerification = $this->sendEmail($request->name,$request->email,$template,$subject);

    //    return response()->json([
    //     'success' => $result ? true : false,
    //     'message' => $result ? 'User created successfully.' : 'something went wrong',
    //     'data' => $result,
    //    ]);          
    
}
///////////////////verify email
public function verifyEmail(Request $request, User $user)
    {
        // Check if the user's email is already verified
        if ($user->email_verified_at !== null) {
            return response()->json(['message' => 'Email is already verified'], 422);
        }

        // Verify the email address
        $user->email_verified_at = now();
        $user->status = 'active';
        $user->save();

        return redirect('/');
    }


///////login
    public function login(Request $request){
        $loginUserData = $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|min:6'
        ]);
        // dd($loginUserData);
          // Find the user by email
        $user = User::with('role')->where('email',$loginUserData['email'])->first();
        $roleName = Role::where('role_id', $user->role_id)->select('name')->first();
        
         // Check if user exists and if password matches
        if(!$user || !Hash::check($loginUserData['password'],$user->password)){
            return response()->json([
                'success' => false,
                'message' => 'User doesn\'t exist',
                'data' => []
            ],401);
        }
          // Check if user is inactive or marked as deleted
        elseif($user->status == 'inactive' || $user->is_deleted == 1){
            return response()->json([
                'success' => false,
                'message' => 'User doesn\'t exist',
                'data' => []
            ],401);
        }

 // Generate a new token for the user
        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
       
        // Update the remember token in the user record
        $user->forceFill([
            'remember_token' => $token,
        ])->save();

        return response()->json([
            'success' => true,
            'message' => 'Login successfully',
            'data' => [
                'user_id' => $user->user_id,
                'name' => $user->name,
                'email' => $user->email,
                'image' => $user->image,
                'role' => $roleName,
                
            ],
            'access_token' => $token,
        ],200);
    }
/////logout
    public function logout(){
        $logedInUserID = auth()->user()['user_id'];
          auth()->user()->tokens()->delete();
          User::where('user_id', $logedInUserID)->update(['remember_token'=>NULL]);
        

        return response()->json([
          "message"=>"logged out"
          
        ]);
    }
    ///////list users
    public function usersList()
    {
        // echo auth()->user()['id'];die();

        // $users = User::where('is_deleted', 0)->orderBy('user_id', 'desc')->paginate(10);
        $users =User::select(
            'users.user_id',
            'users.name',
            'users.email',
            'users.password',
            'users.status',
            'users.image',
            'franchises.name as franchise_name',
            'roles.name as role_name',
            // 'permissions.name as permission_name'
        )
    ->where('users.is_deleted', 0)
    ->orderBy('user_id', 'desc')
    ->join('roles', 'users.role_id', '=', 'roles.role_id')
    ->join('franchises', 'users.franchise_id', '=', 'franchises.franchise_id')
    ->paginate(100);

    foreach ($users as $user) {
        $user->image = asset('storage/images/'.$user->image); // Get the full URL of the image
    }

 // Calculate the total number of users
 $totalUsers = User::where('is_deleted', 0)->count();

        if($users->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Users list.',
                'data' => $users,
                'totalUsers' => $totalUsers, // Add total number of users to the response
                'pagination' => [
                    'total' => $users->total(),
                    'per_page' => $users->perPage(),
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                    'from' => $users->firstItem(),
                    'to' => $users->lastItem(),
                ],
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'No data available.',
                'data' => [],
                'totalUsers' => $totalUsers // Add total number of users to the response
            ],401);

        }
    }
//////delete users
public function deleteUser(Request $request, $user_id)
{
    // Mark user as deleted
    $user = User::where('user_id', $user_id)->update(['is_deleted' => 1]);

    if ($user) {
        // Find the user by user_id
        $user = User::find($user_id);
        if ($user) {
            // Revoke all tokens for the user
            $user->tokens()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully.',
        ], 200);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ], 401);
    }
}

/////////////fetch user data in update form
    public function usersListId($user_id){

        $users = User::find($user_id);
        if($users){
            return response()->json([
                'success' => true,
                'message' => 'List user',
                'data'=> $users
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }
//////Update users
public function editNewUser(Request $request, $user_id)
{
    $UserData = $request->validate([
        'name' => 'required|string',
        'email' => 'unique:users,email,' . $user_id . ',user_id',
        'status' => 'required|in:active,inactive',
        'role_id' => 'required|string',
        'is_franchise_owner' => 'required|in:franchise_owner,customer',
        'franchise_id' => 'required|string',
    ]);
    $roleId = $request->role_id;

    $status = $UserData['status'] === 'active' ? 'active' : 'inactive';
    $is_franchise_owner = $UserData['is_franchise_owner'] === 'franchise_owner' ? '1' : NULL;

    $UpdateUser = User::where('user_id', $user_id)->first();

    if (!$UpdateUser) {
        return response()->json([
            'success' => false,
            'message' => 'User not found',
            'data' => []
        ], 404);
    }

    // Check if a new image is uploaded
    if ($request->hasFile('image')) {
        // Delete the previous image
        if ($UpdateUser->image) {
            Storage::delete('public/images/' . $UpdateUser->image);
        }

        // Store the new image
        $image = $request->file('image');
        $filename = time() . '-' . $image->getClientOriginalName();
        $image->storeAs('public/images/', $filename); // Store image in storage/app/public/images
        $UpdateUser->image = $filename;
    }

    // Update user data
    $UpdateUser->name = $UserData['name'];
    $UpdateUser->email = $UserData['email'];
    $UpdateUser->status = $status;
    $UpdateUser->role_id = $roleId;
    $UpdateUser->is_franchise_owner = $is_franchise_owner;
    $UpdateUser->franchise_id = $UserData['franchise_id'];

    $UpdateUser->save();

    $result = Role::join('users', 'users.role_id', '=', 'roles.role_id')
        ->where('users.role_id', $request->role_id)
        ->orderBy('users.user_id', 'desc')
        ->select('users.*', 'roles.name as role_name')
        ->get();

        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'User update successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
}

/////////view user
public function usersView($user_id){
    $users = User::find($user_id);
if($users){
    return response()->json([
        'success' => true,
        'message' => 'view user',
        'data'=> $users
    ],200);
}
else{
    return response()->json([
        'success' => false,
        'message' => 'Something went wrong.',
    ],401);
}
}

/////////////sidebar and header auth user image api
public function userImage()
{
    $user = auth()->user();

    if ($user) {
        return response()->json([
            'success' => true,
            'message' => 'View user',
            'data' => [
                'name' => $user->name,
                'image' => asset('storage/images/'.$user->image),
            ],
        ], 200);
    } else {
        return response()->json([
            'success' => false,
            'message' => 'User not authenticated.',
        ], 401);
    }
}



//   ///////////template base
 public function sendLink(Request $request)
 {
     $UserData = $request->validate([
         'email'=>'required|string|email',
     ]);
     $template = '
     <!-- Complete Email template -->
<body style="background-color:grey"> 
	<table align="center" border="0" cellpadding="0" cellspacing="0"
		width="550" bgcolor="white" style="border:2px solid black"> 
		<tbody> 
			<tr> 
				<td align="center"> 
					<table align="center" border="0" cellpadding="0"
						cellspacing="0" class="col-550" width="550"> 
						<tbody> 
							<tr> 
								<td align="center" style="background-color: #4cb96b; 
										height: 50px;"> 
									<a href="#" style="text-decoration: none;"> 
										<p style="color:white; 
												font-weight:bold;"> 
											MyCab 
										</p> 
									</a> 
								</td> 
							</tr> 
						</tbody> 
					</table> 
				</td> 
			</tr> 
			<tr style="height: 300px;"> 
				<td align="center" style="border: none; 
						border-bottom: 2px solid #4cb96b; 
						padding-right: 20px;padding-left:20px"> 
					<p style="font-weight: bolder;font-size: 42px; 
							letter-spacing: 0.025em; 
							color:black;"> 
						My cab 
					</p> 
				</td> 
			</tr> 
			<tr style="display: inline-block;"> 
				<td style="height: 150px; 
						padding: 20px; 
						border: none; 
						border-bottom: 2px solid #361B0E; 
						background-color: white;"> 
					
					<h2 style="text-align: left; 
							align-items: center;"> 
						Forget Password 
				</h2> 
					<p class="data"
					style="text-align: justify-all; 
							align-items: center; 
							font-size: 15px; 
							padding-bottom: 12px;"> 
						Click on given link to change password
					</p> 
					<p> 
						<a href= "#"
						style="text-decoration: none; 
								color:black; 
								border: 2px solid #4cb96b; 
								padding: 10px 30px; 
								font-weight: bold;"> 
						Change password
					</a> 
					</p> 
				</td> 
			</tr> 
		</tbody> 
	</table> 
</body> 

     ';
     $user =  User::where('email', $UserData['email'])->get();
     $subject = 'Change Password';
     $result = EmailHelper::sendEmail($user[0]->name,$UserData['email'],$template,$subject);

    
    if($user->isNotEmpty())
    {
     
     if($result){
         return response()->json([
             'success' => true,
             'message' => 'Link sent, check email.',
         ],200);
     }
     else{
         return response()->json([
             'success' => false,
             'message' => 'Something went wrong',
         ],401);
 
     }
 
    }
    else
    {
     return response()->json([
         'success' => false,
         'message' => 'User does not exist.',
     ],401);
    }
      
 }

 public function changePassword(Request $request)
 {
   $UserData = $request->validate([
       'email'=>'required|string',
       'new_password' => 'required|min:6',
       'confirm_password'=>'required|min:6',
   ]);
   // echo '<pre>';print_r($UserData);die();
   $user =  User::where('email', $UserData['email'])->get();
    if($user->isNotEmpty())
    {
     $changePassword = User::where('email', '=', $UserData['email'])->update([    
       'password' => Hash::make($UserData['new_password']),
     ]);
   //   echo '<pre>';print_r($changePassword);die();
   if($UserData){
       return response()->json([
           'success' => true,
           'message' => 'Password updated successfully.'
       ],200);
   }
   else{
       return response()->json([
           'success' => false,
           'message' => 'Something went wrong'
       ],401);

   }
  }
  else
  {
   return response()->json([
       'success' => false,
       'message' => 'user does not exists.',
   ],401);
  }
   
}

public function getUserData()
{
    $users = User::orderBy('user_id', 'desc')->get();
    if ($users->isNotEmpty()) {
        $getUserData = [];

        foreach ($users as $user_row) {
            $getUserData[] = [
                'user_id' => $user_row->user_id,
                'name' => $user_row->name,
                'email' => $user_row->email,
                'status' => $user_row->status,
                'getRollData' => $this->getRollData($user_row->role_id),
                'getPermissionData' => $this->getPermissionData($user_row->permission_id),
            ];
        }

        return response()->json([
            'success' => true,
            'data' => $getUserData
        ],200);
    }

    return null;
}


public function getRollData($role_id)
{

    $role = Role::where('role_id', $role_id)->get();
    if ($role->isNotEmpty()) {
        $getRoleData = [];

        foreach ($role as $role_row) {
            $getRoleData[] = [
                'roll_name' => $role_row->name,
            ];
        }
        return $getRoleData;
    }
    return null;
}


public function getPermissionData($permission_id)
{

    $permission = Permission::where('permission_id', $permission_id)->get();
    if ($permission->isNotEmpty()) {
        $getPermissionData = [];

        foreach ($permission as $permission_row) {
            $getPermissionData[] = [
                'permission_name' => $permission_row->name,
            ];
        }
        return $getPermissionData;
    }
    return null;
}

/////////send notification
public function TokenExpire(Request $request){
    $title = $request->input('title');
    $body = $request->input('body');
    $user = User::first();
    Notification::send($user, new tokenExpireNotification($title, $body));
    return response()->json([
        'success' => true,
        'message' => 'Notification sent successfully.'
    ]);
} 





///////////////////teamAdmin list
public function TaskAdminList()
{
    $usersWithTaskAdminRole = User::join('roles', 'users.role_id', '=', 'roles.role_id')
    ->where('roles.slug', 'taskadmin')
    ->where('users.is_deleted', 0)
    ->select('users.user_id', 'users.name', 'users.email', 'users.status', 'users.image')
    ->paginate(10);

    return response()->json([
        'success' => true,
        'message' => 'TaskAdmin list',
        'data' => $usersWithTaskAdminRole
    ]);
}

///////////////////teamAdmin list
public function TeamAdminList()
{
    $usersWithTeamAdminRole = User::join('roles', 'users.role_id', '=', 'roles.role_id')
    ->where('roles.slug', 'teamadmin')
    ->where('users.is_deleted', 0)
    ->select('users.user_id', 'users.name', 'users.email', 'users.status', 'users.image')
    ->paginate();

    return response()->json([
        'success' => true,
        'message' => 'TeamAdmin list',
        'data' => $usersWithTeamAdminRole
    ]);
}


public function getUsersSummary()
{
    $totalUsers = User::where('status', 'active')->count();
    $loggedInUsersCount = User::whereNotNull('remember_token')->count();

    if ($totalUsers > 0) {
        $percentage = ($loggedInUsersCount / $totalUsers) * 100;
    } else {
        $percentage = 0;
    }

 // Calculate the total percentage
 $totalPercentage = number_format($percentage, 2);

     $data = [
        [
            'title' => 'Total Users',
            'value' => $totalUsers
        ],
        [
            'title' => 'Logged-in Users',
            'value' => $loggedInUsersCount
        ],
        [
            'title' => 'Percentage',
            'value' => number_format($percentage, 2) . '%'
        ],
        [
            'title' => 'Total Percentage',
            'value' => $totalPercentage . '%'
        ]
    ];

    return response()->json([
        'success' => true,
        'message' => 'Users Summary',
        'data' => $data
    ]);
}
///////////faranchise owner
public function franchiseOwner()
{
    $usersWithfranchiseOwner = User::where('is_franchise_owner', 1)
    ->paginate(10);

    return response()->json([
        'success' => true,
        'message' => 'Franchise owner list',
        'data' => $usersWithfranchiseOwner
    ]);
}

}


   
  



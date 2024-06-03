<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User_roles;
use App\Models\User;
use App\Models\Role;


class UserRoleController extends Controller
{
    public function userRoleList(Request $request)
    {
        // $UserRole = User_roles::orderBy('user_role_id', 'desc')->get();
        $UserRole = User_roles::join('users', 'user_roles.user_id', '=', 'users.user_id')
            ->join('roles', 'user_roles.role_id', '=', 'roles.role_id')
            ->select(
                'user_roles.user_role_id',
                'users.name as user_name',
                'users.email',
                'roles.name as role_name'
            )
            ->orderBy('user_roles.user_role_id', 'desc')
            ->get();
        if($UserRole)
        {
            return response()->json([
                'success' => true,
                'message' => 'User Role listed successfully.',
                'data' => $UserRole
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
    }


<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserActivityController extends Controller
{
     // Existing method for task admin data
    public function getTaskAdminData($user_id)
    {
        try {
            // Log the user_id received
            Log::info('Fetching task admin data for user_id:', ['user_id' => $user_id]);

            // Verify the user has the taskadmin role
            $user = User::where('user_id', $user_id)
                ->join('roles', 'users.role_id', '=', 'roles.role_id')
                ->where('roles.slug', 'taskadmin')
                ->where('users.is_deleted', 0)
                ->select('users.user_id', 'users.name', 'users.email', 'users.status', 'users.image')
                ->first();

            if (!$user) {
                Log::warning('User not found or not a task admin', ['user_id' => $user_id]);
                return response()->json(['message' => 'User not found or not a task admin.'], 404);
            }

            return response()->json(['data' => $user]);
        } catch (\Exception $e) {
            Log::error('Error fetching task admin data:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Internal server error.'], 500);
        }
    }

    // New method for team admin data
    public function getTeamAdminData($user_id)
    {
        try {
            // Log the user_id received
            Log::info('Fetching team admin data for user_id:', ['user_id' => $user_id]);

            // Verify the user has the teamadmin role
            $user = User::where('user_id', $user_id)
                ->join('roles', 'users.role_id', '=', 'roles.role_id')
                ->where('roles.slug', 'teamadmin')
                ->where('users.is_deleted', 0)
                ->select('users.user_id', 'users.name', 'users.email', 'users.status', 'users.image')
                ->first();

            if (!$user) {
                Log::warning('User not found or not a team admin', ['user_id' => $user_id]);
                return response()->json(['message' => 'User not found or not a team admin.'], 404);
            }

            return response()->json(['data' => $user]);
        } catch (\Exception $e) {
            Log::error('Error fetching team admin data:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Internal server error.'], 500);
        }
    }
}

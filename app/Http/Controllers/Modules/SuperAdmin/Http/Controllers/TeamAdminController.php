<?php

namespace App\Http\Controllers\Modules\SuperAdmin\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Modules\SuperAdmin\Models\Team_admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TeamAdminController extends Controller
{
    public function getTeamAdminUsers()
    {
        Log::info('Fetching team admin users');

        // Fetch team admin users with their associated user data
        $teamAdmins = Team_admin::with('user:user_id,name')
            ->orderBy('team_admin_id', 'desc')
            ->paginate(100);

        Log::info('Team admins data', ['teamAdmins' => $teamAdmins]);

        // Check if there are any team admin users found
        if ($teamAdmins->isNotEmpty()) {
            return response()->json([
                'success' => true,
                'message' => 'Team admin users fetched successfully.',
                'data' => $teamAdmins
            ], 200);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'No team admin users found.',
                'data' => $teamAdmins
            ], 200);
        }
    }
}

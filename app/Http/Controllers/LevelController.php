<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Level;

class LevelController extends Controller
{
    public function addNewLevel(Request $request)
    {
        $level = $request->validate([
            'Sr_No'=>'required|string',
            'name'=>'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $permissionlevel = Level::create([
            'Sr_No' => $level['Sr_No'],
            'name' => $level['name'],
            'is_deleted' => $level['is_deleted']=='delete' ? 1 : 0,
            
        ]);
        if($permissionlevel)
        {
            return response()->json([
                'success' => true,
                'message' => 'Level created successfully.',
                'data' => $permissionlevel
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

    public function LevelsList()
    {
         $Levels = Level::where('is_deleted', 0)->orderBy('Level_id', 'desc')->paginate(10);
        if($Levels->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Levels list.',
                'data' => $Levels,
                'pagination' => [
                    'total' => $Levels->total(),
                    'per_page' => $Levels->perPage(),
                    'current_page' => $Levels->currentPage(),
                    'last_page' => $Levels->lastPage(),
                    'from' => $Levels->firstItem(),
                    'to' => $Levels->lastItem(),
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
    public function deleteLevels(Request $request, $level_id)
    {
        $Level = Level::where('level_id', $level_id)->update(['is_deleted'=> '1']);

        if($Level){
            return response()->json([
                'success' => true,
                'message' => 'Level deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }
    ////////////fetch level to update level
    public function updateLevelId($level_id){

        $levels = Level::find($level_id);
        if($levels){
            return response()->json([
                'success' => true,
                'message' => 'List level',
                'data'=> $levels
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }
        ////////////update level
    public function editLevel(Request $request, $level_id)
    {
        $Level = $request->validate([
            'Sr_No' => 'required|string',
            'name'=>'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $updatedLevel = Level::where('level_id', '=', $level_id)->update([
            'Sr_No' => $Level['Sr_No'],
            'name' => $Level['name'],    
            'is_deleted' => $Level['is_deleted']=='delete' ? 1 : 0,
        ]); 
        if($updatedLevel){
            return response()->json([
                'success' => true,
                'message' => 'Level updated successfully.',
                'data' => $Level
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

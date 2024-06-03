<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FranchisePermission;

class FranchisePermissionController extends Controller
{
    public function addFranchisePermission(Request $request){
        $franchisePermission  = $request->validate([
            'permission_name'=> 'required|string',
            'is_deleted'=> 'nullable|in:delete,not_delete'
        ]);

        $isDeleted = isset($franchisePermission['is_deleted']) ? ($franchisePermission['is_deleted'] == 'delete' ? 1 : 0) : 0;
        $franchisePermission = new FranchisePermission;
        $franchisePermission->permission_name = $request->permission_name;
        $franchisePermission->is_deleted =  $isDeleted;
        $franchisePermission->save();

        if($franchisePermission->save()){

            return response()->json([
                'success' =>true,
                'message'=>'Franchise permission created successfully.',
                'data'=> $franchisePermission
            ]);
        }

        else{

            return response()->json([
                'success' =>false,
                'message'=>'Something went wrong.',
                'data'=> []
            ]);
        }
    }


    public function listFranchisePermission(){
        $franchisePermission = FranchisePermission::where('is_deleted', 0)->orderBy('franchise_permission_id', 'desc')->paginate(10);

        if($franchisePermission){
            return response()->json([
                'success' =>true,
                'message'=>'Franchise permission listed successfully.',
                'data'=> $franchisePermission,
                'pagination' => [
                    'total' => $franchisePermission->total(),
                    'per_page' => $franchisePermission->perPage(),
                    'current_page' => $franchisePermission->currentPage(),
                    'last_page' => $franchisePermission->lastPage(),
                    'from' => $franchisePermission->firstItem(),
                    'to' => $franchisePermission->lastItem(),
                ],

            ]);
        }

        else{

            return response()->json([
                'success' =>false,
                'message'=>'Something went wrong.',
                'data'=> []
            ]);
        }
        
    }

    public function deleteFranchisePermission(Request $request, $franchise_permission_id){
        $franchisePermission = FranchisePermission::where('franchise_permission_id', $franchise_permission_id)->update(['is_deleted'=> '1']);


        if($franchisePermission){
            
            return response()->json([
                'success' =>true,
                'message'=>'Franchise deleted successfully.',
            ]);
        }

        else{

            return response()->json([
                'success' =>false,
                'message'=>'Something went wrong.',
                'data'=> []
            ]);
        }
            
        }

        
//////////edit
        public function editFranchisePermission($franchise_permission_id)
    {
        $franchisePermission= FranchisePermission::find($franchise_permission_id);

        if($franchisePermission){

            return response()->json([
                'success' => true,
                'message' =>'franchise view successfully',
                'data' => $franchisePermission
            ]);
        }
    }

        public function UpdateFranchisePermission(Request $request, $franchise_permission_id){
           $franchise = $request->validate([
            'permission_name'=> 'required|string',
            ]);

           $UpdateFranchise = FranchisePermission::where('franchise_permission_id', $franchise_permission_id)->update([
            'permission_name'=> $franchise['permission_name'],
           ]);

           if($UpdateFranchise){

            return response()->json([
                'success' =>true,
                'message'=>'Franchise updated successfully.',
                'data'=> $franchise
            ]);
        }

        else{

            return response()->json([
                'success' =>false,
                'message'=>'Something went wrong.',
                'data'=> []
            ]);
        }
           }
        }
    
        





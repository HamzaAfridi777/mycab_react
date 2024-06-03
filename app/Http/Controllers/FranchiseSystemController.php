<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FranchiseSystem;

class FranchiseSystemController extends Controller
{
   
    public function addFranchiseSystem(Request $request){
        $request->validate([
            'name'=> 'required|string',
            'franchise_owner' => 'nullable',
             'status'  => 'required|in:active,inactive',
            'is_deleted'=> 'nullable|in:delete,not_delete'
        ]);

        $isDeleted = isset($franchiseSystem['is_deleted']) ? ($franchiseSystem['is_deleted'] == 'delete' ? 1 : 0) : 0;
        $franchiseSystem = new FranchiseSystem;
        $franchiseSystem->name = $request->name;
        $franchiseSystem->franchise_owner = $request->franchise_owner;
        $franchiseSystem->status = $request->status == 'active' ? 'active' : 'inactive';
        $franchiseSystem->is_deleted =  $isDeleted;
        $franchiseSystem->save();

        if($franchiseSystem->save()){

            return response()->json([
                'success' =>true,
                'message'=>'Franchise created successfully.',
                'data'=> $franchiseSystem
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


    public function listFranchiseSystem(){
        $franchiseSystem = FranchiseSystem::where('is_deleted', 0)->orderBy('franchiseSystem_id', 'desc')->paginate(10);

        if($franchiseSystem){
            return response()->json([
                'success' =>true,
                'message'=>'Franchise listed successfully.',
                'data'=> $franchiseSystem,
                'pagination' => [
                    'total' => $franchiseSystem->total(),
                    'per_page' => $franchiseSystem->perPage(),
                    'current_page' => $franchiseSystem->currentPage(),
                    'last_page' => $franchiseSystem->lastPage(),
                    'from' => $franchiseSystem->firstItem(),
                    'to' => $franchiseSystem->lastItem(),
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

    public function deleteFranchiseSystem(Request $request, $franchiseSystem_id){
        $franchise = FranchiseSystem::where('franchiseSystem_id', $franchiseSystem_id)->update(['is_deleted'=> '1']);


        if($franchise){
            
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
        public function editFranchiseSystem($franchiseSystem_id)
    {
        $franchiseSystem = FranchiseSystem::find($franchiseSystem_id);

        if($franchiseSystem){

            return response()->json([
                'success' => true,
                'message' =>'franchise view successfully',
                'data' => $franchiseSystem
            ]);
        }
    }

        public function UpdateFranchiseSystem(Request $request, $franchiseSystem_id){
           $franchise = $request->validate([
            'name'=> 'required|string',
            'franchise_owner' => 'nullable',
             'status'  => 'required|in:active,inactive',
            ]);

           $UpdateFranchise = FranchiseSystem::where('franchiseSystem_id', $franchiseSystem_id)->update([
            'name'=> $franchise['name'],
            'franchise_owner'=> $franchise['franchise_owner'],
            'status'=> $franchise['status'] == 'active' ? 'active' : 'inactive',
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
    
        




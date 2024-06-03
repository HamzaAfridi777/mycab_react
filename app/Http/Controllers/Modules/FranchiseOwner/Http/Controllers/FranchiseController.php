<?php

namespace App\Http\Controllers\Modules\FranchiseOwner\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Modules\FranchiseOwner\Models\Franchise;
use Illuminate\Http\Request;

class FranchiseController extends Controller
{
    public function addFranchise(Request $request){
        $request->validate([
            'name'=> 'required|string',
            'location' => 'required|string',
            'is_deleted'=> 'nullable|in:delete,not_delete'
        ]);
        $franchise = new Franchise;
        $franchise->name = $request->name;
        $franchise->location = $request->location;
        $franchise->is_deleted = $request->is_deleted == 'delete' ? 1 : 0;
        $franchise->save();

        if($franchise->save()){

            return response()->json([
                'success' =>true,
                'message'=>'Franchise created successfully.',
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


    public function listFranchise(){
        $franchise = Franchise::where('is_deleted', 0)->orderBy('franchise_id', 'desc')->paginate(10);

        if($franchise){
            return response()->json([
                'success' =>true,
                'message'=>'Franchise listed successfully.',
                'data'=> $franchise,
                'pagination' => [
                    'total' => $franchise->total(),
                    'per_page' => $franchise->perPage(),
                    'current_page' => $franchise->currentPage(),
                    'last_page' => $franchise->lastPage(),
                    'from' => $franchise->firstItem(),
                    'to' => $franchise->lastItem(),
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

    public function deleteFranchise(Request $request, $franchise_id){
        $franchise = Franchise::where('franchise_id', $franchise_id)->update(['is_deleted'=> '1']);


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

        public function UpdateFranchise(Request $request, $franchise_id){
           $franchise = $request->validate([
                'name'=> 'required|string',
                'location' => 'required|string',
                'is_deleted'=> 'nullable|in:delete,not_delete'
            ]);

           $UpdateFranchise = Franchise::where('franchise_id', $franchise_id)->update([
            'name'=> $franchise['name'],
            'location'=> $franchise['location'],
            'is_deleted'=> $franchise['is_deleted']=='delete' ? 1 : 0,
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
    
        


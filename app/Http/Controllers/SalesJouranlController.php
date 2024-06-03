<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Salesjouranl;

class SalesJouranlController extends Controller
{
    public function addSales(Request $request)
    {
        $sales = $request->validate([
            'name'=>'required|string',
            'sale'=>'required|integer',
            'amount'=>'required|numeric|between:0,9999999.99',
            'date'=>'nullable|date',
            'franchiseSystem_id'=>'required|string',
            'status'=>'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $franchiseSystemId = $request->franchiseSystem_id;
        $isDeleted = isset($sales['is_deleted']) ? ($sales['is_deleted'] == 'delete' ? 1 : 0) : 0; 

        $sales = new Salesjouranl;
        $sales->name = $request->name;
        $sales->sale = $request->sale;
        $sales->amount = $request->amount;
        $sales->date = $request->date;
        $sales->franchiseSystem_id = $request->franchiseSystem_id;
        $sales->status = $request->status;
        $sales->is_deleted = $isDeleted;
        $sales->save();


        $result = Salesjouranl::join('franchise_systems', 'sales_jouranl.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
    ->orderBy('sales_jouranl.sales_jouranl_id', 'desc')
    ->where('sales_jouranl.franchiseSystem_id', $franchiseSystemId)
    ->select(
        'sales_jouranl.*',
        'franchise_systems.name as franchiseSystem_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'sales jouranl created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
    }

    public function listSalesJouranl()
    {
        $sales= Salesjouranl::select(
            'sales_jouranl.*',
            'franchise_systems.name as franchiseSystem_name'
        )
        ->join('franchise_systems', 'sales_jouranl.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
        ->where('sales_jouranl.is_deleted', 0)
        ->orderBy('sales_jouranl_id', 'desc')
        ->paginate(10);
        if($sales->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'sales list.',
                'data' => $sales,
                'pagination' => [
                    'total' => $sales->total(),
                    'per_page' => $sales->perPage(),
                    'current_page' => $sales->currentPage(),
                    'last_page' => $sales->lastPage(),
                    'from' => $sales->firstItem(),
                    'to' => $sales->lastItem(),
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

    public function deleteSalesJouranl(Request $request, $sales_jouranl_id)
    {
        $sales = Salesjouranl::where('sales_jouranl_id', $sales_jouranl_id)->update(['is_deleted'=> '1']);

        if($sales){
            return response()->json([
                'success' => true,
                'message' => 'Sale deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }


     /////////////fetch ride data in update form
     public function updateSale($sales_jouranl_id){

        $sales = Salesjouranl::find($sales_jouranl_id);
        if($sales){
            return response()->json([
                'success' => true,
                'message' => 'List sale',
                'data'=> $sales
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
        }

/////////edit
        public function editSale(Request $request, $sales_jouranl_id)
        {
            $sales = $request->validate([
                'name'=>'required|string',
                'sale'=>'required|integer',
                'amount' => 'required|numeric|between:0,9999999.99',
                'date'=> 'nullable|date',
                'franchiseSystem_id'=>'required|string',
                'status' => 'required|string',
                'is_deleted' => 'nullable|in:delete,not_delete',
            ]);
        
            // Retrieve the ride with the specified ride_id
            $sales = Salesjouranl::where('sales_jouranl_id', $sales_jouranl_id)->first();
        
            // Check if the ride exists
            if (!$sales) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ride not found.',
                    'data' => null,
                ]);
            }
        
            // Update the attributes of the ride
            $sales = new Salesjouranl;
            $sales->name = $request->name;
            $sales->sale = $request->sale;
            $sales->amount = $request->amount;
            $sales->date = $request->date;
            $sales->franchiseSystem_id = $request->franchiseSystem_id;
            $sales->status = $request->status;
            $sales->save();
        
            $result = Salesjouranl::join('franchise_systems', 'sales_jouranl.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
    ->orderBy('sales_jouranl.sales_jouranl_id', 'desc')
    ->where('sales_jouranl.franchiseSystem_id', $request->franchiseSystem_id)
    ->select(
        'sales_jouranl.*',
        'franchise_systems.name as franchiseSystem_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'sales jouranl created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
        }
}

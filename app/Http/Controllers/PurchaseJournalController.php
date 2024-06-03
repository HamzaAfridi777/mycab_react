<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseJournal;

class PurchaseJournalController extends Controller
{
    public function addPurchase(Request $request)
    {
        $purchase = $request->validate([
            'name'=>'required|string',
            'purchase'=>'required|integer',
            'amount'=>'required|numeric|between:0,9999999.99',
            'date'=>'nullable|date',
            'franchiseSystem_id'=>'required|string',
            'status'=>'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $franchiseSystemId = $request->franchiseSystem_id;
        $isDeleted = isset($purchase['is_deleted']) ? ($purchase['is_deleted'] == 'delete' ? 1 : 0) : 0; 

        $purchase = new PurchaseJournal;
        $purchase->name = $request->name;
        $purchase->purchase = $request->purchase;
        $purchase->amount = $request->amount;
        $purchase->date = $request->date;
        $purchase->franchiseSystem_id = $request->franchiseSystem_id;
        $purchase->status = $request->status;
        $purchase->is_deleted = $isDeleted;
        $purchase->save();


        $result = PurchaseJournal::join('franchise_systems', 'purchase_journal.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
    ->orderBy('purchase_journal.purchase_jouranl_id', 'desc')
    ->where('purchase_journal.franchiseSystem_id', $franchiseSystemId)
    ->select(
        'purchase_journal.*',
        'franchise_systems.name as franchiseSystem_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'purchase jouranl created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
    }

    public function listPurchaseJouranl()
    {
        $purchase = PurchaseJournal::select(
            'purchase_journal.*', // Corrected table alias
            'franchise_systems.name as franchiseSystem_name'
        )
        ->join('franchise_systems', 'purchase_journal.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
        ->where('purchase_journal.is_deleted', 0)
        ->orderBy('purchase_jouranl_id', 'desc')
        ->paginate(10);
        if($purchase->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'purchase list.',
                'data' => $purchase,
                'pagination' => [
                    'total' => $purchase->total(),
                    'per_page' => $purchase->perPage(),
                    'current_page' => $purchase->currentPage(),
                    'last_page' => $purchase->lastPage(),
                    'from' => $purchase->firstItem(),
                    'to' => $purchase->lastItem(),
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

    public function deletePurchaseJouranl(Request $request, $purchase_jouranl_id)
    {
        $purchase = PurchaseJournal::where('purchase_jouranl_id', $purchase_jouranl_id)->update(['is_deleted'=> '1']);

        if($purchase){
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
     public function updatePurchase($purchase_jouranl_id){

        $purchase = PurchaseJournal::find($purchase_jouranl_id);
        if($purchase){
            return response()->json([
                'success' => true,
                'message' => 'List sale',
                'data'=> $purchase
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
        public function editPurchase(Request $request, $purchase_jouranl_id)
        {
            $purchase = $request->validate([
                'name'=>'required|string',
                'purchase'=>'required|integer',
                'amount' => 'required|numeric|between:0,9999999.99',
                'date'=> 'nullable|date',
                'franchiseSystem_id'=>'required|string',
                'status' => 'required|string',
                'is_deleted' => 'nullable|in:delete,not_delete',
            ]);
        
            // Retrieve the ride with the specified ride_id
            $purchase = PurchaseJournal::where('purchase_jouranl_id', $purchase_jouranl_id)->first();
        
            // Check if the ride exists
            if (!$purchase) {
                return response()->json([
                    'success' => false,
                    'message' => 'Ride not found.',
                    'data' => null,
                ]);
            }
        
            // Update the attributes of the ride
            $purchase = new PurchaseJournal;
            $purchase->name = $request->name;
            $purchase->purchase = $request->purchase;
            $purchase->amount = $request->amount;
            $purchase->date = $request->date;
            $purchase->franchiseSystem_id = $request->franchiseSystem_id;
            $purchase->status = $request->status;
            $purchase->save();
        
            $result = PurchaseJournal::join('franchise_systems', 'purchase_journal.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
    ->orderBy('purchase_journal.purchase_jouranl_id', 'desc')
    ->where('purchase_journal.franchiseSystem_id', $request->franchiseSystem_id)
    ->select(
        'purchase_journal.*',
        'franchise_systems.name as franchiseSystem_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'purchase jouranl created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
        }
}

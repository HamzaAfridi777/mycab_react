<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountsPayable;
 
class AccountsPayableController extends Controller
{
    public function addPayable(Request $request)
    {
        $accounts = $request->validate([
            'purchase_jouranl_id' => 'required|exists:purchase_journal,purchase_jouranl_id',
            'vendor_id' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'debit' => 'nullable|numeric|min:0',
            'credit' => 'nullable|numeric|min:0',
            'debit_date' => 'nullable|date',
            'credit_date' => 'nullable|date',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $isDeleted = isset($accounts['is_deleted']) ? ($accounts['is_deleted'] == 'delete' ? 1 : 0) : 0; 

        $accounts = new AccountsPayable;
        $accounts->purchase_jouranl_id = $request->purchase_jouranl_id;
        $accounts->vendor_id = $request->vendor_id;
        $accounts->amount = $request->amount;
        $accounts->debit = $request->debit;
        $accounts->credit = $request->credit;
        $accounts->debit_date = $request->debit_date;
        $accounts->credit_date = $request->credit_date;
        $accounts->is_deleted = $isDeleted;
        $accounts->save();


        $result = AccountsPayable::join('purchase_journal', 'accounts_payable.purchase_jouranl_id', '=', 'purchase_journal.purchase_jouranl_id')
        // ->join('customers', 'accounts_recieveable.customer_id', '=', 'customers.customer_id')
        ->orderBy('accounts_payable.accounts_payable_id', 'desc')
    ->where('accounts_payable.purchase_jouranl_id', $request->purchase_jouranl_id)
    ->select(
        'accounts_payable.*',
        'purchase_journal.name as purchase_journal_name',
        // 'customers.name as customers_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Accounts payable created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
    }

    public function listPayable()
    {
        $accounts = AccountsPayable::select(
            'accounts_payable.*',
            'purchase_journal.name as purchase_journal_name',
            // 'customers.name as customers_name'
        )
        ->join('purchase_journal', 'accounts_payable.purchase_jouranl_id', '=', 'purchase_journal.purchase_jouranl_id')
        // ->join('customers', 'accounts_recieveable.customer_id', '=', 'customers.customer_id')
        ->where('accounts_payable.is_deleted', 0)
        ->orderBy('accounts_payable.accounts_payable_id', 'desc')
        ->paginate(10);
        if($accounts->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Accounts list.',
                'data' => $accounts,
                'pagination' => [
                    'total' => $accounts->total(),
                    'per_page' => $accounts->perPage(),
                    'current_page' => $accounts->currentPage(),
                    'last_page' => $accounts->lastPage(),
                    'from' => $accounts->firstItem(),
                    'to' => $accounts->lastItem(),
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

    public function deletePayable(Request $request, $accounts_payable_id)
    {
        $account = AccountsPayable::where('accounts_payable_id', $accounts_payable_id)->update(['is_deleted'=> '1']);

        if($account){
            return response()->json([
                'success' => true,
                'message' => 'Account deleted successfully.',
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
     public function updatePayable($accounts_payable_id){

        $account = AccountsPayable::find($accounts_payable_id);
        if($account){
            return response()->json([
                'success' => true,
                'message' => 'List Account',
                'data'=> $account
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
        public function editPayable(Request $request, $accounts_payable_id)
        {
            $account = $request->validate([
                'purchase_jouranl_id' => 'required|exists:purchase_journal,purchase_jouranl_id',
                'vendor_id' => 'required|string',
                'amount' => 'required|numeric|min:0',
                'debit' => 'nullable|numeric|min:0',
                'credit' => 'nullable|numeric|min:0',
                'debit_date' => 'nullable|date',
                'credit_date' => 'nullable|date',
                'is_deleted' => 'nullable|in:delete,not_delete',
            ]);
        
            // Retrieve the ride with the specified ride_id
            $account = AccountsPayable::where('accounts_payable_id', $accounts_payable_id)->first();
        
            // Check if the ride exists
            if (!$account) {
                return response()->json([
                    'success' => false,
                    'message' => 'Account not found.',
                    'data' => null,
                ]);
            }
        
            // Update the attributes of the ride
            $accounts = new AccountsPayable;
        $accounts->purchase_jouranl_id = $request->purchase_jouranl_id;
        $accounts->vendor_id = $request->vendor_id;
        $accounts->amount = $request->amount;
        $accounts->debit = $request->debit;
        $accounts->credit = $request->credit;
        $accounts->debit_date = $request->debit_date;
        $accounts->credit_date = $request->credit_date;
        $accounts->save();


        $result = AccountsPayable::join('purchase_journal', 'accounts_payable.purchase_jouranl_id', '=', 'purchase_journal.purchase_jouranl_id')
        // ->join('customers', 'accounts_recieveable.customer_id', '=', 'customers.customer_id')
        ->orderBy('accounts_payable.accounts_payable_id', 'desc')
    ->where('accounts_payable.purchase_jouranl_id', $request->purchase_jouranl_id)
    ->select(
        'accounts_payable.*',
        'purchase_journal.name as purchase_journal_name',
        // 'customers.name as customers_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Accounts updated successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
        }
    }


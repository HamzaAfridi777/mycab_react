<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountsRecieveable;

class AccountsRecieveableController extends Controller
{
    public function addAccounts(Request $request)
    {
        $accounts = $request->validate([
            'sales_jouranl_id' => 'required|exists:sales_jouranl,sales_jouranl_id',
            'customer_id' => 'required|exists:customers,customer_id',
            'amount' => 'required|numeric|min:0',
            'debit' => 'nullable|numeric|min:0',
            'credit' => 'nullable|numeric|min:0',
            'debit_date' => 'nullable|date',
            'credit_date' => 'nullable|date',
            'is_deleted' => 'nullable|in:delete,not_delete',
        ]);
        $isDeleted = isset($accounts['is_deleted']) ? ($accounts['is_deleted'] == 'delete' ? 1 : 0) : 0; 

        $accounts = new AccountsRecieveable;
        $accounts->sales_jouranl_id = $request->sales_jouranl_id;
        $accounts->customer_id = $request->customer_id;
        $accounts->amount = $request->amount;
        $accounts->debit = $request->debit;
        $accounts->credit = $request->credit;
        $accounts->debit_date = $request->debit_date;
        $accounts->credit_date = $request->credit_date;
        $accounts->is_deleted = $isDeleted;
        $accounts->save();


        $result = AccountsRecieveable::join('sales_jouranl', 'accounts_recieveable.sales_jouranl_id', '=', 'sales_jouranl.sales_jouranl_id')
        ->join('customers', 'accounts_recieveable.customer_id', '=', 'customers.customer_id')
        ->orderBy('accounts_recieveable.accounts_recieveable_id', 'desc')
    ->where('accounts_recieveable.sales_jouranl_id', $request->sales_jouranl_id)
    ->select(
        'accounts_recieveable.*',
        'sales_jouranl.name as sales_journal_name',
        'customers.name as customers_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Accounts recievable created successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
    }

    public function listAccounts()
    {
        $accounts = AccountsRecieveable::select(
            'accounts_recieveable.*',
            'sales_jouranl.name as sales_journal_name',
            'customers.name as customers_name'
        )
        ->join('sales_jouranl', 'accounts_recieveable.sales_jouranl_id', '=', 'sales_jouranl.sales_jouranl_id')
        ->join('customers', 'accounts_recieveable.customer_id', '=', 'customers.customer_id')
        ->where('accounts_recieveable.is_deleted', 0)
        ->orderBy('accounts_recieveable.accounts_recieveable_id', 'desc')
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

    public function deleteAccount(Request $request, $accounts_recieveable_id)
    {
        $account = AccountsRecieveable::where('accounts_recieveable_id', $accounts_recieveable_id)->update(['is_deleted'=> '1']);

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
     public function updateAccounts($accounts_recieveable_id){

        $account = AccountsRecieveable::find($accounts_recieveable_id);
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
        public function editAccounts(Request $request, $accounts_recieveable_id)
        {
            $account = $request->validate([
            'sales_jouranl_id' => 'required|exists:sales_jouranl,sales_jouranl_id',
            'customer_id' => 'required|exists:customers,customer_id',
            'amount' => 'required|numeric|min:0',
            'debit' => 'nullable|numeric|min:0',
            'credit' => 'nullable|numeric|min:0',
            'debit_date' => 'nullable|date',
            'credit_date' => 'nullable|date',
            ]);
        
            // Retrieve the ride with the specified ride_id
            $account = AccountsRecieveable::where('accounts_recieveable_id', $accounts_recieveable_id)->first();
        
            // Check if the ride exists
            if (!$account) {
                return response()->json([
                    'success' => false,
                    'message' => 'Account not found.',
                    'data' => null,
                ]);
            }
        
            // Update the attributes of the ride
            $accounts = new AccountsRecieveable;
            $accounts->sales_jouranl_id = $request->sales_jouranl_id;
            $accounts->customer_id = $request->customer_id;
            $accounts->amount = $request->amount;
            $accounts->debit = $request->debit;
            $accounts->credit = $request->credit;
            $accounts->debit_date = $request->debit_date;
            $accounts->credit_date = $request->credit_date;
            $accounts->save();
        
            $result = AccountsRecieveable::join('sales_jouranl', 'accounts_recieveable.sales_jouranl_id', '=', 'sales_jouranl.sales_jouranl_id')
        ->join('customers', 'accounts_recieveable.customer_id', '=', 'customers.customer_id')
        ->orderBy('accounts_recieveable.accounts_recieveable_id', 'desc')
    ->where('accounts_recieveable.sales_jouranl_id', $request->sales_jouranl_id)
    ->select(
        'accounts_recieveable.*',
        'sales_jouranl.name as sales_journal_name',
        'customers.name as customers_name'
    )
    ->get();
        return response()->json([
            'success' => $result ? true : false,
            'message' => $result ? 'Accounts updated successfully.' : 'something went wrong',
            'data' => $result,
           ]);   
        }
}

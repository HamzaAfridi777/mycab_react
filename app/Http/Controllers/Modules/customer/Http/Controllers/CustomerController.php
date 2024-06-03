<?php

namespace App\Http\Controllers\Modules\customer\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Modules\customer\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function AddCustomer(Request $request){
        $CustomerData = $request->validate([
            'name'=> 'required|string',
            'father_name'=> 'required|string',
            'gender'=> 'required|string',
            'country'=> 'required|string',
            'identity_number'=> 'required|string|min:13',
            'date_of_birth'=> 'required|string',
            'permanent_address'=> 'required|string',
            'present_address'=> 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $isDeleted = isset($CustomerData['is_deleted']) ? ($CustomerData['is_deleted'] == 'delete' ? 1 : 0) : 0; 
        $customer = Customer::create([
            'name'=> $CustomerData['name'],
            'father_name'=> $CustomerData['father_name'],
            'gender'=> $CustomerData['gender'],
            'country'=> $CustomerData['country'],
            'identity_number'=> $CustomerData['identity_number'],
            'date_of_birth'=> $CustomerData['date_of_birth'],
            'permanent_address'=> $CustomerData['permanent_address'],
            'present_address'=> $CustomerData['present_address'],
            'is_deleted'=> $isDeleted,

        ]);  
        
        if($request->hasfile('image')){
              $image = $request->file('image');
              $filename = time(). '-' .$image->getClientOriginalName();
              $image->storeAs('storage/app', $filename);
              $customer->image = $filename;
        }
    
        $customer->save();
    
        if($customer){
            
            return response()->json([
                'Success'=> true,
                'message' => 'Customer created successfully.',
                'data' => $customer
            ]);
        }
            else{
                return response()->json([
                    'Success'=> false,
                    'message' => 'Something went wrong.',
                    'data' => []
                ]);
            }
        
    }

    public function CustomersList(){
        $customer = Customer::where('is_deleted', 0)->orderBy('customer_id', 'desc')->paginate(10);

        if($customer->isNotEmpty()){

            return response()->json([
                'success' => true,
                'message' => 'Customers listed successfully.',
                'data'=> $customer,
                'pagination' => [
                    'total' => $customer->total(),
                    'per_page' => $customer->perPage(),
                    'current_page' => $customer->currentPage(),
                    'last_page' => $customer->lastPage(),
                    'from' => $customer->firstItem(),
                    'to' => $customer->lastItem(),
                ]
            ]);
        }
        else{
            return response()->json([
                'Success'=> false,
                'message' => 'Something went wrong.',
                'data' => []
            ]);
        }
    }

    public function deleteCustomer(Request $request, $customer_id){
        $customer = Customer::where('customer_id', $customer_id)->update(['is_deleted'=> '1']);

        return response()->json([
            'success'=> true,
            'message'=> 'Customer deleted successfully',
        ]);

        return response()->json([
            'success'=> false,
            'message'=> 'Something went wrong.',
            'data'=> []
        ]);
    }
//////////fetch customer to update role
public function updateCustomerId($customer_id){

    $customers = Customer::find($customer_id);
    if($customers){
        return response()->json([
            'success' => true,
            'message' => 'List customer',
            'data'=> $customers
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
    }
    public function updateCustomer(Request $request, $customer_id){
        $updateCustomer = $request->validate([
            'name'=> 'required|string',
            'father_name'=> 'required|string',
            'gender'=> 'required|string',
            'country'=> 'required|string',
            'identity_number'=> 'required|string|min:13',
            'date_of_birth'=> 'required|string',
            'permanent_address'=> 'required|string',
            'present_address'=> 'required|string',
            'is_deleted' => 'nullable|in:delete,not_delete',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $isDeleted = isset($updateCustomer['is_deleted']) ? ($updateCustomer['is_deleted'] == 'delete' ? 1 : 0) : 0;
        $EditCustomer = Customer::where('customer_id', $customer_id)->update([
            'name'=> $updateCustomer['name'],
            'father_name'=> $updateCustomer['father_name'],
            'gender'=> $updateCustomer['gender'],
            'country'=> $updateCustomer['country'],
            'identity_number'=> $updateCustomer['identity_number'],
            'date_of_birth'=> $updateCustomer['date_of_birth'],
            'permanent_address'=> $updateCustomer['permanent_address'],
            'present_address'=> $updateCustomer['present_address'],
            'is_deleted'=> $isDeleted,
        ]);
        $EditCustomer = Customer::where('customer_id', $customer_id)->first();
        
        if($request->hasfile('image')){
            $image = $request->file('image');
            $filename = time(). '-' .$image->getClientOriginalName();
            $image->storeAs('storage/app', $filename);
            $EditCustomer->image = $filename;
        }

        $EditCustomer->save();
    
        if($updateCustomer){
            
            return response()->json([
                'Success'=> true,
                'message' => 'Customer Updated successfully.',
                'data' => $EditCustomer
            ]);
        }
            else{
                return response()->json([
                    'Success'=> false,
                    'message' => 'Something went wrong.',
                    'data' => []
                ]);
            }
        
    }
}

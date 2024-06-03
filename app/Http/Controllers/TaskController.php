<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\FranchiseSystem;

class TaskController extends Controller
{
    public function addTask(Request $request)
    {
    $request->validate([
            'TaskDescription'=>'required|string',
            'TaskAdmin'=>'required|string',
            'franchiseSystem_id'=>'required|string',
            'status' => 'required|in:active,inactive',
            'is_deleted' => 'nullable|in:delete,not_delete',
    ]);

    $franchiseSystemId = $request->franchiseSystem_id;
    $isDeleted = isset($task['is_deleted']) ? ($task['is_deleted'] == 'delete' ? 1 : 0) : 0; 

        $task = new Task;
        $task->TaskDescription = $request->TaskDescription;
        $task->TaskAdmin = $request->TaskAdmin;
        $task->status = $request->status=='active' ? 'active' : 'inactive';
        $task->is_deleted = $isDeleted;
        $task->franchiseSystem_id = $franchiseSystemId;
        $task->save();

        $result = Task::join('franchise_systems', 'tasks.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
        ->where('tasks.franchiseSystem_id', $franchiseSystemId)
        ->select('tasks.*', 'franchise_systems.name as franchiseSystem_name')
        ->get();
    
       return response()->json([
        'success' => $result ? true : false,
        'message' => $result ? 'task created successfully.' : 'something went wrong',
        'data' => $result,
       ]);   
        
    }

    public function TasksList()
    {
        $tasks= Task::select(
            'tasks.*',
            'franchise_systems.name as franchiseSystem_name'
        )
        ->join('franchise_systems', 'tasks.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
        ->where('tasks.is_deleted', 0)
        ->orderBy('task_id', 'desc')
        ->paginate(10);
        if($tasks->isNotEmpty()){
            return response()->json([
                'success' => true,
                'message' => 'Users role list.',
                'data' => $tasks,
                'pagination' => [
                    'total' => $tasks->total(),
                    'per_page' => $tasks->perPage(),
                    'current_page' => $tasks->currentPage(),
                    'last_page' => $tasks->lastPage(),
                    'from' => $tasks->firstItem(),
                    'to' => $tasks->lastItem(),
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


    /////////delete
    public function deleteTask(Request $request, $task_id)
    {
        $task = Task::where('task_id', $task_id)->update(['is_deleted'=> '1']);

        if($task){
            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }
/////////////fetch task data in update form
public function updateTask($task_id){

    $tasks = Task::find($task_id);
    if($tasks){
        return response()->json([
            'success' => true,
            'message' => 'List task',
            'data'=> $tasks
        ],200);
    }
    else{
        return response()->json([
            'success' => false,
            'message' => 'Something went wrong.',
        ],401);
    }
    }


//////////update
    public function editTask(Request $request, $task_id)
    {
    $request->validate([
            'TaskDescription'=>'required|string',
            'TaskAdmin'=>'required|string',
            'franchiseSystem_id'=>'required|string',
            'status' => 'required|in:active,inactive',
            'is_deleted' => 'nullable|in:delete,not_delete',
    ]);
    $task = Task::where('task_id', $task_id)->first();
        
            // Check if the ride exists
            if (!$task) {
                return response()->json([
                    'success' => false,
                    'message' => 'task not found.',
                    'data' => null,
                ]);
            }

             // Update the attributes of the ride
             $task->TaskDescription = $request->TaskDescription;
             $task->TaskAdmin = $request->TaskAdmin;
             $task->status = $request->status=='active' ? 'active' : 'inactive';
             $task->franchiseSystem_id =$request->franchiseSystem_id;
             $task->save();
         
             $result = Task::join('franchise_systems', 'tasks.franchiseSystem_id', '=', 'franchise_systems.franchiseSystem_id')
             ->where('tasks.franchiseSystem_id', $request->franchiseSystem_id)
             ->select('tasks.*', 'franchise_systems.name as franchiseSystem_name')
             ->get();
         
            return response()->json([
             'success' => $result ? true : false,
             'message' => $result ? 'task created successfully.' : 'something went wrong',
             'data' => $result,
            ]);   
}
}

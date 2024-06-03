<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\Message;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class ChatController extends Controller
{
    // public function sendMessage(Request $request)
    // {
    //     event(new Message($request->input('user'), $request->input('message')));
    //     return ['message sent'];
    // }
    public function sendMessage(Request $request)
    {

      
   $validatedData = $request->validate([
       'user_id' => 'required|string', 
       'message' => 'required|string',
       'is_deleted' => 'nullable|in:delete,not_delete',
   ]);
   $isDeleted = isset($validatedData['is_deleted']) ? ($validatedData['is_deleted'] == 'delete' ? 1 : 0) : 0; 

   // $user = User::findOrFail($validatedData['user_id']);

   $message = new Chat;
   $message->user_id = $validatedData['user_id']; 
   $message->message = $validatedData['message'];
   $message->is_deleted = $isDeleted;
   $message->save();

   $user = User::findOrFail($validatedData['user_id']);
   // Dispatch an event 
   event(new Message($validatedData['user_id'], $validatedData['message']));

   return [
   // 'chat_id' => $message->chat_id, // Return the chat_id
   'chat_id' => $message->id, // Use $message->id to return the chat_id
       'message' => 'Message sent and saved to database',
       'user' => $user, // Include user data in the response
       
   ];
}

public function deleteChat(Request $request, $chat_id)
    {
     
        //$chat = Chat::where('chat_id', $chat_id)->update(['is_deleted'=> '1']);
        $chat = Chat::where('chat_id', $chat_id)->update(['is_deleted' => 1]);

        if($chat){
            return response()->json([
                'success' => true,
                'message' => 'Chat deleted successfully.',
            ],200);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong.',
            ],401);
        }
    }


    public function getChatMessages()
{
    $messages = Chat::where('is_deleted', 0)->get();

    return response()->json([
        'chatMessages' => $messages,
    ]);
}


}



<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller{

    public function createChat(Request $request){
        
    $firstUserId = Auth::id();
    
    $url = "http://localhost:3000/user/addChat";

    $data = [
        'firstUserId' => $firstUserId,
        'secondUserId' => $request->secondUserId
    ];

    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
        ),
    );

    $context  = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    return response()->json([
        'chat_id' => json_decode($response)->chat_id,
        'firstUserId' => $firstUserId,
        'secondUserId' => $request->secondUserId
    ]);
    }

// public function getChats()
// {
//   $userId = Auth::id();

//   $url = "http://localhost:3000/user/user/{$userId}/getChats";
  
//   $response = file_get_contents($url);
  
//   return response()->json(json_decode($response));
// }

public function getChats()
{
    $userId = Auth::id();
    $response = Http::get("http://localhost:3000/user/user/{$userId}/getChats");

    if ($response->failed()) {
        return response()->json(['error' => 'Failed to retrieve chats'], 500);
    }

    return response()->json($response->json());
}


//     public function getChats(Request $request)
// {
//     $userId = Auth::id();
    
//     $url = "http://localhost:3000/user/user/{$userId}/getChats";

//     $options = array(
//         'http' => array(
//             'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
//             'method'  => 'GET',
//         ),
//     );

//     $context  = stream_context_create($options);
//     $response = file_get_contents($url, false, $context);

//     $chats = json_decode($response);

//     return response()->json([
//         'chats' => $chats
//     ]);
// }

    // public function getChats()
    // {
    //     $userId = Auth::id();
        
    //     $response = Http::get('http://localhost:3000/user/user/$userId/getChats');
    //     $body = $response->body();
    //     // Process the response here
    //     return $body;
    // }
}

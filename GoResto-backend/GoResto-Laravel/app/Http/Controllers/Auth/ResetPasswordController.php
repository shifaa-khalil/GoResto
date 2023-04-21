<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\ResetsPasswords;

class ResetPasswordController extends Controller
{
    use ResetsPasswords;

    // Override this method to return JSON response on successful password reset
    protected function sendResetResponse(Request $request, $response)
    {
        return response()->json(['message' => 'Password reset successful']);
    }

    // Override this method to return JSON response on failed password reset
    protected function sendResetFailedResponse(Request $request, $response)
    {
        return response()->json(['message' => 'Password reset failed']);
    }

    // Here you can implement your own password reset logic for API
    protected function reset(Request $request)
    {
        $this->validate($request, $this->rules(), $this->validationErrorMessages());

        $user = $this->broker()->getUser($this->credentials($request));
        if (!$user) {
            return response()->json(['message' => 'Password reset failed']);
        }

        $this->broker()->reset($this->credentials($request), function ($user, $password) {
            $user->password = bcrypt($password);
            $user->save();
        });

        return $this->sendResetResponse($request, 'Password reset successful');
    }
}

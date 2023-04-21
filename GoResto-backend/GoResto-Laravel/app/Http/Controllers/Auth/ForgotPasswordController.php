<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPassword;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;

class ForgotPasswordController extends Controller
{
    use SendsPasswordResetEmails;

    public function sendResetLinkEmail(Request $request)
    {
        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );
        
        if ($response === \Illuminate\Auth\Passwords\Password::RESET_LINK_SENT) {
            Mail::to($request->email)->send(new ResetPassword());
        }
        
        return $response === \Illuminate\Auth\Passwords\Password::RESET_LINK_SENT
                    ? response()->json(['message' => 'Password reset link sent'])
                    : response()->json(['message' => 'Password reset link not sent']);
    }
}

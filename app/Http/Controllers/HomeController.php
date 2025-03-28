<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        if (Auth::check()) {
            return view('authed', [
                'user' => Auth::user(),
            ]);
        }

        return view('login-with-passkeys');
    }
}
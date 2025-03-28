<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Webauthn\PublicKeyCredentialCreationOptions;

class WebAuthnController extends Controller
{
    public function register()
    {
        // Create PublicKeyCredentialCreationOptions for registration
        $user = auth()->user();
        $creationOptions = PublicKeyCredentialCreationOptions::create([
             'rp' => ['name' => 'Your App Name'],
             'user' => [
                 'id' => $user->getAuthIdentifier(),
                 'name' => $user->email,
                 'displayName' => $user->name,
             ],
             'challenge' => bin2hex(random_bytes(32)), // Generate a random challenge
         ]);
 
         // Store the challenge in session or DB
         session(['webauthn.challenge' => $creationOptions->getChallenge()]);
 
         return response()->json($creationOptions);
    }

}

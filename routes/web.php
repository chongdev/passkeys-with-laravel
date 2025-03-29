<?php

use App\Http\Controllers\Passkeys\AuthenticationController;
use App\Http\Controllers\Passkeys\RegistrationController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/login', [App\Http\Controllers\Auth\LoginController::class, 'index']);
Route::post('/login', [App\Http\Controllers\Auth\LoginController::class, 'login'])->name('login');

Route::post('logout', function () { 
    Auth::logout();

    return redirect('/');
});

Route::prefix('auth/registration')->controller(RegistrationController::class)->group(function () {
    Route::post('/options', 'generateOptions');
    Route::post('/verify', 'verify');
});

Route::prefix('authentication')->controller(AuthenticationController::class)->group(function () {
    Route::post('/options', 'generateOptions');
    Route::post('/verify', 'verify');
});


Route::prefix('passkeys')->controller(App\Http\Controllers\Passkeys\AuthenticationController::class)->group(function () {
    Route::delete('/{passkeys}', 'destroy')->name('passkeys.destroy');
});
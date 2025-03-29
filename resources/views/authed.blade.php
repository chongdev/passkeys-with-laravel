@extends('layout')

@section('content')
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">

        <div class="flex flex-col gap-4">
            <div class="flex flex-col items-center gap-2">
                <div class="h-20 w-20 bg-gray-300 rounded-full"></div>

                <h2 class="text-3xl font-bold tracking-tight text-center text-gray-900">{{ $user->name }}</h2>
                <p class="text-sm text-center text-gray-600">
                    {{ $user->email }}
                </p>
            </div>

            <div class="p-4 bg-white shadow sm:rounded-lg">

                @if ($user->authenticators()->count() > 0)
                    <div class="border-b mb-2 pb-2 flex justify-between gap-3">
                        <div class="flex-1 flex items-center gap-2">
                            <h2 class="text-lg font-bold">Your passkeys</h2>
                        </div>
                        <div class="flex items-center gap-2">
                            <button-add-passkey username="{{ $user->username }}"></button-add-passkey>
                        </div>
                    </div>

                    <div class="flex flex-col divide-y">
                        @foreach ($user->authenticators as $passkeys)
                            <div class="flex justify-between py-2">
                                <div class="flex flex-col flex-1">
                                    <div class="flex items-center gap-2">
                                        <svg height="24" aria-hidden="true" viewBox="0 0 24 24" version="1.1"
                                            width="24">
                                            <path
                                                d="M9.496 2a5.25 5.25 0 0 0-2.519 9.857A9.006 9.006 0 0 0 .5 20.228a.751.751 0 0 0 .728.772h5.257c3.338.001 6.677.002 10.015 0a.5.5 0 0 0 .5-.5v-4.669a.95.95 0 0 0-.171-.551 9.02 9.02 0 0 0-4.814-3.423A5.25 5.25 0 0 0 9.496 2Z">
                                            </path>
                                            <path
                                                d="M23.625 10.313c0 1.31-.672 2.464-1.691 3.134a.398.398 0 0 0-.184.33v.886a.372.372 0 0 1-.11.265l-.534.534a.188.188 0 0 0 0 .265l.534.534c.071.07.11.166.11.265v.347a.374.374 0 0 1-.11.265l-.534.534a.188.188 0 0 0 0 .265l.534.534a.37.37 0 0 1 .11.265v.431a.379.379 0 0 1-.097.253l-1.2 1.319a.781.781 0 0 1-1.156 0l-1.2-1.319a.379.379 0 0 1-.097-.253v-5.39a.398.398 0 0 0-.184-.33 3.75 3.75 0 1 1 5.809-3.134ZM21 9.75a1.125 1.125 0 1 0-2.25 0 1.125 1.125 0 0 0 2.25 0Z">
                                            </path>
                                        </svg>
                                        <div class="font-bold">{{ $passkeys->name ?? '-' }}</div>
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        <div>Added on {{ $passkeys->created_at }}</div>
                                        <div>Last used {{ $passkeys->last_used_at ?? '-' }}</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-1">
                                    <button type="button"
                                        class="btn bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-green-100">
                                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                                            <path
                                                d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z">
                                            </path>
                                        </svg>
                                    </button>

                                    <form method="POST" class="flex items-center gap-1"
                                        action="{{ route('passkeys.destroy', $passkeys) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit"
                                            class="btn bg-gray-100 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-red-100">
                                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" width="16">
                                                <path
                                                    d="M11 1.75V3h2.25a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75ZM4.496 6.675l.66 6.6a.25.25 0 0 0 .249.225h5.19a.25.25 0 0 0 .249-.225l.66-6.6a.75.75 0 0 1 1.492.149l-.66 6.6A1.748 1.748 0 0 1 10.595 15h-5.19a1.75 1.75 0 0 1-1.741-1.575l-.66-6.6a.75.75 0 1 1 1.492-.15ZM6.5 1.75V3h3V1.75a.25.25 0 0 0-.25-.25h-2.5a.25.25 0 0 0-.25.25Z">
                                                </path>
                                            </svg>
                                        </button>
                                    </form>

                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="flex flex-col p-4 text-center">
                        <div class="flex justify-center mb-3">
                            <svg height="24" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="24">
                                <path
                                    d="M9.496 2a5.25 5.25 0 0 0-2.519 9.857A9.006 9.006 0 0 0 .5 20.228a.751.751 0 0 0 .728.772h5.257c3.338.001 6.677.002 10.015 0a.5.5 0 0 0 .5-.5v-4.669a.95.95 0 0 0-.171-.551 9.02 9.02 0 0 0-4.814-3.423A5.25 5.25 0 0 0 9.496 2Z">
                                </path>
                                <path
                                    d="M23.625 10.313c0 1.31-.672 2.464-1.691 3.134a.398.398 0 0 0-.184.33v.886a.372.372 0 0 1-.11.265l-.534.534a.188.188 0 0 0 0 .265l.534.534c.071.07.11.166.11.265v.347a.374.374 0 0 1-.11.265l-.534.534a.188.188 0 0 0 0 .265l.534.534a.37.37 0 0 1 .11.265v.431a.379.379 0 0 1-.097.253l-1.2 1.319a.781.781 0 0 1-1.156 0l-1.2-1.319a.379.379 0 0 1-.097-.253v-5.39a.398.398 0 0 0-.184-.33 3.75 3.75 0 1 1 5.809-3.134ZM21 9.75a1.125 1.125 0 1 0-2.25 0 1.125 1.125 0 0 0 2.25 0Z">
                                </path>
                            </svg>
                        </div>
                        <h2 class="text-xl font-bold mb-3">Passwordless sign-in with passkeys</h2>
                        <p class="text-sm text-gray-500">Passkeys are webauthn credentials that validate your identity using
                            touch, facial recognition, a device password, or a PIN. They can be used as a password
                            replacement or as a 2FA method. Passkeys can be used for sign-in as a simple and secure
                            alternative to your password and two-factor credentials.</p>

                        <div class="mt-4 flex justify-center">
                            <button-add-passkey username="{{ $user->username }}"></button-add-passkey>
                        </div>
                    </div>
                @endif

            </div>

            <div class="flex flex-col">
                <form action="/logout" method="POST" class="grid gap-2">
                    @csrf
                    <button type="submit" class="text-center bg-blue-600 text-white rounded-lg py-2">
                        Log out
                    </button>
                </form>
            </div>
        </div>
    </div>
@endsection

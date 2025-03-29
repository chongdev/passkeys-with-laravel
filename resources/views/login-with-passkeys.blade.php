@extends('layout')

@section('content')
    <div class="sm:mx-auto sm:w-full sm:max-w-md">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-auto h-12 mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
        </svg>
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-center text-gray-900">Laravel Passkeys</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">

        <login-page></login-page>

        <div class="p-4 rounded-md bg-yellow-50 mt-3">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                        fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd" />
                    </svg>
                </div>

                <div class="ml-3">
                    <h3 class="text-sm font-medium text-yellow-800">
                        Your browser isn't supported!
                    </h3>
                    <div class="mt-2 text-sm text-yellow-700">
                        <p>
                            That's sort of a bummer, sorry. Maybe you have access to a browser that does though,
                            <a target="_blank" class="underline" href="https://caniuse.com/?search=webauthn">
                                check and see
                            </a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

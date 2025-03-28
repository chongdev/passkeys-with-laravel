<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-gray-50">

<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel Passkey Authentication | Chongdev</title>

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    @yield('styles')

</head>

<body class="h-full">
    <div id="app" class="relative flex flex-col justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        
        @yield('content')

        <div class="absolute bottom-0 left-0 right-0 pb-4 mt-auto text-sm text-center text-gray-500">
            <p>Launched with <a class="underline" target="_blank" href="https://chongdev.com">Chong</a></p>
        </div>
    </div>

    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    <script src="{{ mix('js/app.js') }}" defer></script>
    @yield('scripts')
</body>

</html>

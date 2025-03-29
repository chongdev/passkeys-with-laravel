@extends('layout')

@section('content')
    <div class="w-full max-w-sm mx-auto my-8">


        <form action="{{ route('login') }}" method="POST" class="flex flex-col gap-4 bg-white p-10 shadow-lg rounded-3xl">
            @csrf

            <div class="flex flex-col items-center gap-2">
                <h1 class="text-3xl font-bold">{{ 'Log In' }}</h1>
            </div>

            <div class="flex flex-col">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" required
                    class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="flex flex-col">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" required
                    class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <div class="flex items-center gap-2">
                <input type="checkbox" name="remember" id="remember"
                    class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                <label for="remember" class="text-sm text-gray-600">Remember me</label>
            </div>

            <div class="grid gap-4">
                <button type="submit" class="btn bg-blue-500 text-white hover:bg-blue-600 rounded-md p-2 font-bold">Log
                    In</button>
            </div>
        </form>
    </div>
@endsection

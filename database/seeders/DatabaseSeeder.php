<?php

namespace Database\Seeders;

use App\Models\Passkey;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        User::factory()
            // ->has(Passkey::factory())
            ->create([
                'name' => 'Admin',
                'email' => 'admin@example.com',
            ]);
    }
}

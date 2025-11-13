<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Default User',
            'email' => 'user@email.com',
            'password' => bcrypt('password'),
        ]);
    }

}

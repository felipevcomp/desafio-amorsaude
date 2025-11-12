<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $this->call(SpecialtiesTableSeeder::class);
        $this->call(RegionalsTableSeeder::class);
        $this->call(ClinicsTableSeeder::class);
    }
}

<?php

use Illuminate\Database\Seeder;
use App\Models\Clinic;
use App\Models\Specialty;

class ClinicsTableSeeder extends Seeder
{
    public function run()
    {
        factory(Clinic::class, 100)->create()->each(function ($clinic) {
            $specialties = Specialty::inRandomOrder()->take(5)->pluck('id');
            $clinic->specialties()->attach($specialties);
        });
    }

}

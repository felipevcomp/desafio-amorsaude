<?php

use Illuminate\Database\Seeder;
use App\Models\Specialty;

class SpecialtiesTableSeeder extends Seeder
{
    public function run()
    {
        $specialties = [
            'Cardiologia',
            'Ortopedia',
            'Pediatria',
            'Dermatologia',
            'Ginecologia',
            'Neurologia',
            'Oftalmologia',
            'Odontologia',
            'Urologia',
            'Clínica Geral',
        ];

        foreach ($specialties as $name) {
            Specialty::firstOrCreate(['name' => $name]);
        }
    }
}

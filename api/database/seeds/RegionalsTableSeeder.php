<?php

use Illuminate\Database\Seeder;
use App\Models\Regional;

class RegionalsTableSeeder extends Seeder
{
    public function run()
    {
        $regionals = [
            'Alto tietê',
            'Interior',
            'ES',
            'SP Interior',
            'SP',
            'SP2',
            'MG',
            'Nacional',
            'SP CAV',
            'RJ',
            'SP2',
            'SP1',
            'NE1',
            'NE2',
            'SUL',
            'Norte',
        ];


        foreach ($regionals as $name) {
            Regional::firstOrCreate(['name' => $name]);
        }
    }
}

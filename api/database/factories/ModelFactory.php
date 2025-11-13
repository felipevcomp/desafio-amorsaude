<?php
/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Clinic;
use App\Models\Regional;
use Faker\Generator as Faker;

$factory->define(Clinic::class, function (Faker $faker) {
    return [
        'company_name' => $faker->company,
        'trade_name' => $faker->companySuffix,
        'cnpj' => str_pad(rand(10000000000000, 99999999999999), 14, '0', STR_PAD_LEFT),

        'regional_id' => function () {
            $regional = Regional::inRandomOrder()->first();
            return $regional->id;
        },

        'opening_date' => $faker->date(),
        'active' => $faker->boolean(90),
    ];
});

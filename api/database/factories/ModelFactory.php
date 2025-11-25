<?php
/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Clinic;
use App\Models\Regional;
use Faker\Generator as Faker;

$factory->define(Clinic::class, function (Faker $faker) {
    // Função interna para gerar CNPJ válido
    $generateCnpj = function () {
        $n1 = rand(0,9);
        $n2 = rand(0,9);
        $n3 = rand(0,9);
        $n4 = rand(0,9);
        $n5 = rand(0,9);
        $n6 = rand(0,9);
        $n7 = rand(0,9);
        $n8 = rand(0,9);
        $n9 = 0;
        $n10 = 0;
        $n11 = 0;
        $n12 = 1;

        $d1 = $n12*2+$n11*3+$n10*4+$n9*5+$n8*6+$n7*7+$n6*8+$n5*9+$n4*2+$n3*3+$n2*4+$n1*5;
        $d1 = 11 - ($d1 % 11);
        $d1 = ($d1 >= 10) ? 0 : $d1;

        $d2 = $d1*2+$n12*3+$n11*4+$n10*5+$n9*6+$n8*7+$n7*8+$n6*9+$n5*2+$n4*3+$n3*4+$n2*5+$n1*6;
        $d2 = 11 - ($d2 % 11);
        $d2 = ($d2 >= 10) ? 0 : $d2;

        return "$n1$n2$n3$n4$n5$n6$n7$n8$n9$n10$n11$n12$d1$d2";
    };

    return [
        'company_name' => $faker->company,
        'trade_name' => $faker->companySuffix,
        'cnpj' => $generateCnpj(),

        'regional_id' => function () {
            $regional = Regional::inRandomOrder()->first();
            return $regional->id;
        },

        'opening_date' => $faker->date(),
        'active' => $faker->boolean(90),
    ];
});

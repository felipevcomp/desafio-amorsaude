<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Rota de login
Route::post('login', 'AuthController@login');
// Rota de registro
Route::post('register', 'AuthController@register');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rota de especialidades
    Route::get('clinic/specialties', 'ClinicController@specialties');
    // Rota de regionais
    Route::get('clinic/regionals', 'ClinicController@regionals');

    // Rotas de clínicas
    Route::apiResource('clinic', 'ClinicController');

    // Rota de logout
    Route::post('logout', 'AuthController@logout');
});

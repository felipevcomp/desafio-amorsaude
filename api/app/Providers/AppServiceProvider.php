<?php

namespace App\Providers;

use App\Repositories\ClinicRepository;
use App\Repositories\Interfaces\ClinicRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;
use App\Services\AuthService;
use App\Services\ClinicService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(AuthService::class, function ($app) {
            return new AuthService($app->make(UserRepositoryInterface::class));
        });

        $this->app->bind(ClinicRepositoryInterface::class, ClinicRepository::class);
        $this->app->bind(ClinicService::class, function ($app) {
            return new ClinicService($app->make(ClinicRepositoryInterface::class));
        });
    }
}

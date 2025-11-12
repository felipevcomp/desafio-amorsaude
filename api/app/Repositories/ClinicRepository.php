<?php

namespace App\Repositories;


use App\Models\Clinic;
use App\Repositories\Interfaces\ClinicRepositoryInterface;

class ClinicRepository implements ClinicRepositoryInterface
{
    protected $clinic;

    public function __construct(Clinic $clinic)
    {
        $this->clinic = $clinic;
    }

    public function getAll()
    {
        return $this->clinic->with('specialties')->get();
    }

    public function findById(int $id)
    {

    }

    public function create(array $data)
    {
        $clinic = $this->clinic->create($data);

        return $clinic->fresh();
    }

    public function update(int $id, array $data)
    {

    }

    public function delete(int $id)
    {

    }

}
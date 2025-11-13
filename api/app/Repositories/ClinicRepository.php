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
        return $this->clinic->with(['regional', 'specialties'])->paginate(10);
    }

    public function findById(int $id)
    {
        return $this->clinic->with(['regional', 'specialties'])->find($id);
    }

    public function create(array $data)
    {
        $clinic = $this->clinic->create($data);

        if (isset($data['specialties']) && is_array($data['specialties'])) {
            $clinic->specialties()->attach($data['specialties']);
        }

        return $clinic->fresh(['regional', 'specialties']);
    }

    public function update(int $id, array $data)
    {
        $clinic = $this->findById($id);

        if (!$clinic) {
            return false;
        }

        $clinic->update($data);

        if (isset($data['specialties']) && is_array($data['specialties'])) {
            $clinic->specialties()->sync($data['specialties']);
        }

        return $clinic->fresh(['regional', 'specialties']);
    }

    public function delete(int $id)
    {
        $clinic = $this->findById($id);

        if (!$clinic) {
            return false;
        }

        return $clinic->delete();
    }

}
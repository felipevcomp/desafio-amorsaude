<?php

namespace App\Services;

use App\Models\Regional;
use App\Models\Specialty;
use App\Repositories\Interfaces\ClinicRepositoryInterface;

class ClinicService
{
    protected $clinicRepository;

    public function __construct(ClinicRepositoryInterface $clinicRepository)
    {
        $this->clinicRepository = $clinicRepository;
    }

    public function getAllClinics()
    {
        return $this->clinicRepository->getAll();
    }

    public function getClinic(int $id)
    {
        $clinic = $this->clinicRepository->findById($id);

        if (!$clinic) {
            abort(404, 'Clínica não encontrada');
        }

        return $clinic;
    }

    public function createClinic(array $data)
    {
        return $this->clinicRepository->create($data);
    }

    public function updateClinic(int $id, array $data)
    {
        $clinic = $this->clinicRepository->findById($id);

        if (!$clinic) {
            abort(404, 'Clínica não encontrada');
        }

        $updatedClinic = $this->clinicRepository->update($id, $data);

        if (!$updatedClinic) {
            abort(500, 'Falha ao atualizar a clínica');
        }

        return $updatedClinic;
    }

    public function deleteClinic(int $id): bool
    {
        $clinic = $this->clinicRepository->findById($id);

        if (!$clinic) {
            abort(404, 'Clínica não encontrada');
        }

        return $this->clinicRepository->delete($id);
    }

    public function getClinicRegionals()
    {
        return Regional::get();
    }

    public function getClinicSpecialties()
    {
        return Specialty::get();
    }

}

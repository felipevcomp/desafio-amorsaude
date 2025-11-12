<?php

namespace App\Services;

use App\Repositories\Interfaces\ClinicRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Gate;

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
        $task = $this->clinicRepository->findById($id);

        if (!$task) {
            abort(404, 'Tarefa não encontrada');
        }

        return $task;
    }

    public function createClinic(array $data)
    {
        return $this->clinicRepository->create($data);
    }

    public function updateClinic(int $id, array $data)
    {
        $task = $this->clinicRepository->findById($id);

        if (!$task) {
            abort(404, 'Tarefa não encontrada');
        }

        if (Gate::denies('update', $task)) {
            throw new AuthorizationException('Você não está autorizado a atualizar esta tarefa');
        }

        if (isset($data['user_id']) && Gate::denies('assign', Clinic::class)) {
            unset($data['user_id']);
        }

        $updatedClinic = $this->clinicRepository->update($id, $data);

        if (!$updatedClinic) {
            abort(500, 'Falha ao atualizar a tarefa');
        }

        return $updatedClinic;
    }

    public function deleteClinic(int $id): bool
    {
        $task = $this->clinicRepository->findById($id);

        if (!$task) {
            abort(404, 'Tarefa não encontrada');
        }

        if (Gate::denies('delete', $task)) {
            throw new AuthorizationException('Você não está autorizado a excluir esta tarefa');
        }

        return $this->clinicRepository->delete($id);
    }

}

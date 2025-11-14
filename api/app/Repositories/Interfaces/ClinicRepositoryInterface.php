<?php

namespace App\Repositories\Interfaces;

interface ClinicRepositoryInterface
{
    public function getAll();

    public function search(string $search);

    public function findById(int $id);

    public function create(array $data);

    public function update(int $id, array $data);

    public function delete(int $id);
}
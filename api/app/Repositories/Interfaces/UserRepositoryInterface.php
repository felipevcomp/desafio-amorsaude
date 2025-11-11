<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function findByEmail(string $email);

    public function findById(int $id);

    public function create(array $data);

    public function deleteTokens(int $userId): bool;
}

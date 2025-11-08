<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserRepository implements UserRepositoryInterface
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function findByEmail(string $email)
    {
        return $this->user->where('email', $email)->first();
    }

    public function create(array $data): User
    {
        $data['password'] = bcrypt($data['password']);

        $user = $this->user->create($data);

        return $user->fresh();
    }

    public function createToken(User $user, string $name = 'app.authToken'): string
    {
        return $user->createToken($name)->accessToken;
    }
}

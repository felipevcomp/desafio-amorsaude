<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;

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
        return Cache::remember("user.email.{$email}", 10, function () use ($email) {
            return $this->user->where('email', $email)->first();
        });
    }

    public function findById(int $id)
    {
        return Cache::remember("user.{$id}", 10, function () use ($id) {
            return $this->user->find($id);
        });
    }

    public function create(array $data): User
    {
        $data['password'] = bcrypt($data['password']);

        $user = $this->user->create($data);

        return $user->fresh();
    }

    public function deleteTokens(int $userId): bool
    {
        $user = $this->findById($userId);

        if (!$user) {
            return false;
        }

        $user->tokens()->delete();

        return true;
    }

    public function createToken(User $user, string $name = 'app.authToken'): string
    {
        return $user->createToken($name)->accessToken;
    }
}

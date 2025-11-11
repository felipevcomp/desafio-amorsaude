<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;

class AuthService
{
    /**
     * @var UserRepositoryInterface
     */
    protected $userRepository;

    /**
     * Create a new user instance.
     *
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Register a new user.
     *
     * @param array $data
     * @return JsonResponse
     */
    public function register(array $data): JsonResponse
    {
        $user = $this->userRepository->create($data);

        $token = $this->userRepository->createToken($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Log in a user.
     *
     * @param array $credentials
     * @return JsonResponse
     */
    public function login(array $credentials): JsonResponse
    {
        if (!auth()->attempt($credentials)) {
            return response()->json([
                'error' => 'As credenciais fornecidas estão incorretas.'
            ], 401);
        }

        $user = $this->userRepository->findByEmail($credentials['email']);

        $token = $this->userRepository->createToken($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    public function logout(User $user): bool
    {
        return $this->userRepository->deleteTokens($user->id);
    }
}

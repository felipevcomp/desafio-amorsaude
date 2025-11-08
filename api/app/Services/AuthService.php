<?php

namespace App\Services;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

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
     * @return array
     */
    public function register(array $data): array
    {
        $user = $this->userRepository->create($data);

        $token = $this->userRepository->createToken($user);

        return [
            'user' => $user,
            'token' => $token,
        ];
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
}

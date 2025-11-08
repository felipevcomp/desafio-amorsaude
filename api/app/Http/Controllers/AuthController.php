<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * @var AuthService
     */
    protected $authService;

    /**
     * AuthController constructor
     * @param AuthService $authService
     */
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Handles Registration Request.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function register(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->all());

        return response()->json([
            'user' => $result['user'],
            'token' => $result['token'],
        ], 201);
    }

    /**
     * Handles Login Request.
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        return $this->authService->login($request->all());
    }

    /**
     * Returns Authenticated User Details
     *
     * @return JsonResponse
     */
    public function details()
    {
        return response()->json(['user' => auth()->user()], 200);
    }
}
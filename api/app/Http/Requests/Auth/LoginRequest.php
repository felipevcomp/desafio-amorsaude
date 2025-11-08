<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Por favor, digite seu usuário (e-mail de cadastro)!',
            'email.email' => 'Digite um e-mail válido',
            'password.required' => 'Digite uma senha',
        ];
    }
}
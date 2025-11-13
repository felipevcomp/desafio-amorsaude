<?php

namespace App\Http\Requests\Clinic;

use Illuminate\Foundation\Http\FormRequest;

abstract class BaseClinicRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get common validation rules.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    protected function commonRules(): array
    {
        return [
            'company_name' => 'required|string|max:255',
            'trade_name' => 'required|string|max:255',
            'cnpj' => 'required|string|max:20',
            'regional_id' => 'required|exists:regionals,id',
            'opening_date' => 'required|date',
            'active' => 'boolean',
            'specialties' => 'required|array|min:5',
            'specialties.*' => 'required|exists:specialties,id',
        ];
    }
}

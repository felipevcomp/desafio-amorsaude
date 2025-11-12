<?php

namespace App\Http\Requests\Clinic;

class UpdateClinicRequest extends BaseClinicRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return $this->commonRules();
    }

    public function messages(): array
    {
        return [
            //
        ];
    }
}
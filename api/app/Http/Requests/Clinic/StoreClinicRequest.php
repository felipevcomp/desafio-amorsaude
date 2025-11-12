<?php

namespace App\Http\Requests\Clinic;

class StoreClinicRequest extends BaseClinicRequest
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
            'company_name.required' => 'O campo Razão Social é obrigatório',
            'trade_name.required' => 'O campo Nome Fantasia é obrigatório',
            'cnpj.required' => 'O campo CNPJ é obrigatório',
            'cnpj.size' => 'O campo CNPJ precisa ter 14 caracteres',
            'cnpj.regex' => 'CNPJ inválido',
            'regional.required' => 'O campo Regional é obrigatório',
            'opening_date.required' => 'O campo Data de Inauguração é obrigatório',
            'active.required' => 'O campo Clínica Ativa é obrigatório',
            'specialties.required' => 'O campo Especialidades é obrigatório',
        ];
    }
}
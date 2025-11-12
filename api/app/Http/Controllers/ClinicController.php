<?php

namespace App\Http\Controllers;

use App\Http\Requests\Clinic\StoreClinicRequest;
use App\Services\ClinicService;

class ClinicController extends Controller
{
    /**
     * @var ClinicService
     */
    protected $clinicService;

    public function __construct(ClinicService $clinicService)
    {
        $this->clinicService = $clinicService;
    }

    public function index()
    {
        return $this->clinicService->getAllClinics();
    }

    public function store(StoreClinicRequest $request)
    {
        return $this->clinicService->createClinic($request->all());
    }


}
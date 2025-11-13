<?php

namespace App\Http\Controllers;

use App\Http\Requests\Clinic\StoreClinicRequest;
use App\Http\Requests\Clinic\UpdateClinicRequest;
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

    public function show(int $id)
    {
        return $this->clinicService->getClinic($id);
    }

    public function update(UpdateClinicRequest $request, int $id)
    {
        return $this->clinicService->updateClinic($id, $request->all());
    }

    public function destroy(int $id)
    {
        $this->clinicService->deleteClinic($id);

        return response()->json(null, 204);
    }

    public function regionals()
    {
        return $this->clinicService->getClinicRegionals();
    }

    public function specialties()
    {
        return $this->clinicService->getClinicSpecialties();
    }

}
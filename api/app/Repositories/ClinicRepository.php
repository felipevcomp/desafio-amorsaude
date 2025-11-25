<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Cache;

use App\Models\Clinic;
use App\Repositories\Interfaces\ClinicRepositoryInterface;

class ClinicRepository implements ClinicRepositoryInterface
{
    protected $clinic;

    public function __construct(Clinic $clinic)
    {
        $this->clinic = $clinic;
    }

    public function getAll()
    {
        $page = request()->get('page', 1);

        return Cache::remember("clinics.all.page.{$page}", 1, function () {
            return $this->clinic->with(['regional', 'specialties'])->paginate(10);
        });
    }

    public function findById(int $id)
    {
        return Cache::remember("clinic.{$id}", 1, function () use ($id) {
            return $this->clinic->with(['regional', 'specialties'])->find($id);
        });
    }

    public function create(array $data)
    {
        $clinic = $this->clinic->create($data);

        if (isset($data['specialties']) && is_array($data['specialties'])) {
            $clinic->specialties()->attach($data['specialties']);
        }

        $this->clearAllClinicsCache();

        return $clinic->fresh(['regional', 'specialties']);
    }

    public function update(int $id, array $data)
    {
        $clinic = $this->findById($id);

        if (!$clinic) {
            return false;
        }

        $clinic->update($data);

        if (isset($data['specialties']) && is_array($data['specialties'])) {
            $clinic->specialties()->sync($data['specialties']);
        }

        Cache::forget("clinic.{$id}");

        $this->clearAllClinicsCache();

        return $clinic->fresh(['regional', 'specialties']);
    }

    public function delete(int $id)
    {
        $clinic = $this->findById($id);

        if (!$clinic) {
            return false;
        }

        Cache::forget("clinic.{$id}");

        $this->clearAllClinicsCache();

        return $clinic->delete();
    }

    public function search(string $search)
    {
        return Cache::remember("clinic.search.{$search}", 1, function () use ($search){
            return $this->clinic
                ->with(['regional', 'specialties'])
                ->where(function ($query) use ($search) {
                    $query->where('company_name', 'LIKE', "%{$search}%")
                        ->orWhere('trade_name', 'LIKE', "%{$search}%")
                        ->orWhere('cnpj', 'LIKE', "%{$search}%");
                })
                ->paginate(10);
        });
    }

    private function clearAllClinicsCache()
    {
        $page = request()->get('page', 1);

        Cache::forget("clinics.all.page.{$page}");
    }

}
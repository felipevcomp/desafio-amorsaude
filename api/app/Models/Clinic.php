<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Clinic extends Model
{
    protected $fillable = [
        'company_name',
        'trade_name',
        'cnpj',
        'regional',
        'opening_date',
        'active',
        'specialty_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'opening_date' => 'date',
    ];

    public function specialties(): BelongsToMany
    {
        return $this->belongsToMany(Specialty::class, 'clinic_specialties');
    }

}

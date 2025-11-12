<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    protected $fillable = ['name'];

    public function clinics()
    {
        return $this->hasMany(Clinic::class);
    }
}

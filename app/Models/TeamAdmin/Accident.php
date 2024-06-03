<?php

namespace App\Models\TeamAdmin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accident extends Model
{
    use HasFactory;
    protected $table = 'accidents';
    protected $primaryKey = 'accident_id';
    protected $fillable = [
        'fleet_id',
        'driver_id',
        'accident_date',
        'description',
        'location',
        'is_deleted',
    ];
}

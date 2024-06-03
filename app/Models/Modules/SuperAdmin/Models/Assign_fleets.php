<?php

namespace App\Models\Modules\SuperAdmin\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assign_fleets extends Model
{
    use HasFactory;
    protected $primaryKey = 'assign_fleet_id';
    protected $fillable = [
        'driver_id',
        'fleet_id',
        'is_deleted',
    ];
}

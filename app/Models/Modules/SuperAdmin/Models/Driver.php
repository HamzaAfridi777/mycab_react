<?php

// namespace App\Models\Modules\SuperAdmin\Models;
namespace App\Models\Modules\SuperAdmin\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{

    use HasFactory;
    protected $primaryKey = 'driver_id';
    protected $fillable = [
        'name',
        'father_name',
        'gender',
        'country',
        'identity_number',
        'date_of_birth',
        'permanent_address',
        'present_address',
        'image',
        'is_deleted',

    ];
    // public $driver_id = false;
}

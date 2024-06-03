<?php

namespace App\Models\TeamAdmin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taxireports extends Model
{
    use HasFactory;

    protected $table = 'taxi_reports';
    protected $primaryKey = 'reports_id';
    protected $fillable = [
        'driver_id',
        'date',
        'start_time',
        'end_time',
        'total_distance',
        'total_income',
        'is_deleted',
    ];
}

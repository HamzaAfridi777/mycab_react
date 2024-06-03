<?php

namespace App\Models\TeamAdmin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;
    protected $table = 'attendance';
    protected $primaryKey = 'attendance_id';
    protected $fillable = [
        'serial_no',
        'driver_id',
        'Attendance',
        'is_deleted',
    ];
}

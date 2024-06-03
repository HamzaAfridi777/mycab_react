<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;
    protected $primaryKey = 'ride_id';
    protected $fillable = [
        'driver_id',
        'customer_id',
        'status',
        'fare_amount',
        'is_deleted',
    ];
   
}

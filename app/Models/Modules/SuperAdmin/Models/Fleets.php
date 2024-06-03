<?php

namespace App\Models\Modules\SuperAdmin\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fleets extends Model
{
    use HasFactory;
    //  use softDeletes;
   
    protected $primaryKey = 'fleet_id';
    protected $fillable = [
        'name',
        'serial_no',
        'status',
        'is_deleted'
    ];
}

<?php

namespace App\Models\Modules\customer\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $primaryKey = 'customer_id';
    protected $fillable = [
        'name',
        'father_name',
        'gender',
        'country',
        'identity_number',
        'date_of_birth',
        'permanent_address',
        'present_address',
        'is_deleted',
        'image',
        

    ];
}

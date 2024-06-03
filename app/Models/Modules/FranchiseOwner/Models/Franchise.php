<?php

namespace App\Models\Modules\FranchiseOwner\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Franchise extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'location',
        'is_deleted'
    ];

}

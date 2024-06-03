<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FranchiseSystem extends Model
{
    use HasFactory;
    protected $primaryKey = 'franchiseSystem_id';
    protected $fillable = [
        'name',
        'franchise_owner',
        'status',
        'is_deleted',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FranchisePermission extends Model
{
    use HasFactory;
    protected $primaryKey = 'franchise_permission_id';
    protected $fillable = [
        'permission_name',
        'is_deleted',
    ];
}

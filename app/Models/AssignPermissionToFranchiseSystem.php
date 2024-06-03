<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignPermissionToFranchiseSystem extends Model
{
    use HasFactory;
    protected $table = 'assign_permission_to_franchise_system';
    protected $primaryKey ='APTofranchiseSystem_id';
    protected $fillable = [
        'franchise_permission_id',
        'franchiseSystem_id',
    ];

}

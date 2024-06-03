<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role_permission extends Model
{
    use HasFactory;
    protected $table = 'role_permissions';
    protected $primaryKey ='role_permission_id';
    protected $fillable = [
        'role_id',
        'permission_id',
        'is_deleted'
    ];

    public function role(){
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function permission(){
        return $this->belongsTo(Permission::class, 'permission_id');
    }
}



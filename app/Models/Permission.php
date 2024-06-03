<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    use HasFactory;
    protected $primaryKey = 'permission_id';
    protected $fillable = [
        'name',
        'routes',
        'is_deleted',
        'sp_id',
        'parent',
        'level_id',
    ];

    // public function roles(){
    //     return $this->belongsToMany(Role::class,'role_permissions');////the third table role_permissions fetch the roles of a user
    // }
/////////user_permission
    public function users()
    {
        return $this->HasMany(User::class);
    }

    ////////role_permissions
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_permissions');
    }
}

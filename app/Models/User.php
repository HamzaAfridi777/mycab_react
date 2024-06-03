<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    // use softDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    
    protected $primaryKey = 'user_id';
    
    protected $fillable = [
        'name',
        'email',
        'password',
        'status',
        'role_id',
        'is_deleted',
        'is_franchise_owner',
        'franchise_id',
        'last_activity_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
// public $timestamp = false;
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    ///////login relationship
    // public function role()
    // {
    //     return $this->belongsTo(Role::class, 'role_id');
    // }

    ///user_roles relationship
    //It indicates that the current model has one associated user role.
    public function role()
    {
        return $this->hasOne(Role::class, 'role_id');
    }
    // public function userRole()
    // {
    //     return $this->hasOne(User_roles::class, 'user_id');
    // }


    //////////User_permissions relationship
    public function permission()
    {
        return $this->hasMany(Permission::class);
    }

    public function userPermissions()
    {
        return $this->belongsTo(User_permissions::class, 'user_id');
    }

    public function chats()
    {
        return $this->hasMany(Chat::class, 'user_id');
    }

    // Define the inverse relationship with Team_admin
    public function teamAdmin()
    {
        return $this->hasOne(Modules\SuperAdmin\Models\Team_admin::class, 'user_id', 'user_id');
    }
}

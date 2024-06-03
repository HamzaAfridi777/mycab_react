<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;


class Role extends Model
{
    use HasApiTokens, HasFactory;
    protected $primaryKey = 'role_id';
    protected $fillable = [
        'name',
        'status',
        'is_deleted',
        'slug'
    ];


    
//////user_roles

    public function users()
    {
        return $this->belongsTo(User::class,'role_id');
    }



////////////role_permissions
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permissions');
    }
    ///////////checkSlug
    public static function checkSlug($slug)
    {
        return self::where('slug', $slug)->exists();
    }
}

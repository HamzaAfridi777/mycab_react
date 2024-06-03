<?php

namespace App\Models\Modules\SuperAdmin\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Team_admin extends Model
{
    protected $table = 'team_admins';
    protected $primaryKey = 'team_admin_id';

    // Define relationship to User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}


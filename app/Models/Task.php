<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $primaryKey = 'task_id';
    protected $fillable = [
        'TaskDescription',
        'TaskAdmin',
        'franchiseSystem_id',
        'status',
        'is_deleted',
    ];
   
}

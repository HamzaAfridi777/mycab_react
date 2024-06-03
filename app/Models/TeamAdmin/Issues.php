<?php

namespace App\Models\TeamAdmin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Issues extends Model
{
    use HasFactory;
    protected $table = 'issues';
    protected $primaryKey = 'issues_id';
    protected $fillable = [
        'driver_id',
        'title',
        'description',
        'date',
        'recomondation',
        'status',
        'is_deleted'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesJouranl extends Model
{
    use HasFactory;

    protected $table = 'sales_jouranl';
    protected $primaryKey = 'sales_jouranl_id';
    protected $fillable = [
        'name',
        'sale',
        'amount',
        'date',
        'franchiseSystem_id',
        'status',
        'is_deleted',
    ];
}

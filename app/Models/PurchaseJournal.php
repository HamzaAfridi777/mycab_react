<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseJournal extends Model
{
    use HasFactory;
    protected $table = 'purchase_journal';

    protected $primaryKey = 'purchase_jouranl_id';
    protected $fillable = [
        'name',
        'purchase',
        'amount',
        'date',
        'franchiseSystem_id',
        'status',
        'is_deleted',
    ];
}

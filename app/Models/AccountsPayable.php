<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountsPayable extends Model
{
    use HasFactory;
    protected $table = 'accounts_payable';

    protected $primaryKey = 'accounts_payable_id';
    protected $fillable = [
        'purchase_jouranl_id',
        'vendor_id',
        'amount',
        'debit',
        'credit',
        'debit_date',
        'credit_date',
        'is_deleted',
    ];
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountsRecieveable extends Model
{
    use HasFactory;

    protected $table = 'accounts_recieveable';

    protected $primaryKey = 'accounts_recieveable_id';
    protected $fillable = [
        'sales_jouranl_id',
        'customer_id',
        'amount',
        'debit',
        'credit',
        'debit_date',
        'credit_date',
        'is_deleted',
    ];
}

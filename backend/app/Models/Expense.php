<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    /* The Expense model represents the 'expenses' table in the database. 
    It defines the fillable attributes and casts for the model. */
    protected $fillable = [
        'description',
        'amount',
        'category',
        'expense_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'expense_date' => 'date',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    // The Expense model represents an expense record in the database. It uses the HasFactory trait to enable factory-based testing and seeding.
    use HasFactory;

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

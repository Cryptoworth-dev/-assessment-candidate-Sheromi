<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    /**
     * Enable factory-based testing and database seeding.
     */
    use HasFactory;

    /**
     * Attributes that can be mass assigned.
     */
    protected $fillable = [
        'description',
        'amount',
        'category',
        'expense_date',
    ];

    /**
     * Cast database values to appropriate PHP types.
     */
    protected $casts = [
        'amount' => 'decimal:2',
        'expense_date' => 'date',
    ];
}

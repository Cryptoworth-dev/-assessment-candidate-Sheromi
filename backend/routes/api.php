<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ExpenseController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Additional route for expense summary
Route::get('/expenses/summary', [ExpenseController::class, 'summary']);

// Expense routes
Route::apiResource('expenses', ExpenseController::class);


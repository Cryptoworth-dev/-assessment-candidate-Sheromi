<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Requests\StoreExpenseRequest;
use App\Models\Expense;
use Illuminate\Http\JsonResponse;

use App\Http\Requests\UpdateExpenseRequest;

class ExpenseController extends Controller
{
    /**
     * Display a listing of expenses.
     */
    public function index(): JsonResponse
    {
        $expenses = Expense::orderByDesc('expense_date')->get();

        return response()->json([
            'data' => $expenses,
        ]);
    }

    /**
     * Display spending summary.
     */
    public function summary(): JsonResponse
    {
        $total = Expense::sum('amount');

        $byCategory = Expense::query()
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->pluck('total', 'category');

        return response()->json([
            'data' => [
                'total' => $total,
                'by_category' => $byCategory,
            ],
        ]);
    }

    /**
     * Store a newly created expense.
     */
    public function store(StoreExpenseRequest $request): JsonResponse
    {
        $expense = Expense::create($request->validated());

        return response()->json([
            'message' => 'Expense created successfully.',
            'data' => $expense,
        ], 201);
    }

    // Display the specified expense.
    public function show(Expense $expense): JsonResponse
    {
        return response()->json([
            'data' => $expense,
        ]);
    }

    // Update the specified expense.
    public function update(
        UpdateExpenseRequest $request,
        Expense $expense
    ): JsonResponse {
        $expense->update($request->validated());

        return response()->json([
            'message' => 'Expense updated successfully.',
            'data' => $expense->fresh(),
        ]);
    }

    // Remove the specified expense.
    public function destroy(Expense $expense): JsonResponse
    {
        $expense->delete();

        return response()->json([
            'message' => 'Expense deleted successfully.',
        ]);
    }
}

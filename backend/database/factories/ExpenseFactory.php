<?php

namespace Database\Factories;

use App\Models\Expense;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Expense>
 */
class ExpenseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => fake()->sentence(3),
            'amount' => fake()->randomFloat(2, 100, 10000),
            'category' => fake()->randomElement([
                'Food',
                'Transport',
                'Rent',
                'Entertainment',
                'Utilities',
            ]),
            'expense_date' => fake()->date(),
        ];
    }
}
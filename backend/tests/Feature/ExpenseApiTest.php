<?php

use App\Models\Expense;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// Test to ensure that the Expense API can list expenses correctly.
test('it can list expenses', function () {
    Expense::factory()->count(3)->create();

    $response = $this->getJson('/api/expenses');

    $response
        ->assertStatus(200)
        ->assertJsonStructure([
            'data',
        ]);
});

// Test to ensure that the Expense API can create a new expense record.
test('it can create an expense', function () {
    $response = $this->postJson('/api/expenses', [
        'description' => 'Lunch at restaurant',
        'amount' => 2500.00,
        'category' => 'Food',
        'expense_date' => '2026-09-01',
    ]);

    $response
        ->assertStatus(201)
        ->assertJsonPath('data.description', 'Lunch at restaurant')
        ->assertJsonPath('data.category', 'Food');

    $this->assertDatabaseHas('expenses', [
        'description' => 'Lunch at restaurant',
        'category' => 'Food',
    ]);
});

// Test to ensure that the Expense API can return a single expense.
test('it can show a single expense', function () {
    $expense = Expense::factory()->create([
        'description' => 'Dinner',
    ]);

    $response = $this->getJson("/api/expenses/{$expense->id}");

    $response
        ->assertStatus(200)
        ->assertJsonPath('data.id', $expense->id)
        ->assertJsonPath('data.description', 'Dinner');
});

// Test to ensure that the Expense API can update an existing expense record.
test('it can update an expense', function () {
    $expense = Expense::factory()->create([
        'description' => 'Lunch',
        'amount' => 2000.00,
        'category' => 'Food',
        'expense_date' => '2026-09-01',
    ]);

    $response = $this->putJson("/api/expenses/{$expense->id}", [
        'description' => 'Dinner',
        'amount' => 3000.00,
        'category' => 'Food',
        'expense_date' => '2026-09-01',
    ]);

    $response
        ->assertStatus(200)
        ->assertJsonPath('data.description', 'Dinner')
        ->assertJsonPath('data.amount', '3000.00');

    $this->assertDatabaseHas('expenses', [
        'id' => $expense->id,
        'description' => 'Dinner',
        'amount' => 3000.00,
    ]);
});

// Test to ensure that the Expense API can delete an existing expense record.
test('it can delete an expense', function () {
    $expense = Expense::factory()->create();

    $response = $this->deleteJson("/api/expenses/{$expense->id}");

    $response
        ->assertStatus(200)
        ->assertJson([
            'message' => 'Expense deleted successfully.',
        ]);

    $this->assertDatabaseMissing('expenses', [
        'id' => $expense->id,
    ]);
});

// Test to ensure that the Expense API can return a summary of expenses, including total amount and breakdown by category.
test('it can return expense summary', function () {
    Expense::factory()->create([
        'amount' => 1000.00,
        'category' => 'Food',
    ]);

    Expense::factory()->create([
        'amount' => 2000.00,
        'category' => 'Food',
    ]);

    Expense::factory()->create([
        'amount' => 1500.00,
        'category' => 'Transport',
    ]);

    $response = $this->getJson('/api/expenses/summary');

    $response
        ->assertStatus(200)
        ->assertJsonPath('data.total', 4500)
        ->assertJsonPath('data.by_category.Food', 3000)
        ->assertJsonPath('data.by_category.Transport', 1500);
});

// Test to ensure that the Expense API validates required fields when creating a new expense record.
test('it validates required fields when creating an expense', function () {
    $response = $this->postJson('/api/expenses', []);

    $response
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'description',
            'amount',
            'category',
            'expense_date',
        ]);
});

// Test to ensure that the Expense API validates invalid expense values when creating a new expense record.
test('it validates invalid expense values', function () {
    $response = $this->postJson('/api/expenses', [
        'description' => '',
        'amount' => -100,
        'category' => '',
        'expense_date' => 'not-a-date',
    ]);

    $response
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'description',
            'amount',
            'category',
            'expense_date',
        ]);
});

// Test to ensure that the Expense API validates required fields when updating an existing expense record.
test('it validates invalid expense values when updating', function () {
    $expense = Expense::factory()->create();

    $response = $this->putJson("/api/expenses/{$expense->id}", [
        'description' => '',
        'amount' => -100,
        'category' => '',
        'expense_date' => 'not-a-date',
    ]);

    $response
        ->assertStatus(422)
        ->assertJsonValidationErrors([
            'description',
            'amount',
            'category',
            'expense_date',
        ]);
});
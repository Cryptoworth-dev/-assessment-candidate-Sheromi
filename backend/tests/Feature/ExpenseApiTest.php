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

// Test to ensure that the Expense API can update an existing expense record.
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
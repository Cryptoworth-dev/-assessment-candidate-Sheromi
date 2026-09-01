import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

// Import the Expense model
import { Expense } from '../../models/expense';

// Import the ExpenseService to communicate with the Laravel API
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {

  // Store the expenses received from the Laravel API
  expenses: Expense[] = [];

  // Inject the ExpenseService
  constructor(private expenseService: ExpenseService) {}

  // This method runs when the component is initialized
  ngOnInit(): void {

    // Fetch expenses from the Laravel API
    this.expenseService.getExpenses().subscribe({

      // Handle a successful API response
      next: (response) => {

        // Store the expenses returned by Laravel
        this.expenses = response.data;

        // Log the expenses for debugging
        console.log('Expenses:', this.expenses);
      },

      // Handle API errors
      error: (error) => {
        console.error('Failed to fetch expenses:', error);
      }
    });
  }
}


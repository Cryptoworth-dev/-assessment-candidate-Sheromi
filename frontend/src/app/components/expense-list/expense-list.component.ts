import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import { Expense } from '../../models/expense';

import { ExpenseService } from '../../services/expense.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {

  // Store the expenses received from the Laravel API
  expenses: Expense[] = [];

  // Notify the parent component when an expense is selected for editing
  @Output() expenseEdit = new EventEmitter<Expense>();

  // Notify the parent component when an expense is deleted
  @Output() expenseDeleted = new EventEmitter<void>();

  // Inject the ExpenseService
  constructor(private expenseService: ExpenseService) {}

  // Load expenses when the component is initialized
  ngOnInit(): void {
    this.loadExpenses();
  }

  // Fetch expenses from the Laravel API
  loadExpenses(): void {

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

  // Notify the parent component that an expense should be edited
  editExpense(expense: Expense): void {
    this.expenseEdit.emit(expense);
  }

  // Delete an expense by ID
  deleteExpense(id: number): void {

    // Ask the user to confirm before deleting
    const confirmed = confirm(
      'Are you sure you want to delete this expense?'
    );

    // Stop if the user cancels
    if (!confirmed) {
      return;
    }

    // Send the delete request to Laravel
    this.expenseService.deleteExpense(id).subscribe({

      // Runs when the expense is successfully deleted
      next: () => {

        // Log the deleted expense ID
        console.log('Expense deleted successfully:', id);

        // Notify the parent component that an expense was deleted
        this.expenseDeleted.emit();
      },

      // Handle API errors
      error: (error) => {
        console.error('Failed to delete expense:', error);
      }
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import the ExpenseService to communicate with the Laravel API
import { ExpenseService } from './services/expense.service';

// Import the Expense model to define the type of our expenses
import { Expense } from './models/expense';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // Store the expenses received from the Laravel API
  expenses: Expense[] = [];

  // Inject the ExpenseService into the component
  constructor(private expenseService: ExpenseService) {
    console.log('AppComponent constructor is running');
  }

  // This method runs when the component is initialized
  ngOnInit(): void {
    console.log('AppComponent started');

    // Call the getExpenses() method from ExpenseService
    // to fetch expenses from the Laravel API
    this.expenseService.getExpenses().subscribe({

      // This runs when the API request is successful
      next: (response) => {

        // Store the expenses returned by Laravel
        // in the expenses property
        this.expenses = response.data;

        // Display the expenses in the browser console
        console.log('Expenses from Laravel:', this.expenses);
      },

      // This runs if the API request fails
      error: (error) => {
        console.error('Failed to fetch expenses:', error);
      }
    });
  }
}
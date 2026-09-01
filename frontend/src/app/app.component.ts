import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Service used to communicate with the Laravel API
import { ExpenseService } from './services/expense.service';

// Model used to define the structure of an expense
import { Expense } from './models/expense';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // Store the expenses returned from the Laravel API
  expenses: Expense[] = [];

  // Inject ExpenseService so we can call the API
  constructor(private expenseService: ExpenseService) {}

  // Runs automatically when the component is initialized
  ngOnInit(): void {

    // Request all expenses from the Laravel API
    this.expenseService.getExpenses().subscribe({

      // Runs when the API request is successful
      next: (response) => {

        // Store the API data in the expenses array
        this.expenses = response.data;

        // Check the fetched expenses in the browser console
        console.log('Expenses from Laravel:', this.expenses);
      },

      // Runs when the API request fails
      error: (error) => {
        console.error('Failed to fetch expenses:', error);
      }
    });
  }
}

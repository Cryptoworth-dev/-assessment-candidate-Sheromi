import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import the ExpenseService to be used in the component
import { ExpenseService } from './services/expense.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // Define a title property for the component
  constructor(private expenseService: ExpenseService) {
    console.log('AppComponent constructor is running');
  }

  // Implement the ngOnInit lifecycle hook to fetch expenses when the component initializes
  ngOnInit(): void {
    console.log('AppComponent started');

    this.expenseService.getExpenses().subscribe({

      // Handle the response from the getExpenses method
      next: (response) => {
        console.log('Expenses from Laravel:', response);
      },

      // Handle any errors that occur during the HTTP request
      error: (error) => {
        console.error('Failed to fetch expenses:', error);
      }
    });
  }
}

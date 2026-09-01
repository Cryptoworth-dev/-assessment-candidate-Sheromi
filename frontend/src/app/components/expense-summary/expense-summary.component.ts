import { Component, OnInit } from '@angular/core';

// Import the ExpenseService to use it in this component
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [],
  templateUrl: './expense-summary.component.html',
  styleUrl: './expense-summary.component.css'
})

export class ExpenseSummaryComponent implements OnInit {

  // Total expenses and expenses by category
  total = 0;
  byCategory: { [category: string]: number } = {};

  // Inject the ExpenseService
  constructor(private expenseService: ExpenseService) {}

  // Runs when the component is initialized
  ngOnInit(): void {

    this.expenseService.getSummary().subscribe({
      next: (response) => {
        this.total = response.data.total;
        this.byCategory = response.data.by_category;
      },
      error: (error) => {
        console.error('Failed to fetch expense summary:', error);
      }
    });
    
  }

}

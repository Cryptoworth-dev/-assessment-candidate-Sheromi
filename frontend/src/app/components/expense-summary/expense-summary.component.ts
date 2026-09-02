import { Component, OnInit } from '@angular/core';

import { KeyValuePipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-summary',
  standalone: true,
  imports: [KeyValuePipe],
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
    this.loadSummary();
  }

  // Load the summary data from the API
  loadSummary(): void {
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

  // Calculate the width of each chart bar relative to the highest category
  getBarWidth(amount: number): number {
    const values = Object.values(this.byCategory);

    if (values.length === 0) {
      return 0;
    }

    const maxAmount = Math.max(...values);

    if (maxAmount === 0) {
      return 0;
    }

    return (amount / maxAmount) * 100;
  }

}

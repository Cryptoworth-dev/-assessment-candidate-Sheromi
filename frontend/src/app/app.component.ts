import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Component responsible for creating expenses
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

// Component responsible for displaying expenses
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

@Component({
  selector: 'app-root',
  standalone: true,

  // Make the router outlet, expense form, and expense list
  // available in the AppComponent template
  imports: [
    RouterOutlet,
    ExpenseFormComponent,
    ExpenseListComponent
  ],

  // Main application HTML template
  templateUrl: './app.component.html',

  // Main application CSS file
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Get access to the ExpenseListComponent instance
  @ViewChild(ExpenseListComponent)
  expenseListComponent!: ExpenseListComponent;

  // Called when the ExpenseFormComponent successfully creates an expense
  onExpenseCreated(): void {

    // Refresh the expense list so the new expense appears immediately
    this.expenseListComponent.loadExpenses();
  }
}

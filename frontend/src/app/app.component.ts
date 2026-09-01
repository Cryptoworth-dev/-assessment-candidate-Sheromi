import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import the Expense model 
import { Expense } from './models/expense';

// Component responsible for creating expenses
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

// Component responsible for displaying expenses
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

// Component responsible for displaying expense summary
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';

@Component({
  selector: 'app-root',
  standalone: true,

  // Make the router outlet, expense form, and expense list
  // available in the AppComponent template
  imports: [
    RouterOutlet,
    ExpenseFormComponent,
    ExpenseListComponent,
    ExpenseSummaryComponent
  ],

  // Main application HTML template
  templateUrl: './app.component.html',

  // Main application CSS file
  styleUrl: './app.component.css'
})
export class AppComponent {

  // Reference to the expense list component 
  @ViewChild(ExpenseListComponent) 
  expenseListComponent!: ExpenseListComponent;

  // Store the expense currently selected for editing 
  selectedExpense: Expense | null = null; 

  // Called when the user clicks the Edit button 
  onExpenseEdit(expense: Expense): void { 
    this.selectedExpense = expense; 
  } 

  // Called after an expense is created or updated 
  onExpenseChanged(): void { 
    this.selectedExpense = null; 

    // Refresh the expense list to show the latest data
    this.expenseListComponent.loadExpenses();
  } 

  // Called when the user cancels editing 
  onEditCancelled(): void { 
    this.selectedExpense = null; 
  }
}

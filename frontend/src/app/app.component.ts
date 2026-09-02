import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import the Expense model 
import { Expense } from './models/expense';

// Components used by the application
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpenseListComponent } from './components/expense-list/expense-list.component';
import { ExpenseSummaryComponent } from './components/expense-summary/expense-summary.component';


@Component({
  selector: 'app-root',
  standalone: true,

  // Make the imported components available in the AppComponent template
  imports: [
    RouterOutlet,
    ExpenseFormComponent,
    ExpenseListComponent,
    ExpenseSummaryComponent
  ],

  templateUrl: './app.component.html',

  styleUrl: './app.component.css'
})
export class AppComponent {

  // References to child components that need to be refreshed
  @ViewChild(ExpenseListComponent) 
  expenseListComponent!: ExpenseListComponent;

  @ViewChild(ExpenseSummaryComponent)
  expenseSummaryComponent!: ExpenseSummaryComponent;

  // Stores the expense currently selected for editing
  selectedExpense: Expense | null = null; 

  // Pass the selected expense to the form for editing
  onExpenseEdit(expense: Expense): void { 
    this.selectedExpense = expense; 
  } 

  // Refresh the list and summary after an expense changes
  onExpenseChanged(): void { 
    this.selectedExpense = null; 

    this.expenseListComponent.loadExpenses();

    this.expenseSummaryComponent.loadSummary();
  } 

  // Clear the selected expense when editing is cancelled
  onEditCancelled(): void { 
    this.selectedExpense = null; 
  }
}

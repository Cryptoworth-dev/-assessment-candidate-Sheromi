import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Component responsible for creating expenses
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';

// Component responsible for fetching and displaying expenses
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
  // AppComponent acts as the root application component.
  //
  // ExpenseFormComponent is responsible for:
  // - Collecting expense information
  // - Validating the form
  // - Sending new expenses to the Laravel API
  //
  // ExpenseListComponent is responsible for:
  // - Fetching expenses from the Laravel API
  // - Storing the expenses
  // - Displaying the expenses
}


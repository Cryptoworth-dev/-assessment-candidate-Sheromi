import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import the ExpenseListComponent
// This component handles fetching and displaying expenses
import { ExpenseListComponent } from './components/expense-list/expense-list.component';

@Component({
  selector: 'app-root',
  standalone: true,

  // Make the router outlet and expense list component
  // available in the AppComponent template
  imports: [
    RouterOutlet,
    ExpenseListComponent
  ],

  // Main application HTML template
  templateUrl: './app.component.html',

  // Main application CSS file
  styleUrl: './app.component.css'
})
export class AppComponent {

  // AppComponent is the root application component.
  //
  // ExpenseListComponent is responsible for:
  // - Fetching expenses from the Laravel API
  // - Storing the expenses
  // - Displaying the expenses
}

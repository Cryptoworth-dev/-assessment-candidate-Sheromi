import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// Service used to communicate with the Laravel API
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,

  // Make Reactive Forms available in this component
  imports: [ReactiveFormsModule],

  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.css'
})
export class ExpenseFormComponent {

  // Create the expense form with validation rules
  expenseForm = this.formBuilder.group({
    description: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    expense_date: ['', Validators.required]
  });

  // Inject FormBuilder and ExpenseService
  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService
  ) {}

  // Handle form submission
  onSubmit(): void {

    // Stop submission if the form is invalid
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    // Create an object that matches the data expected by the API
    const expenseData = {
      description: this.expenseForm.value.description ?? '',
      amount: this.expenseForm.value.amount ?? '',
      category: this.expenseForm.value.category ?? '',
      expense_date: this.expenseForm.value.expense_date ?? ''
    };

    // Send the expense data to Laravel
    this.expenseService.createExpense(expenseData).subscribe({

      // Runs when the expense is successfully created
      next: (response) => {
        console.log('Expense created successfully:', response);

        // Reset the form after successful submission
        this.expenseForm.reset();
      },

      // Runs if the API request fails
      error: (error) => {
        console.error('Failed to create expense:', error);
      }
    });
  }

}


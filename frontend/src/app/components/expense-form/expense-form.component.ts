import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

// Import the Expense model
import { Expense } from '../../models/expense';

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
export class ExpenseFormComponent implements OnChanges {

  // Expense selected for editing
  @Input() expenseToEdit: Expense | null = null;

  // Notify the parent component when a new expense is created
  @Output() expenseCreated = new EventEmitter<void>();

  // Notify the parent component when an expense is updated
  @Output() expenseUpdated = new EventEmitter<void>();

  // Notify the parent component when editing is cancelled
  @Output() editCancelled = new EventEmitter<void>();

  // Store the ID of the expense currently being edited
  editingExpenseId: number | null = null;

  // Create the expense form with validation rules
  expenseForm = this.formBuilder.group({
    description: ['', Validators.required],
    amount: ['', [Validators.required, Validators.min(0.01)]],
    category: ['', Validators.required],
    expense_date: ['', Validators.required]
  });

  // Inject FormBuilder and ExpenseService
  constructor(
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService
  ) {}

  // Detect when the parent sends an expense to edit
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['expenseToEdit']) {

      if (this.expenseToEdit) {

        // Store the ID of the expense being edited
        this.editingExpenseId = this.expenseToEdit.id;

        // Populate the form with the existing expense data
        this.expenseForm.patchValue({
          description: this.expenseToEdit.description,
          amount: this.expenseToEdit.amount,
          category: this.expenseToEdit.category,
          expense_date: this.expenseToEdit.expense_date.substring(0, 10)
        });

      } else {

        // Exit edit mode
        this.editingExpenseId = null;

        // Clear the form
        this.expenseForm.reset();
      }
    }
  }

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

    // If an expense ID exists, update the existing expense
    if (this.editingExpenseId !== null) {

      this.expenseService
        .updateExpense(this.editingExpenseId, expenseData)
        .subscribe({

          // Runs when the expense is successfully updated
          next: (response) => {

            console.log(
              'Expense updated successfully:',
              response
            );

            // Exit edit mode
            this.editingExpenseId = null;

            // Reset the form
            this.expenseForm.reset();

            // Notify the parent component
            this.expenseUpdated.emit();
          },

          // Runs if the API request fails
          error: (error) => {
            console.error(
              'Failed to update expense:',
              error
            );
          }
        });

      return;
    }

    // Create a new expense
    this.expenseService.createExpense(expenseData).subscribe({

      // Runs when the expense is successfully created
      next: (response) => {

        console.log(
          'Expense created successfully:',
          response
        );

        // Reset the form after successful submission
        this.expenseForm.reset();

        // Tell the parent component that a new expense was created
        this.expenseCreated.emit();
      },

      // Runs if the API request fails
      error: (error) => {
        console.error(
          'Failed to create expense:',
          error
        );
      }
    });
  }

  // Cancel the current edit
  cancelEdit(): void {

    // Exit edit mode
    this.editingExpenseId = null;

    // Clear the form
    this.expenseForm.reset();

    // Notify the parent component
    this.editCancelled.emit();
  }
}

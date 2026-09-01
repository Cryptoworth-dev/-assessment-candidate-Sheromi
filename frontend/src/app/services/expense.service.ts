import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Import the Expense model
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // Define the base URL for the Laravel API
  private apiUrl = 'http://localhost:8000/api/expenses';

  // Inject HttpClient into the service
  constructor(private http: HttpClient) {}

  // Get all expenses
  getExpenses(): Observable<{ data: Expense[] }> {
    return this.http.get<{ data: Expense[] }>(this.apiUrl);
  }

  // Create a new expense
  createExpense(
    expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>
  ): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // Get a specific expense by ID
  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  // Update an existing expense
  updateExpense(
    id: number,
    expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>
  ): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  // Delete an expense by ID
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get a summary of expenses
  getSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`);
  }
}

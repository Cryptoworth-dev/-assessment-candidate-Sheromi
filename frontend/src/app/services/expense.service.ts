import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  // Define the base URL for the API
  private apiUrl = 'http://localhost:8000/api/expenses';

  // Inject HttpClient into the service
  constructor(private http: HttpClient) {}

  // Method to get all expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

  // Method to create a new expense
  createExpense(expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }

  // Method to get a specific expense by ID
  getExpense(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${this.apiUrl}/${id}`);
  }

  // Method to update an existing expense
  updateExpense(id: number, expense: Omit<Expense, 'id' | 'created_at' | 'updated_at'>): Observable<Expense> {
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense);
  }

  // Method to delete an expense by ID
  deleteExpense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Method to get a summary of expenses
  getSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary`);
  }
}
# Cryptoworth Expense Tracker Backend

Laravel REST API backend for the Cryptoworth Expense Tracker Take-Home Technical Assessment.

## Tech Stack

PHP 8.3.33
Laravel 13.29.0
MySQL
Pest 4.7
Faker 1.23

## Features

Core:
RESTful JSON API
Expense CRUD operations
Expense summary with total spending and category breakdown
Eloquent Expense model
Database migrations
Expense factory and sample data seeder
StoreExpenseRequest and UpdateExpenseRequest validation
Structured JSON responses with appropriate HTTP status codes

Bonus:
Spending chart by category
Automated API tests

## API Endpoints

| Method | Endpoint                | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/expenses`         | List expenses        |
| POST   | `/api/expenses`         | Create an expense    |
| GET    | `/api/expenses/{id}`    | Get an expense       |
| PUT    | `/api/expenses/{id}`    | Update an expense    |
| DELETE | `/api/expenses/{id}`    | Delete an expense    |
| GET    | `/api/expenses/summary` | Get spending summary |

## Setup

composer install
cp .env.example .env
php artisan key:generate

Configure the MySQL database in `.env`, then run:

php artisan migrate:fresh --seed
php artisan serve

The API will be available at: 

http://127.0.0.1:8000

## Testing

Run the automated tests:

php artisan test

## Assumptions

Expenses are standalone records with no user ownership.
Authentication is not implemented.
Categories are free-text rather than predefined categories.
Zero and negative expense amounts are rejected.
Categories must contain at least one alphabetic character.
Filtering, pagination, search, CSV export, Docker, and authentication are outside the current scope.

The implementation intentionally focuses on the required assessment functionality while keeping the code simple, maintainable, and easy to extend.

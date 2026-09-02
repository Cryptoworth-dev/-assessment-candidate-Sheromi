# Cryptoworth Expense Tracker

This is a full-stack expense tracker built for the Cryptoworth Junior Full-Stack Engineer Take-Home Technical Assessment.

## Project Overview

The application lets users create, view, edit, delete, and summarize expense records. The Angular single-page frontend consumes a Laravel RESTful JSON API over HTTP. Expenses are displayed most recently first, and the summary includes total spending and spending totals grouped by category.

## Tech Stack

### Backend

- PHP 8.3+
- Laravel 13.29.0
- MySQL for the application database
- Eloquent ORM
- Laravel Form Requests for validation
- Pest 4.7 and PHPUnit
- Faker 1.23 for factories and seed data

### Frontend

- Angular 18.2
- TypeScript 5.4
- RxJS 7.8
- Angular Reactive Forms and HttpClient
- Jasmine 5.1 and Karma 6.4
- Angular CLI/build tooling 18.0.x

## Core Features

- Add an expense with a description, amount, category, and date.
- List expenses, ordered by expense date with the most recent first.
- Edit an existing expense.
- Delete an expense with browser confirmation.
- View a spending summary with total spending.
- View spending totals by category.
- Validate expense data in both the Angular form and Laravel API.

## Additional Features

- Visual spending bars show each category relative to the highest category total.
- Automated backend API tests cover CRUD operations, summaries, and validation.
- Frontend component tests are included for the application, form, list, and summary components.

## Requirements

- PHP 8.3 or later
- Composer
- MySQL
- Node.js and npm

The committed PHPUnit configuration uses an in-memory SQLite database for tests, but the running application is configured for MySQL by `.env.example`.

## Installation and Setup

From a clean checkout:

1. Clone the repository and enter it:

    ```bash
    git clone https://github.com/Cryptoworth-dev/-assessment-candidate-Sheromi.git
    cd -assessment-candidate-Sheromi
    ```

2. Set up the Laravel backend:

    ```bash
    cd backend
    composer install
    ```

   Copy the environment template. In PowerShell:

   Copy-Item .env.example .env

   On macOS/Linux, use `cp .env.example .env`.

   Generate the application key:

   php artisan key:generate

3. Create a MySQL database named `expense_tracker_db`, or choose another database name and update `DB_DATABASE` in `backend/.env`. Set `DB_USERNAME` and `DB_PASSWORD` as required for the local MySQL installation.

4. Run the migrations and insert the sample data:

   php artisan migrate --seed

   The seeder creates one sample user and 10 sample expenses. Expenses are not associated with that user.

5. Start the Laravel API and leave it running:

   php artisan serve

6. In a second terminal, enter the Angular frontend and install its dependencies:

    ```bash
    cd frontend
    npm install
    ```

7. Start the Angular application:

   npm start

## Running the Application

Both servers must be running:

- Backend API: `http://localhost:8000`
- Frontend: `http://localhost:4200/`

The frontend currently uses the hard-coded API base URL `http://localhost:8000/api/expenses`.

## API Endpoints

All expense endpoints are prefixed with `/api`.

| Method | Endpoint                | Purpose                                      |
| ------ | ----------------------- | -------------------------------------------- |
| GET    | `/api/expenses`         | List expenses, most recent first             |
| POST   | `/api/expenses`         | Create an expense                            |
| GET    | `/api/expenses/{id}`    | Retrieve one expense                         |
| PUT    | `/api/expenses/{id}`    | Update an expense                            |
| DELETE | `/api/expenses/{id}`    | Delete an expense                            |
| GET    | `/api/expenses/summary` | Return total spending and totals by category |

Successful API responses use JSON. Collections and individual records are returned in a `data` property; the summary returns `data.total` and `data.by_category`.

## Validation

The Angular reactive form requires description, amount, category, and expense date. Amount must be at least `0.01`.

The Laravel create and update requests enforce:

- `description`: required string, maximum 255 characters
- `amount`: required numeric value, minimum `0.01`
- `category`: required string, maximum 100 characters, with at least one alphabetic character
- `expense_date`: required valid date

Invalid API requests return HTTP `422` validation responses. Frontend API failures are currently logged to the browser console rather than shown in a dedicated user-facing error state.

## Testing

Run backend tests from `backend/`:

php artisan test

The Pest feature tests cover listing, creating, retrieving, updating, deleting, summary totals and category totals, required-field validation, invalid values, zero and negative amounts, and numeric-only categories.

Run frontend tests from `frontend/`:

npm test

The Angular/Jasmine/Karma tests cover component creation and HTTP request handling for expense data and summary data.

## Assumptions and Trade-offs

- Expenses are standalone records and are not associated with users.
- Authentication is not implemented for the expense API.
- Categories are free-text values rather than a predefined list.
- Expense amounts are stored as decimal values with two decimal places, and dates are stored as SQL dates.
- The frontend has no configured application routes and renders the tracker from the root component.
- The implementation intentionally focuses on the required core functionality and selected bonus features while keeping the code straightforward for the assessment.

## Future Improvements

The current implementation focuses on the required core functionality and selected bonus features. With additional development time, the following could be added:

- Filtering and pagination for larger expense lists.
- Search by expense description or category.
- Authentication and user-specific expenses.
- CSV export for expense records.
- Docker configuration for easier local setup and deployment.

## Backend and Frontend Documentation

- [Backend documentation](backend/README.md)
- [Frontend documentation](frontend/README.md)
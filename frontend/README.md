# Cryptoworth Expense Tracker Frontend

Angular frontend for the Cryptoworth Expense Tracker Take-Home Technical Assessment.

This frontend is a single-page expense tracker built with Angular. It allows users to create, edit, view, delete, and summarize expenses through a Laravel API.

## Tech Stack

* Angular 18.2
* TypeScript 5.4
* RxJS 7.8
* Angular Reactive Forms and HttpClient
* Jasmine and Karma

## Features

* Add expenses with description, amount, category, and date fields.
* Validate required fields.
* Edit existing expenses and cancel editing.
* Display expenses in a table with formatted dates.
* Delete expenses after browser confirmation.
* Display the total expense amount and totals by category.
* Render spending bars for each category.

## API Integration

The frontend uses `http://localhost:8000/api/expenses` as its API base URL through `ExpenseService`.

| Method   | Endpoint                | Usage                                |
| -------- | ----------------------- | ------------------------------------ |
| `GET`    | `/api/expenses`         | Load all expenses                    |
| `POST`   | `/api/expenses`         | Create an expense                    |
| `GET`    | `/api/expenses/{id}`    | Load one expense by ID               |
| `PUT`    | `/api/expenses/{id}`    | Update an expense                    |
| `DELETE` | `/api/expenses/{id}`    | Delete an expense                    |
| `GET`    | `/api/expenses/summary` | Load total and category summary data |

The list expects the collection response in a `data` property. The summary reads `data.total` and `data.by_category`.

## Installation

From this directory, install the Node.js dependencies:

```bash
npm install
```

## Running the Application

Start the Angular development server:

```bash
npm start
```

Open `http://localhost:4200/`.

The API is expected to be available at `http://localhost:8000`.

## Running Tests

Run the configured Angular unit tests with:

```bash
npm test
```

Tests use Jasmine, Karma, Chrome Launcher, and Angular HTTP testing providers.

There are component creation tests for:

* `AppComponent`
* `ExpenseFormComponent`
* `ExpenseListComponent`
* `ExpenseSummaryComponent`

## Notes / Assumptions

* The API URL is hard-coded in `src/app/services/expense.service.ts`.
* The application does not use configured routes and renders the expense tracker from the root component.
* API and browser-console errors are logged, but no user-facing API error state is currently implemented.
* The implementation intentionally focuses on the required frontend functionality while keeping the code simple, maintainable, and easy to extend.

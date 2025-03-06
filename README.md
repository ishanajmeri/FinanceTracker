# Personal Finance Tracker

## Features

### Backend (Node.js & Express)

- RESTful API to manage transactions
- CRUD operations:
  - Create a new transaction
  - Retrieve all transactions or filter by type, category, or date range
  - Retrieve a single transaction
  - Update a transaction
  - Delete a transaction
- Summary endpoint to calculate total income, total expenses, and net balance
- Middleware for request logging
- Input validation and error handling

### Frontend (Next.js)

- Dashboard displaying transactions in a table format
- Summary section showing total income, total expenses, and net balance
- Filtering options (type, category, date range)
- API call handling with loading states and error messages
- React hooks for state management

## Installation & Setup

### Prerequisites

Ensure you have **Node.js** and **Yarn** installed on your machine.

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Start the backend server:
   ```sh
   yarn start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```
3. Start the frontend server:
   ```sh
   yarn dev
   ```

## Design Choices

- **CSV as Database**: The backend reads and writes transactions to a CSV file instead of using a traditional database.

## Known Limitations & Future Improvements

- CSV storage is not ideal for large datasets; future iterations may migrate to a database (e.g., PostgreSQL, MongoDB).
- Implement Redis caching to improve performance by reducing redundant database reads.
- Additional features like authentication and user-specific transaction tracking could be added.

# User API

Simple REST API built with **Node.js**, **Express**, and **TypeScript**.
This project stores user data in a **CSV file** through a repository abstraction, making it easy to replace the storage layer later.

---

## Features

* Create users
* List all users
* Get user by ID
* JSON request/response
* Repository pattern
* CSV persistence
* TypeScript support

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* File System (`fs/promises`)

---

## Project Structure

```bash
src/
 ├── index.ts
 ├── models/
 │    └── User.ts
 ├── repositories/
 │    ├── IUserRepository.ts
 │    └── CsvUserRepository.ts
 ├── services/
 │    └── UserService.ts
 └── routes/
      └── userRoutes.ts
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd user-api
```

Install dependencies:

```bash
npm install
```

---

## Run in development

```bash
npm run dev
```

Server will start at:

```bash
http://localhost:3000
```

---

## API Endpoints

### Create user

**POST** `/api/users`

Request body:

```json
{
  "name": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": "123456789"
}
```

Response:

```json
{
  "id": "uuid",
  "name": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": "123456789"
}
```

---

### Get all users

**GET** `/api/users`

Response:

```json
[
  {
    "id": "uuid",
    "name": "John",
    "lastname": "Doe",
    "email": "john@example.com",
    "phone": "123456789"
  }
]
```

---

### Get user by id

**GET** `/api/users/:id`

Response:

```json
{
  "id": "uuid",
  "name": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "phone": "123456789"
}
```

---

## Data Storage

User records are persisted in:

```bash
data/users.csv
```

Example:

```csv
id,name,lastname,email,phone
1,John,Doe,john@example.com,123456789
```

---

## Design Pattern

The project uses the **Repository Pattern**:

* `IUserRepository` → contract
* `CsvUserRepository` → concrete implementation
* `UserService` → business logic
* `Routes` → HTTP layer

This allows replacing CSV with:

* PostgreSQL
* MongoDB
* MySQL
* Redis

without changing route logic.

---

## Future Improvements

* Request validation
* Error handling middleware
* Unit testing
* Docker support
* Database integration
* Authentication

---

## License

MIT

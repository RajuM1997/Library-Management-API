# 📚 Library Management API

A **TypeScript + Express + Mongoose** API for managing books and borrow — with input validation powered by **Zod**.  
Implements the **MVC architecture** for maintainability and scalability.

---

## 🚀 Features

- **TypeScript** for type safety
- **Express.js** for API routing
- **Mongoose** for MongoDB interactions
- **Zod** for request data validation
- **Custom Error Handling**
- **MVC Architecture**
- **Static & Instance Model Methods**
- CRUD operations for Books and Borrow Records

---

## 📂 Folder Structure

src/  
├── app.ts # Express app initialization  
├── server.ts # Server startup and Configurations (DB connection)  
├── app/  
│ ├── modules/  
│ │ ├── book.model.ts # Mongoose schema & model  
│ │ ├── borrow.model.ts  
│ ├── controller/  
│ │ ├── book.controller.ts  
│ │ ├── borrow.controller.ts  
│ ├── route/  
│ │ ├── book.routes.ts  
│ │ ├── borrow.routes.ts  
│ ├── utils/ # Helper functions

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/RajuM1997/Library-Management-API.git

# Navigate into the project
cd library-api

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

# Development

npm run dev

# Build for production

npm run build

# Start production

npm start

# Book

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/api/books`     | Create a new book |
| GET    | `/api/books`     | Get all books     |
| GET    | `/api/books/:id` | Get single book   |
| PUT    | `/api/books/:id` | Update a book     |
| DELETE | `/api/books/:id` | Delete a book     |

# Borrow

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| POST   | `/api/borrow` | Borrow a book          |
| GET    | `/api/borrow` | Get all borrow records |

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
├── server.ts # Server startup  
├── config/ # Configurations (DB connection, environment variables)  
├── modules/  
│ ├── books/  
│ │ ├── book.model.ts # Mongoose schema & model  
│ │ ├── book.controller.ts  
│ │ ├── book.routes.ts  
│ │ ├── book.validation.ts  
│ ├── borrow/  
│ │ ├── borrow.model.ts  
│ │ ├── borrow.controller.ts  
│ │ ├── borrow.routes.ts  
│ │ ├── borrow.validation.ts  
├── middlewares/ # Error handlers, validators  
├── utils/ # Helper functions

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

import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getSingleBook,
  updateBook,
} from "../controller/book.controllers";

export const bookRoutes = express.Router();

// get all books route
bookRoutes.get("/", getAllBooks);

// get single book route
bookRoutes.get("/:bookId", getSingleBook);

// create book route
bookRoutes.post("/", createBook);

// update book route
bookRoutes.put("/:bookId", updateBook);

// delete book route
bookRoutes.delete("/:bookId", deleteBook);

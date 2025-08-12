"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("../controller/book.controllers");
exports.bookRoutes = express_1.default.Router();
// get all books route
exports.bookRoutes.get("/", book_controllers_1.getAllBooks);
// get single book route
exports.bookRoutes.get("/:bookId", book_controllers_1.getSingleBook);
// get single book using ISBN route
exports.bookRoutes.get("/isbn/check-isbn", book_controllers_1.getBookISBN);
// create book route
exports.bookRoutes.post("/", book_controllers_1.createBook);
// update book route
exports.bookRoutes.put("/:bookId", book_controllers_1.updateBook);
// delete book route
exports.bookRoutes.delete("/:bookId", book_controllers_1.deleteBook);

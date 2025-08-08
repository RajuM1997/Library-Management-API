"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getSingleBook = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = require("../model/book.model");
const zod_1 = require("zod");
const zodErrorFormatter_1 = require("../utils/zodErrorFormatter");
// zod schema
const CreateBookZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title is required" }),
    author: zod_1.z.string().min(1, { message: "Author name is required" }),
    genre: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], { message: "Invalid genre" }),
    isbn: zod_1.z.string().min(1, { message: "ISBN is required" }),
    copies: zod_1.z
        .number({ message: "Copies must be a number" })
        .min(0, { message: "Copies must be positive" }),
    available: zod_1.z.boolean().optional(),
});
// create book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // zod parse
        const bookData = yield CreateBookZodSchema.parseAsync(req.body);
        const newBook = yield book_model_1.BookModel.create(bookData);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        // handle zod validation error
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json((0, zodErrorFormatter_1.formatZodError)(error, req.body));
        }
        return res.status(500).json({
            message: error.message || "Internal server error",
            success: false,
            error,
        });
    }
});
exports.createBook = createBook;
// get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort, limit } = req.query;
        const filterQuery = {};
        if (filter) {
            filterQuery.genre = filter;
        }
        const sortQuery = {};
        if (sort) {
            sortQuery.createdAt = sort === "asc" ? 1 : -1;
        }
        const limitValue = limit ? Number(limit) : 10;
        const books = yield book_model_1.BookModel.find(filterQuery)
            .sort(sortQuery)
            .limit(limitValue);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.getAllBooks = getAllBooks;
// get single book
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.BookModel.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.getSingleBook = getSingleBook;
// update book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const bookData = req.body;
        const book = yield book_model_1.BookModel.findByIdAndUpdate(bookId, bookData, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.updateBook = updateBook;
// delete book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.BookModel.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.deleteBook = deleteBook;

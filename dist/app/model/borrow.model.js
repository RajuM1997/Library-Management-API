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
exports.BorrowModel = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = require("./book.model");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
    },
}, { versionKey: false, timestamps: true });
borrowSchema.static("findAvailable", function findAvailable(bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield book_model_1.BookModel.findById(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        if (book.copies < quantity) {
            throw new Error(`Only ${book.copies} copies available`);
        }
        if (book.copies === 0) {
            throw new Error("No copies available");
        }
        const updatedCopies = book.copies - quantity;
        yield book_model_1.BookModel.findByIdAndUpdate(bookId, { copies: updatedCopies });
        if (updatedCopies === 0) {
            yield book_model_1.BookModel.findByIdAndUpdate(bookId, { available: false });
        }
    });
});
exports.BorrowModel = (0, mongoose_1.model)("Borrow", borrowSchema);

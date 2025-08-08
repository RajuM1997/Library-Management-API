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
exports.getBorrow = exports.createBorrow = void 0;
const borrow_model_1 = require("../model/borrow.model");
const zod_1 = require("zod");
const zodErrorFormatter_1 = require("../utils/zodErrorFormatter");
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const CreateBorrowZodSchema = zod_1.z.object({
    book: zod_1.z
        .string({ message: "Book is required" })
        .refine((val) => objectIdRegex.test(val), {
        message: "Invalid Book ID format",
    }),
    quantity: zod_1.z
        .number({ message: "Quantity is required" })
        .min(0, { message: "Quantity must be a positive number" }),
    dueDate: zod_1.z.date({ message: "Due date is required" }),
});
// create book
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.dueDate = new Date(req.body.dueDate);
        // console.log(typeof date, date);
        const borrowData = yield CreateBorrowZodSchema.parseAsync(req.body);
        yield borrow_model_1.BorrowModel.findAvailable(borrowData.book, borrowData.quantity);
        const newBorrow = yield borrow_model_1.BorrowModel.create(borrowData);
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: newBorrow,
        });
    }
    catch (error) {
        // handle zod validation error
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json((0, zodErrorFormatter_1.formatZodError)(error, req.body));
        }
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
            error,
        });
    }
});
exports.createBorrow = createBorrow;
// get borrow
const getBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrow_model_1.BorrowModel.aggregate([
            // stage 1
            {
                $lookup: {
                    from: "books",
                    localField: "book",
                    foreignField: "_id",
                    as: "books",
                },
            },
            // stage 2
            {
                $unwind: "$books",
            },
            // stage 3
            {
                $group: {
                    _id: "$books._id",
                    title: {
                        $first: "$books.title",
                    },
                    isbn: { $first: "$books.isbn" },
                    totalQuantity: {
                        $sum: "$quantity",
                    },
                },
            },
            // stage 4
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$title",
                        isbn: "$isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: borrow.map((item) => ({
                book: item.book,
                totalQuantity: item.totalQuantity,
            })),
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
exports.getBorrow = getBorrow;

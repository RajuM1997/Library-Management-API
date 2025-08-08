import { Request, Response } from "express";
import { BorrowModel } from "../model/borrow.model";
import { z, ZodError } from "zod";
import { formatZodError } from "../utils/zodErrorFormatter";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const CreateBorrowZodSchema = z.object({
  book: z
    .string({ message: "Book is required" })
    .refine((val) => objectIdRegex.test(val), {
      message: "Invalid Book ID format",
    }),
  quantity: z
    .number({ message: "Quantity is required" })
    .min(0, { message: "Quantity must be a positive number" }),
  dueDate: z.date({ message: "Due date is required" }),
});

// create book
export const createBorrow = async (req: Request, res: Response) => {
  try {
    req.body.dueDate = new Date(req.body.dueDate);
    // console.log(typeof date, date);
    const borrowData = await CreateBorrowZodSchema.parseAsync(req.body);

    await BorrowModel.findAvailable(borrowData.book, borrowData.quantity);
    const newBorrow = await BorrowModel.create(borrowData);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: newBorrow,
    });
  } catch (error: any) {
    // handle zod validation error
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error, req.body));
    }
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      error,
    });
  }
};

// get borrow
export const getBorrow = async (req: Request, res: Response) => {
  try {
    const borrow = await BorrowModel.aggregate([
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
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};

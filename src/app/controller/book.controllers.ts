import { Request, Response } from "express";
import { BookModel } from "../model/book.model";
import { z, ZodError } from "zod";
import { formatZodError } from "../utils/zodErrorFormatter";

// zod schema
const CreateBookZodSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author name is required" }),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    { message: "Invalid genre" }
  ),
  description: z.string().optional(),
  isbn: z
    .string()
    .min(1, { message: "ISBN is required" })
    .refine(
      async (val) => {
        const url = `https://library-management-lake-two.vercel.app/api/books/isbn/check-isbn?isbn=${encodeURIComponent(
          val
        )}`;
        const res = await fetch(url);
        const { exists } = await res.json();
        return !exists;
      },
      {
        message: "ISBN must be unique",
      }
    ),
  copies: z
    .number({ message: "Copies must be a number" })
    .min(0, { message: "Copies must be positive" }),
  available: z.boolean().optional(),
});

// create book
export const createBook = async (req: Request, res: Response) => {
  try {
    // zod parse
    const bookData = await CreateBookZodSchema.parseAsync(req.body);
    const newBook = await BookModel.create(bookData);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    // handle zod validation error
    if (error instanceof ZodError) {
      return res.status(400).json(formatZodError(error, req.body));
    }

    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};

// get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sort, limit } = req.query;

    const filterQuery: any = {};
    if (filter) {
      filterQuery.genre = filter;
    }

    const sortQuery: any = {};
    if (sort) {
      sortQuery.createdAt = sort === "asc" ? 1 : -1;
    }
    const limitValue = limit ? Number(limit) : 10;

    const books = await BookModel.find(filterQuery)
      .sort(sortQuery)
      .limit(limitValue);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};

// get single book
export const getSingleBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await BookModel.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};

// get book for isbn
export const getBookISBN = async (req: Request, res: Response) => {
  const { isbn } = req.query;
  if (!isbn) {
    return res.status(400).json({ message: "ISBN is required" });
  }

  const exists = await BookModel.findOne({ isbn: isbn });
  res.json({ exists: !!exists });
};

// update book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const bookData = req.body;
    const book = await BookModel.findByIdAndUpdate(bookId, bookData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};

// delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await BookModel.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
};

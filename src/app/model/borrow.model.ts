import { model, Schema } from "mongoose";
import { BorrowStaticMethods, IBorrow } from "../interfaces/borrow.interface";
import { BookModel } from "./book.model";

const borrowSchema = new Schema<IBorrow, BorrowStaticMethods>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.static(
  "findAvailable",
  async function findAvailable(bookId: string, quantity: number) {
    const book = await BookModel.findById(bookId);

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
    await BookModel.findByIdAndUpdate(bookId, { copies: updatedCopies });

    if (updatedCopies === 0) {
      await BookModel.findByIdAndUpdate(bookId, { available: false });
    }
  }
);

export const BorrowModel = model<IBorrow, BorrowStaticMethods>(
  "Borrow",
  borrowSchema
);

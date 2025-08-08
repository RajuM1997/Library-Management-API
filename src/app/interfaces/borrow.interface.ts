import { Model } from "mongoose";
import { Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}
export interface BorrowStaticMethods extends Model<IBorrow> {
  findAvailable(bookId: string, quantity: number): string;
}

import express, { Response, Request, Application } from "express";
import { bookRoutes } from "./app/route/book.routes";
import { borrowRoutes } from "./app/route/borrow.routes";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

// middleware
app.use(express.json());

// routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello Word" });
});

export default app;

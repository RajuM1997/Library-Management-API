import express, { Response, Request, Application } from "express";
import { bookRoutes } from "./app/route/book.routes";
import { borrowRoutes } from "./app/route/borrow.routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Library Management API" });
});

export default app;

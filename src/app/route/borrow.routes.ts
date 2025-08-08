import express from "express";
import { createBorrow, getBorrow } from "../controller/borrow.controllers";

export const borrowRoutes = express.Router();

// create book route
borrowRoutes.post("/", createBorrow);

// get book route
borrowRoutes.get("/", getBorrow);

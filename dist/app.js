"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("./app/route/book.routes");
const borrow_routes_1 = require("./app/route/borrow.routes");
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
// routes
app.use("/api/books", book_routes_1.bookRoutes);
app.use("/api/borrow", borrow_routes_1.borrowRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Hello Word" });
});
exports.default = app;

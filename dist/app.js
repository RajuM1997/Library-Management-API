"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("./app/route/book.routes");
const borrow_routes_1 = require("./app/route/borrow.routes");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use("/api/books", book_routes_1.bookRoutes);
app.use("/api/borrow", borrow_routes_1.borrowRoutes);
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Library Management API" });
});
exports.default = app;

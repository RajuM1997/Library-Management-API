"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_controllers_1 = require("../controller/borrow.controllers");
exports.borrowRoutes = express_1.default.Router();
// create book route
exports.borrowRoutes.post("/", borrow_controllers_1.createBorrow);
// get book route
exports.borrowRoutes.get("/", borrow_controllers_1.getBorrow);

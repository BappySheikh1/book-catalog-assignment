"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Book_controller_1 = require("./Book.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/create-book', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Book_controller_1.BookController.insertIntoDB);
router.get('/', Book_controller_1.BookController.getAllBookFromDB);
router.get('/:id', Book_controller_1.BookController.updateBookData);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Book_controller_1.BookController.updateBookData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), Book_controller_1.BookController.deleteBookData);
// book Category
router.get('/:categoryId/category', Book_controller_1.BookController.getBooksByCategoryId);
exports.BookRoutes = router;

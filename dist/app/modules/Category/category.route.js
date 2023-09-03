"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post('/create-category', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.insertIntoDB);
router.get('/', category_controller_1.CategoryController.getAllCategoryData);
router.get('/:id', category_controller_1.CategoryController.getSingleCategoryData);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.updateCategoryData);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.ADMIN), category_controller_1.CategoryController.deleteCategoryData);
exports.CategoryRoute = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const Book_route_1 = require("../modules/Books/Book.route");
const user_route_1 = require("../modules/User/user.route");
const category_route_1 = require("../modules/Category/category.route");
const profile_route_1 = require("../modules/profile/profile.route");
const order_route_1 = require("../modules/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.authRoutes,
    },
    {
        path: '/users',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/profile',
        routes: profile_route_1.ProfileRoutes,
    },
    {
        path: '/categories',
        routes: category_route_1.CategoryRoute,
    },
    {
        path: '/books',
        routes: Book_route_1.BookRoutes,
    },
    {
        path: '/orders',
        routes: order_route_1.OrderRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;

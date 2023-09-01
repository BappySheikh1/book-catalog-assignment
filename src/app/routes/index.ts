import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/Books/Book.route';
import { UserRoutes } from '../modules/User/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    routes: authRoutes
  },
  {
    path: "/users",
    routes: UserRoutes
  },
  {
    path: "/books",
    routes: BookRoutes
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;

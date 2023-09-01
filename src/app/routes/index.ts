import express from 'express';
import { UserRoutes } from '../modules/Books/Book.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/user",
    routes: UserRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;

import express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.post('/signup', authController.insertIntoDB);
router.post('/signin', authController.loginUser);

export const authRoutes = router;

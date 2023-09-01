import express from 'express';
import { UserController } from './user.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUserData
);
router.get(
  '/:id',
//   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUserData
);
router.patch('/:id');
router.delete('/:id');

export const UserRoutes = router;

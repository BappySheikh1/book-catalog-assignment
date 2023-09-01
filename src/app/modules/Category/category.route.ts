import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
  CategoryController.insertIntoDB
);
router.get(
  '/',

  CategoryController.getAllCategoryData
);
router.get('/:id', CategoryController.getSingleCategoryData);
router.patch(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
  CategoryController.updateCategoryData
);
router.delete(
  '/:id',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategoryData
);

export const CategoryRoute = router;

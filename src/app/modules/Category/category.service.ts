import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category | null> => {
  const result = await prisma.category.create({ data });
  return result;
};

const getAllCategoryData = async () => {
  const result = await prisma.category.findMany({});
  return result;
};

const getSingleCategoryData = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  });
  return result;
};

const updateCategoryData = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategoryData = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllCategoryData,
  getSingleCategoryData,
  updateCategoryData,
  deleteCategoryData,
};

import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IBookFilters } from './Book.interface';

const insertIntoDB = async (data: Book): Promise<Book | null> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllBookFromDB = async (
  filters: IBookFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[] | null>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, maxPrice, minPrice, category } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ['title', 'genre', 'author'].map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add minPrice and maxPrice conditions
  if (minPrice !== undefined) {
    andConditions.push({
      price: {
        gte:minPrice,
      },
    });
  }

  if (maxPrice !== undefined) {
    andConditions.push({
      price: {
        lte: maxPrice,
      },
    });
  }

  if (category !== undefined) {
    andConditions.push({
      categoryId: {
        equals: category,
      },
    });
  }

  // if (Object.keys(filtersData).length > 0) {
  //   andConditions.push({
  //     AND: Object.keys(filtersData).map(key => ({
  //       [key]: {
  //         equals: (filtersData as any)[key],
  //       },
  //     })),
  //   });
  // }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : { price: 'desc' },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      limit,
      page,
      total,
      totalPage,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  const result = await prisma.book.findMany({
    where: {
      category: {
        id: categoryId,
      },
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            price: 'desc',
          },
    include: {
      category: true,
    },
  });

  const total = await prisma.book.count({
    where: { category: { id: categoryId } },
  });

  const subtotal = await prisma.book.count();

  const totalPage = Math.ceil(subtotal / limit);

  return {
    meta: {
      limit,
      page,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleBookData = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

const updateBookData = async (
  id: string,
  payload: Partial<Book>
): Promise<Book> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteBookData = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllBookFromDB,
  updateBookData,
  deleteBookData,
  getSingleBookData,
  getBooksByCategoryId,
};

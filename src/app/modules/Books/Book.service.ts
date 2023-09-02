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
  const { searchTerm, ...filtersData } = filters;

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

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

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
  const total = await prisma.book.count({});

  return {
    meta: {
      limit,
      page,
      total,
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
};

// if (minPrice !== 0 && maxPrice !== 0) {
//   andConditions.push({
//     AND: [
//       {
//         price: {
//           $gte: minPrice,
//           $lte: maxPrice,
//         },
//       },
//     ],
//   });
// }

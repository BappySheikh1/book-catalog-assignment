import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';


const insertIntoDB = async (data: Book): Promise<Book | null> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

// const getAllBookFromDB = async (
//   filters: IBookFilters,
//   paginationOptions: IPaginationOptions
// ): Promise<IGenericResponse<Book | null>> => {
//   const { limit, page, skip, sortBy, sortOrder, minPrice, maxPrice } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const { searchTerm, ...filtersData } = filters;

//   const andConditions = [];

//   //*     // filter start
//   if (searchTerm) {
//     andConditions.push({
//       OR: BookSearchableFields.map((field: any) => ({
//         [field]: {
//           contains: searchTerm,
//           mode: 'insensitive',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filtersData).length > 0) {
//     andConditions.push({
//         AND: Object.keys(filtersData).map((key) => {
//             if (academicDepartmentRelationalFields.includes(key)) {
//                 return {
//                     [academicDepartmentRelationalFieldsMapper[key]]: {
//                         id: (filtersData as any)[key]
//                     }
//                 };
//             } else {
//                 return {
//                     [key]: {
//                         equals: (filtersData as any)[key]
//                     }
//                 };
//             }
//         })
//     });
//   }

//   //!     // filter end

//   //*     //pagination start

//   if (minPrice !== 0 && maxPrice !== 0) {
//     andConditions.push({
//       AND: [
//         {
//           price: {
//             $gte: minPrice,
//             $lte: maxPrice,
//           },
//         },
//       ],
//     });
//   }

//   const whereConditions: Prisma.BookWhereInput =
//     andConditions.length > 0 ? { AND: andConditions } : {};

//   const result = await prisma.book.findMany({
//     where: whereConditions,
//     skip,
//     take: limit,
//     orderBy:
//     paginationOptions.sortBy && paginationOptions.sortOrder
//         ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
//         : {
//             createdAt: 'desc',
//           },
//   });
//   const total = await prisma.book.count({
//     where: whereConditions,
//   });

//   return {
//     meta: {
//       limit,
//       page,
//       total,
//     },
//     data: result,
//   };
// };

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
  updateBookData,
  deleteBookData,
  getSingleBookData
};

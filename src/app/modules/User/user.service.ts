import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUserData = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({});
  return result;
};

const getSingleUserData = async (id: string): Promise<User | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

// const updateUserData = async (id: string): Promise<User | null> => {
//     const result = await prisma.user.findUnique({
//         where: {
//           id: id,
//         },
//       });
//       return result;
// };

// const deleteUserData = async (id: string): Promise<User | null> => {
//     const result = await prisma.user.findUnique({
//         where: {
//           id: id,
//         },
//       });
//       return result;
// };

export const UserService = {
  getAllUserData,
  getSingleUserData
};

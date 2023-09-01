import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUserData = async (): Promise<User[] | null> => {
  const result = await prisma.user.findMany({});
  return result;
};

export const UserService ={
    getAllUserData
}

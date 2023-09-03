import { Order } from '@prisma/client';
import { IOrderPayload } from './order.interface';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertIntoDB = async (
  payload: IOrderPayload,
  userId: string
): Promise<Order | null> => {
  const data = { userId, ...payload };

  const result = await prisma.order.create({
    data,
  });

  return result;
};

const getAllFromDB = async (userId: string, role: string) => {
  if (role === 'admin') {
    const result = await prisma.order.findMany({
      include: {
        user: true,
      },
    });
    return result;
  }

  if (role === 'customer') {
    const result = await prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
    return result;
  }
};

const getByIdFromDB = async (orderId: string, userId: string, role: string) => {
 
  if (role === 'admin') {
    const adminResult = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });
    return adminResult;
  }

  if (role === 'customer') {
    const customerResult = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        user: true,
      },
    });

    if (!customerResult) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Order not found');
    }

    if (customerResult.userId !== userId) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized: You do not have permission to access this order'
      );
    }

    return customerResult;
  }
};

export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB
};

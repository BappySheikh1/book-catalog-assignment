import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const books = req.body;

  const result = await OrderService.insertIntoDB(books, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const { userId, role } = req.user as { userId: string; role: string };

  const result = await OrderService.getAllFromDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { userId, role } = req.user as { userId: string; role: string };

  const result = await OrderService.getByIdFromDB(orderId, userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};

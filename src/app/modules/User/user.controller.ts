import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getAllUserData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUserData();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingleUserData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUserData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUserData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateUserData(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUserData = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteUserData(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  getAllUserData,
  getSingleUserData,
  updateUserData,
  deleteUserData
};

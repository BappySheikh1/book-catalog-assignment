import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProfileService } from './profile.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const getProfileData = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as { userId: string };
  const result = await ProfileService.getProfileData(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});

export const ProfileController = {
  getProfileData,
};

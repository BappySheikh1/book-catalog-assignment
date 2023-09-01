import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CategoryService } from './category.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategoryData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategoryData();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

const getSingleCategoryData = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryService.getSingleCategoryData(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Category fetched successfully',
      data: result,
    });
  }
);

const updateCategoryData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.updateCategoryData(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

const deleteCategoryData = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.deleteCategoryData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  insertIntoDB,
  getAllCategoryData,
  getSingleCategoryData,
  updateCategoryData,
  deleteCategoryData
};

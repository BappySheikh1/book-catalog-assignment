import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './Book.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBookFromDB = catchAsync(async (req: Request, res: Response) => {
  // console.log("priceFilter:", req.query);
  const filters = pick(req.query, ['searchTerm','minPrice','maxPrice','categoryId']);
  const options = pick(req.query, ['limit','page', 'sortBy', 'sortOrder']);
  const result = await BookService.getAllBookFromDB(filters,options);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books fetched successfully',
      meta: result.meta,
      data: result.data
  });
});


const getBooksByCategoryId=catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const options = pick(req.query, paginationFields);
  const result = await BookService.getBooksByCategoryId(categoryId, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data
});
})

const getSingleBookData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBookData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateBookData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateBookData(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBookData = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteBookData(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
  getAllBookFromDB,
  getSingleBookData,
  updateBookData,
  deleteBookData,
  getBooksByCategoryId
};

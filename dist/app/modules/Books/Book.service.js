"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const insertIntoDB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllBookFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm, maxPrice, minPrice, category } = filters;
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
    // Add minPrice and maxPrice conditions
    if (minPrice !== undefined) {
        andConditions.push({
            price: {
                gte: minPrice,
            },
        });
    }
    if (maxPrice !== undefined) {
        andConditions.push({
            price: {
                lte: maxPrice,
            },
        });
    }
    if (category !== undefined) {
        andConditions.push({
            categoryId: {
                equals: category,
            },
        });
    }
    // if (Object.keys(filtersData).length > 0) {
    //   andConditions.push({
    //     AND: Object.keys(filtersData).map(key => ({
    //       [key]: {
    //         equals: (filtersData as any)[key],
    //       },
    //     })),
    //   });
    // }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : { price: 'desc' },
    });
    const total = yield prisma_1.default.book.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            limit,
            page,
            total,
            totalPage,
        },
        data: result,
    };
});
const getBooksByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.book.findMany({
        where: {
            category: {
                id: categoryId
            }
        },
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : {
            price: 'desc'
        },
        include: {
            category: true
        }
    });
    const total = yield prisma_1.default.book.count({
        where: {
            category: {
                id: categoryId
            }
        }
    });
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            limit,
            page,
            total,
            totalPage,
        },
        data: result,
    };
});
const getSingleBookData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id: id,
        },
    });
    return result;
});
const updateBookData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteBookData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id: id,
        },
    });
    return result;
});
exports.BookService = {
    insertIntoDB,
    getAllBookFromDB,
    updateBookData,
    deleteBookData,
    getSingleBookData,
    getBooksByCategoryId,
};

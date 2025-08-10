import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { success } from "zod";

interface TMata {
  total: number;
}

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: TMata;
}

 export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.service";

const credentiallogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await authServices.credentiallogin(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Login SuccessFully",
      data: loginInfo, 
    });
  }
);
const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.headers.authorization
    const tokenInfo = await authServices.getNewAccessToken(refreshToken as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Login SuccessFully",
      data: tokenInfo, 
    });
  }
);

export const authControllers = {
  credentiallogin,
  getNewAccessToken
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.service";
import AppError from "../../errorHelper/appError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";

const credentiallogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await authServices.credentiallogin(req.body);

    setAuthCookie(res, loginInfo);

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
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "No Refresh Token Received From Cookies"
      );
    }
    const tokenInfo = await authServices.getNewAccessToken(
      refreshToken as string
    );

    setAuthCookie(res, tokenInfo.accessToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New Access Token Reive SuccessFully",
      data: tokenInfo,
    });
  }
);

const logOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User LogOut SucessFully",
      data: null,
    });
  }
);

const reset_password = catchAsync(async (req: Request, res: Response, next: NextFunction,) => {
    const newPassword = req.body.newPassword;
    const  oldPassword = req.body.oldPassword;
    const decodedToken =  req.user
    console.log(decodedToken , "decoded data ") 
     await authServices.reset_password(oldPassword , newPassword, decodedToken);

        sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: " Password Change SuccessFully",
      data: null,
    });
  }



);
export const authControllers = {
  credentiallogin,
  getNewAccessToken,
  logOut,
  reset_password
};

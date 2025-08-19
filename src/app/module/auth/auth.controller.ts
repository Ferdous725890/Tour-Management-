/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/send.response";
import httpStatus from "http-status-codes";
import { authServices } from "./auth.service";
import AppError from "../../errorHelper/appError";
import { setAuthCookie } from "../../utils/setCookie";

const credentiallogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await authServices.credentiallogin(req.body);

    // Access Token

    // res.cookie("accessToken", loginInfo.accessToken,{
    //   httpOnly : true,
    //   secure : false 
    // })

    // //Refresh Token
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    // });

 setAuthCookie(res,loginInfo)

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
// res.cookie("accessToken", tokenInfo.accessToken,{
//   httpOnly : true,
//   secure : false
// })


setAuthCookie(res,tokenInfo.accessToken)


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
  getNewAccessToken,
};

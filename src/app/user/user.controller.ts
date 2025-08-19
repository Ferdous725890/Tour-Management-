/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/send.response";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

// const createdUserFunction = async(req : Request, res : Response) => {
//    const user = await UserServices.CreateUser(req.body);

//     //send status
//     res.status(httpStatus.CREATED).json({
//       message: "User Created SuccessFully",
//       user,
//     });
// }

// -------..........

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const CreatedUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.CreateUser(req.body);
    //send status
    res.status(httpStatus.CREATED).json({
      message: "User Created SuccessFully",
      user,
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.params.id;
    const token = req.headers.authorization;
    const verifiedTokens = verifyToken(
      token as string,
      envVars.JWT_ACCESS_SECRET
    ) as JwtPayload;

    const verifiedToken = req.user as JwtPayload;

    const payload = req.body;
    const user = await UserServices.updateUser(userid, payload, verifiedToken);

    //send status
    res.status(httpStatus.CREATED).json({
      message: "User Updated SuccessFully",
      user,
    });
  }
);

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.getAllUser();
  // res.status(httpStatus.OK).json({
  //   success: true,
  //   message: "All User Retrived Successfully",
  //   data: users,
  // });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User user Retrived Successfully ",
    data: result.data,
    meta: result.meta,
  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const userController = {
  CreatedUser,
  getAllUser,
  updateUser,
};

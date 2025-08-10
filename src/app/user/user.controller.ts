/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../utils/catchAsync";
import { success } from "zod";
import { sendResponse } from "../utils/send.response";
// import AppError from "../errorHelper/appError";
// const CreatedUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     //recived paramitar
//     // const { name, email } = req.body;
//     // // created user
//     // const user = await User.create({
//     //   name,
//     //   email,
//     // });
//     // throw new AppError(httpStatus.BAD_REQUEST, "Fack Error")

//     const user = await UserServices.CreateUser(req.body);

//     //send status
//     res.status(httpStatus.CREATED).json({
//       message: "User Created SuccessFully",
//       user,
//     });
//   } catch (err: any) {
//     next(err);
//     // res.status(httpStatus.BAD_REQUEST).json({
//     //   message: `Something Went Wrong! ${err.message} from user controlar`,
//     //   err
//     // });
//   }
// };

//------------------GET ---ALL---- USERS

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

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = await UserServices.getAllUser();
  // res.status(httpStatus.OK).json({
  //   success: true,
  //   message: "All User Retrived Successfully",
  //   data: users,
  // });
  sendResponse(res, {
    success : true,
    statusCode: httpStatus.OK,
    message: "User user Retrived Successfully ",
    data : result.data,
    meta: result.meta

  });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await UserServices.getAllUser();

//     return users;
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };
export const userController = {
  CreatedUser,
  getAllUser,
};

// Function => res - res function
// Function => try-catch catch => req - res Function

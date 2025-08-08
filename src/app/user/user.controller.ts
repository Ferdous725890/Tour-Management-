/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
const CreatedUser = async (req: Request, res: Response) => {
  try {
    //recived paramitar
    // const { name, email } = req.body;
    // // created user
    // const user = await User.create({
    //   name,
    //   email,
    // });

const user = await UserServices.CreateUser(req.body)

    //send status
    res.status(httpStatus.CREATED).json({
      message : "User Created SuccessFully",
      user
    });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.log(err);
    // sent status
    res.status(httpStatus.BAD_REQUEST).json({
      message: `Somthing Want Wrong !!!!! ${err.message}`,
      err,
    });
  }
};


export const userController = {
  CreatedUser
} 
import AppError from "../errorHelper/appError";
import { IAuthProvider, IsActive, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";


const CreateUser = async (payload: Partial<IUser>) => {
  const { password, email, ...rest } = payload;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Alredy Exist");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVars.BYCRYPT_SALT_ROUNT)
  );

  const authProvider: IAuthProvider = {
    provider: "Credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    auth: [authProvider],
    ...rest,
  });

  return user;
};

const updateUser = async (
  userid: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {

const ifUserExist = await User.findById(userid)
// const ifUserExist = await User.findById(userid);


if (!ifUserExist){
throw new AppError(httpStatus.NOT_FOUND,"Your Not Found")
}


// if(ifUserExist.isDeleted || ifUserExist.isActive ===IsActive.BLOCKED){
// throw new AppError(httpStatus.FORBIDDEN,"This User Can Not Updated")

// }


  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(httpStatus.FORBIDDEN, "You Are Not Authorized");
    }

    if (
      payload.role === Role.SUPPER_ADMIN &&
      decodedToken.role === Role.ADMIN
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You Are Not Authorized");
    }

    if (payload.isActive || payload.isDeleted || payload.isVerified) {
      if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
        throw new AppError(httpStatus.FORBIDDEN, "You Are Not Authorized");
      }
    }
    if (payload.password) {
      payload.password = await bcryptjs.hash(
        payload.password,
        envVars.BYCRYPT_SALT_ROUNT
      );
    }
    const newUpdateUser = await User.findByIdAndUpdate(userid, payload, {
      new: true,
      runValidators: true,
    });
    
    return newUpdateUser;
  }

  /**
   * email can not update
   * name, phone, password, address
   * password re hassing
   * onely admin superadmin = role , isdeleted
   */
};

const getAllUser = async () => {
  const users = await User.find({});
  const totalusers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalusers,
    },
  };
};

export const UserServices = {
  CreateUser,
  getAllUser,
  updateUser,
};

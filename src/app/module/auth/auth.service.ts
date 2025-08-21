/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorHelper/appError";
import { IsActive, IUser } from "../../user/user.interface";
import { User } from "../../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import {
  createdNewAccessTokenWithRefreshToken,
  createdUserToken,
} from "../../utils/userToken";
const credentiallogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExits = await User.findOne({ email });
  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Email ");
  }
  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExits.password as string
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }
  const userToken = createdUserToken(isUserExits);

  const { password: pass, ...rest } = isUserExits.toObject();

  return {
    accessToken: userToken.accessToken,
    refreshToken: userToken.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createdNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return {
    accessToken: newAccessToken,
  };
};



const reset_password = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);
  console.log(user, "User ");

  const isOldPassword = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );
  if (!isOldPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Ols Password Dose Not Match");
  }

  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.BYCRYPT_SALT_ROUNT)
  );
  await user!.save();
};

export const authServices = {
  credentiallogin,
  getNewAccessToken,
  reset_password,
};

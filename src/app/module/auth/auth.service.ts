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
import { createdUserToken } from "../../utils/userToken";
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
  // const jwtPayload = {
  //   userId: isUserExits._id,
  //   email: isUserExits.email,
  //   role: isUserExits.role,
  // };

  // const accessToken = generateToken(
  //   jwtPayload,
  //   envVars.JWT_ACCESS_SECRET,
  //   envVars.JWT_EXPIRES_IN
  // );


  // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

const userToken = createdUserToken(isUserExits)


const {password : pass, ...rest} = isUserExits.toObject()

  return {
    accessToken : userToken.accessToken,
    refreshToken : userToken.refreshToken,
    user : rest
  };
};






const getNewAccessToken  = async (refreshToken : string) => {
  const verifyedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload

  const isUserExits = await User.findOne({ email : verifyedRefreshToken.email });

  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Dose Note Exist");
  }
  if (isUserExits.isActive === IsActive.BLOCKEDn || isUserExits.isActive === IsActive.INACTIVE) {
    throw new AppError(httpStatus.BAD_REQUEST, `User Is Block${isUserExits.isActive}`);
  }
  if (isUserExits.isActive) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Is Deleted");
  }
 
  const jwtPayload = {
    userId: isUserExits._id,
    email: isUserExits.email,
    role: isUserExits.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_EXPIRES_IN
  );



  return {
   accessToken
  };
};

export const authServices = {
  credentiallogin,
  getNewAccessToken,
  
};

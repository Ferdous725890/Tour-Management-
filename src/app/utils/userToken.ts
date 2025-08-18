import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, IUser } from "../user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../user/user.model";
import AppError from "../errorHelper/appError";
import httpStatus from "http-status-codes"
export const createdUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_EXPIRES_IN
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );




  return {
    accessToken,
    refreshToken,
  };
};


export const createdNewAccessTokenWithRefreshToken = async (refreshToken : string) =>{
  const verifyedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExits = await User.findOne({ email: verifyedRefreshToken.email });

  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Dose Note Exist");
  }
  if (
    isUserExits.isActive === IsActive.BLOCKED ||
    isUserExits.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User Is Block${isUserExits.isActive}`
    );
  }
  if (!isUserExits.isActive) {
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
    accessToken,
  };
}

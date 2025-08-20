import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelper/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { IsActive, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes"
export const authCheck =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "Token Not Resived");
      }
      const veryfiedToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;


      const isUserExits = await User.findOne({ email: veryfiedToken.email });

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


      if (
        // ((veryfiedToken as JwtPayload).role !== Role.ADMIN) |
        !authRoles.includes(veryfiedToken.role) 
      ) {
        throw new AppError(403, "You Are Not Parmited View This Route");
      }
      req.user = verifyToken;
      next();
    } catch (error) {
      next(error);
    }
  };

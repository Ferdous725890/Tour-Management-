import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelper/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { Role } from "../user/user.interface";


export const authCheck =
  (...authRoles : string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "Token Not Resived");
      }

      // const veryfiedToken = jwt.verify(accessToken, "secret")
      const veryfiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET)  as JwtPayload

      // if(!veryfiedToken){
      //   throw new AppError(403, "You Are Not Authorize")
      // }

      if 
        // ((veryfiedToken as JwtPayload).role !== Role.ADMIN) |
        ((!authRoles.includes(veryfiedToken.role)) | Role.SUPPER_ADMIN
      ) {
        throw new AppError(403, "You Are Not Parmited View This Route");
      }

      console.log(veryfiedToken);
      next();
    } catch (error) {
      next(error);
    }
  };

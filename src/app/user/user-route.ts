
import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { createdZodSchema } from "./user.vlidation";
import { validatedRequest } from "../middleware/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken"
import AppError from "../errorHelper/appError";
import { Role } from "./user.interface";

const router = Router();

// Registration route with validation middleware
router.post(
  "/register",
  validatedRequest(createdZodSchema),
  userController.CreatedUser
);

router.get("/all-users", async(req: Request, res: Response, next :NextFunction) =>{
  try {
    const accessToken = req.headers.authorization
    
    if(!accessToken){
      throw new AppError(403,"Token Not Resived")
    }


  const veryfiedToken = jwt.verify(accessToken, "secret")
// if(!veryfiedToken){
//   throw new AppError(403, "You Are Not Authorize")
// }

  if((veryfiedToken as JwtPayload).role !== Role.ADMIN | Role.SUPPER_ADMIN){
    throw new AppError(403, "You Are Not Parmited View This Route"
    )

  }

  console.log(veryfiedToken)
  next()
  } catch (error) {
    next(error)
  }
},userController.getAllUser);

export const userRoutes = router;

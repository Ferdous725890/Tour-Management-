import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { createdZodSchema } from "./user.vlidation";
import { validatedRequest } from "../middleware/validateRequest";
import  { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelper/appError";
import { Role } from "./user.interface";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { authCheck } from "../middleware/CheckAuth";
import { authControllers } from "../module/auth/auth.controller";

const router = Router();


// Registration route with validation middleware
router.post("/register",validatedRequest(createdZodSchema),userController.CreatedUser
);

router.get("/all-users", authCheck(Role.ADMIN, Role.SUPPER_ADMIN),userController.getAllUser);

router.patch("/:id", authCheck(...Object.values(Role)), userController.updateUser )
export const userRoutes = router;

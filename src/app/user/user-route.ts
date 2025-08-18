import { Router } from "express";
import { userController } from "./user.controller";
import { createdZodSchema } from "./user.vlidation";
import { validatedRequest } from "../middleware/validateRequest";
import { Role } from "./user.interface";
import { authCheck } from "../middleware/CheckAuth";

const router = Router();

// Registration route with validation middleware
router.post("/register",validatedRequest(createdZodSchema),userController.CreatedUser
);

router.get("/all-users", authCheck(Role.ADMIN, Role.SUPPER_ADMIN),userController.getAllUser);

router.patch("/:id", authCheck(...Object.values(Role)), userController.updateUser )
export const userRoutes = router;

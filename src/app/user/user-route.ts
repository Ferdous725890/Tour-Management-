import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post("/register", userController.CreatedUser);
router.get("/all-users", userController.getAllUser)

export const userRoutes = router;

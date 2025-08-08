import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
router.post("/register", userController.CreatedUser);

export const userRoutes = router;

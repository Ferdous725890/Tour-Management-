import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();
router.post("/login", authControllers.credentiallogin);
router.post("/refresh_token",authControllers.getNewAccessToken )

export const AuthRoutes = router;

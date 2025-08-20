import { Router } from "express";
import { authControllers } from "./auth.controller";
import { authCheck } from "../../middleware/CheckAuth";
import { Role } from "../../user/user.interface";


const router = Router();
router.post("/login", authControllers.credentiallogin);
router.post("/refresh_token",authControllers.getNewAccessToken )
router.post("/logOut", authControllers.logOut)
router.post("/reset_password", authCheck(...Object.values(Role)),authControllers.reset_password )
export const AuthRoutes = router;

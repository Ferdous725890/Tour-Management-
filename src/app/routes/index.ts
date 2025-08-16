import { Router } from "express"
import { userRoutes } from "../user/user-route"
import { AuthRoutes } from "../module/auth/auth.route"





export const router = Router()

const modulesRoutes = [
    {
        path : "/user",
        router : userRoutes
    },
    {
path : "/auth",
router : AuthRoutes
    }
   
]

modulesRoutes.forEach((route) =>{
    router.use(route.path, route.router)
})
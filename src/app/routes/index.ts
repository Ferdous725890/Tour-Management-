import { Router } from "express"
import { userRoutes } from "../user/user-route"





export const router = Router()

const modulesRoutes = [
    {
        path : "/user",
        router : userRoutes
    },
   
]

modulesRoutes.forEach((route) =>{
    router.use(route.path, route.router)
})
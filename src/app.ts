import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";


// --------   Middleware  --------   
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(cors());
// --------  route -------- 
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Wellcome To Tour Management System Backend",
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;

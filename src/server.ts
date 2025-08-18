/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmint";
let server: Server;
const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connect To Db !!!!!!!!");
    server = app.listen(envVars.PORT, () => {
      console.log(`SERVER IS LISTENING TO POST ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await seedSuperAdmin();
})();


process.on("unhandledRejection", (err) => {
  console.log("Unhandle Rejection Detected ... Server Shutting Down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Detected ... Server Shuting Down", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Detected ... Server Shuting Down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

// Unhandel Rejection Error
// Promise.reject(new Error("I Forgot To Catch This Promis"));

//-------------------- Uncaught Rejection Error
// throw new Error("I Forgot to Handle This Local Error")

/**
 * unhandel rejection error
 * uncaught rejection error
 * signal termination sigterm
 */

import dotenv from "dotenv";

dotenv.config();

//created interface
interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  BYCRYPT_SALT_ROUNT: string;
  JWT_EXPIRES_IN: string;
  JWT_ACCESS_SECRET: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
}

const loadEnvVariable = (): EnvConfig => {
  const requiredEnvVariable: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BYCRYPT_SALT_ROUNT",
    "JWT_EXPIRES_IN",
    "JWT_ACCESS_SECRET",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
  ];
  requiredEnvVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Messing Required Enviroment Variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    BYCRYPT_SALT_ROUNT: process.env.BYCRYPT_SALT_ROUNT as string,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
  };
};

export const envVars = loadEnvVariable();

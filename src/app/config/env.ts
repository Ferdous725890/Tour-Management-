import dotenv from "dotenv";

dotenv.config();


//created interface
interface EnvConfig{
    PORT: string,
  DB_URL: string,
  NODE_ENV : "development" |"production",
  BYCRYPT_SALT_ROUNT  : string
  JWT_ACCESS_EXPIRES : string
  JWT_ACCESS_TOKEN : string
}

const loadEnvVariable = () :EnvConfig =>{
    const requiredEnvVariable  : string[] = ["PORT", "DB_URL","NODE_ENV","BYCRYPT_SALT_ROUNT", "JWT_ACCESS_EXPIRES", "JWT_ACCESS_TOKEN"];
    requiredEnvVariable.forEach(key =>{
        if(!process.env[key]){
          throw new Error(`Messing Required Enviroment Variable ${key}`)
        }
    })
return {
  PORT: process.env.PORT as string,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  DB_URL: process.env.DB_URL!,
  NODE_ENV : process.env.NODE_ENV as "development" | "production",
  BYCRYPT_SALT_ROUNT  : process.env.BYCRYPT_SALT_ROUNT as string,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
  JWT_ACCESS_TOKEN   : process.env. JWT_ACCESS_TOKEN as string
};

}




export const envVars = loadEnvVariable()
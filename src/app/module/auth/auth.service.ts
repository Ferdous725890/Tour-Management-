import AppError from "../../errorHelper/appError";
import { IUser } from "../../user/user.interface";
import { User } from "../../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { generateToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
const credentiallogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExits = await User.findOne({ email });
  if (!isUserExits) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid Email ");
  }
  const isPasswordMatch = await bcryptjs.compare(
    password as string,
    isUserExits.password as string
  );
 if (!isPasswordMatch) {
  throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
}
const jwtPayload = {

  userId : isUserExits._id,
  email : isUserExits.email,
  role : isUserExits.role,


}

const accessToken = generateToken(jwtPayload, envVars.jwt)


// const accessToken = jwt.sign(jwtPayload,"secret",{
//   expiresIn : "1d"
// })


  return {
    // email: isUserExits.email,
    accessToken
  };
};

export const authServices = {
  credentiallogin,
};



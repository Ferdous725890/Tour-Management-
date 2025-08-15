import AppError from "../errorHelper/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

const CreateUser = async (payload: Partial<IUser>) => {
  const { password, email, ...rest } = payload;
  const isUser = await User.findOne({ email });
  if (isUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Alredy Exist");
  }

const hashedPassword = await bcryptjs.hash(password as string, 10)




  const authProvider: IAuthProvider = {
    provider: "Credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: hashedPassword,
    auth: [authProvider],
    ...rest,
  });

  return user;
};

const getAllUser = async () => {
  const users = await User.find({});
  const totalusers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalusers,
    },
  };
};

export const UserServices = {
  CreateUser,
  getAllUser,
};

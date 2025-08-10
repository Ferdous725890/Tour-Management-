import { IUser } from "./user.interface";
import { User } from "./user.model";

const CreateUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({
    name,
    email,
  });

  return user;
};

const getAllUser = async () => {
  const users = await User.find({});
  const totalusers = await User.countDocuments()

  return {
    data : users,
    meta : {
      total : totalusers
    }
  }
};

export const UserServices = {
  CreateUser,
  getAllUser,
};

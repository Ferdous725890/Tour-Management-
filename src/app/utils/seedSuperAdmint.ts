import { email } from "zod";
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../user/user.interface";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist");
      return;
    }
console.log("Try To Created Super Admin")
    const hasPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BYCRYPT_SALT_ROUNT)
    );

    const authProvider: IAuthProvider = {
      provider: "Credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const payload: IUser = {
      name: "Super Admin",
      role: Role.SUPPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hasPassword,
      auth: [authProvider],
      isVerified: true,
    };

    const superAdmin = await User.create(payload);
    console.log("Super Admin Created SuccessFully")
console.log(superAdmin)
} catch (error) {
    console.log(error);
  }
};

import { Types } from "mongoose";
export enum Role {
  SUPPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

export interface IAuthProvider {
  provider: "Google" | "Credentials"; // google, credential
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}


export interface IUser {
  _id ?: Types.ObjectId
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  addreess?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVerified?: boolean;
  role: Role;
  auth: IAuthProvider[];
  booking?: Types.ObjectId[];
  guides: Types.ObjectId[];
}

// note
/**
 * email and password
 * google authentication
 */

import z from "zod";
import { IsActive, Role, isVerified } from "./user.interface";

export const createdZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be a string" })
    .min(2, { message: "Name too short. Minimum 2 characters required." })
    .max(50, { message: "Name too long. Maximum 50 characters allowed." }),

  email: z.string().email({ message: "Invalid email format" }),

  password: z
    .string({ invalid_type_error: "Password must be a string" })

    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),

  // phone: z
  //   .string({ invalid_type_error: "Phone Number must be a string" })
  //   .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
  //     message: "Invalid Bangladeshi phone number",
  //   }).optional,

  address: z
    .string({ invalid_type_error: "Address must be a string" })
    .max(200, { message: "Address can't exceed 200 characters" })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be a string" })
    .min(2, { message: "Name too short. Minimum 2 characters required." })
    .max(50, { message: "Name too long. Maximum 50 characters allowed." })
    .optional(),

  email: z.string().email({ message: "Invalid email format" }).optional(),

  password: z
    .string({ invalid_type_error: "Password must be a string" })

    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .optional(),

  // phone: z
  //   .string({ invalid_type_error: "Phone Number must be a string" })
  //   .regex(/^(?:\+880|880|0)1[3-9]\d{8}$/, {
  //     message: "Invalid Bangladeshi phone number",
  //   }).optional(),

  role: z.enum(Object.values(Role) as [string]).optional(),

  IsActive: z.enum(Object.values(IsActive) as [string]).optional(),

  isDeleted: z
    .boolean({ invalid_type_error: "Is Deleted Must Be Tru Or Flase" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "Is isVerified Must Be Tru Or Flase" })
    .optional(),

  address: z
    .string({ invalid_type_error: "Address must be a string" })
    .max(200, { message: "Address can't exceed 200 characters" })
    .optional(),
});

////////////////////

// 2 ar
// 13 minutes 42 second

///////////////

import { z } from "zod";

export const changePasswordValidator = z.object({
  oldPassword: z
    .string({ required_error: "Old Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
  newPassword: z
    .string({ required_error: "New Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

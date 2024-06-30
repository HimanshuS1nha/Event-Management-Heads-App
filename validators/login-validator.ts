import { z } from "zod";

export const loginValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please fill in a valid email" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

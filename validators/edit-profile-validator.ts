import { z } from "zod";

export const editProfileValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  image: z
    .string({ required_error: "Image is required" })
    .trim()
    .min(1, { message: "Image is required" }),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .length(10, { message: "Phone number must be of 10 digits" }),
});

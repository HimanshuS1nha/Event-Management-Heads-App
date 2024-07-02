import { z } from "zod";

export const editEventDetailsValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  location: z
    .string({ required_error: "Location is required" })
    .trim()
    .min(1, { message: "Location is required" }),
  roomNo: z.number().optional(),
});

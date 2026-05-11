import { z } from "zod";

export const addAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type AddAdminInput = z.infer<typeof addAdminSchema>;

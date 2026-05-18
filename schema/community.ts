import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum(["public", "restricted", "private"]),
});

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;

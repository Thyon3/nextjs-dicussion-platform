import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(21, "Name must be 21 characters or less").regex(/^[a-zA-Z0-9_]+$/, "Name can only contain letters, numbers and underscores"),
  type: z.enum(["public", "restricted", "private"]),
});

export type CreateCommunityInput = z.infer<typeof createCommunitySchema>;

import { z } from "zod";

export const createUserDto = z.object({
  name: z.string().min(1),
  lastname: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3)
});

export type CreateUserDTO = z.infer<typeof createUserDto>;
import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatário' })
    .email(),
});
